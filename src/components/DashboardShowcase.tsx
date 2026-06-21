import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search, Upload, Plus, Settings, Bell, ChevronDown, Download, FileText,
  MoreHorizontal, TrendingUp, TrendingDown, Edit, BellRing, Eye,
  MousePointer2, Mail, MessageSquare, Instagram
} from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import logoImg from "@/assets/logo.png";

/* ── Animated cursor that roams the dashboard ── */
const CURSOR_PATH = [
  { x: 15, y: 12 }, { x: 35, y: 10 }, { x: 55, y: 18 },
  { x: 72, y: 14 }, { x: 85, y: 25 }, { x: 60, y: 40 },
  { x: 30, y: 50 }, { x: 20, y: 65 }, { x: 50, y: 70 },
  { x: 75, y: 60 }, { x: 40, y: 35 }, { x: 15, y: 12 },
];

const AnimatedCursor = ({ disabled = false }: { disabled?: boolean }) => {
  const [pos, setPos] = useState({ x: 15, y: 12 });
  const [clicking, setClicking] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (disabled) return;

    const interval = setInterval(() => {
      idx.current = (idx.current + 1) % CURSOR_PATH.length;
      setPos(CURSOR_PATH[idx.current]);
      // simulate click at certain stops
      if (idx.current % 3 === 0) {
        setClicking(true);
        setTimeout(() => setClicking(false), 200);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [disabled]);

  if (disabled) return null;

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      <MousePointer2
        className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-transform duration-150 ${clicking ? "scale-75" : "scale-100"}`}
        style={{ color: "#f97316", fill: "rgba(249,115,22,0.15)" }}
      />
      {clicking && (
        <motion.div
          className="absolute top-1 left-3 w-6 h-6 rounded-full border-2 border-orange-400/60"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};

/* ── Mini area chart (SVG) ── */
const MiniAreaChart = () => (
  <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="contactedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="respondedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="convertedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Contacted */}
    <path d="M0,80 Q40,60 80,55 T160,40 T240,35 T300,30 V120 H0Z" fill="url(#contactedGrad)" />
    <path d="M0,80 Q40,60 80,55 T160,40 T240,35 T300,30" fill="none" stroke="#f97316" strokeWidth="2" />
    {/* Responded */}
    <path d="M0,95 Q40,85 80,80 T160,65 T240,60 T300,55 V120 H0Z" fill="url(#respondedGrad)" />
    <path d="M0,95 Q40,85 80,80 T160,65 T240,60 T300,55" fill="none" stroke="#3b82f6" strokeWidth="2" />
    {/* Converted */}
    <path d="M0,110 Q40,105 80,100 T160,95 T240,92 T300,88 V120 H0Z" fill="url(#convertedGrad)" />
    <path d="M0,110 Q40,105 80,100 T160,95 T240,92 T300,88" fill="none" stroke="#22c55e" strokeWidth="2" />
    {/* X axis labels */}
    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
      <text key={d} x={i * 50} y="118" fill="#666" fontSize="8" textAnchor="middle">{d}</text>
    ))}
  </svg>
);

/* ── Donut chart ── */
const DonutChart = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24">
    <circle cx="50" cy="50" r="35" fill="none" stroke="#333" strokeWidth="12" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#f97316" strokeWidth="12"
      strokeDasharray="162 220" strokeDashoffset="0" strokeLinecap="round"
      className="transform -rotate-90 origin-center" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="12"
      strokeDasharray="44 220" strokeDashoffset="-162" strokeLinecap="round"
      className="transform -rotate-90 origin-center" />
    <text x="50" y="47" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">45%</text>
    <text x="50" y="58" textAnchor="middle" fill="#888" fontSize="7">EMAIL</text>
  </svg>
);

/* ── Stat Card ── */
const StatCard = ({ label, value, change, up, period = "Week" }: {
  label: string; value: string; change: string; up: boolean; period?: string;
}) => (
  <div className="bg-[#111] rounded-xl border border-white/5 p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/50">{label}</span>
      <div className="flex items-center gap-1 text-[10px] text-white/30">
        <span>{period}</span>
        <MoreHorizontal className="w-3 h-3" />
      </div>
    </div>
    <span className="text-2xl font-bold text-white">{value}</span>
    <div className="flex items-center gap-1">
      {up ? (
        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" /> {change}
        </span>
      ) : (
        <span className="text-[10px] text-red-400 flex items-center gap-0.5">
          <TrendingDown className="w-3 h-3" /> {change}
        </span>
      )}
      <span className="text-[10px] text-white/30">vs last period</span>
    </div>
  </div>
);

/* ── User row ── */
const UserRow = ({ name, email, type, msg, time, sentiment, converted, initial, color }: {
  name: string; email: string; type: string; msg: string; time: string;
  sentiment: string; converted: string; initial: string; color: string;
}) => (
  <div className="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr] items-center py-2.5 border-b border-white/5 text-xs">
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${color}`}>{initial}</div>
      <div>
        <div className="text-white text-[11px] font-medium">{name}</div>
        <div className="text-white/30 text-[9px]">{email}</div>
      </div>
    </div>
    <div className="flex items-center gap-1 text-white/50">
      <MessageSquare className="w-3 h-3" /> {type}
    </div>
    <div>
      <div className="text-white/70 text-[11px]">"{msg}"</div>
      <div className="text-white/30 text-[9px]">{time}</div>
    </div>
    <span className={`text-[10px] px-2 py-0.5 rounded-full w-fit ${sentiment === "Positive" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
      {sentiment}
    </span>
    <span className={`text-[10px] px-2 py-0.5 rounded-full w-fit font-bold ${converted === "CONVERTED" ? "bg-emerald-500/20 text-emerald-400" : "text-white/40"}`}>
      {converted}
    </span>
    <div className="flex justify-end">
      <MoreHorizontal className="w-3.5 h-3.5 text-white/30" />
    </div>
  </div>
);

/* ── Main Dashboard Showcase ── */
const DASHBOARD_WIDTH = 1100;

const DashboardShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardContentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [isMobile, setIsMobile] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const availableWidth = containerRef.current.offsetWidth;
      const nextZoom = availableWidth < DASHBOARD_WIDTH ? availableWidth / DASHBOARD_WIDTH : 1;
      setZoom(nextZoom);
      setIsMobile(window.innerWidth < 768);

      if (dashboardContentRef.current) {
        setScaledHeight(dashboardContentRef.current.offsetHeight * nextZoom);
      }
    };

    update();
    window.addEventListener("resize", update);

    let observer: ResizeObserver | null = null;
    if (dashboardContentRef.current) {
      observer = new ResizeObserver(update);
      observer.observe(dashboardContentRef.current);
    }

    return () => {
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!frameRef.current || zoom < 1 || isMobile) return;
    const rect = frameRef.current.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left) / rect.width;
    const yNorm = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (yNorm - 0.5) * -6, y: (xNorm - 0.5) * 6 });
    setSpotlight({ x: xNorm * 100, y: yNorm * 100, active: true });
  }, [zoom, isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpotlight(s => ({ ...s, active: false }));
  }, []);

  return (
    <section className="w-full py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Glow effects behind the frame */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-white/70">Live Agent Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight leading-[1.08]">
            See Your AI Agents{" "}
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              In Action
            </TextShimmer>
          </h2>
          <p className="text-white/40 mt-2 text-sm max-w-xl mx-auto">
            Real-time visibility into every conversation, conversion, and campaign your agents run.
          </p>
        </motion.div>

        {/* Dashboard frame  -  scales down on mobile to fit in view */}
        <div ref={containerRef} className="w-full">
        <div
          className="relative w-full overflow-hidden"
          style={zoom < 1 && scaledHeight ? { height: `${scaledHeight}px` } : undefined}
        >
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl border border-white/10 shadow-[0_0_80px_-20px_rgba(249,115,22,0.15)] overflow-hidden transition-transform duration-200 ease-out"
          style={{
            width: zoom < 1 ? `${DASHBOARD_WIDTH}px` : "100%",
            transform: isMobile
              ? `scale(${zoom})`
              : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {/* Shimmer border effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-20">
            <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-[shimmerBorder_4s_ease-in-out_infinite]" style={{ backgroundSize: "200% 100%" }} />
          </div>

          {/* Mouse-following spotlight glow */}
          {!isMobile && spotlight.active && (
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(249,115,22,0.08), transparent 60%)`,
              }}
            />
          )}

          {/* Zoom down on mobile to fit entire dashboard */}
            <motion.div
              ref={dashboardContentRef}
              className="relative bg-[#0a0a0a]"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                WebkitTextSizeAdjust: "none",
              }}
            >
              {/* Animated cursor */}
              <AnimatedCursor />

              {/* Top navbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0d0d0d]">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="Effect3" className="h-6" />
              <div className="flex items-center bg-white/5 rounded-lg px-3 py-1.5 gap-2 w-48">
                <Search className="w-3 h-3 text-white/30" />
                <span className="text-[10px] text-white/30">Search leads, campaigns...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-[10px] text-white/60 border border-white/10 rounded-lg px-2.5 py-1.5">
                <Upload className="w-3 h-3" /> Upload Leads
              </button>
              <button className="flex items-center gap-1 text-[10px] text-white bg-orange-500 rounded-lg px-2.5 py-1.5 font-medium">
                <Plus className="w-3 h-3" /> New Campaign
              </button>
              <Settings className="w-3.5 h-3.5 text-white/30" />
              <Bell className="w-3.5 h-3.5 text-white/30" />
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                <span className="text-[10px] text-white/70">Alex Morgan</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-6 px-5 py-2.5 border-b border-white/5 text-[11px]">
            {["Dashboard", "Leads Analysis", "Campaigns", "Voice Agents", "Reports", "Settings"].map((tab, i) => (
              <span key={tab} className={`pb-1.5 ${i === 0 ? "text-orange-400 border-b-2 border-orange-400 font-medium" : "text-white/40"}`}>
                {tab}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Dashboard Overview</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-[10px] text-white/50 border border-white/10 rounded-lg px-2.5 py-1.5">
                  Weekly <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-1 text-[10px] text-white/50 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <Download className="w-3 h-3" /> CSV
                </button>
                <button className="flex items-center gap-1 text-[10px] text-white/50 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <FileText className="w-3 h-3" /> PDF
                </button>
              </div>
            </div>

            {/* Stats + Sponsored grid */}
            <div className="grid grid-cols-5 gap-3 mb-4">
              <StatCard label="Leads Uploaded" value="3,598" change="12.5%" up />
              <StatCard label="Leads Contacted" value="2,096" change="8.2%" up />
              <StatCard label="Leads Rejected" value="289" change="1.2%" up={false} />
              <StatCard label="Ongoing Conversations" value="69" change="5.2%" up period="Active" />
              <div className="bg-[#111] rounded-xl border border-white/5 p-4">
                <span className="text-xs font-semibold text-white">Sponsored</span>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col items-center gap-1.5 bg-white/5 rounded-lg p-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Edit className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-[9px] text-white/50 text-center leading-tight">Create a Sponsored Post</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 bg-white/5 rounded-lg p-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <BellRing className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-[9px] text-white/50 text-center leading-tight">Create Push Notification</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-[2fr_1.2fr_1fr] gap-3 mb-4">
              {/* Outreach Performance */}
              <div className="bg-[#111] rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white">Outreach Performance</span>
                  <div className="flex items-center gap-3 text-[9px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Contacted</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Responded</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Converted</span>
                  </div>
                </div>
                <div className="h-32">
                  <MiniAreaChart />
                </div>
              </div>

              {/* Channel Analytics */}
              <div className="bg-[#111] rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Channel & Agent Analytics</span>
                  <MoreHorizontal className="w-3 h-3 text-white/30" />
                </div>
                <div className="flex items-center gap-4">
                  <DonutChart />
                  <div className="flex flex-col gap-2 text-[9px]">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-orange-400" /> <span className="text-white/50">Email</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-emerald-400" /> <span className="text-white/50">WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Instagram className="w-3 h-3 text-pink-400" /> <span className="text-white/50">Instagram</span>
                    </div>
                    <div className="mt-1 text-white/30">
                      <span className="text-orange-400 font-bold text-sm">8.5k</span> Leads
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsored Posts & Push */}
              <div className="flex flex-col gap-3">
                <div className="bg-[#111] rounded-xl border border-white/5 p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Sponsored Posts</span>
                    <span className="text-[9px] text-white/30">This Week</span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">5 Posts</div>
                  <div className="flex items-center gap-4 mt-2 text-[9px] text-white/40">
                    <div><Eye className="w-3 h-3 inline mr-0.5" /> 11,970</div>
                    <div>Clicks 5,600</div>
                    <span className="text-emerald-400">✓ 13.9%</span>
                  </div>
                </div>
                <div className="bg-[#111] rounded-xl border border-white/5 p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Push Notifications</span>
                    <span className="text-[9px] text-white/30">This Week</span>
                  </div>
                  <div className="text-xl font-bold text-orange-400 mt-1">9 Notifications</div>
                  <div className="flex items-center gap-4 mt-2 text-[9px] text-white/40">
                    <div><Eye className="w-3 h-3 inline mr-0.5" /> 11,970</div>
                    <div>Clicks 5,600</div>
                    <span className="text-emerald-400">✓ 10.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live User Activity */}
            <div className="bg-[#111] rounded-xl border border-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">Live User Activity</span>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live Updates
                </div>
              </div>
              {/* Header */}
              <div className="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr] text-[9px] text-white/30 pb-2 border-b border-white/5 font-medium">
                <span>User</span><span>Type</span><span>Latest Interaction</span>
                <span>Sentiment</span><span>Conversion</span><span className="text-right">Action</span>
              </div>
              <UserRow initial="E" color="bg-purple-500" name="Emma Thompson" email="emma.thompson55@example.com" type="SaaS" msg="Wow, that's really helpful. Thanks!" time="Just now" sentiment="Positive" converted="No" />
              <UserRow initial="L" color="bg-blue-500" name="Liam Wilson" email="liam.wilson88@example.com" type="Ecommerce" msg="Can you send me the link?" time="Just now" sentiment="Positive" converted="CONVERTED" />
              <UserRow initial="S" color="bg-emerald-500" name="Sofia Martinez" email="sofia.m@example.com" type="Agency" msg="I'd like to schedule a demo" time="2 min ago" sentiment="Positive" converted="No" />
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </motion.div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
