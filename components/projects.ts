import type { LucideIcon } from 'lucide-react'
import { Video, Sparkles, Brain } from 'lucide-react'

export type ProjectStatus = 'live' | 'coming-soon' | 'concept'

export interface Project {
  id: string
  slug: string
  nameZh: string
  nameEn: string
  shortDescZh: string
  shortDescEn: string
  titleZh: string
  titleEn: string
  subtitle: string
  subtitleDescZh: string
  subtitleDescEn: string
  descZh: string
  descEn: string
  tagsZh: string[]
  tagsEn: string[]
  icon: LucideIcon
  link: string
  github?: string
  status: ProjectStatus
  stat?: { value: string; labelZh: string; labelEn: string }
}

export const projects: Project[] = [
  {
    id: 'cutscene',
    slug: 'cutscene_agent',
    nameZh: 'Cutscene Engine',
    nameEn: 'Cutscene Engine',
    shortDescZh: 'WebGL 过场动画引擎',
    shortDescEn: 'WebGL cinematic engine',
    titleZh: 'Cutscene Agent for Unreal',
    titleEn: 'Cutscene Agent for Unreal',
    subtitle: 'AI CUTSCENE',
    subtitleDescZh: '一个让大模型通过自然语言直接操控 Unreal Engine Cutscene 的 Agent 工具。',
    subtitleDescEn: 'Natural-language driven cinematic creation for Unreal Engine.',
    descZh:
      '给大模型提供 UE 编辑器中的 Level Sequence、角色、镜头、动画与音频等能力库，附带完整的自由化操作 skills，使自然语言能够直接驱动 cutscene 的创建与调整。',
    descEn:
      'Provides large models with a capability library of Level Sequence, characters, cameras, animation, and audio inside the UE editor — complete with a full set of freestyle operation skills — enabling natural language to directly drive cutscene creation and editing.',
    tagsZh: ['UE5', 'Agent', 'Sequencer', 'Cutscene'],
    tagsEn: ['UE5', 'Agent', 'Sequencer', 'Cutscene'],
    icon: Video,
    link: '/projects/cutscene_agent/',
    github: 'https://github.com/Kuaishou-GameMind/cutscene_agent',
    status: 'live',
    stat: { value: 'MCP', labelZh: '一句话生成 3D 游戏的可消费剧情', labelEn: 'Generate consumable 3D game cinematics from a single prompt' },
  },
  {
    id: 'trace-bench',
    slug: 'trace_bench',
    nameZh: 'TRACE BENCH',
    nameEn: 'TRACE BENCH',
    shortDescZh: '角色扮演智能体评测基准',
    shortDescEn: 'Roleplay agentic evaluation benchmark',
    titleZh: 'TRACE BENCH',
    titleEn: 'TRACE BENCH',
    subtitle: 'EVALUATION',
    subtitleDescZh: '基于固定角色清单的自适应角色扮演评测框架。',
    subtitleDescEn: 'Adaptive roleplay evaluation with fixed role-derived checklists.',
    descZh:
      'TRACE BENCH 将每个角色档案转化为固定清单，通过自适应多轮对话验证，保留支持每个判断的对话证据。',
    descEn:
      'TRACE BENCH turns each role profile into a fixed checklist, then adaptively verifies it through natural multi-turn interaction with auditable evidence.',
    tagsZh: ['Evaluation', 'Roleplay', 'Checklist', 'Benchmark'],
    tagsEn: ['Evaluation', 'Roleplay', 'Checklist', 'Benchmark'],
    icon: Brain,
    link: '/projects/trace_bench/',
    github: 'https://github.com/KuaishouGameMind/TRACE-Bench',
    status: 'live',
  },
  {
    id: 'arag-cli',
    slug: 'arag_cli',
    nameZh: 'Arag CLI',
    nameEn: 'Arag CLI',
    shortDescZh: 'Agent 检索 CLI 工具',
    shortDescEn: 'Retrieval CLI tool for AI agents',
    titleZh: 'Arag CLI',
    titleEn: 'Arag CLI',
    subtitle: 'RETRIEVAL',
    subtitleDescZh: '为 AI Agent 提供本地知识库检索的命令行工具。',
    subtitleDescEn: 'A retrieval CLI tool that gives agents a fast way to search a local knowledge base.',
    descZh:
      '从本地文档构建知识库，用关键词、语义或混合检索返回结构化上下文，Agent 可直接读取并调用。',
    descEn:
      'Build a knowledge base from local documents. Retrieve with keywords, meaning, or both, and return structured evidence your agent can read and call directly.',
    tagsZh: ['RAG', 'CLI', 'BM25', 'Rust'],
    tagsEn: ['RAG', 'CLI', 'BM25', 'Rust'],
    icon: Sparkles,
    link: '/projects/arag_cli/',
    github: 'https://github.com/KuaishouGameMind/arag-cli',
    status: 'live',
  },
]

export const liveProjects = projects.filter(p => p.status === 'live')

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}