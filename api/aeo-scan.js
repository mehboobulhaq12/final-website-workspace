import dns from "node:dns/promises";
import net from "node:net";

const CHECK_TIMEOUT_MS = 9000;

const CRAWLER_USER_AGENT =
  "Effect3-AEO-Scanner/1.0 (+https://theeffect3.com/aeo-scanner)";

const normalizeTargetUrl = (value = "") => {
  const trimmed = String(value).trim();
  if (!trimmed) throw new Error("Website URL is required");

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const target = new URL(withProtocol);

  if (!["http:", "https:"].includes(target.protocol)) {
    throw new Error("Only HTTP and HTTPS websites can be scanned");
  }

  if (target.port && !["80", "443", ""].includes(target.port)) {
    throw invalidWebsite("Only standard web ports (80/443) can be scanned.");
  }

  target.hash = "";
  return target;
};

// SSRF guard: block hostnames/IPs that resolve to private, loopback, or
// link-local ranges so the scanner cannot be used to probe internal infra.
const isPrivateIp = (ip) => {
  let addr = ip.toLowerCase();
  if (addr.startsWith("::ffff:")) addr = addr.slice(7); // IPv4-mapped IPv6
  if (net.isIPv4(addr)) {
    const p = addr.split(".").map(Number);
    return (
      p[0] === 10 ||
      (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
      (p[0] === 192 && p[1] === 168) ||
      p[0] === 127 ||
      (p[0] === 169 && p[1] === 254) ||
      p[0] === 0 ||
      p[0] >= 224
    );
  }
  return (
    addr === "::1" ||
    addr === "::" ||
    addr.startsWith("fe80") ||
    addr.startsWith("fc") ||
    addr.startsWith("fd")
  );
};

const assertPublicHost = async (hostname) => {
  const host = hostname.replace(/\.$/, "").toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".internal") ||
    host.endsWith(".local")
  ) {
    throw invalidWebsite("That host is not a public website.");
  }
  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw invalidWebsite("That address is not a public website.");
    return;
  }
  let records;
  try {
    records = await dns.lookup(host, { all: true });
  } catch {
    throw invalidWebsite("We couldn't resolve that domain. Check the URL — it may not exist.");
  }
  if (!records.length) throw invalidWebsite("We couldn't resolve that domain.");
  for (const record of records) {
    if (isPrivateIp(record.address)) {
      throw invalidWebsite("That host resolves to a private address and can't be scanned.");
    }
  }
};

const fetchText = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": CRAWLER_USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
      },
    });

    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
      text: text.slice(0, 900000),
      contentType: response.headers.get("content-type") || "",
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      url,
      text: "",
      contentType: "",
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
};

const stripHtml = (html = "") =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTagContent = (html, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>|<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escaped}["'][^>]*>`,
    "i"
  );
  const match = html.match(re);
  return match?.[1] || match?.[2] || "";
};

const hasTag = (html, pattern) => new RegExp(pattern, "i").test(html);

const countMatches = (html, pattern) => (html.match(new RegExp(pattern, "gi")) || []).length;

const countLinks = (html, targetUrl) => {
  const hrefMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)];
  const host = targetUrl.hostname.replace(/^www\./, "");

  return hrefMatches.reduce(
    (acc, [, href]) => {
      try {
        const link = new URL(href, targetUrl.origin);
        const linkHost = link.hostname.replace(/^www\./, "");
        if (linkHost === host) acc.internal += 1;
        else if (link.protocol.startsWith("http")) acc.external += 1;
      } catch {
        return acc;
      }
      return acc;
    },
    { internal: 0, external: 0 }
  );
};

const imageAltCoverage = (html) => {
  const images = html.match(/<img\b[^>]*>/gi) || [];
  if (!images.length) return { total: 0, withAlt: 0, ratio: 1 };

  const withAlt = images.filter((tag) => /\salt=["'][^"']+["']/i.test(tag)).length;
  return { total: images.length, withAlt, ratio: withAlt / images.length };
};

