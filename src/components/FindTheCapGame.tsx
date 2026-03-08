import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, RotateCcw, Lightbulb, Trophy, Sparkles } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type GameState = "intro" | "playing" | "win";

interface CapLocation {
  id: string;
  x: number;
  y: number;
  label: string;
}

// ─── Cap spawn locations (% based) ──────────────────────────────────────────
const CAP_LOCATIONS: CapLocation[] = [
  { id: "shelf", x: 12, y: 18, label: "on the shelf" },
  { id: "desk1", x: 72, y: 58, label: "under a desk" },
  { id: "chair", x: 38, y: 68, label: "on a chair" },
  { id: "plant", x: 88, y: 72, label: "behind the plant" },
  { id: "rack", x: 6, y: 52, label: "on the server rack" },
  { id: "board", x: 52, y: 14, label: "near the whiteboard" },
  { id: "mug", x: 28, y: 48, label: "next to a mug" },
  { id: "monitor", x: 62, y: 32, label: "behind a monitor" },
];

// ─── Pixel Agent data ───────────────────────────────────────────────────────
const AGENTS = [
  { id: "strategist", x: 15, y: 35, color: "#4f8fff", task: "pointing", label: "📊" },
  { id: "designer", x: 32, y: 40, color: "#ff6bcb", task: "typing", label: "🎨" },
  { id: "ads", x: 50, y: 55, color: "#fbbf24", task: "clicking", label: "📢" },
  { id: "automation", x: 68, y: 38, color: "#34d399", task: "building", label: "⚙️" },
  { id: "content", x: 82, y: 50, color: "#a78bfa", task: "writing", label: "✏️" },
  { id: "outreach", x: 22, y: 65, color: "#f97316", task: "walking", label: "📨" },
  { id: "analyst", x: 58, y: 25, color: "#06b6d4", task: "analyzing", label: "📈" },
  { id: "success", x: 78, y: 22, color: "#f43f5e", task: "celebrating", label: "🤝" },
];

// ─── Decor items ────────────────────────────────────────────────────────────
const DECOR = [
  { type: "desk", x: 10, y: 42, w: 22, h: 12 },
  { type: "desk", x: 45, y: 50, w: 22, h: 12 },
  { type: "desk", x: 65, y: 35, w: 20, h: 11 },
  { type: "monitor", x: 14, y: 32, w: 8, h: 10 },
  { type: "monitor", x: 50, y: 40, w: 8, h: 10 },
  { type: "monitor", x: 70, y: 26, w: 8, h: 10 },
  { type: "chair", x: 20, y: 50, w: 6, h: 8 },
  { type: "chair", x: 55, y: 58, w: 6, h: 8 },
  { type: "plant", x: 86, y: 65, w: 8, h: 14 },
  { type: "plant", x: 3, y: 70, w: 7, h: 12 },
  { type: "shelf", x: 5, y: 10, w: 20, h: 8 },
  { type: "board", x: 40, y: 5, w: 24, h: 14 },
  { type: "rack", x: 2, y: 45, w: 8, h: 18 },
  { type: "coffee", x: 30, y: 44, w: 4, h: 5 },
  { type: "poster", x: 75, y: 8, w: 10, h: 12 },
];

// ─── Clickable decoys ───────────────────────────────────────────────────────
const DECOY_ITEMS = [
  { x: 30, y: 44, w: 5, h: 5, label: "coffee mug" },
  { x: 86, y: 68, w: 8, h: 8, label: "plant pot" },
  { x: 14, y: 34, w: 8, h: 8, label: "monitor" },
  { x: 40, y: 8, w: 12, h: 8, label: "whiteboard" },
  { x: 55, y: 59, w: 6, h: 6, label: "chair" },
];

