/* ============================================================
   AttentionCoo · Portfolio enhancement layer
   Project cases, command palette, filters, timeline and intent mode.
   ============================================================ */
(function () {
  "use strict";

  if (typeof data === "undefined" || typeof i18n === "undefined" || typeof t !== "function") {
    console.warn("AttentionCoo features: main data was not found.");
    return;
  }

  const EMAIL = "1759751014@qq.com";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const extraI18nZh = {
    "a11y.skip": "跳到主要内容",
    "nav.journey": "经历",
    "hero.status": "公开构建中 · 欢迎研究合作",
    "hero.intentLabel": "你想先看什么？",
    "intent.explorer": "随便看看",
    "intent.recruiter": "招聘者",
    "intent.researcher": "研究者",
    "intent.collaborator": "合作者",
    "intent.cta.explorer": "探索项目",
    "intent.cta.recruiter": "查看项目与经历",
    "intent.cta.researcher": "阅读论文",
    "intent.cta.collaborator": "发起联系",
    "intent.hint.explorer": "从项目案例开始，看看我如何构建系统。",
    "intent.hint.recruiter": "推荐路径：项目案例 → 经历时间线 → 联系方式。",
    "intent.hint.researcher": "推荐路径：CVPR 论文 → 技术方向 → 研究合作。",
    "intent.hint.collaborator": "推荐路径：最近在做的事 → 项目 → 联系方式。",
    "about.now.title": "Now · 最近",
    "about.now.badge": "持续更新",
    "about.now.building": "正在构建",
    "about.now.buildingValue": "多智能体系统的工程化与可审计推理。",
    "about.now.exploring": "正在探索",
    "about.now.exploringValue": "多模态大模型的视觉隐喻与抽象推理评测。",
    "about.now.openTo": "开放合作",
    "about.now.openToValue": "AI 系统研究、开源协作与技术交流。",
    "journey.eyebrow": "经历",
    "journey.title": "一路走来",
    "journey.subtitle": "研究、工程和比赛中的关键坐标",
    "timeline.view": "查看相关",
    "projects.subtitle": "项目与案例 —— Star 与 Fork 为 GitHub 公开数据快照",
    "projects.featuredTitle": "项目与案例",
    "projects.filterLabel": "筛选项目",
    "projects.filter.all": "全部",
    "projects.filter.research": "研究",
    "projects.filter.engineering": "工程",
    "projects.filter.experiment": "实验",
    "projects.searchPlaceholder": "按名称、技术栈或关键词筛选…",
    "projects.showing": "显示 {n} / {total} 个项目",
    "projects.empty": "没有找到匹配项目，试试其他关键词。",
    "projects.case": "查看案例",
    "projects.openCase": "打开项目案例",
    "projectDetail.caseStudy": "项目案例",
    "projectDetail.metrics": "关键指标",
    "projectDetail.role": "我的工作",
    "projectDetail.challenge": "关键挑战",
    "projectDetail.approach": "解决思路",
    "projectDetail.outcome": "结果与亮点",
    "projectDetail.next": "下一步",
    "projectDetail.stack": "技术栈",
    "pubs.bibtex": "复制 BibTeX",
    "pubs.bibtexCopied": "BibTeX 已复制",
    "contact.copyEmail": "复制邮箱",
    "contact.emailCopied": "邮箱已复制",
    "contact.vcard": "保存联系人",
    "contact.qq.desc": "即时沟通",
    "activity.streak": "连续贡献",
    "activity.days": "天",
    "search.open": "搜索",
    "search.eyebrow": "Spotlight",
    "search.title": "搜索星站",
    "search.placeholder": "搜索项目、论文、经历或联系方式…",
    "search.empty": "没有找到匹配内容，试试项目名、技术栈或「论文」。",
    "search.hint": "↑↓ 选择 · Enter 打开 · Esc 关闭",
    "search.jump": "跳转至该区块",
    "search.group.pages": "页面",
    "search.group.projects": "项目",
    "search.group.publication": "论文",
    "search.group.actions": "快捷操作",
    "search.switchEn": "Switch to English",
    "search.switchZh": "切换至中文",
    "search.switchSubtitle": "语言 / Language",
    "search.copyEmailSubtitle": "把邮箱复制到剪贴板",
    "search.githubTitle": "GitHub 主页",
    "search.githubSubtitle": "打开 AttentionCoo 的 GitHub",
    "search.vcardTitle": "下载联系人名片",
    "search.vcardSubtitle": "vCard · 可导入通讯录",
    "general.close": "关闭",
    "general.copyFailed": "复制失败，请手动复制",
    "footer.note": "Static-first · 数据由 GitHub Actions 更新",
  };
/* append test */
  const extraI18nEn = {
    "a11y.skip": "Skip to main content",
    "nav.journey": "Journey",
    "hero.status": "Building in public · Open to research collaboration",
    "hero.intentLabel": "What would you like to see first?",
    "intent.explorer": "Explore",
    "intent.recruiter": "Recruiter",
    "intent.researcher": "Researcher",
    "intent.collaborator": "Collaborator",
    "intent.cta.explorer": "Explore Projects",
    "intent.cta.recruiter": "Projects & Journey",
    "intent.cta.researcher": "Read the Paper",
    "intent.cta.collaborator": "Get in Touch",
    "intent.hint.explorer": "Start with case studies and see how I build systems.",
    "intent.hint.recruiter": "Suggested path: project cases → journey → contact.",
    "intent.hint.researcher": "Suggested path: CVPR paper → research focus → collaboration.",
    "intent.hint.collaborator": "Suggested path: what I'm building now → projects → contact.",
    "about.now.title": "Now",
    "about.now.badge": "Living page",
    "about.now.building": "Building",
    "about.now.buildingValue": "Production-minded multi-agent systems with auditable reasoning.",
    "about.now.exploring": "Exploring",
    "about.now.exploringValue": "Visual metaphor and abstract reasoning evaluation for MLLMs.",
    "about.now.openTo": "Open to",
    "about.now.openToValue": "AI systems research, open-source collaboration and technical conversations.",
    "journey.eyebrow": "Journey",
    "journey.title": "How I Got Here",
    "journey.subtitle": "Key coordinates across research, engineering and competitions",
    "timeline.view": "View related",
    "projects.subtitle": "Projects and case studies — stars and forks are public GitHub snapshots",
    "projects.featuredTitle": "Projects & Case Studies",
    "projects.filterLabel": "Filter projects",
    "projects.filter.all": "All",
    "projects.filter.research": "Research",
    "projects.filter.engineering": "Engineering",
    "projects.filter.experiment": "Experiment",
    "projects.searchPlaceholder": "Filter by name, stack or keyword…",
    "projects.showing": "Showing {n} of {total} projects",
    "projects.empty": "No matching projects. Try a different keyword.",
    "projects.case": "Case Study",
    "projects.openCase": "Open project case study",
    "projectDetail.caseStudy": "Project Case Study",
    "projectDetail.metrics": "Key Metrics",
    "projectDetail.role": "My Work",
    "projectDetail.challenge": "Core Challenge",
    "projectDetail.approach": "Approach",
    "projectDetail.outcome": "Outcome",
    "projectDetail.next": "What's Next",
    "projectDetail.stack": "Stack",
    "pubs.bibtex": "Copy BibTeX",
    "pubs.bibtexCopied": "BibTeX copied",
    "contact.copyEmail": "Copy Email",
    "contact.emailCopied": "Email copied",
    "contact.vcard": "Save Contact",
    "contact.qq.desc": "Direct message",
    "activity.streak": "Current streak",
    "activity.days": "days",
    "search.open": "Search",
    "search.eyebrow": "Spotlight",
    "search.title": "Search the Site",
    "search.placeholder": "Search projects, paper, journey or contact…",
    "search.empty": "No results. Try a project name, stack or paper.",
    "search.hint": "↑↓ navigate · Enter open · Esc close",
    "search.jump": "Jump to this section",
    "search.group.pages": "Pages",
    "search.group.projects": "Projects",
    "search.group.publication": "Publication",
    "search.group.actions": "Actions",
    "search.switchEn": "Switch to English",
    "search.switchZh": "Switch to Chinese",
    "search.switchSubtitle": "Language / 语言",
    "search.copyEmailSubtitle": "Copy the email address to clipboard",
    "search.githubTitle": "GitHub Profile",
    "search.githubSubtitle": "Open AttentionCoo on GitHub",
    "search.vcardTitle": "Download Contact Card",
    "search.vcardSubtitle": "vCard · import into your contacts",
    "general.close": "Close",
    "general.copyFailed": "Copy failed. Please copy manually.",
    "footer.note": "Static-first · data refreshed by GitHub Actions",
  };

  Object.assign(i18n.zh, extraI18nZh);
  Object.assign(i18n.en, extraI18nEn);
  const projectDetails = {
    "stroke-multi-agent-cdss": {
      type: "research",
      metrics: [
        { value: "3", label: { zh: "专家 Agent", en: "Expert Agents" } },
        { value: "18", label: { zh: "卒中领域工具", en: "Stroke Tools" } },
        { value: "2", label: { zh: "检索路径", en: "Retrieval Paths" } },
      ],
      role: {
        zh: "多智能体编排、Hybrid RAG、领域工具链与 SSE 全链路设计。",
        en: "Multi-agent orchestration, Hybrid RAG, domain tools and end-to-end SSE streaming.",
      },
      challenge: {
        zh: "让医学证据检索、工具调用和多专家会诊同时保持透明、可审计、可回退。",
        en: "Keep evidence retrieval, tool calls and multi-expert consultation transparent, auditable and recoverable at the same time.",
      },
      approach: [
        {
          zh: "以本地医学文献和临床指南为知识底座，采用语义 + BM25 双路混合检索，并做证据级溯源。",
          en: "Use local literature and clinical guidelines as the knowledge base, with semantic + BM25 hybrid retrieval and evidence-level citations.",
        },
        {
          zh: "全科、神经专科、临床药师三位专家交叉质询，形成可审计的会诊共识。",
          en: "General, neurology and pharmacist agents cross-examine each other into an auditable consensus.",
        },
        {
          zh: "18 个卒中领域工具按评估 → 禁忌症 → 剂量三级优先调度，并配套结构化绿道预评估。",
          en: "Schedule 18 stroke tools through a three-level priority order (assessment → contraindications → dosing), with structured green-channel triage.",
        },
      ],
      outcome: {
        zh: "全链路 SSE 实时呈现推理与工具过程；输出带有证据与专家审查轨迹，便于复核。",
        en: "Full-chain SSE exposes reasoning and tool execution in real time; outputs carry evidence and expert-review traces for inspection.",
      },
      next: {
        zh: "继续补充病种与真实场景验证，加强评测、安全边界和可解释性。",
        en: "Expand to more conditions and real-world validation, while strengthening evaluation, safety boundaries and explainability.",
      },
    },
    "learning-characterizing-mas": {
      type: "engineering",
      metrics: [
        { value: "10", label: { zh: "可寻址专家", en: "Specialist Agents" } },
        { value: "5", label: { zh: "监督者工具", en: "Supervisor Tools" } },
        { value: "263", label: { zh: "自动化测试", en: "Automated Tests" } },
      ],
      role: {
        zh: "监督者—专家多智能体架构、个性化画像闭环与系统集成。",
        en: "Supervisor-specialist architecture, personalized profile loop and system integration.",
      },
      challenge: {
        zh: "让多智能体系统从演示走向可审计、可回退、可测试的教育产品。",
        en: "Move a multi-agent system from demo to an auditable, recoverable and testable education product.",
      },
      approach: [
        {
          zh: "监督者 LLM 通过检索、会诊、点将、报告、画像查询 5 个工具动态派发任务。",
          en: "A supervisor LLM dynamically dispatches work through five tools: retrieval, consultation, expert pick, report and profile query.",
        },
        {
          zh: "10 位可寻址专家支持精确点将与结构化会诊，配合共享黑板与 Claim / Evidence 证据仲裁。",
          en: "Ten addressable specialists support precise delegation and structured consultation, backed by a shared blackboard and Claim/Evidence arbitration.",
        },
        {
          zh: "8 维证据链画像贯穿学习、评估、优化闭环；Planner / RePlan 提供确定性回退。",
          en: "An eight-dimension evidence-chain profile drives the learn → assess → optimize loop, with Planner/RePlan as deterministic fallback.",
        },
      ],
      outcome: {
        zh: "覆盖 6 类资源生成、循证辅导与 Qwen-VL 影像分析，263 项自动化测试通过。",
        en: "Covers six resource types, evidence-based tutoring and Qwen-VL image analysis, with 263 automated tests passing.",
      },
      next: {
        zh: "扩展学科覆盖，继续打磨学习闭环与教学侧评估。",
        en: "Expand subject coverage and refine the learning loop and educator-side evaluation.",
      },
    },
    "Titanic-FT-Transformer": {
      type: "experiment",
      metrics: [
        { value: "84.51%", label: { zh: "5 折交叉验证", en: "5-fold CV" } },
        { value: "5", label: { zh: "集成折数", en: "Ensemble Folds" } },
        { value: "FT", label: { zh: "Transformer 架构", en: "Transformer Model" } },
      ],
      role: {
        zh: "特征工程、FT-Transformer 建模与 5 折交叉验证。",
        en: "Feature engineering, FT-Transformer modeling and 5-fold cross-validation.",
      },
      challenge: {
        zh: "在表格数据上稳定提升二分类表现，同时控制过拟合。",
        en: "Improve tabular binary classification reliably while controlling overfitting.",
      },
      approach: [
        {
          zh: "构造 Title、FamilySize、IsAlone、Deck 等特征，并采用分层缺失值填充。",
          en: "Engineer Title, FamilySize, IsAlone and Deck features with stratified imputation.",
        },
        {
          zh: "使用 Feature Tokenizer、CLS Token、特征残差连接与 DropPath 正则化。",
          en: "Use a feature tokenizer, CLS token, feature residual connections and DropPath regularization.",
        },
        {
          zh: "通过 5 折交叉验证与五折集成推理提升稳定性。",
          en: "Use 5-fold cross-validation and five-fold ensemble inference for stability.",
        },
      ],
      outcome: {
        zh: "5 折交叉验证准确率达到 84.51% ± 1.24%，集成推理可直接生成 Kaggle 提交。",
        en: "Reached 84.51% ± 1.24% 5-fold CV accuracy, with ensemble inference ready for a Kaggle submission.",
      },
      next: {
        zh: "继续对比树模型与深度表格模型的误差结构，沉淀可复用特征流程。",
        en: "Compare error structures across tree and deep tabular models, and turn the feature pipeline into a reusable workflow.",
      },
    },
  };

  data.projects.forEach((project) => {
    const details = projectDetails[project.name] || {};
    project.slug = project.name;
    project.type = details.type || "experiment";
    project.metrics = details.metrics || [];
    project.role = details.role || { zh: "", en: "" };
    project.challenge = details.challenge || { zh: "", en: "" };
    project.approach = details.approach || [];
    project.outcome = details.outcome || { zh: "", en: "" };
    project.next = details.next || { zh: "", en: "" };
  });
  data.paper.metrics = [
    { value: "754", label: { zh: "组图像对", en: "Image Pairs" } },
    { value: "5", label: { zh: "类递进任务", en: "Task Types" } },
    { value: "11", label: { zh: "评测 MLLM", en: "MLLMs Evaluated" } },
  ];
  data.paper.bibtex = [
    "@inproceedings{zhao2026seeing,",
    "  title={Seeing the Abstract: A Benchmark for Visual-Only Metaphor Understanding in Multimodal Large Language Models},",
    "  author={Zhao, Shan and Yang, Zhao and Yan, Tianwei and Gong, Yusong and Wan, Qian and Chen, Shizhao and Song, Shezheng and Wang, Chengyu and Wang, Meng},",
    "  booktitle={CVPR 2026 Findings},",
    "  pages={2304--2313},",
    "  year={2026}",
    "}",
  ].join("\n");

  data.timeline = [
    {
      tag: { zh: "研究", en: "Research" },
      period: { zh: "CVPR 2026 Findings", en: "CVPR 2026 Findings" },
      title: { zh: "VisMet-Bench 视觉隐喻基准", en: "VisMet-Bench" },
      desc: {
        zh: "面向多模态大模型纯视觉隐喻理解的评测基准，覆盖 754 组图像对、三层五任务框架与 11 个 MLLM。",
        en: "A benchmark for visual-only metaphor understanding in MLLMs: 754 image pairs, a three-tier five-task framework and 11 evaluated models.",
      },
      href: "#publications",
    },
    {
      tag: { zh: "竞赛", en: "Competition" },
      period: { zh: "中国软件杯 · A3 赛题", en: "China Software Cup · Track A3" },
      title: { zh: "LearnAgent 个性化学习多智能体", en: "LearnAgent Personalized Learning MAS" },
      desc: {
        zh: "以监督者为脑、专家为手，结合 8 维证据链画像、共享黑板与 Claim / Evidence 仲裁构建医学教育闭环。",
        en: "A supervisor-as-brain, specialists-as-hands learning system with an eight-dimension evidence-chain profile, shared blackboard and Claim/Evidence arbitration.",
      },
      href: "#projects",
    },
    {
      tag: { zh: "医疗 AI", en: "Medical AI" },
      period: { zh: "多智能体系统", en: "Multi-Agent Systems" },
      title: { zh: "卒中临床决策支持系统", en: "Stroke Clinical Decision Support" },
      desc: {
        zh: "Hybrid RAG、多专家会诊、18 个卒中工具与全链路 SSE，让临床推理过程更透明、更可审计。",
        en: "Hybrid RAG, multi-expert consultation, 18 stroke tools and full-chain SSE make clinical reasoning more transparent and auditable.",
      },
      href: "#projects",
    },
    {
      tag: { zh: "开源", en: "Open Source" },
      period: { zh: "持续构建", en: "Ongoing" },
      title: { zh: "公开构建与自动化数据", en: "Building in Public" },
      desc: {
        zh: "用 GitHub Actions 每日更新项目指标与贡献快照，让这个站点本身也成为一个持续运行的系统。",
        en: "GitHub Actions refreshes project metrics and contribution snapshots daily, making this site a continuously running system in itself.",
      },
      href: "#activity",
    },
  ];
  if (typeof ICONS === "object" && ICONS) {
    Object.assign(ICONS, {
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
      user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
      compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
      download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
      arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    });
  }

  const pageDefs = [
    { id: "about", titleKey: "nav.about", icon: "user", keywords: "profile bio 关于 简介 attentioncoo" },
    { id: "journey", titleKey: "nav.journey", icon: "clock", keywords: "timeline journey experience 经历 时间线" },
    { id: "skills", titleKey: "nav.skills", icon: "cpu", keywords: "stack skills technologies 技能 技术栈 python langgraph rag" },
    { id: "projects", titleKey: "nav.projects", icon: "code", keywords: "portfolio cases work 项目 作品 案例" },
    { id: "publications", titleKey: "nav.publications", icon: "award", keywords: "paper research cvpr pub 论文 研究" },
    { id: "activity", titleKey: "nav.activity", icon: "flame", keywords: "github commits contributions 活跃 动态 提交" },
    { id: "contact", titleKey: "nav.contact", icon: "message", keywords: "email qq github contact 联系 邮箱" },
  ];

  const intentConfig = {
    explorer: { href: "#projects", ctaKey: "intent.cta.explorer", hintKey: "intent.hint.explorer" },
    recruiter: { href: "#journey", ctaKey: "intent.cta.recruiter", hintKey: "intent.hint.recruiter" },
    researcher: { href: "#publications", ctaKey: "intent.cta.researcher", hintKey: "intent.hint.researcher" },
    collaborator: { href: "#contact", ctaKey: "intent.cta.collaborator", hintKey: "intent.hint.collaborator" },
  };

  const projectFilter = { type: "all", query: "" };
  let currentIntent = loadIntent();
  let currentProjectSlug = null;
  let toastTimer = 0;
  let searchItems = [];
  let filteredSearchItems = [];
  let activeSearchIndex = 0;
  let searchIsOpen = false;
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[character]));
  }

  function icon(name) {
    return (typeof ICONS === "object" && ICONS && ICONS[name]) || "";
  }

  function projectTypeLabel(type) {
    return t("projects.filter." + type);
  }

  function loadIntent() {
    try {
      const saved = localStorage.getItem("attentioncoo-intent");
      return intentConfig[saved] ? saved : "explorer";
    } catch (error) {
      return "explorer";
    }
  }

  function saveIntent(intent) {
    try {
      localStorage.setItem("attentioncoo-intent", intent);
    } catch (error) {
      /* ignore storage errors */
    }
  }

  function showToast(message) {
    const toast = $("#site-toast");
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        textarea.remove();
        if (!successful) throw new Error("execCommand copy failed");
      }
      showToast(successMessage || t("contact.emailCopied"));
    } catch (error) {
      showToast(t("general.copyFailed"));
    }
  }

  function readProjectFilterFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      projectFilter.type = ["all", "research", "engineering", "experiment"].includes(type) ? type : "all";
      projectFilter.query = params.get("q") || "";
    } catch (error) {
      projectFilter.type = "all";
      projectFilter.query = "";
    }
  }

  function updateUrl(mutator, mode = "replace") {
    try {
      const url = new URL(window.location.href);
      mutator(url);
      const state = mode === "push" ? { attentioncooProject: url.searchParams.get("project") } : history.state;
      history[mode + "State"](state, "", url.href);
    } catch (error) {
      /* file:// preview or restricted history environment */
    }
  }

  function syncProjectFilterUrl() {
    updateUrl((url) => {
      if (projectFilter.type === "all") url.searchParams.delete("type");
      else url.searchParams.set("type", projectFilter.type);
      if (projectFilter.query.trim()) url.searchParams.set("q", projectFilter.query.trim());
      else url.searchParams.delete("q");
    });
  }
  function matchesProjectFilter(project) {
    if (projectFilter.type !== "all" && project.type !== projectFilter.type) return false;
    const query = projectFilter.query.trim().toLocaleLowerCase();
    if (!query) return true;
    const haystack = [
      project.name,
      project.language,
      project.type,
      project.desc.zh,
      project.desc.en,
      project.role.zh,
      project.role.en,
      ...project.tags.zh,
      ...project.tags.en,
    ].join(" ").toLocaleLowerCase();
    return query.split(/\s+/).every((token) => haystack.includes(token));
  }

  function renderProjectFilters() {
    const controls = $("#project-controls");
    if (!controls) return;
    const filterTypes = ["all", "research", "engineering", "experiment"];
    controls.innerHTML = `
      <div class="projects__filters" role="group" aria-label="${escapeHtml(t("projects.filterLabel"))}">
        ${filterTypes.map((type) => {
          const active = projectFilter.type === type;
          return `<button class="project-filter${active ? " is-active" : ""}" type="button" data-project-type="${type}" aria-pressed="${active}">${escapeHtml(t("projects.filter." + type))}</button>`;
        }).join("")}
      </div>
      <label class="projects__search">
        ${icon("search")}
        <span class="sr-only">${escapeHtml(t("projects.searchPlaceholder"))}</span>
        <input id="project-search" type="search" autocomplete="off" spellcheck="false" value="${escapeHtml(projectFilter.query)}" placeholder="${escapeHtml(t("projects.searchPlaceholder"))}" />
      </label>
    `;
  }

  function renderProjectCards() {
    const box = $("#projects-grid");
    if (!box) return;
    const filtered = data.projects.filter(matchesProjectFilter);
    box.innerHTML = filtered.map((project) => {
      const homepage = project.homepage
        ? `<a class="project-card__link" href="${escapeHtml(project.homepage)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.homepage"))}${icon("external")}</a>`
        : "";
      const stars = typeof projStars === "function" ? projStars(project) : project.stars;
      const forks = typeof projForks === "function" ? projForks(project) : project.forks;
      return `
        <article class="project-card m3-card" data-project-type="${project.type}">
          <div class="project-card__head">
            <button class="project-card__name" type="button" data-project-slug="${escapeHtml(project.slug)}">${escapeHtml(project.name)}</button>
            <span class="m3-chip m3-chip--accent project-card__type">${escapeHtml(projectTypeLabel(project.type))}</span>
          </div>
          <p class="project-card__desc">${escapeHtml(project.desc[currentLang])}</p>
          <div class="project-card__meta">
            <span class="m3-chip">${escapeHtml(project.language)}</span>
            ${project.tags[currentLang].slice(0, 2).map((tag) => `<span class="m3-chip m3-chip--accent">${escapeHtml(tag)}</span>`).join("")}
            <span class="project-card__stats">
              <span class="project-card__stat project-card__stat--star" title="${escapeHtml(t("projects.stars"))}">${icon("star")}${stars}</span>
              <span class="project-card__stat" title="${escapeHtml(t("projects.forks"))}">${icon("fork")}${forks}</span>
            </span>
          </div>
          <div class="project-card__actions">
            <button class="m3-button m3-button--text project-card__case" type="button" data-project-slug="${escapeHtml(project.slug)}">${escapeHtml(t("projects.case"))}<span class="m3-button__icon" aria-hidden="true">↘</span></button>
            <a class="project-card__link" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.repo"))}${icon("external")}</a>
            ${homepage}
          </div>
        </article>
      `;
    }).join("");

    const count = $("#project-count");
    if (count) {
      count.textContent = t("projects.showing")
        .replace("{n}", String(filtered.length))
        .replace("{total}", String(data.projects.length));
    }
    const empty = $("#projects-empty");
    if (empty) empty.hidden = filtered.length !== 0;
  }
  function renderPaperCard() {
    const box = $("#paper-card");
    if (!box) return;
    const paper = data.paper;
    box.innerHTML = `
      <article class="paper-card m3-card">
        <div class="paper-card__badges">
          <span class="m3-chip m3-chip--gold">${icon("award")}${escapeHtml(paper.badge)}</span>
          <span class="m3-chip">${escapeHtml(paper.pages)}</span>
        </div>
        <a class="paper-card__title" href="${escapeHtml(paper.page)}" target="_blank" rel="noopener noreferrer">${escapeHtml(paper.title)}</a>
        <p class="paper-card__authors">${escapeHtml(paper.authors)}</p>
        <p class="paper-card__abstract${currentLang === "zh" ? "-zh" : ""}">${escapeHtml(paper.abstract[currentLang])}</p>
        <div class="paper-card__metrics" aria-label="${escapeHtml(t("projectDetail.metrics"))}">
          ${paper.metrics.map((metric) => `
            <div class="paper-metric">
              <strong>${escapeHtml(metric.value)}</strong>
              <span>${escapeHtml(metric.label[currentLang])}</span>
            </div>
          `).join("")}
        </div>
        <div class="paper-card__tags">
          ${paper.tags[currentLang].map((tag, index) => `<span class="m3-chip${index === 0 ? " m3-chip--accent" : ""}">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="paper-card__actions">
          <a class="m3-button m3-button--text" href="${escapeHtml(paper.page)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("pubs.page"))}${icon("external")}</a>
          <a class="m3-button m3-button--text" href="${escapeHtml(paper.pdf)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("pubs.pdf"))}${icon("external")}</a>
          <button class="m3-button m3-button--text" id="copy-bibtex" type="button">${escapeHtml(t("pubs.bibtex"))}${icon("copy")}</button>
        </div>
      </article>
    `;
  }

  function renderNow() {
    const box = $("#about-now");
    if (!box) return;
    const items = [
      { label: t("about.now.building"), value: t("about.now.buildingValue") },
      { label: t("about.now.exploring"), value: t("about.now.exploringValue") },
      { label: t("about.now.openTo"), value: t("about.now.openToValue") },
    ];
    box.innerHTML = `
      <div class="now-card m3-card">
        <div class="now-card__head">
          <div>
            <p class="now-card__eyebrow">Now</p>
            <h3 class="now-card__title">${escapeHtml(t("about.now.title"))}</h3>
          </div>
          <span class="m3-chip m3-chip--accent now-card__badge"><span class="now-card__pulse" aria-hidden="true"></span>${escapeHtml(t("about.now.badge"))}</span>
        </div>
        <div class="now-card__grid">
          ${items.map((item) => `
            <div class="now-card__item">
              <span class="now-card__label">${escapeHtml(item.label)}</span>
              <p>${escapeHtml(item.value)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderTimeline() {
    const box = $("#timeline");
    if (!box) return;
    box.innerHTML = data.timeline.map((item) => `
      <article class="timeline__item">
        <div class="timeline__meta">
          <span class="m3-chip">${escapeHtml(item.tag[currentLang])}</span>
          <span class="timeline__period">${escapeHtml(item.period[currentLang])}</span>
        </div>
        <div class="timeline__card m3-card">
          <h3 class="timeline__title">${escapeHtml(item.title[currentLang])}</h3>
          <p class="timeline__desc">${escapeHtml(item.desc[currentLang])}</p>
          ${item.href ? `<a class="timeline__link" href="${escapeHtml(item.href)}">${escapeHtml(t("timeline.view"))}<span aria-hidden="true">↘</span></a>` : ""}
        </div>
      </article>
    `).join("");
  }

  function renderIntent() {
    const config = intentConfig[currentIntent] || intentConfig.explorer;
    $$(".intent-btn").forEach((button) => {
      const active = button.dataset.intent === currentIntent;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const cta = $("#hero-primary-cta");
    const ctaLabel = $("#hero-primary-label");
    const hint = $("#intent-hint");
    if (cta) cta.setAttribute("href", config.href);
    if (ctaLabel) ctaLabel.textContent = t(config.ctaKey);
    if (hint) hint.textContent = t(config.hintKey);
  }
  function computeCurrentStreak(snapshot) {
    if (!snapshot || !snapshot.calendar || !snapshot.firstDay) return 0;
    const start = new Date(snapshot.firstDay + "T00:00:00Z");
    if (Number.isNaN(start.getTime())) return 0;
    const days = [];
    snapshot.calendar.forEach((week, weekIndex) => {
      week.forEach((count, dayIndex) => {
        const date = new Date(start.getTime() + (weekIndex * 7 + dayIndex) * 86400000);
        days.push({ date: date.toISOString().slice(0, 10), count: Number(count) || 0 });
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

  function decorateActivity() {
    const box = $("#activity-box");
    if (!box) return;
    const head = $(".gh-head", box);
    if (!head || $(".gh-streak", head)) return;
    const streak = computeCurrentStreak(window.ACTIVITY_SNAPSHOT);
    const streakNode = document.createElement("span");
    streakNode.className = "gh-streak";
    streakNode.innerHTML = `<span>${escapeHtml(t("activity.streak"))}</span><strong>${streak} ${escapeHtml(t("activity.days"))}</strong>`;
    const legend = $(".gh-legend", head);
    if (legend) head.insertBefore(streakNode, legend);
    else head.appendChild(streakNode);
  }

  function buildSearchItems() {
    const items = [];
    pageDefs.forEach((page) => {
      items.push({
        id: "page-" + page.id,
        group: "pages",
        groupLabel: t("search.group.pages"),
        title: t(page.titleKey),
        subtitle: t("search.jump"),
        icon: page.icon,
        search: [page.id, page.titleKey, page.keywords, i18n.zh[page.titleKey], i18n.en[page.titleKey]].join(" "),
        action: { type: "section", sectionId: page.id },
      });
    });

    data.projects.forEach((project) => {
      items.push({
        id: "project-" + project.slug,
        group: "projects",
        groupLabel: t("search.group.projects"),
        title: project.name,
        subtitle: `${projectTypeLabel(project.type)} · ${project.language}`,
        icon: "code",
        search: [
          project.name,
          project.language,
          project.type,
          project.desc.zh,
          project.desc.en,
          project.role.zh,
          project.role.en,
          ...project.tags.zh,
          ...project.tags.en,
        ].join(" "),
        action: { type: "project", slug: project.slug },
      });
    });

    items.push({
      id: "publication-vismet-bench",
      group: "publication",
      groupLabel: t("search.group.publication"),
      title: data.paper.title,
      subtitle: `${data.paper.badge} · ${data.paper.pages}`,
      icon: "award",
      search: [data.paper.title, data.paper.authors, data.paper.badge, data.paper.abstract.zh, data.paper.abstract.en, "CVPR paper 论文"].join(" "),
      action: { type: "section", sectionId: "publications" },
    });
    const otherLanguage = currentLang === "zh" ? "en" : "zh";
    items.push(
      {
        id: "action-language",
        group: "actions",
        groupLabel: t("search.group.actions"),
        title: currentLang === "zh" ? t("search.switchEn") : t("search.switchZh"),
        subtitle: t("search.switchSubtitle"),
        icon: "globe",
        search: "language english chinese 中文 英文 switch 切换",
        action: { type: "language", lang: otherLanguage },
      },
      {
        id: "action-copy-email",
        group: "actions",
        groupLabel: t("search.group.actions"),
        title: t("contact.copyEmail"),
        subtitle: EMAIL,
        icon: "mail",
        search: "email mail copy 邮箱 复制 " + EMAIL,
        action: { type: "copy-email" },
      },
      {
        id: "action-github",
        group: "actions",
        groupLabel: t("search.group.actions"),
        title: t("search.githubTitle"),
        subtitle: t("search.githubSubtitle"),
        icon: "github",
        search: "github code open source 开源 代码",
        action: { type: "external", href: "https://github.com/AttentionCoo" },
      },
      {
        id: "action-vcard",
        group: "actions",
        groupLabel: t("search.group.actions"),
        title: t("search.vcardTitle"),
        subtitle: t("search.vcardSubtitle"),
        icon: "download",
        search: "vcard contact card download 联系人 名片 下载",
        action: { type: "download", href: "AttentionCoo.vcf" },
      }
    );

    items.forEach((item, index) => { item.order = index; });
    return items;
  }

  function searchScore(item, query) {
    const title = item.title.toLocaleLowerCase();
    const haystack = item.search.toLocaleLowerCase();
    if (!query) return item.group === "pages" ? 40 : item.group === "projects" ? 30 : item.group === "publication" ? 20 : 10;
    let score = 0;
    if (title === query) score += 100;
    if (title.startsWith(query)) score += 50;
    if (title.includes(query)) score += 30;
    if (haystack.includes(query)) score += 10;
    return score;
  }
  function updateSearchResults() {
    const input = $("#command-input");
    const results = $("#command-results");
    if (!input || !results) return;
    const query = input.value.trim().toLocaleLowerCase();
    const tokens = query ? query.split(/\s+/) : [];
    searchItems = buildSearchItems();
    filteredSearchItems = searchItems
      .filter((item) => tokens.every((token) => item.search.toLocaleLowerCase().includes(token)))
      .map((item) => ({ item, score: searchScore(item, query) }))
      .sort((a, b) => b.score - a.score || a.item.order - b.item.order)
      .slice(0, 20)
      .map((entry) => entry.item);

    if (activeSearchIndex >= filteredSearchItems.length) activeSearchIndex = Math.max(0, filteredSearchItems.length - 1);
    if (!filteredSearchItems.length) activeSearchIndex = -1;

    if (!filteredSearchItems.length) {
      results.innerHTML = `<div class="command-empty"><span aria-hidden="true">✦</span><p>${escapeHtml(t("search.empty"))}</p></div>`;
      input.removeAttribute("aria-activedescendant");
      return;
    }

    results.innerHTML = filteredSearchItems.map((item, index) => `
      <button class="command-result" id="command-result-${index}" type="button" role="option" data-command-index="${index}" aria-selected="${index === activeSearchIndex}">
        <span class="command-result__icon" aria-hidden="true">${icon(item.icon)}</span>
        <span class="command-result__body">
          <span class="command-result__title">${escapeHtml(item.title)}</span>
          <span class="command-result__subtitle">${escapeHtml(item.subtitle)}</span>
        </span>
        <span class="command-result__group">${escapeHtml(item.groupLabel)}</span>
      </button>
    `).join("");
    setSearchActive(activeSearchIndex, false);
  }

  function setSearchActive(index, shouldScroll = true) {
    if (!filteredSearchItems.length) return;
    activeSearchIndex = Math.max(0, Math.min(index, filteredSearchItems.length - 1));
    $$(".command-result").forEach((result, resultIndex) => {
      result.setAttribute("aria-selected", String(resultIndex === activeSearchIndex));
    });
    const input = $("#command-input");
    if (input) input.setAttribute("aria-activedescendant", "command-result-" + activeSearchIndex);
    if (shouldScroll) {
      const activeResult = $("#command-result-" + activeSearchIndex);
      if (activeResult) activeResult.scrollIntoView({ block: "nearest" });
    }
  }

  function openSearch() {
    const dialog = $("#search-dialog");
    const input = $("#command-input");
    if (!dialog || !input) return;
    if ($("#project-dialog") && $("#project-dialog").open) closeProject();
    searchIsOpen = true;
    activeSearchIndex = 0;
    input.value = "";
    updateSearchResults();
    if (!dialog.open) dialog.showModal();
    syncBodyLock();
    window.setTimeout(() => input.focus(), 20);
  }

  function closeSearch() {
    const dialog = $("#search-dialog");
    if (dialog && dialog.open) dialog.close();
    searchIsOpen = false;
    syncBodyLock();
  }

  function navigateToSection(sectionId) {
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      updateUrl((url) => {
        url.searchParams.delete("project");
        url.hash = sectionId;
      }, "push");
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 30);
  }

  function runSearchItem(item) {
    if (!item) return;
    closeSearch();
    const action = item.action;
    if (action.type === "section") {
      navigateToSection(action.sectionId);
    } else if (action.type === "project") {
      window.setTimeout(() => openProject(action.slug), 60);
    } else if (action.type === "language") {
      const button = document.querySelector(`.lang-btn[data-lang="${action.lang}"]`);
      if (button) window.setTimeout(() => button.click(), 30);
    } else if (action.type === "copy-email") {
      copyText(EMAIL, t("contact.emailCopied"));
    } else if (action.type === "external") {
      window.open(action.href, "_blank", "noopener,noreferrer");
    } else if (action.type === "download") {
      const link = document.createElement("a");
      link.href = action.href;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
  function renderProjectDetail(project) {
    const body = $("#project-detail");
    if (!body || !project) return;
    const homepageAction = project.homepage
      ? `<a class="m3-button m3-button--tonal" href="${escapeHtml(project.homepage)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.homepage"))}${icon("external")}</a>`
      : "";
    body.innerHTML = `
      <div class="project-detail__head">
        <div class="project-detail__head-main">
          <p class="dialog-eyebrow">${escapeHtml(t("projectDetail.caseStudy"))} · ${escapeHtml(projectTypeLabel(project.type))}</p>
          <h2 class="project-detail__title" id="project-detail-title">${escapeHtml(project.name)}</h2>
          <div class="project-detail__meta">
            <span class="m3-chip">${escapeHtml(project.language)}</span>
            <span class="m3-chip m3-chip--accent">${escapeHtml(project.tags[currentLang][0] || "")}</span>
            <span class="project-detail__stars">${icon("star")}${typeof projStars === "function" ? projStars(project) : project.stars}</span>
          </div>
        </div>
        <button class="icon-button" type="button" data-close-project aria-label="${escapeHtml(t("general.close"))}">${icon("close")}</button>
      </div>
      <div class="project-detail__body">
        <p class="project-detail__lead">${escapeHtml(project.desc[currentLang])}</p>
        <div class="project-detail__metrics" aria-label="${escapeHtml(t("projectDetail.metrics"))}">
          ${project.metrics.map((metric) => `
            <div class="project-metric">
              <strong>${escapeHtml(metric.value)}</strong>
              <span>${escapeHtml(metric.label[currentLang])}</span>
            </div>
          `).join("")}
        </div>
        <div class="project-detail__split">
          <section class="project-detail__panel">
            <h3>${escapeHtml(t("projectDetail.role"))}</h3>
            <p>${escapeHtml(project.role[currentLang])}</p>
          </section>
          <section class="project-detail__panel">
            <h3>${escapeHtml(t("projectDetail.challenge"))}</h3>
            <p>${escapeHtml(project.challenge[currentLang])}</p>
          </section>
        </div>
        <section class="project-detail__section">
          <h3>${escapeHtml(t("projectDetail.approach"))}</h3>
          <ol class="project-detail__list">
            ${project.approach.map((item) => `<li>${escapeHtml(item[currentLang])}</li>`).join("")}
          </ol>
        </section>
        <section class="project-detail__section project-detail__outcome">
          <h3>${escapeHtml(t("projectDetail.outcome"))}</h3>
          <p>${escapeHtml(project.outcome[currentLang])}</p>
        </section>
        <section class="project-detail__section">
          <h3>${escapeHtml(t("projectDetail.next"))}</h3>
          <p>${escapeHtml(project.next[currentLang])}</p>
        </section>
        <div class="project-detail__stack">
          <h3>${escapeHtml(t("projectDetail.stack"))}</h3>
          <div>${project.tags[currentLang].map((tag) => `<span class="m3-chip">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        <div class="project-detail__actions">
          <a class="m3-button m3-button--filled" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.repo"))}${icon("external")}</a>
          ${homepageAction}
        </div>
      </div>
    `;
  }

  function openProject(slug, options = {}) {
    const project = data.projects.find((item) => item.slug === slug);
    const dialog = $("#project-dialog");
    if (!project || !dialog) return;
    currentProjectSlug = slug;
    renderProjectDetail(project);
    if (!dialog.open) dialog.showModal();
    syncBodyLock();
    if (options.push !== false) {
      updateUrl((url) => url.searchParams.set("project", slug), "push");
    }
    window.setTimeout(() => {
      const closeButton = $("[data-close-project]", dialog);
      if (closeButton) closeButton.focus();
    }, 30);
  }

  function closeProject() {
    const dialog = $("#project-dialog");
    if (dialog && dialog.open) dialog.close();
    currentProjectSlug = null;
    syncBodyLock();
  }
  function syncBodyLock() {
    const searchDialog = $("#search-dialog");
    const projectDialog = $("#project-dialog");
    const isOpen = Boolean((searchDialog && searchDialog.open) || (projectDialog && projectDialog.open));
    document.body.classList.toggle("modal-open", isOpen);
  }

  function updateSearchStaticText() {
    const input = $("#command-input");
    const openButton = $("#open-search");
    const closeButton = $("[data-close-search]");
    if (input) input.placeholder = t("search.placeholder");
    if (openButton) openButton.setAttribute("aria-label", t("search.open"));
    if (closeButton) closeButton.setAttribute("aria-label", t("general.close"));
  }

  function onRendered() {
    renderProjectFilters();
    renderNow();
    renderTimeline();
    renderIntent();
    decorateActivity();
    updateSearchStaticText();
    if (searchIsOpen && $("#search-dialog") && $("#search-dialog").open) updateSearchResults();
    if (currentProjectSlug) {
      const project = data.projects.find((item) => item.slug === currentProjectSlug);
      if (project) renderProjectDetail(project);
    }
  }

  function initScrollSpy() {
    const navLinks = $$(".appbar__link[href^='#']");
    const sections = navLinks
      .map((link) => ({ link, section: document.getElementById(link.getAttribute("href").slice(1)) }))
      .filter((entry) => entry.section);
    if (!sections.length) return;
    let ticking = false;
    const update = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let activeSection = nearBottom ? sections[sections.length - 1].section.id : null;
      if (!nearBottom) {
        sections.forEach((entry) => {
          if (entry.section.getBoundingClientRect().top <= 150) activeSection = entry.section.id;
        });
      }
      sections.forEach((entry) => {
        const active = entry.section.id === activeSection;
        entry.link.classList.toggle("is-active", active);
        if (active) entry.link.setAttribute("aria-current", "location");
        else entry.link.removeAttribute("aria-current");
      });
      ticking = false;
    };
    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    update();
  }
  function init() {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    const shortcut = $("#search-shortcut");
    if (shortcut) shortcut.textContent = isMac ? "⌘K" : "Ctrl K";

    const openSearchButton = $("#open-search");
    if (openSearchButton) openSearchButton.addEventListener("click", openSearch);

    const searchDialog = $("#search-dialog");
    const searchInput = $("#command-input");
    const searchResults = $("#command-results");

    if (searchDialog) {
      searchDialog.addEventListener("close", () => {
        searchIsOpen = false;
        syncBodyLock();
      });
      searchDialog.addEventListener("click", (event) => {
        if (event.target === searchDialog) closeSearch();
      });
    }

    const closeSearchButton = $("[data-close-search]");
    if (closeSearchButton) closeSearchButton.addEventListener("click", closeSearch);

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        activeSearchIndex = 0;
        updateSearchResults();
      });
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSearchActive(activeSearchIndex + 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSearchActive(activeSearchIndex - 1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (filteredSearchItems[activeSearchIndex]) runSearchItem(filteredSearchItems[activeSearchIndex]);
        }
      });
    }

    if (searchResults) {
      searchResults.addEventListener("click", (event) => {
        const button = event.target.closest("[data-command-index]");
        if (!button) return;
        const index = Number(button.dataset.commandIndex);
        if (filteredSearchItems[index]) runSearchItem(filteredSearchItems[index]);
      });
      searchResults.addEventListener("mousemove", (event) => {
        const button = event.target.closest("[data-command-index]");
        if (!button) return;
        const index = Number(button.dataset.commandIndex);
        if (index !== activeSearchIndex) setSearchActive(index, false);
      });
    }

    document.addEventListener("keydown", (event) => {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k";
      if (isCommandK) {
        event.preventDefault();
        if (searchIsOpen) closeSearch();
        else openSearch();
      }
    });

    const projectGrid = $("#projects-grid");
    if (projectGrid) {
      projectGrid.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-project-slug]");
        if (trigger) openProject(trigger.dataset.projectSlug);
      });
    }
    const projectDialog = $("#project-dialog");
    if (projectDialog) {
      projectDialog.addEventListener("click", (event) => {
        if (event.target === projectDialog) closeProject();
        if (event.target.closest("[data-close-project]")) closeProject();
      });
      projectDialog.addEventListener("close", () => {
        currentProjectSlug = null;
        updateUrl((url) => url.searchParams.delete("project"));
        syncBodyLock();
      });
    }

    const controls = $("#project-controls");
    if (controls) {
      controls.addEventListener("click", (event) => {
        const button = event.target.closest("[data-project-type]");
        if (!button) return;
        projectFilter.type = button.dataset.projectType;
        $$(".project-filter", controls).forEach((filterButton) => {
          const active = filterButton === button;
          filterButton.classList.toggle("is-active", active);
          filterButton.setAttribute("aria-pressed", String(active));
        });
        renderProjectCards();
        syncProjectFilterUrl();
      });
      controls.addEventListener("input", (event) => {
        if (event.target.id !== "project-search") return;
        projectFilter.query = event.target.value;
        renderProjectCards();
        syncProjectFilterUrl();
      });
    }

    const heroIntents = $("#hero-intents");
    if (heroIntents) {
      heroIntents.addEventListener("click", (event) => {
        const button = event.target.closest("[data-intent]");
        if (!button || !intentConfig[button.dataset.intent]) return;
        currentIntent = button.dataset.intent;
        saveIntent(currentIntent);
        renderIntent();
      });
    }

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-copy-email]")) {
        copyText(EMAIL, t("contact.emailCopied"));
      }
      if (event.target.closest("#copy-bibtex")) {
        copyText(data.paper.bibtex, t("pubs.bibtexCopied"));
      }
    });

    window.addEventListener("popstate", () => {
      readProjectFilterFromUrl();
      renderProjectFilters();
      renderProjectCards();
      const params = new URLSearchParams(window.location.search);
      const projectSlug = params.get("project");
      if (projectSlug) openProject(projectSlug, { push: false });
      else if (projectDialog && projectDialog.open) closeProject();
    });

    initScrollSpy();
  }
  // Replace the main renderer with the enhanced project/paper renderers.
  renderProjects = function enhancedRenderProjects() {
    renderProjectCards();
  };
  renderPaper = function enhancedRenderPaper() {
    renderPaperCard();
  };

  document.addEventListener("attentioncoo:rendered", onRendered);

  readProjectFilterFromUrl();
  init();
  renderAll();

  const initialProjectSlug = new URLSearchParams(window.location.search).get("project");
  if (initialProjectSlug) {
    window.setTimeout(() => openProject(initialProjectSlug, { push: false }), 80);
  }
})();
