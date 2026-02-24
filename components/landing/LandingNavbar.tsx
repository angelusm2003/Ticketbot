"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ChevronDown, Menu, X } from "lucide-react";

const NAV_PRODUCTS = [
  { emoji: "🤖", title: "AI Ticket Assistant", desc: "Describe issues in natural language, get structured tickets" },
  { emoji: "🔗", title: "Jira Integration", desc: "Create Jira tickets directly from AI conversations" },
  { emoji: "💬", title: "Streaming Chat", desc: "Real-time AI responses with server-sent events" },
];

const NAV_PLATFORM = [
  { emoji: "🔧", title: "Next.js Platform", desc: "Built on Next.js 14 with App Router" },
  { emoji: "🔒", title: "JWT Authentication", desc: "Secure sessions with NextAuth & JWT tokens" },
  { emoji: "📊", title: "API Documentation", desc: "Full REST API reference with examples" },
];

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">TicketBot</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <div className="group relative px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
              Product <ChevronDown className="w-3 h-3 opacity-50" />
            </span>
            <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 z-50 min-w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Features</p>
                  {NAV_PRODUCTS.map((item) => (
                    <div key={item.title} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 mb-1">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Platform</p>
                  {NAV_PLATFORM.map((item) => (
                    <div key={item.title} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 mb-1">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="/api-docs" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
            API Docs
          </Link>
          <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
            Dashboard
          </Link>
        </div>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2">
            Login
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-white rounded-full px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Try TicketBot Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link href="/dashboard" className="block text-sm font-medium text-gray-700 py-2">Dashboard</Link>
          <Link href="/api-docs" className="block text-sm font-medium text-gray-700 py-2">API Docs</Link>
          <Link href="/settings" className="block text-sm font-medium text-gray-700 py-2">Settings</Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login" className="text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-full px-4 py-2">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="text-center text-sm font-semibold text-white rounded-full px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600"
            >
              Try TicketBot Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
