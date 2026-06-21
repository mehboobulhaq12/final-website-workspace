import { getPortalData, resolveClient } from "./_portal.js";
import { verifySession, tokenFromRequest } from "./_auth.js";

export default async function handler(req, res) {
  const client = resolveClient(req.query?.client || req.query?.company);
  if (!verifySession(tokenFromRequest(req), client.key)) {
    res.setHeader("Cache-Control", "no-store");
    res.status(401).json({ error: "Authentication required", auth: true, client: client.key });
    return;
  }
  try {
    const data = await getPortalData(client.key);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      client: client.key,
      company: client.company,
      avatar: client.avatar,
      sync: { live: false, message: error.message || "Notion sync failed" },
      tasks: [],
      meetings: [],
      docs: [],
      phases: [],
      filesPageUrl: client.filesPageUrl,
    });
  }
}
