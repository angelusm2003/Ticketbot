"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import TicketCard, { type TicketData } from "./TicketCard";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  jiraTicket?: { key: string; url: string };
  onSubmitTicket?: (ticket: TicketData) => void;
  onCancelTicket?: () => void;
}

function extractTicket(content: string): { ticket: TicketData | null; cleanContent: string } {
  const ticketRegex = /```ticket\s*([\s\S]*?)```/;
  const match = content.match(ticketRegex);
  if (!match) return { ticket: null, cleanContent: content };

  try {
    const ticket = JSON.parse(match[1]) as TicketData;
    const cleanContent = content.replace(ticketRegex, "").trim();
    return { ticket, cleanContent };
  } catch {
    return { ticket: null, cleanContent: content };
  }
}

const ChatMessage = ({ role, content, jiraTicket, onSubmitTicket, onCancelTicket }: ChatMessageProps) => {
  const isUser = role === "user";
  const { ticket, cleanContent } = extractTicket(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isUser ? "bg-chat-user" : "bg-secondary"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-chat-user-fg" />
        ) : (
          <Bot className="w-4 h-4 text-foreground" />
        )}
      </div>

      {/* Message */}
      <div className={`flex flex-col gap-2 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-chat-user text-chat-user-fg rounded-tr-md"
              : "bg-chat-bot text-chat-bot-fg rounded-tl-md"
          }`}
        >
          <div className="prose prose-sm max-w-none prose-p:m-0 prose-ul:my-1 prose-li:my-0">
            <ReactMarkdown>{cleanContent}</ReactMarkdown>
          </div>
        </div>

        {ticket && (
          <TicketCard
            ticket={ticket}
            ticketId={jiraTicket?.key}
            ticketUrl={jiraTicket?.url}
            onSubmit={!jiraTicket && onSubmitTicket ? () => onSubmitTicket(ticket) : undefined}
            onCancel={!jiraTicket ? onCancelTicket : undefined}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
