import axios, { AxiosInstance } from 'axios'
import { Task, ApiResponse, User } from '@/types'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  /* Task Endpoints */
  getTasks() {
    return this.client.get<ApiResponse<Task[]>>('/tasks')
  }

  getTask(id: string) {
    return this.client.get<ApiResponse<Task>>(`/tasks/${id}`)
  }

  createTask(data: Partial<Task> & { isAiEnabled?: boolean; rawInput?: string }) {
    return this.client.post<ApiResponse<Task>>('/tasks', data)
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.client.put<ApiResponse<Task>>(`/tasks/${id}`, data)
  }

  deleteTask(id: string) {
    return this.client.delete<ApiResponse<void>>(`/tasks/${id}`)
  }

  completeTask(id: string) {
    return this.client.patch<ApiResponse<Task>>(`/tasks/${id}/complete`)
  }

  /* AI Endpoints */
  parseTask(input: string) {
    return this.client.post<ApiResponse>('/ai/parse-task', { input })
  }

  prioritizeTasks(tasks: Task[]) {
    return this.client.post<ApiResponse>('/ai/prioritize-tasks', { tasks })
  }

  decomposeTask(taskId: string) {
    return this.client.post<ApiResponse>(`/ai/decompose-task/${taskId}`)
  }

  suggestTime(taskId: string) {
    return this.client.get<ApiResponse>(`/ai/suggest-time/${taskId}`)
  }

  /* Insights Endpoints */
  getDailyBriefing() {
    return this.client.get<ApiResponse>('/insights/daily-briefing')
  }

  getWeeklyStats() {
    return this.client.get<ApiResponse>('/insights/weekly-stats')
  }

  getTrends() {
    return this.client.get<ApiResponse>('/insights/trends')
  }

  getProductivityHours() {
    return this.client.get<ApiResponse>('/insights/productivity-hours')
  }
}

export const apiClient = new APIClient()
