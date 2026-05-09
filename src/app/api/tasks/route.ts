import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { aiService } from '@/services/aiService';
import { TaskPriority, TaskCategory } from '@/types';

/**
 * GET /api/tasks
 * Fetches all tasks for the authenticated user.
 */
export async function GET() {
  const session = await getServerSession();
  
  // For prototype/demo purposes, if no session, we'll use a mock user or return error
  // In a real app, this should be: if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session?.user?.id || 'demo-user-id';

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: { subtasks: true },
      orderBy: [
        { aiPriority: 'desc' },
        { dueDate: 'asc' },
      ],
    });

    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

/**
 * POST /api/tasks
 * Creates a new task, optionally using AI for natural language parsing and decomposition.
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const userId = session?.user?.id || 'demo-user-id';
  
  try {
    const body = await req.json();
    const { title, description, dueDate, priority, category, isAiEnabled, rawInput } = body;

    const validPriorities: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
    const validCategories: TaskCategory[] = ['Work', 'Personal', 'Academics', 'Health'];

    let taskData = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      priority: validPriorities.includes(priority) ? priority : 'Medium',
      category: validCategories.includes(category) ? category : 'Personal',
      userId,
    };

    // 1. Natural Language Task Creation
    if (isAiEnabled && rawInput) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('AI features are currently unavailable (OpenAI API Key missing)');
      }
      const parsed = await aiService.parseTask(rawInput);
      taskData = {
        ...taskData,
        title: parsed.title,
        description: parsed.description || taskData.description,
        dueDate: new Date(parsed.dueDate),
        priority: parsed.priority,
        category: parsed.category,
      };
    }

    // Ensure title is not empty
    if (!taskData.title && !isAiEnabled) {
      throw new Error('Task title is required');
    }

    // Create the task
    const task = await prisma.task.create({
      data: {
        ...taskData,
        nlpRawInput: rawInput,
      },
    });

    // 2. Automated Task Decomposition
    // If it's a "big" task (e.g., category is Academics or contains certain keywords), auto-decompose
    if (isAiEnabled && (task.category === 'Academics' || task.title.length > 20)) {
      if (process.env.OPENAI_API_KEY) {
        const subtaskTitles = await aiService.decomposeTask(task.title, task.description || '');
        
        if (subtaskTitles.length > 0) {
          await prisma.subtask.createMany({
            data: subtaskTitles.map((stTitle, index) => ({
              title: stTitle,
              taskId: task.id,
              order: index,
            })),
          });
        }
      }
    }

    // Fetch the final task with subtasks
    const finalTask = await prisma.task.findUnique({
      where: { id: task.id },
      include: { subtasks: true },
    });

    return NextResponse.json({ success: true, data: finalTask });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create task';
    console.error('Task Creation Error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
