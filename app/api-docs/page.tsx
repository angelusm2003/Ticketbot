"use client";

import Navbar from "@/components/Navbar";
import { ExternalLink } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  auth: string;
  requestBody?: string;
  responseBody?: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "POST",
    path: "/api/auth/[...nextauth]",
    description:
      "NextAuth.js authentication endpoints. Handles sign-in, sign-out, session retrieval, and CSRF tokens.",
    auth: "Public (credentials submitted in body)",
    requestBody: `{
  "username": "admin",
  "password": "admin"
}`,
    responseBody: `{
  "user": { "id": "1", "name": "Admin User", "email": "admin@ticketbot.dev", "role": "admin" },
  "expires": "2025-03-01T00:00:00.000Z"
}`,
  },
  {
    method: "POST",
    path: "/api/chat",
    description:
      "Proxies chat messages to the Supabase Edge Function. Returns a streaming SSE response from the AI model. Injects a system hint to always use issueType 'Task' for demo purposes.",
    auth: "Protected — valid NextAuth JWT session required (enforced by middleware)",
    requestBody: `{
  "messages": [
    { "role": "user", "content": "My laptop screen is flickering" }
  ]
}`,
    responseBody: `data: {"choices":[{"delta":{"content":"I'll help you..."}}]}
data: {"choices":[{"delta":{"content":" create a ticket"}}]}
data: [DONE]`,
  },
  {
    method: "POST",
    path: "/api/create-jira-ticket",
    description:
      "Proxies ticket creation to the Supabase Edge Function which calls the Jira REST API. Forces issueType to 'Task' server-side for demo.",
    auth: "Protected — valid NextAuth JWT session required (enforced by middleware)",
    requestBody: `{
  "ticket": {
    "summary": "Laptop screen flickering",
    "description": "User reports intermittent screen flicker on Dell XPS 15.",
    "issueType": "Task",
    "priority": "High"
  }
}`,
    responseBody: `{
  "key": "IT-1234",
  "url": "https://yourorg.atlassian.net/browse/IT-1234"
}`,
  },
];

const BADGE_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">API Documentation</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Reference for all TicketBot API endpoints. All protected routes require a valid JWT session
            from NextAuth.
          </p>
        </div>

        {/* Architecture Overview */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Architecture</h2>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>Authentication:</strong> NextAuth v4 with Credentials provider. Sessions use
              the <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-700">jwt</code>{" "}
              strategy (HS256-signed, stored as HTTP-only cookie). Tokens expire after 24 hours.
            </p>
            <p>
              <strong>Route Protection:</strong> Next.js middleware intercepts requests to{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-700">/dashboard/*</code>,{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-700">/settings/*</code>, and{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-700">/api-docs/*</code>.
              Unauthenticated users are redirected to <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-700">/login</code>.
            </p>
            <p>
              <strong>Backend:</strong> Next.js API routes act as server-side proxies to Supabase
              Edge Functions, adding the Supabase anon key server-side to avoid CORS and key exposure.
            </p>
          </div>
        </section>

        {/* Route Map */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Route Map</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-2 pr-4 text-left font-medium text-slate-500 dark:text-slate-400">Path</th>
                  <th className="pb-2 pr-4 text-left font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/login</td>
                  <td className="py-2 pr-4">Page</td>
                  <td className="py-2">Sign in page (public)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/dashboard</td>
                  <td className="py-2 pr-4">Page</td>
                  <td className="py-2">Main chat interface (protected)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/settings</td>
                  <td className="py-2 pr-4">Page</td>
                  <td className="py-2">User profile &amp; session info (protected)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/api-docs</td>
                  <td className="py-2 pr-4">Page</td>
                  <td className="py-2">This API documentation page (protected)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/api/auth/*</td>
                  <td className="py-2 pr-4">API</td>
                  <td className="py-2">NextAuth endpoints (sign-in, sign-out, session, CSRF)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2 pr-4 font-mono text-xs">/api/chat</td>
                  <td className="py-2 pr-4">API</td>
                  <td className="py-2">AI chat streaming proxy → Supabase Edge Function</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">/api/create-jira-ticket</td>
                  <td className="py-2 pr-4">API</td>
                  <td className="py-2">Jira ticket creation proxy → Supabase Edge Function</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Endpoints */}
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Endpoints</h2>
        <div className="space-y-6">
          {ENDPOINTS.map((ep) => (
            <section
              key={ep.path}
              className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-bold ${BADGE_COLORS[ep.method]}`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-semibold text-slate-900 dark:text-white">
                  {ep.path}
                </code>
              </div>
              <div className="space-y-4 px-6 py-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">{ep.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  <strong>Auth:</strong> {ep.auth}
                </p>
                {ep.requestBody && (
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                      Request Body
                    </p>
                    <pre className="overflow-x-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {ep.requestBody}
                    </pre>
                  </div>
                )}
                {ep.responseBody && (
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                      Response
                    </p>
                    <pre className="overflow-x-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {ep.responseBody}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* External links */}
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href="https://next-auth.js.org/configuration/options"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-teal-600 hover:underline dark:text-teal-400"
          >
            NextAuth Docs <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://supabase.com/docs/guides/functions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-teal-600 hover:underline dark:text-teal-400"
          >
            Supabase Edge Functions <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
