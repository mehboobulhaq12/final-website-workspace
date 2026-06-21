'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

import ShaderBackground from '@/components/ShaderBackground';

// ===================== HERO =====================
interface HeroProps {
  title: React.ReactNode;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: Array<string>;
  trustBadge?: { avatars: string[]; text: string };
  onCtaClick?: (text: string) => void;
  disableBackground?: boolean;
}

export default function Hero({
  title,
  description,
  badgeText = "Generative Surfaces",
  badgeLabel = "New",
  ctaButtons = [
    { text: "Get started", href: "#book", primary: true },
    { text: "View showcase", href: "#showcase" }
  ],
  microDetails = [],
  trustBadge,
  onCtaClick,
  disableBackground = false,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const trustBadgeRef = useRef<HTMLDivElement | null>(null);
  const microItem1Ref = useRef<HTMLLIElement | null>(null);
  const microItem2Ref = useRef<HTMLLIElement | null>(null);
  const microItem3Ref = useRef<HTMLLIElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        gsap.set(headerRef.current!, {
          filter: 'blur(16px)',
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: '50% 100%',
        });

        if (badgeRef.current) {
          gsap.set(badgeRef.current, { autoAlpha: 0, y: -8 });
        }
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }
        const microItems = [microItem1Ref.current, microItem2Ref.current, microItem3Ref.current].filter(Boolean);
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        if (badgeRef.current) {
          tl.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.0);
        }

        tl.to(
          headerRef.current!,
          {
            filter: 'blur(0px)',
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
          },
          0.1,
        );

        if (paraRef.current) {
          tl.to(paraRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.55');
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35');
        }
        if (microItems.length > 0) {
          tl.to(microItems, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.25');
        }
        if (trustBadgeRef.current) {
          gsap.set(trustBadgeRef.current, { autoAlpha: 0, y: 10 });
          tl.to(trustBadgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.15');
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative min-h-[auto] sm:min-h-screen w-full overflow-hidden">
      {disableBackground ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#060606_0%,_#0b0b0b_55%,_#050505_100%)]"
        />
      ) : (
        <ShaderBackground />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-3 sm:gap-4 px-5 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pt-40 lg:px-16 lg:pt-44">
        <div ref={badgeRef} className="w-full flex justify-center">
          <a href="#book" className="group inline-flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-orange-400/20 bg-orange-500/5 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500/10 cursor-pointer">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-light tracking-tight text-white/90 leading-tight">
              <span className="sm:hidden">🦞 Openclaw is now live inside Effect3 system.</span>
              <span className="hidden sm:inline">🦞 OpenClaw is Now Live Inside Effect3 Systems, <span className="font-medium text-orange-300/90">Don't Get Left Behind.</span></span>
            </span>
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>

        <h1 ref={headerRef} className="max-w-2xl text-left text-4xl sm:text-5xl font-extralight leading-[1.08] tracking-tight text-white md:text-7xl">
          {title}
        </h1>

        <p ref={paraRef} className="max-w-xl text-left text-base sm:text-base font-light leading-relaxed tracking-tight text-white/75 md:text-lg">
          {description}
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-2xl border border-white/10 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 duration-300 ${
                button.primary
                  ? "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  : "text-white/80 hover:bg-white/5"
              }`}
              onClick={(e) => {
                if (onCtaClick) {
                  e.preventDefault();
                  onCtaClick(button.text);
                } else if (button.href.startsWith('#')) {
                  e.preventDefault();
                  document.querySelector(button.href)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {button.text}
            </a>
          ))}
        </div>

        {microDetails.length > 0 && (
          <ul ref={microRef} className="mt-2 flex flex-wrap gap-6 text-sm font-extralight italic tracking-tight text-white/60">
            {microDetails.map((detail, index) => {
              const refMap = [microItem1Ref, microItem2Ref, microItem3Ref];
              return (
                <li key={index} ref={refMap[index]} className="flex items-center">
                  {detail}
                </li>
              );
            })}
          </ul>
        )}

        {/* Trust badge */}
        {trustBadge && (
          <div ref={trustBadgeRef} className="mt-2 sm:mt-4 flex items-center gap-3 sm:gap-4">
            <div className="flex -space-x-3">
              {trustBadge.avatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt="Client"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-black object-cover"
                />
              ))}
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-medium text-white/90 ml-1">5.0</span>
              </div>
              <span className="text-xs font-light text-white/50">
                Trusted by <span className="font-medium text-white/70">{trustBadge.text}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    cPPNShaderMaterial: any;
  }
}
