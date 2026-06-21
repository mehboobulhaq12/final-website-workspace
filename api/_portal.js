import { listUsers } from "./_auth.js";

const token = process.env.NOTION_TOKEN || "";

// Multi-tenant client registry. Resolved per request via the ?client=<key> param.
const clients = {
  itv: {
    key: "itv",
    company: "In the Visuals",
    avatar: "IV",
    taskDb: process.env.NOTION_TASK_DB || "37317297-181e-80ff-9cf2-c864e924dc76",
    phaseDbs: [
      { name: "Phase 1", label: "LinkedIn Outbound Personalization", db: "37317297-181e-80ff-9cf2-c864e924dc76", status: "Active" },
      { name: "Phase 2", label: "Lead Scoring", db: "37317297-181e-80b7-8458-cd350bfd5ad9", status: "Next" },
      { name: "Phase 3", label: "Competitor Web Search", db: "37317297-181e-80b8-b8b4-e6e740a528d0", status: "Planned" },
      { name: "Phase 4", label: "Email Outbound", db: "37317297-181e-80c9-b111-cb03b1e4a571", status: "Planned" },
    ],
    meetingDb: process.env.NOTION_MEETING_DB || "37317297-181e-8094-ae38-ed4049b25873",
    queryDb: process.env.NOTION_QUERY_DB || "37317297-181e-804c-ab53-cc9c8049aff3",
    invoiceDb: process.env.NOTION_INVOICE_DB || "37417297-181e-810a-a19b-000b37784358",
    docsPage: process.env.NOTION_DOCS_PAGE || "37217297-181e-8014-be26-c7fba6783b18",
    filesPageUrl: "https://app.notion.com/p/All-Documents-37217297181e8014be26c7fba6783b18?source=copy_link",
    formEmbed: "https://spiral-fish-b54.notion.site/ebd/37317297181e8094aed6c0a72483927c",
    emailDomains: [], // e.g. ["inthevisuals.com"] to require company-domain emails at signup
  },
  pup: {
    key: "pup",
    company: "Print Us Pro",
    avatar: "PU",
    // PUP databases are queried through Notion's data source API (2025-09-03).
    useDataSource: true,
    taskDb: "37817297-181e-81d3-9234-000bb3a110b6", // Phase 1 data source (overview kanban/timeline)
    phaseDbs: [
      { name: "Phase 1", label: "Market Research & Launch Foundation", db: "37817297-181e-81d3-9234-000bb3a110b6", status: "Active" },
      { name: "Phase 2", label: "Ads & Social Setup", db: "37817297-181e-815e-aae9-000b28945a66", status: "Next" },
      { name: "Phase 3", label: "Growth, Content & Ad Testing", db: "37817297-181e-8199-84bd-000b99a60aac", status: "Planned" },
      { name: "Phase 4", label: "Outbound & Automation", db: "37817297-181e-8118-8e12-000bb41babe9", status: "Planned" },
    ],
    meetingDb: "",
    queryDb: "37817297-181e-81e5-95af-000bd154d44c", // Query Form data source (write target)
    invoiceDb: "", // no PUP invoice data source yet — invoice tab shows empty state
    docsPage: "",
    filesPageUrl: "https://www.notion.so/37117297181e808486a7e37c5a86e045",
    formEmbed: "https://spiral-fish-b54.notion.site/ebd/37917297181e80d4981ef68f813e0317",
    emailDomains: [], // e.g. ["printuspro.com"] to require company-domain emails at signup
  },
  badri: {
    key: "badri",
    company: "Badri Consultancy",
    avatar: "BC",
    useDataSource: true,
    taskDb: "37a17297-181e-81a4-a074-000b56bab99a", // Phase 1 data source (overview)
    phaseDbs: [
      { name: "Phase 1", label: "News Scrapping and Daily Report", db: "37a17297-181e-81a4-a074-000b56bab99a", status: "Active" },
      { name: "Phase 2", label: "Email Connecting", db: "37a17297-181e-8186-a24d-000b4b345428", status: "Next" },
      { name: "Phase 3", label: "AI Chat Assistant", db: "37a17297-181e-816a-94c8-000bd4724de7", status: "Planned" },
      { name: "Phase 4", label: "Privacy Check, Testing & Handover", db: "37a17297-181e-815a-bb39-000b781594ac", status: "Planned" },
    ],
    meetingDb: "",
    queryDb: "",
    invoiceDb: "",
    docsPage: "",
    filesPageUrl: "",
    formEmbed: "https://spiral-fish-b54.notion.site/ebd/37a17297181e80369dcfc864eeff9b15",
    emailDomains: [],
  },
};

