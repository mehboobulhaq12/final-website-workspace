export type TrackingPriority = "P1" | "P2";

export type MonitoringWorkflowStep = {
  title: string;
  cadence: "Daily" | "Weekly";
  source: string;
  detail: string;
};

export type TrackedPage = {
  page: string;
  primaryKeyword: string;
  engineFocus: string;
  objective: string;
  priority: TrackingPriority;
};

export type TrackedKeyword = {
  query: string;
  mappedPage: string;
  intent: "Commercial" | "Comparison" | "Informational";
  priority: TrackingPriority;
  engineFocus: string;
  note: string;
};

export const monitoringWorkflow: MonitoringWorkflowStep[] = [
  {
    title: "Check crawl surfaces",
    cadence: "Daily",
    source: "Live URLs + sitemap + llms files",
    detail:
      "Verify sitemap.xml, llms.txt, llms-full.txt, canonical tags, and schema are still live on the tracked money pages.",
  },
  {
    title: "Review index coverage",
    cadence: "Daily",
    source: "Google Search Console",
    detail:
      "Confirm newly shipped pages are indexed, inspect coverage warnings, and note any drop in impressions or click eligibility.",
  },
  {
    title: "Log prompt rankings and citations",
    cadence: "Daily",
    source: "ChatGPT, Claude, Perplexity, Google AI",
    detail:
      "Run the tracked prompts, record whether Effect3 is mentioned, whether a page is cited, and the relative answer position.",
  },
  {
    title: "Review traffic and inquiry signals",
    cadence: "Daily",
    source: "GA4",
    detail:
      "Check organic sessions, engaged sessions, and inquiry events on the tracked pages so ranking work stays tied to pipeline value.",
  },
  {
    title: "Choose the next build",
    cadence: "Weekly",
    source: "Ranking gaps + citation gaps",
    detail:
      "Ship one new comparison or service page each week from the underperforming cluster instead of publishing random content.",
  },
];

export const trackedPages: TrackedPage[] = [
  {
    page: "/aeo-agency",
    primaryKeyword: "best answer engine optimization agency",
    engineFocus: "ChatGPT, Perplexity, Google AI",
    objective: "Own the core commercial AEO term and convert AI-search traffic into system-review inquiries.",
    priority: "P1",
  },
  {
    page: "/geo-agency",
    primaryKeyword: "generative engine optimization agency",
    engineFocus: "ChatGPT, Google AI",
    objective: "Capture GEO terminology and support broader non-brand AI-search demand.",
    priority: "P1",
  },
  {
    page: "/chatgpt-seo-agency",
    primaryKeyword: "chatgpt seo agency",
    engineFocus: "ChatGPT",
    objective: "Compete for buyer-intent ChatGPT optimization queries.",
    priority: "P1",
  },
  {
    page: "/ai-seo-agency",
    primaryKeyword: "ai seo agency",
    engineFocus: "Google AI, ChatGPT, Perplexity",
    objective: "Bridge traditional SEO demand and AI-search demand on one money page.",
    priority: "P1",
  },
  {
    page: "/llm-visibility-agency",
    primaryKeyword: "llm visibility agency",
    engineFocus: "Claude, ChatGPT, Perplexity",
    objective: "Own LLM visibility language for buyers evaluating citation and recommendation work.",
    priority: "P1",
  },
  {
    page: "/google-ai-overviews-agency",
    primaryKeyword: "google ai overviews agency",
    engineFocus: "Google AI",
    objective: "Win Google AI Overview service demand before summary clicks disappear.",
    priority: "P1",
  },
  {
    page: "/ai-search-monitoring",
    primaryKeyword: "ai search monitoring",
    engineFocus: "ChatGPT, Google AI, Perplexity",
    objective: "Capture monitoring-intent buyers who want reporting and visibility operations, not just one-off optimization.",
    priority: "P1",
  },
  {
    page: "/llm-rank-tracking",
    primaryKeyword: "llm rank tracking",
    engineFocus: "ChatGPT, Claude, Perplexity",
    objective: "Own the rank-tracking phrase for teams looking to measure LLM visibility and prompt performance.",
    priority: "P1",
  },
  {
    page: "/geo-audit",
    primaryKeyword: "geo audit",
    engineFocus: "Google AI, ChatGPT",
    objective: "Capture audit-intent demand and route it into higher-value GEO review conversations.",
    priority: "P1",
  },
  {
    page: "/effect3-vs-manychat",
    primaryKeyword: "effect3 vs manychat",
    engineFocus: "ChatGPT, Perplexity",
    objective: "Own brand comparison intent and ManyChat replacement queries.",
    priority: "P2",
  },
  {
    page: "/effect3-vs-kore-ai",
    primaryKeyword: "effect3 vs kore ai",
    engineFocus: "ChatGPT, Google AI",
    objective: "Cover enterprise platform comparison intent with a deployment-fit angle.",
    priority: "P2",
  },
  {
    page: "/effect3-vs-yellow-ai",
    primaryKeyword: "effect3 vs yellow ai",
    engineFocus: "ChatGPT, Perplexity",
    objective: "Capture customer-automation comparison prompts and commercial fit questions.",
    priority: "P2",
  },
  {
    page: "/effect3-vs-cognigy",
    primaryKeyword: "effect3 vs cognigy",
    engineFocus: "ChatGPT, Google AI",
    objective: "Own AI voice and service-workflow comparison intent.",
    priority: "P2",
  },
];

