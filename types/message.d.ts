import type { Message as OriginalMessage } from '@ai-sdk/react';

declare module '@ai-sdk/react' {
  interface Message extends OriginalMessage {
    meta?: {
      topicId?: string;
      subtopicId?: string;
      questionId?: string;
      [key: string]: unknown;
    };
  }
}
