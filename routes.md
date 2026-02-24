# TicketBot — Route Architecture

## Pages (App Router)

| Route                          | File                                    | Access    | Description                                                        |
| ------------------------------ | --------------------------------------- | --------- | ------------------------------------------------------------------ |
| `/`                            | `app/page.tsx`                          | Public    | Landing page — product overview, features, testimonials, CTAs      |
| `/login`                       | `app/login/page.tsx`                    | Public    | Sign-in page with credentials form and demo account display        |
| `/dashboard`                   | `app/dashboard/page.tsx`                | Protected | Main AI chat interface — describe issues, generate Jira tickets    |
| `/settings`                    | `app/settings/page.tsx`                 | Protected | User profile, role display, session/JWT info                       |
| `/api-docs`                    | `app/api-docs/page.tsx`                 | Protected | Interactive API documentation with endpoint reference and examples |
| `/_not-found` (404)            | `app/not-found.tsx`                     | Public    | Custom 404 error page                                              |

## API Endpoints (Route Handlers)

| Endpoint                       | File                                            | Methods   | Auth     | Description                                                                            |
| ------------------------------ | ----------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------- |
| `/api/auth/[...nextauth]`      | `app/api/auth/[...nextauth]/route.ts`           | GET, POST | Public   | NextAuth handler — manages sign-in, sign-out, session, CSRF                            |
| `/api/chat`                    | `app/api/chat/route.ts`                          | POST      | Via JWT  | Proxies chat messages to Supabase `chat` Edge Function; streams SSE AI response        |
| `/api/create-jira-ticket`      | `app/api/create-jira-ticket/route.ts`            | POST      | Via JWT  | Proxies ticket data to Supabase `create-jira-ticket` Edge Function; supports mock mode |

## Middleware

| File              | Protects                                           | Behavior                                                       |
| ----------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `middleware.ts`   | `/dashboard/*`, `/settings/*`, `/api-docs/*`       | Checks JWT session cookie; redirects unauthenticated → `/login` |

## Route Groups & Layout

```
app/
├── layout.tsx              ← Root layout: SessionProvider + Providers (QueryClient, Toaster)
├── page.tsx                ← Public landing page (LandingPage component)
├── login/page.tsx          ← Public login (Suspense-wrapped for useSearchParams)
├── dashboard/page.tsx      ← Protected: Navbar + ChatSidebar + AI Chat + TicketCard
├── settings/page.tsx       ← Protected: Navbar + user profile/session info
├── api-docs/page.tsx       ← Protected: Navbar + API endpoint documentation
├── not-found.tsx           ← 404 page
└── api/
    ├── auth/[...nextauth]/route.ts   ← NextAuth (Credentials + JWT)
    ├── chat/route.ts                 ← AI chat streaming proxy → Supabase
    └── create-jira-ticket/route.ts   ← Jira creation proxy → Supabase (mock mode supported)
```

## Authentication Flow

1. User visits a protected route (e.g., `/dashboard`)
2. `middleware.ts` (NextAuth middleware) checks for a valid JWT session cookie
3. If unauthenticated → redirect to `/login?callbackUrl=/dashboard`
4. User submits credentials → `POST /api/auth/callback/credentials`
5. NextAuth `authorize()` validates against hardcoded demo users
6. JWT token issued (HS256, HTTP-only cookie, 24h expiry)
7. Redirect back to the original `callbackUrl`

## Demo Users

| Username | Password | Role  |
| -------- | -------- | ----- |
| `admin`  | `admin`  | admin |
| `angel`  | `angel`  | user  |

## Mock Mode

Set `DEMO_MODE=true` in environment variables to enable mock Jira responses. When enabled, the `/api/create-jira-ticket` endpoint returns a simulated Jira ticket response without calling the real Jira API — useful for reviewers who don't have Jira access.
