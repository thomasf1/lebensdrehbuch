import { z } from 'zod';

const textPartSchema = z.object({
  type: z.enum(['text']),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(['file']),
  mediaType: z.enum(['image/jpeg', 'image/png']),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(['user', 'assistant']),
    parts: z.array(partSchema),
    metadata: z.object({
      topicId: z.string(),
      subtopicId: z.string(),
      questionId: z.nullable(z.string()).optional(),
      createdAt: z.date().optional(),
    }),
  }),
  selectedChatModel: z.enum(['chat-model', 'chat-model-reasoning']),
  selectedVisibilityType: z.enum(['public', 'private']),
  topicId: z.string().optional(),
  subtopicId: z.string().optional(),
  questionId: z.string().optional(),
  userAnswers: z.array(
    z.object({
      qid: z.string().optional(),
      question: z.string().optional(),
      answer: z.string().optional(),
    }),
  ).optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
