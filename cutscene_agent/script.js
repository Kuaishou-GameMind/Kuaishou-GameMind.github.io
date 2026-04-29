/* ============================================================
   Cutscene Agent — Homepage Script
   Features: i18n (EN/ZH), scroll animations, counter animation
   ============================================================ */

// ─────────────────────────────────────────────
// 1. BILINGUAL DATA
// ─────────────────────────────────────────────
const I18N = {
  en: {
    // Nav
    nav_contrib: "Contributions",
    nav_pipeline: "Pipeline",
    nav_videos: "Demos",
    nav_results: "Results",

    // Hero
    hero_badge: "Kuaishou GameMind Lab",
    hero_subtitle: "An LLM Agent Framework for Automated 3D Cutscene Generation",
    hero_desc: "Transform natural-language scripts into fully editable Unreal Engine cutscenes — with coordinated character animation, dialogue, and cinematography — in minutes, not weeks.",
    btn_paper: "Paper",
    btn_demos: "Video Demos",
    scroll_hint: "Scroll",

    // Abstract
    abstract_text: 'Cutscenes are indispensable components of modern video games, serving as the primary vehicle for narrative delivery and emotional engagement. However, cutscene production remains one of the most complex workflows in digital content creation. We present <strong>Cutscene Agent</strong>, an LLM agent framework that automates end-to-end cutscene generation — transforming natural-language scripts into industry-grade, editable Unreal Engine Level Sequences with coordinated character animation, cinematography, dialogue, and sound design.',

    // Contributions
    contrib_tag: "What We Built",
    contrib_title: "Key Contributions",
    contrib1_title: "Cutscene Toolkit",
    contrib1_desc: "A comprehensive MCP-based interface library for bidirectional LLM–Engine integration. Agents invoke engine operations and observe real-time scene state — enabling closed-loop generation of editable, engine-native cinematic assets.",
    contrib2_title: "Multi-Agent System",
    contrib2_desc: "A director agent orchestrates specialist subagents for animation, cinematography, and sound. A closed-loop visual reasoning mechanism enables agents to perceive rendered frames and iteratively refine camera composition and staging.",
    contrib3_title: "CutsceneBench",
    contrib3_desc: "The first benchmark targeting long-horizon, interdependent tool-use evaluation for cinematic generation. Each scenario requires coordinating dozens of dependent tool calls across a three-layer assessment — from tool-call correctness to structural integrity to final cinematic quality.",
    tag_char: "Character Mgmt",
    tag_cam: "Camera Templates",
    tag_query: "Asset Query",
    tag_percep: "Scene Perception",
    tag_delegate: "Subagent Delegation",
    tag_visual: "Visual Reasoning",
    tag_context: "Context Mgmt",
    tag_longhor: "Long-Horizon",
    tag_interdep: "Interdependent Tools",
    tag_judge: "LLM-as-Judge",
    tag_multi: "Multi-Dimensional",
    agent_director: "Director",
    agent_anim: "Animation",
    agent_cinema: "Camera",
    agent_sound: "Sound",
    agent_feedback: "Visual Feedback Loop",
    bench_l3: "Cinematic Quality",
    bench_l2: "Structural Integrity",
    bench_l1: "Tool-Use Correctness",
    bench_models: "LLMs",
    bench_scenarios: "Scenarios",
    bench_tiers: "Tiers",

    // Pipeline
    pipeline_tag: "System Architecture",
    pipeline_title: "How It Works",
    pipeline_sub: "A director agent interprets natural-language scripts via a prompt & context manager, delegates to specialist subagents (animation, camera, sound), and interacts bidirectionally with Unreal Engine 5 through an MCP-based cutscene toolkit — producing fully editable Level Sequences with a visual feedback loop for iterative refinement.",

    // Demos
    demos_tag: "Generated Results",
    demos_title: "Generated Cutscenes",
    demos_sub: "Each cutscene is generated end-to-end from the script shown. Characters, animations, dialogue, and camera work are all orchestrated by the agent.",
    demos_sub_video: "Input is a video — audio and character performance are extracted automatically via a video-understanding sub-agent",
    demos_sub_oneliner: "Input is a single sentence, expanded by the agent into a full cutscene",
    demos_sub_script: "Input is a full script — characters, animations, dialogue, and cinematography are all orchestrated by the agent",
    demos_sub_note: "The following demo videos are automatically generated using Opus 4.6 + Cutscene Agent. Characters shown are MetaHuman assets; lighting and rendering are done by artists.",
    script_label: "Input Script",
    type_video: "Video Replica",
    type_script: "Full Script",
    type_oneliner: "One-liner",
    ref_label: "Reference Video",
    ref_note: "Re-created from original video",
    video_coming: "Video Coming Soon",
    script_more: "+ more lines …",

      case1_title: "Bathhouse Dispute",
    case1_chars: "2 Characters",
    case1_turns: "4 Dialogue Turns",
    case1_l1: '"Halt. State your business, traveler. This road has been closed since the incident at the northern pass."',
    case1_d1: "[firm stance, hand raised]",
    case1_l2: '"I carry urgent supplies for the village beyond. People are counting on this delivery — surely there\'s a way through?"',
    case1_d2: "[pleading, steps forward]",
    case1_l3: '"I understand, but orders are orders. However… there is an old trail to the east. Dangerous, but passable."',
    case1_d3: "[conflicted, glances aside]",
    case1_l4: '"Thank you. I won\'t forget your kindness."',
    case1_d4: "[grateful nod, turns to leave]",

    case2_title: "Bar Encounter",
    case2_prompt: "Cooper and Gavin run into each other at a bar on Friday night. They have a lighthearted conversation, catching up on each other's work, warmly asking about each other's families, and finally deciding to grab a drink together to celebrate the weekend.",
    oneliner_label: "One-liner Input",
    case_lbf_title: "Let the Bullets Fly Recreation",
    case_cam_title: "Camera Control Example",
    case_cam_desc: "Artifacts generated by Cutscene Agent can be used as control conditions for video generation models, enabling more precise camera control.",

    case3_title: "The Godfather Recreation",
    case3_l1: '"Why did you go to the police? Why didn\'t you come to me first?"',
    case3_d1: "[calm, probing, seated in shadow]",
    case3_l2: '"What do you want of me? Tell me anything, but do what I beg you to do."',
    case3_d2: "[desperate, leaning forward]",
    case3_l3: '"That I cannot do."',
    case3_d3: "[quiet refusal, unmoved]",
    case3_l4: '"I\'ll give you anything you ask."',
    case3_d4: "[offers payment immediately, almost pleading]",

    case4_title: "Council of Three",
    case4_chars: "3 Characters",
    case4_turns: "10 Dialogue Turns",
    case4_l1: '"The scouts report movement beyond the ridge. We need a decision before dawn."',
    case4_d1: "[pacing, studying the map]",
    case4_l2: '"At least two hundred, sir. They\'ve set up camp near the river crossing."',
    case4_d2: "[breathless, just arrived]",
    case4_l3: '"A direct assault would be reckless. Perhaps we can use the tunnels to flank them."',
    case4_d3: "[calm, measured tone]",

    // Results
    results_tag: "Evaluation",
    results_title: "Benchmark Results",
    results_sub: "Several frontier LLMs evaluated across 65 scenarios on CutsceneBench's three-layer hierarchy",
    result_radar_title: "L1 & L2 Metrics",
    result_l3_col_title: "L3 Total Scores",
    result_l3_subtitle: "Narrative & Cinematic Quality — LLM-as-Judge on rendered video",
    results_ref_link: '<i class="fa-solid fa-arrow-right"></i> See paper for detailed per-metric breakdowns and analysis',

    // Results L3
    result_l3_title: "Layer 3: Narrative & Cinematic Quality (LLM-as-Judge)",
    eval_arrow_up: "Increasing evaluation complexity",

    // Footer
    cite_title: "Citation",
    footer_links_title: "Links",
    footer_paper: "Paper",
    footer_demos: "Video Demos",
  },

  zh: {
    // Nav
    nav_contrib: "核心贡献",
    nav_pipeline: "系统架构",
    nav_videos: "演示视频",
    nav_results: "评测结果",

    // Hero
    hero_badge: "快手 GameMind 实验室",
    hero_subtitle: "基于大语言模型Agent的端到端3D过场动画自动生成框架",
    hero_desc: "将自然语言剧本在数分钟内转化为完全可编辑的Unreal Engine过场动画 — 自动协调角色动画、对白、运镜和音效设计。",
    btn_paper: "论文",
    btn_demos: "演示视频",
    scroll_hint: "向下滚动",

    // Abstract
    abstract_text: '过场动画是现代电子游戏不可或缺的组成部分，是叙事传递和情感共鸣的核心载体。然而，过场动画制作仍是数字内容创作中最复杂的工作流程之一。我们提出 <strong>Cutscene Agent</strong>，一个由大语言模型Agent驱动的端到端过场动画生成框架 — 将自然语言剧本转化为工业级、可编辑的 Unreal Engine Level Sequence，自动协调角色动画、运镜、对白和音效设计。',

    // Contributions
    contrib_tag: "我们的成果",
    contrib_title: "核心贡献",
    contrib1_title: "Cutscene工具库",
    contrib1_desc: "基于MCP协议的全面引擎交互接口库，实现LLM Agent与游戏引擎的双向通信。Agent可调用引擎操作并实时观察场景状态，实现闭环生成可编辑的引擎原生影视资产。",
    contrib2_title: "多Agent协作系统",
    contrib2_desc: "导演Agent统一调度动画、运镜和音效等专业子Agent。闭环视觉推理机制使Agent能感知渲染画面，迭代优化相机构图和角色走位。",
    contrib3_title: "CutsceneBench 评测基准",
    contrib3_desc: "首个面向长程、相互依赖工具调用的影视生成评测基准。每个场景需要协调数十个相互依存的工具调用，通过三层评估体系 — 从工具调用正确性到结构完整性再到最终影视质量 — 进行全方位评测。",
    tag_char: "角色管理",
    tag_cam: "相机模板",
    tag_query: "资产查询",
    tag_percep: "场景感知",
    tag_delegate: "子Agent委派",
    tag_visual: "视觉推理",
    tag_context: "上下文管理",
    tag_longhor: "长程调用",
    tag_interdep: "工具依赖",
    tag_judge: "LLM评审",
    tag_multi: "多维评测",
    agent_director: "导演",
    agent_anim: "动画",
    agent_cinema: "运镜",
    agent_sound: "音效",
    agent_feedback: "视觉反馈循环",
    bench_l3: "影视质量",
    bench_l2: "结构完整性",
    bench_l1: "工具调用正确性",
    bench_models: "个大模型",
    bench_scenarios: "个测试场景",
    bench_tiers: "个复杂度层级",

    // Pipeline
    pipeline_tag: "系统架构",
    pipeline_title: "工作流程",
    pipeline_sub: "导演 Agent 通过提示词与上下文管理器解析自然语言剧本，将任务分配给动画、运镜、音效等专业子 Agent，并通过基于 MCP 协议的过场动画工具库与 Unreal Engine 5 进行双向交互 — 在视觉反馈循环下迭代优化，最终生成完全可编辑的 Level Sequence。",

    // Demos
    demos_tag: "生成结果",
    demos_title: "生成的过场动画",
    demos_sub: "每段过场动画均由Agent从左侧剧本端到端生成。角色、动画、对白和运镜全部由Agent自动协调完成。",
    demos_sub_video: "输入为一段视频，音频和角色表演通过视频理解 sub-agent 从原始视频自动提取",
    demos_sub_oneliner: "输入为一句话描述，由 Agent 自动展开为完整过场动画",
    demos_sub_script: "输入为完整剧本文本，角色、动画、对白和运镜全部由 Agent 协调完成",
    demos_sub_note: "以下示例视频使用 Opus 4.6 + Cutscene Agent 自动化生成，展示使用的角色来自 MetaHuman，灯光设计和渲染由艺术家完成。",
    script_label: "输入剧本",
    type_video: "视频复刻",
    type_script: "完整剧本",
    type_oneliner: "一句话输入",
    ref_label: "参考视频",
    ref_note: "从原始视频复刻生成",
    video_coming: "视频即将发布",
    script_more: "+ 更多台词 …",

      case1_title: "搓澡风波",
    case1_chars: "2个角色",
    case1_turns: "4轮对话",
    case1_l1: '"站住！说明来意，旅人。自从北关出事后，这条路就已经封闭了。"',
    case1_d1: "[态度坚定，举手示意]",
    case1_l2: '"我为远处村庄运送急需的物资。人们都在等着这批东西 — 一定有办法通过吧？"',
    case1_d2: "[恳求地上前一步]",
    case1_l3: '"我能理解，但命令就是命令。不过……东边有条古老的小径，虽然危险，但可以通行。"',
    case1_d3: "[面露犹豫，目光偏移]",
    case1_l4: '"谢谢你，我不会忘记你的善意。"',
    case1_d4: "[感激地点头，转身离开]",

    case2_title: "酒吧偶遇",
    case2_prompt: "Cooper和Gavin在周五晚上在酒吧偶遇，两人展开了一段轻松愉快的对话，他们谈论了各自最近的工作，并亲切问候了对方的家人，最后他们决定一块喝一杯庆祝周五。",
    oneliner_label: "一句话输入",
    case_lbf_title: "《让子弹飞》复刻",
    case_cam_title: "相机控制示例",
    case_cam_desc: "cutscene agent生成的产物可以作为视频生成模型的控制条件，从而获得更加精准的相机控制效果。",

    case3_title: "《教父》复刻",
    case3_l1: '"你为什么要去找警察？为什么不先来找我？"',
    case3_d1: "[语气平静，带着审视，坐在阴影中]",
    case3_l2: '"你想要我做什么？你尽管开口，但求你答应我的请求。"',
    case3_d2: "[神情绝望，身体前倾]",
    case3_l3: '"这我不能做。"',
    case3_d3: "[平静回绝，不为所动]",
    case3_l4: '"无论你要什么，我都愿意给。"',
    case3_d4: "[立刻提出报酬，几乎是在哀求]",

    case4_title: "三人会议",
    case4_chars: "3个角色",
    case4_turns: "10轮对话",
    case4_l1: '"斜候报告说山脊那边有动静。我们必须在天亮前做出决定。"',
    case4_d1: "[来回踱步，研究地图]",
    case4_l2: '"至少两百人，长官。他们在渡口附近扎了营。"',
    case4_d2: "[气喘吁吁，刚刚赶到]",
    case4_l3: '"正面强攻太冒险了。也许我们可以利用隧道从侧翼包抄。"',
    case4_d3: "[沉着冷静的语气]",

    // Results
    results_tag: "评测",
    results_title: "评测结果",
    results_sub: "多个前沿大语言模型在 CutsceneBench 三层层级评估下的65个场景评测",
    result_radar_title: "L1 & L2 指标",
    result_l3_col_title: "L3 总分",
    result_l3_subtitle: "叙事与影视质量 — 基于渲染视频的 LLM 评审",
    results_ref_link: '<i class="fa-solid fa-arrow-right"></i> 详细指标分解与分析请参阅论文',

    // Results L3
    result_l3_title: "L3 层：叙事与影视质量（LLM评审）",
    eval_arrow_up: "评估复杂度递增",

    // Footer
    cite_title: "引用",
    footer_links_title: "链接",
    footer_paper: "论文",
    footer_demos: "演示视频",
  }
};

