/* Task Types */
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type TaskStatus = 'Pending' | 'InProgress' | 'Completed' | 'Archived'
export type TaskCategory = 'Work' | 'Personal' | 'Academics' | 'Health'

export interface Subtask {
  id: string
  taskId: string
  title: string
  completed: boolean
  dueDate?: Date
  order: number
  createdAt: Date
}

export interface NLPExtraction {
  rawInput: string
  parsedEntities: Record<string, unknown>
  confidence: number
}

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  dueDate: Date
  priority: TaskPriority
  status: TaskStatus
  category: TaskCategory
  tags: string[]
  estimatedTime?: number // in minutes
  actualTime?: number // in minutes
  subtasks: Subtask[]
  createdAt: Date
  completedAt?: Date
  aiPriority?: number // 0-100
  nlpExtraction?: NLPExtraction
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