const robotsAllowsAi = (robotsText = "") => {
  if (!robotsText.trim()) return false;
  const lower = robotsText.toLowerCase();
  const blockedBots = ["gptbot", "chatgpt-user", "claudebot", "perplexitybot", "google-extended"];
  return !blockedBots.some((bot) => {
    const botIndex = lower.indexOf(`user-agent: ${bot}`);
    if (botIndex === -1) return false;
    const section = lower.slice(botIndex, lower.indexOf("user-agent:", botIndex + 12) || undefined);
    return /disallow:\s*\//.test(section);
  });
};

const buildCheck = (label, points, max, passed, fix = "") => ({
  label,
  points,
  max,
  status: passed ? "pass" : points > 0 ? "partial" : "fail",
  fix,
});

const getLevel = (score) => {
  if (score >= 80) return "Strong";
  if (score >= 55) return "Average";
  return "Poor";
};

// Signals that a domain is parked / for-sale rather than a real live website.
const PARKING_SIGNALS = [
  "domain is for sale",
  "buy this domain",
  "this domain may be for sale",
  "domain for sale",
  "is for sale",
  "parkingcrew",
  "sedoparking",
  "bodis.com",
  "hugedomains",
  "domain parking",
  "is parked",
  "parked free",
  "afternic",
  "dan.com",
  "godaddy.com/domainsearch",
];

const invalidWebsite = (message) => {
  const error = new Error(`INVALID_WEBSITE: ${message}`);
  error.code = "INVALID_WEBSITE";
  return error;
};

// Reject non-existent / offline / parked / placeholder domains BEFORE scoring,
// so the scanner never reports on fake sites (protects credibility).
const assertValidWebsite = (page, wordCount) => {
  if (!page || page.status === 0 || page.error) {
    throw invalidWebsite("We couldn't reach that website. Check the URL — the domain may not exist or is offline.");
  }
  if (!page.ok || page.status >= 400) {
    throw invalidWebsite(`That website returned an error (HTTP ${page.status}). It may not be live.`);
  }
  if (page.contentType && !/html|text\/plain/i.test(page.contentType)) {
    throw invalidWebsite("That URL did not return a web page.");
  }
  const lower = (page.text || "").toLowerCase();
  const looksParked = PARKING_SIGNALS.some((signal) => lower.includes(signal));
  if (looksParked && wordCount < 250) {
    throw invalidWebsite("That domain looks parked or listed for sale — not a live website.");
  }
  if (wordCount < 30) {
    throw invalidWebsite("That page has almost no readable content — it may be a placeholder, not a real site.");
  }
};

