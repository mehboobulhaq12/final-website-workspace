import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "node:crypto";

/**
 * Credential store + session tokens for the client portal.
 *
 * Credentials live in env vars so nothing secret is committed:
 *   SESSION_SECRET  - random string used to sign session tokens (required)
 *   PORTAL_AUTH     - JSON map of client key -> { email, salt, hash }
 *                     e.g. {"itv":{"email":"a@b.com","salt":"<hex>","hash":"<hex>"}}
 *
 * Passwords are hashed with scrypt (salt + 64-byte hash, hex encoded).
 * Generate an entry with: node scripts/hash-password.mjs <client> <email> <password>
 */

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function loadCreds() {
  try {
    return JSON.parse(process.env.PORTAL_AUTH || "{}");
  } catch {
    return {};
  }
}

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(str) {
  return Buffer.from(String(str).replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

export function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return { salt, hash };
}

function safeEqualHex(a, b) {
  const ba = Buffer.from(String(a), "hex");
  const bb = Buffer.from(String(b), "hex");
  if (ba.length !== bb.length || ba.length === 0) return false;
  return timingSafeEqual(ba, bb);
}

/** Verify an email + password for a client. Returns true/false. */
export function verifyCredentials(clientKey, email, password) {
  const creds = loadCreds()[clientKey];
  if (!creds || !creds.salt || !creds.hash) return false;
  if (String(creds.email || "").trim().toLowerCase() !== String(email || "").trim().toLowerCase()) return false;
  const { hash } = hashPassword(password, creds.salt);
  return safeEqualHex(hash, creds.hash);
}

/* ---------- self-signup user store (Notion "Portal Users" database) ---------- */

function usersDataSource() {
  return process.env.PORTAL_USERS_DS || "37917297-181e-81e7-9fe5-000b0c57ac11";
}

async function notionFetch(path, init = {}, version = "2025-09-03") {
  const token = process.env.NOTION_TOKEN || "";
  if (!token) throw new Error("NOTION_TOKEN missing");
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": version, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message || `Notion ${res.status}`);
  return body;
}

function plainText(rich) {
  return (rich || []).map((r) => r.plain_text || r.text?.content || "").join("").trim();
}

/** Look a user up by email in the Portal Users store. */
export async function findUserByEmail(email) {
  const ds = usersDataSource();
  if (!ds) return null;
  const target = String(email || "").trim().toLowerCase();
  try {
    const data = await notionFetch(`/data_sources/${ds}/query`, {
      method: "POST",
      body: JSON.stringify({ filter: { property: "Email", title: { equals: target } }, page_size: 1 }),
    });
    const page = (data.results || [])[0];
    if (!page) return null;
    const p = page.properties || {};
    return {
      email: plainText(p.Email?.title),
      salt: plainText(p.Salt?.rich_text),
      hash: plainText(p.Hash?.rich_text),
      client: plainText(p.Client?.rich_text),
      company: plainText(p.Company?.rich_text),
    };
  } catch {
    return null;
  }
}

/** Create a new self-signup user. Caller must check the email isn't taken first. */
export async function createUser({ email, password, client, company }) {
  const ds = usersDataSource();
  const { salt, hash } = hashPassword(password);
  await notionFetch("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: ds },
      properties: {
        Email: { title: [{ text: { content: String(email).trim().toLowerCase() } }] },
        Salt: { rich_text: [{ text: { content: salt } }] },
        Hash: { rich_text: [{ text: { content: hash } }] },
        Client: { rich_text: [{ text: { content: client } }] },
        Company: { rich_text: [{ text: { content: company || "" } }] },
      },
    }),
  });
  return true;
}

/** List all team members signed up for a given client (for the Settings/team view). */
export async function listUsers(clientKey) {
  const ds = usersDataSource();
  if (!ds) return [];
  try {
    const data = await notionFetch(`/data_sources/${ds}/query`, {
      method: "POST",
      body: JSON.stringify({ filter: { property: "Client", rich_text: { equals: clientKey } }, page_size: 100 }),
    });
    return (data.results || []).map((pg) => ({
      email: plainText(pg.properties?.Email?.title),
      company: plainText(pg.properties?.Company?.rich_text),
    }));
  } catch {
    return [];
  }
}

/**
 * Universal sign in. Checks env-configured admin credentials first, then the
 * self-signup user store. Returns the matching client key, or null.
 */
export async function authenticate(email, password) {
  const target = String(email || "").trim().toLowerCase();
  if (!target || !password) return null;
  // 1) env-configured credentials (admin / pre-set accounts)
  const creds = loadCreds();
  for (const [clientKey, c] of Object.entries(creds)) {
    if (!c?.salt || !c?.hash) continue;
    if (String(c.email || "").trim().toLowerCase() !== target) continue;
    const { hash } = hashPassword(password, c.salt);
    if (safeEqualHex(hash, c.hash)) return clientKey;
  }
  // 2) self-signup users stored in Notion
  const user = await findUserByEmail(target);
  if (user && user.salt && user.hash) {
    const { hash } = hashPassword(password, user.salt);
    if (safeEqualHex(hash, user.hash)) return user.client;
  }
  return null;
}

export function hasCredentials(clientKey) {
  const creds = loadCreds()[clientKey];
  return !!(creds && creds.salt && creds.hash);
}

/** Create a signed session token bound to a client + email, valid 30 days. */
export function createSession(clientKey, email) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET not configured");
  const payload = b64url(JSON.stringify({ c: clientKey, e: email, x: Date.now() + SESSION_TTL_MS }));
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/** Validate a token. Returns { c, e, x } payload if valid for clientKey, else null. */
export function verifySession(token, clientKey) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || !token || typeof token !== "string" || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  if (!safeEqualHex(sig, expected)) return null;
  let data;
  try { data = JSON.parse(fromB64url(payload)); } catch { return null; }
  if (!data || typeof data.x !== "number" || data.x < Date.now()) return null;
  if (clientKey && data.c !== clientKey) return null;
  return data;
}

/** Pull a bearer/query token from a request. */
export function tokenFromRequest(req, url) {
  const auth = req.headers?.authorization || req.headers?.Authorization || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim();
  const q = url?.searchParams?.get("token") || req.query?.token;
  return q || "";
}
