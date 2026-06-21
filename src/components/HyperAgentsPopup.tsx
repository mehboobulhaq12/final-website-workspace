import { useEffect, useRef, useState } from "react";
import { Moon, Sun, X, Zap } from "lucide-react";
import ufoImage from "@/assets/hyperagents/ufo.png";
import OnboardingModal from "@/components/OnboardingModal";

const SESSION_KEY = "effect3-hyperagents-popup-dismissed";
const AUTO_OPEN_DELAY_MS = 3000;

export default function HyperAgentsPopup({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const cardRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0.5, y: 0.35 });
  const currentRef = useRef({ x: 0.5, y: 0.35 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setSecondsLeft(10);
    const id = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open || secondsLeft > 0) return;
    closePopup();
  }, [open, secondsLeft]);

  useEffect(() => {
    if (!open) return;

    const handleMove = (event: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetRef.current = {
        x: Math.max(0.15, Math.min(0.85, x)),
        y: Math.max(0.1, Math.min(0.45, y)),
      };
    };

    const tick = () => {
      const ease = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

      const card = cardRef.current;
      const ufo = ufoRef.current;
      const beam = beamRef.current;

      if (card && ufo && beam) {
        const width = card.clientWidth;
        const height = card.clientHeight;
        const px = currentRef.current.x * width;
        const py = currentRef.current.y * height;

        ufo.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
        beam.style.left = `${px}px`;
        beam.style.top = `${py + 30}px`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [open]);

  function closePopup() {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }
  }

  function handlePrimaryAction() {
    closePopup();
    setReviewOpen(true);
  }

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in"
          onClick={closePopup}
        >
          <div
            ref={cardRef}
            onClick={(event) => event.stopPropagation()}
            className={`relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl transition-colors duration-500 sm:rounded-3xl ${
              dark ? "bg-[hsl(240_10%_4%)] text-white" : "bg-white text-[hsl(240_10%_4%)]"
            }`}
          >
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                dark ? "opacity-100" : "opacity-0"
              }`}
            >
              {Array.from({ length: 40 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute rounded-full bg-white animate-twinkle"
                  style={{
                    left: `${(index * 37) % 100}%`,
                    top: `${(index * 53) % 70}%`,
                    width: `${(index % 3) + 1}px`,
                    height: `${(index % 3) + 1}px`,
                    animationDelay: `${(index % 5) * 0.4}s`,
                  }}
                />
              ))}
            </div>

            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
              <button
                onClick={() => setDark((value) => !value)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-black/5 text-[hsl(240_10%_20%)] hover:bg-black/10"
                }`}
              >
                {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {dark ? "Go Visible" : "Go Invisible"}
              </button>

              <button
                onClick={closePopup}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-black/5 text-[hsl(240_10%_20%)] hover:bg-black/10"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={beamRef}
              className="pointer-events-none absolute z-10"
              style={{ left: "50%", top: "35%" }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  width: "120px",
                  height: "260px",
                  background:
                    "linear-gradient(to bottom, hsl(25 95% 61% / 0.6) 0%, hsl(25 95% 61% / 0.18) 50%, transparent 100%)",
                  clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
                  filter: "blur(6px)",
                }}
              />
            </div>

            <div
              ref={ufoRef}
              className="pointer-events-none absolute z-10 will-change-transform"
              style={{ left: 0, top: 0 }}
            >
              <div className="animate-ufo-bob">
                <img
                  src={ufoImage}
                  alt="Spaceship"
                  width={180}
                  height={180}
                  className="h-auto w-[140px] drop-shadow-[0_0_30px_hsl(25_95%_61%/0.65)] sm:w-[180px]"
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center px-5 pb-5 pt-4 text-center sm:px-8 sm:pb-8">
              <h2 className="mb-2 flex items-center justify-center gap-1.5 whitespace-nowrap text-lg font-bold leading-none sm:gap-2 sm:text-2xl">
                <Zap className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400 sm:h-6 sm:w-6" />
                <span className="font-bold text-[hsl(25_95%_61%)]">Get One Week Free Trial</span>
              </h2>

              <p
                className={`mb-4 text-xs leading-relaxed sm:mb-5 sm:text-sm ${
                  dark ? "text-white/70" : "text-[hsl(240_5%_40%)]"
                }`}
              >
                Effect3 has introduced <span className="font-semibold text-[hsl(25_95%_61%)]">HyperAgents Systems</span>,
                <br className="hidden sm:inline" /> One System, Endless control
              </p>

              <div
                className={`mb-3 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium tabular-nums transition-colors duration-300 sm:mb-4 sm:text-xs ${
                  secondsLeft <= 3
                    ? "animate-pulse bg-[hsl(25_95%_61%/0.18)] text-[hsl(25_95%_65%)]"
                    : dark
                      ? "bg-white/10 text-white/80"
                      : "bg-[hsl(240_5%_94%)] text-[hsl(240_10%_25%)]"
                }`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(25_95%_61%)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(25_95%_55%)]" />
                </span>
                <span className="whitespace-nowrap">
                  Offer expires in{" "}
                  <span className="inline-block min-w-[2.5ch] text-left font-semibold">
                    00:{secondsLeft.toString().padStart(2, "0")}
                  </span>
                </span>
              </div>

              <button
                onClick={handlePrimaryAction}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-[hsl(25_95%_55%)] hover:text-white hover:shadow-[0_8px_24px_-4px_hsl(25_95%_61%/0.6)] active:scale-[0.98] ${
                  dark ? "bg-white text-[hsl(240_10%_4%)]" : "bg-[hsl(240_10%_4%)] text-white"
                }`}
              >
                Next Mission
              </button>

              <button
                onClick={closePopup}
                className={`mt-3 text-xs transition-opacity hover:opacity-100 ${
                  dark ? "text-white/50" : "text-[hsl(240_5%_50%)]"
                }`}
              >
                I'll miss this chance
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <OnboardingModal open={reviewOpen} onClose={() => setReviewOpen(false)} mode="demo" />
    </>
  );
}
