# AGENTS.md — team-page 项目规则

> 本文件仅含本工程特有规则，全局规则见 `~/.config/opencode/AGENTS.md`。

## 工程信息

- 项目：快手游戏 GameMind Lab 团队主页（GitHub Pages 用户站点 `Kuaishou-GameMind.github.io`）
- 技术栈：Next.js 14（App Router + `output: 'export'`）+ TypeScript + Tailwind + framer-motion
- 部署分支：`main`（根目录直接被 Pages 服务）；开发分支：`dev/main-page`
- 代码架构入口：`docs/CODEBASE.md`（修改代码前必读）

## 构建命令

```bash
npm run dev      # 本地开发 localhost:3004
npm run build    # 静态导出到 out/
npm run preview  # 本地预览 out/（npx serve out）
```

改动后验证流程：`npm run build` → `npm run preview` 检查 → commit。push 到 `main` 分支后 GitHub Actions 自动部署。

## 改动守则

### 新增项目（标准流程）

1. 在 `components/projects.ts` 注册项目信息
2. 在 `app/projects/<slug>/page.tsx` 用 `SitePage` 组件创建路由页
3. 在 `public/projects/<slug>/` 放静态资源（CSS/JS/images）
4. 如需旧路径兼容，在 `app/(redirects)/<old-slug>/page.tsx` 用 `RedirectPage`

### 项目站点（原生 HTML/CSS/JS）

- 站点通过 `SitePage` 组件用 `dangerouslySetInnerHTML` 注入，外部 JS 用 `next/script` 加载。
- **不改站点内部 JS 逻辑**（i18n/AOS/counter/figures.js/CSV fetch）。
- 改站点内容：编辑 `app/projects/<site>/page.tsx` 的 `BODY_HTML` 常量，或编辑 `public/projects/<site>/` 下的 CSS/JS。
- 资源路径用绝对路径（`/projects/<site>/assets/...`、`/_shared/...`）。

### 主站（`(main)` 路由组）

- 首页组件在 `components/`，用 framer-motion + Tailwind。
- 全局样式在 `app/(main)/globals.css`（设计 tokens），`app/(main)/layout.tsx` 加载 Provider。
- 不要在站点路由里引入 Tailwind 或 Provider（会污染站点样式）。

### 静态导出限制

- `output: 'export'` 不支持 `redirects()`/`rewrites()`/动态路由。
- 重定向用 `RedirectPage` 组件实现（参考 `app/(redirects)/cutscene_agent/page.tsx`）。
- 所有页面必须是静态可预渲染的。