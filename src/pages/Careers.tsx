import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Building2, MapPin, ArrowDown, Send, User, Mail, FileText, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ShaderBackground from "@/components/ShaderBackground";
import { TextShimmer } from "@/components/ui/text-shimmer";

type Department = "All" | "Engineering" | "Marketing" | "Growth";

const jobs = [
  {
    title: "AI Engineer / ML Engineer",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Engineering" as Department,
    description:
      "Design, train, and deploy AI/ML models that power our revenue recovery agents. You'll work on NLP pipelines, fine-tuning LLMs, and building intelligent automation systems at scale.",
  },
  {
    title: "Python Developer",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Engineering" as Department,
    description:
      "Build robust backend services and data pipelines in Python. You'll develop APIs, integrate third-party platforms, and ensure our AI agents communicate seamlessly across channels.",
  },
  {
    title: "Content Strategist",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Marketing" as Department,
    description:
      "Craft compelling narratives and conversion-focused content for AI-driven outreach campaigns. You'll shape the voice that re-engages churned customers and drives measurable outcomes.",
  },
  {
    title: "GTM Engineer",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Growth" as Department,
    description:
      "Own the go-to-market engineering stack—building sales automation, CRM integrations, and analytics dashboards that accelerate pipeline velocity and customer acquisition.",
  },
  {
    title: "AEO / SEO Specialist",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Marketing" as Department,
    description:
      "Drive organic growth through advanced SEO and Answer Engine Optimization strategies. You'll optimize content for AI-powered search, build authority, and increase qualified inbound traffic.",
  },
  {
    title: "Meta Ads Analyst",
    type: "Full Time",
    mode: "Remote",
    location: "Worldwide",
    department: "Marketing" as Department,
    description:
      "Plan, execute, and optimize high-performance Meta advertising campaigns. You'll analyze data, manage budgets, and continuously improve ROAS for our clients' acquisition funnels.",
  },
];

const departments: Department[] = ["All", "Engineering", "Marketing", "Growth"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Careers() {
  const [activeDept, setActiveDept] = useState<Department>("All");
  const [formData, setFormData] = useState({ name: "", email: "", role: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  const filtered = activeDept === "All" ? jobs : jobs.filter((j) => j.department === activeDept);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${formData.role || "General"} — Application`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:ibrahim@theeffect3.com?subject=${subject}&body=${body}`, "_blank");
    setFormStatus("sent");
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-black text-white">
      <Navbar />

      {/* Hero with Shader */}
      <section className="relative min-h-[70vh] w-full overflow-hidden flex items-end">
        <ShaderBackground />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-10 lg:px-16 pb-16 pt-32 sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-8 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                Hiring Now
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] max-w-2xl">
              Your Work Should Have an Impact.{" "}
              <TextShimmer
                as="span"
                duration={2}
                spread={4}
                className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
              >
                Here, It Will.
              </TextShimmer>
            </h1>

            <p className="mt-6 text-base md:text-lg font-light text-white/50 max-w-lg leading-relaxed tracking-tight">
              We're a team of engineers and strategists solving the biggest operational challenges for growing companies. If you care deeply about craft, you're in the right place.
            </p>

            <a
              href="#roles"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
            >
              View Open Roles <ArrowDown size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="roles" className="relative px-6 md:px-10 lg:px-16 py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
          {/* Left — Title + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">Find Your Role</h2>
            <p className="mt-3 text-sm font-light text-white/40 leading-relaxed tracking-tight">
              We are looking for individuals who thrive in ambiguity and care deeply about craft.
            </p>
            <div className="mt-4 h-px w-8 bg-white/20" />

            {/* Department Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-light tracking-tight transition-all duration-200 border ${
                    activeDept === dept
                      ? "border-orange-400/30 bg-orange-500/10 text-orange-300"
                      : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Job Cards */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((job, i) => (
                <motion.div
                  key={job.title}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  variants={fadeUp}
                  layout
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-medium tracking-tight text-white/90">
                      {job.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/30">
                      {job.department}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-white/35">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 size={12} /> {job.mode}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {job.location}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-light text-white/45 leading-relaxed tracking-tight">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="text-sm font-light text-white/30 py-8 text-center">No open roles in this department right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* Apply Section — Contact Form + Protocol */}
      <section className="relative px-6 md:px-10 lg:px-16 pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">Apply Now</h2>
            <p className="text-sm font-light text-white/40 leading-relaxed tracking-tight mb-6">
              Fill out the form and we'll open your email client with the details pre-filled.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-9 pr-4 py-3 text-sm font-light text-white/80 placeholder:text-white/25 outline-none focus:border-white/15 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  maxLength={255}
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-9 pr-4 py-3 text-sm font-light text-white/80 placeholder:text-white/25 outline-none focus:border-white/15 transition-colors"
                />
              </div>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-9 pr-4 py-3 text-sm font-light text-white/80 outline-none focus:border-white/15 transition-colors appearance-none [&>option]:bg-black"
                >
                  <option value="" disabled>Select Role</option>
                  {jobs.map((j) => (
                    <option key={j.title} value={j.title}>{j.title}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FileText size={14} className="absolute left-3 top-4 text-white/25" />
                <textarea
                  placeholder="Brief note about a project you led end-to-end..."
                  required
                  maxLength={1000}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-9 pr-4 py-3 text-sm font-light text-white/80 placeholder:text-white/25 outline-none focus:border-white/15 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
              >
                {formStatus === "sent" ? "Email Client Opened ✓" : (
                  <>Send Application <Send size={14} /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Protocol Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">How to Apply</h2>
              <p className="text-sm font-light text-white/40 leading-relaxed tracking-tight">
                We value clear communication and tangible examples over lengthy cover letters.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-light text-white/30">
                <Clock size={12} /> Response time: Typically 48–72 hours.
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 font-mono text-sm">
              <div className="text-white/30 text-xs mb-4 tracking-wider">submission_protocol.txt</div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-white/25 uppercase text-xs w-16 shrink-0">To:</span>
                  <a href="mailto:ibrahim@theeffect3.com" className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    ibrahim@theeffect3.com
                  </a>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/25 uppercase text-xs w-16 shrink-0">Subject:</span>
                  <span className="text-white/40">"[Role Title] — Application"</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/25 uppercase text-xs w-16 shrink-0">Body:</span>
                  <span className="text-white/50">
                    Please include your resume/LinkedIn and a brief note on a project you led end-to-end.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
