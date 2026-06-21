export const siteMeta = {
  name: "Effect3",
  siteName: "Effect3",
  url: "https://theeffect3.com",
  defaultTitle: "Effect3 | AI Operating Systems for Revenue and Service Teams",
  defaultDescription:
    "Effect3 designs, deploys, and operates agentic AI systems for inbound, lead recovery, voice, outreach, and GTM workflows across revenue and service teams.",
  defaultOgImage: "https://theeffect3.com/favicon-brand.png",
  email: "ibrahim@theeffect3.com",
  bookingUrl: import.meta.env.VITE_BOOKING_URL?.trim() || "https://cal.com/theeffect.com/30min",
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim() || "",
  alternateNames: ["Effect3 AI", "Effect3 Agency", "Effect3 AI Agency", "Effect3.com"],
  sameAs: [
    "https://x.com/0xiibrahim",
    "https://www.linkedin.com/in/ibm-fullstackmarketer/",
    "https://ie.linkedin.com/company/theeffect3",
  ],
};

export const founderMeta = {
  name: "Ibrahim Nooruddin",
  title: "Founder, Effect3",
  slug: "/founder",
  description:
    "Ibrahim Nooruddin is the founder of Effect3, an AI operating systems company that designs, deploys, and operates agentic AI systems for revenue and service operations.",
  sameAs: [
    "https://www.linkedin.com/in/ibm-fullstackmarketer/",
    "https://x.com/0xiibrahim",
  ],
};

export const contentLastUpdated = "2026-04-08";
export const contentLastUpdatedLabel = "April 8, 2026";

export const schemaIds = {
  organization: `${siteMeta.url}/#organization`,
  website: `${siteMeta.url}/#website`,
  person: `${siteMeta.url}/#founder`,
};

export const normalizePath = (path = "/") => {
  if (!path || path === "/") return "/";

  const [pathname, search = ""] = path.split("?");
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return search ? `${normalizedPath}?${search}` : normalizedPath;
};

export const getCanonicalUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) {
    return path.endsWith("/") || path.includes("?") || path.includes("#") ? path : `${path}/`;
  }

  return `${siteMeta.url}${normalizePath(path)}`;
};

