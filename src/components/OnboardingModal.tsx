import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  MessageSquare,
  PenTool,
  Phone,
  Scale,
  Search,
  Sparkles,
  Store,
  X,
  Zap,
} from "lucide-react";

import { submitToGoogleSheets } from "@/lib/googleSheets";
import {
  buildOnboardingPayload,
  type FormState,
  type OnboardingMode,
  validateOnboardingSubmission,
} from "@/lib/onboardingSubmission";
import { triggerOnboardingEmailAutomation } from "@/lib/onboardingEmailAutomation";
import { supabase } from "@/integrations/supabase/client";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  mode: OnboardingMode;
  initialProblem?: string;
}

const SYSTEM_REVIEW_FORM_SRC =
  "https://spiral-fish-b54.notion.site/ebd//35117297181e8022b27aff0a10759983";

const ENABLE_PREBOOK_LEAD_CAPTURE = false;

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  brandName: "",
  category: "",
  website: "",
  businessDesc: "",
  mrr: "",
  customers: "",
  deadCustomers: "",
  problem: "",
  agents: [],
  leadReviverSub: "",
};

const BUSINESS_CATEGORIES = [
  { label: "SaaS / Growth", icon: <Zap className="h-5 w-5" /> },
  { label: "D2C / Retail", icon: <Store className="h-5 w-5" /> },
  { label: "Legal / Services", icon: <Scale className="h-5 w-5" /> },
  { label: "Enterprise", icon: <Building2 className="h-5 w-5" /> },
];

const AGENT_OPTIONS = [
  {
    id: "lead-reviver",
    label: "Lead Reviver",
    desc: "Revives dead leads with text or call follow-up.",
    icon: <MessageSquare className="h-5 w-5" />,
    subOptions: ["Text Agent", "Call Agent"],
  },
  {
    id: "inbound-handler",
    label: "Inbound Handler",
    desc: "Handles routing, replies, and intake across channels.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "ai-call-agent",
    label: "AI Call Agent",
    desc: "Runs inbound and outbound call workflows.",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    id: "outreach-system",
    label: "Outreach System",
    desc: "Finds and engages new leads at scale.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    id: "content-system",
    label: "Content System",
    desc: "Turns content into a repeatable growth system.",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    id: "rerank-system",
    label: "Rerank System",
    desc: "Improves visibility across AI search surfaces.",
    icon: <Eye className="h-5 w-5" />,
  },
];

const STEPS = [
  {
    title: "Let's Get Acquainted",
    subtitle: "Tell us about yourself.",
  },
  {
    title: "Your Brand",
    subtitle: "Help us understand your business.",
  },
  {
    title: "Your Business",
    subtitle: "What do you do and who do you serve?",
  },
  {
    title: "Your Numbers",
    subtitle: "Share the operating context.",
  },
  {
    title: "Your Challenge",
    subtitle: "What is actually blocked right now?",
  },
  {
    title: "Your AI Stack",
    subtitle: "Choose the systems you want next.",
  },
];

