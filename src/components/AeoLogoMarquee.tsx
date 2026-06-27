const OpenAIMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3l-2.607 1.5-2.602-1.5z" />
  </svg>
);

const FirecrawlMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.6 1.4c.9 2.2.5 4-.6 5.5-.8 1-1.8 1.9-2.7 2.9-.7.8-1.2 1.6-1.3 2.5-.2-1-.2-2 .1-3-1.6 1.2-2.8 2.8-3.3 4.8-.9 3.6 1.3 7.3 4.9 8.3 3.8 1 7.7-1.3 8.6-5.1.5-2.1 0-4.1-1.2-5.7.1 1 0 1.9-.5 2.8-.4.7-1.1 1.2-1.9 1.2.8-1.4 1-2.8.5-4.3-.4-1.2-1.1-2.2-1.8-3.2-1.2-1.6-2.2-3.3-1.3-5.4-.7.1-1.3.4-1.9.8.9.3 1.6.9 2 1.7-1.8-.6-3.6-.3-5.2.6 2-.2 3.9.3 5.6 1.4z" />
  </svg>
);

const items = [
  { name: "ChatGPT", mark: (c: string) => <OpenAIMark className={c} /> },
  { name: "Gemini", src: "/logos/gemini.svg" },
  { name: "Perplexity", src: "/logos/perplexity.svg" },
  { name: "NotebookLM", src: "/logos/notebooklm.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Firecrawl", mark: (c: string) => <FirecrawlMark className={c} /> },
];

// Static sparkle field generated once.
const sparkles = Array.from({ length: 44 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 1.6 + 0.6,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export function AeoLogoMarquee() {
  const row = [...items, ...items];
  const iconClass = "h-6 w-auto md:h-7";
  return (
    <section className="relative overflow-hidden bg-black">
      {/* smoky seam — blends the hero into black, no hard line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="relative z-20 mx-auto max-w-6xl overflow-hidden px-4 pt-16 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] md:pt-20">
        <div className="flex w-max items-center gap-12 md:gap-20 motion-safe:animate-[aeoLogoScroll_38s_linear_infinite]">
          {row.map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 select-none items-center gap-2.5 whitespace-nowrap opacity-65 transition-opacity duration-300 hover:opacity-100"
            >
              {item.src ? (
                <img src={item.src} alt="" aria-hidden="true" className={iconClass} />
              ) : (
                item.mark?.(`${iconClass} text-white`)
              )}
              <span className="text-[20px] font-semibold tracking-tight text-white md:text-[26px]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Soft smoky glow — blends into black, no arc, no line */}
      <div className="pointer-events-none relative -mt-2 h-32 w-full overflow-hidden md:h-40">
        <div className="absolute inset-0 bg-[radial-gradient(75%_130%_at_50%_150%,rgba(249,115,22,0.4),rgba(249,115,22,0.1)_40%,transparent_72%)] blur-[3px]" />
        <div className="absolute inset-0">
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white aeo-twinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes aeoLogoScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes aeoTwinkle { 0%, 100% { opacity: 0.08; transform: scale(0.6); } 50% { opacity: 0.9; transform: scale(1); } }
        .aeo-twinkle { animation-name: aeoTwinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @media (prefers-reduced-motion: reduce) { .aeo-twinkle { animation: none; opacity: 0.4; } }
      `}</style>
    </section>
  );
}

export default AeoLogoMarquee;
