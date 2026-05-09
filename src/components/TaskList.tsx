'use client';

import React from 'react';
import { useTaskStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { getPriorityColor } from '@/utils/constants';

export const TaskList: React.FC = () => {
  const { tasks, removeTask } = useTaskStore();

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        No tasks yet. Create one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-800">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-neutral-500 mt-1">{task.description}</p>
                )}
                
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2 text-xs text-neutral-600">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          readOnly
                          className="rounded text-primary focus:ring-primary h-3 w-3"
                        />
                        <span className={subtask.completed ? 'line-through opacity-50' : ''}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removeTask(task.id)}
                className="p-1 text-neutral-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
