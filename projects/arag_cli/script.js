/* Arag CLI product copy and interactive operator console. */

const I18N = {
  en: {
    nav_start: 'Quickstart',
    nav_workflow: 'How it works',
    nav_integrate: 'Cloud API',
    nav_reference: 'Commands',
    hero_eyebrow: 'Open-source retrieval CLI tool for AI agents',
    hero_title: 'Give your agent a <span>fast way to search</span> a local knowledge base.',
    hero_lead:
      'Build a knowledge base from local documents. Retrieve with keywords, meaning, or both, and return structured evidence your agent can read and call directly.',
    hero_demo: 'See a real run',
    hero_docs: 'Read the docs',
    copied: 'Command copied.',
    copy_failed: 'Select the command and copy it manually.',
    demo_kicker: 'REAL CLI RUN · BM25-ONLY',
    demo_title: 'Watch the retrieval loop complete.',
    demo_desc:
      "These outputs come from the released macOS arm64 binary against the repository's own Rust and Python fixtures. No embedding API was configured.",
    demo_build: 'Build index',
    demo_build_note: '2 source files',
    demo_search: 'Search',
    demo_search_note: '2ms reported',
    demo_read: 'Read evidence',
    demo_read_note: 'source attached',
    demo_inspect: 'Inspect',
    demo_inspect_note: 'index state',
    fact_process: 'END-TO-END PROCESS',
    fact_process_note: 'local process time for search',
    fact_search: 'INTERNAL SEARCH',
    fact_search_note: 'reported by Arag CLI',
    fact_context: 'CONTEXT RETURNED',
    fact_context_note: 'retrieved tokens',
    fact_disclaimer:
      'Local smoke test on 2 fixture chunks; this verifies the workflow, not production-scale throughput.',
    start_title: 'Build and search your first knowledge base in three commands.',
    start_desc:
      'Start with exact keyword retrieval and no external services. Add embeddings only when your workflow needs semantic or hybrid search.',
    start_install: 'Install the binary',
    start_install_desc: 'Use the latest release for your platform.',
    start_index: 'Build a local knowledge base',
    start_index_desc: 'Markdown, text and CSV are read natively.',
    start_search: 'Let the agent search the knowledge base',
    start_search_desc: 'Get ranked chunks, snippets and metadata as JSON.',
    workflow_title: 'A retrieval layer, not another chat interface.',
    flow_index: 'Bring the files you already have.',
    flow_index_desc:
      'Read Markdown, text and CSV directly. Convert PDF, Office, HTML, images and audio through MarkItDown.',
    flow_structure: 'Keep meaningful units intact.',
    flow_structure_desc:
      'Heading chains travel with each chunk. Tables and code blocks stay atomic instead of breaking mid-structure.',
    flow_retrieve: 'Choose the right retrieval cost.',
    flow_retrieve_desc:
      'Use local BM25 for exact signals, embeddings for meaning, or RRF hybrid fusion for both.',
    flow_act: 'Return an explicit next step.',
    flow_act_desc:
      'Stable chunk IDs, source metadata and JSON output let an agent inspect evidence before it answers.',
    modes_title: 'One tool. Three ways to find context.',
    modes_desc:
      'Start local and deterministic. Upgrade the retrieval path without changing the interface your agent calls.',
    mode_bm25: 'Fast exact-term retrieval',
    mode_bm25_desc: 'Multi-keyword scoring and snippets with no model, network or API key.',
    mode_local: 'LOCAL',
    mode_vector: 'Semantic retrieval by meaning',
    mode_vector_desc:
      'Connect an OpenAI-compatible embedding endpoint when exact words are not enough.',
    mode_optional: 'OPTIONAL API',
    mode_hybrid: 'Hybrid recall with fused ranking',
    mode_hybrid_desc:
      'Combine lexical and semantic rankings, then apply adaptive personalized scoring.',
    mode_fused: 'FUSED',
    baseline_search: 'PROJECT-REPORTED KEYWORD SEARCH',
    baseline_binary: 'PROJECT-REPORTED BINARY SIZE',
    baseline_memory: 'PROJECT-REPORTED MEMORY',
    baseline_note:
      'Published project baseline versus the original Python implementation. See the repository for benchmark details.',
    api_title: 'Expose Arag CLI as a shared retrieval API.',
    api_desc:
      'The FastAPI service validates requests, invokes Arag CLI as an async subprocess, and returns one response format over HTTP. Agents can query the index mounted by the service without maintaining a local copy.',
    api_local_agent: 'Local Agent A',
    api_local_agent_b: 'Local Agent B',
    api_server_agent: 'Server Agent',
    api_service_title: 'HTTP wrapper for Arag CLI',
    api_volume: 'persistent volume',
    api_index_title: 'Shared index',
    api_index_note: 'index and retrieval state',
    api_benefit_share: 'One mounted data directory',
    api_benefit_share_desc:
      'Agents query the same index, cache, history, notes and pins through the service.',
    api_benefit_state: 'Validated request and response',
    api_benefit_state_desc:
      'Pydantic models validate input. Every endpoint returns code, data, text, message and request_id.',
    api_benefit_observe: 'Request-level records',
    api_benefit_observe_desc:
      'JSONL logs record request IDs, endpoint latency and results. Timeouts and CLI errors map to 408 and 503.',
    api_deploy_kicker: 'DEPLOY THE SERVICE',
    api_deploy_title: 'Start on :8080',
    api_deploy_note:
      'Mount an existing Arag data directory. The service uses its index and retrieval state.',
    api_endpoints: 'REST SURFACE',
    api_group_retrieve: 'RETRIEVE',
    api_group_memory: 'MEMORY',
    api_group_operate: 'OPERATE',
    api_security:
      'Security boundary: the API does not provide authentication. Keep it on a trusted network, or add TLS and an authenticated API gateway before public access.',
    contract_title: 'Stable interfaces with explicit parameters.',
    contract_desc:
      'Arag CLI defines parameter schemas, structured results and diagnostic states for its retrieval commands. Agents can call them through CLI, Agent Skill or REST API.',
    contract_schema: 'Machine-readable parameter schemas',
    contract_errors: 'Structured results and explicit error codes',
    contract_context: 'CLI, Agent Skill and REST API references',
    operate_title: 'Everything around retrieval is already in the box.',
    operate_desc:
      'Keep indexes current, isolate projects, inspect usage and diagnose failures without stitching together another toolchain.',
    table_job: 'JOB',
    table_command: 'COMMANDS',
    table_result: 'WHAT YOUR AGENT GETS',
    job_index: 'Index lifecycle',
    job_index_result: 'Incremental refresh and observable index state',
    job_kb: 'Knowledge bases',
    job_kb_result: 'Isolated context for each project or domain',
    job_memory: 'Retrieval memory',
    job_memory_result: 'Reuse, annotations, hot chunks and blind spots',
    job_health: 'Diagnostics',
    job_health_result: 'Runtime status, configuration and interface schemas',
    cta_kicker: 'Your documents are ready. Give your agent a way in.',
    cta_title: 'Install Arag CLI and search locally first.',
    cta_install: 'Get the latest release',
    footer_lineage:
      'Built on the original arag project and the A-RAG hierarchical retrieval paper.',
  },
  zh: {
    nav_start: '快速开始',
    nav_workflow: '工作原理',
    nav_integrate: '云端 API',
    nav_reference: '命令',
    hero_eyebrow: '面向 AI Agent 的开源检索 CLI 工具',
    hero_title: '让 Agent <span>快速检索</span>本地知识库',
    hero_lead:
      '从本地文档构建知识库，通过关键词、语义或混合检索返回结构化证据，供 Agent 直接读取和调用。',
    hero_demo: '看运行演示',
    hero_docs: '阅读文档',
    copied: '命令已复制。',
    copy_failed: '请手动选择并复制命令。',
    demo_kicker: '真实 CLI 运行 · 仅 BM25',
    demo_title: '看一整轮检索跑完。',
    demo_desc:
      '以下输出来自正式发布的 macOS arm64 二进制，跑在仓库自带的 Rust / Python fixture 上，全程未配置 Embedding API。',
    demo_build: '构建索引',
    demo_build_note: '2 个源文件',
    demo_search: '执行检索',
    demo_search_note: '本地冒烟测试报告 2ms',
    demo_read: '读取证据',
    demo_read_note: '附带来源',
    demo_inspect: '检查索引',
    demo_inspect_note: '索引状态',
    fact_process: '端到端耗时',
    fact_process_note: '本地搜索耗时',
    fact_search: '内部检索',
    fact_search_note: '本地测试中由 Arag CLI 报告',
    fact_context: '返回上下文',
    fact_context_note: '检索 token 数',
    fact_disclaimer:
      '本地冒烟测试仅 2 个 fixture Chunk，用于验证工作流，不代表生产环境的吞吐能力。',
    start_title: '三行命令，构建并检索第一个知识库。',
    start_desc:
      '先从无需外部服务的精确关键词检索开始；只有当工作流需要语义或混合检索时，再接入 Embedding。',
    start_install: '安装可执行文件',
    start_install_desc: '下载适用于当前平台的最新 Release。',
    start_index: '构建本地知识库',
    start_index_desc: '原生读取 Markdown、文本和 CSV。',
    start_search: '让 Agent 检索知识库',
    start_search_desc: '以 JSON 获取排序 Chunk、摘要与来源信息。',
    workflow_title: '将本地文档转换为 Agent 可读取的检索结果。',
    flow_index: '读取本地文档。',
    flow_index_desc:
      '原生读取 Markdown、文本与 CSV；通过 MarkItDown 转换 PDF、Office、HTML、图片和音频。',
    flow_structure: '按内容结构切分 Chunk。',
    flow_structure_desc: '保留标题层级；表格和代码块作为完整单元处理。',
    flow_retrieve: '选择检索方式。',
    flow_retrieve_desc:
      '使用 BM25 进行关键词检索，使用 Embedding 进行语义检索，或通过 RRF 融合两组结果。',
    flow_act: '返回结构化证据。',
    flow_act_desc: '结果包含稳定的 Chunk ID、来源元数据和 JSON 输出，Agent 可在回答前读取原文。',
    modes_title: '一个工具，三种上下文检索方式。',
    modes_desc: '从本地确定性检索起步，按需升级，无需修改 Agent 的调用接口。',
    mode_bm25: '快速精确关键词检索',
    mode_bm25_desc: '多关键词评分与摘要提取，不需要模型、网络或 API Key。',
    mode_local: '本地',
    mode_vector: '基于语义的向量检索',
    mode_vector_desc: '当精确词不足以表达意图时，接入兼容 OpenAI 的 Embedding 服务。',
    mode_optional: '可选 API',
    mode_hybrid: '融合排序的混合召回',
    mode_hybrid_desc: '融合词法与语义排名，并叠加自适应个性化评分。',
    mode_fused: '融合',
    baseline_search: '项目报告的关键词检索基线',
    baseline_binary: '项目报告的可执行文件大小',
    baseline_memory: '项目报告的内存占用',
    baseline_note: '项目报告的 Rust 版本与原始 Python 实现对比基线，测试细节请查看仓库。',
    api_title: '将 Arag CLI 部署为共享检索 API。',
    api_desc:
      'FastAPI 负责校验请求，通过异步子进程调用 Arag CLI，并以统一格式返回结果。多个 Agent 可通过 HTTP 访问服务挂载的索引，无需分别维护本地副本。',
    api_local_agent: '本地 Agent A',
    api_local_agent_b: '本地 Agent B',
    api_server_agent: '服务器 Agent',
    api_service_title: 'Arag CLI 的 HTTP 封装',
    api_volume: '持久化数据卷',
    api_index_title: '共享索引',
    api_index_note: '索引与检索状态',
    api_benefit_share: '挂载同一数据目录',
    api_benefit_share_desc: '多个 Agent 通过服务访问同一份索引、缓存、检索历史、笔记与 Pin。',
    api_benefit_state: '校验请求，统一响应',
    api_benefit_state_desc:
      'Pydantic 校验输入；所有端点统一返回 code、data、text、message 与 request_id。',
    api_benefit_observe: '记录每次 API 调用',
    api_benefit_observe_desc:
      'JSONL 日志记录 Request ID、接口耗时与执行结果；超时和 CLI 错误分别返回 408 与 503。',
    api_deploy_kicker: '部署共享服务',
    api_deploy_title: '在 :8080 启动',
    api_deploy_note: '挂载已有的 Arag 数据目录，服务将使用其中的索引与检索状态。',
    api_endpoints: 'REST 接口一览',
    api_group_retrieve: '检索',
    api_group_memory: '记忆',
    api_group_operate: '运维',
    api_security:
      '安全边界：当前 API 不提供鉴权。建议仅在可信网络中运行；如需公网访问，请在前面配置 TLS 和带身份校验的 API 网关。',
    contract_title: '为 Agent 提供稳定的接口与参数说明。',
    contract_desc:
      'Arag CLI 为检索命令定义参数 Schema、结构化返回结果和诊断状态。Agent 可通过 CLI、Agent Skill 或 REST API 调用。',
    contract_schema: '机器可读的参数 Schema',
    contract_errors: '结构化结果与明确的错误码',
    contract_context: 'CLI、Agent Skill 与 REST API 接口说明',
    operate_title: '管理索引、知识库与检索状态。',
    operate_desc: '构建和更新索引，切换相互隔离的知识库，查看检索记录，并检查配置与运行状态。',
    table_job: '能力',
    table_command: '命令',
    table_result: '命令作用',
    job_index: '索引管理',
    job_index_result: '构建或增量更新索引，后台监听文件变化，并检查索引状态',
    job_kb: '知识库隔离',
    job_kb_result: '创建、切换和管理相互隔离的知识库',
    job_memory: '检索记录与反馈',
    job_memory_result: '管理缓存、历史、笔记与 Pin，并分析热门 Chunk 和知识盲区',
    job_health: '配置与诊断',
    job_health_result: '检查运行状态、索引质量、配置和 Tool Schema',
    cta_kicker: '文档已就绪，给 Agent 一个入口吧。',
    cta_title: '安装 Arag CLI，先从本地检索开始。',
    cta_install: '获取最新 Release',
    footer_lineage: '基于原始 arag 工程与 A-RAG 分层检索论文构建。',
  },
};