const companyAliases = {
  "in the visuals": "itv",
  "inthevisuals": "itv",
  "itv": "itv",
  "print us pro": "pup",
  "printuspro": "pup",
  "pup": "pup",
  "pup - print us pro": "pup",
  "badri consultancy": "badri",
  "badri": "badri",
  "badriconsultancy": "badri",
};

export function resolveClient(input) {
  const byKey = String(input || "").trim().toLowerCase();
  if (byKey && clients[byKey]) return clients[byKey];
  const aliased = companyAliases[byKey];
  if (aliased && clients[aliased]) return clients[aliased];
  return clients.itv;
}

/** True only when the input matches a real client key or company alias. */
export function isKnownCompany(input) {
  const k = String(input || "").trim().toLowerCase();
  return !!(clients[k] || companyAliases[k]);
}

function plain(rich = []) {
  return rich.map((item) => item.plain_text || "").join("").trim();
}

function propText(props, name) {
  const prop = props[name];
  if (!prop) return "";
  if (prop.type === "title") return plain(prop.title);
  if (prop.type === "rich_text") return plain(prop.rich_text);
  if (prop.type === "url") return prop.url || "";
  return "";
}

function firstProp(props, names) {
  return names.map((name) => props[name]).find(Boolean);
}

function propValue(prop) {
  if (!prop) return "";
  if (prop.type === "title") return plain(prop.title);
  if (prop.type === "rich_text") return plain(prop.rich_text);
  if (prop.type === "url") return prop.url || "";
  if (prop.type === "email") return prop.email || "";
  if (prop.type === "phone_number") return prop.phone_number || "";
  if (prop.type === "number") return prop.number ?? "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "status") return prop.status?.name || "";
  if (prop.type === "date") return prop.date?.start || "";
  if (prop.type === "checkbox") return prop.checkbox ? "Yes" : "No";
  if (prop.type === "formula") return propValue(prop.formula);
  return "";
}

function normalizeTask(page) {
  const p = page.properties || {};
  return {
    id: page.id,
    name: propText(p, "Task name") || propText(p, "Name") || "Untitled task",
    status: p.Status?.status?.name || "Inline",
    priority: p.Priority?.select?.name || "Normal",
    dueDate: p["Due date"]?.date?.start || "",
    updatedAt: p["Updated at"]?.last_edited_time || page.last_edited_time || "",
    tags: (p["Task type"]?.multi_select || []).map((tag) => tag.name),
    effort: p["Effort level"]?.select?.name || "",
    url: page.url,
  };
}

function taskStatusKey(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("complete") || s.includes("publish")) return "done";
  if (s.includes("ongoing") || s.includes("progress")) return "doing";
  return "todo";
}

function summarizePhase(label, tasks) {
  if (!tasks.length) return `${label} is planned. Tasks will appear here once they are added in Notion.`;
  const taskNames = tasks.map((task) => task.name).filter(Boolean);
  const active = tasks.filter((task) => taskStatusKey(task.status) === "doing").map((task) => task.name);
  const goals = taskNames.slice(0, 3).join(", ");
  if (active.length) return `${label}: currently working on ${active.slice(0, 2).join(", ")}. Main goals include ${goals}.`;
  return `${label}: planned around ${goals}. Progress updates as tasks move through Notion.`;
}

function phaseProgress(tasks) {
  if (!tasks.length) return 0;
  const done = tasks.filter((task) => taskStatusKey(task.status) === "done").length;
  const doing = tasks.filter((task) => taskStatusKey(task.status) === "doing").length;
  return Math.min(100, Math.round(((done + doing * 0.5) / tasks.length) * 100));
}

async function notion(path, init = {}, version = "2022-06-28") {
  if (!token) throw new Error("NOTION_TOKEN missing");
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": version,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message || `Notion ${res.status}`);
  return body;
}

async function queryDatabase(id, body = {}) {
  const data = await notion(`/databases/${id}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 50, ...body }),
  });
  return data.results || [];
}

// Query a Notion data source (2025-09-03 API) for data-source-based clients.
async function queryDataSource(id, body = {}) {
  const data = await notion(`/data_sources/${id}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 50, ...body }),
  }, "2025-09-03");
  return data.results || [];
}

function queryFor(client, id, body = {}) {
  return client?.useDataSource ? queryDataSource(id, body) : queryDatabase(id, body);
}

