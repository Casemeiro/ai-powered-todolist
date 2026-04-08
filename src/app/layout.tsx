import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI To-Do List',
  description: 'An intelligent task management app for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  )
}
