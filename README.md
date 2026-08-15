# AttentionCoo.github.io

我的 GitHub Pages 个人主页 —— 一个现代、响应式的单页网站，纯 HTML / CSS / JavaScript 实现，无需任何构建步骤。

## ✨ 特性

- 🌑 深色现代设计，渐变点缀
- ⌨️ 打字机效果的首屏介绍
- 📊 滚动触发动画：内容显现、技能条填充、数字滚动
- 📱 完全响应式，移动端汉堡菜单
- ⚡ 零依赖，加载速度快

## 🚀 本地预览

直接用浏览器打开 `index.html` 即可，或者用任意静态服务器：

```bash
# Python
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 📦 部署到 GitHub Pages

1. 把这个仓库推送到 GitHub：

```bash
git init
git add .
git commit -m "init: personal homepage"
git branch -M main
git remote add origin https://github.com/AttentionCoo/AttentionCoo.github.io.git
git push -u origin main
```

2. 在仓库 **Settings → Pages** 中，将 Source 设为 `Deploy from a branch`，分支选择 `main`（根目录 `/`），保存。

3. 几分钟后访问 **https://attentioncoo.github.io** 即可看到页面。

## ✏️ 自定义

| 想改什么       | 去哪里改                             |
| -------------- | ------------------------------------ |
| 名字 / 简介    | `index.html` 首屏与「关于我」区块      |
| 技能列表与熟练度 | `js/main.js` 顶部的 `skills` 数组     |
| 项目卡片       | `js/main.js` 顶部的 `projects` 数组   |
| 联系方式       | `index.html` 的「联系」区块            |
| 配色主题       | `css/style.css` 顶部的 `:root` 变量    |

## 📄 目录结构

```
.
├── index.html      # 页面结构
├── css/
│   └── style.css   # 全部样式
├── js/
│   └── main.js     # 数据与交互逻辑
└── README.md
```
