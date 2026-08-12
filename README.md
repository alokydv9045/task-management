# Task Management System (Assessment)

This is a full-stack Task Management System built for a technical assessment. It features a Next.js (App Router) frontend and a NestJS backend.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Zustand, @dnd-kit/core (for Kanban Board), Axios, next-themes.
- **Backend:** NestJS, Prisma ORM, MongoDB (deployed on Atlas), Passport (JWT).

## Features

- **Guest Authentication:** Instantly jump into the application as a guest user. Sessions are tracked via JWT tokens.
- **Task Management Board:**
  - **Board View (Kanban):** Drag and drop tasks between columns (To Do, Doing, Completed, On Hold).
  - **List View:** View tasks in an organized, grouped list layout.
  - **Fields Menu:** Dynamically switch views and (mock) toggle visible fields.
- **Theming:** Full Dark/Light mode support matching the provided Figma design specs.

## Intentional Deviations (As per Assignment Guidelines)
To focus on core functionality and pixel-perfect design fidelity, the following deviations were intentionally made:
- **Projects & Settings Views:** The UI for `/projects` and `/settings` is completely implemented for 100% Figma fidelity, but the data is currently mocked. The Prisma schema focuses strictly on the requested `Task`, `User`, `Comment`, and `AuditLog` entities.
- **Subtasks CRUD:** Subtasks are successfully fetched from the backend relations in the Task Details view, but the UI to *create* new subtasks on-the-fly was deferred to focus on primary Task Kanban interactions.

## Getting Started

You will need two terminal windows to run the frontend and backend concurrently. Make sure you have your `.env` configured properly in the backend for MongoDB.

### 1. Start the Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed # Seeds the DB with test users, tasks, and comments
npm run start:dev
```
The backend will run on `http://localhost:3001`.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

Open your browser and navigate to `http://localhost:3000/login` to get started.

## Project Structure

- `/frontend` - Contains all Next.js code, components, and state management.
  - `/src/app` - Next.js App Router pages.
  - `/src/components` - Reusable UI components and complex views (BoardView, ListView).
  - `/src/store` - Zustand stores for global state (Auth, Tasks).
- `/backend` - Contains the NestJS API.
  - `/src/auth` - Authentication logic and JWT strategies.
  - `/src/tasks` - CRUD operations for Tasks.
  - `/prisma` - Database schema and migration files.
