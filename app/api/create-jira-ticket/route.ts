import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DEMO_MODE = process.env.DEMO_MODE === "true";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Demo mode: force issueType to "Task"
    if (body.ticket) {
      body.ticket.issueType = "Task";
    }

    // Mock mode: return a simulated Jira response without calling the real API
    if (DEMO_MODE) {
      const mockKey = `DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
      console.log("[/api/create-jira-ticket] DEMO_MODE: returning mock ticket", mockKey);
      return NextResponse.json({
        key: mockKey,
        url: `https://demo.atlassian.net/browse/${mockKey}`,
        summary: body.ticket?.summary || "Demo ticket",
      });
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/create-jira-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || `Jira API error (${response.status})`, details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("API /api/create-jira-ticket error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create ticket. Please try again." },
      { status: 500 }
    );
  }
}
