import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Download, Link2, X } from "lucide-react";
import { animate, motion } from "framer-motion";
import AeoShader from "@/components/AeoShader";
import { ShimmerText } from "@/components/ui/shimmer-text";
import SeoHead from "@/components/SeoHead";
import logo from "@/assets/logo.png";
import { getCanonicalUrl, siteMeta } from "@/lib/seo";
import "./AeoScanner.css";

type ScanStatus = "idle" | "scanning" | "result";
type CheckStatus = "pass" | "partial" | "fail";

interface ScannerForm {
  website: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

interface ScannerErrors {
  website?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface ScanCheck {
  label: string;
  points: number;
  max: number;
  status: CheckStatus;
  fix: string;
}

interface ScanGroup {
  name: string;
  score: number;
  max: number;
  checks: ScanCheck[];
}

interface ScanCategory {
  name: string;
  score: number;
  max: number;
  level: "Strong" | "Average" | "Poor";
}

interface ScanReport {
  domain: string;
  scannedUrl?: string;
  score: number;
  diagnosis: string;
  summary: string;
  categories: ScanCategory[];
  groups: ScanGroup[];
  scannedAt: string;
}

const initialForm: ScannerForm = {
  website: "",
  firstName: "",
  lastName: "",
  email: "",
  company: "",
};

const scanFacts = [
  "ChatGPT reached 100 million users in just 2 months, faster than any product in history.",
  "Over 60% of Google searches now end without a single click.",
  "AI assistants quote pages with clear structure and schema far more often than those without.",
  "More searches now happen inside answer engines instead of traditional result pages.",
];

const guideItems = [
  {
    title: "AI answers are replacing search clicks",
    body: "Over 60% of searches now end without a click. If AI does not surface your site, users may never find you at all.",
  },
  {
    title: "Structure and trust signals matter more than ever",
    body: "AI models favor pages with clear metadata, structured content, and authoritative sources. Bad structure means your content gets skipped entirely.",
  },
  {
    title: "Most websites are not ready, but yours can be",
    body: "Most sites still lack the basic signals AI needs. A few targeted fixes can move you from invisible to frequently cited.",
  },
];

const fallbackGroups: ScanGroup[] = [
  {
    name: "Findable",
    score: 25,
    max: 25,
    checks: [
      { label: "HTTPS enabled", points: 2, max: 2, status: "pass", fix: "Keep every canonical URL on HTTPS." },
      { label: "robots.txt present", points: 4, max: 4, status: "pass", fix: "Keep crawler access rules explicit." },
      { label: "sitemap.xml present", points: 7, max: 7, status: "pass", fix: "Keep canonical URLs and lastmod dates current." },
      { label: "Canonical URL set", points: 7, max: 7, status: "pass", fix: "Use one canonical URL per page." },
      { label: "AI crawlers allowed", points: 5, max: 5, status: "pass", fix: "Keep relevant AI crawlers available." },
    ],
  },
  {
    name: "Quotable",
    score: 17,
    max: 25,
    checks: [
      { label: "Answer-ready copy", points: 7, max: 10, status: "partial", fix: "Add direct, self-contained answers to buyer questions." },
      { label: "FAQ content", points: 4, max: 7, status: "partial", fix: "Add question-led content and FAQ schema." },
      { label: "Freshness signals", points: 6, max: 8, status: "partial", fix: "Publish updated dates and sitemap lastmod values." },
    ],
  },
  {
    name: "Understandable",
    score: 8,
    max: 25,
    checks: [
      { label: "Heading hierarchy", points: 3, max: 7, status: "partial", fix: "Use one descriptive H1 and logical section headings." },
      { label: "Structured data", points: 0, max: 10, status: "fail", fix: "Add Organization, WebPage, Service, Product, and FAQ schema." },
      { label: "Entity clarity", points: 5, max: 8, status: "partial", fix: "State clearly who you are, what you do, and who you serve." },
    ],
  },
  {
    name: "Trustworthy",
    score: 3,
    max: 25,
    checks: [
      { label: "Internal proof links", points: 1, max: 9, status: "fail", fix: "Link to relevant case studies and evidence pages." },
      { label: "External citations", points: 2, max: 8, status: "partial", fix: "Cite trusted sources for technical and market claims." },
      { label: "Author and company proof", points: 0, max: 8, status: "fail", fix: "Add bylines, credentials, company details, and verifiable profiles." },
    ],
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      ["AEO Scanner", "/aeo-scanner"],
      ["AI Agents", "/ai-operating-systems"],
      ["Systems", "/#solutions"],
      ["Case Studies", "/case-studies"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/company"],
      ["Careers", "/careers"],
      ["Contact", "/#book"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["AEO Guide", "/ai-search-prompts/aeo-geo-and-ai-search-visibility"],
      ["AI Search Prompts", "/ai-search-prompts"],
      ["FAQ", "/faq"],
    ],
  },
];

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const getDomain = (value: string) => {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return value.trim() || "your site";
  }
};

const isValidWebsite = (value: string) => {
  const normalized = value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "");
  return /^([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}(\/.*)?$/i.test(normalized);
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const getScoreLevel = (score: number): ScanCategory["level"] => {
  if (score >= 80) return "Strong";
  if (score >= 55) return "Average";
  return "Poor";
};

const buildFallbackReport = (website: string): ScanReport => ({
  domain: getDomain(website),
  score: 53,
  diagnosis: "AI sees you, but not clearly.",
  summary: "The page lacks essential text content.",
  categories: fallbackGroups.map((group) => ({
    name: group.name,
    score: group.score,
    max: group.max,
    level: getScoreLevel(Math.round((group.score / group.max) * 100)),
  })),
  groups: fallbackGroups,
  scannedAt: new Date().toISOString(),
});

const categoryTone = (level: ScanCategory["level"]) => {
  if (level === "Strong") {
    return { color: "#34d399", dim: "rgba(52,211,153,0.16)", label: "Good" };
  }
  if (level === "Average") {
    return { color: "#f59e0b", dim: "rgba(245,158,11,0.16)", label: "Average" };
  }
  return { color: "#fb6f47", dim: "rgba(251,111,71,0.16)", label: "Poor" };
};

const reportHeadline = (report: ScanReport) => {
  if (report.score >= 80) {
    return { first: "AI can find you,", second: "and trust you.", sub: report.summary };
  }
  if (report.score >= 55) {
    return { first: "Visible,", second: "but not yet the answer.", sub: report.summary };
  }
  return { first: "AI sees you,", second: "but not clearly.", sub: report.summary };
};

const groupDetail = (group: ScanGroup) => {
  const fixes = group.checks
    .filter((check) => check.status !== "pass")
    .map((check) => check.fix)
    .filter(Boolean)
    .slice(0, 3);

  if (!fixes.length) {
    return `${group.name} signals are strong. Keep the current crawl, structure, and trust signals maintained as the site changes.`;
  }

  return fixes.join(" ");
};

const AnimatedScore = ({ score }: { score: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [score]);

  return <>{display}</>;
};

export default function AeoScanner() {
  const [form, setForm] = useState<ScannerForm>(initialForm);
  const [errors, setErrors] = useState<ScannerErrors>({});
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [report, setReport] = useState<ScanReport | null>(null);
  const [scanNote, setScanNote] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const websiteInputRef = useRef<HTMLInputElement>(null);

  const structuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Effect3 AEO Scanner",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: getCanonicalUrl("/aeo-scanner"),
        provider: { "@type": "Organization", name: siteMeta.name, url: siteMeta.url },
        description:
          "Effect3 AEO Scanner checks whether AI answer engines can find, understand, and quote your website.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
    []
  );

  useEffect(() => {
    if (status !== "scanning") return undefined;

    const startedAt = Date.now();
    const duration = 10000;
    setProgress(0);
    setFactIndex(0);

    const progressTimer = window.setInterval(() => {
      const elapsed = Math.min(1, (Date.now() - startedAt) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 2);
      setProgress(Math.min(94, Math.round(eased * 100)));
    }, 60);

    const factTimer = window.setInterval(() => {
      setFactIndex((current) => (current + 1) % scanFacts.length);
    }, 2400);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(factTimer);
    };
  }, [status]);

