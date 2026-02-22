import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Building2, Globe, Users, BarChart3, MessageSquare, Phone, Zap, Search, PenTool, Eye, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  mode: "audit" | "demo";
}

const BUSINESS_CATEGORIES = [
  { label: "SaaS", icon: <Zap className="w-5 h-5" /> },
  { label: "Ecommerce", icon: <Building2 className="w-5 h-5" /> },
  { label: "Agency", icon: <Users className="w-5 h-5" /> },
  { label: "Others", icon: <Globe className="w-5 h-5" /> },
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
  { title: "Let's Get Acquainted", subtitle: "Tell us about yourself" },
  { title: "Your Brand", subtitle: "Help us understand your business" },
  { title: "Your Business", subtitle: "What do you do?" },
  { title: "Your Numbers", subtitle: "Let's look at the data" },
  { title: "Your Challenge", subtitle: "What's holding you back?" },
  { title: "Your AI Stack", subtitle: "Choose your agents" },
];

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1 rounded-full transition-all duration-500 ${
          i === current ? "w-8 bg-orange-500" : i < current ? "w-4 bg-orange-500/40" : "w-4 bg-white/10"
        }`}
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
  const handleSubmit = () => setSubmitted(true);

  const handleClose = () => {
    setStep(0);
    setSubmitted(false);
    setData({ name: "", email: "", phone: "", brandName: "", category: "", website: "", businessDesc: "", mrr: "", customers: "", deadCustomers: "", problem: "", agents: [], leadReviverSub: "" });
    onClose();
  };

  if (!open) return null;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all duration-300";

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
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Check className="w-10 h-10 text-green-400" />
          </motion.div>
          <h3 className="text-2xl font-extralight text-white tracking-tight">You're All Set!</h3>
          <p className="text-white/50 text-sm text-center max-w-xs">
            Our team will review your details and reach out within 24 hours with a personalized {mode === "audit" ? "churn audit" : "demo"}.
          </p>
          <button onClick={handleClose} className="mt-4 rounded-2xl border border-white/10 bg-white/10 text-white px-6 py-3 text-sm font-light tracking-tight hover:bg-white/20 transition-colors duration-300">
            Close
          </button>
        </motion.div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Full Name</label>
                <input className={inputClass} placeholder="John Doe" value={data.name} onChange={e => update("name", e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Phone Number</label>
                <input className={inputClass} placeholder="+1 (555) 000-0000" value={data.phone} onChange={e => update("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email Address</label>
              <input className={inputClass} type="email" placeholder="john@company.com" value={data.email} onChange={e => update("email", e.target.value)} />
            </div>
            {/* Visual: animated connection lines */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-orange-500/60"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Brand Name</label>
              <input className={inputClass} placeholder="Acme Inc." value={data.brandName} onChange={e => update("brandName", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">Business Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUSINESS_CATEGORIES.map(cat => (
                  <button
                    key={cat.label}
                    onClick={() => update("category", cat.label)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                      data.category === cat.label
                        ? "border-orange-500/60 bg-orange-500/10 text-orange-300"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {cat.icon}
                    <span className="text-xs font-light">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Brand Website</label>
              <input className={inputClass} placeholder="https://acme.com" value={data.website} onChange={e => update("website", e.target.value)} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Describe your business, your offer, and the problem you're solving</label>
              <textarea
                className={`${inputClass} min-h-[140px] resize-none`}
                placeholder="We help [target audience] solve [problem] by [your solution]..."
                value={data.businessDesc}
                onChange={e => update("businessDesc", e.target.value)}
              />
            </div>
            {/* Visual: word cloud animation */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {["Growth", "Revenue", "Scale", "Automation", "AI", "Leads"].map((word, i) => (
                <motion.span
                  key={word}
                  className="text-[10px] text-white/20 border border-white/5 rounded-full px-3 py-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <label className="text-xs text-white/40 mb-1.5 block">Current MRR</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                  <input className={`${inputClass} pl-8`} placeholder="10,000" value={data.mrr} onChange={e => update("mrr", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Current Customers</label>
                <input className={inputClass} placeholder="500" value={data.customers} onChange={e => update("customers", e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Dead Customers</label>
                <input className={inputClass} placeholder="150" value={data.deadCustomers} onChange={e => update("deadCustomers", e.target.value)} />
              </div>
            </div>
            {/* Visual: metric bars */}
            <div className="mt-4 space-y-3">
              {[
                { label: "Active", pct: data.customers ? 70 : 0, color: "bg-green-500" },
                { label: "At Risk", pct: data.customers ? 20 : 0, color: "bg-orange-500" },
                { label: "Churned", pct: data.deadCustomers ? 40 : 0, color: "bg-red-500" },
              ].map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-[10px] text-white/30 w-12">{bar.label}</span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${bar.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">What's the actual problem you're facing?</label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder="Describe the main challenges blocking your growth..."
                value={data.problem}
                onChange={e => update("problem", e.target.value)}
              />
            </div>
            {/* Visual: problem pulse */}
            <div className="flex items-center justify-center gap-6 mt-4">
              {["Churn", "Low Conv.", "No Leads", "Manual Ops"].map((p, i) => (
                <motion.div
                  key={p}
                  className="flex flex-col items-center gap-1.5"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5 text-red-400/60" />
                  </div>
                  <span className="text-[9px] text-white/30">{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <label className="text-xs text-white/40 block">Select the agents you want to deploy</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AGENT_OPTIONS.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    data.agents.includes(agent.id)
                      ? "border-orange-500/60 bg-orange-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className={`mt-0.5 ${data.agents.includes(agent.id) ? "text-orange-400" : "text-white/40"}`}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${data.agents.includes(agent.id) ? "text-orange-300" : "text-white/70"}`}>
                      {agent.label}
                    </div>
                    <div className="text-[10px] text-white/30 mt-0.5 leading-relaxed">{agent.desc}</div>
                    {agent.subOptions && data.agents.includes(agent.id) && (
                      <div className="flex gap-2 mt-2">
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
                      </div>
                    )}
                  </div>
                  {data.agents.includes(agent.id) && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-0.5">
                      <Check className="w-4 h-4 text-orange-400" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background orbs */}
            <FloatingOrb delay={0} size={200} x="10%" y="20%" />
            <FloatingOrb delay={1.5} size={150} x="70%" y="60%" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-8">
              {/* Header */}
              {!submitted && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-[10px] uppercase tracking-widest text-orange-400/70">
                      {mode === "audit" ? "Free Churn Audit" : "Book a Demo"}
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
                      <h3 className="text-2xl font-extralight text-white tracking-tight">
                        {STEPS[step].title}
                      </h3>
                      <p className="text-sm text-white/40 mt-1">{STEPS[step].subtitle}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-4">
                    <StepIndicator current={step} total={STEPS.length} />
                  </div>
                </div>
              )}

              {/* Step content */}
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

              {/* Nav buttons */}
              {!submitted && (
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  {step < 5 ? (
                    <button
                      onClick={next}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-white px-5 py-2.5 text-sm font-light tracking-tight hover:bg-white/20 transition-colors duration-300"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 rounded-2xl bg-orange-500 text-white px-6 py-2.5 text-sm font-medium tracking-tight hover:bg-orange-600 transition-colors duration-300"
                    >
                      Submit <Check className="w-4 h-4" />
                    </button>
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
