import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";

gsap.registerPlugin(ScrollTrigger);

interface AiSystemPromptSectionProps {
  onPromptSend?: (message: string, files?: File[]) => void;
  variant?: "default" | "projects";
}

export default function AiSystemPromptSection({
  onPromptSend,
  variant = "default",
}: AiSystemPromptSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isProjectsVariant = variant === "projects";

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const targets = Array.from(contentRef.current.children);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,0.42)_10.5%,rgba(245,120,2,0.18)_16%,rgba(245,140,2,0.14)_17.5%,rgba(245,170,100,0.08)_25%,rgba(238,174,202,0.04)_40%,rgba(202,179,214,0.02)_65%,rgba(148,201,233,0.02)_100%)]" />
        {isProjectsVariant ? (
          <>
            <motion.div
              aria-hidden="true"
              className="absolute -left-28 top-6 h-80 w-80 rounded-full bg-orange-500/28 blur-[88px] mix-blend-screen"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 180, 70, 0],
                      y: [0, 50, 120, 0],
                      scale: [1, 1.24, 1.08, 1],
                      opacity: [0.34, 0.68, 0.42, 0.34],
                    }
              }
              transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute right-[-10%] top-0 h-72 w-72 rounded-full bg-amber-100/16 blur-[86px] mix-blend-screen"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -130, -50, 0],
                      y: [0, 100, 40, 0],
                      scale: [1, 1.28, 1.12, 1],
                      opacity: [0.2, 0.46, 0.26, 0.2],
                    }
              }
              transition={{ duration: 15.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[46%] h-56 w-[58rem] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,237,220,0.34),rgba(249,115,22,0.26),rgba(255,255,255,0))] blur-[54px] mix-blend-screen"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["-18%", "14%", "-6%", "-18%"],
                      opacity: [0.18, 0.52, 0.3, 0.18],
                      scaleX: [0.92, 1.12, 1, 0.92],
                    }
              }
              transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[56%] h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rotate-[12deg] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,214,170,0.22),rgba(249,115,22,0.18),rgba(255,255,255,0))] blur-[42px] mix-blend-screen"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["14%", "-12%", "8%", "14%"],
                      opacity: [0.08, 0.34, 0.14, 0.08],
                      scaleX: [0.86, 1.08, 0.94, 0.86],
                    }
              }
              transition={{ duration: 9.25, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div ref={contentRef} className="flex flex-col items-center gap-8 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extralight leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl">
              What AI System Do You Want Integrated in Your Business?
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed tracking-tight text-white/48 sm:text-lg">
              Type the workflow, stack, or AI build you want. Upload a reference if needed,
              then send it straight to Effect3.
            </p>
          </div>

          <div className="w-full max-w-[560px]">
            <PromptInputBox
              onSend={onPromptSend}
              placeholder="Type your message here..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
