/* Task Types */
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type TaskStatus = 'Pending' | 'InProgress' | 'Completed' | 'Archived'
export type TaskCategory = 'Work' | 'Personal' | 'Academics' | 'Health'

export interface Subtask {
  id: string
  taskId: string
  title: string
  completed: boolean
  dueDate?: Date | string
  order: number
  createdAt: Date | string
}

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  dueDate: Date | string
  priority: TaskPriority
  status: TaskStatus
  category: TaskCategory
  tags: string[]
  estimatedTime?: number
  actualTime?: number
  subtasks: Subtask[]
  createdAt: Date | string
  completedAt?: Date | string
  aiPriority?: number
  nlpRawInput?: string
  nlpParsedEntities?: any
  nlpConfidence?: number
}

/* User Types */
export type AcademicLevel = 'HighSchool' | 'Undergraduate' | 'Graduate'

export interface UserPreferences {
  reminderFrequency: 'disabled' | 'hourly' | 'daily' | 'weekly'
  theme: 'light' | 'dark' | 'auto'
  timeZone: string
}

export interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
  academicLevel: AcademicLevel
  preferences: UserPreferences
  createdAt: Date
  lastLogin: Date
}

/* Insight Types */
export interface DailyMetrics {
  tasksCreated: number
  tasksCompleted: number
  completionRate: number
  avTimeSpent: number // in minutes
  topCategory?: TaskCategory
  mostProductiveHour?: number
}

export interface Insight {
  userId: string
  date: Date
  metrics: DailyMetrics
}

/* API Response Types */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
