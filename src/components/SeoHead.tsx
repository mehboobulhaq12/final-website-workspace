import { useEffect } from "react";
import { siteMeta } from "@/lib/seo";

type StructuredData = Record<string, unknown>;

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  type?: string;
  image?: string;
  keywords?: string;
  structuredData?: StructuredData[];
}

const setMetaTag = (
  selector: string,
  attributeName: "name" | "property",
  attributeValue: string,
  content: string
) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLinkTag = (selector: string, rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export default function SeoHead({
  title = siteMeta.defaultTitle,
  description = siteMeta.defaultDescription,
  canonical = `${siteMeta.url}/`,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  type = "website",
  image = siteMeta.defaultOgImage,
  keywords,
  structuredData = [],
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[name="robots"]', "name", "robots", robots);
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:type"]', "property", "og:type", type);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonical);
    setMetaTag('meta[property="og:image"]', "property", "og:image", image);
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", siteMeta.siteName);
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", image);
    setMetaTag('meta[name="twitter:url"]', "name", "twitter:url", canonical);
    setMetaTag('meta[property="og:image:alt"]', "property", "og:image:alt", `${siteMeta.siteName} brand image`);

    document.head.querySelector('meta[name="keywords"]')?.remove();

    setLinkTag('link[rel="canonical"]', "canonical", canonical);

    if (siteMeta.googleSiteVerification) {
      setMetaTag(
        'meta[name="google-site-verification"]',
        "name",
        "google-site-verification",
        siteMeta.googleSiteVerification
      );
    } else {
      document.head.querySelector('meta[name="google-site-verification"]')?.remove();
    }

    // Article published/modified dates for blog pages
    if (type === "article") {
      setMetaTag('meta[property="article:publisher"]', "property", "article:publisher", "https://www.linkedin.com/in/ibm-fullstackmarketer/");
    }

    // Language and geo
    setMetaTag('meta[name="language"]', "name", "language", "English");
    setMetaTag('meta[name="geo.region"]', "name", "geo.region", "US");
    setMetaTag('meta[name="geo.placename"]', "name", "geo.placename", "United States");

    document.head.querySelectorAll('script[data-seo-managed="true"]').forEach((node) => node.remove());
    structuredData.forEach((payload, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoManaged = "true";
      script.id = `seo-ld-${index}`;
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
    });
  }, [canonical, description, image, keywords, robots, structuredData, title, type]);

  return null;
}
