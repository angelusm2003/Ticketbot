"use client";

import { MessageSquarePlus, Bot, Ticket, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface ChatSidebarProps {
  onNewChat: () => void;
}

const ChatSidebar = ({ onNewChat }: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar-bg flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sidebar-fg font-semibold text-sm">TicketBot</h1>
          <p className="text-xs text-sidebar-fg/50">IT Service Desk AI</p>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Ticket
        </motion.button>
      </div>

      {/* Channels */}
      <div className="px-3 mt-4">
        <p className="text-[10px] uppercase tracking-widest text-sidebar-fg/40 px-3 mb-2 font-semibold">
          Channels
        </p>
        {[
          { icon: Ticket, label: "IT Requests", active: true },
          { icon: Hash, label: "Slack Integration", active: false },
          { icon: Hash, label: "WhatsApp", active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
              item.active
                ? "bg-sidebar-muted text-sidebar-fg"
                : "text-sidebar-fg/50 hover:text-sidebar-fg/70 hover:bg-sidebar-muted/50"
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            {!item.active && (
              <span className="ml-auto text-[10px] bg-sidebar-muted px-1.5 py-0.5 rounded text-sidebar-fg/40">
                Soon
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-done animate-pulse" />
          <span className="text-xs text-sidebar-fg/50">AI Online</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
