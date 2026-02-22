import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ── CSS pixel-art AI agent working at a desk ── */

const STEP_TASKS: Record<number, string[]> = {
  0: ["Preparing your profile...", "Setting up secure connection...", "Warming up systems..."],
  1: ["Analyzing your brand...", "Scanning industry data...", "Building brand profile..."],
  2: ["Understanding your offer...", "Mapping target market...", "Parsing business model..."],
  3: ["Crunching your numbers...", "Calculating revenue potential...", "Estimating recovery rate..."],
  4: ["Diagnosing pain points...", "Matching solutions...", "Prioritizing challenges..."],
  5: ["Configuring your agents...", "Deploying AI stack...", "Initializing agent swarm..."],
};

const STEP_COLORS: Record<number, string> = {
  0: "#f97316", // orange
  1: "#3b82f6", // blue
  2: "#a855f7", // purple
  3: "#22c55e", // green
  4: "#ef4444", // red
  5: "#f97316", // orange
};

const DEFAULT_TASKS = [
  "Reviving 23 dead leads...",
  "Sending outreach emails...",
  "Scoring lead sentiment...",
  "Calling warm prospects...",
  "Generating content...",
  "Reranking brand visibility...",
  "Handling inbound tickets...",
  "Analyzing churn risk...",
];

interface PixelArtAgentProps {
  currentStep?: number;
}