async function getPhases(client) {
  return Promise.all(client.phaseDbs.map(async (phase) => {
    const pages = await queryFor(client, phase.db, {
      sorts: [{ property: "Due date", direction: "ascending" }],
    }).catch(() => []);
    const tasks = pages.map(normalizeTask);
    const done = tasks.filter((task) => taskStatusKey(task.status) === "done").length;
    const doing = tasks.filter((task) => taskStatusKey(task.status) === "doing").length;
    const todo = tasks.filter((task) => taskStatusKey(task.status) === "todo").length;
    const slim = tasks.map((task) => ({ name: task.name, status: task.status, priority: task.priority, dueDate: task.dueDate, updatedAt: task.updatedAt, url: task.url }));
    return {
      name: phase.name,
      label: phase.label,
      status: phase.status,
      summary: summarizePhase(phase.label, tasks),
      progress: phaseProgress(tasks),
      counts: { total: tasks.length, done, doing, todo },
      complete: tasks.length > 0 && done === tasks.length,
      dueDates: tasks.map((task) => task.dueDate).filter(Boolean),
      tasks: slim.slice(0, 4),
      tasksAll: slim,
    };
  }));
}

// Decide which phase is "current": the first phase that still has open work.
function applyPhaseProgression(phases) {
  let currentIndex = phases.findIndex((p) => p.counts.total > 0 && !p.complete);
  if (currentIndex === -1) {
    for (let i = phases.length - 1; i >= 0; i--) {
      if (phases[i].counts.total > 0) { currentIndex = i; break; }
    }
  }
  phases.forEach((p, i) => {
    p.current = i === currentIndex;
    if (p.complete) p.status = "Complete";
    else if (p.current) p.status = "Active";
  });
  return currentIndex < 0 ? 0 : currentIndex;
}

function normalizeMeeting(page) {
  const p = page.properties || {};
  return {
    id: page.id,
    title: propText(p, "Meetings") || propText(p, "Name") || "Meeting note",
    date: p.Date?.date?.start || page.last_edited_time?.slice(0, 10) || "",
    url: propText(p, "URL") || page.url,
  };
}

function normalizeInvoice(page) {
  const p = page.properties || {};
  const titleProp = Object.values(p).find((prop) => prop.type === "title");
  const amountProp = firstProp(p, ["Amount", "Total", "Invoice Amount", "Price", "Value"]);
  const statusProp = firstProp(p, ["Status", "Payment Status", "Invoice Status"]);
  const dateProp = firstProp(p, ["Due date", "Due Date", "Date", "Invoice Date"]);
  const linkProp = firstProp(p, ["URL", "Link", "Invoice Link", "Payment Link"]);
  return {
    id: page.id,
    title: propValue(titleProp) || "Invoice",
    amount: propValue(amountProp),
    status: propValue(statusProp) || "Pending",
    date: propValue(dateProp),
    url: propValue(linkProp) || page.url,
  };
}

async function getInvoices(client) {
  if (!client.invoiceDb) return { items: [], accessIssue: "" };
  try {
    const pages = await queryFor(client, client.invoiceDb, { sorts: [{ timestamp: "last_edited_time", direction: "descending" }] });
    return { items: pages.map(normalizeInvoice), accessIssue: "" };
  } catch (error) {
    return { items: [], accessIssue: error.message || "Invoice database is not available." };
  }
}

async function getDocs(client) {
  if (!client.docsPage) return [];
  const data = await notion(`/blocks/${client.docsPage}/children?page_size=100`, {}, "2026-03-11");
  return (data.results || [])
    .map((block) => {
      if (block.type === "child_page") {
        return {
          id: block.id,
          title: block.child_page?.title || "Document",
          url: `https://www.notion.so/${block.id.replaceAll("-", "")}`,
        };
      }
      if (block.type === "file") {
        const file = block.file?.file || block.file?.external;
        return {
          id: block.id,
          title: block.file?.name || block.file?.caption?.[0]?.plain_text || file?.url?.split("/").pop()?.split("?")[0] || "Uploaded file",
          url: file?.url || `https://www.notion.so/${block.id.replaceAll("-", "")}`,
        };
      }
      return null;
    })
    .filter(Boolean);
}

