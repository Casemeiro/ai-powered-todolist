/**
 * Utility functions for date handling
 */

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  const checkDate = new Date(date)
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  )
}

export const isOverdue = (date: Date): boolean => {
  return new Date(date) < new Date()
}

export const daysUntil = (date: Date): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  const diffTime = checkDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Utility functions for string handling
 */

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Utility functions for arrays
 */

export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string | number, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key])
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {} as Record<string | number, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}
