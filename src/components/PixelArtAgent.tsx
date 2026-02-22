import { motion } from "framer-motion";

/* 
  CSS-based isometric pixel-art AI agent working at a desk.
  Everything is built with divs, borders, and CSS — no images.
*/

const PixelArtAgent = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" style={{ imageRendering: "pixelated" }}>
      {/* Room floor (isometric diamond) */}
      <div className="relative w-[280px] h-[200px]">
        {/* Floor */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[110px] bg-[#1a1a2e] border border-white/5"
          style={{ transform: "translateX(-50%) rotateX(60deg) rotateZ(45deg)", transformOrigin: "center" }}
        />

        {/* Desk */}
        <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2">
          <div className="relative">
            {/* Desk top */}
            <div className="w-[120px] h-[8px] bg-[#8B4513] rounded-sm border border-[#6B3410] mx-auto" />
            {/* Desk legs */}
            <div className="flex justify-between px-2">
              <div className="w-[4px] h-[30px] bg-[#6B3410]" />
              <div className="w-[4px] h-[30px] bg-[#6B3410]" />
            </div>
          </div>
        </div>

        {/* Monitor */}
        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2">
          <div className="relative flex flex-col items-center">
            {/* Screen */}
            <div className="w-[60px] h-[40px] bg-[#0f0f23] border-2 border-[#333] rounded-sm overflow-hidden relative">
              {/* Screen content - scrolling code lines */}
              <motion.div
                className="absolute inset-0 flex flex-col gap-[3px] p-1"
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex gap-[2px]">
                    <div className={`h-[2px] rounded-full ${i % 3 === 0 ? "bg-orange-400/80 w-[8px]" : i % 3 === 1 ? "bg-emerald-400/60 w-[14px]" : "bg-blue-400/50 w-[10px]"}`} />
                    <div className={`h-[2px] rounded-full ${i % 2 === 0 ? "bg-white/20 w-[12px]" : "bg-purple-400/40 w-[6px]"}`} />
                  </div>
                ))}
              </motion.div>
              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
            </div>
            {/* Monitor stand */}
            <div className="w-[4px] h-[6px] bg-[#333]" />
            <div className="w-[16px] h-[3px] bg-[#333] rounded-sm" />
          </div>
        </div>

        {/* Agent character */}
        <div className="absolute bottom-[30px] left-1/2 ml-[-40px]">
          <div className="flex flex-col items-center">
            {/* Head */}
            <motion.div
              className="relative"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Hair/hat */}
              <div className="w-[16px] h-[4px] bg-[#4a90d9] rounded-t-sm mx-auto" />
              {/* Face */}
              <div className="w-[14px] h-[12px] bg-[#ffcc99] rounded-sm mx-auto relative">
                {/* Eyes */}
                <motion.div
                  className="absolute top-[3px] left-[2px] flex gap-[4px]"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="w-[2px] h-[2px] bg-[#333] rounded-full" />
                  <div className="w-[2px] h-[2px] bg-[#333] rounded-full" />
                </motion.div>
              </div>
            </motion.div>
            {/* Body */}
            <div className="w-[14px] h-[14px] bg-[#f97316] rounded-sm" />
            {/* Arms - typing animation */}
            <div className="flex gap-[10px] -mt-[8px]">
              <motion.div
                className="w-[6px] h-[8px] bg-[#ffcc99] rounded-sm"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <motion.div
                className="w-[6px] h-[8px] bg-[#ffcc99] rounded-sm"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </div>
          </div>
        </div>

        {/* Floating task indicators */}
        {[
          { label: "Reviving leads...", color: "bg-orange-500", x: "right-0", y: "top-[10px]", delay: 0 },
          { label: "Sending emails...", color: "bg-blue-500", x: "right-[-10px]", y: "top-[35px]", delay: 1.5 },
          { label: "Scoring leads...", color: "bg-emerald-500", x: "right-[10px]", y: "top-[60px]", delay: 3 },
        ].map((task, i) => (
          <motion.div
            key={i}
            className={`absolute ${task.x} ${task.y} flex items-center gap-1.5`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: [0, 1, 1, 0], x: [20, 0, 0, -10] }}
            transition={{ duration: 4, delay: task.delay, repeat: Infinity, repeatDelay: 8 }}
          >
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${task.color}`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[8px] text-white/60 whitespace-nowrap font-mono">{task.label}</span>
          </motion.div>
        ))}

        {/* Activity particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 rounded-full bg-orange-400/40"
            style={{ left: `${30 + i * 12}%`, bottom: "60px" }}
            animate={{
              y: [0, -30 - i * 10, -60],
              opacity: [0, 0.8, 0],
              x: [0, (i % 2 === 0 ? 10 : -10)],
            }}
            transition={{ duration: 2 + i * 0.3, delay: i * 0.5, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}

        {/* Neon sign on wall */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5], textShadow: ["0 0 4px rgba(249,115,22,0.5)", "0 0 12px rgba(249,115,22,0.8)", "0 0 4px rgba(249,115,22,0.5)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: "#f97316" }}
        >
          AI WORKFORCE
        </motion.div>

        {/* Bookshelf */}
        <div className="absolute top-[15px] right-[10px] flex flex-col gap-[2px]">
          {[["bg-red-500/60", "bg-blue-500/60", "bg-green-500/60"], ["bg-yellow-500/60", "bg-purple-500/60", "bg-pink-500/60"]].map((row, ri) => (
            <div key={ri} className="flex gap-[1px]">
              {row.map((c, ci) => (
                <div key={ci} className={`w-[4px] h-[8px] ${c} rounded-[1px]`} />
              ))}
            </div>
          ))}
          <div className="w-[16px] h-[2px] bg-[#8B4513]" />
        </div>

        {/* Plant */}
        <div className="absolute top-[20px] left-[15px]">
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-[3px] h-[10px] bg-emerald-600 mx-auto" />
            <div className="flex gap-[1px] -mt-[6px]">
              <div className="w-[5px] h-[5px] bg-emerald-500 rounded-full" />
              <div className="w-[5px] h-[5px] bg-emerald-400 rounded-full -ml-[2px]" />
            </div>
          </motion.div>
          <div className="w-[8px] h-[6px] bg-[#8B4513] rounded-b-sm mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default PixelArtAgent;
