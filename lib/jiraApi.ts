import type { TicketData } from "@/components/TicketCard";

export async function createJiraTicket(ticket: TicketData): Promise<{ key: string; url: string }> {
  const resp = await fetch("/api/create-jira-ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticket }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Failed to create ticket" }));
    throw new Error(err.error || "Failed to create Jira ticket");
  }

  return resp.json();
}
