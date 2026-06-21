import { authenticate, createSession } from "../_auth.js";
import { resolveClient } from "../_portal.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = req.body || {};
    const email = String(body.email || "").trim();
    const password = String(body.password || "");
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const clientKey = await authenticate(email, password);
    if (!clientKey) {
      res.status(401).json({ error: "Incorrect email or password" });
      return;
    }
    const client = resolveClient(clientKey);
    const token = createSession(clientKey, email);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ok: true, token, client: clientKey, company: client.company, email });
  } catch (error) {
    res.status(500).json({ error: error.message || "Login failed" });
  }
}
