'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { ChatHeader } from '@/components/chat-header';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { guidedTopics } from '@/lib/guided-topics';

type Summary = {
  id: string;
  chatId: string;
  summary: string;
  status: string;
  chatTitle: string;
  createdAt: string;
};

type Subtopic = {
  [key: string]: Summary[];
};

type Topic = {
  [key: string]: Subtopic;
};

export default function SummariesPage() {
  const { data: session } = useSession();
  const [summaries, setSummaries] = useState<Record<string, Record<string, Summary[]>>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [expandedSubtopics, setExpandedSubtopics] = useState<Record<string, boolean>>({});

  // Initialize expanded state when summaries are loaded
  const initializeExpandedState = (summariesData: Record<string, Record<string, Summary[]>>) => {
    const topics: Record<string, boolean> = {};
    const subtopics: Record<string, boolean> = {};

    Object.entries(summariesData).forEach(([topicId, subtopicsData]) => {
      // Expand all topics
      topics[topicId] = true;
      
      // Expand all subtopics for each topic
      Object.keys(subtopicsData).forEach(subtopicId => {
        subtopics[`${topicId}-${subtopicId}`] = true;
      });
    });
    
    return { topics, subtopics };
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get topic title by ID
  const getTopicTitle = (topicId: string) => {
    return guidedTopics[topicId]?.title || topicId;
  };

  // Helper function to get subtopic title by topic ID and subtopic ID
  const getSubtopicTitle = (topicId: string, subtopicId: string) => {
    return guidedTopics[topicId]?.subtopics[subtopicId]?.title || subtopicId;
  };

  useEffect(() => {
    if (!session?.user) return;

    const fetchSummaries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/chat-summaries');
        if (!response.ok) {
          throw new Error('Failed to fetch summaries');
        }
        const data = await response.json();
        const summariesData = data.data || {};
        
        // Initialize expanded state with all items expanded
        const { topics, subtopics } = initializeExpandedState(summariesData);
        
        // Update both summaries and expanded states in a single render
        setSummaries(summariesData);
        setExpandedTopics(topics);
        setExpandedSubtopics(subtopics);
      } catch (err) {
        console.error('Error fetching summaries:', err);
        setError('Failed to load summaries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [session]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleSubtopic = (topicId: string, subtopicId: string) => {
    const key = `${topicId}-${subtopicId}`;
    setExpandedSubtopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Common wrapper for all content with ChatHeader
  const renderContent = (content: React.ReactNode) => (
    <div className="flex flex-col h-full">
      <ChatHeader
        chatId="summaries"
        selectedModelId={DEFAULT_CHAT_MODEL}
        selectedVisibilityType="private"
        isReadonly={true}
        session={session!}
      />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {content}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return renderContent(
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return renderContent(
      <div className="flex items-center justify-center h-full">
        <p>Bitte melden Sie sich an, um die Zusammenfassungen zu sehen.</p>
      </div>
    );
  }

  if (error) {
    return renderContent(
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (Object.keys(summaries).length === 0) {
    return renderContent(
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <MessageSquare className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Noch keine Zusammenfassungen.</p>
      </div>
    );
  }

  return renderContent(
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Zusammenfassungen</h1>
        <p className="text-muted-foreground">
          Die bisher abgeschlossenen Gespräche.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(summaries).map(([topicId, subtopics]) => (
          <Card key={topicId} className="overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => toggleTopic(topicId)}
            >
              <CardHeader className="py-3 px-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  {expandedTopics[topicId] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <CardTitle className="text-lg">
                    {getTopicTitle(topicId)}
                  </CardTitle>
                </div>
              </CardHeader>
            </button>

            {expandedTopics[topicId] && (
              <CardContent className="pt-0 px-4 pb-4">
                <div className="space-y-4">
                  {Object.entries(subtopics).map(([subtopicId, summaries]) => (
                    <div key={subtopicId} className="ml-6">
                      <button
                        className="w-full text-left flex items-center gap-2 mb-2 text-muted-foreground hover:text-foreground"
                        onClick={() => toggleSubtopic(topicId, subtopicId)}
                      >
                        {expandedSubtopics[`${topicId}-${subtopicId}`] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {getSubtopicTitle(topicId, subtopicId)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({summaries.length})
                        </span>
                      </button>

                      {expandedSubtopics[`${topicId}-${subtopicId}`] && (
                        <div className="ml-6 space-y-3 mt-2">
                          {summaries.map((summary) => (
                            <Link
                              key={summary.id}
                              href={`/chat/${summary.chatId}`}
                              className="block group"
                            >
                              <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium group-hover:underline">
                                    {summary.chatTitle}
                                  </h4>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(summary.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {summary.summary}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
