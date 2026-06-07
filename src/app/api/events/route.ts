import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "official_link_click",
  "live_status_view",
  "stock_watchlist_save",
  "code_alert_intent",
  "night_planner_calculate",
  "afk_checklist_copy",
  "returning_user_change_view"
]);

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = typeof body === "object" && body && "eventName" in body
    ? String((body as { eventName: unknown }).eventName)
    : "";

  if (!allowedEvents.has(eventName)) {
    return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[site-event]", body);
  }

  return new NextResponse(null, { status: 204 });
}
