import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai';
import { auth, type UserType } from '@/app/(auth)/auth';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
} from '@/lib/db/queries';
import { convertToUIMessages, generateUUID } from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';
import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import { postRequestBodySchema, type PostRequestBody } from './schema';
import { geolocation } from '@vercel/functions';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import { after } from 'next/server';
import { ChatSDKError } from '@/lib/errors';
import type { ChatMessage } from '@/lib/types';
import type { ChatModel } from '@/lib/ai/models';
import type { VisibilityType } from '@/components/visibility-selector';

import { guidedTopics } from '@/lib/guided-topics';
import type { DBMessage, Document } from '@/lib/db/schema';

export const maxDuration = 60;

function getMessageTextPart(
  message: ChatMessage,
  failOnNotFound: boolean = false,
): { type: string; text: string } {
  //| null
  for (let i = 0; i < message.parts.length; i++) {
    const part = message.parts[i];
    if (part.type === 'text' && 'text' in part) {
      return { type: 'text', text: part.text };
    }
  }

  console.log('no text messagePart found', JSON.stringify(message));

  if (failOnNotFound) {
    throw new Error('No text part found in message');
  }

  return { type: 'empty', text: '' };
}

let globalStreamContext: ResumableStreamContext | null = null;

export function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL',
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

// needs topic, subtopic, questionid, userAnswers -> filter questions,
function generatePrompt(
  currentMessage: string,
  topicId: string,
  subtopicId: string,
  question: string,
  questionId: string,
  userAnswers: any,
) {
  const topic = guidedTopics[topicId];
  const subtopic = topic.subtopics[subtopicId];
  console.log('userAnswers-0', userAnswers);
  if (!userAnswers) {
    userAnswers = [];
  }
  //const question = subtopic.questions[questionId] || null;
  userAnswers.push({
    qid: questionId || '',
    question: subtopic.questions[questionId] || question || '',
    answer: currentMessage,
  });
  console.log('userAnswers-1', userAnswers);
  // filter out qid from userAnswers of subtopic.questions
  const answeredQids = new Set(
    userAnswers.map((qa: { qid: string }) => qa.qid),
  );
  console.log('answeredQids', answeredQids);
  // Get all question IDs, filter out the answered ones, then map to their text
  const unaskedQuestions = Object.entries(subtopic.questions)
    .filter(([qid]) => !answeredQids.has(qid))
    .map(([qid, question]) => {
      return { qid: qid, question: question };
    });
  console.log('unaskedQuestions', unaskedQuestions);

  let prompt = '';
  const promptStart = `
Du bist ein Coaching-Interview-Assistent.

Das aktuelle Thema ist: "${topic.title}": "${subtopic.title}"

Hier sind die bisherigen Antworten des Users:
${userAnswers.map((qa: { question: string; answer: string }) => `Frage: ${qa.question}\nAntwort: ${qa.answer}`).join('\n')}
`;

  if (unaskedQuestions.length > 0) {
    prompt = `${promptStart}
Hier sind die noch nicht gestellten Leitfragen für das Subthema:
${unaskedQuestions.map((q: { qid: string; question: string }, i: number) => `qid ${q.qid}: ${q.question}`).join('\n')}

Beurteile, ob die Antworten ausreichend und vollständig sind um die Frage "${subtopic.title}" zu beantworten.
Wenn ja, antworte exakt mit:
complete: <Detailierte zusammenfassung der Antworten>

Wenn nein, dann entscheide:
- Gibt es eine noch nicht gestellte Leitfrage die relevant ist? Dann antworte exakt mit:
next: <qid>
- Wenn die Leitfragen beantwortet sind, formuliere eine gezielte Rückfrage die die Antworten aufgreift, um Unklarheiten zu klären oder Details nachzufragen. Dann antworte exakt mit:
clarify: <Rückfrage>
`;
  } else {
    // too many questions -> next userAnswers
    prompt = `${promptStart}
Beurteile, ob die Antworten einigermassen ausreichend sind um die Frage "${subtopic.title}" zu beantworten.
Wenn ja, antworte exakt mit:
complete: <Zusammenfassung der Antworten>

Wenn nein, dann entscheide:
- Welche Fragen kannst du noch stellen die Frage "${subtopic.title}" abzuschließen? Dann antworte exakt mit:
next: <qid>
- Oder formuliere eine gezielte Rückfrage die die Antworten aufgreift, um Unklarheiten zu klären oder Details nachzufragen. Dann antworte exakt mit:
clarify: <Rückfrage>
`;
  }

  return prompt;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (error) {
    console.log('bad_request:api', error);
    return new ChatSDKError('bad_request:api').toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      topicId,
      subtopicId,
      questionId,
      question,
      userAnswers,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel['id'];
      selectedVisibilityType: VisibilityType;
      topicId?: string;
      subtopicId?: string;
      questionId?: string;
      question?: string;
      userAnswers?: any;
    } = requestBody;

    console.log('****************************************************');
    console.log('****************************************************');
    console.log('****************************************************');
    console.log('****************************************************');
    console.log('*** POST', requestBody);
    console.log('****************************************************');
    const myTopicId = topicId || message.metadata?.topicId || '';
    const mySubtopicId = subtopicId || message.metadata?.subtopicId || '';
    const myQuestionId = questionId || message.metadata?.questionId || '';
    const messagePart = getMessageTextPart(message);
    console.log('question', question);
    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new ChatSDKError('rate_limit:chat').toResponse();
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
        metadata: {},
      });
      //console.log('chat_save_resp', chat_save_resp);
      // get chat id from response
      //const chat_id = chat_save_resp.id;
      //console.log('chat id', chat_id);
    } else {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError('forbidden:chat').toResponse();
      }
    }

    // Assistant message only
    if (message.role === 'assistant') {
      let msg = {
        chatId: id,
        id: message.id,
        role: 'assistant',
        parts: message.parts,
        attachments: [],
        createdAt: new Date(),
        metadata: {
          topicId: myTopicId,
          subtopicId: mySubtopicId,
          questionId: myQuestionId,
        },
      };
      await saveMessages({
        messages: [msg],
      });
      console.log('assistant message saved - 1', msg);
      return new Response(id);
    }

    //const messagesFromDb = await getMessagesByChatId({ id });

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    const metadata = {
      topicId: myTopicId,
      subtopicId: mySubtopicId,
      questionId: myQuestionId,
    };

    let user_msg: DBMessage = {
      chatId: id,
      id: message.id,
      role: 'user',
      parts: message.parts,
      attachments: [],
      createdAt: new Date(),
      metadata: metadata,
    };

    await saveMessages({
      messages: [user_msg],
    });

    console.log('user message saved - 2', user_msg);
    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    //console.log('uiMessages', JSON.stringify(uiMessages, null, 2));

    let prompt = undefined;
    //let messages = [
    //  msg
    //];

    //let create = convertToModelMessages(uiMessages);
    let prompt_messages = undefined;
    console.log(
      'myTopicId && mySubtopicId',
      myTopicId && mySubtopicId,
      myTopicId,
      mySubtopicId,
    );
    if (myTopicId && mySubtopicId) {
      prompt = generatePrompt(
        messagePart.text || '',
        myTopicId,
        mySubtopicId,
        question || '',
        myQuestionId,
        userAnswers,
      );
    } else {
      const messagesFromDb = await getMessagesByChatId({ id });
      const uiMessages = [...convertToUIMessages(messagesFromDb)]; //const uiMessages = [...convertToUIMessages(messagesFromDb), user_msg];
      let messages = convertToModelMessages(uiMessages);
      prompt_messages = messages;
    }

    //console.log('createUIMessageStream - messages', messages)
    console.log('createUIMessageStream - prompt', prompt);

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages: prompt_messages,
          prompt: prompt,
          stopWhen: stepCountIs(5),
          experimental_activeTools:
            selectedChatModel === 'chat-model-reasoning'
              ? []
              : [
                  'getWeather',
                  'createDocument',
                  'updateDocument',
                  'requestSuggestions',
                ],
          experimental_transform: smoothStream({ chunking: 'word' }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
        });

        result.consumeStream();
        console.log('result', result);
        const xxx = result.toUIMessageStream({
          sendReasoning: true,
        });
        //console.log('xxx', xxx)
        dataStream.merge(xxx);
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        console.log('POST onFinish', messages);
        let assistant_msgs = messages.map((message) => {
          console.log('POST onFinish map', message);
          const msg = {
            id: message.id,
            role: message.role,
            parts: message.parts,
            createdAt: new Date(),
            attachments: [],
            metadata: message.metadata || metadata,
            chatId: id,
          };
          console.log('onFinish assistant_msgs msg', msg);
          return msg;
        });
        await saveMessages({
          messages: assistant_msgs,
        });
        console.log('assistant message saved - 3', assistant_msgs);
      },
      onError: (error) => {
        console.log('POST onError', error);
        return 'An error occurred!';
      },
    });

    const streamContext = getStreamContext();

    //console.log('streamContext', streamContext)
    if (streamContext) {
      return new Response(
        await streamContext.resumableStream(streamId, () =>
          stream.pipeThrough(new JsonToSseTransformStream()),
        ),
      );
    } else {
      return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
    }
  } catch (error) {
    console.error('*** Error in chat POST handler:', error);
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    // Return a generic error response for unhandled errors
    return new ChatSDKError(
      'bad_request:chat',
      'An unexpected error occurred while processing your request',
    ).toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  const chat = await getChatById({ id });

  if (chat.userId !== session.user.id) {
    return new ChatSDKError('forbidden:chat').toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