const scanWebsite = async (inputUrl) => {
  const targetUrl = normalizeTargetUrl(inputUrl);
  await assertPublicHost(targetUrl.hostname);
  const origin = targetUrl.origin;

  const [page, robots, sitemap, llms] = await Promise.all([
    fetchText(targetUrl.toString()),
    fetchText(`${origin}/robots.txt`),
    fetchText(`${origin}/sitemap.xml`),
    fetchText(`${origin}/llms.txt`),
  ]);

  const html = page.text || "";
  const plainText = stripHtml(html);
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  // Validity gate — reject fake/dead/parked domains before scoring.
  assertValidWebsite(page, wordCount);
  const links = countLinks(html, targetUrl);
  const alt = imageAltCoverage(html);
  const metaDescription = getTagContent(html, "description");
  const canonical = hasTag(html, '<link[^>]+rel=["\']canonical["\']');
  const h1Count = countMatches(html, "<h1\\b");
  const jsonLd = hasTag(html, '<script[^>]+type=["\']application/ld\\+json["\']');
  const faqDetected = /FAQPage|<h[2-4][^>]*>[^<]+\?/i.test(html);
  const openGraphCount = ["og:title", "og:description", "og:image", "og:url"].filter((tag) =>
    getTagContent(html, tag)
  ).length;
  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  const headingClean = headingLevels.every((level, index) => index === 0 || level - headingLevels[index - 1] <= 1);
  const freshness = /dateModified|article:modified_time|lastmod|updated|published|202[4-9]/i.test(
    `${html} ${sitemap.text}`
  );
  const aiAllowed = robotsAllowsAi(robots.text) || robots.ok;

  const findable = [
    buildCheck("HTTPS enabled", targetUrl.protocol === "https:" ? 2 : 0, 2, targetUrl.protocol === "https:", "Move the page to HTTPS so AI crawlers and search engines trust the URL."),
    buildCheck("robots.txt present", robots.ok ? 4 : 0, 4, robots.ok, "Add /robots.txt and make crawler policy explicit."),
    buildCheck("sitemap.xml present", sitemap.ok ? 7 : 0, 7, sitemap.ok, "Publish /sitemap.xml with canonical URLs and lastmod dates."),
    buildCheck("Canonical URL set", canonical ? 7 : 0, 7, canonical, "Add a canonical link tag to remove duplicate URL confusion."),
    buildCheck("AI crawlers allowed", aiAllowed ? 5 : 0, 5, aiAllowed, "Allow GPTBot, ClaudeBot, PerplexityBot, and relevant AI crawlers unless policy requires otherwise."),
  ];

  const quotable = [
    buildCheck("Meta description", metaDescription.length >= 50 ? 6 : metaDescription ? 3 : 0, 6, metaDescription.length >= 50, "Write a specific meta description that states who the page serves and what it proves."),
    buildCheck("Substantial text content", wordCount >= 650 ? 8 : wordCount >= 300 ? 4 : 0, 8, wordCount >= 650, "Add answer-ready copy, proof, process details, and examples."),
    buildCheck("Content freshness signals", freshness ? 11 : 0, 11, freshness, "Add updated dates, modified metadata, or sitemap lastmod values."),
    buildCheck("FAQ-style content detected", faqDetected ? 5 : 0, 5, faqDetected, "Add direct question-and-answer sections for AI answer extraction."),
  ];

  const understandable = [
    buildCheck("Single H1", h1Count === 1 ? 5 : h1Count > 0 ? 2 : 0, 5, h1Count === 1, "Use one clear H1 that names the topic."),
    buildCheck("Heading hierarchy clean", headingClean ? 4 : 0, 4, headingClean, "Keep headings in logical order so machines can parse sections."),
    buildCheck("Structured data JSON-LD", jsonLd ? 9 : 0, 9, jsonLd, "Add Organization, WebPage, Service, Product, or FAQPage schema."),
    buildCheck("Open Graph tags", Math.round((openGraphCount / 4) * 4), 4, openGraphCount >= 3, "Add og:title, og:description, og:image, and og:url."),
    buildCheck("Image alt text coverage", alt.ratio >= 0.8 ? 3 : alt.ratio >= 0.5 ? 2 : 0, 3, alt.ratio >= 0.8, "Add descriptive alt text to important images."),
  ];

  const trustworthy = [
    buildCheck("Internal links present", Math.min(18, links.internal), 18, links.internal >= 8, "Link to related pages, case studies, FAQs, and service pages."),
    buildCheck("External citation links", Math.min(7, links.external), 7, links.external >= 3, "Cite trusted external references where claims need support."),
    buildCheck("llms.txt file present", llms.ok ? 3 : 0, 3, llms.ok, "Publish /llms.txt to summarize important pages for LLM crawlers."),
  ];

  const groups = [
    { name: "Findable", max: 25, checks: findable },
    { name: "Quotable", max: 30, checks: quotable },
    { name: "Understandable", max: 25, checks: understandable },
    { name: "Trustworthy", max: 28, checks: trustworthy },
  ].map((group) => ({
    ...group,
    score: group.checks.reduce((sum, check) => sum + check.points, 0),
  }));

  const weightedScore = Math.round(
    (groups.reduce((sum, group) => sum + group.score, 0) /
      groups.reduce((sum, group) => sum + group.max, 0)) *
      100
  );

  const diagnosis =
    weightedScore >= 80
      ? "AI systems can understand and cite this site."
      : weightedScore >= 55
        ? "AI systems can read this site, but trust signals are incomplete."
        : "AI cannot trust this site yet.";

  const weakestGroup = [...groups].sort((a, b) => a.score / a.max - b.score / b.max)[0];

  return {
    domain: targetUrl.hostname.replace(/^www\./, ""),
    scannedUrl: page.url,
    score: weightedScore,
    diagnosis,
    summary:
      weightedScore >= 80
        ? "Strong - this site already gives answer engines clear structure, crawl paths, and citation signals."
        : weightedScore >= 55
          ? `Average - improve ${weakestGroup.name.toLowerCase()} signals to make the site easier for AI systems to quote.`
          : `Low - ${weakestGroup.name.toLowerCase()} is the weakest area. Fix the recommendations below first.`,
    categories: groups.map((group) => ({
      name: group.name,
      score: group.score,
      max: group.max,
      level: getLevel(Math.round((group.score / group.max) * 100)),
    })),
    groups,
    scannedAt: new Date().toISOString(),
    metrics: {
      wordCount,
      internalLinks: links.internal,
      externalLinks: links.external,
      images: alt.total,
      imagesWithAlt: alt.withAlt,
    },
  };
};

