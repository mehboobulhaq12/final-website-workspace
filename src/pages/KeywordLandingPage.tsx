import LandingPageTemplate from "@/components/landing/LandingPageTemplate";
import { landingPageBySlug } from "@/lib/landingPages";
import NotFound from "@/pages/NotFound";

type KeywordLandingPageProps = {
  slug: keyof typeof landingPageBySlug;
};

export default function KeywordLandingPage({ slug }: KeywordLandingPageProps) {
  const page = landingPageBySlug[slug];

  if (!page) {
    return <NotFound />;
  }

  return <LandingPageTemplate page={page} />;
}
