/* ============================================================
   AttentionCoo · V3 site runtime
   Shared header/footer, language/theme, search, page renderers.
   ============================================================ */
(function () {
  "use strict";

  const SITE = window.SITE;
  if (!SITE) {
    console.warn("site-data.js is missing.");
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.1A8.7 8.7 0 0 1 9.9 3.5 8.8 8.8 0 1 0 20.5 14.1Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    github: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    rss: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
  };

  function getLang() {
    return document.documentElement.dataset.lang === "en" ? "en" : "zh";
  }

  function getTheme() {
    return document.documentElement.dataset.theme === "paper" ? "paper" : "night";
  }

  function pick(value) {
    if (value == null) return "";
    return typeof value === "string" ? value : (value[getLang()] ?? value.zh ?? value.en ?? "");
  }

  function ui(key) {
    const entry = SITE.ui[key];
    return entry ? pick(entry) : key;
  }

  function currentPath() {
    return window.location.pathname.replace(/\/index\.html$/, "/");
  }

  function isActive(href) {
    const path = currentPath();
    if (href === "/") return path === "/";
    return path === href || path.startsWith(href);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
    }[char]));
  }

  function displayName(project) {
    const names = {
      "stroke-multi-agent-cdss": "Stroke Multi-Agent CDSS",
      "learning-characterizing-mas": "LearnAgent",
      "titanic-ft-transformer": "Titanic FT-Transformer",
    };
    return names[project.slug] || project.name;
  }

  function metadataText(value) {
    if (!value) return "";
    return typeof value === "string" ? value : pick(value);
  }

  function shortcutLabel() {
    return /Mac|iPhone|iPad/.test(navigator.platform || "") ? "⌘K" : "Ctrl K";
  }

  function renderHeader() {
    const root = $("#site-header");
    if (!root) return;
    const nav = SITE.nav.map((item) => {
      const active = isActive(item.href);
      return `<a class="nav-link${active ? " is-active" : ""}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${escapeHtml(pick(item))}</a>`;
    }).join("");
    root.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="/" aria-label="AttentionCoo · Home">
            <span class="brand-mark" aria-hidden="true">✦</span>
            <span>AttentionCoo</span>
          </a>
          <nav class="main-nav" aria-label="Primary">${nav}</nav>
          <div class="header-tools">
            <button class="search-trigger" type="button" data-search-open aria-label="${escapeHtml(ui("search"))}" aria-haspopup="dialog">
              ${icons.search}<span>${escapeHtml(ui("search"))}</span><kbd>${shortcutLabel()}</kbd>
            </button>
            <div class="lang-toggle" role="group" aria-label="Language / 语言">
              <button type="button" data-set-lang="zh" class="${getLang() === "zh" ? "is-active" : ""}">中</button>
              <button type="button" data-set-lang="en" class="${getLang() === "en" ? "is-active" : ""}">EN</button>
            </div>
            <button class="theme-toggle" type="button" data-theme-toggle aria-label="${escapeHtml(getTheme() === "night" ? ui("themeToLight") : ui("themeToDark"))}" title="${escapeHtml(getTheme() === "night" ? ui("themeToLight") : ui("themeToDark"))}">
              ${getTheme() === "night" ? icons.sun : icons.moon}
            </button>
            <button class="icon-button mobile-toggle" type="button" data-menu-toggle aria-label="${escapeHtml(ui("menu"))}" aria-expanded="false">${icons.menu}</button>
          </div>
        </div>
        <div class="mobile-panel" data-mobile-panel>
          <nav class="container" aria-label="Mobile">
            ${SITE.nav.map((item) => `<a href="${item.href}" class="${isActive(item.href) ? "is-active" : ""}">${escapeHtml(pick(item))}</a>`).join("")}
            <a href="mailto:${SITE.email}">${escapeHtml(ui("email"))}</a>
          </nav>
        </div>
      </header>
    `;
    bindHeader();
  }

  function bindHeader() {
    const menuButton = $("[data-menu-toggle]");
    const panel = $("[data-mobile-panel]");
    if (!menuButton || !panel) return;
    menuButton.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.innerHTML = open ? icons.close : icons.menu;
    });
  }

  function renderFooter() {
    const root = $("#site-footer");
    if (!root) return;
    root.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div>
              <p class="eyebrow">Signal</p>
              <p class="footer-signal">
                <span class="lang-zh">构建可审计的 Agent 系统，研究模型如何理解世界。</span>
                <span class="lang-en">Build auditable agents and study how models understand the world.</span>
              </p>
            </div>
            <div class="footer-col">
              <h3>Navigate</h3>
              ${SITE.nav.map((item) => `<a href="${item.href}">${escapeHtml(pick(item))}</a>`).join("")}
            </div>
            <div class="footer-col">
              <h3>Elsewhere</h3>
              <a href="${SITE.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href="mailto:${SITE.email}">Email ↗</a>
              <a href="${SITE.rss}">RSS ↗</a>
              <a href="/AttentionCoo.vcf" download>vCard ↓</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span data-current-year></span> AttentionCoo</span>
            <span>Version ${SITE.version} · Last updated ${SITE.lastUpdated}</span>
            <span data-local-time></span>
          </div>
        </div>
      </footer>
    `;
    updateClock();
    updateYear();
  }

  function updateYear() {
    $$("[data-current-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  function updateClock() {
    const now = new Date();
    const locale = getLang() === "zh" ? "zh-CN" : "en-GB";
    const text = new Intl.DateTimeFormat(locale, {
      timeZone: "Asia/Shanghai",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
    $$("[data-local-time]").forEach((el) => {
      el.textContent = getLang() === "zh" ? `中国时间 ${text} · UTC+8` : `China ${text} · UTC+8`;
    });
  }

  function applyTheme(theme, persist = false) {
    const next = theme === "paper" ? "paper" : "night";
    document.documentElement.dataset.theme = next;
    if (persist) {
      try { localStorage.setItem("aco-theme", next); } catch (error) { /* ignore */ }
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "paper" ? "#f3eee3" : "#07080d");
    const button = $("[data-theme-toggle]");
    if (button) {
      const label = next === "night" ? ui("themeToLight") : ui("themeToDark");
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.innerHTML = next === "night" ? icons.sun : icons.moon;
    }
  }

  function applyLanguage(lang, persist = false) {
    const next = lang === "en" ? "en" : "zh";
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    if (persist) {
      try { localStorage.setItem("aco-lang", next); } catch (error) { /* ignore */ }
    }
    if (document.body.dataset.titleZh) {
      document.title = next === "en"
        ? (document.body.dataset.titleEn || document.body.dataset.titleZh)
        : document.body.dataset.titleZh;
    }
    renderHeader();
    renderFooter();
    renderPage();
    updateClock();
    updateSearchText();
    if ($("#search-dialog")?.open) renderSearchResults($("#search-input")?.value || "");
  }

  function ensureToast() {
    if ($("#site-toast")) return;
    const toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  let toastTimer = 0;
  function showToast(message) {
    ensureToast();
    const toast = $("#site-toast");
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2000);
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        if (!ok) throw new Error("copy failed");
      }
      showToast(successMessage || ui("copied"));
    } catch (error) {
      showToast(ui("copyFailed"));
    }
  }

  function buildSearchItems() {
    const items = [];
    const pageLabels = {
      "/": { zh: "首页", en: "Home" },
      "/work/": { zh: "项目", en: "Work" },
      "/notes/": { zh: "笔记", en: "Notes" },
      "/research/": { zh: "研究", en: "Research" },
      "/about/": { zh: "关于", en: "About" },
      "/about/cv.html": { zh: "简历", en: "CV" },
    };
    Object.entries(pageLabels).forEach(([href, label]) => {
      items.push({ type: getLang() === "zh" ? "页面" : "Page", title: pick(label), subtitle: href, href, search: `${label.zh} ${label.en} ${href}` });
    });
    SITE.projects.forEach((project) => {
      items.push({
        type: pick(project.type),
        title: displayName(project),
        subtitle: pick(project.headline),
        href: `/work/${project.slug}.html`,
        search: [displayName(project), pick(project.type), pick(project.headline), pick(project.summary), ...project.stack, project.name].join(" "),
      });
    });
    SITE.notes.forEach((note) => {
      items.push({
        type: pick(note.type),
        title: pick(note.title),
        subtitle: pick(note.excerpt),
        href: note.href,
        search: [pick(note.title), pick(note.excerpt), note.date, ...note.tags].join(" "),
      });
    });
    items.push({
      type: ui("publication"),
      title: "VisMet-Bench",
      subtitle: "CVPR 2026 Findings",
      href: "/research/",
      search: "VisMet-Bench visual metaphor multimodal research CVPR 2026 Findings 视觉隐喻 多模态 论文",
    });
    items.push(
      { type: getLang() === "zh" ? "操作" : "Action", title: ui("copyEmail"), subtitle: SITE.email, action: "copy-email", search: `email mail copy 邮箱 ${SITE.email}` },
      { type: getLang() === "zh" ? "操作" : "Action", title: "GitHub", subtitle: "github.com/AttentionCoo", href: SITE.github, external: true, search: "github code repository 开源 代码" },
      { type: getLang() === "zh" ? "操作" : "Action", title: "RSS", subtitle: "/feed.xml", href: SITE.rss, search: "rss feed subscribe 订阅" }
    );
    return items;
  }

  function ensureSearchDialog() {
    if ($("#search-dialog")) return;
    const dialog = document.createElement("dialog");
    dialog.id = "search-dialog";
    dialog.className = "search-dialog";
    dialog.setAttribute("aria-labelledby", "search-title");
    dialog.innerHTML = `
      <div class="search-shell">
        <div class="search-head">
          ${icons.search}
          <label class="sr-only" for="search-input" id="search-title">${escapeHtml(ui("searchTitle"))}</label>
          <input class="search-input" id="search-input" type="search" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-controls="search-results" aria-expanded="true" placeholder="${escapeHtml(ui("searchPlaceholder"))}" />
          <button class="icon-button" type="button" data-search-close aria-label="${escapeHtml(ui("close"))}">${icons.close}</button>
        </div>
        <div class="search-results" id="search-results" role="listbox" aria-label="${escapeHtml(ui("searchTitle"))}"></div>
        <div class="search-footer">
          <span>${escapeHtml(ui("searchHint"))}</span>
          <span>AttentionCoo / ${shortcutLabel()}</span>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.closest("[data-search-close]")) closeSearch();
    });
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
    dialog.addEventListener("cancel", () => document.body.classList.remove("modal-open"));
  }

  function updateSearchText() {
    const dialog = $("#search-dialog");
    if (!dialog) return;
    const title = $("#search-title");
    const input = $("#search-input");
    const close = $("[data-search-close]");
    if (title) title.textContent = ui("searchTitle");
    if (input) input.placeholder = ui("searchPlaceholder");
    if (close) close.setAttribute("aria-label", ui("close"));
    const footer = $(".search-footer span:first-child", dialog);
    if (footer) footer.textContent = ui("searchHint");
  }

  let searchActive = 0;
  let searchFiltered = [];

  function renderSearchResults(rawQuery) {
    const input = $("#search-input");
    const box = $("#search-results");
    if (!input || !box) return;
    const query = (rawQuery ?? input.value ?? "").trim().toLocaleLowerCase();
    const tokens = query ? query.split(/\s+/) : [];
    const all = buildSearchItems();
    searchFiltered = all
      .filter((item) => tokens.every((token) => item.search.toLocaleLowerCase().includes(token)))
      .sort((a, b) => {
        const at = a.title.toLocaleLowerCase();
        const bt = b.title.toLocaleLowerCase();
        const aScore = query ? (at.startsWith(query) ? 3 : at.includes(query) ? 2 : 1) : 0;
        const bScore = query ? (bt.startsWith(query) ? 3 : bt.includes(query) ? 2 : 1) : 0;
        return bScore - aScore;
      })
      .slice(0, 12);
    if (!searchFiltered.length) {
      box.innerHTML = `<div class="search-empty">${escapeHtml(ui("searchEmpty"))}</div>`;
      input.removeAttribute("aria-activedescendant");
      return;
    }
    if (searchActive >= searchFiltered.length) searchActive = 0;
    box.innerHTML = searchFiltered.map((item, index) => `
      <button class="search-result" id="search-result-${index}" type="button" role="option" data-search-index="${index}" aria-selected="${index === searchActive}">
        <span class="search-result__type">${escapeHtml(item.type)}</span>
        <span class="search-result__body">
          <span class="search-result__title">${escapeHtml(item.title)}</span>
          <span class="search-result__sub">${escapeHtml(item.subtitle || "")}</span>
        </span>
      </button>
    `).join("");
    setSearchActive(searchActive, false);
  }

  function setSearchActive(index, scroll = true) {
    if (!searchFiltered.length) return;
    searchActive = Math.max(0, Math.min(index, searchFiltered.length - 1));
    $$(".search-result").forEach((el, i) => el.setAttribute("aria-selected", String(i === searchActive)));
    const input = $("#search-input");
    if (input) input.setAttribute("aria-activedescendant", `search-result-${searchActive}`);
    if (scroll) $(`#search-result-${searchActive}`)?.scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    ensureSearchDialog();
    const dialog = $("#search-dialog");
    const input = $("#search-input");
    if (!dialog || !input) return;
    searchActive = 0;
    input.value = "";
    renderSearchResults("");
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("modal-open");
    window.setTimeout(() => input.focus(), 20);
  }

  function closeSearch() {
    const dialog = $("#search-dialog");
    if (dialog?.open) dialog.close();
    document.body.classList.remove("modal-open");
  }

  function runSearchItem(item) {
    if (!item) return;
    closeSearch();
    if (item.action === "copy-email") {
      copyText(SITE.email, ui("copied"));
      return;
    }
    if (item.href) {
      if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
      else window.location.href = item.href;
    }
  }

  let workFilter = new URLSearchParams(window.location.search).get("type") || "all";

  function workRow(project) {
    const metrics = project.metrics?.[0];
    return `
      <a class="work-row" href="/work/${project.slug}.html">
        <span class="work-index">${String(SITE.projects.indexOf(project) + 1).padStart(2, "0")}</span>
        <div class="work-copy">
          <h3>${escapeHtml(displayName(project))}</h3>
          <p>${escapeHtml(pick(project.summary))}</p>
          <div class="work-tags">
            ${project.stack.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
        ${metrics ? `<div class="work-metric"><strong>${escapeHtml(metrics.value)}</strong><span>${escapeHtml(pick(metrics.label))}</span></div>` : ""}
        <span class="work-arrow" aria-hidden="true">↗</span>
      </a>
    `;
  }

  function notesRows(notes) {
    return notes.map((note) => `
      <a class="note-row" href="${note.href}">
        <div class="note-meta">
          <span class="note-type">${escapeHtml(pick(note.type))}</span>
          <span>${escapeHtml(pick(note.dateLabel))}</span>
          <span>${note.readTime} min</span>
        </div>
        <div class="note-copy">
          <h3>${escapeHtml(pick(note.title))}</h3>
          <p>${escapeHtml(pick(note.excerpt))}</p>
        </div>
        <span class="note-arrow" aria-hidden="true">↗</span>
      </a>
    `).join("");
  }

  function renderHome() {
    const featured = $("#featured-work");
    if (featured) {
      featured.innerHTML = SITE.projects.filter((project) => project.featured).slice(0, 3).map(workRow).join("");
    }
    const latest = $("#latest-notes");
    if (latest) {
      const notes = [...SITE.notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
      latest.innerHTML = notesRows(notes);
    }
  }

  function renderWorkIndex() {
    const list = $("#work-list");
    if (!list) return;
    const allowed = ["all", "research", "engineering", "experiment"];
    if (!allowed.includes(workFilter)) workFilter = "all";
    const projects = workFilter === "all" ? SITE.projects : SITE.projects.filter((project) => project.category === workFilter);
    list.innerHTML = projects.length ? projects.map(workRow).join("") : `<div class="empty-state">${escapeHtml(ui("noResults"))}</div>`;
    $$("[data-work-filter]").forEach((button) => {
      const active = button.dataset.workFilter === workFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const count = $("#work-count");
    if (count) count.textContent = `${projects.length} / ${SITE.projects.length}`;
  }

  function renderNotesIndex() {
    const list = $("#notes-list");
    if (!list) return;
    const notes = [...SITE.notes].sort((a, b) => b.date.localeCompare(a.date));
    list.innerHTML = notesRows(notes);
  }

  function renderTimeline() {
    const root = $("#timeline");
    if (!root) return;
    root.innerHTML = SITE.timeline.map((item) => `
      <div class="timeline-item">
        <div class="timeline-meta">
          <span>${escapeHtml(metadataText(item.period))}</span>
          <span>·</span>
          <span>${escapeHtml(pick(item.tag))}</span>
        </div>
        <h3>${escapeHtml(pick(item.title))}</h3>
        <p>${escapeHtml(pick(item.desc))}</p>
        ${item.href ? `<a href="${item.href}">${getLang() === "zh" ? "查看相关" : "View related"} →</a>` : ""}
      </div>
    `).join("");
  }

  function renderSkills() {
    const root = $("#skills-grid");
    if (!root) return;
    root.innerHTML = SITE.skills.map((skill) => `
      <a class="skill-card" href="${skill.href}">
        <strong>${escapeHtml(pick(skill.name))}</strong>
        <span>${escapeHtml(pick(skill.evidence))}</span>
      </a>
    `).join("");
  }

  function computeStreak(snapshot) {
    if (!snapshot?.calendar || !snapshot.firstDay) return 0;
    const start = new Date(snapshot.firstDay + "T00:00:00Z");
    const days = [];
    snapshot.calendar.forEach((week, weekIndex) => {
      week.forEach((count, dayIndex) => {
        days.push({
          date: new Date(start.getTime() + (weekIndex * 7 + dayIndex) * 86400000).toISOString().slice(0, 10),
          count: Number(count) || 0,
        });
      });
    });
    const today = new Date().toISOString().slice(0, 10);
    let index = days.length - 1;
    while (index >= 0 && days[index].date > today) index -= 1;
    if (index >= 0 && days[index].count === 0) index -= 1;
    let streak = 0;
    while (index >= 0 && days[index].count > 0) {
      streak += 1;
      index -= 1;
    }
    return streak;
  }

  function renderActivity() {
    const root = $("#activity-card");
    const snapshot = window.ACTIVITY_SNAPSHOT;
    if (!root || !snapshot?.calendar) return;
    const weeks = snapshot.calendar.slice(-26);
    const start = new Date(snapshot.firstDay + "T00:00:00Z");
    const offset = snapshot.calendar.length - weeks.length;
    const streak = computeStreak(snapshot);
    const labels = getLang() === "zh"
      ? ["提交", "连续贡献", "Stars", "公开仓库"]
      : ["commits", "current streak", "stars", "public repos"];
    const columns = weeks.map((week, weekIndex) => `
      <div class="heat-col">
        ${week.map((count, dayIndex) => {
          const date = new Date(start.getTime() + ((offset + weekIndex) * 7 + dayIndex) * 86400000).toISOString().slice(0, 10);
          const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 8 ? 2 : count <= 15 ? 3 : 4;
          return `<span class="heat-cell" data-level="${level}" title="${date} · ${count}"></span>`;
        }).join("")}
      </div>
    `).join("");
    root.innerHTML = `
      <div class="activity-card">
        <div class="activity-stats">
          <div class="activity-stat"><strong>${Number(snapshot.totalCommits || 0).toLocaleString()}</strong><span>${labels[0]}</span></div>
          <div class="activity-stat"><strong>${streak}</strong><span>${labels[1]}</span></div>
          <div class="activity-stat"><strong>${Number(snapshot.totalStars || 0).toLocaleString()}</strong><span>${labels[2]}</span></div>
          <div class="activity-stat"><strong>${Number(snapshot.publicRepos || 0).toLocaleString()}</strong><span>${labels[3]}</span></div>
        </div>
        <div class="heatmap" aria-hidden="true">${columns}</div>
        <div class="heatmap-legend" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
          <em>${getLang() === "zh" ? "少" : "Less"}</em>
          <em>${getLang() === "zh" ? "多" : "More"}</em>
        </div>
        <p class="activity-note">${getLang() === "zh" ? "公开 GitHub 数据快照 · " : "Public GitHub snapshot · "}${escapeHtml(snapshot.fetchedAt || "")}</p>
      </div>
    `;
  }

  const projectCopy = {
    context: { zh: "背景与问题", en: "Context & Problem" },
    role: { zh: "我的工作", en: "My Work" },
    approach: { zh: "解决思路", en: "Approach" },
    system: { zh: "系统结构", en: "System" },
    decisions: { zh: "关键决策", en: "Key Decisions" },
    outcomes: { zh: "结果与证据", en: "Outcomes" },
    next: { zh: "下一步", en: "What's Next" },
    nextProject: { zh: "下一个项目", en: "Next project" },
    repo: { zh: "查看仓库", en: "View repository" },
    back: { zh: "返回项目列表", en: "Back to work" },
  };

  function renderProjectPage() {
    const slug = document.body.dataset.projectPage;
    if (!slug) return;
    const root = $("#project-page");
    if (!root) return;
    const index = SITE.projects.findIndex((project) => project.slug === slug);
    if (index < 0) {
      root.innerHTML = `<div class="container page-head"><h1>Project not found</h1></div>`;
      return;
    }
    const project = SITE.projects[index];
    const next = SITE.projects[(index + 1) % SITE.projects.length];
    document.title = `${displayName(project)} · AttentionCoo`;
    root.innerHTML = `
      <section class="project-hero">
        <div class="container">
          <div class="breadcrumb"><a href="/work/">${getLang() === "zh" ? "项目" : "Work"}</a><span>/</span><span>${escapeHtml(pick(project.type))}</span></div>
          <p class="eyebrow">${escapeHtml(pick(project.type))}</p>
          <h1>${escapeHtml(displayName(project))}</h1>
          <p class="lead">${escapeHtml(pick(project.headline))}</p>
          <p class="lead">${escapeHtml(pick(project.summary))}</p>
          <div class="project-meta">
            ${project.stack.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      </section>
      <div class="container">
        <div class="project-layout">
          <aside class="project-sidebar">
            <div class="metric-grid">
              ${project.metrics.map((metric) => `<div class="metric"><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(pick(metric.label))}</span></div>`).join("")}
            </div>
            <div class="project-actions">
              <a class="button button--primary" href="${project.repo}" target="_blank" rel="noopener noreferrer">${escapeHtml(pick(projectCopy.repo))} ${icons.external}</a>
              <a class="button button--ghost" href="/work/">${escapeHtml(pick(projectCopy.back))}</a>
            </div>
          </aside>
          <article class="project-content">
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.context))}</h2>
              <p>${escapeHtml(pick(project.problem))}</p>
              <p>${escapeHtml(pick(project.challenge))}</p>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.role))}</h2>
              <p>${escapeHtml(pick(project.role))}</p>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.approach))}</h2>
              <ul>${project.approach.map((item) => `<li>${escapeHtml(pick(item))}</li>`).join("")}</ul>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.system))}</h2>
              <div class="arch-flow">${project.architecture.map((node) => `<div class="arch-node">${escapeHtml(pick(node))}</div>`).join("")}</div>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.decisions))}</h2>
              <ol class="decision-list">${project.decisions.map((item) => `<li>${escapeHtml(pick(item))}</li>`).join("")}</ol>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.outcomes))}</h2>
              <ul>${project.outcomes.map((item) => `<li>${escapeHtml(pick(item))}</li>`).join("")}</ul>
            </section>
            <section class="project-section">
              <h2>${escapeHtml(pick(projectCopy.next))}</h2>
              <p>${escapeHtml(pick(project.next))}</p>
            </section>
            <div class="next-project">
              <span class="eyebrow">${escapeHtml(pick(projectCopy.nextProject))}</span>
              <a href="/work/${next.slug}.html">${escapeHtml(displayName(next))} ↗</a>
            </div>
          </article>
        </div>
      </div>
    `;
  }

  function renderPage() {
    renderHome();
    renderWorkIndex();
    renderNotesIndex();
    renderTimeline();
    renderSkills();
    renderActivity();
    renderProjectPage();
  }

  function initReadingProgress() {
    const bar = $("[data-reading-progress]");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const article = $("[data-article-body]");
      if (!article) {
        ticking = false;
        return;
      }
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const total = Math.max(1, article.offsetHeight - window.innerHeight * .35);
      const progress = Math.min(1, Math.max(0, (window.scrollY - articleTop + 120) / total));
      bar.style.width = `${(progress * 100).toFixed(2)}%`;
      ticking = false;
    };
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  function activateTab(button) {
    const group = button.closest("[data-tabs]");
    if (!group) return;
    const target = button.dataset.tab;
    $$("[data-tab]", group).forEach((item) => {
      item.setAttribute("aria-selected", String(item === button));
    });
    $$("[data-tab-panel]", group).forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== target;
    });
  }

  function bindGlobalEvents() {
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-search-open]")) {
        event.preventDefault();
        openSearch();
        return;
      }
      if (event.target.closest("[data-theme-toggle]")) {
        applyTheme(getTheme() === "night" ? "paper" : "night", true);
        return;
      }
      const langButton = event.target.closest("[data-set-lang]");
      if (langButton) {
        applyLanguage(langButton.dataset.setLang, true);
        return;
      }
      const searchResult = event.target.closest("[data-search-index]");
      if (searchResult) {
        runSearchItem(searchFiltered[Number(searchResult.dataset.searchIndex)]);
        return;
      }
      const workButton = event.target.closest("[data-work-filter]");
      if (workButton) {
        workFilter = workButton.dataset.workFilter;
        const url = new URL(window.location.href);
        if (workFilter === "all") url.searchParams.delete("type");
        else url.searchParams.set("type", workFilter);
        history.replaceState(history.state, "", url);
        renderWorkIndex();
        return;
      }
      const tabButton = event.target.closest("[data-tab]");
      if (tabButton) {
        activateTab(tabButton);
        return;
      }
      if (event.target.closest("[data-print]")) {
        window.print();
        return;
      }
      if (event.target.closest("[data-copy-email]")) {
        copyText(SITE.email, ui("copied"));
        return;
      }
      if (event.target.closest("[data-copy-bibtex]")) {
        copyText(SITE.research.bibtex, ui("copied"));
        return;
      }
      if (event.target.closest("[data-copy-link]")) {
        copyText(window.location.href, ui("copied"));
      }
    });

    document.addEventListener("keydown", (event) => {
      const modK = (event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k";
      if (modK) {
        event.preventDefault();
        if ($("#search-dialog")?.open) closeSearch();
        else openSearch();
        return;
      }
      if (event.key === "Escape") {
        const panel = $("[data-mobile-panel]");
        if (panel?.classList.contains("is-open")) {
          panel.classList.remove("is-open");
          const button = $("[data-menu-toggle]");
          if (button) {
            button.setAttribute("aria-expanded", "false");
            button.innerHTML = icons.menu;
          }
        }
      }
    });

    window.addEventListener("popstate", () => {
      workFilter = new URLSearchParams(window.location.search).get("type") || "all";
      renderWorkIndex();
    });

    let scrollTicking = false;
    const updateHeader = () => {
      $(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 8);
      scrollTicking = false;
    };
    window.addEventListener("scroll", () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateHeader);
    }, { passive: true });
    updateHeader();
  }

  function bindSearchDialog() {
    const input = $("#search-input");
    const results = $("#search-results");
    if (input) {
      input.addEventListener("input", () => {
        searchActive = 0;
        renderSearchResults(input.value);
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSearchActive(searchActive + 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSearchActive(searchActive - 1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          runSearchItem(searchFiltered[searchActive]);
        }
      });
    }
    if (results) {
      results.addEventListener("mousemove", (event) => {
        const item = event.target.closest("[data-search-index]");
        if (!item) return;
        const index = Number(item.dataset.searchIndex);
        if (index !== searchActive) setSearchActive(index, false);
      });
    }
  }

  function init() {
    ensureSearchDialog();
    bindSearchDialog();
    bindGlobalEvents();
    applyLanguage(getLang(), false);
    initReadingProgress();
    window.setInterval(updateClock, 30000);
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
