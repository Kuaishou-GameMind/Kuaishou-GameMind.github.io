# CODEBASE.md — team-page 代码架构

> 代码阅读与修改的唯一入口。修改代码后须同步更新本文档。

## 项目概述

快手游戏 GameMind Lab 的团队主页与项目展示站点。部署在 GitHub Pages 用户站点 `Kuaishou-GameMind.github.io`，`main` 分支根目录直接被 Pages 服务。

技术栈：Next.js 14（App Router + 静态导出）+ TypeScript + Tailwind CSS + framer-motion。

## 目录结构

```
team-page/
├── .github/workflows/deploy.yml  GitHub Pages 自动部署工作流
├── app/                          Next.js App Router 源码
│   ├── layout.tsx                根 layout（最小化 <html><body> + favicon metadata）
│   ├── not-found.tsx             404 页
│   ├── (main)/                   主站路由组（仅首页；含 globals.css + ThemeProvider/LangProvider）
│   │   ├── layout.tsx            主站 layout（加载 Tailwind + Provider + grain-overlay）
│   │   ├── globals.css           Tailwind + 设计 tokens（深/浅色变量）
│   │   └── page.tsx              首页（Navbar/Hero/Team/Capabilities/Vision）
│   ├── (redirects)/              旧路径兼容重定向（路由组，不出现在 URL 中）
│   │   ├── cutscene_agent/page.tsx   /cutscene_agent/ → /projects/cutscene_agent/
│   │   └── trace-bench/page.tsx      /trace-bench/ → /projects/trace_bench/
│   └── projects/                 项目站点路由（真实页面，统一在 projects/ 下）
│       ├── cutscene_agent/page.tsx
│       ├── trace_bench/page.tsx
│       └── arag_cli/page.tsx
├── components/                   React 组件
│   ├── Navbar/Hero/Team/Capabilities/Vision.tsx  首页五大区块
│   ├── ThemeProvider/LangProvider.tsx            深浅色 + 中英文 Context
│   ├── projects.ts                               项目统一注册源（单一数据源）
│   └── sites/                                    站点通用组件
│       ├── SitePage.tsx                          原生 HTML 注入 + 脚本加载
│       └── RedirectPage.tsx                      重定向页（meta refresh）
├── public/                       静态资源（build 时原样复制到 out/）
│   ├── logo.svg                 站点 logo 矢量图标（favicon + Navbar + Hero 装饰）
│   ├── project-preview.png       首页 Cutscene Agent 预览图（Capabilities 轮播大卡引用）
│   ├── _shared/                  三站点共享层（base.css + ui.js）
│   └── projects/                 项目站点资源（统一在 projects/ 下）
│       ├── cutscene_agent/       assets + style.css + script.js + figures.js + video-modal.js
│       ├── trace_bench/          images + leaderboard + paper + style.css + script.js + figures.js
│       └── arag_cli/             images + style.css + script.js
├── next.config.js                output:'export' + trailingSlash
├── tailwind.config.js            Tailwind 配置（品牌色 + CSS 变量映射）
├── package.json                  依赖与脚本
├── docs/                         文档（CODEBASE.md + CHANGELOG.md）
└── AGENTS.md                     项目级规则
```

> 根目录只含源码与配置，不存在任何构建产物。`.next/`（构建缓存）和 `out/`（静态导出）由 `npm run build` 生成，被 `.gitignore` 忽略。部署由 GitHub Actions 自动完成（见下）。

## 核心抽象

### 1. 项目注册源（`components/projects.ts`）

所有项目的**单一数据源**。包含 id、slug、名称、描述、标签、图标、链接、状态等字段。`Navbar`、`Capabilities` 等组件从此文件读取项目数据。

```ts
// 新增项目只需在 projects 数组里加一项
{
  id: 'xxx',
  slug: 'xxx',              // 决定路由路径 /projects/xxx/
  nameZh: '...', nameEn: '...',
  icon: SomeIcon,           // lucide-react 图标组件
  link: '/projects/xxx/',
  status: 'live',           // 'live' | 'coming-soon' | 'concept'
  preview: '/projects/xxx/images/framework.png',  // 可选：大卡预览图，缺省走 logo+渐变降级版式
  logo: '/projects/xxx/images/logo.png',          // 可选：项目 logo，缺省用 icon 降级渲染
  // ...其余字段
}
```

辅助函数：`liveProjects`（筛选已上线项目，轮播数据源）、`getProject(slug)`（按 slug 查找）。

