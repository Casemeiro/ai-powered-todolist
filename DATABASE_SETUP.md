# Database Setup Guide

This guide explains how to set up the PostgreSQL database for the AI-Powered To-Do-List application using Prisma ORM.

## 🔧 Option 1: Local PostgreSQL Setup (Development)

### Prerequisites
- PostgreSQL 14+ installed on your machine
- pgAdmin (optional, for GUI management)

### Steps

1. **Create a local database:**
   ```bash
   # Using psql CLI
   psql -U postgres
   CREATE DATABASE todolist_db;
   \q
   ```

2. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. **Update DATABASE_URL in `.env`:**
   ```
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/todolist_db
   ```

4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **View the database (optional):**
   ```bash
   npx prisma studio
   ```

---

## ☁️ Option 2: Supabase (Recommended for MVP)

Supabase provides a PostgreSQL database with free tier and zero configuration needed.

### Steps

1. **Create a Supabase account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub/email
   - Create a new project

2. **Get your database connection string:**
   - Go to `Settings` → `Database`
   - Copy the connection string (PostgreSQL URI)
   - It looks like: `postgresql://[user]:[password]@[host]:[port]/[database]`

3. **Update `.env`:**
   ```
   DATABASE_URL=postgresql://postgres.[project-id]:[password]@aws-0-[region].sql.supabase.co:5432/postgres
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **View data (optional):**
   ```bash
   npx prisma studio
   ```

**Supabase Benefits:**
- Free tier (500 MB database)
- Built-in authentication
- Real-time features
- No server management
- Easy to scale

---

## 🚂 Option 3: Railway (Alternative Cloud Option)

### Steps

1. **Create a Railway account:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create a new project

2. **Add PostgreSQL plugin:**
   - Click `+ New`
   - Select `PostgreSQL`
   - Railway auto-generates credentials

3. **Get connection string:**
   - In Railway dashboard, click `PostgreSQL`
   - Copy the connection string from the `DATABASE_URL` variable
   - Or combine: `postgresql://[user]:[password]@[host]:[port]/[database]`

4. **Update `.env`:**
   ```
   DATABASE_URL=your-railway-connection-string
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

**Railway Benefits:**
- Pay-as-you-go pricing ($5-10/month typical)
- Easy deployment
- Can host entire Next.js app on Railway too

---

## 📋 Schema Overview

The database includes these tables:

### **User**
- User account information
- Authentication details
- Preferences (theme, reminders, timezone)

### **Task**
- Todo items with dates and priorities
- AI priority scoring
- NLP parsing data
- Links to subtasks

### **Subtask**
- Breaking down large tasks
- Individual tracking of sub-components

### **Insight**
- Daily analytics and metrics
- Completion rates
- Productivity patterns

### **Account, Session, VerificationToken**
- NextAuth.js authentication tables
- Session management

---

## 🔄 Prisma Commands

### Generate Migrations
After modifying `schema.prisma`:
```bash
npx prisma migrate dev --name description_of_changes
```

### Apply Migrations to Production
```bash
npx prisma migrate deploy
```

### Reset Database (Development only!)
```bash
npx prisma migrate reset
```

### View Database GUI
```bash
npx prisma studio
```

### Generate Prisma Client
```bash
npx prisma generate
```

---

## 🛡️ Security Considerations

1. **Never commit `.env` file** - Only commit `.env.example`
2. **DATABASE_URL is secret** - Never expose in public repos
3. **Use strong passwords** for database
4. **Enable SSL/TLS** on production databases
5. **Implement row-level security** (RLS) in Supabase for sensitive data
6. **Regular backups** for production data

---

## 📚 Using Prisma in the App

### Import Prisma Client
```typescript
import { prisma } from '@/lib/prisma'
```

### Query Examples
```typescript
// Get all user tasks
const tasks = await prisma.task.findMany({
  where: { userId: 'user-id' },
  include: { subtasks: true }
})

// Create task
const newTask = await prisma.task.create({
  data: {
    title: 'Study for exam',
    userId: 'user-id',
    dueDate: new Date('2026-04-15'),
    priority: 'High'
  }
})

// Update task
const updated = await prisma.task.update({
  where: { id: 'task-id' },
  data: { status: 'Completed' }
})
```

---

## 🐛 Troubleshooting

### "Can't connect to database"
- Check `DATABASE_URL` in `.env`
- Verify PostgreSQL is running
- Test connection: `psql [your-connection-string]`

### "Migration failed"
- Check Prisma schema syntax
- Try: `npx prisma migrate resolve --rolled-back [migration-name]`
- Reset and retry: `npx prisma migrate reset` (dev only)

### "Prisma Client not synced"
- Run: `npx prisma generate`
- Restart TypeScript server in VS Code

---

## 🚀 Next Steps

1. Choose your database option (local, Supabase, or Railway)
2. Set up `.env` with DATABASE_URL
3. Run `npx prisma migrate dev --name init`
4. Start building API routes!

---

**Questions?** Check [Prisma Docs](https://www.prisma.io/docs/) or [Supabase Docs](https://supabase.com/docs)
