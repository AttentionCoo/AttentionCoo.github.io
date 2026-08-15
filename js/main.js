// ============ 星空画布 ============
(function () {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let shootingStars = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    const count = width < 640 ? 110 : 190;
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.06 + 0.02,
        hue: Math.random() < 0.12 ? "gold" : Math.random() < 0.18 ? "cyan" : "white",
      });
    }
  }

  function spawnShootingStar() {
    if (reduced) return;
    const startX = Math.random() * width * 0.7 + width * 0.15;
    const startY = Math.random() * height * 0.35;
    const angle = Math.PI * 0.65 + Math.random() * 0.3; // 向左下
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

    // 星星
    for (const s of stars) {
      const twinkle = reduced ? 1 : Math.sin(t * s.twinkleSpeed + s.phase) * 0.5 + 0.5;
      const alpha = s.baseAlpha * (0.45 + 0.55 * twinkle);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.hue === "gold") {
        ctx.fillStyle = `rgba(252, 211, 77, ${alpha})`;
      } else if (s.hue === "cyan") {
        ctx.fillStyle = `rgba(103, 232, 249, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(233, 237, 255, ${alpha})`;
      }
      ctx.fill();
      if (s.r > 1.1) {
        // 大星星的光晕
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === "gold"
            ? `rgba(252, 211, 77, ${alpha * 0.14})`
            : `rgba(196, 181, 253, ${alpha * 0.12})`;
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

    // 流星
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
        const grad = ctx.createLinearGradient(
          m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14
        );
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

// ============ 技能数据 ============
const skills = [
  { icon: "🤖", name: "多智能体系统 · LangGraph", level: 92 },
  { icon: "🐍", name: "Python", level: 90 },
  { icon: "🧠", name: "大模型应用 · RAG", level: 88 },
  { icon: "💬", name: "Prompt Engineering", level: 85 },
  { icon: "🖼️", name: "多模态大模型 (MLLM)", level: 84 },
  { icon: "🔥", name: "PyTorch · 深度学习", level: 80 },
  { icon: "🌐", name: "Web 全栈 · FastAPI / SSE", level: 78 },
  { icon: "🐙", name: "Git · 协作开发", level: 88 },
];

// ============ 项目数据 ============
const projects = [
  {
    icon: "🧠",
    title: "脑卒中多智能体临床决策支持系统",
    desc:
      "基于角色扮演的脑卒中多智能体 Web 医疗辅助决策系统 (CDSS)。集成 LangGraph 纵横矩阵协同、高级 Hybrid RAG 知识检索与全栈响应式 (SSE) 流式数据管道，实现高合规、低幻觉的临床智能会诊。",
    tags: [
      { t: "LangGraph", c: "violet" },
      { t: "Hybrid RAG", c: "" },
      { t: "SSE 流式", c: "" },
      { t: "Multi-Agent", c: "violet" },
      { t: "Python", c: "" },
    ],
    stars: 8,
    lang: "Python",
    license: "MIT",
    github: "https://github.com/AttentionCoo/stroke-multi-agent-cdss",
    demo: null,
  },
  {
    icon: "🎓",
    title: "个性化学习多智能体系统",
    desc:
      "第十五届「中国软件杯」大学生软件设计大赛 A3 赛题参赛作品 —— 基于大模型的个性化资源生成与学习多智能体系统开发（出题企业：科大讯飞股份有限公司）。",
    tags: [
      { t: "大模型", c: "violet" },
      { t: "Multi-Agent", c: "" },
      { t: "RAG", c: "" },
      { t: "中国软件杯", c: "gold" },
      { t: "Python", c: "" },
    ],
    stars: 4,
    lang: "Python",
    license: "MIT",
    github: "https://github.com/AttentionCoo/learning-characterizing-mas",
    demo: null,
  },
];

// ============ 论文数据 ============
const publication = {
  badge: "🏆 CVPR 2026 Findings · pp. 2304–2313",
  title:
    "Seeing the Abstract: A Benchmark for Visual-Only Metaphor Understanding in Multimodal Large Language Models",
  authors:
    "Shan Zhao, Zhao Yang, Tianwei Yan, Yusong Gong, Qian Wan, Shizhao Chen, Shezheng Song, Chengyu Wang, Meng Wang",
  abstractEn:
    "Visual metaphor enables humans to perceive abstract or symbolic meaning purely through images, connecting concepts across visually dissimilar domains without relying on language. We propose VisMet-Bench, a benchmark for monomodal visual metaphor understanding with a three-tier, five-task framework over 754 curated image pairs.",
  abstractZh:
    "我们提出 VisMet-Bench：面向纯视觉隐喻理解的评测基准。754 组精心标注的图像对、三层五任务的递进式评估框架，在 11 个先进多模态大模型上系统评估 —— 揭示当前模型在跨域隐喻推理上与人类水平仍有显著差距。",
  tags: [
    { t: "VisMet-Bench", c: "violet" },
    { t: "754 组图像对", c: "" },
    { t: "5 类任务", c: "" },
    { t: "11 个 MLLM", c: "gold" },
  ],
  pdf: "https://www.openaccess.thecvf.com/content/CVPR2026F/papers/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.pdf",
  page: "https://www.openaccess.thecvf.com/content/CVPR2026F/html/Zhao_Seeing_the_Abstract_A_Benchmark_for_Visual-Only_Metaphor_Understanding_in_CVPRF_2026_paper.html",
};

// ============ 打字机效果 ============
const phrases = ["仰望星空 ✨", "构建多智能体系统 🤖", "探索多模态大模型 🧠", "追逐 CVPR 的星光 🌟"];
const typingEl = document.getElementById("typing-text");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 110);
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 55);
  }
}

