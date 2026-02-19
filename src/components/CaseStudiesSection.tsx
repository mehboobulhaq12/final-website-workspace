import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import amazonOutreachImg from "@/assets/case-studies/amazon-outreach.png";
import aiHrInterviewImg from "@/assets/case-studies/ai-hr-interview.png";
import ppcTrackingImg from "@/assets/case-studies/ppc-tracking.png";
import ecommercePortalImg from "@/assets/case-studies/ecommerce-portal.png";
import buffyValidatorImg from "@/assets/case-studies/buffy-validator.png";
import aiMarketingStudioImg from "@/assets/case-studies/ai-marketing-studio.png";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  title: string;
  tag: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  link?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Buffy Business Validator — AI Agent That Stress-Tests Startup Ideas Like a VC",
    tag: "Buffy Validator",
    description: "Helps solo founders and small teams validate their business ideas with ruthless precision before pitching to investors.",
    image: buffyValidatorImg,
    metric: "500+",
    metricLabel: "Ideas Validated",
    link: "https://theeffect3.com/buffy",
  },
  {
    title: "Effect3 AI Marketing Studio — Agency-Quality Content in 48 Hours",
    tag: "AI Marketing Studio",
    description: "AI-powered marketing studio that creates high-converting content for eCommerce and SaaS brands with a GTM approach, delivered in 48 hours, not weeks.",
    image: aiMarketingStudioImg,
    metric: "48hrs",
    metricLabel: "Delivery Time",
    link: "https://theeffect3.com/gtm",
  },
  {
    title: "How an Amazon Agency Automated 861 Brand Outreach and Converted 9% with AI Agents",
    tag: "Amazon Native Agency",
    description: "Inbound + outreach system with multi-round follow-ups on every lead, converting cold contacts into signed clients.",
    image: amazonOutreachImg,
    metric: "9%",
    metricLabel: "Conversion Rate",
  },
  {
    title: "AI HR Interview System That Screens Candidates 24/7 Without Human Intervention",
    tag: "AI HR System",
    description: "Fully autonomous AI interviewer that handles initial candidate screening, saving 140+ hours per month for the hiring team.",
    image: aiHrInterviewImg,
    metric: "140+",
    metricLabel: "Hours Saved / Month",
    link: "https://bey.chat/91351a55-f4ae-44e1-bc4a-c6cc73457795",
  },
  {
    title: "PPC Tracking Dashboard That Improved ROAS by 4.11x Across All Campaigns",
    tag: "PPC Tracking",
    description: "Real-time campaign intelligence with AI-powered budget optimization, reducing ACOS by 24% while scaling revenue.",
    image: ppcTrackingImg,
    metric: "4.11x",
    metricLabel: "ROAS Achieved",
  },
  {
    title: "eCommerce Brand Portal Managing Leads, Ads, Content and AEO in One Place",
    tag: "eCommerce Portal",
    description: "Unified command center for an eCommerce brand handling lead campaigns, ad performance, content calendar, and answer engine optimization.",
    image: ecommercePortalImg,
    metric: "$327K+",
    metricLabel: "Revenue Tracked",
  },
];

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.to(headingRef.current, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });
  }, { scope: sectionRef });

  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll(".cs-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const scrollPrev = () => {
    const next = Math.max(0, activeIndex - 1);
    scrollToIndex(next);
  };

  const scrollNext = () => {
    const next = Math.min(caseStudies.length - 1, activeIndex + 1);
    scrollToIndex(next);
  };

  // Track active card on scroll
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const onScroll = () => {
      const cards = track.querySelectorAll(".cs-card");
      if (!cards.length) return;
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - trackCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="w-full py-16 md:py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">Effect3 powers the fastest </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              growing businesses.
            </TextShimmer>
          </h2>
          <p className="text-sm md:text-base font-light text-white/40 max-w-xl">
            Our clients deploy AI systems that recover leads, automate outreach, and scale revenue on autopilot.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {caseStudies.map((cs, i) => {
            const CardWrapper = cs.link ? 'a' : 'div';
            const linkProps = cs.link ? { href: cs.link, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
            <CardWrapper
              key={i}
              {...linkProps}
              className="cs-card flex-shrink-0 w-[320px] sm:w-[460px] md:w-[560px] lg:w-[640px] rounded-2xl overflow-hidden snap-center group cursor-pointer relative transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(25,95%,53%,0.3)] hover:ring-1 hover:ring-orange-500/20 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] font-light text-white/80">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" />
                    </span>
                    {cs.tag}
                  </span>
                </div>

                {/* Metric badge */}
                <div className="absolute top-4 right-4 text-right">
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2">
                    <span className="text-xl md:text-2xl font-light text-orange-400 block leading-none">{cs.metric}</span>
                    <span className="text-[10px] text-white/40 font-light">{cs.metricLabel}</span>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-light text-white/90 leading-snug mb-2">
                    {cs.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/40 leading-relaxed line-clamp-2 mb-3">
                    {cs.description}
                  </p>
                  {cs.link && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-light text-orange-400 hover:text-orange-300 transition-colors">
                      View More <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </CardWrapper>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all"
            aria-label="Previous case study"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to case study ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? "w-6 h-2 bg-orange-400"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all"
            aria-label="Next case study"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
