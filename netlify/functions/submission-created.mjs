/**
 * Event-triggered function: Netlify invokes this automatically for every
 * verified (non-spam) form submission on the site. It mirrors early-access
 * sign-ups into the Notion database "nørma · early-access sign-ups".
 *
 * Uses the classic handler signature, which is what Netlify's event-trigger
 * wiring (submission-created) is documented against.
 *
 * Dormant until both env vars exist on the site:
 *   NOTION_TOKEN — internal Notion connection secret (the connection must
 *                  have content access to the target database)
 *   NOTION_DB_ID — target Notion database id
 */
export const handler = async (event) => {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_DB_ID;
  if (!token || !db) {
    console.log("submission-created: Notion sync not configured, skipping");
    return { statusCode: 200, body: "skipped" };
  }

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (e) { /* ignore */ }
  const payload = body.payload ?? body;
  if (payload.form_name && payload.form_name !== "early-access") {
    return { statusCode: 200, body: "ignored" };
  }
  const data = payload.data ?? {};
  const text = (v) => (typeof v === "string" ? v.trim() : "");

  const properties = {
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
    return { statusCode: 200, body: "notion error" };
  }
  console.log("submission-created: synced to Notion");
  return { statusCode: 200, body: "ok" };
};
