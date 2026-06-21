const qs = new URLSearchParams(window.location.search);
const clientKey = (qs.get("client") || "").trim().toLowerCase();
const companyName = qs.get("company") || "In the Visuals";
const app = document.getElementById("app");

const sessionClient = clientKey || "itv";
const sessionKey = `e3_session_${sessionClient}`;
function getToken() { try { return localStorage.getItem(sessionKey) || ""; } catch { return ""; } }
function clearToken() { try { localStorage.removeItem(sessionKey); } catch {} }
function gotoLogin() { window.location.href = "/client/login"; }
function authHeaders(extra) { return { ...(extra || {}), Authorization: `Bearer ${getToken()}` }; }

function avatarFor(name, fallback) {
  if (fallback) return fallback;
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "W";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const fallbackData = {
  company: "In the Visuals",
  sync: { live: false, message: "Preview mode" },
  tasks: [
    { name: "Connecting Sendpilot with N8n", status: "Ongoing", priority: "High", dueDate: "2025-05-30", url: "#" },
    { name: "Testing Sendpilot with Local LLM", status: "Ongoing", priority: "Medium", dueDate: "2025-05-30", url: "#" },
    { name: "Setting up instruction flow", status: "Inline", priority: "High", dueDate: "2026-06-02", url: "#" },
    { name: "Connecting Lead Data source", status: "Inline", priority: "High", dueDate: "2026-06-02", url: "#" },
  ],
  meetings: [],
  docs: [],
  filesPageUrl: "https://app.notion.com/p/All-Documents-37217297181e8014be26c7fba6783b18?source=copy_link",
  completionDate: "",
};

let portalData = fallbackData;
let activeTab = "overview";
let lastSig = "";
let refreshTimer = null;

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

function fmtDate(v) {
  if (!v) return "No date";
  const d = new Date(`${v}T00:00:00`);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fmtMoney(v) {
  if (v === "" || v == null) return "Not set";
  const n = Number(v);
  if (Number.isNaN(n)) return esc(v);
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function todayLabel() {
  return new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function key(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("complete") || s.includes("publish")) return "done";
  if (s.includes("ongoing") || s.includes("progress")) return "doing";
  return "todo";
}

function groups(tasks) {
  return {
    todo: tasks.filter((t) => key(t.status) === "todo"),
    doing: tasks.filter((t) => key(t.status) === "doing"),
    done: tasks.filter((t) => key(t.status) === "done"),
  };
}

function projectProgress(tasks) {
  if (!tasks.length) return 0;
  const done = tasks.filter((t) => key(t.status) === "done").length;
  return Math.max(18, Math.round((done / tasks.length) * 100));
}

function collectAllTasks(data) {
  const out = [];
  const seen = new Set();
  const add = (t, phase) => {
    const id = (t.url && t.url !== "#" ? t.url : t.name) + "|" + t.name;
    if (seen.has(id)) return;
    seen.add(id);
    out.push({ ...t, phase });
  };
  (data.phases || []).forEach((p) => (p.tasksAll || p.tasks || []).forEach((t) => add(t, p.name)));
  if (!(data.phases || []).length) (data.tasks || []).forEach((t) => add(t, "Tasks"));
  return out;
}
function todaysWork(data) {
  const today = new Date().toISOString().slice(0, 10);
  const all = (data.currentPhase?.tasks?.length ? data.currentPhase.tasks : collectAllTasks(data));
  const doing = all.filter((t) => key(t.status) === "doing");
  const dueToday = all.filter((t) => t.dueDate === today);
  const merged = [...doing, ...dueToday.filter((t) => !doing.includes(t))];
  return merged.length ? merged : all.slice(0, 4);
}

/* ---------- report export ---------- */
function rangeBounds(range) {
  const now = new Date();
  const end = new Date(now); end.setHours(23, 59, 59, 999);
  const start = new Date(now); start.setHours(0, 0, 0, 0);
  let label = "Today";
  if (range === "week") { const day = (now.getDay() + 6) % 7; start.setDate(now.getDate() - day); label = "This Week"; }
  else if (range === "month") { start.setDate(1); label = "This Month"; }
  return { start, end, label };
}
function taskDate(t) {
  if (t.updatedAt) { const d = new Date(t.updatedAt); if (!Number.isNaN(d.getTime())) return d; }
  if (t.dueDate) { const d = new Date(`${t.dueDate}T12:00:00`); if (!Number.isNaN(d.getTime())) return d; }
  return null;
}
function exportReport(range) {
  const b = rangeBounds(range);
  const all = collectAllTasks(portalData);
  const tasks = all.filter((t) => { const d = taskDate(t); return d && d >= b.start && d <= b.end; });
  const w = window.open("", "_blank");
  if (!w) { alert("Please allow pop-ups to export your report."); return; }
  w.document.open();
  w.document.write(buildReportHTML(portalData, tasks, b));
  w.document.close();
  w.onload = () => setTimeout(() => { try { w.focus(); w.print(); } catch {} }, 500);
}
function buildReportHTML(data, tasks, b) {
  const g = groups(tasks);
  const company = esc(data.company || companyName);
  const origin = window.location.origin;
  const genDate = new Date().toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" });
  const fmtRange = (d) => d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const phaseRows = (data.phases || []).map((p) => `
    <div class="rp-phase">
      <div class="rp-phase-head"><b>${esc(p.name)}</b><span>${esc(p.label || "")}</span><em>${p.progress || 0}%</em></div>
      <div class="rp-bar"><i style="width:${p.progress || 0}%"></i></div>
      <div class="rp-phase-meta">${p.counts?.done || 0} done · ${p.counts?.doing || 0} working · ${p.counts?.todo || 0} queued</div>
    </div>`).join("");
  const row = (t) => `
    <tr>
      <td class="rp-task">${esc(t.name)}<small>${esc(t.phase || "")}</small></td>
      <td><span class="rp-chip ${key(t.status)}">${esc(t.status || "")}</span></td>
      <td>${esc(t.priority || "—")}</td>
      <td>${t.dueDate ? fmtRange(new Date(`${t.dueDate}T12:00:00`)) : "—"}</td>
    </tr>`;
  const section = (title, items) => items.length ? `
    <h3 class="rp-sec">${title} <span>${items.length}</span></h3>
    <table class="rp-table"><thead><tr><th>Task</th><th>Status</th><th>Priority</th><th>Due</th></tr></thead>
    <tbody>${items.map(row).join("")}</tbody></table>` : "";
  return `<!doctype html><html><head><meta charset="utf-8"/><title>${company} — Working Report (${b.label})</title>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif; color: #20262d; margin: 0; }
    .rp-cover { background: linear-gradient(125deg,#f96443,#ff9f6e); color:#fff; padding: 30px 32px; border-radius: 18px; display:flex; justify-content:space-between; align-items:flex-start; }
    .rp-cover .rp-brand { display:flex; align-items:center; gap:11px; font-weight:800; font-size:18px; }
    .rp-cover img { height:30px; filter: brightness(0) invert(1); }
    .rp-cover h1 { font-size:24px; margin:18px 0 4px; letter-spacing:-.02em; }
    .rp-cover p { margin:0; opacity:.9; font-size:13px; }
    .rp-range { text-align:right; }
    .rp-range b { display:block; font-size:13px; font-weight:700; }
    .rp-range span { font-size:12px; opacity:.85; }
    .rp-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin:20px 0; }
    .rp-kpi { border:1px solid #e8edf1; border-radius:12px; padding:14px 16px; }
    .rp-kpi b { font-size:26px; font-weight:800; letter-spacing:-.03em; display:block; }
    .rp-kpi span { font-size:11.5px; color:#66707c; font-weight:600; }
    .rp-section-title { font-size:13px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; color:#f96443; margin:22px 0 10px; }
    .rp-phase { margin-bottom:12px; }
    .rp-phase-head { display:flex; align-items:center; gap:8px; font-size:13px; }
    .rp-phase-head b { font-weight:700; } .rp-phase-head span { color:#66707c; flex:1; } .rp-phase-head em { font-style:normal; font-weight:800; }
    .rp-bar { height:7px; background:#eef2f5; border-radius:99px; margin:6px 0 4px; overflow:hidden; }
    .rp-bar i { display:block; height:100%; background:linear-gradient(90deg,#f96443,#ff9f6e); }
    .rp-phase-meta { font-size:11px; color:#9aa4ad; font-weight:600; }
    .rp-sec { font-size:14px; margin:18px 0 8px; } .rp-sec span { color:#9aa4ad; font-weight:700; }
    .rp-table { width:100%; border-collapse:collapse; margin-bottom:8px; }
    .rp-table th { text-align:left; font-size:10.5px; text-transform:uppercase; letter-spacing:.04em; color:#9aa4ad; border-bottom:1.5px solid #e8edf1; padding:7px 8px; }
    .rp-table td { font-size:12.5px; padding:9px 8px; border-bottom:1px solid #f2f5f7; vertical-align:top; }
    .rp-task { font-weight:600; } .rp-task small { display:block; font-size:10.5px; color:#9aa4ad; font-weight:500; margin-top:2px; }
    .rp-chip { font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:99px; }
    .rp-chip.done { color:#0e8f66; background:#e7f7ef; } .rp-chip.doing { color:#1f4fd6; background:#eaf1ff; } .rp-chip.todo { color:#b9791b; background:#fff5e6; }
    .rp-empty { color:#9aa4ad; font-size:13px; padding:16px; text-align:center; border:1px dashed #e8edf1; border-radius:12px; }
    .rp-foot { margin-top:26px; padding-top:12px; border-top:1px solid #e8edf1; font-size:11px; color:#9aa4ad; display:flex; justify-content:space-between; }
  </style></head><body>
    <div class="rp-cover">
      <div>
        <div class="rp-brand"><img src="${origin}/client/assets/effect3-logo.png" alt="Effect3"/> Effect3 OS</div>
        <h1>${company} — Working Report</h1>
        <p>Project tracking summary for ${company}</p>
      </div>
      <div class="rp-range"><b>${b.label}</b><span>${fmtRange(b.start)} – ${fmtRange(b.end)}</span></div>
    </div>
    <div class="rp-kpis">
      <div class="rp-kpi"><b>${tasks.length}</b><span>Tasks in range</span></div>
      <div class="rp-kpi"><b>${g.done.length}</b><span>Completed</span></div>
      <div class="rp-kpi"><b>${g.doing.length}</b><span>In progress</span></div>
      <div class="rp-kpi"><b>${g.todo.length}</b><span>Queued</span></div>
    </div>
    <div class="rp-section-title">Phase progress</div>
    ${phaseRows || "<div class='rp-empty'>No phases.</div>"}
    <div class="rp-section-title">Activity in ${b.label.toLowerCase()}</div>
    ${tasks.length ? `${section("In progress", g.doing)}${section("Completed", g.done)}${section("Queued", g.todo)}` : "<div class='rp-empty'>No tracked activity in this period.</div>"}
    <div class="rp-foot"><span>Generated ${genDate}</span><span>Effect3 OS · Client Portal</span></div>
  </body></html>`;
}

function showSplash(data) {
  if (window.__e3_splashed) return;
  window.__e3_splashed = true;
  const tasks = todaysWork(data);
  const el = document.createElement("div");
  el.className = "splash";
  el.innerHTML = `
    <div class="splash-card">
      <div class="splash-ring"></div>
      <p class="splash-eyebrow">Welcome back</p>
      <h2>${esc(data.company || companyName)} team 👋</h2>
      <p class="splash-sub">Here's what we're working on today</p>
      <div class="splash-tasks">
        ${tasks.slice(0, 4).map((t) => `<div class="splash-task"><span class="task-pin ${key(t.status)}"></span><b>${esc(t.name)}</b></div>`).join("") || "<div class='splash-task muted'>No active tasks right now.</div>"}
      </div>
      <button class="splash-enter" id="splash-enter">Enter portal →</button>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  const dismiss = () => { el.classList.remove("show"); setTimeout(() => el.remove(), 420); };
  el.querySelector("#splash-enter").addEventListener("click", dismiss);
  setTimeout(dismiss, 4200);
}

function taskCard(t) {
  return `
    <a class="task-card" href="${esc(t.url || "#")}" target="_blank" rel="noreferrer">
      <span class="task-pin ${key(t.status)}"></span>
      <b>${esc(t.name)}</b>
      <small>${esc(t.priority || "Normal")} · ${fmtDate(t.dueDate)}</small>
    </a>
  `;
}

function overview(data) {
  const tasks = data.tasks || [];
  const g = groups(tasks);
  const progress = projectProgress(tasks);
  const completionDate = data.completionDate || tasks.map((t) => t.dueDate).filter(Boolean).sort().at(-1) || "";
  const phases = data.phases?.length ? data.phases : [
    { name: "Phase 1", status: "Active", summary: "Current Notion task database: outreach, local LLM, backend and lead source setup.", progress },
    { name: "Phase 2", status: "Next", summary: "Portal polish, integration QA, file flow and reporting layer.", progress: 0 },
    { name: "Phase 3", status: "Planned", summary: "Automation hardening, analytics and agent monitoring.", progress: 0 },
    { name: "Phase 4", status: "Planned", summary: "Launch, handoff and optimization loop.", progress: 0 },
  ];

  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">Effect3 OS Client Portal</p>
        <h1>Hi, ${esc(data.company)} team. Welcome to your portal.</h1>
        <p>Track live project work, phase execution, timelines and support from one clean workspace.</p>
      </div>
      <div class="report-actions">
        <span class="report-label">📄 Export report</span>
        <div class="report-btns">
          <button data-report="today">Today</button>
          <button data-report="week">This week</button>
          <button data-report="month">This month</button>
        </div>
      </div>
    </section>

    <section class="stats-row">
      <article><small>Project Progress</small><b>${progress}%</b><span class="stat-icon orange"></span></article>
      <article><small>Working Now</small><b>${g.doing.length}</b><span class="stat-icon blue"></span></article>
      <article><small>Queued Tasks</small><b>${g.todo.length}</b><span class="stat-icon amber"></span></article>
      <article><small>Completion Date</small><b>${fmtDate(completionDate)}</b><span class="stat-icon green"></span></article>
    </section>

    <button class="invoice-notice" data-tab="invoices">
      <span>Invoice update</span>
      <b>Check out your latest invoice update.</b>
      <em>Open invoices</em>
    </button>

    <section class="panel">
      ${kanbanContent(data.currentPhase?.tasks?.length ? data.currentPhase.tasks : tasks, data.currentPhase?.name)}
    </section>

    <section class="panel">
      ${phasesContent(phases)}
    </section>

    <div class="dashboard-lower">
      <section class="panel timeline-panel">
        ${timelineContent(tasks)}
      </section>
    </div>

    <section class="panel query-panel">
      ${data.formEmbed ? formEmbedSection(data) : queryFormContent()}
    </section>
  `;
}

function formEmbedSection(data) {
  return `
    <div class="panel-title">
      <div><p class="eyebrow">Client query</p><h2>Submit a project query</h2><span>Open the form below — it saves straight into our Notion.</span></div>
      <div class="query-badge">Notion form</div>
    </div>
    <div class="form-embed-cta" id="form-embed-cta" data-embed="${esc(data.formEmbed)}">
      <span class="fec-icon">📝</span>
      <b>Project query form</b>
      <span class="fec-sub">Tap to open the form here, or open it in a new tab.</span>
      <div class="fec-actions">
        <button type="button" class="fec-btn" id="load-form-embed">Open form</button>
        <a class="fec-link" href="${esc(data.formEmbed)}" target="_blank" rel="noreferrer">Open in new tab ↗</a>
      </div>
    </div>
  `;
}

function kanbanContent(tasks, phaseName) {
  const g = groups(tasks);
  return `
    <div class="panel-title">
      <div><p class="eyebrow">Kanban summary</p><h2>What we are working on now${phaseName ? ` · ${esc(phaseName)}` : ""}</h2></div>
      <div class="active-pill"><span></span> Active workspace</div>
    </div>
    <div class="kanban">
      <div class="lane"><h3>Queued <em>${g.todo.length}</em></h3>${g.todo.map(taskCard).join("") || "<p class='empty'>No queued tasks.</p>"}</div>
      <div class="lane active"><h3>Working <em>${g.doing.length}</em></h3>${g.doing.map(taskCard).join("") || "<p class='empty'>No active tasks.</p>"}</div>
      <div class="lane"><h3>Done <em>${g.done.length}</em></h3>${g.done.map(taskCard).join("") || "<p class='empty'>No completed tasks yet.</p>"}</div>
    </div>
  `;
}

function timelineContent(tasks) {
  return `
    <div class="panel-title"><div><p class="eyebrow">Timeline</p><h2>Scheduled work by date</h2></div></div>
    <div class="timeline">
      ${tasks.map((t) => `<a href="${esc(t.url || "#")}" target="_blank" rel="noreferrer"><time>${fmtDate(t.dueDate)}</time><b>${esc(t.name)}</b><span class="status-chip ${key(t.status)}">${esc(t.status)}</span></a>`).join("") || "<p class='empty'>No dated tasks synced yet.</p>"}
    </div>
  `;
}

function phasesContent(phases) {
  return `
    <div class="panel-title"><div><p class="eyebrow">Execution map</p><h2>Phase by phase execution</h2></div></div>
    <div class="phases">
      ${phases.map((p) => `
        <article class="${p.current ? "current" : ""} ${p.complete ? "complete" : ""}">
          <div class="phase-top">
            <small>${p.complete ? "✓ Complete" : p.current ? "Working right now" : esc(p.status)}</small>
            <b>${p.progress || 0}%</b>
          </div>
          <h3>${esc(p.name)} <span>${esc(p.label || "")}</span></h3>
          <p>${esc(p.summary)}</p>
          <div class="phase-counts">
            <span>${p.counts?.doing || 0} working</span>
            <span>${p.counts?.todo || 0} queued</span>
            <span>${p.counts?.done || 0} done</span>
          </div>
          <div class="phase-tasks">
            ${(p.tasks || []).slice(0, 3).map((task) => `<a href="${esc(task.url || "#")}" target="_blank" rel="noreferrer">${esc(task.name)}</a>`).join("") || "<span>No tasks yet</span>"}
          </div>
          <div class="mini-progress"><i style="width:${p.progress || 0}%"></i></div>
        </article>
      `).join("")}
    </div>
  `;
}

function queryFormContent() {
  return `
    <div class="panel-title">
      <div><p class="eyebrow">Client query</p><h2>Submit a project query</h2><span>Send requests straight into your Notion query table.</span></div>
      <div class="query-badge">Notion synced</div>
    </div>
    <div class="query-card">
      <div class="query-card-head">
        <b>New request</b>
        <span>Response will appear in your Notion query database.</span>
      </div>
      <form class="query-form" id="query-form">
        <div class="field-row">
          <label><span>Respondent name</span><input id="query-name" name="name" value="${esc(portalData.company || companyName)} team" required /></label>
          <label><span>Reference link</span><input id="query-reference" name="referenceUrl" type="url" placeholder="https://..." /></label>
        </div>
        <label><span>Query details</span><textarea id="query-message" name="query" rows="5" placeholder="Write your project question, request, or approval note..." required></textarea></label>
        <label><span>Attachment</span><input id="query-attachment" name="attachment" type="file" /></label>
        <div class="query-actions">
          <button type="submit">Submit query</button>
          <small id="query-status">Saved directly to Notion when submitted.</small>
        </div>
      </form>
    </div>
  `;
}

function filesTab(data) {
  return `
    <section class="panel tab-panel">
      <p class="eyebrow">Files</p>
      <h2>Client files</h2>
      <a class="primary-link" href="${esc(data.filesPageUrl || "#")}" target="_blank">Open Notion files</a>
      <form class="upload-box" id="upload-form">
        <label for="file-input">Upload a file to Notion</label>
        <input type="file" id="file-input" />
        <button type="submit">Upload file</button>
        <small id="upload-status">Files are saved directly into the client Notion documents page.</small>
      </form>
      <div class="list">${(data.docs || []).map((d) => `<a href="${esc(d.url)}" target="_blank"><b>${esc(d.title)}</b><span>Open</span></a>`).join("") || "<p class='empty'>No synced files found.</p>"}</div>
    </section>
  `;
}

function meetingsTab(data) {
  return `
    <section class="panel tab-panel">
      <p class="eyebrow">Meeting notes</p>
      <h2>Meeting notes</h2>
      <div class="list">${(data.meetings || []).map((m) => `<a href="${esc(m.url || "#")}" target="_blank"><b>${esc(m.title)}</b><span>${fmtDate(m.date)}</span></a>`).join("") || "<p class='empty'>No meeting notes synced yet.</p>"}</div>
    </section>
  `;
}

function formTab(data) {
  return `<section class="panel tab-panel">${formEmbedSection(data)}</section>`;
}

function settingsTab(data) {
  const team = data.team || [];
  return `
    <section class="panel tab-panel">
      <div class="panel-title">
        <div><p class="eyebrow">Workspace</p><h2>Team access</h2><span>People who can access ${esc(data.company || companyName)}'s portal.</span></div>
        <div class="query-badge">${team.length} member${team.length === 1 ? "" : "s"}</div>
      </div>
      <div class="list">${team.map((m) => `<a><b>${esc(m.email)}</b><span>${esc(m.company || "")}</span></a>`).join("") || "<p class='empty'>No team members have signed up yet.</p>"}</div>
    </section>
  `;
}

function invoicesTab(data) {
  const invoices = data.invoices?.items || [];
  const accessIssue = data.invoices?.accessIssue || "";
  return `
    <section class="panel tab-panel">
      <div class="panel-title">
        <div><p class="eyebrow">Invoices</p><h2>Invoice tracking</h2><span>Payment and invoice updates from your Notion invoice database.</span></div>
        <div class="query-badge">${invoices.length} synced</div>
      </div>
      ${accessIssue ? `
        <div class="invoice-empty">
          <span>Invoice workspace is being prepared</span>
          <b>No invoice updates are available yet.</b>
          <p>Your invoice updates will appear here as soon as they are ready.</p>
        </div>
      ` : ""}
      ${invoices.length ? `
        <div class="invoice-table">
          <div class="invoice-row head"><span>Invoice</span><span>Amount</span><span>Status</span><span>Date</span><span></span></div>
          ${invoices.map((invoice) => `
            <a class="invoice-row" href="${esc(invoice.url || "#")}" target="_blank" rel="noreferrer">
              <b>${esc(invoice.title)}</b>
              <span>${fmtMoney(invoice.amount)}</span>
              <em>${esc(invoice.status || "Pending")}</em>
              <time>${fmtDate(invoice.date)}</time>
              <strong>Open</strong>
            </a>
          `).join("")}
        </div>
      ` : !accessIssue ? "<p class='empty'>No invoices synced yet.</p>" : ""}
    </section>
  `;
}

function content(data) {
  const tasks = data.tasks || [];
  const progress = projectProgress(tasks);
  const phases = data.phases?.length ? data.phases : [
    { name: "Phase 1", status: "Active", summary: "Current Notion task database: outreach, local LLM, backend and lead source setup.", progress },
    { name: "Phase 2", status: "Next", summary: "Portal polish, integration QA, file flow and reporting layer.", progress: 0 },
    { name: "Phase 3", status: "Planned", summary: "Automation hardening, analytics and agent monitoring.", progress: 0 },
    { name: "Phase 4", status: "Planned", summary: "Launch, handoff and optimization loop.", progress: 0 },
  ];
  const kanbanTasks = data.currentPhase?.tasks?.length ? data.currentPhase.tasks : tasks;
  if (activeTab === "activity") return `<section class="panel">${timelineContent(tasks)}</section>`;
  if (activeTab === "tasks") return `<section class="panel">${kanbanContent(kanbanTasks, data.currentPhase?.name)}</section>`;
  if (activeTab === "timeline") return `<section class="panel">${timelineContent(tasks)}</section>`;
  if (activeTab === "phases") return `<section class="panel">${phasesContent(phases)}</section>`;
  if (activeTab === "form") return formTab(data);
  if (activeTab === "files") return filesTab(data);
  if (activeTab === "meetings") return meetingsTab(data);
  if (activeTab === "invoices") return invoicesTab(data);
  if (activeTab === "settings") return settingsTab(data);
  return overview(data);
}

function render(data) {
  portalData = data;
  const tabs = [
    ["overview", "🏠", "Dashboard"],
    ["activity", "📡", "Project Activity"],
    ["tasks", "✅", "Tasks"],
    ["timeline", "📅", "Timeline"],
    ["phases", "🧭", "Phase Execution"],
    ...(data.formEmbed ? [["form", "📋", "Query Form"]] : []),
    ["files", "📁", "Files"],
    ["meetings", "📝", "Meeting Notes"],
    ["invoices", "🧾", "Invoices"],
  ];
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="logo"><img src="assets/effect3-logo.png" alt="Effect3" /></div>
        ${tabs.map(([id, icon, label]) => `<button data-tab="${id}" class="${activeTab === id ? "on" : ""}"><span class="nav-emoji">${icon}</span> ${label}</button>`).join("")}
        <div class="sidebar-bottom">
          <button data-tab="settings" class="${activeTab === "settings" ? "on" : ""}"><span class="nav-emoji">⚙️</span> Settings</button>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="search">Search tasks, dates, files and project updates</div>
          <div class="top-actions">
            <div class="today">${todayLabel()}</div>
            <div class="user-menu"><div class="avatar">${esc(avatarFor(data.company, data.avatar))}</div><span>${esc(data.company || companyName)}</span></div>
            <button class="logout" id="logout">Logout</button>
          </div>
        </header>
        <div class="content">${content(data)}</div>
      </main>
    </div>
  `;
  bind();
}

function bind() {
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      render(portalData);
    });
  });
  document.getElementById("logout")?.addEventListener("click", () => {
    clearToken();
    gotoLogin();
  });

  document.querySelectorAll("[data-report]").forEach((btn) => {
    btn.addEventListener("click", () => exportReport(btn.dataset.report));
  });

  document.getElementById("load-form-embed")?.addEventListener("click", () => {
    const cta = document.getElementById("form-embed-cta");
    if (!cta) return;
    const url = cta.dataset.embed;
    const wrap = document.createElement("div");
    wrap.className = "form-embed";
    const frame = document.createElement("iframe");
    frame.src = url;
    frame.width = "100%";
    frame.height = "620";
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("allowfullscreen", "");
    frame.title = "Project query form";
    wrap.appendChild(frame);
    cta.replaceWith(wrap);
  });

  const uploadForm = document.getElementById("upload-form");
  const uploadInput = document.getElementById("file-input");
  const uploadStatus = document.getElementById("upload-status");
  uploadForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = uploadInput?.files?.[0];
    if (!file) {
      uploadStatus.textContent = "Choose a file first.";
      return;
    }
    uploadStatus.textContent = "Uploading to Notion...";
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const res = await fetch(`/api/upload-request${clientKey ? `?client=${encodeURIComponent(clientKey)}` : ""}`, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ fileName: file.name, contentType: file.type || "application/octet-stream", base64 }),
    }).catch(() => null);
    if (!res?.ok) {
      const body = await res?.json().catch(() => ({}));
      uploadStatus.textContent = body?.error || "Upload failed.";
      return;
    }
    uploadStatus.textContent = "Uploaded and saved in Notion.";
    uploadInput.value = "";
  });

  const queryForm = document.getElementById("query-form");
  const queryStatus = document.getElementById("query-status");
  queryForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("query-attachment")?.files?.[0];
    queryStatus.textContent = "Submitting to Notion...";
    let attachment = null;
    if (file) {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      attachment = { fileName: file.name, contentType: file.type || "application/octet-stream", base64 };
    }
    const payload = {
      name: document.getElementById("query-name")?.value || "",
      referenceUrl: document.getElementById("query-reference")?.value || "",
      query: document.getElementById("query-message")?.value || "",
      attachment,
    };
    const res = await fetch(`/api/query-request${clientKey ? `?client=${encodeURIComponent(clientKey)}` : ""}`, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) {
      const body = await res?.json().catch(() => ({}));
      queryStatus.textContent = body?.error || "Query submission failed.";
      return;
    }
    queryForm.reset();
    document.getElementById("query-name").value = `${portalData.company || companyName} team`;
    queryStatus.textContent = "Submitted. Your query is saved in Notion.";
  });
}