### 2. 站点页通用组件（`components/sites/SitePage.tsx`）

三个项目站点共享的渲染组件。接收 `bodyHtml`（原生 HTML 字符串）、`stylesheets`、`scripts`，用 `dangerouslySetInnerHTML` 注入 body，用 `next/script` 加载外部 JS。

```tsx
// 新增站点路由页只需声明数据 + 调用 SitePage
<SitePage
  bodyHtml={BODY_HTML}
  stylesheets={[{ href: '/_shared/base.css' }, { href: '/projects/xxx/style.css' }]}
  scripts={[{ src: '/_shared/ui.js', strategy: 'beforeInteractive' }, { src: '/projects/xxx/script.js' }]}
/>
```

### 3. 重定向页通用组件（`components/sites/RedirectPage.tsx`）

旧路径兼容重定向。接收 `destination`、`title`、`message`、`styles`，生成 meta refresh + location.replace 页面。

## 模块职责

### 主站（`(main)` 路由组）

- **layout.tsx**：加载 `globals.css`，包裹 `ThemeProvider` + `LangProvider`，渲染 `grain-overlay` 噪点层。
- **page.tsx**：首页，组合 `Navbar` → `Hero` → `Team` → `Capabilities` → `Vision`。

### 项目站点（`app/projects/` 下，统一路径）

三个站点是**手写原生 HTML/CSS/JS**，通过 `SitePage` 组件注入。**不改站点内部 JS 逻辑**。

| 站点 | 路由 | 共享依赖 | 主题 |
|---|---|---|---|
| Cutscene Agent | `/projects/cutscene_agent/` | 无（自包含） | 深色电影 + 橙色 |
| TRACE BENCH | `/projects/trace_bench/` | `/_shared/base.css` + `/_shared/ui.js` | 暖色编辑 + 砖红 |
| ARAG CLI | `/projects/arag_cli/` | `/_shared/base.css` + `/_shared/ui.js` | 操作台 + 暖灰白 |

- **`_shared/ui.js`**：共享 UI 引擎，暴露 `window.initSite(config)`，提供 i18n、navbar 滚动、`data-aos` 动画、`data-count` 计数器、平滑锚点。
- **`_shared/base.css`**：共享结构样式骨架，各站点 `style.css` 覆盖 `:root` 变量换肤。

### 重定向页（旧路径兼容，集中在 `app/(redirects)/` 路由组）

- `/cutscene_agent/` → `/projects/cutscene_agent/`
- `/trace-bench/` → `/projects/trace_bench/`

> `/projects`（无后缀）路由已移除——navbar 等入口均直接指向具体项目，无指向 `/projects` 的链接。

## 新增项目指南

1. **注册项目**：在 `components/projects.ts` 的 `projects` 数组添加一项。填 `preview`（大卡预览图）与 `logo` 可让项目在首页轮播大卡中获得完整版式；两者皆缺则自动降级用项目 `icon` 渲染，无需额外处理。
2. **创建路由页**：在 `app/projects/<slug>/page.tsx`，用 `SitePage` 组件。
3. **放静态资源**：在 `public/projects/<slug>/` 放 CSS/JS/images。
4. **（可选）旧路径兼容**：如需保留旧 URL，在 `app/(redirects)/<old-slug>/page.tsx` 用 `RedirectPage`。

> 新增项目自动出现在首页 `#projects` 轮播（数据源 `liveProjects`），无需改 `Capabilities.tsx`。

## 构建与部署

```bash
npm run dev      # 本地开发（localhost:3004）
npm run build    # 静态导出到 out/
npm run preview  # 本地预览 out/（npx serve out）
```

**部署流程**（全自动）：push 到 `main` 分支 → GitHub Actions 自动执行 `npm ci` + `npm run build` → 上传 `out/` 为 Pages artifact → 部署到 GitHub Pages。

> 一次性配置：GitHub **Settings → Pages → Source** 设为 `GitHub Actions`。配置后每次 push `main` 自动触发部署。

`.github/workflows/deploy.yml` 工作流：`build` job 产出 `out/` → `upload-pages-artifact` → `deploy` job 通过 `deploy-pages` 发布。`.nojekyll` 由 `upload-pages-artifact` 自动注入。

## 变更记录

所有版本变更记录见 [`docs/CHANGELOG.md`](./CHANGELOG.md)。每次代码改动后须同步追加变更条目。