// Persist the lead + scan result to Notion CRM. Never throws — a CRM failure
// must not break the user's scan result.
const saveLeadToNotion = async (lead, report) => {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DB_ID;
  if (!token || !databaseId) return { ok: false, skipped: "missing_env" };

  const pillar = (name) => report.categories.find((c) => c.name === name)?.score ?? 0;
  const fullName = `${lead.firstName} ${lead.lastName}`.trim() || report.domain;

  const properties = {
    Name: { title: [{ text: { content: fullName.slice(0, 200) } }] },
    Website: { url: report.scannedUrl || `https://${report.domain}` },
    "AEO Score": { number: report.score },
    Findable: { number: pillar("Findable") },
    Quotable: { number: pillar("Quotable") },
    Understandable: { number: pillar("Understandable") },
    Trustworthy: { number: pillar("Trustworthy") },
    Diagnosis: { rich_text: [{ text: { content: (report.diagnosis || "").slice(0, 200) } }] },
    "Valid Website": { checkbox: true },
    "Lead Status": { select: { name: "New" } },
    Source: { select: { name: "AEO Scanner" } },
    "Scanned At": { date: { start: report.scannedAt } },
  };
  if (lead.email) properties.Email = { email: lead.email };
  if (lead.company) properties.Company = { rich_text: [{ text: { content: lead.company.slice(0, 200) } }] };

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const report = await scanWebsite(body.website || body.url || "");

    const lead = {
      firstName: String(body.firstName || "").slice(0, 80),
      lastName: String(body.lastName || "").slice(0, 80),
      email: String(body.email || "").slice(0, 160),
      company: String(body.company || "").slice(0, 160),
    };

    // Save to CRM (awaited so it completes before the function suspends).
    await saveLeadToNotion(lead, report);

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ...report, lead });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AEO scan failed";

    if (error?.code === "INVALID_WEBSITE") {
      res.setHeader("Cache-Control", "no-store");
      res.status(422).json({ error: message.replace(/^INVALID_WEBSITE:\s*/, ""), code: "INVALID_WEBSITE" });
      return;
    }

    const status = /required|only http|url/i.test(message) ? 400 : 500;
    res.setHeader("Cache-Control", "no-store");
    res.status(status).json({ error: message });
  }
}
