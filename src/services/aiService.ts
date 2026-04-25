import OpenAI from 'openai';
import { TaskPriority, TaskCategory } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ParsedTask {
  title: string;
  dueDate: string;
  priority: TaskPriority;
  category: TaskCategory;
  description?: string;
}

export interface AIPrioritizedTask {
  id: string;
  aiPriority: number;
}

/**
 * AI Service for handling natural language processing and smart task management.
 */
export const aiService = {
  /**
   * Parses a natural language input string into a structured task object.
   */
  async parseTask(input: string): Promise<ParsedTask> {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that helps students organize their tasks. 
          Extract task details from the user's natural language input.
          Return a JSON object with:
          - title (string): The name of the task
          - dueDate (string): ISO format date. If not mentioned, assume today or a reasonable near future.
          - priority (string): One of 'Low', 'Medium', 'High', 'Urgent'
          - category (string): One of 'Work', 'Personal', 'Academics', 'Health'
          - description (string): Any additional details found
          Current date: ${new Date().toISOString()}`,
        },
        { role: 'user', content: input },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Failed to parse task with AI');
    
    return JSON.parse(content) as ParsedTask;
  },

  /**
   * Re-evaluates priorities for a list of tasks based on deadlines and context.
   */
  async prioritizeTasks(tasks: any[]): Promise<AIPrioritizedTask[]> {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: `Analyze the following tasks for a student and assign an 'aiPriority' score from 0 to 100.
          Consider deadlines, importance, and typical student workload.
          Higher score means higher priority.
          Return a JSON object with a 'priorities' array containing objects with 'id' and 'aiPriority'.`,
        },
        { role: 'user', content: JSON.stringify(tasks) },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Failed to prioritize tasks with AI');
    
    return JSON.parse(content).priorities as AIPrioritizedTask[];
  },

  /**
   * Decomposes a large task into smaller, manageable subtasks.
   */
  async decomposeTask(title: string, description?: string): Promise<string[]> {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: `Break down the following student task into 3-5 actionable subtasks.
          Return a JSON object with a 'subtasks' array of strings (the subtask titles).`,
        },
        { role: 'user', content: `Task: ${title}${description ? `\nDescription: ${description}` : ''}` },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Failed to decompose task with AI');
    
    return JSON.parse(content).subtasks as string[];
  },
};
