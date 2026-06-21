import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ProjectShowcaseCard from "@/components/projects/ProjectShowcaseCard";
import { caseStudiesPath, projects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.to(headingRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });
  }, { scope: sectionRef });

  const totalCards = projects.length;

  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll(".cs-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const scrollPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const scrollNext = () => scrollToIndex(Math.min(totalCards - 1, activeIndex + 1));

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
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="w-full overflow-hidden border-t border-white/5 bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div ref={headingRef} className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="text-3xl font-extralight leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-white/90">Effect3 powers the fastest </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              growing businesses.
            </TextShimmer>
          </h2>
          <p className="max-w-xl text-sm font-light text-white/40 md:text-base">
            Effect3 deploys production AI systems that recover leads, automate revenue workflows, and create measurable operating leverage.
          </p>
          <Link
            to={caseStudiesPath}
            className="inline-flex items-center gap-2 text-sm font-light text-orange-300 transition-colors duration-300 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Open Full Case-Study Library
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-hide flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project) => (
            <ProjectShowcaseCard
              key={project.slug}
              project={project}
              className="cs-card max-w-[320px] w-[85vw] shrink-0 snap-center sm:w-[460px] md:w-[560px] md:max-w-none lg:w-[640px]"
            />
          ))}

        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors duration-300 hover:border-white/30 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Previous case study"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to case study ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`transition-all duration-500 ${
                  activeIndex === i ? "h-2 w-6 rounded-full bg-orange-400" : "h-2 w-2 rounded-full bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors duration-300 hover:border-white/30 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Next case study"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
