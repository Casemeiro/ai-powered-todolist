'use client';

import React, { useEffect } from 'react';
import { TaskCreator } from '@/components/TaskCreator';
import { TaskList } from '@/components/TaskList';
import { apiClient } from '@/services/api';
import { useTaskStore } from '@/store';

export default function Home() {
  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTasks = async () => {
      try {
        const response = await apiClient.getTasks();
        if (response.data.success && response.data.data) {
          setTasks(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();

    return () => abortController.abort();
  }, [setTasks]);

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900 flex items-center justify-center gap-3">
            <span className="text-primary">✨</span> AI To-Do List
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Manage your studies with the power of AI. Just type what you need to do, and we&apos;ll handle the rest.
          </p>
        </header>

        <section className="space-y-8">
          <TaskCreator />
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-700 px-1">Your Tasks</h2>
            <TaskList />
          </div>
        </section>
      </div>
    </main>
  );
}
