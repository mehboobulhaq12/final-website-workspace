import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ChevronRight,
  Compass,
  Database,
  Eye,
  FileText,
  Globe,
  LayoutDashboard,
  MessageSquareText,
  Radar,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import SeoHead from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  actionItems,
  engineMeta,
  industryRanking,
  promptRecords,
  topBots,
  topPages,
  trendData,
  type EngineKey,
  type PromptCategory,
  type PromptIntent,
  type PromptRecord,
} from "@/lib/aeo-dashboard-data";
import { monitoringWorkflow, trackedKeywords, trackedPages } from "@/lib/rankingMonitorData";

type EngineFilter = "overall" | EngineKey;

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Prompt Tracker", icon: MessageSquareText, active: false },
  { label: "Content Gaps", icon: FileText, active: false },
  { label: "Crawler Signals", icon: Bot, active: false },
  { label: "Pages", icon: Globe, active: false },
  { label: "Actions", icon: Compass, active: false },
];

const categories: Array<"All" | PromptCategory> = [
  "All",
  ...Array.from(new Set(promptRecords.map((record) => record.category))),
];

const intents: Array<"All" | PromptIntent> = [
  "All",
  ...Array.from(new Set(promptRecords.map((record) => record.intent))),
];

const engineKeys = Object.keys(engineMeta) as EngineKey[];

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getCompositeRank(prompt: PromptRecord) {
  return average(engineKeys.map((engine) => prompt.engines[engine].rank));
}

function getRank(prompt: PromptRecord, engine: EngineFilter) {
  if (engine === "overall") {
    return getCompositeRank(prompt);
  }

  return prompt.engines[engine].rank;
}

function getMovement(prompt: PromptRecord, engine: EngineFilter) {
  if (engine === "overall") {
    return average(engineKeys.map((key) => prompt.engines[key].movement));
  }

  return prompt.engines[engine].movement;
}

function getIsCited(prompt: PromptRecord, engine: EngineFilter) {
  if (engine === "overall") {
    return prompt.citationRate >= 50;
  }

  return prompt.engines[engine].cited;
}

function getMentionState(prompt: PromptRecord, engine: EngineFilter) {
  if (engine === "overall") {
    if (prompt.mentionRate >= 75) return "Strong";
    if (prompt.mentionRate >= 55) return "Present";
    return "Weak";
  }

  return prompt.engines[engine].mention;
}

function getMentionColor(state: "Strong" | "Present" | "Weak") {
  if (state === "Strong") return "bg-emerald-500/12 text-emerald-300 border-emerald-500/20";
  if (state === "Present") return "bg-sky-500/12 text-sky-300 border-sky-500/20";
  return "bg-zinc-500/12 text-zinc-300 border-zinc-500/20";
}