// ─────────────────────────────────────────────
// 2. LANGUAGE SWITCH
// ─────────────────────────────────────────────
let currentLang = document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem('cs-agent-lang');
    if (saved && I18N[saved]) {
      return saved;
    }
  } catch (e) {}

  return currentLang;
}

function setLanguage(lang) {
  currentLang = lang;
  const data = I18N[lang];
  if (!data) return;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = data[key];
      } else {
        el.innerHTML = data[key];
      }
    }
  });

  // Update lang-btn active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Store preference
  try { localStorage.setItem('cs-agent-lang', lang); } catch(e) {}

  // Re-render interactive figures with new language
  if (typeof refreshFigures === 'function') refreshFigures();
}

currentLang = getInitialLanguage();
setLanguage(currentLang);

// ─────────────────────────────────────────────
// 3. NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 4. SCROLL ANIMATIONS (data-aos)
// ─────────────────────────────────────────────
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// 5. COUNTER ANIMATION
// ─────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, 0, target, 1200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(start + range * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// ─────────────────────────────────────────────
// 6. SMOOTH SCROLL FOR ANCHORS
// ─────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ─────────────────────────────────────────────
// 7. INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Language switch buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Re-apply the resolved language once the DOM is fully ready.
  setLanguage(currentLang);

  // Init features
  initNavbar();
  initAOS();
  initCounters();
  initSmoothScroll();
});
