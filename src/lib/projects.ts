import amazonOutreachImg from "@/assets/case-studies/optimized/amazon-outreach.jpg";
import aiHrInterviewImg from "@/assets/case-studies/optimized/ai-hr-interview.jpg";
import ppcTrackingImg from "@/assets/case-studies/optimized/ppc-tracking.jpg";
import ecommercePortalImg from "@/assets/case-studies/optimized/ecommerce-portal.jpg";
import buffyValidatorImg from "@/assets/case-studies/optimized/buffy-validator.jpg";
import aiMarketingStudioImg from "@/assets/case-studies/optimized/ai-marketing-studio.jpg";
import effect3InboundDashboardImg from "@/assets/case-studies/effect3-inbound-dashboard.svg";
import aiCallAgentImg from "@/assets/agents/ai-call-agent.png";
import effect3NubisSystemVideo from "@/assets/case-studies/effect3-nubis-system.mp4";
import {
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
  siteMeta,
  toAbsoluteUrl,
} from "@/lib/seo";

export type Project = {
  slug: string;
  title: string;
  tag: string;
  cardDescription: string;
  image: string;
  metric: string;
  metricLabel: string;
  category: string;
  client: string;
  purpose: string;
  headline: string;
  summary: string;
  problem: string;
  solution: string;
  finalOutput: string;
  impactLabel: string;
  impactValue: string;
  timeline: string;
  team: string;
  stack: string[];
  challengePoints: string[];
  shipped: string[];
  outcomes: string[];
  previewUrl?: string;
  previewLabel?: string;
  videoSrc?: string;
};

export const caseStudiesPath = "/case-studies";

export const deployedProjectCount = "47+";
const featuredProjectOrder = [
  "nubis-restaurant-call-agent-system",
  "effect3-inbound-outbound-dashboard",
  "buffy-business-validator",
  "effect3-ai-marketing-studio",
  "avatar-project",
  "repricing-monitoring-dashboard",
  "ppc-tracking-dashboard",
  "email-outreach-dashboard",
];

