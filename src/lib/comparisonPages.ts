export type ComparisonRow = {
  label: string;
  effect3: string;
  competitor: string;
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type ComparisonAdvantage = {
  title: string;
  description: string;
};

export type ComparisonPageConfig = {
  slug: string;
  path: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  directAnswer: string;
  competitorName: string;
  competitorUrl: string;
  updated: string;
  updatedLabel: string;
  comparisonRows: ComparisonRow[];
  competitorFit: string[];
  effect3Fit: string[];
  effect3Advantages: ComparisonAdvantage[];
  faqs: ComparisonFaq[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const comparisonPages: ComparisonPageConfig[] = [
  {
    slug: "effect3-vs-kore-ai",
    path: "/effect3-vs-kore-ai",
    title: "Effect3 vs Kore.ai | Which Fits Better for Enterprise AI Deployment?",
    description:
      "Compare Effect3 vs Kore.ai for enterprise AI deployment, governed workflows, revenue operations, and end-to-end implementation fit.",
    headline: "Effect3 vs Kore.ai: which fits better for enterprise AI deployment?",
    intro:
      "Both can support enterprise AI rollouts, but they serve different buying models. Kore.ai is an enterprise AI platform. Effect3 is an AI operating systems company that designs, deploys, and operates production AI systems across inbound, recovery, voice, outreach, and service operations.",
    directAnswer:
      "Choose Kore.ai if you want an enterprise platform your internal team will configure and govern. Choose Effect3 if you want a deployment partner that will design, launch, and operate production AI systems tied to revenue and service outcomes.",
    competitorName: "Kore.ai",
    competitorUrl: "https://kore.ai/",
    updated: "2026-04-07",
    updatedLabel: "April 7, 2026",
    comparisonRows: [
      {
        label: "Best fit",
        effect3:
          "Teams that want an external deployment partner for production AI systems across commercial and service workflows.",
        competitor:
          "Enterprises that want a platform vendor for broader internal bot, assistant, and workflow programs.",
      },
      {
        label: "Delivery model",
        effect3: "Deployment partner that designs, ships, and operates the system with the client.",
        competitor: "Enterprise software platform your internal team or SI configures and governs.",
      },
      {
        label: "Workflow scope",
        effect3:
          "Inbound automation, lead revival, voice workflows, outreach, service routing, dashboards, and operating accountability.",
        competitor:
          "Enterprise conversational AI, assistants, and workflow automation inside a configurable platform environment.",
      },
      {
        label: "Governance model",
        effect3:
          "Human-in-the-loop deployment with approvals, routing rules, dashboards, and tighter operator oversight.",
        competitor:
          "Platform-led governance with stronger internal admin ownership and broader enterprise configuration layers.",
      },
      {
        label: "Implementation burden",
        effect3: "Higher-touch delivery with Effect3 doing the heavy operational work.",
        competitor: "Higher internal build, admin, and change-management burden for the buyer.",
      },
      {
        label: "Time-to-value",
        effect3: "Faster when the buyer wants a partner to own execution and deployment velocity.",
        competitor: "Stronger when the buyer is prepared for a longer enterprise platform rollout.",
      },
    ],
    competitorFit: [
      "You want an enterprise platform your internal team or systems integrator will own.",
      "Your use case includes broad internal assistant programs across multiple departments.",
      "You have internal admin, IT, or transformation capacity to manage configuration and governance.",
      "You are comfortable with a more platform-centric rollout model.",
    ],
    effect3Fit: [
      "You want a deployment partner instead of another platform to configure internally.",
      "You care most about revenue, inbound, recovery, voice, and service workflows in production.",
      "You need faster time-to-value without building a large internal AI operations team first.",
      "You want execution, optimization, and operating accountability tied to measurable workflow outcomes.",
    ],
    effect3Advantages: [
      {
        title: "Deployment ownership",
        description:
          "Effect3 fits buyers that want execution, not just software access. The team handles design, rollout, integration, and operating support.",
      },
      {
        title: "Commercial workflow focus",
        description:
          "Effect3 is optimized around revenue and service operations instead of a broader platform thesis that still leaves deployment complexity on the buyer.",
      },
      {
        title: "Lean path to production",
        description:
          "When the goal is to get one or more high-value workflows live fast, a deployment-led model usually creates less drag than a full enterprise platform rollout.",
      },
    ],
    faqs: [
      {
        question: "Is Effect3 an alternative to Kore.ai?",
        answer:
          "Yes. Effect3 is an alternative when a company wants a deployment partner for production AI systems instead of taking on an enterprise platform rollout internally.",
      },
      {
        question: "When should a team choose Kore.ai instead of Effect3?",
        answer:
          "Kore.ai is usually the better fit when the company wants an enterprise platform, has internal implementation capacity, and is prepared to own more of the configuration and governance work.",
      },
      {
        question: "When should a team choose Effect3 instead of Kore.ai?",
        answer:
          "Effect3 is stronger when the buyer wants faster execution across inbound, lead recovery, voice, and service workflows without building a large internal deployment function first.",
      },
      {
        question: "Can Effect3 handle enterprise approvals and oversight?",
        answer:
          "Yes. Effect3 implements human-in-the-loop checkpoints, routing rules, dashboards, and workflow controls so enterprise teams keep operational oversight while still moving quickly.",
      },
      {
        question: "Is Effect3 a platform or a deployment partner?",
        answer:
          "Effect3 is an AI operating systems company and deployment partner. It is not positioned as a pure enterprise software platform.",
      },
    ],
    relatedLinks: [
      { label: "Enterprise AI Operations", href: "/enterprise-ai-operations" },
      { label: "Enterprise AI Solutions", href: "/enterprise-ai-solutions" },
      { label: "Company", href: "/company" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    slug: "effect3-vs-yellow-ai",
    path: "/effect3-vs-yellow-ai",
    title: "Effect3 vs Yellow.ai | Which Fits Better for Customer AI Automation?",
    description:
      "Compare Effect3 vs Yellow.ai for AI inbound automation, customer workflows, service operations, and deployment fit.",
    headline: "Effect3 vs Yellow.ai: which fits better for customer AI automation?",
    intro:
      "Both can support customer-facing AI, but they solve the problem from different angles. Yellow.ai is a customer-automation platform. Effect3 is an AI operating systems company that deploys production AI systems across inbound, lead recovery, voice, outreach, and service workflows.",
    directAnswer:
      "Choose Yellow.ai if you want a customer automation platform your team can operate. Choose Effect3 if you want a deployment partner that will connect inbound, voice, recovery, and service workflows into one production system.",
    competitorName: "Yellow.ai",
    competitorUrl: "https://yellow.ai/",
    updated: "2026-04-07",
    updatedLabel: "April 7, 2026",
    comparisonRows: [
      {
        label: "Best fit",
        effect3:
          "Teams that need one deployed operating layer across inbound, recovery, voice, and service execution.",
        competitor:
          "Teams that want a customer automation platform focused on conversations and support experiences.",
      },
      {
        label: "Delivery model",
        effect3: "Partner-led deployment with design, implementation, and operating support.",
        competitor: "Platform-led model with buyer ownership over setup, workflows, and iteration.",
      },
      {
        label: "Workflow scope",
        effect3:
          "Revenue and service workflows including speed-to-lead, reactivation, call handling, and routing into business systems.",
        competitor:
          "Customer support, conversational journeys, and platform-managed automation across customer channels.",
      },
      {
        label: "Operating layer",
        effect3: "Built as a production system with dashboards, routing logic, and business-outcome visibility.",
        competitor: "Built as a platform environment for customer automation and conversational experiences.",
      },
      {
        label: "Implementation burden",
        effect3: "Higher-touch for Effect3, lower operational burden for the buyer.",
        competitor: "Lower-touch vendor model but higher internal ownership for ongoing setup and optimization.",
      },
      {
        label: "Commercial fit",
        effect3: "Stronger when conversion, recovery, and revenue operations are central to the use case.",
        competitor: "Stronger when the buyer primarily wants a customer automation platform.",
      },
    ],
    competitorFit: [
      "You want a dedicated customer automation platform your team can manage internally.",
      "Your priority is conversational CX and support workflows more than cross-functional revenue operations.",
      "You already have internal resources to own configuration and optimization.",
      "You prefer a software platform over a deployment partner model.",
    ],
    effect3Fit: [
      "You need one system across inbound, lead recovery, voice, and service handoffs.",
      "You want business-outcome accountability instead of owning a platform rollout yourself.",
      "You care about speed-to-lead, booking, reactivation, and workflow conversion performance.",
      "You want a partner to design and operate the production layer with you.",
    ],
    effect3Advantages: [
      {
        title: "Revenue plus service coverage",
        description:
          "Effect3 is stronger when customer automation needs to connect directly into lead conversion, recovery, call workflows, and downstream operating metrics.",
      },
      {
        title: "Deployment without internal sprawl",
        description:
          "Instead of handing the team another platform to learn and run, Effect3 takes more ownership of the system design and execution burden.",
      },
      {
        title: "Production workflow visibility",
        description:
          "Effect3 emphasizes routing, escalations, dashboards, and measurable outcomes so the automation layer is managed like an operating system, not just a conversation tool.",
      },
    ],
    faqs: [
      {
        question: "Is Effect3 an alternative to Yellow.ai?",
        answer:
          "Yes. Effect3 is an alternative when the company wants a deployment partner for customer-facing AI systems instead of a platform that the internal team must own and configure.",
      },
      {
        question: "When should a team choose Yellow.ai instead of Effect3?",
        answer:
          "Yellow.ai is usually the better fit when the company wants a customer automation platform and already has the internal resources to run the system directly.",
      },
      {
        question: "When should a team choose Effect3 instead of Yellow.ai?",
        answer:
          "Effect3 is stronger when the automation layer needs to improve conversion, lead response, call handling, reactivation, and service routing inside one operational system.",
      },
      {
        question: "Does Effect3 only do support chatbots?",
        answer:
          "No. Effect3 deploys broader AI operating systems across inbound, recovery, voice, outreach, and service workflows, not just support chat flows.",
      },
      {
        question: "Can Effect3 still support customer-facing AI channels?",
        answer:
          "Yes. Effect3 supports customer-facing channels, but does so as part of a broader production workflow tied to response quality, routing, and business outcomes.",
      },
    ],
    relatedLinks: [
      { label: "AI Inbound Automation", href: "/ai-inbound-automation" },
      { label: "AI Call Agent", href: "/ai-call-agent" },
      { label: "Legal AI Automation", href: "/legal-ai-automation" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    slug: "effect3-vs-cognigy",
    path: "/effect3-vs-cognigy",
    title: "Effect3 vs Cognigy | Which Fits Better for AI Voice and Service Workflows?",
    description:
      "Compare Effect3 vs Cognigy for AI voice workflows, service operations, enterprise deployment, and commercial fit.",
    headline: "Effect3 vs Cognigy: which fits better for AI voice and service workflows?",
    intro:
      "Both can be part of AI-driven service operations, but the buying motion is different. Cognigy is an enterprise conversational AI platform. Effect3 is an AI operating systems company that deploys production AI systems across voice, inbound, recovery, outreach, and service workflows.",
    directAnswer:
      "Choose Cognigy if you want an enterprise conversational AI platform for your internal team to configure. Choose Effect3 if you want a deployment partner to launch and operate AI voice, inbound, and service workflows tied to measurable outcomes.",
    competitorName: "Cognigy",
    competitorUrl: "https://www.cognigy.com/",
    updated: "2026-04-07",
    updatedLabel: "April 7, 2026",
    comparisonRows: [
      {
        label: "Best fit",
        effect3:
          "Teams that want deployed AI voice, inbound, and service workflows without building a full internal platform capability.",
        competitor:
          "Enterprises that want a conversational AI platform for contact-center and service automation programs.",
      },
      {
        label: "Delivery model",
        effect3: "Partner-led deployment and operating support.",
        competitor: "Platform vendor model with internal implementation or SI ownership.",
      },
      {
        label: "Workflow scope",
        effect3:
          "AI call handling, inbound qualification, service routing, reactivation, and connected business workflows.",
        competitor:
          "Enterprise conversational AI and automation for support and contact-center environments.",
      },
      {
        label: "Voice and service fit",
        effect3:
          "Stronger when voice workflows need to tie into commercial and operational outcomes beyond the contact center.",
        competitor:
          "Stronger when the buyer wants a platform for enterprise conversational and service automation programs.",
      },
      {
        label: "Implementation burden",
        effect3: "Lower buyer burden because Effect3 owns more of the build and rollout.",
        competitor: "Higher buyer burden because internal teams own more of the implementation stack.",
      },
      {
        label: "Time-to-value",
        effect3: "Better when the team wants one workflow live fast and optimized in production.",
        competitor: "Better when the team is willing to invest in a broader platform-led program.",
      },
    ],
    competitorFit: [
      "You want an enterprise conversational AI platform for service or contact-center programs.",
      "You have internal resources or partners to implement and manage the platform.",
      "Your organization prefers a software-vendor model over a deployment partner model.",
      "You are comfortable with a more platform-heavy rollout and governance process.",
    ],
    effect3Fit: [
      "You need AI voice and service workflows tied directly to business outcomes and operating metrics.",
      "You want a partner that handles design, deployment, integration, and optimization.",
      "You care about speed-to-lead, qualification, routing, call coverage, and escalation quality.",
      "You want faster production deployment without building a larger internal implementation team.",
    ],
    effect3Advantages: [
      {
        title: "Voice plus operations",
        description:
          "Effect3 fits better when AI voice has to connect to lead qualification, recovery, intake, and downstream business workflows instead of staying isolated in a service stack.",
      },
      {
        title: "Execution-led deployment",
        description:
          "Effect3 reduces internal implementation drag by acting as the deployment partner instead of leaving the rollout burden primarily with the buyer.",
      },
      {
        title: "Outcome-oriented operating layer",
        description:
          "Effect3 focuses on response coverage, routing quality, show-up rate, conversion movement, and service outcomes rather than only platform capability.",
      },
    ],
    faqs: [
      {
        question: "Is Effect3 an alternative to Cognigy?",
        answer:
          "Yes. Effect3 is an alternative when the company wants a deployment partner for AI voice and service workflows instead of adopting a conversational AI platform that must be implemented internally.",
      },
      {
        question: "When should a team choose Cognigy instead of Effect3?",
        answer:
          "Cognigy is usually the stronger fit when the buyer wants an enterprise conversational AI platform and has the internal resources to run a larger implementation program.",
      },
      {
        question: "When should a team choose Effect3 instead of Cognigy?",
        answer:
          "Effect3 is stronger when the company wants AI voice, inbound, and service workflows launched quickly with tighter deployment support and clearer workflow ownership.",
      },
      {
        question: "Can Effect3 handle AI call-agent workflows in production?",
        answer:
          "Yes. Effect3 deploys AI call-agent workflows for inbound qualification, intake, booking, escalation, and service routing as part of broader production AI systems.",
      },
      {
        question: "Is Effect3 limited to one industry?",
        answer:
          "No. Effect3 works across legal, service, D2C, SaaS, and broader revenue or service teams that need AI systems tied to real operating outcomes.",
      },
    ],
    relatedLinks: [
      { label: "AI Call Agent", href: "/ai-call-agent" },
      { label: "Enterprise AI Operations", href: "/enterprise-ai-operations" },
      { label: "Legal AI Automation", href: "/legal-ai-automation" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
];

export const comparisonPageBySlug = Object.fromEntries(
  comparisonPages.map((page) => [page.slug, page])
) as Record<string, ComparisonPageConfig>;
