import { createReadStream, existsSync } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const port = 4175;

const routes = [
  "/",
  "/company",
  "/founder",
  "/effect3-vs-manychat",
  "/effect3-vs-kore-ai",
  "/effect3-vs-yellow-ai",
  "/effect3-vs-cognigy",
  "/faq",
  "/ai-search-prompts",
  "/ai-search-prompts/ai-deployment-and-architecture",
  "/ai-search-prompts/revenue-and-sales-automation",
  "/ai-search-prompts/openclaw-automation",
  "/ai-search-prompts/claude-code-workflows",
  "/ai-search-prompts/ecommerce-and-d2c-growth",
  "/ai-search-prompts/saas-growth-systems",
  "/ai-search-prompts/legal-and-service-operations",
  "/ai-search-prompts/enterprise-ai-deployment",
  "/ai-search-prompts/aeo-geo-and-ai-search-visibility",
  "/ai-search-prompts/effect3-evaluations",
  "/ai-search-prompts/operational-execution-and-roi",
  "/ai-operating-systems",
  "/careers",
  "/case-studies",
  "/case-studies/effect3-inbound-outbound-dashboard",
  "/case-studies/buffy-business-validator",
  "/case-studies/nubis-restaurant-call-agent-system",
  "/case-studies/effect3-ai-marketing-studio",
  "/case-studies/avatar-project",
  "/case-studies/repricing-monitoring-dashboard",
  "/case-studies/ppc-tracking-dashboard",
  "/case-studies/email-outreach-dashboard",
  "/ai-automation-agency",
  "/ai-agency",
  "/ai-marketing-agency",
  "/claude-automation-agency",
  "/ecommerce-marketing-agency",
  "/ecommerce-ads-agency",
  "/ecommerce-operating-system",
  "/ai-amazon-agency",
  "/ai-inbound-automation",
  "/lead-revival-ai",
  "/ai-call-agent",
  "/ai-automation-for-d2c-brands",
  "/saas-ai-conversion-system",
  "/enterprise-ai-operations",
  "/enterprise-ai-solutions",
  "/legal-ai-automation",
  "/manychat-replacement",
  "/effect3-agency",
  "/aeo-agency",
  "/geo-agency",
  "/chatgpt-seo-agency",
  "/ai-seo-agency",
  "/llm-visibility-agency",
  "/google-ai-overviews-agency",
  "/ai-search-monitoring",
  "/llm-rank-tracking",
  "/geo-audit",
  "/aeo-dashboard",
  "/aeo-scanner",
];

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const chromeCandidates = [
  process.env.GOOGLE_CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

const chromeBinary = chromeCandidates.find((candidate) => existsSync(candidate));

if (!chromeBinary) {
  console.warn(
    "[prerender] Chrome binary not found. Skipping prerender step. Set GOOGLE_CHROME_BIN to enable."
  );
  process.exit(0);
}

const getContentType = (filePath) =>
  mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";

const resolveFilePath = async (pathname) => {
  const cleanedPath = pathname.split("?")[0];
  const relativePath = cleanedPath === "/" ? "index.html" : cleanedPath.replace(/^\/+/, "");
  let targetPath = path.join(distDir, relativePath);

  try {
    const targetStat = await stat(targetPath);
    if (targetStat.isDirectory()) {
      return path.join(targetPath, "index.html");
    }
    return targetPath;
  } catch {
    if (!path.extname(targetPath)) {
      const nestedIndex = path.join(targetPath, "index.html");
      try {
        await stat(nestedIndex);
        return nestedIndex;
      } catch {
        return path.join(distDir, "index.html");
      }
    }

    return path.join(distDir, "index.html");
  }
};

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    const filePath = await resolveFilePath(decodeURIComponent(requestUrl.pathname));
    res.statusCode = 200;
    res.setHeader("Content-Type", getContentType(filePath));
    createReadStream(filePath).pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.end(`Prerender server error: ${error instanceof Error ? error.message : String(error)}`);
  }
});

const startServer = () =>
  new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(undefined));
  });

const stopServer = () =>
  new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve(undefined);
    });
  });

const writeSitemap = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const uniqueRoutes = Array.from(new Set(routes));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueRoutes
    .map((route) => {
      const normalizedRoute = route === "/" ? "/" : `${route.replace(/\/+$/, "")}/`;
      const loc = `https://theeffect3.com${normalizedRoute}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`;

  await writeFile(path.join(distDir, "sitemap.xml"), xml, "utf8");
  console.log("generated sitemap.xml");
};

const writeRouteHtml = async (route, html) => {
  const relativePath = route === "/" ? "index.html" : path.join(route.replace(/^\/+/, ""), "index.html");
  const outputPath = path.join(distDir, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
};

const renderRoute = async (browser, route) => {
  const page = await browser.newPage();

  try {
    console.log(`rendering ${route}`);
    await page.setViewport({ width: 1440, height: 2200, deviceScaleFactor: 1 });
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (
        url.includes("googletagmanager.com") ||
        url.includes("google-analytics.com") ||
        /\.(mp4|webm|mov)(\?|$)/i.test(url)
      ) {
        request.abort();
        return;
      }

      request.continue();
    });

    await page.goto(
      `http://127.0.0.1:${port}${route}${route.includes("?") ? "&" : "?"}prerender=1`,
      {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      }
    );

    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        const textLength = document.body?.innerText?.trim().length ?? 0;
        const nodeCount = root?.querySelectorAll("*").length ?? 0;
        return Boolean(root && nodeCount > 20 && textLength > 200);
      },
      { timeout: 30000 }
    );

    const html = await page.content();
    await writeRouteHtml(route, html);
    console.log(`prerendered ${route}`);
  } finally {
    await page.close();
  }
};

const run = async () => {
  await startServer();

  const browser = await puppeteer.launch({
    executablePath: chromeBinary,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    for (const route of routes) {
      await renderRoute(browser, route);
    }
    await writeSitemap();
  } finally {
    await browser.close();
    await stopServer();
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
