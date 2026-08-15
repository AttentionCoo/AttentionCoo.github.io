// ============ 技能数据 ============
const skills = [
  { icon: "🌐", name: "HTML / CSS", level: 90 },
  { icon: "⚡", name: "JavaScript / TypeScript", level: 85 },
  { icon: "🐍", name: "Python", level: 80 },
  { icon: "☕", name: "Java", level: 70 },
  { icon: "⚛️", name: "React / Vue", level: 75 },
  { icon: "🗄️", name: "SQL / 数据库", level: 72 },
  { icon: "🐙", name: "Git / GitHub", level: 88 },
  { icon: "🐳", name: "Docker / Linux", level: 65 },
];

// ============ 项目数据 ============
const projects = [
  {
    title: "个人主页",
    desc: "你现在正在看的这个网站 —— 一个现代、响应式的 GitHub Pages 个人主页。",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/AttentionCoo/AttentionCoo.github.io",
    demo: null,
  },
  {
    title: "示例项目一",
    desc: "这里可以放你的第一个得意之作，简单描述它解决了什么问题。",
    tags: ["Python", "Flask"],
    github: "https://github.com/AttentionCoo",
    demo: null,
  },
  {
    title: "示例项目二",
    desc: "这里可以放你的第二个项目，比如一个工具、一个游戏或一个库。",
    tags: ["TypeScript", "Node.js"],
    github: "https://github.com/AttentionCoo",
    demo: null,
  },
];

// ============ 打字机效果 ============
const phrases = ["写代码 💻", "创造新东西 ✨", "解决问题 🧩", "学习新技术 📚"];
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
  card.className = "skill-card reveal";
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
  card.className = "project-card reveal";
  const demoLink = p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener" title="在线演示" aria-label="在线演示">🔗</a>`
    : "";
  card.innerHTML = `
    <div class="project-top">
      <span class="project-folder">📁</span>
      <div class="project-links">
        ${demoLink}
        <a href="${p.github}" target="_blank" rel="noopener" title="GitHub 仓库" aria-label="GitHub 仓库">🐙</a>
      </div>
    </div>
    <h3 class="project-title">${p.title}</h3>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  `;
  projectsGrid.appendChild(card);
});

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
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ============ 技能条动画（进入视口后填充） ============
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
