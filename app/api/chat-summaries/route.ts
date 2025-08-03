import { NextResponse } from 'next/server';
import { saveChatSummary, getChatSummariesByUserId } from '@/lib/db/queries';
//import { getServerSession } from 'next-auth/next';
import { auth } from '@/app/(auth)/auth';
import { ChatSDKError } from '@/lib/errors';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const result = await getChatSummariesByUserId(session.user.id);
    
    // Group by topic and subtopic
    const grouped = result.reduce((acc, row) => {
      const chatSummary = row.ChatSummary;
      const chat = row.Chat;
      const { topicId, subtopicId } = chatSummary;
      
      if (!acc[topicId]) {
        acc[topicId] = {};
      }
      
      if (!acc[topicId][subtopicId]) {
        acc[topicId][subtopicId] = [];
      }
      
      acc[topicId][subtopicId].push({
        id: chatSummary.id,
        chatId: chatSummary.chatId,
        summary: chatSummary.summary,
        status: chatSummary.status,
        chatTitle: chat.title,
        createdAt: chat.createdAt
      });
      
      return acc;
    }, {} as Record<string, Record<string, Array<{
      id: string;
      chatId: string;
      summary: string;
      status: string;
      chatTitle: string;
      createdAt: Date;
    }>>>);

    return NextResponse.json({ data: grouped });
  } catch (error) {
    console.error('Error fetching chat summaries:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const { chatId, topicId, subtopicId, summary, status } = await request.json();
    
    await saveChatSummary({
      chatId,
      topicId,
      subtopicId,
      summary,
      status
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving chat summary:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
