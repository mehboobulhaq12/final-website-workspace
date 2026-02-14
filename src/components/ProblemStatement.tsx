import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = [statRef.current, subtitleRef.current, lineRef.current, bodyRef.current].filter(Boolean);
      gsap.set(elements, { autoAlpha: 0, y: 30 });

      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-black border-t border-white/5"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16 flex flex-col items-center text-center gap-6">
        <div ref={statRef}>
          <TextShimmer
            as="span"
            duration={2}
            spread={4}
            className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight [--base-color:theme(colors.blue.200)] [--base-gradient-color:theme(colors.white)] dark:[--base-color:theme(colors.blue.200)] dark:[--base-gradient-color:theme(colors.white)]"
          >
            68% of Dead Leads Recovered
          </TextShimmer>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl font-light tracking-tight text-white/60"
        >
          Proven average recovery rate from inactive and ghosted leads
        </p>

        <div
          ref={lineRef}
          className="w-16 h-px bg-white/10 my-4"
        />

        <p
          ref={bodyRef}
          className="max-w-3xl text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/50"
        >
          We partner with growth-focused SaaS, eCommerce, and service businesses
          to recover lost revenue from inactive leads and churned customers. Our
          AI agents automatically re-engage, personalise offers, and revive
          stalled conversations across Email, Web System, AI Voice Agents, and
          third-party platforms, turning lost opportunities into measurable
          revenue.
        </p>
      </div>
    </section>
  );
};

export default ProblemStatement;