export const projects: Project[] = [
  {
    slug: "effect3-inbound-outbound-dashboard",
    title: "Effect3 Inbound & Outbound Dashboard  -  One Command Center for Campaigns, Leads, and Voice Agents",
    tag: "Effect3 Dashboard",
    cardDescription:
      "Unified lead analysis, campaign launch, voice-agent monitoring, and churn recovery controls inside one premium operating layer.",
    image: effect3InboundDashboardImg,
    metric: "47+",
    metricLabel: "Projects Deployed",
    category: "Revenue Operations",
    client: "Effect3 Internal Ops",
    purpose:
      "Create one internal operating layer where the team can review churn sentiment, segment leads, launch campaigns, and keep inbound and outbound execution in sync.",
    headline:
      "A single operations dashboard built to run the full lead lifecycle from segmentation to recovery.",
    summary:
      "This dashboard gives Effect3 one place to manage campaign execution, lead analysis, voice-agent routing, and recovery workflows without hopping across disconnected tools.",
    problem:
      "Lead recovery, outbound work, and campaign control were spread across different interfaces, which slowed execution and made it harder to understand which accounts needed attention first.",
    solution:
      "Effect3 designed a cleaner command center with segmented lead views, campaign actions, and operating visibility so teams could move faster from analysis to action.",
    finalOutput:
      "A polished internal dashboard that centralizes lead segmentation, campaign creation, channel tracking, and voice-agent operations in one place.",
    impactLabel: "Operational visibility",
    impactValue: "One command center for inbound and outbound execution",
    timeline: "3-week dashboard sprint",
    team: "Effect3 product design, dashboard engineering, and workflow systems",
    stack: ["Operations dashboard", "Lead segmentation", "Campaign controls", "Voice-agent monitoring"],
    challengePoints: [
      "The interface needed to feel powerful without becoming crowded.",
      "Inbound and outbound signals had to stay connected in one workflow view.",
      "The system needed to make next actions obvious for operators, not just display analytics.",
    ],
    shipped: [
      "Lead segmentation layer with churn and sentiment filters",
      "Campaign launch controls inside the same operating surface",
      "Navigation for campaigns, voice agents, reports, and settings",
      "Structured layout that makes recovery opportunities easier to spot",
    ],
    outcomes: [
      "Teams can review lead quality and launch action from the same screen.",
      "Operational context is clearer, so follow-up speed improves.",
      "The dashboard feels like a productized internal system rather than a stitched-together admin panel.",
    ],
    previewUrl: "https://ai.studio/apps/333e70bd-860c-4b60-a59d-77c27065ae7d?fullscreenApplet=true",
    previewLabel: "Open Live Dashboard",
  },
  {
    slug: "buffy-business-validator",
    title: "Buffy Business Validator  -  AI Agent That Stress-Tests Startup Ideas Like a VC",
    tag: "Buffy Validator",
    cardDescription:
      "Founder-facing AI validator that pressure-tests startup ideas before time, budget, and investor momentum get wasted.",
    image: buffyValidatorImg,
    metric: "500+",
    metricLabel: "Ideas Validated",
    category: "AI Validation",
    client: "Buffy",
    purpose:
      "Turn vague startup concepts into structured go or no-go decisions before founders commit resources to the wrong direction.",
    headline:
      "A founder-facing AI reviewer that thinks like a tough early-stage operator, not a generic chatbot.",
    summary:
      "Buffy gives founders a direct pressure test on market demand, positioning, monetization, and investor readiness in one guided AI workflow.",
    problem:
      "Most founders validate ideas with scattered notes, random GPT chats, and biased feedback from friends. That produces false confidence and weak execution decisions.",
    solution:
      "Effect3 designed an AI validation agent that forces each idea through market scrutiny, monetization checks, positioning pressure, and investor-style objections before the founder commits.",
    finalOutput:
      "A live AI product that guides founders through structured validation, produces a clear decision narrative, and surfaces the exact risks they need to solve next.",
    impactLabel: "Validation throughput",
    impactValue: "500+ ideas reviewed",
    timeline: "3-week product sprint",
    team: "Effect3 product, prompt, and workflow engineering",
    stack: ["AI workflow orchestration", "Prompt architecture", "Decision logic", "Founder UX"],
    challengePoints: [
      "Generic AI outputs were too soft and too polite for real founder decisions.",
      "The system needed to feel credible without becoming academic or slow.",
      "Each validation had to translate into a clear next move, not just feedback.",
    ],
    shipped: [
      "Idea scoring framework with weighted pressure tests",
      "Founder flow for market, offer, GTM, and defensibility review",
      "VC-style response format with risk callouts and next-step actions",
      "Cleaner product copy and decision-oriented output design",
    ],
    outcomes: [
      "Founders get a faster decision loop before spending time on execution.",
      "Validation outputs are sharper, clearer, and more operational.",
      "The tool feels like a productized advisor, not a novelty AI demo.",
    ],
    previewUrl: "/case-studies/buffy-business-validator#project-demo",
    previewLabel: "Preview Buffy",
  },
  {
    slug: "nubis-restaurant-call-agent-system",
    title: "Nubis Restaurant Call Agent System  -  AI Voice Layer for Restaurant Orders, Queries, and Reservations",
    tag: "Restaurant Call Agent",
    cardDescription:
      "Built in collaboration with Nubis System, this voice workflow handles restaurant calls, captures customer intent, and routes conversations cleanly without missed demand.",
    image: aiCallAgentImg,
    metric: "24/7",
    metricLabel: "Voice Coverage",
    category: "AI Voice Operations",
    client: "Nubis System x Effect3",
    purpose:
      "Deploy a restaurant-ready call agent that can answer inbound calls, handle common customer requests, and reduce the number of missed orders, reservation calls, and repetitive front-desk interruptions.",
    headline:
      "A restaurant call system built with Nubis System to keep every inbound customer conversation handled, routed, and documented.",
    summary:
      "Effect3 collaborated with Nubis System to build a complete restaurant call-agent workflow that answers calls, guides customer requests, and gives operators a more reliable voice layer during busy hours.",
    problem:
      "Restaurants lose demand when staff miss calls during rush periods or spend too much time answering repetitive questions instead of serving in-store customers. Manual call handling creates drop-off, slower response times, and inconsistent customer experience.",
    solution:
      "We built a full AI voice workflow for restaurant use cases, including inbound call handling, guided question flows, and a cleaner operational layer for managing customer intent across calls.",
    finalOutput:
      "A complete restaurant call-agent system, built by Effect3 in collaboration with Nubis System, with a full working demo showing how the voice layer handles customer conversations end to end.",
    impactLabel: "Call coverage",
    impactValue: "Restaurant calls handled with a dedicated AI voice layer",
    timeline: "End-to-end system collaboration",
    team: "Effect3 voice workflow systems with Nubis System collaboration",
    stack: ["AI voice orchestration", "Restaurant call flows", "Intent routing", "Conversation handling"],
    challengePoints: [
      "Restaurant callers expect quick, natural responses with very little tolerance for friction.",
      "The system had to support real request patterns like reservations, timing questions, and order-related calls.",
      "The workflow needed to feel complete enough to present as a real operating system, not a thin demo.",
    ],
    shipped: [
      "Full AI call-agent workflow for restaurant scenarios",
      "Voice interaction design for common dining and order intents",
      "Operational conversation flow from first answer to final routing",
      "Recorded product demo showing the system in action",
    ],
    outcomes: [
      "The project demonstrates how restaurants can keep inbound demand covered beyond human availability.",
      "The collaboration shows a complete voice system rather than a partial prototype.",
      "The demo makes the value of the AI call layer easier for clients to understand immediately.",
    ],
    videoSrc: effect3NubisSystemVideo,
  },
  {
    slug: "effect3-ai-marketing-studio",
    title: "AI Marketing Studio  -  GTM-Ready Content Production in 48 Hours",
    tag: "AI Marketing Studio",
    cardDescription:
      "AI-powered GTM studio that turns one brief into campaign-ready messaging, scripts, and content deliverables in 48 hours.",
    image: aiMarketingStudioImg,
    metric: "48hrs",
    metricLabel: "Delivery Time",
    category: "AI Marketing Ops",
    client: "Effect3 GTM Studio",
    purpose:
      "Compress a traditional content production cycle into an operating system that can ship angles, scripts, briefs, and execution-ready assets in 48 hours.",
    headline:
      "A GTM-ready content engine built to replace slow agency handoffs with structured AI production.",
    summary:
      "This system turns one strategic brief into a full output stack: messaging angles, campaign directions, content assets, and execution notes for fast-moving growth teams.",
    problem:
      "Content teams were losing time across research, hooks, scripting, QA, and revision loops. Delivery speed was too slow for high-tempo campaign cycles.",
    solution:
      "Effect3 built an AI marketing studio workflow that standardizes campaign intake, generates channel-ready outputs, and keeps all content aligned to the same GTM thesis.",
    finalOutput:
      "A repeatable content operating system that delivers agency-quality drafts, campaign structure, and review-ready assets within 48 hours.",
    impactLabel: "Production speed",
    impactValue: "48-hour turnaround",
    timeline: "2-week operating system build",
    team: "Effect3 strategy, content systems, and automation engineering",
    stack: ["Campaign briefs", "Prompt systems", "Content routing", "QA workflows"],
    challengePoints: [
      "Fast content usually breaks consistency and strategic quality.",
      "Different formats required different logic without creating manual bottlenecks.",
      "The workflow needed to feel premium, not mass-produced.",
    ],
    shipped: [
      "Structured brief intake for campaign context and objectives",
      "Angle generation workflows for ads, email, and landing page copy",
      "Internal QA and refinement loops before final delivery",
      "A simple service wrapper so brands can buy output without managing production",
    ],
    outcomes: [
      "Content turnaround dropped from weeks to days.",
      "Messaging quality stayed aligned to GTM strategy.",
      "The studio became a productized offer rather than a manual service chain.",
    ],
    previewUrl: "/gtm/",
    previewLabel: "Open Marketing Studio",
  },
  {
    slug: "avatar-project",
    title: "Avatar Project  -  Interactive AI Experience for Real-Time Guided Conversations",
    tag: "Avatar Experience",
    cardDescription:
      "Conversational avatar experience that lets visitors explore a live AI interaction instead of reading a static product demo.",
    image: aiHrInterviewImg,
    metric: "24/7",
    metricLabel: "Interactive Access",
    category: "Conversational AI",
    client: "Private Demo System",
    purpose:
      "Give visitors a more human AI entry point that can guide, explain, and respond in real time without sending them through a passive page.",
    headline:
      "A live avatar-driven experience built to make AI demos feel immediate and memorable.",
    summary:
      "Effect3 deployed an avatar-led AI interaction layer that turns curiosity into live engagement through guided conversation and real-time responses.",
    problem:
      "Static demos lose attention quickly. Visitors understand more when they can interact, but building that interaction in a polished way is usually slow and fragmented.",
    solution:
      "We combined conversational logic, prompt control, and a more immersive front-end wrapper so the avatar could act like a guided demo experience rather than a loose experiment.",
    finalOutput:
      "A live avatar experience that demonstrates AI capability in a way users can test directly, with cleaner flow and stronger first impressions.",
    impactLabel: "Experience design",
    impactValue: "Live avatar interaction deployed",
    timeline: "2-week experiential build",
    team: "Effect3 conversational systems and experience design",
    stack: ["Avatar UI", "Conversation flows", "Prompt orchestration", "Demo interaction design"],
    challengePoints: [
      "The experience needed to feel polished rather than gimmicky.",
      "Conversation flow had to stay guided without feeling rigid.",
      "The system had to demonstrate capability quickly for first-time visitors.",
    ],
    shipped: [
      "Avatar-led conversation flow",
      "Guided demo prompts and interaction design",
      "Cleaner conversation framing for visitors",
      "Live public preview for direct testing",
    ],
    outcomes: [
      "Visitors can test the AI experience directly instead of reading about it.",
      "The demo feels more premium and memorable.",
      "The project turns passive interest into active exploration.",
    ],
    previewUrl: "https://bey.chat/674403e4-9f68-4b9b-aa3a-7c740e5ac789",
    previewLabel: "Open Avatar Demo",
  },
  {
    slug: "repricing-monitoring-dashboard",
    title: "Repricing Monitoring Dashboard  -  Live Pricing Signals, Margin Watch, and Competitor Tracking",
    tag: "Pricing Monitor",
    cardDescription:
      "Pricing intelligence dashboard that tracks repricing movement, margin pressure, and SKU-level decision signals in one view.",
    image: ecommercePortalImg,
    metric: "Live",
    metricLabel: "Price Signal Tracking",
    category: "Pricing Analytics",
    client: "Private Commerce Team",
    purpose:
      "Give pricing operators a single surface for monitoring competitor movement, margin pressure, and repricing opportunities before performance slips.",
    headline:
      "A faster pricing command layer built for teams that need live visibility instead of delayed reports.",
    summary:
      "This repricing dashboard turns competitor changes and pricing pressure into a cleaner operating view so commercial teams can react faster and protect margin.",
    problem:
      "Pricing teams often work from delayed exports and fragmented views, which makes it hard to catch harmful price movement before it affects margin or conversion.",
    solution:
      "Effect3 designed a tighter dashboard that surfaces pricing movement, monitoring signals, and action-ready views so the team can respond with less lag.",
    finalOutput:
      "A live monitoring dashboard that helps teams understand pricing shifts, margin exposure, and where intervention is needed next.",
    impactLabel: "Pricing visibility",
    impactValue: "Live repricing oversight",
    timeline: "2-week analytics build",
    team: "Effect3 commerce analytics and dashboard engineering",
    stack: ["Pricing dashboards", "Signal monitoring", "Commerce analytics", "Decision views"],
    challengePoints: [
      "The dashboard needed to feel useful immediately for operators.",
      "Signals had to be clear enough to support action, not just observation.",
      "Pricing workflows required speed without sacrificing clarity.",
    ],
    shipped: [
      "Live repricing monitoring layout",
      "Pricing and margin signal views",
      "Cleaner dashboard hierarchy for operators",
      "Direct public preview for fast review",
    ],
    outcomes: [
      "Operators can catch pricing pressure earlier.",
      "Monitoring becomes faster and easier to interpret.",
      "The dashboard reduces delay between signal and action.",
    ],
    previewUrl: "https://ai.studio/apps/064bae7c-73f9-4a48-b5fe-315592f8c256?fullscreenApplet=true",
    previewLabel: "Open Live Dashboard",
  },
  {
    slug: "ppc-tracking-dashboard",
    title: "PPC Tracking Dashboard  -  Campaign Visibility, Budget Control, and ROAS Signals in One View",
    tag: "PPC Tracking",
    cardDescription:
      "Real-time campaign reporting layer built to make spend quality, performance swings, and optimization actions easier to see.",
    image: ppcTrackingImg,
    metric: "4.11x",
    metricLabel: "ROAS Achieved",
    category: "Performance Analytics",
    client: "Performance Media Team",
    purpose:
      "Give operators one command center for campaign spend, ROAS, and optimization signals so budget decisions stop relying on fragmented spreadsheets.",
    headline:
      "A cleaner media command center built to show what to scale, pause, and fix in real time.",
    summary:
      "This dashboard unifies paid campaign metrics into one operating layer so the team can spot waste faster and push spend into winners with more confidence.",
    problem:
      "Campaign data was fragmented across platforms and reporting exports. That delayed decisions, obscured waste, and made it harder to scale winning ad sets quickly.",
    solution:
      "Effect3 built a live PPC tracking dashboard with signal-driven views for ROAS, spend quality, and underperforming segments so action could happen faster.",
    finalOutput:
      "A single reporting environment that helps the team improve ROAS, monitor waste, and make budget moves with more confidence.",
    impactLabel: "ROAS improvement",
    impactValue: "4.11x campaign ROAS",
    timeline: "2-week dashboard build",
    team: "Effect3 reporting, data, and automation engineering",
    stack: ["Campaign reporting", "Dashboard design", "Performance alerts", "Attribution views"],
    challengePoints: [
      "Operators needed clarity fast, not a bloated BI interface.",
      "The system had to unify data without introducing lag or manual cleanup.",
      "Insights needed to point directly to action, not just display numbers.",
    ],
    shipped: [
      "Cross-channel campaign reporting views",
      "ROAS and spend efficiency monitoring",
      "Performance flags for underperforming campaigns",
      "Action-friendly layout for daily budget decisions",
    ],
    outcomes: [
      "The team could identify weak spend earlier.",
      "Optimization cycles shortened significantly.",
      "Campaign decisions became cleaner and less reactive.",
    ],
    previewUrl: "https://ai.studio/apps/drive/1sORpj9EGOkBu_uvSOebTlQft48hhQUQj?fullscreenApplet=true",
    previewLabel: "Open PPC Dashboard",
  },
  {
    slug: "email-outreach-dashboard",
    title: "Email Outreach Dashboard  -  Sequence Control, Reply Health, and Outreach Momentum in One Place",
    tag: "Email Outreach",
    cardDescription:
      "Operational dashboard for outbound email campaigns, sequence monitoring, and reply visibility without hopping between disconnected tools.",
    image: amazonOutreachImg,
    metric: "Live",
    metricLabel: "Campaign Control",
    category: "Outreach Operations",
    client: "Private Growth Team",
    purpose:
      "Centralize email outreach execution so teams can manage sequence activity, response movement, and campaign health from one control layer.",
    headline:
      "A cleaner outreach dashboard built to keep sequence execution visible and manageable at scale.",
    summary:
      "Effect3 built an outreach dashboard that turns campaign progress, reply movement, and operational checks into a cleaner system for outbound teams.",
    problem:
      "Email outreach usually gets spread across sending tools, inboxes, spreadsheets, and internal notes, which makes it hard to see what is working and what needs follow-up.",
    solution:
      "We designed a lighter operating layer for campaign monitoring, sequence visibility, and reply tracking so the team can manage outreach with less friction.",
    finalOutput:
      "A live email outreach dashboard that gives the team one place to inspect campaign status, monitor response health, and keep outbound execution organized.",
    impactLabel: "Outreach visibility",
    impactValue: "One dashboard for sequence control",
    timeline: "2-week operations build",
    team: "Effect3 outreach systems and dashboard engineering",
    stack: ["Email operations", "Campaign tracking", "Reply monitoring", "Outreach workflows"],
    challengePoints: [
      "The system needed to stay simple enough for daily use.",
      "Operators needed a quick read on campaign health without digging.",
      "The dashboard had to support action, not just inspection.",
    ],
    shipped: [
      "Email campaign monitoring layer",
      "Reply and sequence visibility views",
      "Simplified control surface for outreach operations",
      "Live external preview for review and testing",
    ],
    outcomes: [
      "Outreach activity is easier to review quickly.",
      "Operators can spot stalled sequences faster.",
      "The dashboard gives outbound work a clearer operational rhythm.",
    ],
    previewUrl: "https://ecomera-email-dashboard.lovable.app/",
    previewLabel: "Open Email Dashboard",
  },
];
projects.sort((a, b) => {
  const aIndex = featuredProjectOrder.indexOf(a.slug);
  const bIndex = featuredProjectOrder.indexOf(b.slug);

  if (aIndex === -1 && bIndex === -1) return 0;
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;

  return aIndex - bIndex;
});

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, Project>;

