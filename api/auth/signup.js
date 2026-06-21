import { findUserByEmail, createUser, createSession } from "../_auth.js";
import { resolveClient, isKnownCompany } from "../_portal.js";

function emailDomain(email) {
  const at = String(email || "").lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = req.body || {};
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const company = String(body.company || "").trim();

    if (!email || !email.includes("@")) { res.status(400).json({ error: "Enter a valid email" }); return; }
    if (password.length < 6) { res.status(400).json({ error: "Password must be at least 6 characters" }); return; }
    if (!company) { res.status(400).json({ error: "Enter your company name to find your portal" }); return; }

    if (!isKnownCompany(company)) {
      res.status(404).json({ error: "We couldn't find a portal for that company name." });
      return;
    }
    const client = resolveClient(company);

    // Optional company-domain restriction (enforced only when configured).
    const domains = client.emailDomains || [];
    if (domains.length && !domains.includes(emailDomain(email))) {
      res.status(403).json({ error: `Please sign up with your ${client.company} company email (${domains.join(", ")}).` });
      return;
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists. Please sign in." });
      return;
    }

    await createUser({ email, password, client: client.key, company: client.company });
    const token = createSession(client.key, email);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ok: true, token, client: client.key, company: client.company, email });
  } catch (error) {
    res.status(500).json({ error: error.message || "Sign up failed" });
  }
}
