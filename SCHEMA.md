# Database Schema Documentation

## 📊 Schema Overview

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │◄─────────┐
│ email (unique)  │          │
│ password        │          │
│ displayName     │          │
│ avatar          │          │
│ academicLevel   │          │
│ reminderFreq    │          │
│ theme           │          │
│ timeZone        │          │ One-to-Many
│ createdAt       │          │
│ updatedAt       │          │
│ lastLogin       │          │
└─────────────────┘          │
         │                   │
         │ One-to-Many       │
         ├─────────────────►┌──────────────────┐     ┌──────────────────┐
         │                 │     Task          │     │   Subtask        │
         │                 ├──────────────────┤     ├──────────────────┤
         │                 │ id (PK)          │     │ id (PK)          │
         │                 │ userId (FK)      │◄───►│ taskId (FK)      │
         │                 │ title            │ 1:N │ title            │
         │                 │ description      │     │ completed        │
         │                 │ dueDate          │     │ dueDate          │
         │                 │ priority         │     │ order            │
         │                 │ status           │     │ createdAt        │
         │                 │ category         │     │ completedAt      │
         │                 │ tags[]           │     └──────────────────┘
         │                 │ estimatedTime    │
         │                 │ actualTime       │
         │                 │ aiPriority       │
         │                 │ nlpRawInput      │
         │                 │ nlpParsedEntities│
         │                 │ createdAt        │
         │                 │ completedAt      │
         │                 └──────────────────┘
         │
         └─────────────────┐
                           │ One-to-Many
                           ▼
                    ┌──────────────────┐
                    │    Insight       │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ userId (FK)      │
                    │ date             │
                    │ tasksCreated     │
                    │ tasksCompleted   │
                    │ completionRate   │
                    │ avgTimeSpent     │
                    │ topCategory      │
                    │ mostProductiveHr │
                    │ totalTasksActive │
                    │ overdueTasks     │
                    └──────────────────┘
```

---

## 🔑 Detailed Field Definitions

### **User Table**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | String (CUID) | ✓ | Auto | Unique user identifier |
| email | String | ✓ | - | Unique email address |
| password | String | ✓ | - | Hashed password |
| displayName | String | ✗ | null | User's display name |
| avatar | String (URL) | ✗ | null | Avatar image URL |
| academicLevel | String | ✓ | "Undergraduate" | HighSchool, Undergraduate, Graduate |
| reminderFrequency | String | ✓ | "daily" | disabled, hourly, daily, weekly |
| theme | String | ✓ | "auto" | light, dark, auto |
| timeZone | String | ✓ | "UTC" | User's timezone |
| createdAt | DateTime | ✓ | now() | Account creation timestamp |
| updatedAt | DateTime | ✓ | auto | Last updated timestamp |
| lastLogin | DateTime | ✗ | null | Last login timestamp |

---

### **Task Table**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | String (CUID) | ✓ | Auto | Unique task identifier |
| userId | String (FK) | ✓ | - | Reference to User who owns task |
| title | String | ✓ | - | Task name/title |
| description | String | ✗ | null | Detailed task description |
| dueDate | DateTime | ✓ | - | When task is due |
| priority | String | ✓ | "Medium" | Low, Medium, High, Urgent |
| status | String | ✓ | "Pending" | Pending, InProgress, Completed, Archived |
| category | String | ✓ | "Personal" | Work, Personal, Academics, Health |
| tags | String[] | ✓ | [] | Array of tag strings |
| estimatedTime | Int | ✗ | null | Estimated minutes to complete |
| actualTime | Int | ✗ | null | Actual minutes spent |
| aiPriority | Int | ✗ | 50 | AI priority score (0-100) |
| nlpRawInput | String | ✗ | null | Original NLP input text |
| nlpParsedEntities | Json | ✗ | null | Parsed entities from NLP |
| nlpConfidence | Float | ✗ | 0 | Confidence score of NLP parsing |
| createdAt | DateTime | ✓ | now() | Task creation timestamp |
| updatedAt | DateTime | ✓ | auto | Last updated timestamp |
| completedAt | DateTime | ✗ | null | When task was completed |

---

### **Subtask Table**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | String (CUID) | ✓ | Auto | Unique subtask identifier |
| taskId | String (FK) | ✓ | - | Reference to parent Task |
| title | String | ✓ | - | Subtask name |
| completed | Boolean | ✓ | false | Completion status |
| dueDate | DateTime | ✗ | null | Optional subtask deadline |
| order | Int | ✓ | 0 | Display order (0-based) |
| createdAt | DateTime | ✓ | now() | Creation timestamp |
| updatedAt | DateTime | ✓ | auto | Last updated timestamp |
| completedAt | DateTime | ✗ | null | When subtask was completed |

---

### **Insight Table**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | String (CUID) | ✓ | Auto | Unique insight record ID |
| userId | String (FK) | ✓ | - | Reference to User |
| date | DateTime | ✓ | now() | Date of insight record |
| tasksCreated | Int | ✓ | 0 | Number of tasks created that day |
| tasksCompleted | Int | ✓ | 0 | Number of tasks completed that day |
| completionRate | Float | ✓ | 0 | Percentage of tasks completed (0-100) |
| avgTimeSpent | Int | ✓ | 0 | Average time spent in minutes |
| topCategory | String | ✗ | null | Most used task category |
| mostProductiveHour | Int | ✗ | null | Hour of day most productive (0-23) |
| totalTasksActive | Int | ✓ | 0 | Number of active tasks |
| overdueTasks | Int | ✓ | 0 | Number of overdue tasks |
| createdAt | DateTime | ✓ | now() | Record creation timestamp |
| updatedAt | DateTime | ✓ | auto | Last updated timestamp |

---

### **NextAuth.js Tables** (Account, Session, VerificationToken)

These tables are auto-generated by NextAuth.js for authentication:

- **Account**: OAuth provider connection data
- **Session**: Active user sessions
- **VerificationToken**: Email verification tokens

---

## 🔗 Relationships

### User → Task (One-to-Many)
- A user has many tasks
- A task belongs to exactly one user
- Cascade delete: Deleting user deletes all user's tasks

### Task → Subtask (One-to-Many)
- A task can have many subtasks
- A subtask belongs to exactly one task
- Cascade delete: Deleting task deletes all subtasks

### User → Insight (One-to-Many)
- A user has many insight records
- Each insight record is for one user
- One record per day recommended

---

## 📑 Indexes

For performance optimization, the following indexes are created:

```sql
-- User
CREATE INDEX idx_user_email ON "User"(email);