type();

// ============ 渲染技能卡片 ============
const skillsGrid = document.getElementById("skills-grid");
skills.forEach((s) => {
  const card = document.createElement("div");
  card.className = "skill-card glass reveal";
  card.innerHTML = `
    <div class="skill-icon">${s.icon}</div>
    <div class="skill-name">${s.name}</div>
    <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
  `;
  skillsGrid.appendChild(card);
});

// ============ 渲染项目卡片 ============
const projectsGrid = document.getElementById("projects-grid");
projects.forEach((p) => {
  const card = document.createElement("div");
  card.className = "project-card glass reveal";
  const demoLink = p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener" title="在线演示" aria-label="在线演示">🔗</a>`
    : "";
  card.innerHTML = `
    <div class="project-top">
      <span class="project-icon">${p.icon}</span>
      <div class="project-links">
        ${demoLink}
        <a href="${p.github}" target="_blank" rel="noopener" title="GitHub 仓库" aria-label="GitHub 仓库">🐙</a>
      </div>
    </div>
    <h3 class="project-title">${p.title}</h3>
    <p class="project-desc">${p.desc}</p>
    <div class="project-meta">
      <span class="star">★ ${p.stars}</span>
      <span>● ${p.lang}</span>
      <span>⚖ ${p.license}</span>
    </div>
    <div class="project-tags">${p.tags
      .map((tag) => `<span class="tag ${tag.c}">${tag.t}</span>`)
      .join("")}</div>
  `;
  projectsGrid.appendChild(card);
});

// ============ 渲染论文卡片 ============
const paperCard = document.getElementById("paper-card");
paperCard.innerHTML = `
  <article class="paper-card reveal">
    <div class="paper-badges">
      <span class="venue-badge">${publication.badge}</span>
    </div>
    <h3 class="paper-title">${publication.title}</h3>
    <p class="paper-authors">${publication.authors}</p>
    <p class="paper-abstract">${publication.abstractEn}</p>
    <p class="paper-abstract-zh">${publication.abstractZh}</p>
    <div class="paper-tags">${publication.tags
      .map((tag) => `<span class="tag ${tag.c}">${tag.t}</span>`)
      .join("")}</div>
    <div class="paper-links">
      <a class="paper-link" href="${publication.page}" target="_blank" rel="noopener">📄 论文主页</a>
      <a class="paper-link" href="${publication.pdf}" target="_blank" rel="noopener">📥 PDF 全文</a>
    </div>
  </article>
`;

// ============ 滚动显现动画 ============
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ============ 技能条动画 ============
const fillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.level + "%";
        fillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".skill-fill").forEach((el) => fillObserver.observe(el));

// ============ 数字滚动动画 ============
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1500;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".stat-num").forEach((el) => countObserver.observe(el));

// ============ 导航栏滚动状态 ============
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ============ 移动端菜单 ============
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-label", "打开菜单");
  });
});

// ============ 页脚年份 ============
document.getElementById("year").textContent = new Date().getFullYear();
