# CHANGELOG.md — team-page 变更记录

> 所有版本变更记录。每次代码改动后须同步追加条目。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/)，版本号遵循 SemVer。

## [1.4.2] — 2026-07-29

### Logo 矢量化

- 用矢量 `logo.svg`（3.3K）替换位图 `gamemind_logo_square.png`（18K），任意尺寸清晰、体积缩小 82%。
- `app/layout.tsx` favicon、`Navbar.tsx` 导航栏 logo、`Hero.tsx` 装饰 logo 全部改用 `/logo.svg`。
- 删除 `public/gamemind_logo_square.png`。

## [1.4.1] — 2026-07-29

### 首页视觉还原（对齐线上站点）

- 在 `components/Hero.tsx` 右侧新增装饰性 GameMind 控制器 logo（`gamemind_logo_square.png`），通过 mask + drop-shadow 实现左隐右现的渐变效果，对齐线上首页 Hero 布局。
- 修复标题行数错误：将此前误改的三行 `Kuaishou / GameMind / Lab` 恢复为线上效果的两行 `Kuaishou / GameMind Lab`。

### 静态资源整理

- 将 `gamemind_logo_square.png` 从根目录移入 `public/`，并在根 layout `metadata.icons` 配置为站点 favicon（`icon` + `apple-touch-icon`）。此前站点无 favicon。
- 删除无引用的 `public/logo.svg`（全工程无任何代码引用）。

## [1.4.0] — 2026-07-29

### 路由结构重构

- 将两个旧路径重定向页从 `app/` 根目录移入 `app/(redirects)/` 路由组（`cutscene_agent/`、`trace-bench/`），与核心路由物理隔离，一眼可辨为兼容垫片，且不出现在 URL 中。
- 删除 `(main)/projects/page.tsx` 及 `/projects` 路由——该路由重定向到第一个项目 cutscene_agent，是 1.1.0 删除占位 demo 后的残留 hack；navbar 等入口均直接指向具体项目，无指向 `/projects` 的链接。
- `(main)/` 路由组精简为仅含首页（`layout.tsx` + `globals.css` + `page.tsx`），职责纯净。

### Bug 修复

- 修复 `cutscene_agent` 站点资源路径 bug：`page.tsx` 中 10 处资源引用使用了 `/projects/projects/cutscene_agent/`（双重 `projects/`），实际资源在 `/projects/cutscene_agent/`。这是 1.1.0 将 cutscene_agent 从根目录迁移到 `projects/` 下时路径未改干净导致。涉及 style.css、script.js、figures.js、video-modal.js 及 6 处 BODY_HTML 内图片路径。

## [1.3.0] — 2026-07-29

### 部署架构重构：GitHub Actions 自动部署

- 切换部署方式从"手动 sync 产物到 main 分支"为 GitHub Actions 自动部署，彻底消除根目录产物污染。
- 新增 `.github/workflows/deploy.yml`：监听 `main` 分支 push，自动 `npm ci` + `npm run build` → `upload-pages-artifact(out/)` → `deploy-pages`。
- `main` 分支成为唯一源码分支，push 即部署。

### 删除

- 删除根目录全部构建/部署产物：`_next/`、`out/`、`.next/`、`_shared/`、`projects/`、`cutscene_agent/`、`trace-bench/`、`404/`、`404.html`、`index.html`、`index.txt`、`*.meta`、`*.rsc`、`logo.svg`、`project-preview.png`、`.nojekyll`、`README.txt`（全部可由 build 重建）。
- 删除 `scripts/sync-out.sh` 及 `scripts/` 目录（sync 工作流不再需要）。

### 变更

- `package.json`：移除 `sync` 与 `start` 脚本，新增 `preview`（`npx serve out`）与 `deploy`（`= build`）脚本。
- `.gitignore`：移除全部部署产物规则（`/_next/`、`/_shared/`、`/projects/` 等），只保留 `node_modules/`、`.next/`、`out/`、缓存、编辑器规则。
- `docs/CODEBASE.md`、`AGENTS.md`：更新目录结构与构建部署说明，反映 Actions 工作流。

### 一次性配置（手动）

- GitHub **Settings → Pages → Source** 改为 `GitHub Actions`。
- 将 `dev/main-page` 源码合并到 `main`，`main` 成为唯一源码分支。

## [1.2.0] — 2026-07-29

### 根目录清理

