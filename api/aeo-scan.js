// Thin proxy: the entire AEO scan workflow (validate website, scan, score,
// save lead to Notion) lives in n8n. This endpoint only forwards the lead to
// the n8n webhook and returns its response to the UI unchanged.
//
// Workflow: n8n "Effect3 - AEO Scanner (Full Flow)"
//   Webhook → Validate & Scan Website (Code) → Valid? → Save to Notion + Return
//   Results  /  Reject Invalid (422)
//
// Configure N8N_SCAN_WEBHOOK_URL in Vercel env.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const webhookUrl = process.env.N8N_SCAN_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(500).json({ error: "Scanner is not configured. Missing N8N_SCAN_WEBHOOK_URL." });
    return;
  }

  const body = typeof req.body === "object" && req.body ? req.body : {};

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        website: String(body.website || body.url || ""),
        firstName: String(body.firstName || ""),
        lastName: String(body.lastName || ""),
        email: String(body.email || ""),
        company: String(body.company || ""),
      }),
    });

    const text = await response.text();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json");

    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      // n8n returned a non-JSON error (e.g. workflow error / HTML)
      res.status(502).json({ error: "The scanner is temporarily unavailable. Please try again." });
      return;
    }

    res.status(response.status).json(payload);
  } catch {
    res.status(502).json({ error: "The scanner is temporarily unavailable. Please try again." });
  }
}