export const getProjectPath = (slug: string) => `${caseStudiesPath}/${slug}`;

export const projectHubStats = [
  { label: "Published case studies", value: String(projects.length) },
  { label: "Systems deployed", value: deployedProjectCount },
  { label: "Fastest delivery cycle", value: "48 hrs" },
  { label: "Live external previews", value: String(projects.filter((project) => project.previewUrl).length) },
];

export const getProjectsStructuredData = () => [
  {
    "@context": "https://schema.org",
    "@graph": [
      ...getPrimaryEntityGraph(),
      {
        "@type": "CollectionPage",
        "@id": `${siteMeta.url}${caseStudiesPath}/#page`,
        url: `${siteMeta.url}${caseStudiesPath}/`,
        name: "Effect3 Case Studies",
        description:
          "Case studies from Effect3 covering production AI systems for inbound, lead recovery, voice workflows, dashboards, outreach operations, and GTM execution.",
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": schemaIds.organization },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${siteMeta.url}${caseStudiesPath}/#list`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: getCanonicalUrl(getProjectPath(project.slug)),
          name: project.title,
        })),
      },
      getBreadcrumbStructuredData(`${siteMeta.url}${caseStudiesPath}/#breadcrumb`, [
        { name: "Home", item: getCanonicalUrl("/") },
        { name: "Case Studies", item: `${siteMeta.url}${caseStudiesPath}/` },
      ]),
    ],
  },
];

