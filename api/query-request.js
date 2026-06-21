import { submitQueryToNotion, resolveClient } from "./_portal.js";
import { verifySession, tokenFromRequest } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const client = resolveClient(req.query?.client || req.query?.company);
  if (!verifySession(tokenFromRequest(req), client.key)) {
    res.status(401).json({ error: "Authentication required", auth: true });
    return;
  }

  try {
    const result = await submitQueryToNotion(client.key, req.body || {});
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(result);
  } catch (error) {
    const message = error.message || "Query submission failed";
    const status = message.includes("required") ? 400 : 500;
    res.status(status).json({ error: message });
  }
}
