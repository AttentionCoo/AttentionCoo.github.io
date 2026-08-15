# AttentionCoo.github.io

我的 GitHub Pages 个人主页 —— 星空极光背景 + Material Design 3 设计体系（分屏布局参考 Tuning-Luna.github.io），纯 HTML / CSS / JavaScript 实现，零依赖、零构建。

## ✨ 特性

- 🪐 分屏布局：右侧固定玻璃英雄面板（个人名片）+ 左侧滚动内容
- 🌌 星空银河背景：Canvas 星空粒子、流星、流动极光光斑
- 🎨 Material Design 3 设计令牌：字阶、间距、形状、阴影、动效全部走 CSS 变量
- 🖱️ 光标聚光灯：鼠标划过个人卡片时浮现光晕
- 🌐 中英双语切换（记忆偏好，首帧不闪烁）
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

## ✏️ 自定义

| 想改什么           | 去哪里改                              |
| ------------------ | ------------------------------------- |
| 名字 / 简介        | `index.html`（data-i18n 文案）+ `js/main.js` 的 `i18n` 字典 |
| 关注方向 / 统计数字 | `js/main.js` 的 `data.focus` / `data.stats` |
| 技能列表           | `js/main.js` 的 `data.skills`          |
| 项目卡片           | `js/main.js` 的 `data.projects`        |
| 论文信息           | `js/main.js` 的 `data.paper`           |
| 联系方式           | `index.html` 的「联系」区块             |
| 配色 / 星空 / 极光 | `css/style.css` 顶部的 MD3 色彩令牌与 `.blob` 样式 |

## 📄 目录结构

```
.
├── index.html      # 页面结构
├── css/
│   └── style.css   # MD3 设计令牌 + 全部样式
├── js/
│   └── main.js     # 数据、i18n、星空引擎与交互
├── img/
│   └── avatar.jpg  # GitHub 头像（本地托管）
└── README.md
```
