import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">AI To-Do List</h1>
          <p className="text-xl mb-4 opacity-90">
            An intelligent task management app powered by AI for students
          </p>
          <p className="text-lg mb-8 opacity-80">
            Organize, prioritize, and complete your tasks smarter.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition border border-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
