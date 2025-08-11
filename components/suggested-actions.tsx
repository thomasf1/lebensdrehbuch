'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { ChatMessage } from '@/lib/types';
import { guidedTopics } from '@/lib/guided-topics';

interface SuggestedActionsProps {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
  sendGuidedMessage: (topicId: string, subtopicId: string | null) => void;
}

function PureSuggestedActions({
  chatId,
  sendMessage,
  selectedVisibilityType,
  sendGuidedMessage,
}: SuggestedActionsProps) {
  const topics = Object.values(guidedTopics).slice(2, 6);

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {topics.map((topic, topicIdx) => {
        const firstSubtopic = Object.values(topic.subtopics)[0];
        //console.log('topic', topic, 'firstSubtopic', firstSubtopic);
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * topicIdx }}
            key={`suggested-action-${topic.id}-${firstSubtopic.id}`}
            className={topicIdx > 1 ? 'hidden sm:block' : 'block'}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={() => sendGuidedMessage(topic.id, firstSubtopic.id)}
              className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
            >
              <span className="font-medium">{topic.title}</span>
              <span
                className="text-muted-foreground truncate w-full block"
                title={firstSubtopic.title}
              >
                {firstSubtopic.title}
              </span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