function getModeCopy(mode: OnboardingMode) {
  if (mode === "audit") {
    return {
      badge: "System Audit",
      title: "Request a System Audit",
      subtitle: "Complete the booking form below.",
      submitLabel: "Request Audit",
      notionTitle: "Book Your System Audit",
      notionSubtitle: "Complete the booking form below to schedule the review.",
    };
  }

  if (mode === "implement") {
    return {
      badge: "Implementation Intake",
      title: "Start Your Implementation",
      subtitle: "Complete the booking form below.",
      submitLabel: "Start Implementation",
      notionTitle: "Book Your Implementation Review",
      notionSubtitle: "Complete the booking form below to schedule the next step.",
    };
  }

  return {
    badge: "System Review",
    title: "Book a System Review",
    subtitle: "Tell us about your workflow first. Then finish booking below.",
    submitLabel: "Continue to Booking",
    notionTitle: "Book a System Review",
    notionSubtitle: "Finish your booking in the form below.",
  };
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1 rounded-full transition-all duration-300 ${
            index === current
              ? "w-8 bg-orange-500"
              : index < current
                ? "w-4 bg-orange-500/40"
                : "w-4 bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function OnboardingModal({
  open,
  onClose,
  mode,
  initialProblem = "",
}: OnboardingModalProps) {
  const modeCopy = useMemo(() => getModeCopy(mode), [mode]);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showNotionForm, setShowNotionForm] = useState(false);

  const isLeadCaptureFlow =
    mode === "demo" && ENABLE_PREBOOK_LEAD_CAPTURE && !showNotionForm;

  useEffect(() => {
    if (!open || !initialProblem.trim()) return;

    setForm((current) =>
      current.problem.trim()
        ? current
        : {
            ...current,
            problem: initialProblem.trim(),
          },
    );
  }, [initialProblem, open]);

  const resetState = useCallback(() => {
    setStep(0);
    setDirection(1);
    setForm(EMPTY_FORM);
    setSubmitting(false);
    setError("");
    setShowNotionForm(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const updateField = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setError("");
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    },
    [],
  );

  const toggleAgent = useCallback((id: string) => {
    setError("");
    setForm((current) => {
      const hasAgent = current.agents.includes(id);
      return {
        ...current,
        agents: hasAgent
          ? current.agents.filter((agent) => agent !== id)
          : [...current.agents, id],
        leadReviverSub:
          id === "lead-reviver" && hasAgent ? "" : current.leadReviverSub,
      };
    });
  }, []);

  const nextStep = useCallback(() => {
    if (step >= STEPS.length - 1) return;
    setDirection(1);
    setStep((current) => current + 1);
  }, [step]);

  const previousStep = useCallback(() => {
    if (step <= 0) return;
    setDirection(-1);
    setStep((current) => current - 1);
  }, [step]);

  const handleLeadSubmit = useCallback(async () => {
    if (submitting) return;

    const validationError = validateOnboardingSubmission(form);
    if (validationError) {
      setStep(validationError.step);
      setError(validationError.error);
      return;
    }

    const payload = buildOnboardingPayload(form, mode);
    const submittedAt = new Date().toISOString();
    const pagePath = window.location.pathname;

    setSubmitting(true);
    setError("");

    const [googleSheetsResult, supabaseResult] = await Promise.allSettled([
      submitToGoogleSheets({
        formType: "onboarding",
        submittedAt,
        pagePath,
        payload,
      }),
      supabase.from("onboarding_submissions").insert({
        mode,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        brand_name: payload.brandName || null,
        category: payload.category || null,
        website: payload.website || null,
        business_desc: payload.businessDesc || null,
        mrr: payload.mrr,
        customers: payload.customers,
        dead_customers: payload.deadCustomers,
        problem: payload.problem || null,
        agents: payload.agents,
        lead_reviver_sub: payload.leadReviverSub || null,
      }),
    ]);

    if (googleSheetsResult.status === "rejected") {
      setSubmitting(false);
      setError("Could not submit right now. Please try again.");
      return;
    }

    if (supabaseResult.status === "rejected" || supabaseResult.value.error) {
      console.warn("Supabase backup save failed for onboarding submission.");
    }

    try {
      await triggerOnboardingEmailAutomation({
        submittedAt,
        pagePath,
        payload,
      });
    } catch {
      console.warn("n8n onboarding email trigger failed.");
    }

    setSubmitting(false);
    setShowNotionForm(true);
  }, [form, mode, submitting]);

  if (!open) return null;

  const slideVariants = {
    enter: (currentDirection: number) => ({
      x: currentDirection > 0 ? 64 : -64,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (currentDirection: number) => ({
      x: currentDirection > 0 ? -64 : 64,
      opacity: 0,
    }),
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors duration-200 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20";

  const renderLeadCaptureStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Full Name</label>
                <input
                  className={inputClass}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Phone Number</label>
                <input
                  className={inputClass}
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/40">Email Address</label>
              <input
                className={inputClass}
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/40">Brand Name</label>
              <input
                className={inputClass}
                placeholder="Acme Inc."
                value={form.brandName}
                onChange={(event) => updateField("brandName", event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/40">Business Category</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BUSINESS_CATEGORIES.map((category) => (
                  <button
                    key={category.label}
                    type="button"
                    onClick={() => updateField("category", category.label)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors duration-200 ${
                      form.category === category.label
                        ? "border-orange-500/60 bg-orange-500/10 text-orange-300"
                        : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {category.icon}
                    <span className="text-xs font-light">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/40">Brand Website</label>
              <input
                className={inputClass}
                placeholder="https://acme.com"
                value={form.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/40">
                Describe your business, your offer, and the problem you solve
              </label>
              <textarea
                className={`${inputClass} min-h-[140px] resize-none`}
                placeholder="We help [target audience] solve [problem] by [your solution]..."
                value={form.businessDesc}
                onChange={(event) => updateField("businessDesc", event.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {["Growth", "Revenue", "Scale", "Automation", "AI", "Leads"].map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-white/5 px-3 py-1 text-[10px] text-white/25"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Current MRR</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">
                    $
                  </span>
                  <input
                    className={`${inputClass} pl-8`}
                    placeholder="10,000"
                    value={form.mrr}
                    onChange={(event) => updateField("mrr", event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Current Customers</label>
                <input
                  className={inputClass}
                  placeholder="500"
                  value={form.customers}
                  onChange={(event) => updateField("customers", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Dead Customers</label>
                <input
                  className={inputClass}
                  placeholder="150"
                  value={form.deadCustomers}
                  onChange={(event) => updateField("deadCustomers", event.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/40">
                What's the actual problem you're facing?
              </label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder="Describe the main challenge blocking growth or conversions..."
                value={form.problem}
                onChange={(event) => updateField("problem", event.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-4">
            <label className="block text-xs text-white/40">
              Select the systems you want to discuss
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AGENT_OPTIONS.map((agent) => {
                const selected = form.agents.includes(agent.id);

                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => toggleAgent(agent.id)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-200 ${
                      selected
                        ? "border-orange-500/60 bg-orange-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className={selected ? "text-orange-400" : "text-white/45"}>
                      {agent.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={selected ? "text-sm text-orange-300" : "text-sm text-white/75"}>
                        {agent.label}
                      </div>
                      <div className="mt-1 text-[10px] leading-relaxed text-white/35">
                        {agent.desc}
                      </div>
                      {agent.subOptions && selected ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {agent.subOptions.map((subOption) => (
                            <button
                              key={subOption}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                updateField("leadReviverSub", subOption);
                              }}
                              className={`rounded-full border px-3 py-1 text-[10px] transition-colors duration-200 ${
                                form.leadReviverSub === subOption
                                  ? "border-orange-500/60 bg-orange-500/20 text-orange-300"
                                  : "border-white/10 text-white/45 hover:border-white/20"
                              }`}
                            >
                              {subOption}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {selected ? <Check className="mt-0.5 h-4 w-4 text-orange-400" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
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

        {isLeadCaptureFlow ? (
          <motion.div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={handleClose}
              aria-label="Close onboarding form"
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-white/10 px-5 py-5 sm:px-7">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span className="text-[10px] uppercase tracking-widest text-orange-400/70">
                  {modeCopy.badge}
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
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-2xl font-extralight tracking-tight text-white">
                    {STEPS[step].title}
                  </h3>
                  <p className="mt-1 text-sm text-white/40">{STEPS[step].subtitle}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4">
                <StepIndicator current={step} total={STEPS.length} />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`step-body-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.24 }}
                >
                  {renderLeadCaptureStep()}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 border-t border-white/5 pt-4">
                {error ? <p className="mb-4 text-xs text-red-400/90">{error}</p> : null}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={step === 0 || submitting}
                    className="flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={submitting}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-light tracking-tight text-white transition-colors duration-200 hover:bg-white/20 disabled:opacity-60"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLeadSubmit}
                      disabled={submitting}
                      className="flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-2.5 text-sm font-medium tracking-tight text-white transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : modeCopy.submitLabel}
                      {!submitting ? <ArrowRight className="h-4 w-4" /> : null}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={handleClose}
              aria-label="Close onboarding form"
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 border-b border-white/10 px-5 py-5 sm:px-7">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span className="text-[10px] uppercase tracking-widest text-orange-400/70">
                  {modeCopy.badge}
                </span>
              </div>
              <h3 className="text-2xl font-extralight tracking-tight text-white">
                {modeCopy.notionTitle}
              </h3>
              <p className="mt-1 text-sm text-white/45">{modeCopy.notionSubtitle}</p>
            </div>

            <iframe
              src={SYSTEM_REVIEW_FORM_SRC}
              title="Effect3 system review form"
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              className="block h-[calc(92vh-132px)] min-h-[360px] w-full bg-white sm:h-[600px]"
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
