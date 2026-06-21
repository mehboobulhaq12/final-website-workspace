import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PostHogProvider } from "@posthog/react";
import PageTransition from "./components/PageTransition";
import { isPostHogEnabled, posthog } from "./lib/posthog";

const Index = lazy(() => import("./pages/Index"));
const Careers = lazy(() => import("./pages/Careers"));
const AeoDashboard = lazy(() => import("./pages/AeoDashboard"));
const AeoScanner = lazy(() => import("./pages/AeoScanner"));
const AiSearchPrompts = lazy(() => import("./pages/AiSearchPrompts"));
const AiSearchPromptClusterPage = lazy(() => import("./pages/AiSearchPromptClusterPage"));
const Company = lazy(() => import("./pages/Company"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const Effect3VsManychat = lazy(() => import("./pages/Effect3VsManychat"));
const Faq = lazy(() => import("./pages/Faq"));
const Founder = lazy(() => import("./pages/Founder"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const KeywordLandingPage = lazy(() => import("./pages/KeywordLandingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/case-studies/${slug}` : "/case-studies"} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const analyticsWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };
    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    analyticsWindow.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });

    if (isPostHogEnabled) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        $pathname: location.pathname,
        $search: location.search,
        page_title: document.title,
        page_path: pagePath,
      });
    }
  }, [location]);

  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-black" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/company" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/founder" element={<PageTransition><Founder /></PageTransition>} />
          <Route path="/effect3-vs-manychat" element={<PageTransition><Effect3VsManychat /></PageTransition>} />
          <Route path="/effect3-vs-kore-ai" element={<PageTransition><ComparisonPage slug="effect3-vs-kore-ai" /></PageTransition>} />
          <Route path="/effect3-vs-yellow-ai" element={<PageTransition><ComparisonPage slug="effect3-vs-yellow-ai" /></PageTransition>} />
          <Route path="/effect3-vs-cognigy" element={<PageTransition><ComparisonPage slug="effect3-vs-cognigy" /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><Faq /></PageTransition>} />
          <Route path="/ai-search-prompts" element={<PageTransition><AiSearchPrompts /></PageTransition>} />
          <Route path="/ai-search-prompts/:clusterSlug" element={<PageTransition><AiSearchPromptClusterPage /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/case-studies" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/case-studies/:slug" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
          <Route path="/projects" element={<Navigate to="/case-studies" replace />} />
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/ai-operating-systems" element={<PageTransition><KeywordLandingPage slug="ai-operating-systems" /></PageTransition>} />
          <Route path="/ai-automation-agency" element={<PageTransition><KeywordLandingPage slug="ai-automation-agency" /></PageTransition>} />
          <Route path="/ai-agency" element={<PageTransition><KeywordLandingPage slug="ai-agency" /></PageTransition>} />
          <Route path="/ai-marketing-agency" element={<PageTransition><KeywordLandingPage slug="ai-marketing-agency" /></PageTransition>} />
          <Route path="/claude-automation-agency" element={<PageTransition><KeywordLandingPage slug="claude-automation-agency" /></PageTransition>} />
          <Route path="/ecommerce-marketing-agency" element={<PageTransition><KeywordLandingPage slug="ecommerce-marketing-agency" /></PageTransition>} />
          <Route path="/ecommerce-ads-agency" element={<PageTransition><KeywordLandingPage slug="ecommerce-ads-agency" /></PageTransition>} />
          <Route path="/ecommerce-operating-system" element={<PageTransition><KeywordLandingPage slug="ecommerce-operating-system" /></PageTransition>} />
          <Route path="/ai-amazon-agency" element={<PageTransition><KeywordLandingPage slug="ai-amazon-agency" /></PageTransition>} />
          <Route path="/ai-inbound-automation" element={<PageTransition><KeywordLandingPage slug="ai-inbound-automation" /></PageTransition>} />
          <Route path="/lead-revival-ai" element={<PageTransition><KeywordLandingPage slug="lead-revival-ai" /></PageTransition>} />
          <Route path="/ai-call-agent" element={<PageTransition><KeywordLandingPage slug="ai-call-agent" /></PageTransition>} />
          <Route path="/ai-automation-for-d2c-brands" element={<PageTransition><KeywordLandingPage slug="ai-automation-for-d2c-brands" /></PageTransition>} />
          <Route path="/saas-ai-conversion-system" element={<PageTransition><KeywordLandingPage slug="saas-ai-conversion-system" /></PageTransition>} />
          <Route path="/enterprise-ai-operations" element={<PageTransition><KeywordLandingPage slug="enterprise-ai-operations" /></PageTransition>} />
          <Route path="/enterprise-ai-solutions" element={<PageTransition><KeywordLandingPage slug="enterprise-ai-solutions" /></PageTransition>} />
          <Route path="/legal-ai-automation" element={<PageTransition><KeywordLandingPage slug="legal-ai-automation" /></PageTransition>} />
          <Route path="/manychat-replacement" element={<PageTransition><KeywordLandingPage slug="manychat-replacement" /></PageTransition>} />
          <Route path="/effect3-agency" element={<PageTransition><KeywordLandingPage slug="effect3-agency" /></PageTransition>} />
          <Route path="/aeo-agency" element={<PageTransition><KeywordLandingPage slug="aeo-agency" /></PageTransition>} />
          <Route path="/geo-agency" element={<PageTransition><KeywordLandingPage slug="geo-agency" /></PageTransition>} />
          <Route path="/chatgpt-seo-agency" element={<PageTransition><KeywordLandingPage slug="chatgpt-seo-agency" /></PageTransition>} />
          <Route path="/ai-seo-agency" element={<PageTransition><KeywordLandingPage slug="ai-seo-agency" /></PageTransition>} />
          <Route path="/llm-visibility-agency" element={<PageTransition><KeywordLandingPage slug="llm-visibility-agency" /></PageTransition>} />
          <Route path="/google-ai-overviews-agency" element={<PageTransition><KeywordLandingPage slug="google-ai-overviews-agency" /></PageTransition>} />
          <Route path="/ai-search-monitoring" element={<PageTransition><KeywordLandingPage slug="ai-search-monitoring" /></PageTransition>} />
          <Route path="/llm-rank-tracking" element={<PageTransition><KeywordLandingPage slug="llm-rank-tracking" /></PageTransition>} />
          <Route path="/geo-audit" element={<PageTransition><KeywordLandingPage slug="geo-audit" /></PageTransition>} />
          <Route path="/aeo-dashboard" element={<PageTransition><AeoDashboard /></PageTransition>} />
          <Route path="/aeo-scanner" element={<PageTransition><AeoScanner /></PageTransition>} />
          <Route path="/aeo" element={<Navigate to="/aeo-scanner" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const App = () =>
  isPostHogEnabled ? (
    <PostHogProvider client={posthog}>
      <AppProviders />
    </PostHogProvider>
  ) : (
    <AppProviders />
  );

export default App;