export const toAbsoluteUrl = (value: string) => {
  if (!value) return siteMeta.url;
  if (/^https?:\/\//i.test(value)) return value;

  return new URL(value.startsWith("/") ? value : `/${value}`, `${siteMeta.url}/`).toString();
};

export const coreServices = [
  {
    name: "Lead Reviver",
    serviceType: "AI lead revival and churn recovery",
    description:
      "AI agents that reactivate dead leads and churned customers with personalized outreach based on historical data and customer behavior.",
  },
  {
    name: "Inbound Handler",
    serviceType: "Omnichannel inbound automation",
    description:
      "AI agents that respond to inbound messages across email, WhatsApp, Meta, LinkedIn, and web channels to qualify and convert leads.",
  },
  {
    name: "AI Call Agent",
    serviceType: "AI voice handling and conversion workflows",
    description:
      "AI voice systems that answer calls, handle objections, and route high-intent conversations toward conversion.",
  },
  {
    name: "Content System",
    serviceType: "AI content operations",
    description:
      "Structured AI content workflows for ad creation, campaign execution, and repeatable content output for growth teams.",
  },
  {
    name: "Rerank System",
    serviceType: "Answer Engine Optimization and LLM visibility",
    description:
      "AEO and GEO systems that improve brand visibility across ChatGPT, Claude, Gemini, Perplexity, and search.",
  },
];

export const siteKeywords =
  "AI operating systems, AI operating system, agentic AI systems, AI inbound automation, lead revival AI, churn recovery AI, AI voice agent, AI call workflows, GTM AI systems, enterprise AI solutions, AI automation for D2C brands, legal AI automation, ManyChat replacement, AEO agency, GEO agency, ChatGPT SEO agency, AI SEO agency, LLM visibility agency, Google AI Overviews agency, Effect3, Effect3 AI";

export const homeFaqs = [
  {
    question: "What is Effect3 and what does the company do?",
    answer:
      "Effect3 is an AI operating systems company. We design, deploy, and operate agentic AI systems for inbound, lead recovery, voice, outreach, and GTM workflows across revenue and service teams.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see measurable results within the first 30 days. Our AI agents start engaging your leads immediately after deployment, and conversion metrics typically improve within the first 2 to 4 weeks. Full ROI realization usually happens within 60 days.",
  },
  {
    question: "Do I need any technical knowledge to get started?",
    answer:
      "No. Effect3 handles system design, deployment, integration, and operating support. Your team brings the workflow context, and we build the production layer around it.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer performance-based and retainer models depending on your business size and goals. Every engagement starts with a system review where we assess your workflow and recommend the right deployment scope. There are no long-term lock-in contracts.",
  },
  {
    question: "Will the AI outreach feel robotic to my customers?",
    answer:
      "No. Our AI agents are trained to write with empathy, context-awareness, and personalization. Every message is tailored to the recipient's history, behavior, and preferences  -  making it indistinguishable from a human-written message.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with all major CRMs (HubSpot, Salesforce, Zoho), email platforms, Slack, WhatsApp, and custom APIs. If you use a tool, chances are we can plug right into it without disrupting your existing workflow.",
  },
  {
    question: "Can Effect3 replace ManyChat with AI inbound automation?",
    answer:
      "Yes. Effect3 replaces brittle rule-based ManyChat flows with AI inbound automation across email, WhatsApp, LinkedIn, web chat, and support channels so conversations can qualify, route, and convert with more context.",
  },
  {
    question: "Do you build Claude automations and Claude Code workflows?",
    answer:
      "Yes. We build Claude automation systems, Claude Code workflows, and reusable agent skills for teams that want AI operating systems instead of isolated prompts.",
  },
  {
    question: "Do you work with ecommerce brands, Amazon sellers, and legal firms?",
    answer:
      "Yes. Effect3 deploys ecommerce operating systems for D2C and Amazon-led businesses, plus legal AI automation for law firms that need faster intake, inbound handling, and call workflows.",
  },
  {
    question: "Is Effect3 an agency or a software platform?",
    answer:
      "Effect3 is an AI operating systems company and deployment partner. We design and operate production systems for each client instead of handing over a generic software dashboard or a slide-deck strategy.",
  },
];

export const entityFaqs = [
  {
    question: "What is Effect3?",
    answer:
      "Effect3 is an AI operating systems company. It designs, deploys, and operates agentic AI systems for revenue and service operations.",
  },
  {
    question: "What does Effect3 actually deploy?",
    answer:
      "Effect3 deploys production AI systems for inbound automation, lead revival, churn recovery, AI voice workflows, outreach automation, GTM systems, and the dashboards or operating layers that run those workflows.",
  },
  {
    question: "Is Effect3 a generic agency or chatbot vendor?",
    answer:
      "No. Effect3 is not positioned as a generic marketing agency, a chatbot shop, or a freelancer automation studio. It is positioned as a deployment partner for production AI systems.",
  },
  {
    question: "Who is Effect3 built for?",
    answer:
      "Effect3 works with D2C and retail brands, legal and service businesses, SaaS and growth teams, and enterprise revenue or service teams that need operational AI systems tied to measurable outcomes.",
  },
  {
    question: "What is an AI operating system?",
    answer:
      "An AI operating system is a production layer that combines workflow logic, routing, channel orchestration, integrations, dashboards, and human oversight so business workflows can run reliably in production.",
  },
];

export const getPrimaryEntityGraph = () => [
  {
    "@type": "Organization",
    "@id": schemaIds.organization,
    name: siteMeta.name,
    alternateName: siteMeta.alternateNames,
    url: getCanonicalUrl("/"),
    slogan: "AI operating systems for revenue and service teams",
    logo: {
      "@type": "ImageObject",
      url: siteMeta.defaultOgImage,
    },
    image: siteMeta.defaultOgImage,
    email: siteMeta.email,
    sameAs: siteMeta.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteMeta.email,
      availableLanguage: ["en"],
    },
    founder: { "@id": schemaIds.person },
    description:
      "Effect3 is an AI operating systems company that designs, deploys, and operates agentic AI systems for revenue and service operations.",
    foundingDate: "2024",
    knowsAbout: [
      "AI operating systems",
      "agentic AI systems",
      "business automation",
      "AI inbound automation",
      "lead revival AI",
      "churn recovery AI",
      "AI voice workflows",
      "GTM AI systems",
      "enterprise AI solutions",
      "legal AI automation",
      "ManyChat replacement",
      "AEO",
      "GEO",
      "LLM visibility",
    ],
  },
  {
    "@type": "Person",
    "@id": schemaIds.person,
    name: founderMeta.name,
    jobTitle: founderMeta.title,
    description: founderMeta.description,
    url: getCanonicalUrl(founderMeta.slug),
    worksFor: { "@id": schemaIds.organization },
    sameAs: founderMeta.sameAs,
  },
  {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: getCanonicalUrl("/"),
    name: siteMeta.siteName,
    description:
      "Effect3 designs, deploys, and operates agentic AI systems for inbound, lead recovery, voice, outreach, and GTM workflows.",
    publisher: { "@id": schemaIds.organization },
    inLanguage: "en",
  },
];

