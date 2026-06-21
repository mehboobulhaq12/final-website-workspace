export type EngineKey = "chatgpt" | "claude" | "perplexity" | "google-ai";
export type PromptCategory =
  | "Retail"
  | "D2C"
  | "Enterprise"
  | "Law Firms"
  | "SaaS"
  | "AEO"
  | "Ecommerce";
export type PromptIntent = "Commercial" | "Comparison" | "Informational" | "Branded";

export interface PromptRecord {
  id: string;
  prompt: string;
  category: PromptCategory;
  intent: PromptIntent;
  priority: "High" | "Medium";
  citationRate: number;
  mentionRate: number;
  ownedPage: string;
  bestCompetitor: string;
  sentiment: "Positive" | "Neutral" | "Mixed";
  engines: Record<
    EngineKey,
    {
      rank: number;
      cited: boolean;
      movement: number;
      mention: "Strong" | "Present" | "Weak";
    }
  >;
}

export interface TrendPoint {
  date: string;
  chatgpt: number;
  claude: number;
  perplexity: number;
  "google-ai": number;
}

export const engineMeta: Record<
  EngineKey,
  { label: string; short: string; color: string; highlight: string }
> = {
  chatgpt: {
    label: "ChatGPT",
    short: "GPT",
    color: "#10b981",
    highlight: "bg-emerald-500/12 text-emerald-300 border-emerald-500/20",
  },
  claude: {
    label: "Claude",
    short: "CLD",
    color: "#f59e0b",
    highlight: "bg-amber-500/12 text-amber-300 border-amber-500/20",
  },
  perplexity: {
    label: "Perplexity",
    short: "PPLX",
    color: "#38bdf8",
    highlight: "bg-sky-500/12 text-sky-300 border-sky-500/20",
  },
  "google-ai": {
    label: "Google AI Mode",
    short: "G-AI",
    color: "#8b5cf6",
    highlight: "bg-violet-500/12 text-violet-300 border-violet-500/20",
  },
};

