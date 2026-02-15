import { useRef, useEffect } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const children = contentRef.current.children;
    gsap.fromTo(
      children,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Parallax
    gsap.to(contentRef.current, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-black"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <div ref={contentRef} className="flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">
                So What Are You Upto?
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.05] text-white">
            Get Started in{" "}
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              Minutes
            </TextShimmer>
          </h2>

          {/* Description */}
          <p className="text-base font-light text-white/50 max-w-xl leading-relaxed tracking-tight sm:text-lg">
            Deploy your custom AI system in days, not months. Start recovering lost revenue and converting more customers today.
          </p>

          {/* CTA Buttons - matching hero style */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#get-started"
              className="rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 duration-300"
            >
              Implement Now
            </a>
            <a
              href="#demo"
              className="rounded-2xl border border-white/10 text-white/80 hover:bg-white/5 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 duration-300"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
