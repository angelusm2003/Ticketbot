"use client";

import { motion } from "framer-motion";
import { ExternalLink, AlertCircle, ArrowUp, Minus, ArrowDown } from "lucide-react";

export interface TicketData {
  summary: string;
  requester: string;
  priority: string;
  issueType: string;
  system: string;
  department: string;
  affectedUsers: string;
  description: string;
  expectedOutcome: string;
}

const priorityConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  Critical: { icon: <AlertCircle className="w-3.5 h-3.5" />, className: "bg-destructive text-destructive-foreground" },
  High: { icon: <ArrowUp className="w-3.5 h-3.5" />, className: "bg-status-progress text-foreground" },
  Medium: { icon: <Minus className="w-3.5 h-3.5" />, className: "bg-primary text-primary-foreground" },
  Low: { icon: <ArrowDown className="w-3.5 h-3.5" />, className: "bg-muted text-muted-foreground" },
};

const TicketCard = ({ ticket, ticketId, ticketUrl, onSubmit, onCancel }: { ticket: TicketData; ticketId?: string; ticketUrl?: string; onSubmit?: () => void; onCancel?: () => void }) => {
  const prio = priorityConfig[ticket.priority] || priorityConfig.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border-2 border-ticket-border bg-ticket-bg overflow-hidden max-w-md"
    >
      {/* Header */}
      <div className="bg-ticket-header px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary-foreground/70">
            {ticketId || "TICKET-PREVIEW"}
          </span>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${prio.className}`}>
            {prio.icon}
            {ticket.priority}
          </span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground font-medium">
          {ticket.issueType}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-sm text-foreground">{ticket.summary}</h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: "Requester", value: ticket.requester },
            { label: "System", value: ticket.system },
            { label: "Department", value: ticket.department },
            { label: "Affected Users", value: ticket.affectedUsers },
          ].map((field) => (
            <div key={field.label} className="bg-card rounded-lg p-2">
              <span className="text-muted-foreground block mb-0.5">{field.label}</span>
              <span className="text-foreground font-medium">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="text-xs bg-card rounded-lg p-2">
          <span className="text-muted-foreground block mb-0.5">Description</span>
          <p className="text-foreground">{ticket.description}</p>
        </div>

        <div className="text-xs bg-card rounded-lg p-2">
          <span className="text-muted-foreground block mb-0.5">Expected Outcome</span>
          <p className="text-foreground">{ticket.expectedOutcome}</p>
        </div>

        {ticketId && ticketUrl && (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View {ticketId} in Jira
          </motion.a>
        )}

        {!ticketId && onSubmit && onCancel && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="flex-1 py-2 rounded-lg border border-border bg-muted text-muted-foreground text-xs font-semibold transition-colors hover:bg-muted/80"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold transition-colors hover:bg-primary/90"
            >
              Submit Ticket
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TicketCard;
