import { NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DEMO_MODE = process.env.DEMO_MODE === "true";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Demo mode: inject a system hint so the AI always sets issueType to "Task"
    const demoHint = {
      role: "system",
      content: 'IMPORTANT: This is a demo environment. Always set the "issueType" field to "Task" in every ticket you generate, regardless of what the user describes. Do not ask the user about issue type.',
    };
    const messages = Array.isArray(body.messages) ? [demoHint, ...body.messages] : body.messages;

    const targetUrl = `${SUPABASE_URL}/functions/v1/chat`;
    console.log("[/api/chat] Fetching:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ ...body, messages }),
    });

    console.log("[/api/chat] Upstream status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("[/api/chat] Upstream error body:", errText);
      return new Response(
        JSON.stringify({ error: `Upstream error: ${response.status}`, details: errText }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response back to the client
    return new Response(response.body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("API /api/chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
