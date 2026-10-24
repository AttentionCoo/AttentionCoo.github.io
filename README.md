# AttentionCoo.github.io

我的个人研究站与作品集，当前版本 **V3 Signal / 信号站**。从单页个人名片重构为内容优先的多页面站点：项目案例、研究笔记、论文概览、经历与 CV。

## 现在有什么

- 首页：一句话定位、当前状态、精选项目、研究亮点、最近笔记和联系方式
- Work：项目索引与独立案例页，覆盖问题、约束、系统结构、关键决策、结果和下一步
- Notes：Research Note / Build Log / Experiment Log，支持中英双语、RSS 和独立阅读页
- Research：VisMet-Bench 研究概览、关键指标、Tab 式分析与 BibTeX 复制
- About：个人介绍、经历时间线、能力证据、GitHub 活动与 CV
- 深空 Night / 纸张 Paper 双主题，阅读页默认进入纸张模式
- 中英双语：首帧读取本地偏好，避免语言闪烁
- 全局搜索：Ctrl / Cmd + K 搜索项目、笔记、研究与快捷操作
- SEO / 分享：每页 Open Graph、JSON-LD、sitemap、canonical、RSS
- PWA：可安装、离线缓存核心页面，仅在 HTTPS 生产环境注册 Service Worker
- 可访问性：跳过导航、键盘搜索、焦点样式、语言与主题切换、减少动态效果支持
- 无前端依赖：原生 HTML / CSS / JavaScript，无框架、无构建即可浏览

## 页面结构

```text
/                     首页
/work/                项目索引
/work/stroke-multi-agent-cdss.html
/work/learning-characterizing-mas.html
/work/titanic-ft-transformer.html
/notes/               笔记索引
/notes/why-auditable-agents-matter.html
/notes/designing-a-clinical-reasoning-loop.html
/notes/what-ft-transformer-taught-me.html
/research/            VisMet-Bench 研究概览
/about/               关于、经历、能力与 GitHub 活动
/about/cv.html        可打印 CV
/v2.html              V2 单页版存档（noindex）
```

## 本地预览

多页面站点使用绝对路径（`/css/site.css`、`/js/site-data.js`），建议通过本地静态服务器访问：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

直接双击 `index.html` 时，部分跨页面绝对路径和 PWA 能力会失效。

## 内容维护

| 想改什么 | 去哪里改 |
| --- | --- |
| 站点导航、项目、笔记索引、时间线、技能、论文元数据、UI 文案 | `js/site-data.js` |
| 首页结构 | `index.html` |
| 项目索引页 | `work/index.html` |
| 项目案例页外壳 | `work/*.html`（正文由 `js/site-data.js` 中的 `projects` 渲染） |
| 笔记索引与文章 | `notes/index.html`、`notes/*.html` |
| 研究页 | `research/index.html` |
| 关于页与 CV | `about/index.html`、`about/cv.html` |
| 全局交互、搜索、主题、语言、PWA 注册 | `js/site.js` |
| 视觉与响应式 | `css/site.css` |
| GitHub 活动快照 | `scripts/refresh_activity.py` + `.github/workflows/refresh-activity.yml` |
| 分享图 | `img/og-home.png`、`og-work.png`、`og-notes.png`、`og-research.png`、`og-about.png` |
| RSS 与 sitemap | `feed.xml`、`sitemap.xml` |

新增笔记时，需要同时更新：

1. `js/site-data.js` 的 `notes` 数组；
2. 新增一个 `notes/<slug>.html` 阅读页；
3. `feed.xml` 和 `sitemap.xml`。

## 数据更新机制

GitHub 活动数据继续由 GitHub Actions 每日刷新：

1. 浏览器读取 `js/activity-data.js` 中的公开快照；
2. `refresh-activity.yml` 每天北京时间 00:00 拉取最新贡献日历并提交；
3. 也可在本机运行：

```bash
HTTPS_PROXY=<代理> GH_TOKEN=<token> python scripts/refresh_activity.py
```

## 部署

站点仍然是纯静态 GitHub Pages：

1. 推送到 `master`；
2. 仓库 Settings → Pages → Deploy from a branch → `master` / root；
3. 等待 Actions 和 Pages 完成部署。

## 缓存与版本

- 页面样式与脚本通过根路径引用：`/css/site.css`、`/js/site.js`、`/js/site-data.js`。
- PWA 缓存名在 `sw.js` 的 `CACHE_NAME`。修改核心资源后，建议同时更新 `SITE.version`、`CACHE_NAME` 和 README 中的版本说明。
- `v2.html` 保留旧版单页体验，但不进入搜索索引和 sitemap，并标记为 `noindex`。

## 目录结构

```text
.
├── index.html
├── v2.html                     # V2 存档
├── 404.html
├── manifest.webmanifest
├── sw.js
├── feed.xml / sitemap.xml / robots.txt
├── css/
│   └── site.css
├── js/
│   ├── site-data.js            # 内容与文案
│   ├── site.js                 # 全站交互
│   └── activity-data.js        # GitHub 快照
├── work/
│   ├── index.html
│   └── *.html                  # 三个项目案例页
├── notes/
│   ├── index.html
│   └── *.html                  # 三篇双语笔记
├── research/
│   └── index.html
├── about/
│   ├── index.html
│   └── cv.html
├── img/
├── scripts/
└── .github/workflows/
```