function dataSignature(data) {
  return JSON.stringify({ t: data.tasks, p: data.phases, i: data.invoices, m: data.meetings, d: data.docs, team: data.team });
}

async function fetchPortal() {
  const params = new URLSearchParams({ company: companyName });
  if (clientKey) params.set("client", clientKey);
  return fetch(`/api/portal?${params.toString()}`, { headers: authHeaders() });
}

// Poll Notion-backed data so edits reflect without a manual reload.
// Skips re-render while the user is typing or has the form iframe open.
function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(async () => {
    if (document.hidden) return;
    const el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
    if (document.querySelector(".form-embed iframe")) return;
    try {
      const res = await fetchPortal();
      if (res.status === 401) { clearToken(); gotoLogin(); return; }
      if (!res.ok) return;
      const data = { ...fallbackData, ...(await res.json()) };
      const sig = dataSignature(data);
      if (sig !== lastSig) {
        lastSig = sig;
        const keep = activeTab;
        render({ ...data, company: data.company || companyName });
        activeTab = keep;
      }
    } catch {}
  }, 15000);
}

async function boot() {
  const token = getToken();
  if (!token) { gotoLogin(); return; }
  let data = fallbackData;
  try {
    const res = await fetchPortal();
    if (res.status === 401) { clearToken(); gotoLogin(); return; }
    if (res.ok) data = { ...fallbackData, ...(await res.json()) };
  } catch {}
  render({ ...data, company: data.company || companyName });
  lastSig = dataSignature(portalData);
  showSplash(portalData);
  startAutoRefresh();
}

boot();