const WRONG_MESSAGES = [
  "Not this one!",
  "Keep looking!",
  "Nope, try again!",
  "Close, but no cap!",
  "That's not it!",
  "Almost!",
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function FindTheCapGame() {
  const [visible, setVisible] = useState(false);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [capLocation, setCapLocation] = useState<CapLocation | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [wrongMsg, setWrongMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrongTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show popup after 5s, once per session
  useEffect(() => {
    if (sessionStorage.getItem("effect3_cap_seen")) return;
    const t = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("effect3_cap_seen", "1");
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  const pickRandomCap = useCallback(() => {
    const loc = CAP_LOCATIONS[Math.floor(Math.random() * CAP_LOCATIONS.length)];
    setCapLocation(loc);
  }, []);

  const startGame = useCallback(() => {
    pickRandomCap();
    setGameState("playing");
    setTimer(0);
    setClickCount(0);
    setHintVisible(false);
    setWrongMsg(null);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    hintTimeout.current = setTimeout(() => setHintVisible(true), 15000);
  }, [pickRandomCap]);

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimeout.current) clearTimeout(hintTimeout.current);
    startGame();
  }, [startGame]);

  const close = useCallback(() => {
    setVisible(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimeout.current) clearTimeout(hintTimeout.current);
    if (wrongTimeout.current) clearTimeout(wrongTimeout.current);
  }, []);

  const handleCapClick = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimeout.current) clearTimeout(hintTimeout.current);
    setGameState("win");
  }, []);

  const handleWrongClick = useCallback(() => {
    setClickCount((c) => c + 1);
    const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
    setWrongMsg(msg);
    if (wrongTimeout.current) clearTimeout(wrongTimeout.current);
    wrongTimeout.current = setTimeout(() => setWrongMsg(null), 1200);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl border-2 shadow-2xl"
          style={{
            borderColor: "hsl(24 80% 50%)",
            background: "linear-gradient(180deg, hsl(222 84% 6%) 0%, hsl(222 60% 10%) 100%)",
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            imageRendering: "pixelated",
          }}
        >
          {/* ─── Scanline overlay ─── */}
          <div
            className="pointer-events-none absolute inset-0 z-50"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* ─── Close button ─── */}
          <button
            onClick={close}
            className="absolute right-3 top-3 z-50 rounded-lg p-1.5 transition-colors"
            style={{ color: "hsl(215 20% 65%)", background: "hsla(222,40%,15%,0.8)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* ─── INTRO STATE ─── */}
          {gameState === "intro" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14"
            >
              {/* Pixel cap icon */}
              <div className="relative mb-6">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(24 90% 50%), hsl(24 80% 40%))",
                    boxShadow: "0 0 30px hsla(24,90%,50%,0.3), inset 0 2px 0 hsla(0,0%,100%,0.15)",
                  }}
                >
                  <span className="text-4xl" style={{ imageRendering: "pixelated" }}>🧢</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl"
                  style={{ border: "2px solid hsl(24 90% 50%)", opacity: 0.4 }}
                />
              </div>

              <h2
                className="mb-3 text-lg leading-relaxed tracking-wide sm:text-xl"
                style={{ color: "hsl(210 40% 98%)", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(11px, 2.5vw, 16px)" }}
              >
                Find the Hidden<br />
                <span style={{ color: "hsl(24 90% 60%)" }}>EFFECT3</span> Cap
              </h2>

              <p
                className="mb-8 max-w-md leading-relaxed"
                style={{ color: "hsl(215 20% 65%)", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: "1.8" }}
              >
                Our AI agents are busy at work. Spot the cap in the office and unlock a{" "}
                <span style={{ color: "hsl(142 70% 55%)" }}>14-day free trial</span>.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={startGame}
                  className="rounded-lg px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(24 90% 50%), hsl(24 80% 40%))",
                    color: "hsl(0 0% 100%)",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "10px",
                    boxShadow: "0 4px 20px hsla(24,90%,50%,0.35)",
                  }}
                >
                  ▶ Start Game
                </button>
                <button
                  onClick={close}
                  className="rounded-lg px-8 py-3 text-xs uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "hsla(222,40%,18%,0.8)",
                    border: "1px solid hsla(215,20%,30%,0.5)",
                    color: "hsl(215 20% 65%)",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "10px",
                  }}
                >
                  Maybe Later
                </button>
              </div>

              {/* Decorative pixels */}
              <div className="mt-8 flex gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-sm"
                    style={{ background: "hsl(24 90% 50%)" }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── PLAYING STATE ─── */}
          {gameState === "playing" && capLocation && (
            <div className="flex flex-col">
              {/* Top bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid hsla(215,20%,20%,0.6)" }}
              >
                <div className="flex items-center gap-4">
                  <span style={{ color: "hsl(215 20% 65%)", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>
                    ⏱ {formatTime(timer)}
                  </span>
                  <span style={{ color: "hsl(215 20% 50%)", fontFamily: "'Press Start 2P', monospace", fontSize: "7px" }}>
                    Clicks: {clickCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hintVisible && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setWrongMsg(`Hint: Look ${capLocation.label}`)}
                      className="rounded-md p-1.5 transition-colors"
                      style={{ background: "hsla(45,80%,50%,0.15)", color: "hsl(45 80% 60%)" }}
                      title="Get a hint"
                    >
                      <Lightbulb size={14} />
                    </motion.button>
                  )}
                  <button
                    onClick={() => setSoundOn(!soundOn)}
                    className="rounded-md p-1.5 transition-colors"
                    style={{ background: "hsla(215,20%,20%,0.5)", color: "hsl(215 20% 55%)" }}
                  >
                    {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  </button>
                  <button
                    onClick={restart}
                    className="rounded-md p-1.5 transition-colors"
                    style={{ background: "hsla(215,20%,20%,0.5)", color: "hsl(215 20% 55%)" }}
                    title="Restart"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Instruction */}
              <div className="px-4 py-2 text-center" style={{ background: "hsla(222,40%,8%,0.5)" }}>
                <p style={{ color: "hsl(215 20% 55%)", fontFamily: "'Press Start 2P', monospace", fontSize: "7px" }}>
                  🔍 Click the cap with EFFECT3 written on it
                </p>
              </div>

              {/* Office scene */}
              <div
                className="relative mx-4 my-3 overflow-hidden rounded-xl"
                style={{
                  aspectRatio: "16/10",
                  background: "linear-gradient(180deg, hsl(222 50% 14%) 0%, hsl(222 40% 18%) 40%, hsl(222 30% 22%) 100%)",
                  border: "2px solid hsla(215,20%,25%,0.5)",
                  boxShadow: "inset 0 0 60px hsla(222,40%,5%,0.5)",
                }}
              >
                {/* Grid floor */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(hsla(215,20%,25%,0.15) 1px, transparent 1px),
                      linear-gradient(90deg, hsla(215,20%,25%,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "6.25% 10%",
                  }}
                />

                {/* Floor area */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: "30%",
                    background: "linear-gradient(180deg, hsla(222,30%,20%,0) 0%, hsla(222,30%,16%,0.6) 100%)",
                  }}
                />

                {/* Wall line */}
                <div
                  className="absolute left-0 right-0"
                  style={{ top: "38%", height: "1px", background: "hsla(215,20%,30%,0.3)" }}
                />

                {/* ─── Decor items ─── */}
                {DECOR.map((d, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${d.x}%`,
                      top: `${d.y}%`,
                      width: `${d.w}%`,
                      height: `${d.h}%`,
                      ...getDecorStyle(d.type),
                    }}
                  >
                    {d.type === "monitor" && (
                      <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute inset-1 rounded-sm"
                        style={{ background: "hsla(200,80%,50%,0.12)" }}
                      />
                    )}
                    {d.type === "board" && (
                      <div className="absolute inset-2 flex flex-wrap gap-0.5 p-1">
                        {[...Array(6)].map((_, j) => (
                          <div key={j} className="h-1 rounded-sm" style={{ width: `${20 + Math.random() * 30}%`, background: ["hsl(24 80% 50%)", "hsl(200 70% 50%)", "hsl(142 60% 45%)", "hsl(45 80% 55%)", "hsl(280 60% 55%)", "hsl(350 70% 55%)"][j] ?? "hsl(24 80% 50%)", opacity: 0.5 }} />
                        ))}
                      </div>
                    )}
                    {d.type === "poster" && (
                      <div className="flex h-full items-center justify-center">
                        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "4px", color: "hsl(24 80% 55%)", opacity: 0.7 }}>E3</span>
                      </div>
                    )}
                    {d.type === "plant" && (
                      <motion.div
                        animate={{ rotate: [-1, 1, -1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex h-full flex-col items-center justify-end"
                      >
                        <div className="mb-0.5 text-xs" style={{ fontSize: "clamp(10px, 2vw, 16px)" }}>🌿</div>
                        <div className="h-1/4 w-2/5 rounded-sm" style={{ background: "hsl(25 50% 35%)" }} />
                      </motion.div>
                    )}
                    {d.type === "coffee" && (
                      <div className="flex h-full items-center justify-center">
                        <span style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}>☕</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* ─── Agents ─── */}
                {AGENTS.map((agent) => (
                  <motion.div
                    key={agent.id}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${agent.x}%`, top: `${agent.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    {/* Agent body */}
                    <motion.div
                      animate={getAgentAnimation(agent.task)}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative flex flex-col items-center"
                    >
                      {/* Head */}
                      <div
                        className="relative z-10 flex items-center justify-center rounded-sm"
                        style={{
                          width: "clamp(12px, 2.5vw, 18px)",
                          height: "clamp(12px, 2.5vw, 18px)",
                          background: agent.color,
                          boxShadow: `0 0 8px ${agent.color}44`,
                        }}
                      >
                        <span style={{ fontSize: "clamp(6px, 1.2vw, 10px)" }}>{agent.label}</span>
                      </div>
                      {/* Body */}
                      <div
                        className="rounded-sm"
                        style={{
                          width: "clamp(10px, 2vw, 14px)",
                          height: "clamp(14px, 2.8vw, 20px)",
                          background: `${agent.color}88`,
                          marginTop: "-2px",
                        }}
                      />
                    </motion.div>
                    {/* Name tag */}
                    <span
                      className="mt-0.5 whitespace-nowrap rounded-sm px-1"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "3px",
                        color: "hsl(215 20% 55%)",
                        background: "hsla(222,40%,10%,0.7)",
                      }}
                    >
                      {agent.id}
                    </span>
                  </motion.div>
                ))}

                {/* ─── Decoy click areas ─── */}
                {DECOY_ITEMS.map((item, i) => (
                  <button
                    key={`decoy-${i}`}
                    onClick={handleWrongClick}
                    className="absolute cursor-pointer rounded-sm"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.w}%`,
                      height: `${item.h}%`,
                      background: "transparent",
                    }}
                    aria-label={item.label}
                  />
                ))}

                {/* ─── Hidden Cap ─── */}
                <motion.button
                  onClick={handleCapClick}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute z-20 cursor-pointer"
                  style={{
                    left: `${capLocation.x}%`,
                    top: `${capLocation.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-label="EFFECT3 Cap"
                >
                  <div className="relative">
                    <div
                      className="flex items-center justify-center rounded-sm"
                      style={{
                        width: "clamp(16px, 3vw, 24px)",
                        height: "clamp(10px, 2vw, 16px)",
                        background: "linear-gradient(135deg, hsl(24 80% 45%), hsl(24 70% 35%))",
                        boxShadow: "0 1px 4px hsla(0,0%,0%,0.4)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "clamp(2px, 0.6vw, 4px)",
                          color: "hsl(0 0% 100%)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        E3
                      </span>
                    </div>
                    {/* Brim */}
                    <div
                      className="mx-auto rounded-sm"
                      style={{
                        width: "clamp(20px, 3.5vw, 28px)",
                        height: "clamp(3px, 0.6vw, 5px)",
                        background: "hsl(24 70% 35%)",
                        marginTop: "-1px",
                      }}
                    />
                  </div>
                </motion.button>

                {/* ─── Wrong click message ─── */}
                <AnimatePresence>
                  {wrongMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-lg px-4 py-2"
                      style={{
                        background: "hsla(222,60%,8%,0.95)",
                        border: "1px solid hsla(24,80%,50%,0.4)",
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "8px",
                        color: "hsl(24 80% 60%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {wrongMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─── EFFECT3 branding on wall ─── */}
                <div
                  className="absolute"
                  style={{
                    left: "35%",
                    top: "3%",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "clamp(5px, 1vw, 8px)",
                    color: "hsla(24,80%,50%,0.2)",
                    letterSpacing: "2px",
                  }}
                >
                  EFFECT3 HQ
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: "1px solid hsla(215,20%,20%,0.6)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full" style={{ background: "hsl(142 70% 50%)" }} />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "hsl(215 20% 50%)" }}>
                    {AGENTS.length} agents online
                  </span>
                </div>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "hsl(215 20% 40%)" }}>
                  effect3.com
                </span>
              </div>
            </div>
          )}

          {/* ─── WIN STATE ─── */}
          {gameState === "win" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14"
            >
              {/* Trophy */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="relative mb-6"
              >
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(45 90% 50%), hsl(24 80% 45%))",
                    boxShadow: "0 0 40px hsla(45,90%,50%,0.3), 0 0 80px hsla(24,80%,45%,0.15)",
                  }}
                >
                  <Trophy size={40} style={{ color: "hsl(0 0% 100%)" }} />
                </div>
                {/* Sparkle particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -30 - i * 5],
                      x: [(i - 3) * 8, (i - 3) * 15],
                      opacity: [1, 0],
                      scale: [1, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute left-1/2 top-1/2"
                  >
                    <Sparkles size={10} style={{ color: "hsl(45 90% 60%)" }} />
                  </motion.div>
                ))}
              </motion.div>

              <h2
                className="mb-2"
                style={{ color: "hsl(210 40% 98%)", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(11px, 2.5vw, 16px)" }}
              >
                You Found It! 🎉
              </h2>

              <p
                className="mb-2"
                style={{ color: "hsl(142 70% 55%)", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(7px, 1.5vw, 9px)" }}
              >
                Cap located {capLocation?.label}
              </p>

              <div
                className="mb-6 flex gap-6"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "hsl(215 20% 55%)" }}
              >
                <span>⏱ {formatTime(timer)}</span>
                <span>🖱 {clickCount + 1} clicks</span>
              </div>

              <p
                className="mb-8 max-w-sm leading-relaxed"
                style={{ color: "hsl(215 20% 65%)", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: "1.8" }}
              >
                You unlocked a <span style={{ color: "hsl(24 90% 60%)" }}>14-day free trial</span> with Effect3.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    close();
                    // Scroll to booking or open onboarding
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-lg px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(24 90% 50%), hsl(24 80% 40%))",
                    color: "hsl(0 0% 100%)",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                    boxShadow: "0 4px 20px hsla(24,90%,50%,0.35)",
                  }}
                >
                  🏆 Claim My Free Trial
                </button>
                <button
                  onClick={restart}
                  className="rounded-lg px-6 py-3 text-xs uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "hsla(222,40%,18%,0.8)",
                    border: "1px solid hsla(215,20%,30%,0.5)",
                    color: "hsl(215 20% 65%)",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                  }}
                >
                  ↺ Play Again
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getDecorStyle(type: string): React.CSSProperties {
  switch (type) {
    case "desk":
      return { background: "hsl(25 30% 22%)", borderRadius: "2px", boxShadow: "0 2px 4px hsla(0,0%,0%,0.3)" };
    case "monitor":
      return { background: "hsl(222 30% 20%)", borderRadius: "2px", border: "1px solid hsla(215,20%,30%,0.4)" };
    case "chair":
      return { background: "hsl(222 20% 25%)", borderRadius: "2px 2px 0 0" };
    case "shelf":
      return { background: "hsl(25 25% 25%)", borderRadius: "2px", borderBottom: "2px solid hsl(25 20% 18%)" };
    case "board":
      return { background: "hsl(0 0% 92%)", borderRadius: "2px", border: "1px solid hsla(0,0%,70%,0.5)" };
    case "rack":
      return { background: "hsl(222 20% 16%)", borderRadius: "2px", border: "1px solid hsla(215,20%,25%,0.5)" };
    case "coffee":
      return {};
    case "plant":
      return {};
    case "poster":
      return { background: "hsla(24,60%,30%,0.4)", borderRadius: "2px", border: "1px solid hsla(24,50%,40%,0.3)" };
    default:
      return {};
  }
}

function getAgentAnimation(task: string) {
  switch (task) {
    case "typing":
      return { y: [0, -1, 0, -1, 0] };
    case "pointing":
      return { x: [0, 3, 0], rotate: [0, 5, 0] };
    case "clicking":
      return { scale: [1, 1.05, 1] };
    case "building":
      return { rotate: [0, -3, 0, 3, 0] };
    case "writing":
      return { x: [0, 2, 0, -2, 0] };
    case "walking":
      return { x: [0, 5, 0, -5, 0], y: [0, -1, 0, -1, 0] };
    case "analyzing":
      return { y: [0, -2, 0] };
    case "celebrating":
      return { y: [0, -3, 0], rotate: [0, 5, 0, -5, 0] };
    default:
      return { y: [0, -1, 0] };
  }
}