  const updateField = (field: keyof ScannerForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: ScannerErrors = {};
    if (!isValidWebsite(form.website)) {
      nextErrors.website = "Please enter a valid website, e.g. yoursite.com";
    }
    if (!form.firstName.trim()) nextErrors.firstName = "Required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Required.";
    if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setStatus("scanning");
    setReport(null);
    setScanNote("");
    setOpenCategory(null);

    // Local dev has no /api function — show a sample report for visual preview only.
    if (import.meta.env.DEV) {
      const [nextReport] = await Promise.all([
        Promise.resolve(buildFallbackReport(form.website)),
        wait(10000),
      ]);
      setProgress(100);
      await wait(300);
      setReport(nextReport);
      setStatus("result");
      return;
    }

    try {
      const minimumScan = wait(6000);
      const response = await fetch("/api/aeo-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Website failed validation (not real / offline / parked) — never fake a report.
      if (response.status === 422) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus("idle");
        setErrors((current) => ({
          ...current,
          website: payload?.error || "We couldn't verify that website. Please check the URL.",
        }));
        window.setTimeout(() => websiteInputRef.current?.focus(), 0);
        return;
      }

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "The scan could not complete. Please try again.");
      }

      const nextReport = (await response.json()) as ScanReport;
      await minimumScan;
      setProgress(100);
      await wait(300);
      setReport(nextReport);
      setStatus("result");
    } catch (error) {
      setStatus("idle");
      setErrors((current) => ({
        ...current,
        website: error instanceof Error ? error.message : "The scan could not complete. Please try again.",
      }));
    }
  };

  const resetScanner = () => {
    setForm(initialForm);
    setErrors({});
    setProgress(0);
    setReport(null);
    setScanNote("");
    setOpenCategory(null);
    setStatus("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const focusScanner = () => {
    websiteInputRef.current?.focus();
    websiteInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const copyReportLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;

    const canvas = document.createElement("canvas");
    const scale = 2;
    const width = 1080;
    const height = 1350;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(scale, scale);

    const padding = 80;
    const background = context.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#0c0712");
    background.addColorStop(0.55, "#0a0510");
    background.addColorStop(1, "#070309");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const glow = context.createRadialGradient(width * 0.7, 60, 0, width * 0.7, 60, 620);
    glow.addColorStop(0, "rgba(124,58,237,0.32)");
    glow.addColorStop(1, "rgba(124,58,237,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const font = "Inter, Arial, sans-serif";
    context.fillStyle = "#ffffff";
    context.font = `700 30px ${font}`;
    context.fillText("EFFECT3", padding, 132);
    context.fillStyle = "rgba(255,255,255,0.5)";
    context.font = `500 16px ${font}`;
    context.textAlign = "right";
    context.fillText("AEO COMPATIBILITY REPORT", width - padding, 130);
    context.textAlign = "left";

    context.fillStyle = "rgba(255,255,255,0.55)";
    context.font = `300 22px ${font}`;
    context.fillText(report.domain, padding, 210);
    context.fillStyle = "#ffffff";
    context.font = `700 150px ${font}`;
    context.fillText(String(report.score), padding, 410);
    context.fillStyle = "rgba(255,255,255,0.4)";
    context.font = `300 40px ${font}`;
    context.fillText("/ 100", padding + 190, 410);

    const headline = reportHeadline(report);
    context.fillStyle = "#ffffff";
    context.font = `700 52px ${font}`;
    context.fillText(`${headline.first} ${headline.second}`, padding, 500);
    context.fillStyle = "rgba(255,255,255,0.55)";
    context.font = `300 24px ${font}`;
    context.fillText(headline.sub.slice(0, 72), padding, 545);

    let y = 660;
    report.categories.forEach((category) => {
      const percent = Math.round((category.score / category.max) * 100);
      const tone = categoryTone(getScoreLevel(percent));
      context.fillStyle = "rgba(255,255,255,0.1)";
      context.fillRect(padding, y - 44, width - padding * 2, 1);
      context.fillStyle = "rgba(255,255,255,0.92)";
      context.font = `500 34px ${font}`;
      context.fillText(category.name, padding, y);
      context.textAlign = "right";
      context.fillStyle = tone.color;
      context.font = `600 24px ${font}`;
      context.fillText(`${category.score} / ${category.max}`, width - padding, y - 6);
      context.textAlign = "left";

      const total = 24;
      const gap = 6;
      const segmentWidth = (width - padding * 2 - gap * (total - 1)) / total;
      const active = Math.round((percent / 100) * total);
      for (let index = 0; index < total; index += 1) {
        context.fillStyle = index < active ? tone.color : "rgba(255,255,255,0.1)";
        context.fillRect(padding + index * (segmentWidth + gap), y + 36, segmentWidth, 14);
      }
      y += 142;
    });

    context.fillStyle = "rgba(255,255,255,0.5)";
    context.font = `400 15px ${font}`;
    context.fillText("Generated by Effect3 AEO Scanner", padding, height - 44);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `aeo-report-${report.domain.replace(/[^a-z0-9.-]+/gi, "-")}.png`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(newsletterEmail)) return;
    const subject = encodeURIComponent("Subscribe me to Effect3 AEO updates");
    const body = encodeURIComponent(`Please add ${newsletterEmail} to Effect3 AEO updates.`);
    window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`;
  };

  const activeReport = report || buildFallbackReport(form.website);
  const headline = reportHeadline(activeReport);

  return (
    <>
      <SeoHead
        title="AEO Scanner | See If AI Can Find Your Website | Effect3"
        description="Scan your website for AEO and AI SEO signals. See whether ChatGPT, Gemini, Perplexity, and AI Overviews can find, understand, trust, and cite your pages."
        canonical={getCanonicalUrl("/aeo-scanner")}
        keywords="AEO scanner, AI SEO scanner, answer engine optimization, generative engine optimization, LLM visibility, Effect3"
        structuredData={structuredData}
      />

      <div className="aeo-page">
        {status === "scanning" ? (
          <div className="aeo-scanning-overlay" role="status" aria-live="polite">
            <div className="aeo-scanning-glow" />
            <div className="aeo-scanning-center">
              <div className="aeo-scan-mark">
                <span className="aeo-scan-ring" />
                <img className="aeo-scan-logo" src={logo} alt="Effect3" />
              </div>
              <div className="aeo-scanning-copy">
                <h2>
                  <ShimmerText
                    variant="orange"
                    className="font-bold tracking-tight text-orange-400 [--shimmer-contrast:rgba(255,255,255,0.92)]"
                  >
                    Checking how AI sees {getDomain(form.website)}
                  </ShimmerText>
                </h2>
                <div className="aeo-scanning-progress">
                  <span style={{ width: `${progress}%` }}>
                    <i />
                  </span>
                </div>
                <p>{progress}% complete</p>
              </div>
            </div>
            <div className="aeo-scan-fact" key={factIndex}>
              <span>Did you know?</span>
              <p>{scanFacts[factIndex]}</p>
            </div>
          </div>
        ) : null}

        <section className="aeo-hero" id="scanner">
          <div className="aeo-shader-wrap">
            <AeoShader />
            <div className="aeo-shader-fade" />
            <div className="aeo-shader-vignette" />
          </div>

          {announcementVisible ? (
            <div className="aeo-announcement">
              <div className="aeo-announcement-bloom" />
              <div className="aeo-announcement-hairline" />
              <div className="aeo-announcement-mask">
                <div className="aeo-announcement-track">
                  {[0, 1].map((group) => (
                    <div className="aeo-announcement-group" key={group} aria-hidden={group === 1}>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <span className="aeo-announcement-phrase" key={index}>
                          <span>
                            Scan your website to see how compatible it is with <strong>AEO</strong>
                          </span>
                          <i>◆</i>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="aeo-announcement-controls">
                <button type="button" className="aeo-announcement-scan" onClick={focusScanner}>
                  Scan now <ArrowRight size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="aeo-announcement-close"
                  onClick={() => setAnnouncementVisible(false)}
                  aria-label="Dismiss announcement"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}

          <header className="aeo-header">
            <a className="aeo-logo" href="/" aria-label="Effect3 home">
              <img src={logo} alt="Effect3" />
            </a>
          </header>

          <div className="aeo-hero-content">
            {status !== "result" ? (
              <div className="aeo-intro">
                <h1>
                  Can AI find{" "}
                  <br />
                  your{" "}
                  <span className="aeo-hero-word">website</span>
                  ?
                </h1>
                <p className="aeo-intro-copy">
                  AI is changing how customers find you. LLMs like{" "}
                  <strong>ChatGPT, Perplexity, and Gemini</strong> now answer questions directly and
                  most sites are not ready. Scan yours in 10 seconds.
                </p>

                <form className="aeo-scanner-card" onSubmit={handleSubmit} noValidate>
                  <div className="aeo-card-hairline" />
                  <label className="aeo-field">
                    <span>Website</span>
                    <input
                      ref={websiteInputRef}
                      value={form.website}
                      onChange={(event) => updateField("website", event.target.value)}
                      placeholder="https://yoursite.com"
                      autoComplete="url"
                      aria-invalid={Boolean(errors.website)}
                    />
                    {errors.website ? <small>{errors.website}</small> : null}
                  </label>

                  <div className="aeo-name-grid">
                    <label className="aeo-field">
                      <span>First name</span>
                      <input
                        value={form.firstName}
                        onChange={(event) => updateField("firstName", event.target.value)}
                        placeholder="First name"
                        autoComplete="given-name"
                        aria-invalid={Boolean(errors.firstName)}
                      />
                      {errors.firstName ? <small>{errors.firstName}</small> : null}
                    </label>
                    <label className="aeo-field">
                      <span>Last name</span>
                      <input
                        value={form.lastName}
                        onChange={(event) => updateField("lastName", event.target.value)}
                        placeholder="Last name"
                        autoComplete="family-name"
                        aria-invalid={Boolean(errors.lastName)}
                      />
                      {errors.lastName ? <small>{errors.lastName}</small> : null}
                    </label>
                  </div>

                  <label className="aeo-field">
                    <span>Business email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? <small>{errors.email}</small> : null}
                  </label>

                  <label className="aeo-field">
                    <span>Company</span>
                    <input
                      value={form.company}
                      onChange={(event) => updateField("company", event.target.value)}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </label>

                  <button className="aeo-scan-submit" type="submit">
                    Scan your site <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </form>

                <p className="aeo-disclaimer">
                  <strong>This assessment scans one URL and uses AI.</strong> Results may not be
                  perfect. Use them as a guide, not a final answer. Scores reflect our own
                  methodology and may differ from other AEO reports.
                </p>
              </div>
            ) : null}

            {status === "result" && report ? (
              <motion.div
                className="aeo-result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {scanNote ? <p className="aeo-scan-note">Live scan note: {scanNote}</p> : null}
                <div className="aeo-report-pill">
                  <span>AEO report for</span>
                  <strong>{report.domain}</strong>
                </div>

                <h1>
                  {headline.first}
                  <br />
                  {headline.second}
                </h1>
                <p className="aeo-result-subtitle">{headline.sub}</p>

                <div className="aeo-result-actions">
                  <button type="button" onClick={copyReportLink} aria-label="Copy report link">
                    <Link2 size={18} aria-hidden="true" />
                    <span>{copied ? "Copied" : "Copy link"}</span>
                  </button>
                  <button type="button" onClick={downloadReport} aria-label="Download report">
                    <Download size={18} aria-hidden="true" />
                    <span>Download report</span>
                  </button>
                </div>

                <div className="aeo-score-card">
                  <div className="aeo-score-heading">
                    <div>
                      <strong>
                        <AnimatedScore score={report.score} />
                      </strong>
                      <span>/100</span>
                    </div>
                    <p>Overall AEO Score</p>
                  </div>

                  <div className="aeo-score-barcode" aria-hidden="true">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <span
                        key={index}
                        className={index < Math.round((report.score / 100) * 40) ? "is-active" : ""}
                      />
                    ))}
                  </div>

                  <div className="aeo-score-categories">
                    {report.categories.map((category) => {
                      const percent = Math.round((category.score / category.max) * 100);
                      const level = getScoreLevel(percent);
                      const tone = categoryTone(level);
                      return (
                        <div className="aeo-score-category" key={category.name}>
                          <div>
                            <strong>{category.name}</strong>
                            <span style={{ color: tone.color }}>{tone.label}</span>
                          </div>
                          <div className="aeo-category-segments" aria-hidden="true">
                            {Array.from({ length: 20 }).map((_, index) => (
                              <i
                                key={index}
                                style={{
                                  backgroundColor:
                                    index < Math.round((percent / 100) * 20) ? tone.color : tone.dim,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="aeo-percentile">
                  <strong>{report.score >= 55 ? "Above average" : "Below average"}</strong>. A score
                  of {report.score} places this site {report.score >= 55 ? "ahead of" : "behind"} many
                  sites we scan.
                </p>

                <div className="aeo-result-accordion">
                  {report.groups.map((group) => {
                    const percent = Math.round((group.score / group.max) * 100);
                    const tone = categoryTone(getScoreLevel(percent));
                    const open = openCategory === group.name;
                    return (
                      <div className="aeo-accordion-row" key={group.name}>
                        <button
                          type="button"
                          onClick={() => setOpenCategory(open ? null : group.name)}
                          aria-expanded={open}
                        >
                          <span>{group.name}</span>
                          <span className="aeo-accordion-score">
                            <strong style={{ color: tone.color }}>
                              {group.score} / {group.max}
                            </strong>
                            <ChevronDown
                              size={20}
                              className={open ? "is-open" : ""}
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                        <div className={`aeo-accordion-panel ${open ? "is-open" : ""}`}>
                          <p>{groupDetail(group)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className="aeo-scan-again" type="button" onClick={resetScanner}>
                  Scan another site
                </button>
              </motion.div>
            ) : null}
          </div>
        </section>

        <section className="aeo-guide">
          <div className="aeo-guide-inner">
            <div className="aeo-guide-title">
              <h2>
                AI does not rank pages.
                <br />
                It picks answers.
              </h2>
            </div>
            <div className="aeo-guide-content">
              <p className="aeo-guide-lead">
                Answer Engine Optimization (AEO) makes your content easy for AI systems like{" "}
                <strong>ChatGPT, Perplexity, and Gemini</strong> to find, understand, and quote. As
                people get answers directly from AI, being invisible to AI means being invisible to
                your audience.
              </p>
              {guideItems.map((item) => (
                <article className="aeo-guide-item" key={item.title}>
                  <div>
                    <span />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="aeo-footer">
          <div className="aeo-footer-inner">
            <div className="aeo-footer-main">
              <div className="aeo-footer-newsletter">
                <p>
                  AI operating systems that make your business visible, cited, and chosen by answer
                  engines.
                </p>
                <form onSubmit={subscribe}>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="Your email"
                    aria-label="Email for AEO updates"
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>

              <div className="aeo-footer-columns">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <span>{column.title}</span>
                    {column.links.map(([label, href]) => (
                      <a href={href} key={label}>
                        {label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="aeo-footer-meta">
              <span>© 2026 Effect3. All rights reserved.</span>
              <div>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Status</span>
              </div>
            </div>

            <div className="aeo-footer-wordmark" aria-hidden="true">
              EFFECT3
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