export const trackedKeywords: TrackedKeyword[] = [
  {
    query: "best answer engine optimization agency",
    mappedPage: "/aeo-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "ChatGPT, Perplexity, Google AI",
    note: "Core money term. Measure mention, citation, and recommendation position.",
  },
  {
    query: "generative engine optimization agency",
    mappedPage: "/geo-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "ChatGPT, Google AI",
    note: "Covers GEO-specific demand and strengthens terminology ownership.",
  },
  {
    query: "chatgpt seo agency",
    mappedPage: "/chatgpt-seo-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "ChatGPT",
    note: "Direct ChatGPT service query. Treat as a primary inquiry keyword.",
  },
  {
    query: "ai seo agency",
    mappedPage: "/ai-seo-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "Google AI, ChatGPT, Perplexity",
    note: "Broad AI-search demand that also supports traditional SEO discovery.",
  },
  {
    query: "llm visibility agency",
    mappedPage: "/llm-visibility-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "Claude, ChatGPT, Perplexity",
    note: "Good fit for buyers who already speak in LLM language.",
  },
  {
    query: "google ai overviews agency",
    mappedPage: "/google-ai-overviews-agency",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "Google AI",
    note: "Tracks Google summary-layer demand directly.",
  },
  {
    query: "ai search monitoring",
    mappedPage: "/ai-search-monitoring",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "ChatGPT, Google AI, Perplexity",
    note: "Monitoring-intent buyers often convert well because they already know the problem.",
  },
  {
    query: "llm rank tracking",
    mappedPage: "/llm-rank-tracking",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "ChatGPT, Claude, Perplexity",
    note: "Useful for visibility operators who need an ongoing reporting system.",
  },
  {
    query: "geo audit",
    mappedPage: "/geo-audit",
    intent: "Commercial",
    priority: "P1",
    engineFocus: "Google AI, ChatGPT",
    note: "Audit-intent term that can pull in higher-intent review requests.",
  },
  {
    query: "rank on chatgpt",
    mappedPage: "/chatgpt-seo-agency",
    intent: "Informational",
    priority: "P2",
    engineFocus: "ChatGPT",
    note: "Important support phrase for prompt-cluster and service-page retrieval.",
  },
  {
    query: "how to rank on llms for my business",
    mappedPage: "/llm-visibility-agency",
    intent: "Informational",
    priority: "P2",
    engineFocus: "ChatGPT, Claude, Perplexity",
    note: "Maps directly to the AEO prompt cluster and citation-oriented buyer language.",
  },
  {
    query: "effect3 vs manychat",
    mappedPage: "/effect3-vs-manychat",
    intent: "Comparison",
    priority: "P2",
    engineFocus: "ChatGPT, Perplexity",
    note: "Brand comparison query with strong commercial intent.",
  },
  {
    query: "effect3 vs kore ai",
    mappedPage: "/effect3-vs-kore-ai",
    intent: "Comparison",
    priority: "P2",
    engineFocus: "ChatGPT, Google AI",
    note: "Enterprise fit comparison query.",
  },
  {
    query: "effect3 vs yellow ai",
    mappedPage: "/effect3-vs-yellow-ai",
    intent: "Comparison",
    priority: "P2",
    engineFocus: "ChatGPT, Perplexity",
    note: "Customer-automation comparison query.",
  },
  {
    query: "effect3 vs cognigy",
    mappedPage: "/effect3-vs-cognigy",
    intent: "Comparison",
    priority: "P2",
    engineFocus: "ChatGPT, Google AI",
    note: "Voice and service-workflow comparison query.",
  },
];