- 删除根目录所有旧构建产物（7月3日）：`404.html`、`index.html`、`index.meta`、`index.rsc`、`projects.meta`、`projects.rsc`、`_not-found.meta`、`_not-found.rsc`、`_next/`、`cutscene_agent/`、`_shared/`、`projects/`、`trace-bench/`。
- 删除根级静态资源（已纳入 `public/`，由 sync 重建）：`logo.svg`、`project-preview.png`、`.nojekyll`、`README.txt`。
- 用 `git rm --cached` 从 git 索引移除所有旧产物跟踪，使 `.gitignore` 规则生效。

### .gitignore 重构

- 部署产物（`_next/`、`_shared/`、`projects/`、`cutscene_agent/`、`trace-bench/`、`*.html`、`*.rsc`、`*.meta`、`*.txt`、`.nojekyll`、`README.txt`、`logo.svg`、`project-preview.png`）在开发分支被忽略。
- 开发分支根目录保持干净，只含源码与配置；merge 到 `main` 分支时再 `npm run sync` + commit 产物。

### sync 脚本增强

- `scripts/sync-out.sh` 新增自动生成 `README.txt`（部署说明，标注由 build+sync 生成）。
- 更新脚本注释反映新的工作流（开发分支干净 → main 分支 sync 产物）。

## [1.1.0] — 2026-07-29

### 结构整理

- 提取 `components/sites/SitePage.tsx` 通用组件，消除三个项目站点路由页的重复渲染逻辑（metadata + link 标签 + dangerouslySetInnerHTML + Script 加载）。
- 提取 `components/sites/RedirectPage.tsx` 通用组件，消除两个重定向页的重复代码（内联样式 + meta refresh + location.replace）。
- 建立 `components/projects.ts` 统一项目注册源，作为所有项目信息的单一数据源；`Navbar`、`Capabilities` 从此读取，消除散落多处的项目数据。

### 删除

- 删除 `app/(main)/demos/` 占位死代码（12 个假 demo 卡片，无实际内容，无入口链接）。
- 删除 `Navbar.tsx` 中的 tools mega-menu 死代码（`toolsMenuOpen` 永远为 false，整个 AnimatePresence 块和遮罩永远不渲染）及相关无用变量（`filteredTools`、`categories`、`categoriesZh`、`bgCard`）。

### 重构

- 统一 `cutscene_agent` 路径到 `projects/` 下：路由从 `app/cutscene_agent/` 移至 `app/projects/cutscene_agent/`，资源从 `public/cutscene_agent/` 移至 `public/projects/cutscene_agent/`。
- 在旧路径 `app/cutscene_agent/page.tsx` 用 `RedirectPage` 保留 `/cutscene_agent/` → `/projects/cutscene_agent/` 兼容重定向。
- 同步更新 `projects.ts`、`(main)/projects/page.tsx` 中的链接指向新路径。

## [1.0.0] — 2026-07-29

### 还原为可扩展的 Next.js 源工程

从 GitHub Pages 部署仓的编译产物还原为完整的 Next.js 源工程，源码与部署产物同仓共存。

### 新增

- `app/` App Router 源码：根 layout + `(main)` 路由组（首页/projects/demos）+ 三个项目站点路由 + 两个重定向路由 + not-found。
- `components/` 7 个 React 组件（Navbar/Hero/Team/Capabilities/Vision + ThemeProvider/LangProvider），删除 4 个未使用的死代码组件（Blog/Contact/Labs/Portfolio）。
- `public/` 34 个静态资源文件（`_shared/` 共享层 + 三个站点资源 + 根级资源）。
- 配置文件：`package.json`、`next.config.js`（output:export + trailingSlash）、`tsconfig.json`、`tailwind.config.js`、`postcss.config.js`。
- `scripts/sync-out.sh`：out/ 同步到根目录脚本。
- `docs/CODEBASE.md`、`AGENTS.md`：架构文档与项目规则。

### 修正

- 所有 `localhost:3004` 占位链接替换为真实路径（`/cutscene_agent/`、`github.com/Kuaishou-GameMind`）。

### 架构决策

- 路由组隔离：`(main)/` 承载主站（Tailwind/Provider），站点路由直接在 `app/` 下避免样式污染。
- 三个站点用 `dangerouslySetInnerHTML` + `next/script` 原生注入，不改站点内部 JS 逻辑。
- `output: 'export'` + `trailingSlash`，重定向用路由页 + meta refresh 实现。