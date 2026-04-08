/**
 * Priority level utilities
 */

import { TaskPriority } from '@/types'

export const getPriorityColor = (priority: TaskPriority): string => {
  const colors: Record<TaskPriority, string> = {
    Low: 'bg-blue-100 text-blue-800 border-blue-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Urgent: 'bg-red-100 text-red-800 border-red-200',
  }
  return colors[priority]
}

export const getPrioritySortValue = (priority: TaskPriority): number => {
  const values: Record<TaskPriority, number> = {
    Urgent: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  }
  return values[priority]
}

/**
 * Category utilities
 */

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Work: 'bg-purple-100 text-purple-800',
    Personal: 'bg-pink-100 text-pink-800',
    Academics: 'bg-blue-100 text-blue-800',
    Health: 'bg-green-100 text-green-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}
