'use client';

import React, { useState } from 'react';
import { apiClient } from '@/services/api';
import { useTaskStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export const TaskCreator: React.FC = () => {
  const [input, setInput] = useState('');
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createTask({
        title: isAiEnabled ? '' : input,
        rawInput: isAiEnabled ? input : undefined,
        isAiEnabled,
      });

      if (response.data.success && response.data.data) {
        addTask(response.data.data);
        setInput('');
      } else {
        setError(response.data.error || 'Failed to create task');
      }
    } catch (err: any) {

      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm border border-neutral-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isAiEnabled ? "Try: 'Study for Math exam on Friday 2pm'" : "Enter task title..."}
            className="w-full p-4 pr-12 text-lg border-2 border-neutral-100 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none h-24"
            disabled={isLoading}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAiEnabled(!isAiEnabled)}
              title={isAiEnabled ? "AI Enabled" : "AI Disabled"}
              className={`p-2 rounded-full transition-colors ${isAiEnabled ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-400'}`}
            >
              <span className="text-xl">✨</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            {isAiEnabled ? "AI will parse your task and suggest subtasks" : "Manual entry mode"}
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Create Task'
            )}
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};
