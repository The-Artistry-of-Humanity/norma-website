/**
 * Event-triggered function: Netlify invokes this automatically for every
 * verified (non-spam) form submission on the site. It mirrors early-access
 * sign-ups and Book a demo requests into the Notion database
 * "nørma · early-access sign-ups". Book a demo's extra fields (role, country,
 * headcount, message) go in the page body, so the database needs no new columns.
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
  const FORMS = ["early-access", "book-a-demo"];
  if (payload.form_name && !FORMS.includes(payload.form_name)) {
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

  const lines = [["Form", payload.form_name || ""], ["Role", data.role], ["Country", data.country],
    ["Headcount", data.headcount], ["Message", data.message]]
    .filter(([, v]) => text(v)).map(([k, v]) => `${k}: ${text(v)}`);
  const children = lines.length ? [{ object: "block", type: "paragraph",
    paragraph: { rich_text: [{ type: "text", text: { content: lines.join("\n").slice(0, 1900) } }] } }] : undefined;

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parent: { database_id: db }, properties, ...(children ? { children } : {}) }),
  });

  if (!res.ok) {
    console.error("submission-created: Notion API error", res.status, await res.text());
    return { statusCode: 200, body: "notion error" };
  }
  console.log("submission-created: synced to Notion");
  return { statusCode: 200, body: "ok" };
};
