import type { Context } from "@netlify/functions";

/**
 * Event-triggered function: Netlify invokes this automatically for every
 * verified (non-spam) form submission on the site. It mirrors early-access
 * sign-ups into the Notion database "nørma · early-access sign-ups".
 *
 * Dormant until both env vars exist on the site:
 *   NOTION_TOKEN  — internal Notion integration secret (the integration must
 *                   be connected to the target database in Notion)
 *   NOTION_DB_ID  — target Notion data source / database id
 */
export default async (req: Request, _context: Context) => {
  const token = Netlify.env.get("NOTION_TOKEN");
  const db = Netlify.env.get("NOTION_DB_ID");
  if (!token || !db) {
    console.log("submission-created: Notion sync not configured, skipping");
    return new Response("skipped", { status: 200 });
  }

  const body = await req.json();
  const payload = body?.payload ?? {};
  if (payload.form_name && payload.form_name !== "early-access") {
    return new Response("ignored", { status: 200 });
  }
  const data = payload.data ?? {};
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: text(data.name) || "(no name)" } }] },
    Company: { rich_text: [{ text: { content: text(data.company) } }] },
    Email: { email: text(data.email) || null },
    Submitted: { date: { start: payload.created_at ?? new Date().toISOString() } },
  };
  if (text(data.phone)) properties.Phone = { phone_number: text(data.phone) };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parent: { database_id: db }, properties }),
  });

  if (!res.ok) {
    console.error("submission-created: Notion API error", res.status, await res.text());
    return new Response("notion error", { status: 200 });
  }
  console.log("submission-created: synced to Notion");
  return new Response("ok", { status: 200 });
};
