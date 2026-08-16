# AttentionCoo.github.io

我的 GitHub Pages 个人主页 —— 星空极光背景 + Material Design 3 设计体系（分屏布局参考 Tuning-Luna.github.io），纯 HTML / CSS / JavaScript 实现，零依赖、零构建。

## ✨ 特性

- 🪐 分屏布局：右侧固定玻璃英雄面板（个人名片）+ 左侧滚动内容
- 🌌 星空银河背景：Canvas 星空粒子、流星、流动极光光斑
- 🎨 Material Design 3 设计令牌：字阶、间距、形状、阴影、动效全部走 CSS 变量
- 🖱️ 光标聚光灯：鼠标划过个人卡片时浮现光晕
- 🌐 中英双语切换（记忆偏好，首帧不闪烁）
- 📊 GitHub 活动图：统计卡片 + 自绘贡献日历热力图（真实数据，紫青配色）
- 🔄 数据自动刷新：GitHub Actions 每天北京时间 00:00 更新一次快照，也可手动触发
- 📜 CVPR 2026 Findings 论文卡片（VisMet-Bench）+ 两个得意项目
- 📱 完全响应式，支持 `prefers-reduced-motion`
- ⚡ 零依赖，加载速度快

## 🚀 本地预览

直接用浏览器打开 `index.html` 即可，或者用任意静态服务器：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 📦 部署到 GitHub Pages

1. 把这个仓库推送到 GitHub：

```bash
git init
git add .
git commit -m "init: personal homepage"
git branch -M master
git remote add origin https://github.com/AttentionCoo/AttentionCoo.github.io.git
git push -u origin master
```

2. 在仓库 **Settings → Pages** 中，将 Source 设为 `Deploy from a branch`，分支选择 `master`（根目录 `/`），保存。

3. 几分钟后访问 **https://attentioncoo.github.io** 即可看到页面。

## 🔄 数据更新机制

页面上的 GitHub 数据有三层来源，全部自动保持新鲜：

1. **实时拉取（打开页面即生效）**：浏览器直接调用 GitHub REST API，实时获取三个项目的 Star/Fork、账号的仓库数、关注者与 Star 总数。点击「动态」区的 **「刷新数据」** 按钮可随时手动重拉。网络不可用时静默回退到快照数据。
2. **每日快照（GitHub Actions）**：`.github/workflows/refresh-activity.yml` 每天北京时间 00:00 运行，拉取完整数据（含需要认证 GraphQL 的**提交日历**与提交总数）并提交回仓库，无需任何配置。「完整更新」按钮直达 Actions 手动触发页。
3. **本地脚本**：`HTTPS_PROXY=<代理> GH_TOKEN=<token> python scripts/refresh_activity.py`

> 提示：修改 `css/style.css` 或 `js/main.js` 后，记得把 `index.html` 里的 `?v=7` 版本号加一，强制浏览器刷新缓存。

## ✏️ 自定义

| 想改什么           | 去哪里改                              |
| ------------------ | ------------------------------------- |
| 名字 / 简介        | `index.html`（data-i18n 文案）+ `js/main.js` 的 `i18n` 字典 |
| 关注方向           | `js/main.js` 的 `data.focus`（统计数字自动取自实时数据与快照） |
| 技能列表           | `js/main.js` 的 `data.skills`          |
| 项目卡片           | `js/main.js` 的 `data.projects`        |
| 论文信息           | `js/main.js` 的 `data.paper`           |
| GitHub 活动图数据   | 由 `scripts/refresh_activity.py` + Actions 自动生成，勿手改 |
| 联系方式           | `index.html` 的「联系」区块             |
| 配色 / 星空 / 极光 | `css/style.css` 顶部的 MD3 色彩令牌与 `.blob` 样式 |

## 📄 目录结构

```
.
├── index.html      # 页面结构
├── css/
│   └── style.css   # MD3 设计令牌 + 全部样式
├── js/
│   ├── main.js          # 数据、i18n、星空引擎与交互
│   └── activity-data.js # GitHub 活动图数据快照
├── img/
│   └── avatar.jpg  # GitHub 头像（本地托管）
└── README.md
```
