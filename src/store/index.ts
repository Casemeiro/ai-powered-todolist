import { create } from 'zustand'
import { Task, User } from '@/types'

interface TaskStore {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, task: Partial<Task>) => void
  removeTask: (id: string) => void
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

interface UIStore {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}))

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}))

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  selectedTaskId: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
}))
