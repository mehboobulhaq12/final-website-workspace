// DashboardApp.jsx — Effect3 client portal dashboard.

const AV = {
  coral: 'linear-gradient(135deg,#FB8560,#F04A28)',
  ink: 'linear-gradient(135deg,#3a3a34,#1a1a17)',
  blue: 'linear-gradient(135deg,#5b8def,#2563D9)',
  green: 'linear-gradient(135deg,#3fbf93,#0E8F66)',
};

/* ---------- SIDEBAR ---------- */
function SideNav({ company }) {
  const [open, setOpen] = React.useState(true);
  const files = ['Deployment Plan', 'Solution Spec', 'SWOT & Risks'];
  return (
    <aside className="dcard side-card">
      <div className="side-collapse"><Icon name="chevronRight" size={16} style={{ transform: 'rotate(180deg)' }} /></div>
      <div className="side-item active"><Icon name="home" size={18} className="ic" /> Home page</div>
      <div className="side-item"><Icon name="check" size={18} className="ic" /> Tasks</div>
      <div className="side-item"><Icon name="chart" size={18} className="ic" /> Analytics <Icon name="chevronRight" size={15} className="chev" /></div>
      <div className="side-item"><Icon name="folder" size={18} className="ic" /> Documents <Icon name="chevronRight" size={15} className="chev" /></div>
      <div className="side-item active" onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
        <Icon name="folder" size={18} className="ic" /> {company}
        <Icon name="chevronDown" size={15} className="chev" style={{ transform: open ? 'none' : 'rotate(-90deg)' }} />
      </div>
      {open && (
        <div className="side-children">
          {files.map(f => (
            <div key={f} className="side-file"><Icon name="fileText" size={15} className="ic" /> {f}</div>
          ))}
        </div>
      )}
    </aside>
  );
}

