import Link from "next/link";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/25">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-2 text-7xl font-extrabold text-white">404</h1>
        <p className="mb-6 text-lg text-slate-400">This page doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700/50 transition-all"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