export const getBreadcrumbStructuredData = (
  id: string,
  items: Array<{ name: string; item: string }>
) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: items.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: entry.item,
  })),
});

export const getHomeStructuredData = () => [
  {
    "@context": "https://schema.org",
    "@graph": [
      ...getPrimaryEntityGraph(),
      {
        "@type": "WebPage",
        "@id": `${siteMeta.url}/#homepage`,
        url: getCanonicalUrl("/"),
        name: siteMeta.defaultTitle,
        description: siteMeta.defaultDescription,
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": schemaIds.organization },
        primaryImageOfPage: siteMeta.defaultOgImage,
        inLanguage: "en",
        dateModified: contentLastUpdated,
      },
      ...coreServices.map((service, index) => ({
        "@type": "Service",
        "@id": `${siteMeta.url}/#service-${index + 1}`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        provider: { "@id": schemaIds.organization },
        areaServed: "Worldwide",
        audience: {
          "@type": "BusinessAudience",
          audienceType: "B2B companies, D2C brands, and growth teams",
        },
        url: `${siteMeta.url}/#solutions`,
      })),
      {
        "@type": "FAQPage",
        "@id": `${siteMeta.url}/#faq`,
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  },
];

export const getCareersStructuredData = () => [
  {
    "@context": "https://schema.org",
    "@graph": [
      ...getPrimaryEntityGraph(),
      {
        "@type": "CollectionPage",
        "@id": `${getCanonicalUrl("/careers")}#page`,
        url: getCanonicalUrl("/careers"),
        name: "Careers at Effect3",
        description:
          "Open roles at Effect3 across AI engineering, GTM engineering, marketing, AEO/SEO, and growth.",
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": schemaIds.organization },
        inLanguage: "en",
      },
      getBreadcrumbStructuredData(`${getCanonicalUrl("/careers")}#breadcrumb`, [
        { name: "Home", item: getCanonicalUrl("/") },
        { name: "Careers", item: getCanonicalUrl("/careers") },
      ]),
    ],
  },
];

export const getServiceSchemas = () => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://theeffect3.com/#lead-reviver",
    "name": "Lead Reviver",
    "serviceType": "AI Lead Revival and Churn Recovery",
    "provider": { "@id": "https://theeffect3.com/#organization" },
    "description": "AI agents that reactivate dead leads and churned customers using personalized outreach, behavioral data, and automated follow-up sequences.",
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "audienceType": "D2C brands, E-commerce, Sales teams" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://theeffect3.com/#inbound-handler",
    "name": "Inbound Handler",
    "serviceType": "Omnichannel AI Inbound Automation",
    "provider": { "@id": "https://theeffect3.com/#organization" },
    "description": "AI agents that respond to inbound messages across email, WhatsApp, Meta, LinkedIn, and web  -  qualifying and converting leads 24/7.",
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "audienceType": "Retail brands, B2B companies, Growth teams" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://theeffect3.com/#ai-call-agent",
    "name": "AI Call Agent",
    "serviceType": "AI Voice Handling and Conversion Workflows",
    "provider": { "@id": "https://theeffect3.com/#organization" },
    "description": "AI voice systems that answer inbound calls, handle objections, and route high-intent callers toward conversion without human intervention.",
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "audienceType": "Legal firms, Enterprise businesses, Service companies" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://theeffect3.com/#content-system",
    "name": "Content System",
    "serviceType": "AI Content Operations",
    "provider": { "@id": "https://theeffect3.com/#organization" },
    "description": "Structured AI content workflows for ad creation, campaign execution, and repeatable content output  -  built for D2C and growth teams.",
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "audienceType": "D2C brands, Marketing teams, E-commerce" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://theeffect3.com/#rerank-system",
    "name": "Rerank System",
    "serviceType": "Answer Engine Optimization and LLM Visibility",
    "provider": { "@id": "https://theeffect3.com/#organization" },
    "description": "AEO and GEO systems that improve brand visibility and citations across ChatGPT, Claude, Gemini, Perplexity, and Google Search.",
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "audienceType": "Enterprise brands, Agencies, SaaS companies" }
  }
];

export const getSoftwareAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Effect3 AI Operating System",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "provider": { "@id": "https://theeffect3.com/#organization" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "0",
    "description": "Book a free AI strategy audit  -  no lock-in, results in 30 days"
  },
  "featureList": [
    "AI lead revival and churn recovery",
    "Omnichannel inbound automation",
    "AI voice call handling",
    "AI content operations",
    "Answer Engine Optimization (AEO)",
    "LLM visibility and GEO ranking"
  ]
});