-- Task
CREATE INDEX idx_task_userId ON "Task"(userId);
CREATE INDEX idx_task_status ON "Task"(status);
CREATE INDEX idx_task_dueDate ON "Task"(dueDate);
CREATE INDEX idx_task_priority ON "Task"(priority);

-- Subtask
CREATE INDEX idx_subtask_taskId ON "Subtask"(taskId);

-- Insight
CREATE INDEX idx_insight_userId ON "Insight"(userId);
CREATE INDEX idx_insight_date ON "Insight"(date);
```

---

## 💾 Database Size Estimates

For 1,000 active users (approximate):

- **User table**: ~500 KB
- **Task table**: ~50 MB (50 tasks per user avg)
- **Subtask table**: ~30 MB (3 subtasks per task avg)
- **Insight table**: ~20 MB (1 year of daily data)
- **Total**: ~100 MB

Supabase free tier: 500 MB is plenty for MVP phase.

---

## 🔒 Data Constraints

**Not Null Fields:**
- User: id, email, password, academicLevel, reminderFrequency, theme, timeZone, createdAt, updatedAt
- Task: id, userId, title, dueDate, priority, status, category, tags, createdAt, updatedAt
- Subtask: id, taskId, title, completed, order, createdAt, updatedAt
- Insight: id, userId, date, tasksCreated, tasksCompleted, completionRate, avgTimeSpent, totalTasksActive, overdueTasks, createdAt, updatedAt

**Unique Constraints:**
- User.email (no two users with same email)

**String Enums (enforced in app layer):**
- User.academicLevel: "HighSchool", "Undergraduate", "Graduate"
- User.reminderFrequency: "disabled", "hourly", "daily", "weekly"
- User.theme: "light", "dark", "auto"
- Task.priority: "Low", "Medium", "High", "Urgent"
- Task.status: "Pending", "InProgress", "Completed", "Archived"
- Task.category: "Work", "Personal", "Academics", "Health"

---

## 📝 Example Queries

### Get all tasks for a user sorted by priority
```typescript
const tasks = await prisma.task.findMany({
  where: { userId: 'user-id' },
  include: { subtasks: true },
  orderBy: { priority: 'desc' }
})
```

### Get today's insights
```typescript
const today = new Date()
today.setHours(0, 0, 0, 0)
const insights = await prisma.insight.findFirst({
  where: {
    userId: 'user-id',
    date: { gte: today }
  }
})
```

### Get overdue tasks
```typescript
const overdue = await prisma.task.findMany({
  where: {
    userId: 'user-id',
    dueDate: { lt: new Date() },
    status: { not: 'Completed' }
  }
})
```

### Create task with subtasks
```typescript
const task = await prisma.task.create({
  data: {
    title: 'Study',
    userId: 'user-id',
    dueDate: new Date(),
    subtasks: {
      create: [
        { title: 'Review notes', order: 0 },
        { title: 'Practice problems', order: 1 }
      ]
    }
  }
})
```

---

## 🚀 Ready for Development

The database schema is production-ready. Proceed with:
1. Setting up your database (Supabase recommended)
2. Running Prisma migrations
3. Building API routes in Step 3

---
