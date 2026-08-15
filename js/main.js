// ============================================================
// AttentionCoo · 星空小站
// 星空引擎 + i18n + 聚光灯 + 滚动显现 + 数据渲染
// ============================================================

// ============ 星空画布 ============
(function () {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let shootingStars = [];
  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    const count = width < 640 ? 90 : 150;
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.05 + 0.02,
        hue: Math.random() < 0.12 ? "gold" : Math.random() < 0.18 ? "cyan" : "white",
      });
    }
  }

  function spawnShootingStar() {
    if (reduced) return;
    const startX = Math.random() * width * 0.7 + width * 0.15;
    const startY = Math.random() * height * 0.35;
    const angle = Math.PI * 0.65 + Math.random() * 0.3;
    const speed = Math.random() * 9 + 10;
    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      const twinkle = reduced ? 1 : Math.sin(t * s.twinkleSpeed + s.phase) * 0.5 + 0.5;
      const alpha = s.baseAlpha * (0.45 + 0.55 * twinkle);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.hue === "gold") ctx.fillStyle = `rgba(252, 211, 77, ${alpha})`;
      else if (s.hue === "cyan") ctx.fillStyle = `rgba(103, 232, 249, ${alpha})`;
      else ctx.fillStyle = `rgba(233, 237, 255, ${alpha})`;
      ctx.fill();
      if (s.r > 1.1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === "gold"
            ? `rgba(252, 211, 77, ${alpha * 0.12})`
            : `rgba(196, 181, 253, ${alpha * 0.1})`;
        ctx.fill();
      }
      if (!reduced) {
        s.y += s.drift;
        if (s.y > height + 4) {
          s.y = -4;
          s.x = Math.random() * width;
        }
      }
    }

    if (!reduced) {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const m = shootingStars[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        if (m.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * m.life})`);
        grad.addColorStop(0.4, `rgba(196, 181, 253, ${0.5 * m.life})`);
        grad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
  if (!reduced) {
    setInterval(() => {
      if (Math.random() < 0.65) spawnShootingStar();
    }, 4200);
    setTimeout(spawnShootingStar, 1800);
  }
})();

// ============ 图标（内联 SVG） ============
const ICONS = {
  star: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>',
  fork: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>',
  external:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/></svg>',
};

// ============ 数据 ============
const data = {
  focus: {
    zh: ["多智能体系统", "大模型应用 · RAG", "多模态大模型", "临床决策支持"],
    en: ["Multi-Agent Systems", "LLM Apps · RAG", "Multimodal LLMs", "Clinical Decision Support"],
  },
  stats: [
    { num: "1", label: { zh: "CVPR 论文", en: "CVPR Paper" } },
    { num: "2", label: { zh: "旗舰项目", en: "Flagship Projects" } },
    { num: "19", label: { zh: "GitHub Stars", en: "GitHub Stars" } },
    { num: "737", label: { zh: "次提交", en: "Commits" } },
  ],
  skills: [
    { icon: "🤖", name: { zh: "多智能体系统 · LangGraph", en: "Multi-Agent · LangGraph" }, level: 92 },
    { icon: "🐍", name: { zh: "Python", en: "Python" }, level: 90 },
    { icon: "🧠", name: { zh: "大模型应用 · RAG", en: "LLM Apps · RAG" }, level: 88 },
    { icon: "💬", name: { zh: "Prompt Engineering", en: "Prompt Engineering" }, level: 85 },
    { icon: "🖼️", name: { zh: "多模态大模型 (MLLM)", en: "Multimodal LLMs (MLLM)" }, level: 84 },
    { icon: "🔥", name: { zh: "PyTorch · 深度学习", en: "PyTorch · Deep Learning" }, level: 80 },
    { icon: "🌐", name: { zh: "Web 全栈 · FastAPI / SSE", en: "Full-Stack Web · FastAPI / SSE" }, level: 78 },
    { icon: "🐙", name: { zh: "Git · 协作开发", en: "Git · Collaboration" }, level: 88 },
  ],
  projects: [
    {
      name: "stroke-multi-agent-cdss",
      repo: "https://github.com/AttentionCoo/stroke-multi-agent-cdss",
      homepage: null,
      language: "Python",
      stars: 8,
      forks: 1,
      desc: {
        zh: "基于角色扮演的脑卒中多智能体 Web 医疗辅助决策系统 (CDSS)：集成 LangGraph 纵横矩阵协同、高级 Hybrid RAG 知识检索与全栈响应式 (SSE) 流式数据管道，实现高合规、低幻觉的临床智能会诊。",
        en: "A role-playing multi-agent clinical decision support system (CDSS) for stroke care: LangGraph orchestration, hybrid RAG knowledge retrieval and a full-stack reactive SSE streaming pipeline — compliant, low-hallucination clinical consultation.",
      },
      tags: {
        zh: ["LangGraph", "Hybrid RAG", "SSE 流式", "Multi-Agent"],
        en: ["LangGraph", "Hybrid RAG", "SSE Streaming", "Multi-Agent"],
      },
    },
    {
      name: "learning-characterizing-mas",
      repo: "https://github.com/AttentionCoo/learning-characterizing-mas",
      homepage: null,
      language: "Python",
      stars: 4,
      forks: 0,
      desc: {
        zh: "第十五届「中国软件杯」大学生软件设计大赛 A3 赛题参赛作品 —— 基于大模型的个性化资源生成与学习多智能体系统开发（出题企业：科大讯飞股份有限公司）。",
        en: "Entry for the 15th 'China Software Cup' university software design contest (track A3, by iFLYTEK): a personalized resource generation and learning multi-agent system powered by LLMs.",
      },
      tags: {
        zh: ["大模型", "Multi-Agent", "RAG", "中国软件杯"],
        en: ["LLM", "Multi-Agent", "RAG", "Software Cup"],
      },
    },
  ],
  paper: {
    badge: "🏆 CVPR 2026 Findings",
    pages: "pp. 2304–2313",
    title: "Seeing the Abstract: A Benchmark for Visual-Only Metaphor Understanding in Multimodal Large Language Models",
    authors:
      "Shan Zhao, Zhao Yang, Tianwei Yan, Yusong Gong, Qian Wan, Shizhao Chen, Shezheng Song, Chengyu Wang, Meng Wang",
    abstract: {
      zh: "我们提出 VisMet-Bench：面向纯视觉隐喻理解的评测基准。754 组精心标注的图像对、三层五任务的递进式评估框架，在 11 个先进多模态大模型上系统评估 —— 揭示当前模型在跨域隐喻推理上与人类水平仍有显著差距。",
      en: "Visual metaphor enables humans to perceive abstract or symbolic meaning purely through images, connecting concepts across visually dissimilar domains without relying on language. We propose VisMet-Bench, a benchmark for monomodal visual metaphor understanding with a three-tier, five-task framework over 754 curated image pairs.",
    },
    tags: {
      zh: ["VisMet-Bench", "754 组图像对", "5 类任务", "11 个 MLLM"],
      en: ["VisMet-Bench", "754 Image Pairs", "5 Task Types", "11 MLLMs"],
    },
    pdf: "https://www.openaccess.thecvf.com/content/CVPR2026F/papers/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.pdf",
    page: "https://www.openaccess.thecvf.com/content/CVPR2026F/html/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.html",
  },
};

const i18n = {
  zh: {
    "nav.about": "关于",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.publications": "论文",
    "nav.contact": "联系",
    "hero.role": "AI 开发者 · 多智能体 / 大模型研究",
    "hero.tagline": "仰望星空，脚踏实地 ✦",
    "hero.bio": "构建多智能体系统，探索多模态大模型的边界 —— 两个得意项目，一篇 CVPR 论文。欢迎来到我的小站。",
    "hero.ctaProjects": "查看项目",
    "about.eyebrow": "关于",
    "about.title": "关于我",
    "about.p1": "我是 AttentionCoo，一名热爱 AI 的开发者与研究者。我的兴趣集中在多智能体系统与大模型应用：从基于 LangGraph 的脑卒中临床决策支持系统，到「中国软件杯」的个性化学习多智能体。",
    "about.p2": "在研究中，我关注多模态大模型的抽象推理能力 —— 我们在 CVPR 2026 Findings 发表的 VisMet-Bench 基准，系统性评估了模型对纯视觉隐喻的理解。我相信好的系统源于优雅的设计，代码是最接近魔法的东西。",
    "about.focusTitle": "关注的方向",
    "skills.eyebrow": "技能",
    "skills.title": "技能星图",
    "skills.subtitle": "我的技术星座",
    "projects.eyebrow": "项目",
    "projects.title": "得意之作",
    "projects.subtitle": "两个让我骄傲的项目 —— Star 与 Fork 为 GitHub 公开数据快照",
    "projects.featuredTitle": "精选项目",
    "projects.repo": "仓库",
    "projects.homepage": "在线预览",
    "projects.stars": "Star",
    "projects.forks": "Fork",
    "projects.viewAll": "在 GitHub 查看全部仓库",
    "pubs.eyebrow": "论文",
    "pubs.title": "论文",
    "pubs.subtitle": "在学术星空中留下的一颗星",
    "pubs.page": "论文主页",
    "pubs.pdf": "PDF 全文",
    "nav.activity": "动态",
    "activity.eyebrow": "动态",
    "activity.title": "GitHub 活跃情况",
    "activity.subtitle": "公开贡献统计与提交日历，来源于 GitHub API",
    "activity.stats.totalStars": "Star 总数",
    "activity.stats.publicRepos": "公开仓库",
    "activity.stats.followers": "关注者",
    "activity.stats.totalCommits": "提交贡献",
    "activity.yearsLabel": "活跃年份",
    "activity.less": "少",
    "activity.more": "多",
    "activity.note": "数据获取时间：2026-08-15。",
    "contact.eyebrow": "联系",
    "contact.title": "找到我",
    "contact.subtitle": "星光为引，有缘相逢",
    "contact.github.desc": "开源与代码",
    "contact.email.label": "邮箱",
    "contact.email.desc": "给我发邮件",
    "footer.line": "在星空中漫游 ✦ 由 GitHub Pages 驱动",
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.publications": "Publications",
    "nav.contact": "Contact",
    "hero.role": "AI Developer · Multi-Agent / LLM Research",
    "hero.tagline": "Reach for the stars, keep feet on the ground ✦",
    "hero.bio": "Building multi-agent systems and exploring the frontiers of multimodal LLMs — two proud projects, one CVPR paper. Welcome to my little corner of the universe.",
    "hero.ctaProjects": "View Projects",
    "about.eyebrow": "About",
    "about.title": "About Me",
    "about.p1": "I'm AttentionCoo, a developer and researcher who loves AI. My interests center on multi-agent systems and LLM applications — from a LangGraph-powered clinical decision support system for stroke care, to a personalized learning multi-agent system for the China Software Cup.",
    "about.p2": "On the research side, I study abstract reasoning in multimodal LLMs: our VisMet-Bench benchmark (CVPR 2026 Findings) systematically evaluates how models understand pure visual metaphors. I believe good systems come from elegant design — code is the closest thing to magic.",
    "about.focusTitle": "What I Focus On",
    "skills.eyebrow": "Skills",
    "skills.title": "Skill Constellation",
    "skills.subtitle": "My technical constellation",
    "projects.eyebrow": "Projects",
    "projects.title": "Proud Works",
    "projects.subtitle": "Two projects I'm proud of — stars and forks are snapshots of public GitHub data",
    "projects.featuredTitle": "Featured Projects",
    "projects.repo": "Repository",
    "projects.homepage": "Live Demo",
    "projects.stars": "Stars",
    "projects.forks": "Forks",
    "projects.viewAll": "View all repositories on GitHub",
    "pubs.eyebrow": "Publications",
    "pubs.title": "Publications",
    "pubs.subtitle": "A star in the academic sky",
    "pubs.page": "Paper Page",
    "pubs.pdf": "PDF",
    "nav.activity": "Activity",
    "activity.eyebrow": "Activity",
    "activity.title": "GitHub Activity",
    "activity.subtitle": "Public contribution stats and commit calendar, from the GitHub API",
    "activity.stats.totalStars": "Total Stars",
    "activity.stats.publicRepos": "Public Repos",
    "activity.stats.followers": "Followers",
    "activity.stats.totalCommits": "Total Commits",
    "activity.yearsLabel": "Years active",
    "activity.less": "Less",
    "activity.more": "More",
    "activity.note": "Data fetched on 2026-08-15.",
    "contact.eyebrow": "Contact",
    "contact.title": "Find Me",
    "contact.subtitle": "Guided by starlight",
    "contact.github.desc": "Open source & code",
    "contact.email.label": "Email",
    "contact.email.desc": "Send me an email",
    "footer.line": "Roaming among the stars ✦ Powered by GitHub Pages",
  },
};

let currentLang = document.documentElement.lang.startsWith("en") ? "en" : "zh";

function t(key) {
  return i18n[currentLang][key] ?? key;
}

// ============ 渲染函数 ============
function renderChips() {
  const box = document.getElementById("about-chips");
  box.innerHTML = data.focus[currentLang]
    .map((item, i) => `<span class="m3-chip${i === 0 ? " m3-chip--accent" : ""}">${item}</span>`)
    .join("");
}

function renderStats() {
  const box = document.getElementById("about-stats");
  box.innerHTML = data.stats
    .map(
      (s) =>
        `<div class="stat m3-card"><span class="stat__num">${s.num}</span><span class="stat__label">${s.label[currentLang]}</span></div>`
    )
    .join("");
}

function renderSkills() {
  const box = document.getElementById("skills-grid");
  box.innerHTML = data.skills
    .map(
      (s) => `
      <div class="skill-card m3-card">
        <div class="skill-icon">${s.icon}</div>
        <div class="skill-name">${s.name[currentLang]}</div>
        <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
      </div>`
    )
    .join("");
  // 技能条进入视口后填充
  const fillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + "%";
          fillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  box.querySelectorAll(".skill-fill").forEach((el) => fillObserver.observe(el));
}

function renderProjects() {
  const box = document.getElementById("projects-grid");
  box.innerHTML = data.projects
    .map((p) => {
      const homepageLink = p.homepage
        ? `<a class="project-card__link" href="${p.homepage}" target="_blank" rel="noopener noreferrer">${t("projects.homepage")}${ICONS.external}</a>`
        : "";
      return `
      <article class="project-card m3-card">
        <div class="project-card__head">
          <a class="project-card__name" href="${p.repo}" target="_blank" rel="noopener noreferrer">${p.name}</a>
        </div>
        <p class="project-card__desc">${p.desc[currentLang]}</p>
        <div class="project-card__meta">
          <span class="m3-chip">${p.language}</span>
          ${p.tags[currentLang]
            .slice(0, 2)
            .map((tag) => `<span class="m3-chip m3-chip--accent">${tag}</span>`)
            .join("")}
          <span class="project-card__stats">
            <span class="project-card__stat project-card__stat--star" title="${t("projects.stars")}">${ICONS.star}${p.stars}</span>
            <span class="project-card__stat" title="${t("projects.forks")}">${ICONS.fork}${p.forks}</span>
          </span>
        </div>
        <div class="project-card__actions">
          <a class="project-card__link" href="${p.repo}" target="_blank" rel="noopener noreferrer">${t("projects.repo")}${ICONS.external}</a>
          ${homepageLink}
        </div>
      </article>`;
    })
    .join("");
}

function renderPaper() {
  const box = document.getElementById("paper-card");
  const p = data.paper;
  box.innerHTML = `
    <article class="paper-card m3-card">
      <div class="paper-card__badges">
        <span class="m3-chip m3-chip--gold">${p.badge}</span>
        <span class="m3-chip">${p.pages}</span>
      </div>
      <a class="paper-card__title" href="${p.page}" target="_blank" rel="noopener noreferrer">${p.title}</a>
      <p class="paper-card__authors">${p.authors}</p>
      <p class="paper-card__abstract${currentLang === "zh" ? "-zh" : ""}">${p.abstract[currentLang]}</p>
      <div class="paper-card__tags">
        ${p.tags[currentLang].map((tag, i) => `<span class="m3-chip${i === 0 ? " m3-chip--accent" : ""}">${tag}</span>`).join("")}
      </div>
      <div class="paper-card__actions">
        <a class="project-card__link" href="${p.page}" target="_blank" rel="noopener noreferrer">${t("pubs.page")}${ICONS.external}</a>
        <a class="project-card__link" href="${p.pdf}" target="_blank" rel="noopener noreferrer">${t("pubs.pdf")}${ICONS.external}</a>
      </div>
    </article>`;
}

function renderActivity() {
  const box = document.getElementById("activity-box");
  const s = window.ACTIVITY_SNAPSHOT;
  if (!s || !s.calendar) return;
  const weeks = s.calendar;
  const start = new Date(s.firstDay + "T00:00:00Z");
  const dayLabels = currentLang === "zh" ? ["一", "三", "五"] : ["Mon", "Wed", "Fri"];
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const level = (n) => (n === 0 ? 0 : n <= 3 ? 1 : n <= 8 ? 2 : n <= 15 ? 3 : 4);

  const monthsHtml = [];
  const weeksHtml = [];
  let prevMonth = -1;
  weeks.forEach((week, w) => {
    const wd = new Date(start.getTime() + w * 7 * 86400000);
    const m = wd.getUTCMonth();
    const label =
      m !== prevMonth ? (currentLang === "zh" ? m + 1 + "月" : monthNamesEn[m]) : "";
    prevMonth = m;
    monthsHtml.push(
      `<span class="gh-month">${label ? "<span>" + label + "</span>" : ""}</span>`
    );
    weeksHtml.push(
      `<div class="gh-week">${week
        .map((n, d) => {
          const iso = new Date(start.getTime() + (w * 7 + d) * 86400000)
            .toISOString()
            .slice(0, 10);
          const tip = currentLang === "zh" ? `${iso} · ${n} 次提交` : `${iso} · ${n} commits`;
          return `<span class="gh-cell gh-cell--l${level(n)}" title="${tip}"></span>`;
        })
        .join("")}</div>`
    );
  });

  const years = [];
  const y0 = start.getUTCFullYear();
  const y1 = new Date(start.getTime() + (weeks.length * 7 - 1) * 86400000).getUTCFullYear();
  for (let y = y0; y <= y1; y++) years.push(y);

  const totalText =
    currentLang === "zh"
      ? `累计 <strong>${s.totalCommits.toLocaleString()}</strong> 次提交`
      : `<strong>${s.totalCommits.toLocaleString()}</strong> commits in total`;

  box.innerHTML = `
    <div class="activity__stats">
      ${["totalStars", "publicRepos", "followers", "totalCommits"]
        .map(
          (k) => `
        <div class="activity__stat">
          <span class="activity__stat-value">${s[k].toLocaleString()}</span>
          <span class="activity__stat-label">${t("activity.stats." + k)}</span>
        </div>`
        )
        .join("")}
    </div>
    <div class="activity__years">
      <span class="activity__years-label">${t("activity.yearsLabel")}</span>
      <div class="activity__year-chips">${years
        .map((y) => `<span class="m3-chip">${y}</span>`)
        .join("")}</div>
    </div>
    <div class="activity__graph">
      <div class="gh-head">
        <span class="gh-total">${totalText}</span>
        <span class="gh-legend">
          <span>${t("activity.less")}</span>
          <span class="gh-cell gh-cell--l0"></span>
          <span class="gh-cell gh-cell--l1"></span>
          <span class="gh-cell gh-cell--l2"></span>
          <span class="gh-cell gh-cell--l3"></span>
          <span class="gh-cell gh-cell--l4"></span>
          <span>${t("activity.more")}</span>
        </span>
      </div>
      <div class="gh-scroll">
        <div class="gh-body">
          <div class="gh-days">${dayLabels.map((d) => `<span>${d}</span>`).join("")}</div>
          <div class="gh-calendar">
            <div class="gh-months">${monthsHtml.join("")}</div>
            <div class="gh-weeks">${weeksHtml.join("")}</div>
          </div>
        </div>
      </div>
    </div>
    <p class="activity__note">${t("activity.note")}</p>
  `;
}

function renderAll() {
  // 静态文案
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  // 动态区块
  renderChips();
  renderStats();
  renderSkills();
  renderProjects();
  renderPaper();
  renderActivity();
  // 语言按钮状态
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  // 标题随语言切换
  document.title = currentLang === "zh" ? "AttentionCoo · 个人主页" : "AttentionCoo · Personal Homepage";
}

// ============ 语言切换 ============
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
    try {
      localStorage.setItem("attentioncoo-lang", currentLang);
    } catch (err) {
      /* ignore */
    }
    renderAll();
  });
});

// ============ 光标聚光灯 ============
function handleSpotlight(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

document.querySelectorAll(".spotlight").forEach((el) => {
  el.addEventListener("mousemove", handleSpotlight);
});
document.querySelector(".layout__hero").addEventListener("mousemove", handleSpotlight);

// ============ 滚动显现 ============
if ("IntersectionObserver" in window) {
  const sections = document.querySelectorAll(".m3-section");
  sections.forEach((el) => el.classList.add("pre-reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pre-reveal");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 }
  );
  sections.forEach((el) => io.observe(el));
}

// ============ 页脚年份 ============
document.getElementById("year").textContent = new Date().getFullYear();

// ============ 初始化 ============
renderAll();