/* ---------- QUICK CARDS ---------- */
function QuickCards() {
  const [sel, setSel] = React.useState('tasks');
  const cards = [
    { id: 'files', label: 'Files', icon: 'fileText' },
    { id: 'tasks', label: 'Tasks & Progress', icon: 'workflow' },
    { id: 'reports', label: 'Reports', icon: 'folder' },
  ];
  return (
    <div className="quick-row">
      {cards.map(c => (
        <div key={c.id} className={'quick' + (sel === c.id ? ' sel' : '')} onClick={() => setSel(c.id)}>
          <div className="q-ic"><Icon name={c.icon} size={24} /></div>
          <div className="q-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- PROGRESS ---------- */
function ProgressCard({ company }) {
  const steps = [
    { n: 1, label: 'Discovery', meta: 'Completed', state: 'done' },
    { n: 2, label: 'Build & Integrate', meta: 'In progress', state: 'current' },
    { n: 3, label: 'Launch', meta: 'Upcoming', state: 'future' },
  ];
  return (
    <div className="dcard prog-card">
      <h3>Project Progress</h3>
      <p className="prog-sub">{company} — AI Operating System deployment</p>
      <div className="stepper">
        <div className="track"><div className="fill" style={{ width: '50%' }} /></div>
        {steps.map(s => (
          <div key={s.n} className={'step ' + s.state}>
            <div className="node">{s.state === 'done' ? <Icon name="check" size={15} /> : s.n}</div>
            <div className="s-label">{s.label}</div>
            {s.state === 'current' ? (
              <div className="working-now">
                <span className="live" />
                <span className="wn-avatars">
                  <span className="av" style={{ background: AV.coral }}>KM</span>
                  <span className="av" style={{ background: AV.ink }}>DA</span>
                </span>
                Effect3 working now
              </div>
            ) : (
              <div className="s-meta">{s.meta}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- TASKS ---------- */
function TasksCard() {
  const initial = [
    { id: 1, name: 'Define target users & success metrics', tags: [{ t: 'Discovery' }], date: '08/12/2026', ava: AV.coral, ini: 'KM', done: false },
    { id: 2, name: 'Hand over data access & API keys', tags: [], date: '08/12/2026', ava: AV.blue, ini: 'JC', done: false },
    { id: 3, name: 'Map current workflows for automation', tags: [{ t: 'Build' }, { t: 'High', high: true }], date: '08/18/2026', ava: AV.ink, ini: 'DA', done: true },
    { id: 4, name: 'Approve agent guardrails & tone', tags: [{ t: 'Build' }], date: '08/18/2026', ava: AV.green, ini: 'SR', done: true },
    { id: 5, name: 'Review staging environment', tags: [{ t: 'Launch' }], date: '08/24/2026', ava: AV.coral, ini: 'KM', done: false },
  ];
  const [tasks, setTasks] = React.useState(initial);
  const toggle = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  return (
    <div className="dcard tasks-card">
      <div className="tasks-hd">
        <h3>Client Tasks</h3>
        <div className="more"><Icon name="more" size={18} /></div>
      </div>
      {tasks.map(t => (
        <div key={t.id} className={'task' + (t.done ? ' done' : '')}>
          <div className="check" onClick={() => toggle(t.id)}>{t.done && <Icon name="check" size={12} />}</div>
          <div className="t-name">{t.name}</div>
          <div className="t-tags">
            {t.tags.map((tg, i) => <span key={i} className={'tag-pill' + (tg.high ? ' high' : '')}>{tg.t}</span>)}
          </div>
          <div className="spacer" />
          <div className="t-date">{t.date}</div>
          <div className="t-ava" style={{ background: t.ava }}>{t.ini}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- CHAT ---------- */
function ChatCard() {
  const [msgs, setMsgs] = React.useState([
    { who: 'them', name: 'Kira · Effect3', ini: 'KM', ava: AV.coral, text: <>What do you think of the new agent flow? Here's the <a href="#" onClick={e=>e.preventDefault()}>preview</a>.</>, time: '1h' },
    { who: 'me', name: 'You', ini: 'YO', ava: AV.ink, text: 'Looks great! A couple of notes — left some comments inside.', time: '2h' },
  ]);
  const [val, setVal] = React.useState('');
  const send = () => {
    if (!val.trim()) return;
    setMsgs(m => [...m, { who: 'me', name: 'You', ini: 'YO', ava: AV.ink, text: val.trim(), time: 'now' }]);
    setVal('');
  };
  return (
    <div className="dcard chat-card">
      <h3>Chat</h3>
      <div className="chat-thread">
        {msgs.map((m, i) => (
          <div key={i} className={'msg ' + (m.who === 'me' ? 'me' : '')}>
            <div className="m-ava" style={{ background: m.ava }}>{m.ini}</div>
            <div className="m-body">
              <div className="m-bubble">{m.text}</div>
              <div className="m-meta">{m.name} · {m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          placeholder="Add message…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <span className="ci-ic"><Icon name="paperclip" size={16} /></span>
        <button className="send" onClick={send}><Icon name="send" size={15} /></button>
      </div>
    </div>
  );
}

/* ---------- DOCS ---------- */
function DocsCard() {
  const docs = [
    { name: 'Statement of Work', ext: 'PDF' },
    { name: 'Solution Architecture', ext: 'PDF' },
    { name: 'Data Access Agreement', ext: 'DOC' },
    { name: 'Discovery Workshop Notes', ext: 'DOC' },
  ];
  return (
    <div className="dcard docs-card">
      <h3>Latest Docs</h3>
      {docs.map((d, i) => (
        <div key={i} className="doc-row">
          <div className="d-ic"><Icon name="fileText" size={16} /></div>
          <div className="d-name">{d.name}</div>
          <div className="d-ext">{d.ext}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- APP ---------- */
function DashboardApp() {
  const TWEAK_DEFAULTS = window.__DASH_DEFAULTS;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const company = t.company || 'Acme Inc.';

  return (
    <div className="dash-root">
      <div className="dash-aura" />
      <div className="dash-inner">
        {/* header */}
        <header className="dash-header">
          <div className="dh-brand">
            <img src="assets/effect3-logo.png" alt="Effect3" />
            <span className="name">{company} Portal</span>
          </div>
          <nav className="dh-nav">
            <a>Invoices</a>
            <a>Meeting Notes</a>
            <a>About Effect3</a>
          </nav>
          <div className="dh-right">
            <div className="dh-bell"><Icon name="bell" size={18} /><span className="nd" /></div>
            <div className="dh-ava">YO</div>
          </div>
        </header>

        {/* hero */}
        <section className="dash-hero">
          <h1>{t.heading}</h1>
          <div className="dash-search">
            <Icon name="search" size={19} className="ic" />
            <input placeholder="Search docs, tasks, files — or ask AI anything…" />
            <span className="ai-pill"><Icon name="sparkles" size={13} /> AI</span>
          </div>
        </section>

        {/* grid */}
        <div className="dash-grid">
          <SideNav company={company} />

          <div className="center-col">
            <QuickCards />
            <ProgressCard company={company} />
            <TasksCard />
          </div>

          <div className="right-col">
            <ChatCard />
            <DocsCard />
          </div>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Portal" />
        <TweakText label="Company name" value={t.company} onChange={(v) => setTweak('company', v)} />
        <TweakText label="Welcome heading" value={t.heading} onChange={(v) => setTweak('heading', v)} />
      </TweaksPanel>
    </div>
  );
}

window.DashboardApp = DashboardApp;
