"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import Navbar from "@/components/Navbar";
import { streamChat, type Msg } from "@/lib/chatStream";
import { createJiraTicket } from "@/lib/jiraApi";
import { type TicketData } from "@/components/TicketCard";
import { toast } from "sonner";

const WELCOME: Msg = {
  role: "assistant",
  content:
    "👋 Hi! I'm **TicketBot**, your IT Service Desk assistant.\n\nI'll help you create an IT support ticket by gathering the right details. Just describe your issue or requirement and I'll take it from there.\n\nWhat do you need help with today?",
};

function extractTicketFromContent(content: string): TicketData | null {
  const ticketRegex = /```ticket\s*([\s\S]*?)```/;
  const match = content.match(ticketRegex);
  if (!match) return null;
  try {
    return JSON.parse(match[1]) as TicketData;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [jiraTickets, setJiraTickets] = useState<Record<number, { key: string; url: string }>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  const handleSend = async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > newMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev.slice(0, newMessages.length), { role: "assistant", content: assistantSoFar }];
      });
      scrollToBottom();
    };

    try {
      await streamChat({
        messages: newMessages.filter((m) => m !== WELCOME),
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (e: unknown) {
      setIsLoading(false);
      const message = e instanceof Error ? e.message : "Something went wrong";
      toast.error(message);
    }
  };

  const handleSubmitTicket = async (ticket: TicketData) => {
    toast.info("Creating Jira ticket...");
    try {
      const result = await createJiraTicket(ticket);
      const ticketIndex = messages.findIndex((m) => {
        const t = extractTicketFromContent(m.content);
        return t && t.summary === ticket.summary;
      });
      if (ticketIndex >= 0) {
        setJiraTickets((prev) => ({ ...prev, [ticketIndex]: result }));
      }
      toast.success(`Jira ticket ${result.key} created!`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to create Jira ticket";
      toast.error(message);
    }
  };

  const handleCancelTicket = () => {
    handleSend("I'd like to make some changes to the ticket before submitting.");
  };

  const handleNewChat = () => {
    setMessages([WELCOME]);
    setJiraTickets({});
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <ChatSidebar onNewChat={handleNewChat} />

        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="border-b border-border bg-card px-6 py-3 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <h2 className="text-sm font-semibold text-foreground">IT Requests</h2>
            <span className="text-xs text-muted-foreground">• TicketBot is ready</span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  jiraTicket={jiraTickets[i]}
                  onSubmitTicket={handleSubmitTicket}
                  onCancelTicket={handleCancelTicket}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
            </div>
          </div>

          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
