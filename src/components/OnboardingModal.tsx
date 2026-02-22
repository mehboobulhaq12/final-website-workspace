import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Building2, Globe, Users, BarChart3, MessageSquare, Phone, Zap, Search, PenTool, Eye, Sparkles, User, Mail, Hash, Link, FileText, Target, Bot } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  mode: "audit" | "demo";
}

const BUSINESS_CATEGORIES = [
  { label: "SaaS", icon: <Zap className="w-5 h-5" />, desc: "Software products" },
  { label: "Ecommerce", icon: <Building2 className="w-5 h-5" />, desc: "Online stores" },
  { label: "Agency", icon: <Users className="w-5 h-5" />, desc: "Service providers" },
  { label: "Others", icon: <Globe className="w-5 h-5" />, desc: "Other industries" },
];

const AGENT_OPTIONS = [
  { id: "lead-reviver", label: "Lead Reviver", desc: "The outreach agent that revives dead leads", icon: <MessageSquare className="w-5 h-5" />, subOptions: ["Text Agent", "Call Agent"] },
  { id: "inbound-handler", label: "Inbound Handler", desc: "Handles all business operations automatically", icon: <Zap className="w-5 h-5" /> },
  { id: "ai-call-agent", label: "AI Call Agent", desc: "For outreaches and inbound calling", icon: <Phone className="w-5 h-5" /> },
  { id: "outreach-system", label: "Outreach System", desc: "Find new leads and customers at scale", icon: <Search className="w-5 h-5" /> },
  { id: "content-system", label: "Content System", desc: "Scale your brand with organic content", icon: <PenTool className="w-5 h-5" /> },
  { id: "rerank-system", label: "Rerank System", desc: "Get visible in ChatGPT, Gemini, Claude, Perplexity, Mistral, GLM 5, Kimi K2, DeepSeek", icon: <Eye className="w-5 h-5" /> },
];