const PixelArtAgent = ({ currentStep }: PixelArtAgentProps) => {
  const tasks = currentStep !== undefined ? STEP_TASKS[currentStep] ?? DEFAULT_TASKS : DEFAULT_TASKS;
  const accentColor = currentStep !== undefined ? STEP_COLORS[currentStep] ?? "#f97316" : "#f97316";
  const [taskIdx, setTaskIdx] = useState(0);
  const [leadsProcessed, setLeadsProcessed] = useState(142);

  useEffect(() => {
    setTaskIdx(0);
  }, [currentStep]);

  useEffect(() => {
    const t = setInterval(() => {
      setTaskIdx(i => (i + 1) % tasks.length);
      setLeadsProcessed(p => p + Math.floor(Math.random() * 5) + 1);
    }, 3500);
    return () => clearInterval(t);
  }, [tasks.length]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden" style={{ imageRendering: "auto" }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      {/* Neon header */}
      <motion.div
        className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-center"
        animate={{
          textShadow: [
            "0 0 6px rgba(249,115,22,0.4)",
            "0 0 16px rgba(249,115,22,0.7)",
            "0 0 6px rgba(249,115,22,0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: accentColor }}
      >
        AI Workforce HQ
      </motion.div>

      {/* Agent workspace scene */}
      <div className="relative w-[200px] h-[160px]">
        {/* Desk */}
        <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-[130px]">
          <div className="w-full h-[6px] bg-gradient-to-b from-[#a0522d] to-[#8B4513] rounded-sm shadow-[0_2px_8px_rgba(139,69,19,0.3)]" />
          <div className="flex justify-between px-3">
            <div className="w-[3px] h-[25px] bg-[#6B3410]" />
            <div className="w-[3px] h-[25px] bg-[#6B3410]" />
          </div>
        </div>

        {/* Monitor */}
        <div className="absolute bottom-[42px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[72px] h-[48px] bg-[#0a0a1a] border-2 border-[#2a2a3a] rounded-md overflow-hidden relative shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            {/* Screen content - animated code */}
            <motion.div
              className="absolute inset-0 flex flex-col gap-[3px] p-1.5"
              animate={{ y: [0, -50, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex gap-[2px] items-center">
                  <div className={`h-[2px] rounded-full ${
                    i % 4 === 0 ? "bg-orange-400/80 w-[10px]" :
                    i % 4 === 1 ? "bg-emerald-400/60 w-[16px]" :
                    i % 4 === 2 ? "bg-blue-400/50 w-[12px]" :
                    "bg-purple-400/40 w-[8px]"
                  }`} />
                  <div className={`h-[2px] rounded-full ${
                    i % 3 === 0 ? "bg-white/15 w-[14px]" :
                    i % 3 === 1 ? "bg-cyan-400/30 w-[10px]" :
                    "bg-yellow-400/25 w-[6px]"
                  }`} />
                </div>
              ))}
            </motion.div>
            {/* Screen glow */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(to top, rgba(59,130,246,0.08), transparent)",
                  "linear-gradient(to top, rgba(249,115,22,0.08), transparent)",
                  "linear-gradient(to top, rgba(34,197,94,0.08), transparent)",
                  "linear-gradient(to top, rgba(59,130,246,0.08), transparent)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            {/* Cursor blink */}
            <motion.div
              className="absolute bottom-1.5 right-2 w-[3px] h-[6px] bg-emerald-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          {/* Stand */}
          <div className="w-[4px] h-[4px] bg-[#2a2a3a]" />
          <div className="w-[18px] h-[2px] bg-[#2a2a3a] rounded-sm" />
        </div>

        {/* Agent body */}
        <div className="absolute bottom-[18px] left-[38px] flex flex-col items-center">
          {/* Head with hat */}
          <motion.div
            className="relative"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Cap */}
            <div className="w-[16px] h-[5px] bg-[#4a90d9] rounded-t-sm mx-auto shadow-sm" />
            {/* Face */}
            <div className="w-[14px] h-[12px] bg-[#ffcc99] rounded-b-sm mx-auto relative">
              {/* Eyes - blinking */}
              <motion.div
                className="absolute top-[3px] left-[2px] flex gap-[5px]"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2.5 }}
              >
                <div className="w-[2px] h-[2px] bg-[#333] rounded-full" />
                <div className="w-[2px] h-[2px] bg-[#333] rounded-full" />
              </motion.div>
              {/* Smile */}
              <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[1px] bg-[#c4956e] rounded-full" />
            </div>
          </motion.div>
          {/* Body (shirt) */}
          <div className="w-[16px] h-[14px] bg-[#f97316] rounded-b-sm relative">
            {/* Logo on shirt */}
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] border border-white/40 rounded-sm" />
          </div>
          {/* Arms - active typing */}
          <div className="flex gap-[12px] -mt-[10px]">
            <motion.div
              className="w-[5px] h-[10px] bg-[#ffcc99] rounded-sm origin-top"
              animate={{ rotateZ: [-8, 8, -8], y: [0, 1, 0] }}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
            <motion.div
              className="w-[5px] h-[10px] bg-[#ffcc99] rounded-sm origin-top"
              animate={{ rotateZ: [8, -8, 8], y: [1, 0, 1] }}
              transition={{ duration: 0.28, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Coffee mug on desk */}
        <div className="absolute bottom-[42px] right-[25px]">
          <div className="w-[8px] h-[10px] bg-[#fff] rounded-b-sm border border-white/30 relative">
            {/* Steam */}
            <motion.div
              className="absolute -top-[6px] left-[1px] w-[2px] h-[5px] bg-white/20 rounded-full"
              animate={{ y: [-2, -6], opacity: [0.4, 0], scaleX: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-[4px] left-[4px] w-[2px] h-[4px] bg-white/15 rounded-full"
              animate={{ y: [-2, -5], opacity: [0.3, 0], scaleX: [1, 1.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Keyboard on desk */}
        <div className="absolute bottom-[42px] left-[55px]">
          <div className="w-[28px] h-[6px] bg-[#2a2a3a] rounded-sm border border-white/10 flex items-center justify-center gap-[1px] px-[2px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] h-[2px] bg-white/20 rounded-[0.5px]"
                animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(249,115,22,0.6)", "rgba(255,255,255,0.2)"] }}
                transition={{ duration: 0.5, delay: i * 0.08, repeat: Infinity, repeatDelay: 2 }}
              />
            ))}
          </div>
        </div>

        {/* Plant */}
        <div className="absolute top-[5px] left-[8px]">
          <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity }}>
            <div className="w-[3px] h-[12px] bg-emerald-600 mx-auto" />
            <div className="flex -mt-[8px]">
              <motion.div
                className="w-[6px] h-[6px] bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="w-[5px] h-[5px] bg-emerald-400 rounded-full -ml-[2px] mt-[1px]"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>
          <div className="w-[10px] h-[7px] bg-[#8B4513] rounded-b-sm mx-auto mt-[-1px]" />
        </div>

        {/* Bookshelf */}
        <div className="absolute top-[5px] right-[5px] flex flex-col gap-[2px]">
          {[
            ["bg-red-500/50", "bg-blue-500/50", "bg-emerald-500/50", "bg-yellow-500/50"],
            ["bg-purple-500/50", "bg-pink-500/50", "bg-cyan-500/50"],
          ].map((row, ri) => (
            <div key={ri}>
              <div className="flex gap-[1px]">
                {row.map((c, ci) => (
                  <div key={ci} className={`w-[4px] h-[9px] ${c} rounded-[1px]`} />
                ))}
              </div>
              <div className="w-full h-[2px] bg-[#8B4513]" />
            </div>
          ))}
        </div>
      </div>

      {/* Live task display */}
      <div className="mt-3 w-full max-w-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={taskIdx}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[9px] text-white/50 font-mono truncate">{tasks[taskIdx]}</span>
          </motion.div>
        </AnimatePresence>

        {/* Stats bar */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-orange-400" />
            <span className="text-[8px] text-white/30">{leadsProcessed} processed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[8px] text-white/30">98.7% uptime</span>
          </div>
        </div>

        {/* Activity sparkline */}
        <div className="flex items-end gap-[2px] justify-center mt-2 h-[16px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-t-sm bg-orange-500/40"
              animate={{
                height: [
                  `${4 + Math.random() * 12}px`,
                  `${4 + Math.random() * 12}px`,
                  `${4 + Math.random() * 12}px`,
                ],
              }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelArtAgent;