const INSTALL_COMMANDS = {
  unix: 'curl -sSL https://github.com/KuaishouGameMind/arag-cli/releases/latest/download/install.sh | bash',
  windows:
    'Invoke-WebRequest -Uri https://github.com/KuaishouGameMind/arag-cli/releases/latest/download/install.bat -OutFile install.bat\n.\\install.bat',
};

const API_COMMANDS = {
  docker:
    'docker build -f api/Dockerfile -t arag-api .\ndocker run --rm -p 8080:8080 \\\n  -v /srv/arag:/root/.arag \\\n  -e ARAG_INDEX_DIR=/root/.arag/index \\\n  arag-api',
  local: 'cd api && pip install -r requirements.txt\nARAG_INDEX_DIR="$HOME/.arag/index" ./start.sh',
};

function initInstallSwitch() {
  const buttons = document.querySelectorAll('[data-install]');
  const code = document.querySelector('[data-install-code]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      code.textContent = INSTALL_COMMANDS[button.dataset.install];
    });
  });
}

function initDemo() {
  const buttons = document.querySelectorAll('[data-demo]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-demo-panel]').forEach((panel) => {
        const active = panel.dataset.demoPanel === button.dataset.demo;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
      });
    });
  });
}

function initApiDeploy() {
  const buttons = document.querySelectorAll('[data-api-deploy]');
  const code = document.querySelector('[data-api-command]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      code.textContent = API_COMMANDS[button.dataset.apiDeploy];
    });
  });
}

async function copyInstallCommand() {
  const code = document.querySelector('[data-install-code]').textContent;
  const feedback = document.querySelector('[data-copy-feedback]');
  try {
    await navigator.clipboard.writeText(code);
    feedback.textContent = I18N[window.getCurrentLang()].copied;
  } catch {
    feedback.textContent = I18N[window.getCurrentLang()].copy_failed;
  }
}

async function copyApiCommand() {
  const code = document.querySelector('[data-api-command]').textContent;
  const feedback = document.querySelector('[data-api-feedback]');
  try {
    await navigator.clipboard.writeText(code);
    feedback.textContent = I18N[window.getCurrentLang()].copied;
  } catch {
    feedback.textContent = I18N[window.getCurrentLang()].copy_failed;
  }
}

window.initSite({
  storageKey: 'arag-cli-lang',
  i18n: I18N,
});

document.addEventListener('DOMContentLoaded', () => {
  initInstallSwitch();
  initDemo();
  initApiDeploy();
  document.querySelector('[data-copy-install]').addEventListener('click', copyInstallCommand);
  document.querySelector('[data-copy-api]').addEventListener('click', copyApiCommand);
});
