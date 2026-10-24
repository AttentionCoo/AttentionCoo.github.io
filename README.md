# AttentionCoo.github.io

我的 GitHub Pages 个人主页 —— 星空极光背景 + Material Design 3 设计体系，纯 HTML / CSS / JavaScript 实现，零依赖、零构建。

## ✨ 特性

- 🪐 分屏布局：右侧固定玻璃英雄面板（个人名片）+ 左侧滚动内容
- 🌌 星空银河背景：Canvas 星空粒子、流星、流动极光光斑
- 🎨 Material Design 3 设计令牌：字阶、间距、形状、阴影、动效全部走 CSS 变量
- 🌐 中英双语切换（记忆偏好，首帧不闪烁）
- 🧭 访客意图模式：招聘者 / 研究者 / 合作者 / 探索者，动态推荐浏览路径
- 🗂️ 项目案例弹窗：背景、关键指标、我的工作、挑战、方案、结果与下一步
- 🔎 项目筛选与搜索：按研究 / 工程 / 实验分类，支持关键词和多条件 URL
- ⌨️ 全局命令面板：`Ctrl / Cmd + K` 搜索页面、项目和快捷操作
- 🧭 滚动导航高亮 + 经历时间线 + Now 状态卡
- 📊 GitHub 活动图：统计卡片、贡献日历与连续贡献天数
- 🔄 数据自动刷新：GitHub Actions 每天北京时间 00:00 更新快照，也可手动触发
- 📜 CVPR 2026 Findings 论文卡片：关键指标、PDF、BibTeX 一键复制
- 📇 联系方式增强：复制邮箱、下载 vCard、QQ / GitHub / Email 入口
- 🚀 SEO / 分享：Open Graph 图、JSON-LD、sitemap、robots、404 页面
- 📱 完全响应式，支持 `prefers-reduced-motion`

## 🚀 本地预览

直接用浏览器打开 `index.html` 即可，或者用任意静态服务器：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 🔗 URL 参数

项目筛选与案例弹窗会同步到 URL，便于分享和浏览器前进后退：

- `?type=research`：筛选研究类项目
- `?q=rag`：按关键词筛选项目
- `?project=stroke-multi-agent-cdss`：直接打开某个项目案例
- `#publications`：跳转到对应区块

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

页面上的 GitHub 数据有三层来源：

1. **实时拉取**：浏览器调用 GitHub REST API 获取项目 Star/Fork、仓库数、关注者和 Star 总数；失败时静默回退到快照。
2. **每日快照**：`.github/workflows/refresh-activity.yml` 每天北京时间 00:00 运行，抓取包含认证 GraphQL 的贡献日历并提交回仓库。
3. **本地脚本**：`HTTPS_PROXY=<代理> GH_TOKEN=<token> python scripts/refresh_activity.py`

> 提示：修改 `css/style.css`、`js/main.js` 或 `js/features.js` 后，把 `index.html` 里的 `?v=12` 版本号加一，强制浏览器刷新缓存。

## ✏️ 自定义

| 想改什么 | 去哪里改 |
| --- | --- |
| 名字 / 简介 | `index.html` 的 `data-i18n` + `js/main.js` 的 `i18n` |
| 新增界面文案 | `js/features.js` 顶部的 `extraI18nZh` / `extraI18nEn` |
| 关注方向 | `js/main.js` 的 `data.focus` |
| 技能列表 | `js/main.js` 的 `data.skills` |
| 项目卡片与链接 | `js/main.js` 的 `data.projects` |
| 项目案例详情 | `js/features.js` 的 `projectDetails` |
| 论文信息 / BibTeX | `js/main.js` 的 `data.paper` + `js/features.js` 的补充字段 |
| 时间线 / Now | `js/features.js` 的 `data.timeline`、对应 i18n |
| 访客模式 | `js/features.js` 的 `intentConfig` |
| GitHub 活动数据 | 由 `scripts/refresh_activity.py` + Actions 自动生成，勿手改 |
| 联系方式 | `index.html` 的「联系」区块、`AttentionCoo.vcf` |
| 配色 / 星空 / 极光 | `css/style.css` 顶部的 MD3 色彩令牌与 `.blob` 样式 |

## 📄 目录结构

```
.
├── index.html             # 页面结构、SEO、弹窗
├── 404.html               # GitHub Pages 自定义 404
├── AttentionCoo.vcf       # 联系人名片
├── robots.txt / sitemap.xml
├── css/
│   └── style.css          # MD3 设计令牌 + 全站样式
├── js/
│   ├── main.js            # 基础数据、i18n、渲染、星空与实时数据
│   ├── features.js        # 项目案例、筛选搜索、命令面板、时间线等
│   └── activity-data.js   # GitHub 活动图数据快照
├── img/
│   ├── avatar.jpg         # GitHub 头像
│   └── og-cover.png       # Open Graph 分享图
├── scripts/
│   └── refresh_activity.py
└── .github/workflows/
    └── refresh-activity.yml
```