const STEPS = [
  { title: "Let's Get Acquainted", subtitle: "Tell us about yourself", icon: <User className="w-4 h-4" /> },
  { title: "Your Brand", subtitle: "Help us understand your business", icon: <Building2 className="w-4 h-4" /> },
  { title: "Your Business", subtitle: "What do you do?", icon: <FileText className="w-4 h-4" /> },
  { title: "Your Numbers", subtitle: "Let's look at the data", icon: <BarChart3 className="w-4 h-4" /> },
  { title: "Your Challenge", subtitle: "What's holding you back?", icon: <Target className="w-4 h-4" /> },
  { title: "Your AI Stack", subtitle: "Choose your agents", icon: <Bot className="w-4 h-4" /> },
];

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i === current ? "w-8 bg-orange-500" : i < current ? "w-4 bg-orange-500/40" : "w-4 bg-white/10"
        }`}
        layoutId={`step-${i}`}
        animate={i === current ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    ))}
  </div>
);

const FloatingOrb = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full bg-orange-500/10 blur-2xl pointer-events-none"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Animated icon that pulses next to input labels */
const LabelIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="inline-flex text-orange-400/60"
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {children}
  </motion.span>
);

/* Typing indicator for active fields */
const TypingDots = () => (
  <div className="flex gap-1 mt-1">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-1 h-1 rounded-full bg-orange-400/40"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
  </div>
);

export default function OnboardingModal({ open, onClose, mode }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({
    name: "", email: "", phone: "",
    brandName: "", category: "", website: "",
    businessDesc: "",
    mrr: "", customers: "", deadCustomers: "",
    problem: "",
    agents: [] as string[],
    leadReviverSub: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = useCallback((field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleAgent = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      agents: prev.agents.includes(id) ? prev.agents.filter(a => a !== id) : [...prev.agents, id],
    }));
  }, []);

  const next = () => { if (step < 5) { setDirection(1); setStep(s => s + 1); } };
  const prev = () => { if (step > 0) { setDirection(-1); setStep(s => s - 1); } };
  
  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate brief delay for UX
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setStep(0);
    setSubmitted(false);
    setData({ name: "", email: "", phone: "", brandName: "", category: "", website: "", businessDesc: "", mrr: "", customers: "", deadCustomers: "", problem: "", agents: [], leadReviverSub: "" });
    onClose();
  };

  if (!open) return null;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.98 }),
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all duration-300 hover:border-white/20";

  const renderStep = () => {
    if (submitted) {
      return (
        <motion.div
          key="done"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center gap-6 py-10"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Check className="w-10 h-10 text-emerald-400" />
            {/* Ripple rings */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-emerald-400/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.4 + i * 0.3, repeat: Infinity }}
              />
            ))}
          </motion.div>
          <motion.h3
            className="text-2xl font-extralight text-white tracking-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You're All Set!
          </motion.h3>
          <motion.p
            className="text-white/50 text-sm text-center max-w-xs"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Our team will review your details and reach out within 24 hours with a personalized {mode === "audit" ? "churn audit" : "demo"}.
          </motion.p>
          <motion.button
            onClick={handleClose}
            className="mt-4 rounded-2xl border border-white/10 bg-white/10 text-white px-6 py-3 text-sm font-light tracking-tight hover:bg-white/20 transition-colors duration-300"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        </motion.div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <User className="w-5 h-5 text-orange-400" />
              </motion.div>
              <span className="text-xs text-orange-300/70">We'll use this to personalize your experience</span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                  <LabelIcon><User className="w-3 h-3" /></LabelIcon> Full Name
                </label>
                <input className={inputClass} placeholder="John Doe" value={data.name} onChange={e => update("name", e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                  <LabelIcon><Phone className="w-3 h-3" /></LabelIcon> Phone Number
                </label>
                <input className={inputClass} placeholder="+1 (555) 000-0000" value={data.phone} onChange={e => update("phone", e.target.value)} />
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                <LabelIcon><Mail className="w-3 h-3" /></LabelIcon> Email Address
              </label>
              <input className={inputClass} type="email" placeholder="john@company.com" value={data.email} onChange={e => update("email", e.target.value)} />
            </motion.div>
            {/* Connection animation */}
            <div className="mt-3 flex items-center justify-center gap-4">
              {["🔒 Secure", "⚡ Fast", "🎯 Personal"].map((badge, i) => (
                <motion.span
                  key={badge}
                  className="text-[10px] text-white/30 border border-white/5 rounded-full px-3 py-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Building2 className="w-5 h-5 text-blue-400" />
              </motion.div>
              <span className="text-xs text-blue-300/70">Tell us about your brand so we can customize agents for you</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                <LabelIcon><Hash className="w-3 h-3" /></LabelIcon> Brand Name
              </label>
              <input className={inputClass} placeholder="Acme Inc." value={data.brandName} onChange={e => update("brandName", e.target.value)} />
            </motion.div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">Business Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUSINESS_CATEGORIES.map((cat, i) => (
                  <motion.button
                    key={cat.label}
                    onClick={() => update("category", cat.label)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                      data.category === cat.label
                        ? "border-orange-500/60 bg-orange-500/10 text-orange-300 shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10"
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      animate={data.category === cat.label ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {cat.icon}
                    </motion.div>
                    <span className="text-xs font-light">{cat.label}</span>
                    <span className="text-[9px] text-white/30">{cat.desc}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                <LabelIcon><Link className="w-3 h-3" /></LabelIcon> Brand Website
              </label>
              <input className={inputClass} placeholder="https://acme.com" value={data.website} onChange={e => update("website", e.target.value)} />
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <FileText className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-xs text-purple-300/70">Help us understand your offer and target market</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="text-xs text-white/40 mb-1.5 block">Describe your business, your offer, and the problem you're solving</label>
              <textarea
                className={`${inputClass} min-h-[140px] resize-none`}
                placeholder="We help [target audience] solve [problem] by [your solution]..."
                value={data.businessDesc}
                onChange={e => update("businessDesc", e.target.value)}
              />
              {data.businessDesc && <TypingDots />}
            </motion.div>
            {/* Word cloud */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {["Growth", "Revenue", "Scale", "Automation", "AI", "Leads", "Convert", "Retain"].map((word, i) => (
                <motion.span
                  key={word}
                  className="text-[10px] text-white/20 border border-white/5 rounded-full px-3 py-1 hover:text-orange-300/40 hover:border-orange-500/20 transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <span className="text-xs text-emerald-300/70">Your numbers help us calculate potential revenue recovery</span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Current MRR", field: "mrr", prefix: "$", placeholder: "10,000", icon: <BarChart3 className="w-3 h-3" />, delay: 0.1 },
                { label: "Current Customers", field: "customers", prefix: "", placeholder: "500", icon: <Users className="w-3 h-3" />, delay: 0.2 },
                { label: "Dead Customers", field: "deadCustomers", prefix: "", placeholder: "150", icon: <Target className="w-3 h-3" />, delay: 0.3 },
              ].map(item => (
                <motion.div
                  key={item.field}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                >
                  <label className="text-xs text-white/40 mb-1.5 flex items-center gap-1.5">
                    <LabelIcon>{item.icon}</LabelIcon> {item.label}
                  </label>
                  <div className="relative">
                    {item.prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">{item.prefix}</span>}
                    <input
                      className={`${inputClass} ${item.prefix ? "pl-8" : ""}`}
                      placeholder={item.placeholder}
                      value={data[item.field as keyof typeof data] as string}
                      onChange={e => update(item.field, e.target.value)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Animated metric bars */}
            <motion.div
              className="mt-4 space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-[10px] text-white/30 uppercase tracking-wider">Revenue Impact Preview</span>
              {[
                { label: "Active", pct: data.customers ? 70 : 0, color: "bg-emerald-500" },
                { label: "At Risk", pct: data.customers ? 20 : 0, color: "bg-orange-500" },
                { label: "Churned", pct: data.deadCustomers ? 40 : 0, color: "bg-red-500" },
              ].map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-[10px] text-white/30 w-12">{bar.label}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${bar.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                  <motion.span
                    className="text-[10px] text-white/40 w-8 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                  >
                    {bar.pct}%
                  </motion.span>
                </div>
              ))}
            </motion.div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Target className="w-5 h-5 text-red-400" />
              </motion.div>
              <span className="text-xs text-red-300/70">Understanding your pain helps us pick the right agents</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="text-xs text-white/40 mb-1.5 block">What's the actual problem you're facing?</label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder="Describe the main challenges blocking your growth..."
                value={data.problem}
                onChange={e => update("problem", e.target.value)}
              />
            </motion.div>
            {/* Problem chips */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {[
                { label: "High Churn", emoji: "📉" },
                { label: "Low Conversions", emoji: "🎯" },
                { label: "No Leads", emoji: "👤" },
                { label: "Manual Ops", emoji: "⚙️" },
                { label: "Scaling Issues", emoji: "📈" },
                { label: "Poor Visibility", emoji: "👁️" },
              ].map((p, i) => (
                <motion.button
                  key={p.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 hover:border-red-500/30 hover:text-red-300/70 hover:bg-red-500/5 transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update("problem", data.problem ? `${data.problem}, ${p.label}` : p.label)}
                >
                  <span>{p.emoji}</span>
                  <span>{p.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Bot className="w-5 h-5 text-orange-400" />
              </motion.div>
              <span className="text-xs text-orange-300/70">Select all agents you want to deploy — we'll customize them</span>
            </motion.div>
            <label className="text-xs text-white/40 block">Select the agents you want to deploy</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AGENT_OPTIONS.map((agent, i) => (
                <motion.button
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    data.agents.includes(agent.id)
                      ? "border-orange-500/60 bg-orange-500/10 shadow-[0_0_25px_-5px_rgba(249,115,22,0.2)]"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`mt-0.5 ${data.agents.includes(agent.id) ? "text-orange-400" : "text-white/40"}`}
                    animate={data.agents.includes(agent.id) ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {agent.icon}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${data.agents.includes(agent.id) ? "text-orange-300" : "text-white/70"}`}>
                      {agent.label}
                    </div>
                    <div className="text-[10px] text-white/30 mt-0.5 leading-relaxed">{agent.desc}</div>
                    {agent.subOptions && data.agents.includes(agent.id) && (
                      <motion.div
                        className="flex gap-2 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        {agent.subOptions.map(sub => (
                          <button
                            key={sub}
                            onClick={e => { e.stopPropagation(); update("leadReviverSub", sub); }}
                            className={`text-[10px] px-3 py-1 rounded-full border transition-all duration-200 ${
                              data.leadReviverSub === sub
                                ? "border-orange-500/60 bg-orange-500/20 text-orange-300"
                                : "border-white/10 text-white/40 hover:border-white/20"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {data.agents.includes(agent.id) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        className="mt-0.5"
                      >
                        <Check className="w-4 h-4 text-orange-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
            {data.agents.length > 0 && (
              <motion.div
                className="text-center text-[10px] text-orange-400/60 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {data.agents.length} agent{data.agents.length > 1 ? "s" : ""} selected — ready to deploy
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <FloatingOrb delay={0} size={200} x="10%" y="20%" />
            <FloatingOrb delay={1.5} size={150} x="70%" y="60%" />
            <FloatingOrb delay={3} size={100} x="50%" y="10%" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-8">
              {!submitted && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <Sparkles className="w-4 h-4 text-orange-400" />
                    </motion.div>
                    <span className="text-[10px] uppercase tracking-widest text-orange-400/70">
                      {mode === "audit" ? "Free Churn Audit" : "Book a Demo"}
                    </span>
                    <span className="ml-auto text-[10px] text-white/20">
                      Step {step + 1} of {STEPS.length}
                    </span>
                  </div>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange-400"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {STEPS[step].icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-extralight text-white tracking-tight">
                            {STEPS[step].title}
                          </h3>
                          <p className="text-sm text-white/40 mt-0.5">{STEPS[step].subtitle}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-4">
                    <StepIndicator current={step} total={STEPS.length} />
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={submitted ? "done" : step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {!submitted && (
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                  <motion.button
                    onClick={prev}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
                    whileHover={step > 0 ? { x: -3 } : {}}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </motion.button>
                  {step < 5 ? (
                    <motion.button
                      onClick={next}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-white px-5 py-2.5 text-sm font-light tracking-tight hover:bg-white/20 transition-colors duration-300"
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex items-center gap-2 rounded-2xl bg-orange-500 text-white px-6 py-2.5 text-sm font-medium tracking-tight hover:bg-orange-600 transition-colors duration-300 disabled:opacity-60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>Submit <Check className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