function MetricCard({
  label,
  value,
  detail,
  change,
  positive = true,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  change: string;
  positive?: boolean;
  icon: typeof Activity;
}) {
  return (
    <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-semibold tracking-tight text-white">{value}</h3>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                  positive
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    : "border-rose-500/20 bg-rose-500/10 text-rose-300",
                )}
              >
                {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {change}
              </span>
            </div>
            <p className="text-sm text-zinc-400">{detail}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-zinc-200">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InlineBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/6">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export default function AeoDashboard() {
  const [engine, setEngine] = useState<EngineFilter>("overall");
  const [category, setCategory] = useState<"All" | PromptCategory>("All");
  const [intent, setIntent] = useState<"All" | PromptIntent>("All");
  const [query, setQuery] = useState("");

  const latestTrend = trendData[trendData.length - 1];
  const previousTrend = trendData[trendData.length - 2];

  const filteredPrompts = useMemo(() => {
    return promptRecords
      .filter((record) => (category === "All" ? true : record.category === category))
      .filter((record) => (intent === "All" ? true : record.intent === intent))
      .filter((record) => record.prompt.toLowerCase().includes(query.trim().toLowerCase()))
      .sort((a, b) => getRank(a, engine) - getRank(b, engine));
  }, [category, engine, intent, query]);

  const metrics = useMemo(() => {
    const promptCount = filteredPrompts.length || 1;
    const visibilityScore =
      engine === "overall"
        ? Math.round(average(engineKeys.map((key) => latestTrend[key])))
        : latestTrend[engine];
    const previousVisibility =
      engine === "overall"
        ? Math.round(average(engineKeys.map((key) => previousTrend[key])))
        : previousTrend[engine];
    const citationRate =
      engine === "overall"
        ? Math.round(average(filteredPrompts.map((record) => record.citationRate)))
        : Math.round(
            (filteredPrompts.filter((record) => record.engines[engine].cited).length / Math.max(filteredPrompts.length, 1)) *
              100,
          );
    const mentionRate =
      engine === "overall"
        ? Math.round(average(filteredPrompts.map((record) => record.mentionRate)))
        : Math.round(
            (filteredPrompts.filter((record) => record.engines[engine].mention !== "Weak").length /
              Math.max(filteredPrompts.length, 1)) *
              100,
          );
    const promptWins = filteredPrompts.filter((record) =>
      engine === "overall" ? engineKeys.some((key) => record.engines[key].rank <= 3) : record.engines[engine].rank <= 3,
    ).length;
    const averageRank = average(filteredPrompts.map((record) => getRank(record, engine)));

    return {
      promptCount,
      visibilityScore,
      previousVisibility,
      citationRate,
      mentionRate,
      promptWins,
      averageRank,
      trackedCoverage: Math.round((filteredPrompts.length / promptRecords.length) * 100),
    };
  }, [engine, filteredPrompts, latestTrend, previousTrend]);

  const engineSnapshots = useMemo(() => {
    return engineKeys.map((key) => {
      const prompts = filteredPrompts.length ? filteredPrompts : promptRecords;
      return {
        key,
        label: engineMeta[key].label,
        avgRank: average(prompts.map((record) => record.engines[key].rank)),
        citations: Math.round((prompts.filter((record) => record.engines[key].cited).length / prompts.length) * 100),
        strongMentions: prompts.filter((record) => record.engines[key].mention === "Strong").length,
      };
    });
  }, [filteredPrompts]);

  return (
    <div className="dark min-h-screen bg-[#05070b] text-white">
      <SeoHead
        title="Effect3 AEO Dashboard"
        description="Track Effect3 prompt rankings, citations, bot signals, and AEO execution status across ChatGPT, Claude, Perplexity, and Google AI Mode."
        canonical="https://theeffect3.com/aeo-dashboard/"
        robots="noindex, nofollow"
      />

      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="border-b border-white/10 bg-[#06070a] xl:sticky xl:top-0 xl:h-screen xl:w-[276px] xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 text-black shadow-[0_0_40px_rgba(251,146,60,0.18)]">
                <Radar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Effect3</p>
                <h1 className="text-sm font-semibold text-white">AEO Control Room</h1>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              {navItems.map(({ label, icon: Icon, active }) => (
                <button
                  key={label}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-white/[0.06] text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Action queue</p>
                <Badge className="border-orange-500/20 bg-orange-500/10 text-orange-200">{actionItems.length}</Badge>
              </div>
              <div className="mt-4 space-y-3">
                {actionItems.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/6 bg-black/30 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      <Badge
                        className={cn(
                          "shrink-0",
                          item.impact === "High"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                            : "border-sky-500/20 bg-sky-500/10 text-sky-300",
                        )}
                      >
                        {item.impact}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto hidden xl:block">
              <Separator className="my-5 bg-white/10" />
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Back to website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mx-auto max-w-[1680px] px-4 py-6 md:px-6 xl:px-8">
            <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.10),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-[0_0_80px_rgba(0,0,0,0.35)] md:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>Effect3</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>AEO Workspace</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-zinc-300">Tracking Overview</span>
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    Multi-LLM ranking dashboard
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
                    Track prompt visibility, citation wins, crawler activity, and owned-page coverage for ChatGPT,
                    Claude, Perplexity, and Google AI Mode from one control surface.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.85)]" />
                    Live tracking workspace
                  </div>
                  <Button variant="outline" className="border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]">
                    <Database className="h-4 w-4" />
                    Seeded prompt map
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-2">
                  {(["overall", ...engineKeys] as EngineFilter[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setEngine(item)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        engine === item
                          ? "border-orange-400/30 bg-orange-400/12 text-orange-200"
                          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white",
                      )}
                    >
                      {item === "overall" ? "Overall" : engineMeta[item].label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as "All" | PromptCategory)}
                    className="h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-zinc-200 outline-none transition-colors hover:border-white/20 focus:border-orange-400/30"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item} className="bg-[#0b0f16] text-white">
                        {item === "All" ? "All categories" : item}
                      </option>
                    ))}
                  </select>
                  <select
                    value={intent}
                    onChange={(event) => setIntent(event.target.value as "All" | PromptIntent)}
                    className="h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-zinc-200 outline-none transition-colors hover:border-white/20 focus:border-orange-400/30"
                  >
                    {intents.map((item) => (
                      <option key={item} value={item} className="bg-[#0b0f16] text-white">
                        {item === "All" ? "All intents" : item}
                      </option>
                    ))}
                  </select>
                  <div className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <Search className="h-4 w-4 text-zinc-500" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Filter prompts"
                      className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500 md:w-44"
                    />
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              <MetricCard
                label="Share of voice"
                value={`${metrics.visibilityScore}%`}
                change={`${metrics.visibilityScore - metrics.previousVisibility >= 0 ? "+" : ""}${
                  metrics.visibilityScore - metrics.previousVisibility
                } pts`}
                detail={`${engine === "overall" ? "Cross-engine" : engineMeta[engine].label} visibility in the last 30 days`}
                positive={metrics.visibilityScore >= metrics.previousVisibility}
                icon={Eye}
              />
              <MetricCard
                label="Citation rate"
                value={`${metrics.citationRate}%`}
                change={`${metrics.citationRate >= 50 ? "+" : ""}${Math.max(metrics.citationRate - 42, 0)} pts`}
                detail="Prompts where Effect3 is being cited as a source"
                positive={metrics.citationRate >= 42}
                icon={Sparkles}
              />
              <MetricCard
                label="Top 3 wins"
                value={`${metrics.promptWins}`}
                change={`${Math.max(metrics.promptWins - 2, 0)} new`}
                detail="Tracked prompts sitting in a top 3 answer position"
                positive
                icon={Target}
              />
              <MetricCard
                label="Average rank"
                value={metrics.averageRank.toFixed(1)}
                change={`${metrics.averageRank <= 5 ? "Inside target" : "Needs lift"}`}
                detail={`${metrics.promptCount} prompts in the current working set`}
                positive={metrics.averageRank <= 5}
                icon={BrainCircuit}
              />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="text-xl text-white">Daily monitoring cadence</CardTitle>
                  <CardDescription className="text-zinc-400">
                    The operating loop for ranking, citations, crawl health, and page-level inquiry signals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {monitoringWorkflow.map((item, index) => (
                    <div key={item.title} className="flex gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-zinc-300">
                        {index + 1}
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-white">{item.title}</p>
                          <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">{item.cadence}</Badge>
                        </div>
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.source}</p>
                        <p className="text-sm leading-6 text-zinc-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="text-xl text-white">Priority tracking set</CardTitle>
                  <CardDescription className="text-zinc-400">
                    The pages and search terms that should be reviewed every day before new content is planned.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">Money pages</p>
                      <Badge className="border-orange-500/20 bg-orange-500/10 text-orange-200">
                        {trackedPages.length} tracked
                      </Badge>
                    </div>
                    {trackedPages.slice(0, 6).map((item) => (
                      <div
                        key={item.page}
                        className="rounded-xl border border-white/8 bg-black/20 px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-mono text-sm text-orange-200">{item.page}</p>
                          <Badge
                            className={cn(
                              item.priority === "P1"
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                : "border-sky-500/20 bg-sky-500/10 text-sky-300",
                            )}
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-300">{item.primaryKeyword}</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{item.objective}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">Prompt and keyword set</p>
                      <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                        {trackedKeywords.length} tracked
                      </Badge>
                    </div>
                    {trackedKeywords.slice(0, 8).map((item) => (
                      <div
                        key={item.query}
                        className="rounded-xl border border-white/8 bg-black/20 px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-white">{item.query}</p>
                          <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">{item.intent}</Badge>
                        </div>
                        <p className="mt-2 font-mono text-xs text-orange-200">{item.mappedPage}</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_420px]">
              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Visibility trend</CardTitle>
                    <CardDescription className="mt-1 text-zinc-400">
                      Cross-engine answer presence and citation momentum over the last 30 days.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {engineKeys.map((key) => (
                      <div
                        key={key}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium",
                          engineMeta[key].highlight,
                        )}
                      >
                        {engineMeta[key].label}
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tick={{ fill: "rgba(161,161,170,0.9)", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "rgba(161,161,170,0.9)", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                          width={34}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(7,10,15,0.96)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            borderRadius: "16px",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#f4f4f5", fontWeight: 600 }}
                        />
                        {engineKeys.map((key) => (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={engineMeta[key].color}
                            strokeWidth={engine === "overall" || engine === key ? 3 : 1.5}
                            strokeOpacity={engine === "overall" || engine === key ? 1 : 0.24}
                            dot={false}
                            activeDot={{ r: 5 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10 pb-5">
                    <CardTitle className="text-xl text-white">Industry rankings</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Competitive share of voice inside tracked AI automation prompts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {industryRanking.map((item, index) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{item.name}</span>
                                {item.pinned && (
                                  <Badge className="border-orange-500/20 bg-orange-500/10 text-orange-200">
                                    Pinned
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-zinc-500">Prompt share in tracked answer sets</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">{item.score}%</p>
                            <p className={cn("text-xs", item.change >= 0 ? "text-emerald-300" : "text-rose-300")}>
                              {item.change >= 0 ? "+" : ""}
                              {item.change} pts
                            </p>
                          </div>
                        </div>
                        <InlineBar
                          value={item.score}
                          color={item.pinned ? "linear-gradient(90deg,#fb923c,#fdba74)" : "rgba(255,255,255,0.28)"}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10 pb-5">
                    <CardTitle className="text-xl text-white">Indexing readiness</CardTitle>
                    <CardDescription className="text-zinc-400">
                      The technical pieces already in place for discovery and citation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 p-6">
                    {[
                      { label: "Structured data", value: "Live", note: "Organization, Service, FAQPage" },
                      { label: "llms.txt", value: "Live", note: "Machine-readable AI surface" },
                      { label: "robots + sitemap", value: "Live", note: "Discovery and crawl hints" },
                      { label: "Canonical coverage", value: "Ready", note: "Homepage + route-level metadata" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-zinc-500">{item.note}</p>
                        </div>
                        <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_400px]">
              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="border-b border-white/10 pb-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">Prompt command center</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Monitor the prompts that decide whether Effect3 is surfaced, cited, and positioned above
                        competitors.
                      </CardDescription>
                    </div>
                    <div className="text-sm text-zinc-500">
                      {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? "" : "s"} in view
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="w-[34%] text-zinc-500">Prompt</TableHead>
                        <TableHead className="text-zinc-500">Category</TableHead>
                        <TableHead className="text-zinc-500">Rank</TableHead>
                        <TableHead className="text-zinc-500">Citation</TableHead>
                        <TableHead className="text-zinc-500">Mention</TableHead>
                        <TableHead className="text-zinc-500">Owned page</TableHead>
                        <TableHead className="text-zinc-500">Competitor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrompts.map((record) => {
                        const rank = getRank(record, engine);
                        const movement = getMovement(record, engine);
                        const cited = getIsCited(record, engine);
                        const mentionState = getMentionState(record, engine);

                        return (
                          <TableRow key={record.id} className="border-white/8 hover:bg-white/[0.03]">
                            <TableCell>
                              <div className="space-y-2">
                                <p className="font-medium leading-6 text-white">{record.prompt}</p>
                                <div className="flex flex-wrap gap-2">
                                  <Badge
                                    className={cn(
                                      "border-white/10 bg-white/[0.04] text-zinc-200",
                                      record.priority === "High" && "border-orange-500/20 bg-orange-500/10 text-orange-200",
                                    )}
                                  >
                                    {record.priority}
                                  </Badge>
                                  <Badge className="border-white/10 bg-white/[0.04] text-zinc-400">
                                    {record.intent}
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-zinc-300">{record.category}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-semibold text-white">#{rank.toFixed(1)}</span>
                                  <span className="text-xs text-emerald-300">+{movement.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-zinc-500">Average movement last 30d</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  cited
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                    : "border-zinc-500/20 bg-zinc-500/10 text-zinc-300",
                                )}
                              >
                                {cited ? "Cited" : "Missing"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn(getMentionColor(mentionState))}>{mentionState}</Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-orange-200">{record.ownedPage}</TableCell>
                            <TableCell className="text-zinc-400">{record.bestCompetitor}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10 pb-5">
                    <CardTitle className="text-xl text-white">Engine snapshot</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Quick performance breakdown by answer engine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {engineSnapshots.map((snapshot) => (
                      <div key={snapshot.key} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold"
                              style={{
                                background: `${engineMeta[snapshot.key].color}1F`,
                                color: engineMeta[snapshot.key].color,
                              }}
                            >
                              {engineMeta[snapshot.key].short}
                            </div>
                            <div>
                              <p className="font-medium text-white">{snapshot.label}</p>
                              <p className="text-xs text-zinc-500">{snapshot.strongMentions} strong mentions</p>
                            </div>
                          </div>
                          <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                            Avg rank {snapshot.avgRank.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>Citation coverage</span>
                            <span className="text-zinc-300">{snapshot.citations}%</span>
                          </div>
                          <InlineBar value={snapshot.citations} color={engineMeta[snapshot.key].color} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10 pb-5">
                    <CardTitle className="text-xl text-white">Execution notes</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Immediate moves that improve citations and ranking position fastest.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {actionItems.map((item, index) => (
                      <div key={item.title} className="flex gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-zinc-300">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{item.title}</p>
                            <Badge
                              className={cn(
                                item.impact === "High"
                                  ? "border-orange-500/20 bg-orange-500/10 text-orange-200"
                                  : "border-sky-500/20 bg-sky-500/10 text-sky-300",
                              )}
                            >
                              {item.impact}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="text-xl text-white">Top bots</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Which AI crawlers are hitting the site and whether discovery is trending up.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {topBots.map((item) => (
                    <div key={item.bot} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl border border-white/8 bg-black/20 p-2 text-zinc-300">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.bot}</p>
                            <p className="text-xs text-zinc-500">{item.group}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">{item.visits} visits</p>
                          <p className="text-xs text-emerald-300">+{item.change}%</p>
                        </div>
                      </div>
                      <InlineBar value={Math.min(item.visits, 100)} color="linear-gradient(90deg,#f59e0b,#f97316)" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="text-xl text-white">Top cited pages</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Pages currently carrying most of the prompt wins and LLM citations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {topPages.map((item) => (
                    <div
                      key={item.page}
                      className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm text-orange-200">{item.page}</p>
                          <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">{item.engine}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400">
                          {item.citations} citations and {item.promptWins} prompt wins across tracked queries.
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-zinc-500">Citations</p>
                          <p className="font-semibold text-white">{item.citations}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500">Wins</p>
                          <p className="font-semibold text-white">{item.promptWins}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
