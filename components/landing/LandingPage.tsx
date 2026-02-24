"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LandingNavbar from "./LandingNavbar";
import {
  ArrowRight,
  MessageSquare,
  Ticket,
  Zap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle2,
  Star,
  ExternalLink,
} from "lucide-react";

/* ───── HERO ───── */
function Hero() {
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const PROMPTS: Record<string, string> = {
    "IT Support":
      "My laptop screen has been flickering intermittently for the past two days, especially when connected to the external monitor. It's a Dell XPS 15 running Windows 11.",
    "Access Request":
      "I need VPN access to the production environment for the new deployment pipeline project. My manager approved it last week — ticket reference #REQ-4021.",
    "Bug Report":
      "The login page throws a 500 error when users attempt to sign in with SSO on Chrome 120+. It works fine on Firefox. This is blocking the QA team.",
  };

  const loadPrompt = (key: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = PROMPTS[key] || "";
      setCharCount(textareaRef.current.value.length);
      textareaRef.current.focus();
    }
  };

  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-white via-teal-50/30 to-white relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 fade-in">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["Describe", "Generate", "Submit"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-px bg-gray-200" />}
                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                  <span
                    className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      i === 0 ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={`text-xs font-medium ${i === 0 ? "text-gray-600" : "text-gray-500"}`}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto mb-6">
            AI-powered tickets that{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              resolve faster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Describe your IT issue in plain language. TicketBot turns it into a structured Jira ticket
            with the right priority, type, and details — in seconds.
          </p>
        </div>

        {/* Prompt Builder */}
        <div className="max-w-2xl mx-auto fade-in">
          <div className="bg-white border-[1.5px] border-gray-200 rounded-2xl p-5 shadow-2xl shadow-black/5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-400">TicketBot AI</span>
            </div>
            <textarea
              ref={textareaRef}
              onChange={(e) => setCharCount(e.target.value.length)}
              className="w-full text-sm text-gray-700 resize-none outline-none bg-transparent min-h-[80px] placeholder-gray-400"
              placeholder="Describe your IT issue... e.g. 'My VPN keeps disconnecting every 10 minutes'"
              maxLength={1000}
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                <span>{charCount}</span>/1000 characters
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                Create ticket <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3">
              <strong>Try a sample issue</strong> — click to load and see it in action 👇
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(PROMPTS).map((key) => (
                <button
                  key={key}
                  onClick={() => loadPrompt(key)}
                  className="text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 hover:bg-teal-100 transition-colors"
                >
                  {key === "IT Support" ? "🛟" : key === "Access Request" ? "🔑" : "🐛"} {key}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 fade-in">
          <Link href="/login" className="inline-block text-sm font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800">
            Sign up for free
          </Link>
          <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-400">
            <span>✓ No coding required</span>
            <span>✓ Instant Jira integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── LOGO CAROUSEL ───── */
function LogoCarousel() {
  const logos = ["Jira", "Supabase", "Next.js", "Vercel", "Tailwind", "React", "TypeScript", "GitHub"];
  return (
    <section className="py-12 bg-gray-50/60 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Built with best-in-class technologies
        </p>
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50/60 to-transparent z-10 pointer-events-none" />
        <div className="flex items-center gap-12 w-max animate-[scroll-left_30s_linear_infinite]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-10 px-6 rounded-lg bg-white border border-gray-100 shadow-sm text-sm font-semibold text-gray-500"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── TEAM TABS ───── */
function TeamTabs() {
  const [active, setActive] = useState(0);

  const tabs = [
    {
      label: "🛟 IT Support",
      color: "teal",
      heading: "Resolve IT issues in minutes, not hours",
      description:
        "Users describe their problem in plain English. TicketBot's AI extracts the key details — affected system, severity, steps to reproduce — and creates a perfectly structured Jira ticket, routed to the right team.",
      gradient: "from-teal-50 to-cyan-50",
      badge: "text-teal-600",
      btnClass: "bg-gradient-to-r from-teal-500 to-teal-600",
    },
    {
      label: "🤝 HR & Onboarding",
      color: "blue",
      heading: "Automate employee requests & onboarding",
      description:
        "From access provisioning to equipment requests, TicketBot turns employee messages into actionable tickets. New hire onboarding becomes a guided conversation, not a pile of emails.",
      gradient: "from-blue-50 to-indigo-50",
      badge: "text-blue-600",
      btnClass: "bg-blue-600 hover:bg-blue-700",
    },
    {
      label: "🐛 Engineering",
      color: "green",
      heading: "Bug reports that developers actually love",
      description:
        "TicketBot asks the right follow-up questions — browser, OS, steps to reproduce, expected vs actual behavior — so engineers get complete bug reports every single time.",
      gradient: "from-green-50 to-emerald-50",
      badge: "text-green-600",
      btnClass: "bg-green-600 hover:bg-green-700",
    },
    {
      label: "📦 Operations",
      color: "orange",
      heading: "Streamline procurement & facility requests",
      description:
        "Office supplies, building access, vendor onboarding — let TicketBot handle the intake. It classifies, prioritizes, and routes requests so your ops team can focus on execution.",
      gradient: "from-orange-50 to-amber-50",
      badge: "text-orange-600",
      btnClass: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Built for every team
            <br />
            across your organization
          </h2>
          <p className="text-lg text-gray-500">
            TicketBot adapts to any department with intelligent, context-aware ticket creation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 fade-in">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-sm font-medium border rounded-full px-5 py-2.5 transition-all ${
                active === i
                  ? "bg-teal-500 text-white border-teal-500"
                  : "text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabs.map((tab, i) => (
          <div key={i} className={i === active ? "fade-in" : "hidden"}>
            <div className={`bg-gradient-to-br ${tab.gradient} rounded-3xl p-8 md:p-12`}>
              <div className="max-w-2xl">
                <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${tab.badge}`}>
                  {tab.label}
                </p>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{tab.heading}</h3>
                <p className="text-gray-600 mb-6">{tab.description}</p>
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors ${tab.btnClass}`}
                >
                  Try it now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───── FEATURES ───── */
function Features() {
  const features = [
    {
      icon: MessageSquare,
      label: "NATURAL LANGUAGE INPUT",
      title: "Just describe your issue — AI does the rest.",
      desc: "No forms, no dropdowns. Type what's wrong in plain English and TicketBot extracts summary, priority, issue type, and description automatically.",
    },
    {
      icon: Zap,
      label: "REAL-TIME STREAMING",
      title: "Watch the AI think, live.",
      desc: "Server-sent events stream the AI response token by token. You see the ticket being built in real time — no waiting for a spinner to finish.",
    },
    {
      icon: Ticket,
      label: "ONE-CLICK JIRA TICKETS",
      title: "From conversation to Jira in one click.",
      desc: "TicketBot generates a structured ticket card. Review it, edit if needed, and submit directly to Jira — all without leaving the chat.",
    },
    {
      icon: Shield,
      label: "SECURE BY DEFAULT",
      title: "JWT authentication & protected routes.",
      desc: "NextAuth with JWT strategy, bcrypt-hashed passwords, HTTP-only cookies, and middleware-protected routes. Your data stays safe.",
    },
    {
      icon: BarChart3,
      label: "FULL API DOCUMENTATION",
      title: "Every endpoint documented with examples.",
      desc: "Interactive API docs page with request/response examples, architecture overview, and route map — built right into the app.",
    },
    {
      icon: Clock,
      label: "DEMO-READY",
      title: "Two built-in user accounts for instant demos.",
      desc: "Admin and user roles, pre-configured credentials, and a polished login flow. Perfect for presentations and stakeholder reviews.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Everything you need for AI-powered ticketing
          </h2>
          <p className="text-lg text-gray-500">
            Built with Next.js 14, Tailwind CSS, and Supabase Edge Functions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">
                {f.label}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── HOW IT WORKS ───── */
function HowItWorks() {
  const steps = [
    { emoji: "💬", color: "bg-teal-100 text-teal-600", label: "Chat", desc: "Describe your issue in natural language." },
    { emoji: "🤖", color: "bg-blue-100 text-blue-600", label: "AI Analyzes", desc: "TicketBot extracts key details via AI." },
    { emoji: "🎫", color: "bg-green-100 text-green-600", label: "Ticket Built", desc: "A structured ticket card is generated." },
    { emoji: "✅", color: "bg-orange-100 text-orange-600", label: "Submit", desc: "One-click submit to Jira." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">How it works</h2>
          <p className="text-lg text-gray-500">From issue to Jira ticket in four simple steps.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 fade-in">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${s.color} flex items-center justify-center text-2xl`}>
                {s.emoji}
              </div>
              <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.label}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── TESTIMONIALS ───── */
function Testimonials() {
  const items = [
    {
      name: "Sarah Chen",
      role: "IT Director, Acme Corp",
      badge: "📈 Reduced ticket resolution time by 40%",
      badgeColor: "bg-green-50 text-green-700",
      quote: "TicketBot completely transformed our IT helpdesk. Users actually enjoy submitting tickets now.",
    },
    {
      name: "Marcus Rivera",
      role: "VP Engineering, CloudScale",
      badge: "🤖 Automated 2,000+ ticket intakes monthly",
      badgeColor: "bg-blue-50 text-blue-700",
      quote: "The AI understands context remarkably well. Bug reports come in with all the details our devs need.",
    },
    {
      name: "Emily Nguyen",
      role: "Operations Manager, TechFlow",
      badge: "💰 Saved 15 hours/week on ticket triage",
      badgeColor: "bg-orange-50 text-orange-700",
      quote: "We went from messy email threads to perfectly structured Jira tickets overnight. Game changer.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Teams love building with TicketBot
          </h2>
          <p className="text-lg text-gray-500">See what our users are saying.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 fade-in">
          {items.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 border-[1.5px] border-gray-100 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/5 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${t.badgeColor}`}>
                {t.badge}
              </div>
              <p className="text-gray-600 italic">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── SOCIAL PROOF ───── */
function SocialProof() {
  const reviews = [
    { text: "Best AI ticket tool I've ever used!", author: "DevOps Lead" },
    { text: "Setup took 5 minutes. Incredible.", author: "Startup CTO" },
    { text: "Our support team can't live without it.", author: "Support Manager" },
    { text: "Finally, tickets that make sense.", author: "Senior Engineer" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Built with modern standards</h2>
          <p className="text-lg text-gray-500">Next.js 14 • App Router • JWT Auth • Tailwind CSS • Supabase</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 fade-in">
          {reviews.map((r) => (
            <div key={r.text} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="text-yellow-400 mb-2 text-sm">★★★★★</div>
              <p className="text-sm text-gray-700 font-medium mb-1">&ldquo;{r.text}&rdquo;</p>
              <p className="text-xs text-gray-400">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── FINAL CTA ───── */
function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to transform your IT service desk?
        </h2>
        <p className="text-xl text-teal-200 mb-10">
          Join teams that use TicketBot to turn conversations into perfectly structured Jira tickets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/dashboard"
            className="bg-white text-teal-700 font-bold px-8 py-4 rounded-full text-base hover:bg-teal-50 transition-colors shadow-lg"
          >
            Try TicketBot Free
          </Link>
          <Link
            href="/api-docs"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white/10 transition-colors"
          >
            View API Docs
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-teal-200">
          {["Free to use", "No credit card required", "Setup in minutes"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── FOOTER ───── */
function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["AI Chat", "Jira Integration", "Streaming Responses", "Ticket Builder", "API Routes"],
    },
    {
      title: "Platform",
      links: ["Next.js 14", "App Router", "Tailwind CSS", "Supabase Functions", "TypeScript"],
    },
    {
      title: "Resources",
      links: ["API Documentation", "GitHub Repository", "Settings", "Login"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TicketBot</span>
            </div>
            <p className="text-sm text-gray-500">
              AI-powered IT service desk assistant.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="hover:text-white transition-colors cursor-default">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-xs">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-gray-800 rounded-full px-3 py-1.5">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span>JWT Secured</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-800 rounded-full px-3 py-1.5">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span>Next.js 14</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-6">Copyright © 2026 TicketBot. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ───── FADE-IN OBSERVER ───── */
function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ───── MAIN EXPORT ───── */
export default function LandingPage() {
  useFadeIn();

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <LandingNavbar />
      <Hero />
      <LogoCarousel />
      <TeamTabs />
      <Features />
      <HowItWorks />
      <Testimonials />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
}