export const getProjectStructuredData = (project: Project) => [
  {
    "@context": "https://schema.org",
    "@graph": [
      ...getPrimaryEntityGraph(),
      {
        "@type": "WebPage",
        "@id": `${getCanonicalUrl(getProjectPath(project.slug))}#page`,
        url: getCanonicalUrl(getProjectPath(project.slug)),
        name: `${project.title} | Effect3 Case Study`,
        description: project.summary,
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": schemaIds.organization },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl(project.image),
        },
        inLanguage: "en",
      },
      {
        "@type": "Article",
        "@id": `${getCanonicalUrl(getProjectPath(project.slug))}#project`,
        name: project.title,
        headline: project.headline,
        description: project.summary,
        mainEntityOfPage: { "@id": `${getCanonicalUrl(getProjectPath(project.slug))}#page` },
        image: [toAbsoluteUrl(project.image)],
        author: { "@id": schemaIds.organization },
        creator: { "@id": schemaIds.organization },
        publisher: { "@id": schemaIds.organization },
        keywords: [project.category, project.client, project.tag, "Effect3 case study", "AI systems case study"],
      },
      getBreadcrumbStructuredData(`${getCanonicalUrl(getProjectPath(project.slug))}#breadcrumb`, [
        { name: "Home", item: getCanonicalUrl("/") },
        { name: "Case Studies", item: getCanonicalUrl(caseStudiesPath) },
        { name: project.title, item: getCanonicalUrl(getProjectPath(project.slug)) },
      ]),
    ],
  },
];
