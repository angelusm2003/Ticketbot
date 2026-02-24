"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { User, Mail, Shield, Clock, Key } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>

        {/* Profile Section */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40">
                <User className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {session?.user?.name || "—"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Display Name</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                <Mail className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {session?.user?.email || "—"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
                <Shield className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium capitalize text-slate-900 dark:text-white">
                  {session?.user?.role || "—"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Role</p>
              </div>
            </div>
          </div>
        </section>

        {/* Session & JWT Section */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Session &amp; Security</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                <Key className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">JWT (JSON Web Token)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Session strategy — tokens are signed with HS256 and stored as HTTP-only cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <Clock className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">24-hour expiry</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  JWT and session tokens expire after 24 hours. Re-login is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">About</h2>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p><strong>TicketBot</strong> v1.0.0</p>
            <p>Next.js 14 + App Router • NextAuth (JWT) • Tailwind CSS • Supabase Edge Functions</p>
          </div>
        </section>
      </main>
    </div>
  );
}