export const promptRecords: PromptRecord[] = [
  {
    id: "p1",
    prompt: "best AI automation agency for retail brands",
    category: "Retail",
    intent: "Commercial",
    priority: "High",
    citationRate: 41,
    mentionRate: 68,
    ownedPage: "/retail-ai-agents",
    bestCompetitor: "kore.ai",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 6, cited: true, movement: 3, mention: "Present" },
      claude: { rank: 7, cited: true, movement: 2, mention: "Present" },
      perplexity: { rank: 4, cited: true, movement: 4, mention: "Strong" },
      "google-ai": { rank: 8, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p2",
    prompt: "agency to deploy AI agents for inbound and lead recovery",
    category: "AEO",
    intent: "Commercial",
    priority: "High",
    citationRate: 58,
    mentionRate: 79,
    ownedPage: "/inbound-ai-handler",
    bestCompetitor: "yellow.ai",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 3, cited: true, movement: 2, mention: "Strong" },
      claude: { rank: 5, cited: true, movement: 1, mention: "Present" },
      perplexity: { rank: 4, cited: true, movement: 2, mention: "Strong" },
      "google-ai": { rank: 7, cited: false, movement: 2, mention: "Weak" },
    },
  },
  {
    id: "p3",
    prompt: "AI operating system for D2C brands",
    category: "D2C",
    intent: "Commercial",
    priority: "High",
    citationRate: 37,
    mentionRate: 64,
    ownedPage: "/d2c-ai-operating-system",
    bestCompetitor: "manychat.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 5, cited: true, movement: 4, mention: "Strong" },
      claude: { rank: 8, cited: false, movement: 2, mention: "Weak" },
      perplexity: { rank: 6, cited: true, movement: 3, mention: "Present" },
      "google-ai": { rank: 9, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p4",
    prompt: "how to revive churned customers with AI agents",
    category: "Retail",
    intent: "Informational",
    priority: "High",
    citationRate: 63,
    mentionRate: 83,
    ownedPage: "/lead-revival-ai-agents",
    bestCompetitor: "intercom.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 2, cited: true, movement: 5, mention: "Strong" },
      claude: { rank: 3, cited: true, movement: 4, mention: "Strong" },
      perplexity: { rank: 2, cited: true, movement: 4, mention: "Strong" },
      "google-ai": { rank: 5, cited: true, movement: 2, mention: "Present" },
    },
  },
  {
    id: "p5",
    prompt: "best AI inbound handler for ecommerce brands",
    category: "Ecommerce",
    intent: "Commercial",
    priority: "High",
    citationRate: 46,
    mentionRate: 70,
    ownedPage: "/inbound-ai-handler",
    bestCompetitor: "gupshup.io",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 4, cited: true, movement: 3, mention: "Strong" },
      claude: { rank: 6, cited: true, movement: 2, mention: "Present" },
      perplexity: { rank: 5, cited: true, movement: 3, mention: "Present" },
      "google-ai": { rank: 8, cited: false, movement: 2, mention: "Weak" },
    },
  },
  {
    id: "p6",
    prompt: "Effect3 AI agency",
    category: "AEO",
    intent: "Branded",
    priority: "High",
    citationRate: 94,
    mentionRate: 100,
    ownedPage: "/",
    bestCompetitor: "none",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 1, cited: true, movement: 0, mention: "Strong" },
      claude: { rank: 1, cited: true, movement: 0, mention: "Strong" },
      perplexity: { rank: 1, cited: true, movement: 0, mention: "Strong" },
      "google-ai": { rank: 1, cited: true, movement: 0, mention: "Strong" },
    },
  },
  {
    id: "p7",
    prompt: "best answer engine optimization agency",
    category: "AEO",
    intent: "Commercial",
    priority: "High",
    citationRate: 34,
    mentionRate: 56,
    ownedPage: "/aeo-geo-agency",
    bestCompetitor: "scrunchai.com",
    sentiment: "Mixed",
    engines: {
      chatgpt: { rank: 7, cited: true, movement: 2, mention: "Present" },
      claude: { rank: 9, cited: false, movement: 1, mention: "Weak" },
      perplexity: { rank: 5, cited: true, movement: 3, mention: "Present" },
      "google-ai": { rank: 10, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p8",
    prompt: "best AI system for law firm lead intake",
    category: "Law Firms",
    intent: "Commercial",
    priority: "Medium",
    citationRate: 28,
    mentionRate: 47,
    ownedPage: "/law-firm-ai-implementation",
    bestCompetitor: "ada.cx",
    sentiment: "Neutral",
    engines: {
      chatgpt: { rank: 8, cited: false, movement: 1, mention: "Weak" },
      claude: { rank: 6, cited: true, movement: 3, mention: "Present" },
      perplexity: { rank: 7, cited: true, movement: 2, mention: "Present" },
      "google-ai": { rank: 11, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p9",
    prompt: "AI voice agent for retail conversions",
    category: "Retail",
    intent: "Commercial",
    priority: "Medium",
    citationRate: 31,
    mentionRate: 52,
    ownedPage: "/ai-call-agent",
    bestCompetitor: "cognigy.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 6, cited: true, movement: 2, mention: "Present" },
      claude: { rank: 7, cited: false, movement: 2, mention: "Weak" },
      perplexity: { rank: 5, cited: true, movement: 2, mention: "Present" },
      "google-ai": { rank: 9, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p10",
    prompt: "best AI agency for SaaS conversion systems",
    category: "SaaS",
    intent: "Commercial",
    priority: "High",
    citationRate: 33,
    mentionRate: 61,
    ownedPage: "/saas-ai-conversion-system",
    bestCompetitor: "moveworks.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 5, cited: true, movement: 2, mention: "Present" },
      claude: { rank: 6, cited: true, movement: 2, mention: "Present" },
      perplexity: { rank: 6, cited: false, movement: 1, mention: "Weak" },
      "google-ai": { rank: 8, cited: false, movement: 2, mention: "Weak" },
    },
  },
  {
    id: "p11",
    prompt: "Effect3 vs Manychat",
    category: "AEO",
    intent: "Comparison",
    priority: "High",
    citationRate: 49,
    mentionRate: 75,
    ownedPage: "/effect3-vs-manychat",
    bestCompetitor: "manychat.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 3, cited: true, movement: 3, mention: "Strong" },
      claude: { rank: 4, cited: true, movement: 2, mention: "Strong" },
      perplexity: { rank: 2, cited: true, movement: 3, mention: "Strong" },
      "google-ai": { rank: 6, cited: true, movement: 2, mention: "Present" },
    },
  },
  {
    id: "p12",
    prompt: "best AI automation agency for enterprise operations",
    category: "Enterprise",
    intent: "Commercial",
    priority: "Medium",
    citationRate: 24,
    mentionRate: 43,
    ownedPage: "/enterprise-ai-operations",
    bestCompetitor: "kore.ai",
    sentiment: "Neutral",
    engines: {
      chatgpt: { rank: 9, cited: false, movement: 1, mention: "Weak" },
      claude: { rank: 8, cited: false, movement: 1, mention: "Weak" },
      perplexity: { rank: 7, cited: true, movement: 1, mention: "Present" },
      "google-ai": { rank: 10, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p13",
    prompt: "how to rank on ChatGPT web search",
    category: "AEO",
    intent: "Informational",
    priority: "High",
    citationRate: 39,
    mentionRate: 65,
    ownedPage: "/aeo-geo-agency",
    bestCompetitor: "profound.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 4, cited: true, movement: 4, mention: "Strong" },
      claude: { rank: 7, cited: false, movement: 2, mention: "Weak" },
      perplexity: { rank: 3, cited: true, movement: 4, mention: "Strong" },
      "google-ai": { rank: 7, cited: true, movement: 2, mention: "Present" },
    },
  },
  {
    id: "p14",
    prompt: "AI reactivation system for dead customers",
    category: "Retail",
    intent: "Commercial",
    priority: "High",
    citationRate: 57,
    mentionRate: 81,
    ownedPage: "/lead-revival-ai-agents",
    bestCompetitor: "intercom.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 2, cited: true, movement: 3, mention: "Strong" },
      claude: { rank: 4, cited: true, movement: 3, mention: "Strong" },
      perplexity: { rank: 2, cited: true, movement: 2, mention: "Strong" },
      "google-ai": { rank: 4, cited: true, movement: 2, mention: "Present" },
    },
  },
  {
    id: "p15",
    prompt: "best AI dashboard for prompt ranking across LLMs",
    category: "AEO",
    intent: "Commercial",
    priority: "Medium",
    citationRate: 21,
    mentionRate: 39,
    ownedPage: "/aeo-dashboard",
    bestCompetitor: "promptingco.com",
    sentiment: "Neutral",
    engines: {
      chatgpt: { rank: 10, cited: false, movement: 1, mention: "Weak" },
      claude: { rank: 8, cited: false, movement: 2, mention: "Weak" },
      perplexity: { rank: 7, cited: false, movement: 2, mention: "Weak" },
      "google-ai": { rank: 11, cited: false, movement: 1, mention: "Weak" },
    },
  },
  {
    id: "p16",
    prompt: "best AI inbound system for D2C brands",
    category: "D2C",
    intent: "Commercial",
    priority: "High",
    citationRate: 36,
    mentionRate: 62,
    ownedPage: "/inbound-ai-handler",
    bestCompetitor: "manychat.com",
    sentiment: "Positive",
    engines: {
      chatgpt: { rank: 5, cited: true, movement: 3, mention: "Present" },
      claude: { rank: 6, cited: true, movement: 3, mention: "Present" },
      perplexity: { rank: 4, cited: true, movement: 3, mention: "Strong" },
      "google-ai": { rank: 8, cited: false, movement: 2, mention: "Weak" },
    },
  },
];

export const trendData: TrendPoint[] = [
  { date: "Feb 08", chatgpt: 31, claude: 24, perplexity: 28, "google-ai": 19 },
  { date: "Feb 12", chatgpt: 34, claude: 25, perplexity: 30, "google-ai": 21 },
  { date: "Feb 16", chatgpt: 36, claude: 27, perplexity: 33, "google-ai": 23 },
  { date: "Feb 20", chatgpt: 39, claude: 29, perplexity: 35, "google-ai": 24 },
  { date: "Feb 24", chatgpt: 43, claude: 32, perplexity: 38, "google-ai": 26 },
  { date: "Feb 28", chatgpt: 47, claude: 36, perplexity: 42, "google-ai": 28 },
  { date: "Mar 02", chatgpt: 49, claude: 38, perplexity: 44, "google-ai": 29 },
  { date: "Mar 04", chatgpt: 52, claude: 40, perplexity: 46, "google-ai": 31 },
  { date: "Mar 06", chatgpt: 54, claude: 42, perplexity: 49, "google-ai": 33 },
  { date: "Mar 08", chatgpt: 57, claude: 45, perplexity: 51, "google-ai": 36 },
];

export const industryRanking = [
  { name: "Effect3", score: 34.8, change: 5.2, pinned: true },
  { name: "Kore.ai", score: 22.6, change: -0.7, pinned: false },
  { name: "Yellow.ai", score: 15.9, change: 1.4, pinned: false },
  { name: "Manychat", score: 11.2, change: -0.4, pinned: false },
  { name: "Botpress", score: 7.1, change: 0.8, pinned: false },
  { name: "Ada", score: 5.4, change: 0.2, pinned: false },
];

export const topPages = [
  { page: "/", citations: 42, promptWins: 18, engine: "ChatGPT" },
  { page: "/lead-revival-ai", citations: 31, promptWins: 14, engine: "Perplexity" },
  { page: "/ai-inbound-automation", citations: 25, promptWins: 10, engine: "Claude" },
  { page: "/aeo-agency", citations: 19, promptWins: 8, engine: "ChatGPT" },
  { page: "/effect3-vs-manychat", citations: 15, promptWins: 6, engine: "Perplexity" },
];

export const topBots = [
  { bot: "OAI-SearchBot", visits: 84, change: 18, group: "OpenAI" },
  { bot: "Claude-SearchBot", visits: 52, change: 11, group: "Anthropic" },
  { bot: "PerplexityBot", visits: 47, change: 9, group: "Perplexity" },
  { bot: "Google-Extended", visits: 31, change: 6, group: "Google" },
  { bot: "GPTBot", visits: 28, change: 3, group: "OpenAI" },
];

export const actionItems = [
  {
    title: "Ship /ai-search-monitoring page",
    impact: "High",
    reason: "Monitoring-intent buyers need a dedicated page that connects ranking work to reporting, crawl health, and inquiry visibility.",
  },
  {
    title: "Ship /llm-rank-tracking page",
    impact: "High",
    reason: "Rank-tracking language is commercially valuable and gives the site a tighter surface for measurement-driven LLM visibility queries.",
  },
  {
    title: "Launch /geo-audit page",
    impact: "Medium",
    reason: "Audit-intent searchers are high-fit buyers who often convert into broader GEO and AEO engagements.",
  },
];
