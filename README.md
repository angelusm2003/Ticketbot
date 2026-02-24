# TicketBot — AI-Powered IT Service Desk

TicketBot is a full-stack Next.js 14 application that uses AI to turn natural language conversations into structured Jira tickets. Built with the App Router, Tailwind CSS, NextAuth JWT authentication, and Supabase Edge Functions.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![NextAuth](https://img.shields.io/badge/NextAuth-4-purple)

---

## Features

- **AI Chat with Streaming** — Describe IT issues in plain English; the AI streams responses token-by-token via Server-Sent Events.
- **Automatic Ticket Generation** — The AI extracts summary, priority, issue type, and description into a structured ticket card.
- **One-Click Jira Submission** — Review the generated ticket and submit it directly to Jira without leaving the chat.
- **JWT Authentication** — NextAuth v4 with Credentials provider, HS256-signed JWT tokens, HTTP-only cookies, 24-hour expiry.
- **Role-Based Users** — Two built-in demo accounts (`admin`/`admin` and `angel`/`angel`) with admin and user roles.
- **Protected Routes** — Middleware redirects unauthenticated users to `/login` for all protected pages.
- **Landing Page** — Modern, responsive marketing page with animations, feature highlights, testimonials, and CTAs.
- **API Documentation** — Built-in `/api-docs` page with architecture overview, route map, and endpoint reference.
- **Server-Side Proxies** — API routes proxy requests to Supabase Edge Functions, keeping keys server-side and avoiding CORS.

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 14 (App Router)             |
| Language       | TypeScript 5                        |
| Styling        | Tailwind CSS 3.4                    |
| Authentication | NextAuth v4 (JWT strategy)          |
| AI Backend     | Supabase Edge Functions (Deno)      |
| Ticketing      | Jira REST API (via Supabase proxy)  |
| State          | React Query, React hooks            |
| UI Libraries   | Lucide Icons, Framer Motion, Sonner |

---

## Route Structure

| Route                    | Type | Access    | Description                              |
| ------------------------ | ---- | --------- | ---------------------------------------- |
| `/`                      | Page | Public    | Landing page                             |
| `/login`                 | Page | Public    | Sign-in page with demo credentials       |
| `/dashboard`             | Page | Protected | Main AI chat interface                   |
| `/settings`              | Page | Protected | User profile & session info              |
| `/api-docs`              | Page | Protected | API documentation                        |
| `/api/auth/*`            | API  | Public    | NextAuth endpoints (sign-in/out/session) |
| `/api/chat`              | API  | Protected | AI chat streaming proxy → Supabase       |
| `/api/create-jira-ticket`| API  | Protected | Jira ticket creation proxy → Supabase    |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- A **Supabase** project with the `chat` and `create-jira-ticket` Edge Functions deployed
- (Optional) A **Jira** project for ticket creation

### 1. Clone the repository

```bash
git clone https://github.com/angelusm2003/Ticketbot.git
cd Ticketbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Mock mode (set to "true" to run without a real Jira org)
DEMO_MODE="true"
```

> **Tip:** Generate a secret with `openssl rand -base64 32`
>
> **Mock mode:** When `DEMO_MODE=true`, Jira ticket submissions return simulated responses (e.g., `DEMO-1234`). This lets reviewers test the full flow without Jira credentials.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the landing page.

### 5. Sign in

Navigate to `/login` or click "Login" in the navbar. Use one of the demo accounts:

| Username | Password | Role  |
| -------- | -------- | ----- |
| `admin`  | `admin`  | admin |
| `angel`  | `angel`  | user  |

### 6. Build for production

```bash
npm run build
npm start
```

---

## Deployment (Vercel)

This project is ready for one-click Vercel deployment:

1. Push the repo to GitHub (already done)
2. Import the repo in [Vercel](https://vercel.com/new)
3. Set the environment variables in Vercel's dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXTAUTH_URL` → your production URL (e.g., `https://ticketbot.vercel.app`)
   - `NEXTAUTH_SECRET` → a secure random string
4. Deploy — Vercel auto-detects Next.js

### Single Domain Architecture

The landing page and the app are merged into **one project**:
- `/` — Public landing page
- `/login` — Authentication
- `/dashboard`, `/settings`, `/api-docs` — Protected app pages
- `/api/*` — Backend API routes

No need for two separate deployments.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js 14 (Vercel)                 │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Landing (/) │  │  Login Page  │  │  Dashboard    │  │
│  │  (public)    │  │  (public)    │  │  (protected)  │  │
│  │  Server Comp │  │  Client Comp │  │  Client Comp  │  │
│  └─────────────┘  └──────┬───────┘  └───────┬───────┘  │
│                          │                  │           │
│                ┌─────────▼──────────────────▼─────┐     │
│                │       middleware.ts (JWT check)  │     │
│                └─────────────────┬────────────────┘     │
│                                  │                      │
│  ┌──────────────────────────────▼───────────────────┐  │
│  │              API Route Handlers                   │  │
│  │  /api/auth/*  /api/chat  /api/create-jira-ticket  │  │
│  └─────────┬────────┬─────────────┬─────────────────┘  │
│            │        │             │                     │
└────────────┼────────┼─────────────┼─────────────────────┘
             │        │             │
    NextAuth │  ┌─────▼─────┐  ┌───▼───────────┐
    (JWT)    │  │ Supabase  │  │ Supabase      │
             │  │ Edge Fn:  │  │ Edge Fn:      │
             │  │ chat      │  │ create-jira-  │
             │  │ (AI/LLM)  │  │ ticket (Jira) │
             │  └───────────┘  └───────────────┘
```

### Data Flow

1. **User → Chat:** Client sends message → `POST /api/chat` (Route Handler) → Supabase `chat` Edge Function → AI/LLM → SSE stream back to client
2. **User → Ticket:** AI generates ticket card → user clicks Submit → `POST /api/create-jira-ticket` (Route Handler) → Supabase `create-jira-ticket` Edge Function → Jira REST API (or mock in demo mode)
3. **Auth:** All protected pages pass through `middleware.ts` which checks for a valid NextAuth JWT cookie before rendering

### Key Design Decisions

- **Server-side proxies** keep Supabase keys out of the client bundle
- **Streaming SSE** delivers real-time AI responses without polling
- **JWT (not database sessions)** means zero-latency auth checks in middleware
- **Mock mode** (`DEMO_MODE=true`) enables full-flow testing without external services

---

## Authentication Flow

```
User visits /dashboard
       │
       ▼
  Middleware checks JWT cookie
       │
  ┌────┴────┐
  │ Valid?  │
  └────┬────┘
   No  │  Yes
   │   │   │
   ▼   │   ▼
/login │  Render page
   │   │
   ▼   │
Sign in with credentials
   │
   ▼
NextAuth verifies password
   │
   ▼
JWT token issued (HS256, 24h expiry)
   │
   ▼
Redirect to /dashboard
```

---

## API Reference

### `POST /api/chat`

Proxies messages to the Supabase `chat` Edge Function. Returns a streaming SSE response.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "My laptop screen is flickering" }
  ]
}
```

**Response:** Server-Sent Events stream

### `POST /api/create-jira-ticket`

Proxies ticket data to the Supabase `create-jira-ticket` Edge Function.

**Request:**
```json
{
  "ticket": {
    "summary": "Laptop screen flickering",
    "description": "Intermittent flicker on Dell XPS 15...",
    "issueType": "Task",
    "priority": "High"
  }
}
```

**Response:**
```json
{
  "key": "IT-1234",
  "url": "https://yourorg.atlassian.net/browse/IT-1234"
}
```

> See the full API documentation at `/api-docs` when the app is running.

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth handler
│   │   ├── chat/route.ts                 # AI chat proxy
│   │   └── create-jira-ticket/route.ts   # Jira proxy
│   ├── api-docs/page.tsx                 # API documentation
│   ├── dashboard/page.tsx                # Chat interface
│   ├── login/page.tsx                    # Login page
│   ├── settings/page.tsx                 # User settings
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   ├── not-found.tsx                     # 404 page
│   ├── page.tsx                          # Landing page
│   └── providers.tsx                     # React Query + Toaster
├── components/
│   ├── landing/                          # Landing page components
│   │   ├── LandingNavbar.tsx
│   │   └── LandingPage.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── ChatSidebar.tsx
│   ├── Navbar.tsx                        # App navbar (authenticated)
│   ├── SessionProvider.tsx
│   ├── TicketCard.tsx
│   └── TypingIndicator.tsx
├── lib/
│   ├── auth.ts                           # NextAuth config + users
│   ├── chatStream.ts                     # Streaming chat client
│   ├── jiraApi.ts                        # Jira ticket client
│   └── utils.ts                          # cn() utility
├── types/
│   └── next-auth.d.ts                    # NextAuth type augmentation
├── middleware.ts                          # Route protection
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Running Without External Services (Mock Mode)

Set `DEMO_MODE=true` in your `.env.local` (or Vercel env vars) to run the full application without:
- A Supabase project (for Jira ticket creation)
- A Jira Cloud org

In mock mode, the `/api/create-jira-ticket` endpoint returns simulated Jira responses like `DEMO-1234` with a fake Jira URL. The AI chat still requires the Supabase `chat` Edge Function.

---

## Demo Credentials

| Username | Password | Role  |
| -------- | -------- | ----- |
| `admin`  | `admin`  | admin |
| `angel`  | `angel`  | user  |

---

## License

MIT