export async function getPortalData(clientKey) {
  const client = resolveClient(clientKey);
  const [taskPages, meetingPages, docs, phases, invoices, team] = await Promise.all([
    queryFor(client, client.taskDb, { sorts: [{ property: "Due date", direction: "ascending" }] }),
    client.meetingDb
      ? queryFor(client, client.meetingDb, { sorts: [{ property: "Date", direction: "descending" }] }).catch(() => [])
      : Promise.resolve([]),
    getDocs(client).catch(() => []),
    getPhases(client),
    getInvoices(client),
    listUsers(client.key).catch(() => []),
  ]);

  const tasks = taskPages.map(normalizeTask);
  const currentIndex = applyPhaseProgression(phases);
  const current = phases[currentIndex];
  const currentPhase = current
    ? { name: current.name, label: current.label, index: currentIndex, tasks: current.tasksAll || current.tasks || [] }
    : { name: "", label: "", index: 0, tasks };
  const completionDate = [
    ...tasks.map((task) => task.dueDate).filter(Boolean),
    ...phases.flatMap((phase) => phase.dueDates || []),
  ].sort().at(-1) || "";

  return {
    client: client.key,
    company: client.company,
    avatar: client.avatar,
    formEmbed: client.formEmbed || "",
    sync: { live: true, message: "Synced from Notion", syncedAt: new Date().toISOString() },
    tasks,
    meetings: meetingPages.map(normalizeMeeting),
    docs,
    phases,
    currentPhase,
    invoices,
    team,
    completionDate,
    filesPageUrl: client.filesPageUrl,
  };
}

export async function uploadFileToNotion(clientKey, { fileName = "client-file", contentType = "application/octet-stream", base64 = "" }) {
  if (!token) throw new Error("NOTION_TOKEN missing");
  const client = resolveClient(clientKey);
  if (!client.docsPage) throw new Error("File uploads are not configured for this workspace.");
  const raw = Buffer.from(String(base64), "base64");
  if (!raw.length) throw new Error("Missing file data");

  const upload = await notion("/file_uploads", {
    method: "POST",
    body: JSON.stringify({ mode: "single_part", filename: fileName, content_type: contentType }),
  }, "2026-03-11");

  const form = new FormData();
  form.append("file", new Blob([raw], { type: contentType }), fileName);
  const sent = await fetch(`https://api.notion.com/v1/file_uploads/${upload.id}/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2026-03-11",
    },
    body: form,
  });
  const sentBody = await sent.json();
  if (!sent.ok) throw new Error(sentBody.message || "File upload failed");

  await notion(`/blocks/${client.docsPage}/children`, {
    method: "PATCH",
    body: JSON.stringify({
      children: [
        {
          type: "file",
          file: {
            type: "file_upload",
            file_upload: { id: upload.id },
          },
        },
      ],
    }),
  }, "2026-03-11");

  return { ok: true, fileUploadId: upload.id, fileName };
}

async function createFileUpload({ fileName = "attachment", contentType = "application/octet-stream", base64 = "" }) {
  const raw = Buffer.from(String(base64), "base64");
  if (!raw.length) return null;

  const upload = await notion("/file_uploads", {
    method: "POST",
    body: JSON.stringify({ mode: "single_part", filename: fileName, content_type: contentType }),
  }, "2026-03-11");

  const form = new FormData();
  form.append("file", new Blob([raw], { type: contentType }), fileName);
  const sent = await fetch(`https://api.notion.com/v1/file_uploads/${upload.id}/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2026-03-11",
    },
    body: form,
  });
  const sentBody = await sent.json();
  if (!sent.ok) throw new Error(sentBody.message || "Attachment upload failed");
  return upload.id;
}

export async function submitQueryToNotion(clientKey, { name = "", query = "", referenceUrl = "", attachment = null }) {
  if (!token) throw new Error("NOTION_TOKEN missing");
  const client = resolveClient(clientKey);
  const cleanName = String(name || "").trim();
  const cleanQuery = String(query || "").trim();
  const cleanUrl = String(referenceUrl || "").trim();
  if (!cleanName) throw new Error("Name is required");
  if (!cleanQuery) throw new Error("Query is required");

  const properties = {
    "Respondent Name": {
      title: [{ text: { content: cleanName } }],
    },
    "Mention Your Query Here": {
      rich_text: [{ text: { content: cleanQuery.slice(0, 1900) } }],
    },
  };

  if (cleanUrl) properties["Any Reference Link?"] = { url: cleanUrl };

  if (attachment?.base64) {
    const uploadId = await createFileUpload(attachment);
    if (uploadId) {
      properties["Any Attachment?"] = {
        files: [
          {
            name: attachment.fileName || "attachment",
            type: "file_upload",
            file_upload: { id: uploadId },
          },
        ],
      };
    }
  }

  const parent = client.useDataSource
    ? { type: "data_source_id", data_source_id: client.queryDb }
    : { database_id: client.queryDb };
  const page = await notion("/pages", {
    method: "POST",
    body: JSON.stringify({ parent, properties }),
  }, "2026-03-11");

  return { ok: true, pageId: page.id, url: page.url };
}
