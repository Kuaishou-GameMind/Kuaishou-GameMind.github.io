#!/usr/bin/env node
/**
 * 图片优化脚本（一次性运行，产物提交到仓库）
 *
 * 策略：
 * 1. 首页 timeline 卡片引用的图（80px 方块）→ 生成 160px WebP 缩略图（2x retina）
 * 2. 站点页大图（teaser/camera_templates/architecture/eval_*）→ 转 WebP，体积降 70-90%
 *
 * 运行：node scripts/optimize-images.mjs
 * 依赖：sharp（临时安装于 /tmp，通过 NODE_PATH 引入）
 */
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PUBLIC = resolve(ROOT, 'public')

// 确保 sharp 可用（临时安装在 /tmp/sharp-work）
const SHARP_DIR = '/tmp/sharp-work'
if (!existsSync(SHARP_DIR)) {
  execSync(`mkdir -p ${SHARP_DIR} && cd ${SHARP_DIR} && npm init -y && npm i sharp@0.33.5`, { stdio: 'inherit' })
}
const sharp = (await import(`${SHARP_DIR}/node_modules/sharp/lib/index.js`)).default

const THUMB_SIZE = 160          // 2x retina for 80px display
const WEBP_QUALITY = 82         // 质量/体积平衡点
const LARGE_WEBP_QUALITY = 80   // 大图略低

/** 生成首页缩略图（正方形裁切，160px，WebP） */
async function makeThumb(src, dest) {
  await sharp(src)
    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'center' })
    .webp({ quality: WEBP_QUALITY })
    .toFile(dest)
  const before = fileSize(src)
  const after = fileSize(dest)
  console.log(`  thumb: ${rel(src)} ${before} → ${rel(dest)} ${after}`)
}

/** 大图转 WebP（保留原尺寸，降质量） */
async function toWebP(src, dest) {
  await sharp(src)
    .webp({ quality: LARGE_WEBP_QUALITY, effort: 4 })
    .toFile(dest)
  const before = fileSize(src)
  const after = fileSize(dest)
  console.log(`  webp:  ${rel(src)} ${before} → ${rel(dest)} ${after}`)
}

function fileSize(p) {
  return formatKB(statSync(p).size)
}
function formatKB(bytes) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)}M`
    : `${(bytes / 1024).toFixed(0)}K`
}
function rel(p) { return p.replace(ROOT + '/', '') }

// ── 首页 timeline 缩略图（projects.ts 引用）──────────────────────
const thumbJobs = [
  // cutscene preview（仅首页用，原图可删，但保留以防回退）
  { src: 'public/project-preview.png', dest: 'public/project-preview-thumb.webp' },
  // trace_bench
  { src: 'public/projects/trace_bench/images/framework.png', dest: 'public/projects/trace_bench/images/framework-thumb.webp' },
  { src: 'public/projects/trace_bench/images/logo.png', dest: 'public/projects/trace_bench/images/logo-thumb.webp' },
  // arag_cli
  { src: 'public/projects/arag_cli/images/framework.png', dest: 'public/projects/arag_cli/images/framework-thumb.webp' },
  { src: 'public/projects/arag_cli/images/logo.png', dest: 'public/projects/arag_cli/images/logo-thumb.webp' },
]

// ── 站点页大图转 WebP ──────────────────────────────────────────
const webpJobs = [
  // cutscene（teaser 被 page.tsx 直接引用；其余大图虽当前未引用，一并转换备用）
  { src: 'public/projects/cutscene_agent/assets/teaser.png', dest: 'public/projects/cutscene_agent/assets/teaser.webp' },
  { src: 'public/projects/cutscene_agent/assets/camera_templates.png', dest: 'public/projects/cutscene_agent/assets/camera_templates.webp' },
  { src: 'public/projects/cutscene_agent/assets/architecture.png', dest: 'public/projects/cutscene_agent/assets/architecture.webp' },
  { src: 'public/projects/cutscene_agent/assets/eval_radar.png', dest: 'public/projects/cutscene_agent/assets/eval_radar.webp' },
  { src: 'public/projects/cutscene_agent/assets/eval_framework.png', dest: 'public/projects/cutscene_agent/assets/eval_framework.webp' },
  // trace_bench / arag_cli framework（站点页未直接引用 framework，但保留转换）
  { src: 'public/projects/trace_bench/images/framework.png', dest: 'public/projects/trace_bench/images/framework.webp' },
  { src: 'public/projects/arag_cli/images/framework.png', dest: 'public/projects/arag_cli/images/framework.webp' },
]

console.log('=== 生成首页缩略图（160px WebP）===')
for (const j of thumbJobs) {
  await makeThumb(resolve(ROOT, j.src), resolve(ROOT, j.dest))
}

console.log('=== 大图转 WebP ===')
for (const j of webpJobs) {
  await toWebP(resolve(ROOT, j.src), resolve(ROOT, j.dest))
}

console.log('\n完成。')