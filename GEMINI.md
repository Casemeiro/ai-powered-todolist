# GEMINI.md

## Project Overview
**AI-Powered To-Do-List** is an intelligent task management application specifically designed for students. It leverages AI (OpenAI GPT) to provide natural language task creation, smart prioritization, and automated task decomposition.

### Core Technologies
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** Zustand (Client state), TanStack Query (Server state)
- **API:** Next.js API Routes

### Architecture
The project follows a modern full-stack Next.js architecture:
- `src/app/`: Contains the application routes and UI layouts.
- `src/components/`: Reusable React components.
- `src/lib/`: Shared library instances (e.g., Prisma client).
- `src/services/`: API client logic and external service integrations.
- `src/store/`: Global client-side state using Zustand.
- `src/types/`: TypeScript type definitions.
- `prisma/`: Database schema definitions and migrations.

## Building and Running

### Prerequisites
- Node.js 18+
- PostgreSQL instance (local or hosted like Supabase/Railway)

### Setup
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root with the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/todolist"
   NEXTAUTH_SECRET="your-secret"
   OPENAI_API_KEY="your-api-key"
   ```
3. **Database Migration:**
   ```bash
   npx prisma migrate dev --name init
   ```

### Development Commands
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality.
- `npm run type-check`: Runs TypeScript compiler check.
- `npx prisma studio`: Opens a GUI to view and edit database data.

## Development Conventions

### Coding Style
- **TypeScript:** Strict typing is required. Avoid `any`.
- **Components:** Prefer functional components with Arrow Function syntax. Use Tailwind CSS for all styling.
- **State Management:** Use Zustand for UI-related global state (e.g., sidebar toggles). Use TanStack Query for server-side data fetching and caching.
- **API Routes:** Place backend logic in `src/app/api/` following Next.js App Router conventions.

### Database Patterns
- Use **Prisma** for all database interactions.
- Schema changes must be handled via `npx prisma migrate dev`.
- Critical models include `User`, `Task`, `Subtask`, and `Insight`.

### AI Integration
- Natural language parsing and prioritization logic should be centralized in service modules.
- The `nlpRawInput` and `nlpParsedEntities` fields in the `Task` model are used to track AI processing history.

## Documentation References
- [PRD.md](./PRD.md) - Product requirements and roadmap.
- [TECH_STACK.md](./TECH_STACK.md) - Detailed technical architecture.
- [SCHEMA.md](./SCHEMA.md) - Database field definitions and relationships.
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Deployment and database configuration guide.
