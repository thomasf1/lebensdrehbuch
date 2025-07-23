'use client';

import { DefaultChatTransport } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, fetchWithErrorHandlers, generateUUID } from '@/lib/utils';
import { Artifact } from './artifact';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import type { VisibilityType } from './visibility-selector';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { unstable_serialize } from 'swr/infinite';
import { getChatHistoryPaginationKey } from './sidebar-history';
import { toast } from './toast';
import type { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { ChatSDKError } from '@/lib/errors';
import type { Attachment, ChatMessage } from '@/lib/types';
import { useDataStream } from './data-stream-provider';

import { guidedTopics } from '@/lib/guided-topics';


import type { UseChatHelpers } from '@ai-sdk/react';



export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}) {
  const { visibilityType } = useChatVisibility({
    chatId: id,
    initialVisibilityType,
  });

  const { mutate } = useSWRConfig();
  const { setDataStream } = useDataStream();
  const [input, setInput] = useState<string>('');
  let sendGuidedMessage = () => {};
  
  const processedMessageIds = useRef<Array<string>>([]);

  //const [topicId, setTopicId] = useState<any>(null);
  //const [topicId, setTopicId] = useState<string | null>(null);
  //const [subtopicId, setSubtopicId] = useState<any>(null);

  
  //const [topicId, setTopicId] = useState<string | null>(null);
  //const [subtopicId, setSubtopicId] = useState<string | null>(null);
  //const [questionId, setQuestionId] = useState<string | null>(null);
  //const [userAnswers, setUserAnswers] = useState<any>([]);
  // Stupid hack to get the topicId to the prepareSendMessagesRequest function
  const topicIdRef = useRef<string | undefined>(undefined);
  //topicIdRef.current = topicId;
  const subtopicIdRef = useRef<string | undefined>(undefined);
  //subtopicIdRef.current = subtopicId;
  const questionIdRef = useRef<string | undefined>(undefined);
  const questionRef = useRef<string | undefined>(undefined);
  //questionIdRef.current = questionId;
  const userAnswersRef = useRef<Array<any>>([]);

  //userAnswersRef.current = userAnswers;
  
  //const [testVar, setTestVar] = useState<string>('HALLO');
  //setTestVar('HALLO2');

  if (!topicIdRef.current && initialMessages.length > 0) {
    console.log('*** re-setting topicId and subtopicId ***')
    // Loop through messages from the last to first and get the first topicId, subtopicId as well as all the userAnswers of the last subtopicId
    //let topicId = null;
    //let subtopicId = null;
    //let userAnswers = [];
    //console.log('initialMessages', initialMessages)
    //let lastAnswer = {qid: null, question: null, answer: null}
    // loop messages from first to last
    for (let i = 0; i < initialMessages.length; i++) {
      const message = initialMessages[i];
      parseMessage(message, false)
    }

    for (let i = initialMessages.length - 1; i >= 0; i--) {
      const message = initialMessages[i];
      //console.log('message', message);
      if (!topicIdRef.current && message.metadata && message.metadata.topicId) {
        //setTopicId(message.metadata.topicId);
        topicIdRef.current = message.metadata.topicId;
      }
      if (!subtopicIdRef.current && message.metadata && message.metadata.subtopicId) {
        //setSubtopicId(message.metadata.subtopicId);
        subtopicIdRef.current = message.metadata.subtopicId;
      }
      // Break if subtopicId changes
      if (message.metadata?.subtopicId) { // subtopicIdRef.current && subtopicIdRef.current !== message.metadata?.subtopicId
        break;
      }
      // Get the last user answer
      //console.log('message', message)
      //console.log('lastAnswer', lastAnswer)
      //console.log('userAnswersRef', userAnswersRef.current)
      /*
      if (message.role === 'user') {
        lastAnswer.answer = message.content;
      }
      else {
        lastAnswer.question = message.content;
        lastAnswer.qid = message.metadata?.questionId || null;
        userAnswersRef.current.push(lastAnswer)
        //userAnswersRef.current = userAnswersRef.current.push(lastAnswer);
        //console.log('userAnswers', userAnswers)
        lastAnswer = {qid: null, question: null, answer: null}
      }
      */

    }
  }

  function getMessageTextPart (message: ChatMessage, failOnNotFound: boolean = false) {
    for (let i = 0; i < message.parts.length; i++) {
      if (message.parts[i].type === 'text') {
        return message.parts[i]
      }
    }
    console.log('no messagePart found', JSON.stringify(message))
    if (failOnNotFound) {
      //console.log('getMessageTextPart - failOnNotFound', failOnNotFound)
      throw Error('no messagePart found')
    }
    return false
  }

  function getUserAnswers(messages: ChatMessage[]) {
    // go through messages from last to first and extract answers from messages with fitting topicID and subtopicId with current 
    let userAnswers = []
    let lastAnswer = {qid: '', question: '', answer: ''}
    // loop though messages
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      // Break at topic or subtopic mismatch
      if (message.metadata && (message.metadata.topicId !== topicIdRef.current || message.metadata.subtopicId !== subtopicIdRef.current)) {
        // Break for non-subtopic messages
        break;
      }

      if (message.role === 'user') {
        //console.log('user message', message, getMessageTextPart(message, true).text)
        if (!message.metadata) {
          //console.log('Message without metadata', message)
          //throw Error('Message without metadata')
          //continue
        }
        
        const messagePart = getMessageTextPart(message)
        if (!messagePart) {
          //console.log('no messagePart found', JSON.stringify(message))
          //return []
          continue
        }
        //lastAnswer.qid = lastAnswer.qid || message.metadata?.questionId || ''
        lastAnswer.answer = messagePart.text
        //Store and reset
        //console.log('*** lastAnswer', lastAnswer)
        if (lastAnswer.answer && lastAnswer.question) {
          userAnswers.push(lastAnswer) // Finished with assistant message
        }
        else {
          console.log('discarding lastAnswer', lastAnswer)
        }
        lastAnswer = {qid: '', question: '', answer: ''}
        //parseMessage(message, true)
      }
      if (message.role === 'assistant') {
        //console.log('assistant message', message, getMessageTextPart(message, true).text)
        if (message.metadata && message.metadata.questionId) {
          lastAnswer.qid = message.metadata.questionId || ''
        }
        lastAnswer.question = getMessageTextPart(message, true)?.text || ''
      }
    }
    return userAnswers
  }

  //console.log('typeof window', typeof window)
  
    
  

  function prepareSendMessagesRequest (params: any) {
    console.log('*** prepareSendMessagesRequest', params);
    const { messages, id } = params;
    //console.log('prepareSendMessagesRequest-1', messages, id);
    const my_message = messages.at(-1);
    //console.log('prepareSendMessagesRequest-10', my_message)
    const topicId = my_message.metadata?.topicId || topicIdRef.current || '';
    const subtopicId = my_message.metadata?.subtopicId || subtopicIdRef.current || '';
    //console.log('prepareSendMessagesRequest-11')
    let userAnswers = getUserAnswers(messages)
    console.log('userAnswers 1', userAnswers);

    
    //console.log('prepareSendMessagesRequest-111')
    // maybe process userAnswers here???, depending on subtopicId and messages
    
    if (!my_message.metadata) {
      my_message.metadata = {};
    }
    //console.log('prepareSendMessagesRequest-2');
    //console.log('testVar', testVar)
    //console.log('initialChatModel', initialChatModel)
    //console.log('topicId', topicId)
    //console.log('topicIdRef', topicIdRef.current, topicIdRef)
    //console.log('topicId', topicId)
    //console.log('my_message - topicId', my_message.metadata.topicId, topicId);
    my_message.metadata.topicId = topicId //my_message.metadata.topicId || topicIdRef.current || '';
    my_message.metadata.subtopicId = subtopicId // my_message.metadata.subtopicId || subtopicIdRef.current || '';
    my_message.metadata.questionId = my_message.metadata.questionId || questionIdRef.current || null;
    //console.log('prepareSendMessagesRequest-3');
    //console.log('my_message 2', my_message);
    const body = {
      body: {
        id,
        message: my_message,
        selectedChatModel: initialChatModel,
        selectedVisibilityType: visibilityType,
        topicId: topicIdRef.current,
        subtopicId: subtopicIdRef.current,
        questionId: questionIdRef.current,
        question: questionRef.current,
        userAnswers: userAnswers
      }
    }
    console.log('*** prepareSendMessagesRequest body', body)
    return body;
  }
  //}, [topicId]);

  //////////////////////////////////////////////// messages
  function parseMessage (message: ChatMessage, onFinish: boolean = false) {
    console.log('sendGuidedMessage', sendGuidedMessage)
    //console.log('parseMessage', message, onFinish);
    //console.log('***************************')
    //console.log('***', message.id)
    //console.log('***************************')
    let content = 'Bitte erläutere deine Antwort noch etwas genauer.';
    let res = 'fail';
    let questionId = undefined;
    let question = undefined;
    let topicId = message.metadata?.topicId || topicIdRef.current || ''
    if (topicId && topicIdRef.current === undefined) {
      topicIdRef.current = topicId;
    }
    let subtopicId = message.metadata?.subtopicId || subtopicIdRef.current || '' //undefined subtopicIdRef.current;
    //console.log('* subtopicId, subtopicIdRef.current', subtopicId, subtopicIdRef.current)
    if (subtopicId && subtopicIdRef.current === undefined) {
      console.log('* setting subtopicIdRef.current', subtopicId)
      subtopicIdRef.current = subtopicId;
    }
    
    if (message.role === 'user') {
      return { content: 'user', res: 'user'};
    }
    

    // Get the message parts with type text
    //console.log('parseMessage: message', message)
    // Find the first part with type text
    let messagePart = getMessageTextPart(message)
    if (!messagePart) {
      console.log('no messagePart found', JSON.stringify(message))
      return { content, res };
    }
    
    
    //console.log('parseMessage: messagePart', messagePart);
    
    const text = messagePart.originalText || messagePart.text || '';
    messagePart.originalText = text;
    
    if (text.toLowerCase().startsWith('complete:')) {
      content = text.slice(9).trim();
      res = 'complete';
      // Do next topic
      //processedMessageIds.current.push(message.id);
  
      // Save the summary as a document with the guidedSummaryArtifact type
      /*
      const summaryDoc = {
        id: generateUUID(),
        userId: session.user?.id,
        title: `Zusammenfassung für: ${topic.title}`,
        // use guidedSummaryArtifact from artifact.tsx
        kind: 'guided-summary' as ArtifactKind, //guidedSummaryArtifact.kind,
        content: JSON.stringify({
          topicId: topicIdRef.current,
          subtopicId: subtopicIdRef.current,
          summary: content,
        }),
      };
      */
      // TODO await saveDocument(summaryDoc);
    }
    if (text.toLowerCase().startsWith('clarify:')) {
      content = text.slice(8).trim();
      res = 'clarify';
    }
    if (text.toLowerCase().startsWith('next:')) {
      content = text.slice(5).trim();
      console.log('*** is next', content)
      res = 'next';
      console.log('*** NEXT')
      console.log('topicIdRef.current', topicIdRef.current, subtopicIdRef.current)
      console.log('guidedTopics[topicIdRef.current]', guidedTopics[topicIdRef.current])
      console.log('guidedTopics[topicIdRef.current]?.subtopics[subtopicIdRef.current]?', guidedTopics[topicIdRef.current]?.subtopics[subtopicIdRef.current])
      console.log('guidedTopics[topicIdRef.current]?.subtopics[subtopicIdRef.current]?.questions[content.trim()]', content.trim(), guidedTopics[topicIdRef.current]?.subtopics[subtopicIdRef.current]?.questions[content.trim()])
      question = guidedTopics[topicIdRef.current]?.subtopics[subtopicIdRef.current]?.questions[content.trim()]
      if (question) {
        questionId = content.trim();
      }
      //console.log('** question', question)
      //console.log('** questionId', questionId)
      //console.log('** messagePart', JSON.stringify(messagePart))
      content = question || content;
      //console.log('** messagePart2', JSON.stringify(messagePart))
      //question = content;
    }

    // Update the message content parts with type text
    //message.content = content //content.slice(res.length + 1).trim();
    if (res !== 'fail') {
      messagePart.text = content;
      if (!message.metadata) {
        message.metadata = {};
      };
      message.metadata.topicId = topicId;
      message.metadata.subtopicId = subtopicId;
      message.metadata.questionId = message.metadata.questionId || questionId || null;
      question = question || content;


      // That should happen on send + 
      const answer = {
        qid: questionId,
        question: question,
        answer: message.content
      }
      //console.log('answer', answer)
      if (!processedMessageIds.current.includes(message.id)) {
        console.log('xxx')
      }

      if (onFinish && !processedMessageIds.current.includes(message.id)) {
        // Push the answer          
        processedMessageIds.current.push(message.id);

        // Completed message
        if (res === 'complete') {
          // xxx


          // next answer
          sendGuidedMessage()


        }
        
        content = text.slice(9).trim();
      res = 'complete';

        // ccc

        

        // save the answer
        if (res === 'clarify') {
          //await saveAnswer(answer);
          // start new guided topic
          
        }
        

        // Set the 
        console.log('******** parse onFinish 11', messages.length, JSON.stringify(messages))
        // delay with setTimeout
        window.setMessages = setMessages;
        window.message = message;
        /*
        setTimeout(() => {
          console.log('******** parse onFinish 22', messages.length, JSON.stringify(messages))
          setMessages(prevMessages => {
            console.log('******** parse onFinish 11', prevMessages.length, JSON.stringify(prevMessages))
            const updatedMessages = prevMessages.map(msg => 
              msg.id === message.id ? message : msg
            );
            console.log('Updated messages:', updatedMessages);
            console.log('******** parse onFinish 22', updatedMessages.length, JSON.stringify(updatedMessages))
            return updatedMessages;
          });
        }, 0);
        */
        /*

        // Update the specific message in the messages array
        d
        setMessages(prevMessages => {
          console.log('******** parse onFinish 11', prevMessages.length, JSON.stringify(prevMessages))
          const updatedMessages = prevMessages.map(msg => 
            msg.id === message.id ? message : msg
          );
          console.log('Updated messages:', updatedMessages);
          console.log('******** parse onFinish 22', updatedMessages.length, JSON.stringify(updatedMessages))
          return updatedMessages;
        });

        console.log('******** parse onFinish 22a', messages.length, JSON.stringify(messages))
        */
        /*
        setMessages(messages.map((msg) => {
          if (msg.id === message.id) {
            return message;
          }
          return msg;
        }))*/
        /*
        if (typeof messages) {
          console.log('onFinish - ')
          console.log('*** messages', typeof messages)
          console.log('*** onFinish',  messages, setMessages)
        }*/
        
        /*
      messages.map((msg) => {
        console.log('onFinish currentMessages msg', JSON.stringify(msg))
        if (msg.id === data.message.id) {
          return data.message;
        }
        return msg;
      })*/
        //userAnswersRef.current.push(answer);
        //console.log('userAnswersRef.current', userAnswersRef.current)
        questionIdRef.current = questionId
        questionRef.current = question
        //const questionIdRef = useRef<string | undefined>(undefined);
        //const questionRef = useRef<string | undefined>(undefined);
        //questionIdRef.current = questionId;
        //const userAnswersRef = useRef<Array<any>>([]);
      }
    }
    
    // updated message?
    console.log('parseMessage done', { content, res }, message, JSON.stringify(message))
    return { content, res };
  }
  ////////////////////////////////////////////////


  if (typeof window !== 'undefined') {
    window.parseMessage = parseMessage;
  }
  


  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
  } = useChat<ChatMessage>({
    id,
    messages: initialMessages,
    sendExtraMessageFields: true,
    experimental_throttle: 100,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      fetch: fetchWithErrorHandlers,
      prepareSendMessagesRequest: prepareSendMessagesRequest
    }),
    onData: (dataPart) => {
      console.log('onData', dataPart)
      setDataStream((ds) => (ds ? [...ds, dataPart] : []));
    },
    onFinish: (data) => {
      console.log('*** onFinish', data)
      //data.message.HAHA = 'HAHAHAHAHAHA'
      //parseMessage(data.message, true);
      //data.message
      // replace message in messages
      //console.log('messages111', messages.length, messages)
      //console.log('setMessages', setMessages)
      /*
      messages.map((msg) => {
        console.log('onFinish currentMessages msg', JSON.stringify(msg))
        if (msg.id === data.message.id) {
          return data.message;
        }
        return msg;
      })*/
      //console.log('messages222', messages.length, messages)
      //setMessages(messages)
      //console.log('mutate unstable_serialize(getChatHistoryPaginationKey)', unstable_serialize(getChatHistoryPaginationKey))
      mutate(unstable_serialize(getChatHistoryPaginationKey));
      console.log('*** onFinish done')
    },
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast({
          type: 'error',
          description: error.message,
        });
      }
    },
  });
  //console.log('messages', messages)
  if (typeof window !== 'undefined') {
    window.messages = messages;
  }

  //console.log('messages.at(-1)', messages.at(-1))
  //console.log(status)
  useEffect(() => {
    console.log('useEffect status', status)
    // This effect runs every time a message is added
    parseMessage(messages.at(-1), false);
    /*
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        // Perform your mutation or side-effect here
        // Example: Save to DB, log, etc.
      }
    }
      */
  }, [messages]);
  
  if (status == 'streaming') {
    parseMessage(messages.at(-1), false);
  }
  if (status == 'done') {
    parseMessage(messages.at(-1), true);
  }
  
  //parseMessage(messages.at(-1), status);
  console.log('status', status)

  sendGuidedMessage = (topicId: string, subtopicId: string | null, questionId: string | null) => {
    //message: ChatMessage
    
    console.log('startGuidedFlow', topicId, subtopicId, status);

    if (!topicId) {
      console.log('random topicId')
      topicId = Object.keys(guidedTopics)[Math.floor(Math.random() * Object.keys(guidedTopics).length)];
      console.log('random topicId', topicId)
      //random subtopic
      subtopicId = Object.keys(guidedTopics[topicId].subtopics)[Math.floor(Math.random() * Object.keys(guidedTopics[topicId].subtopics).length)];
      console.log('random subtopicId', subtopicId)
    }
    const flowTopic = guidedTopics[topicId];
      if (!flowTopic) {
        throw new Error(`Topic with id ${topicId} not found`);
      }

      let flowSubtopic = Object.values(flowTopic.subtopics)[0];
      if (subtopicId && flowTopic.subtopics[subtopicId]) {
        flowSubtopic = flowTopic.subtopics[subtopicId];
      }

      const firstQuestion = Object.values(flowSubtopic.questions)[0];
      const firstQuestionId = Object.keys(flowSubtopic.questions)[0];
      //questionId = questionId || firstQuestionId;
      //console.log('setTopicId', flowTopic.id)
      topicIdRef.current = flowTopic.id;
      subtopicIdRef.current = flowSubtopic.id;
      questionIdRef.current = firstQuestionId;
      questionRef.current = firstQuestion;

      //setTopicId(flowTopic.id);
      //topicIdRef.current = flowTopic.id;
      //setTopicId(flowTopic.id);
      //setSubtopicId(flowSubtopic.id);
      //setQuestionId(questionId);

      const agentMessageId = generateUUID();
      const agentMessage: ChatMessage = {
        id: agentMessageId,
        role: 'assistant' as const,
        content: firstQuestion,
        parts: [{ type: 'text' as const, text: firstQuestion }],
        createdAt: new Date(),
        metadata: {
          topicId: flowTopic.id,
          subtopicId: flowSubtopic.id,
          questionId: firstQuestionId,
        },
      };


      messages.push(agentMessage);
      setMessages(messages);
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          message: agentMessage,
          selectedChatModel: initialChatModel,
          selectedVisibilityType: visibilityType,
          topicId: flowTopic.id,
          subtopicId: flowSubtopic.id,
          //lastQuestion: firstQuestion,
          //userAnswers: subtopicAnswers,
          //first: true,
        }),
      });
      //sendMessage(agentMessage);
      /*
      // remove all messages after the message with the given id
      this.state.messages = this.state.messages.slice(0, messageIndex + 1);

      // update the message with the new content
      this.state.replaceMessage(messageIndex, {
        ...uiMessage,
        id: message.messageId,
        role: uiMessage.role ?? 'user',
        metadata: message.metadata,
      } as UI_MESSAGE);
    } else {
      this.state.pushMessage({
        ...uiMessage,
        id: uiMessage.id ?? this.generateId(),
        role: uiMessage.role ?? 'user',
        metadata: message.metadata,
      } as UI_MESSAGE);
    }

    await this.makeRequest({
      trigger: 'submit-user-message',
      messageId: message.messageId,
      ...options,
    });
      */
      console.log('done startGuidedFlow', topicId, subtopicId, status, agentMessage)
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  useEffect(() => {
    if (query && !hasAppendedQuery) {
      sendMessage({
        role: 'user' as const,
        parts: [{ type: 'text', text: query }],
      });

      setHasAppendedQuery(true);
      window.history.replaceState({}, '', `/chat/${id}`);
    }
  }, [query, sendMessage, hasAppendedQuery, id]);

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  // annoying
  /*
  useEffect(() => {
    // This effect runs every time a message is added
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        lastMessage.HAHA = 'HAHAHAHAHAHA'
        // Perform your mutation or side-effect here
        // Example: Save to DB, log, etc.
      }
    }
  }, [messages.length]);
  */
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  if (typeof window !== 'undefined') {
    window.getUserAnswers = getUserAnswers;
    window.sendGuidedMessage = sendGuidedMessage;
  }

  useAutoResume({
    autoResume,
    initialMessages,
    resumeStream,
    setMessages,
  });
  if (typeof window !== 'undefined') {
    window.status2 = status;
  }
  //console.log('status', status)

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={initialChatModel}
          selectedVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          session={session}
        />

        <Messages
          chatId={id}
          status={status}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          regenerate={regenerate}
          isReadonly={isReadonly}
          isArtifactVisible={isArtifactVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              status={status}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              sendMessage={sendMessage}
              sendGuidedMessage={sendGuidedMessage}
              selectedVisibilityType={visibilityType}
            />
          )}
        </form>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        sendMessage={sendMessage}
        messages={messages}
        setMessages={setMessages}
        regenerate={regenerate}
        votes={votes}
        isReadonly={isReadonly}
        selectedVisibilityType={visibilityType}
      />
    </>
  );
}
