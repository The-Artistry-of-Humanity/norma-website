/** Temporary diagnostic: reports whether the Notion env vars are visible to
 * functions (booleans only, never values). Remove once the sync is verified. */
export const handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    hasToken: Boolean(process.env.NOTION_TOKEN),
    hasDb: Boolean(process.env.NOTION_DB_ID),
    node: process.version,
  }),
});
