/* ============================================================
   Kuairp Tech Report — intro page script
   Provides: bilingual copy (data-i18n), theme toggle synced with
   the main site (localStorage 'theme'), mobile menu, mouse-follow
   ambient glow. i18n / navbar / data-aos / counters are driven by
   _shared/ui.js via initSite().
   ============================================================ */

/* ---- Apply stored theme as early as possible to avoid flash ---- */
(function () {
  try {
    var t = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

const I18N = {
  en: {
    /* Nav */
    nav_goals: 'Features',
    nav_innov: 'Core Innovations',
    nav_results: 'Results',

    /* Hero */
    hero_badge_meta: 'Technical Report · Aug 2026',
    hero_title_sub: 'Role-Play Models Technical Report',
    hero_affil: 'Kuaishou GameMind Lab',
    hero_desc:
      'A complete technical recipe for the Kuairp series of role-play models — from a standardized role template and an SFT data pipeline, through reinforcement learning, to two-stage On-Policy Distillation with the original Cumulative-Divergence Decay (CDD).',
    hero_btn_paper: 'Read Report',
    hero_btn_innov: 'Explore Innovations',
    scroll_hint: 'Scroll',

    /* Goals */
    goals_eyebrow: 'Model Features',
    goals_title: 'Role-play tailored to game scenarios',
    goals_sub:
      'A small dedicated model embeds role-play ability and domain world knowledge while preserving general tool-calling, to support diverse in-game play.',
    goal1_title: 'Small & Efficient',
    goal1_desc:
      'Deployable on a single 24GB GPU with low inference latency, meeting the cost-efficiency requirements of production environments.',
    goal2_title: 'Prompt-Engineering Friendly',
    goal2_desc:
      'The model follows role settings faithfully without carefully tuning prompt structure or wording, achieving high-fidelity role-play out of the box.',
    goal3_title: 'Built-in World Knowledge',
    goal3_desc:
      'Domain world knowledge is internalized into model parameters, enabling vivid role-play within the setting without relying on an external knowledge base.',
    goal4_title: 'General Tool-Calling Ability',
    goal4_desc:
      "Retains the base model's general tool-calling ability, supporting diverse in-game play — not just chat.",

    /* Innovations section header */
    innov_eyebrow: 'Core Innovations',
    innov_title: 'Three Core Innovations',
    innov_sub:
      'From the SFT data pipeline and reinforcement learning to two-stage OPD on-policy distillation — with CDD at its core.',

    /* Method — SFT */
    m_sft_num: 'INNOVATION 01',
    m_sft_name: 'High-Quality SFT Data Synthesis Pipeline',
    m_sft_feat1_title: 'Instruction-injected user behavior',
    m_sft_feat1_desc:
      'A temporary system message injected right before each user turn precisely controls behavior (uncooperative, topic-switching, typos, probing history/profile/world knowledge, tool calls, risk attacks) — distilling profile-following while organically weaving world knowledge into the data.',
    m_sft_feat2_title: 'Reverse Profile Filtering (RPF)',
    m_sft_feat2_desc:
      'Each profile item is checked for semantic association with character replies; items never demonstrated in the whole dialogue are removed as noise. The surviving "profile → reply" mapping is purer, and different dialogues trigger different item subsets, naturally enriching diversity.',
    m_sft_feat3_title: 'Turn-count stratified sampling',
    m_sft_feat3_desc:
      'Instead of only 15-turn dialogues, simulated turns are split into gradients (5/10/15/20/25 × 4 groups) at roughly equal token cost, ensuring coverage across all turn-length ranges and fixing long-dialogue degradation.',

    /* Method — RL */
    m_rl_num: 'INNOVATION 02',
    innov2_name: 'Domain-Adaptation Training That Preserves General Ability',

    /* Method — OPD */
    m_opd_num: 'INNOVATION 03',
    m_opd_name: 'OPD Gradient-Noise Suppression: CDD',
    /* Pipeline diagram (innovation 02) */
    pipe_p1_tag: 'PHASE 1',
    pipe_p1: 'Domain Expert Training',
    pipe_p2_tag: 'PHASE 2',
    pipe_p2: 'OPD Alignment & Fusion',
    pipe_gm: 'General Model',
    pipe_sft: 'SFT',
    pipe_rl: 'RL',
    pipe_de: 'Domain Expert',
    pipe_opd1: 'OPD-stage1',
    pipe_opd2: 'OPD-stage2',
    pipe_fde: 'Expert with<br/>General Ability',
    m_opd_stage1_title: 'OPD Stage 1: inject format & style into the general model',
    m_opd_stage1_desc:
      'On the full dataset, the gentle K1/PG intervention quickly teaches the base model the teacher’s format and dialogue style with minimal shock to general ability.',
    m_opd_stage2_title: 'OPD Stage 2: inject world knowledge into the general model',
    m_opd_stage2_desc:
      'Switch to GKD on a world-knowledge subset only. The focused signal injects domain knowledge efficiently while general data stays out of the gradient, preserving general ability.',
    m_opd_cdd_btn: 'Dive into CDD',

    /* CDD deep-dive */
    cdd_title: 'Cumulative-Divergence Decay (CDD)',
    cdd_mech_label: 'The mechanism',
    /* CDD mechanism animation */
    cdd_prompt: 'Prompt',
    cdd_student: 'Student',
    cdd_teacher: 'Teacher',
    cdd_update: 'Update',
    cdd_anim_note:
      '<code>di</code>: the student-teacher divergence for token i<br/>' +
      '<code>ci</code>: the student-teacher divergence for token i<br/>' +
      '<code>wi</code>: the loss weight for token i<br/>' +
      '<code>li</code>: the weighted loss for token i<br/>' +
      'All <code>li</code> are summed to update the Student.',

    /* Results */
    res_eyebrow: 'Evaluation Results',
    res_title: 'Domain ability peaks, general ability preserved',
    axis_char: 'Char-Consist.',
    axis_mem: 'Memory',
    axis_div: 'Diversity',
    axis_lang: 'LangQuality',
    axis_len: 'Length',
    axis_know: 'World Knowledge<sup class="fn-mark">‡</sup>',
    axis_tool: 'Tool Calling<sup class="fn-mark">*‡</sup>',
    chart_footnote_bfcl:
      '* We use the single_turn subset of BFCL v4 to evaluate the model’s tool-calling ability.',
    chart_footnote_kuairp:
      '† Kuairp 1.0 corresponds to the qwen3-8b-sft-grpo-opds2-cdd model in our technical report.',
    chart_footnote_m2her: '‡ M2-HER lacks domain world knowledge and tool-calling ability, so it was not evaluated on world knowledge or BFCL.',
    chart_footnote_more: 'More comparison data is available in our technical report.',
    res_point1_title: 'Domain role-play ability greatly improved',
    res_point1_desc:
      'Character consistency 85.14 → 92.08 and memory consistency 60.00 → 72.50 — both above baseline and ahead of M2-HER.',
    res_point2_title: 'Domain world knowledge internalized',
    res_point2_desc:
      'World-knowledge QA jumps from 1.90 (baseline) to 32.86 — domain knowledge is genuinely embedded in the model.',
    res_point3_title: 'General tool-calling ability preserved',
    res_point3_desc: 'BFCL v4 stays at 24.83 → 24.78, on par with the baseline.',

    /* Footer */
    footer_tagline: 'Kuaishou GameMind Lab — AI × Gaming',
    footer_link_home: 'Back to Home',
    footer_link_paper: 'Read Report',
    footer_copy: '© 2026 Kuaishou GameMind Lab',
  },

  zh: {
    /* Nav */
    nav_goals: '模型特色',
    nav_innov: '核心创新',
    nav_results: '评估结果',

    /* Hero */
    hero_badge_meta: '技术报告 · 2026 年 8 月',
    hero_title_sub: '角色扮演模型技术报告',
    hero_affil: '快手 GameMind Lab',
    hero_desc:
      'Kuairp 系列角色扮演模型的完整技术方案——从标准化人设模板、SFT 数据管线，到强化学习，以及以累积分歧衰减（CDD）为核心的两阶段 OPD 在线蒸馏。',
    hero_btn_paper: '阅读报告',
    hero_btn_innov: '探索核心创新',
    scroll_hint: '向下滚动',

    /* Goals */
    goals_eyebrow: '模型特色',
    goals_title: '适配游戏场景下的角色扮演需求',
    goals_sub:
      '在小体积模型中内建角色扮演能力和领域世界观知识的同时，兼顾通用的工具调用能力，以支持游戏内多样化的玩法。',
    goal1_title: '小尺寸、高效率',
    goal1_desc:
      '模型可在单张 24GB 显卡上部署，具备低推理延迟，满足生产环境的成本效益要求。',
    goal2_title: '提示词工程友好',
    goal2_desc:
      '无需精心调整 prompt 的结构和措辞，模型即可稳定遵循角色设定，开箱即用地实现高保真角色扮演。',
    goal3_title: '内建领域世界观知识',
    goal3_desc:
      '将相关世界观知识内化于模型参数中，无需依赖外部知识库即可在该设定下进行逼真的角色扮演。',
    goal4_title: '通用工具调用能力',
    goal4_desc:
      '保留基座模型的通用工具调用能力，以支持游戏内的多样化的玩法，而不仅仅是聊天对话。',

    /* Innovations section header */
    innov_eyebrow: '核心创新',
    innov_title: '三大核心创新',
    innov_sub:
      '从 SFT 数据管线、强化学习，到以 CDD 为核心的两阶段 OPD 在线蒸馏。',

    /* Method — SFT */
    m_sft_num: '创新 01',
    m_sft_name: '高质量SFT数据合成管线',
    m_sft_feat1_title: '基于指令注入的用户行为模拟',
    m_sft_feat1_desc:
      '在每个用户轮次生成前临时注入一条 system message，精准控制用户行为（不配合、开启新话题、打错字、针对历史/人设/世界观提问、调用工具、风险攻击等），在自然对话中高效蒸馏人设遵循能力，并有机地把世界观知识融入训练数据。',
    m_sft_feat2_title: '人设反向过滤（RPF）',
    m_sft_feat2_desc:
      '对每条蒸馏数据，将人设模板中的每个条目与角色回复做语义关联检测，移除全程从未被任何回复体现的"无效条目"。保留下来的"人设 → 回复"映射更纯粹精准；不同对话触发不同子集，过滤后数据天然具备更高的人设组合多样性。',
    m_sft_feat3_title: '对话轮次数分层采样',
    m_sft_feat3_desc:
      '不再只模拟 15 轮对话，而是在总 token 大致持平的前提下把轮次拆成多个梯度（5/10/15/20/25 轮 × 4 组），确保训练数据在所有轮次长度区间充分分布，有效缓解长轮次对话劣化。',

    /* Method — RL */
    m_rl_num: '创新 02',
    innov2_name: '保持通用能力的领域适配训练管线',

    /* Method — OPD */
    m_opd_num: '创新 03',
    m_opd_name: 'OPD梯度噪声抑制机制：CDD',
    /* Pipeline diagram (innovation 02) */
    pipe_p1_tag: '阶段一',
    pipe_p1: '领域专家训练',
    pipe_p2_tag: '阶段二',
    pipe_p2: 'OPD 对齐融合',
    pipe_gm: '通用模型',
    pipe_sft: 'SFT',
    pipe_rl: 'RL',
    pipe_de: '领域专家',
    pipe_opd1: 'OPD-stage1',
    pipe_opd2: 'OPD-stage2',
    pipe_fde: '具备通用能力的<br/>领域专家',
    m_opd_stage1_title: 'OPD Stage 1：向通用模型注入<strong>格式</strong>与<strong>风格</strong>',
    m_opd_stage1_desc:
      '在完整数据集上使用温和的 K1/PG 干预，让基座模型快速习得教师的格式规范与对话风格，对通用能力冲击较小。',
    m_opd_stage2_title: 'OPD Stage 2：向通用模型注入<strong>世界观知识</strong>',
    m_opd_stage2_desc:
      '切换到 GKD，仅在世界观相关子集上训练。蒸馏信号高度聚焦，世界观知识被高效注入；通用数据不参与梯度更新，通用能力得以保全。',
    m_opd_cdd_btn: '深入 CDD 机制',

    /* CDD deep-dive */
    cdd_title: '累积分歧衰减（CDD）',
    cdd_mech_label: '机制',
    /* CDD mechanism animation */
    cdd_prompt: '提示',
    cdd_student: '学生模型',
    cdd_teacher: '教师模型',
    cdd_update: '更新',
    cdd_anim_note:
      '<code>di</code>：第 i 个 token 对应的学生-教师分歧<br/>' +
      '<code>ci</code>：第 i 个 token 对应的学生-教师累计分歧<br/>' +
      '<code>wi</code>：第 i 个 token 对应的 loss 权重<br/>' +
      '<code>li</code>：第 i 个 token 对应的加权之后的 loss<br/>' +
      '全部 <code>li</code> 求和后用于更新学生模型。',

    /* Results */
    res_eyebrow: '评估结果',
    res_title: '领域能力登顶，通用能力保全',
    axis_char: '角色一致性',
    axis_mem: '记忆一致性',
    axis_div: '多样性',
    axis_lang: '语言质量',
    axis_len: '长度',
    axis_know: '世界观知识<sup class="fn-mark">‡</sup>',
    axis_tool: '工具调用<sup class="fn-mark">*‡</sup>',
    chart_footnote_bfcl: '* 我们使用 BFCL V4 的 single_turn 子集来评估模型的工具调用能力。',
    chart_footnote_kuairp: '† Kuairp 1.0 对应我们技术报告中的 qwen3-8b-sft-grpo-opds2-cdd 模型。',
    chart_footnote_m2her: '‡ M2-HER 不具备领域世界观知识和工具调用能力，因此未参与世界观知识与 BFCL 的评价。',
    chart_footnote_more: '更多对比数据请阅读我们的技术报告。',
    res_point1_title: '领域角色扮演能力大幅提升',
    res_point1_desc: '角色一致性 85.14 → 92.08，短期记忆一致性 60.00 → 72.50，均超越基线并领先 M2-HER。',
    res_point2_title: '内置领域世界观知识',
    res_point2_desc: '领域世界观知识问答从 1.90（基座）跃升至 32.86，领域知识真正内化于模型。',
    res_point3_title: '通用工具调用能力保留',
    res_point3_desc: 'BFCL v4 得分 24.83 → 24.78，与基座基本持平。',

    /* Footer */
    footer_tagline: '快手 GameMind Lab — AI × 游戏',
    footer_link_home: '返回主页',
    footer_link_paper: '阅读报告',
    footer_copy: '© 2026 快手 GameMind Lab',
  },
};

/* ---- Theme toggle (synced with main site via localStorage 'theme') ---- */
function initTheme() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}

/* ---- Mobile menu ---- */
function initMobileMenu() {
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;
  burger.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); });
  });
}

/* ---- Mouse-follow ambient glow (homepage signature) ---- */
function initMouseGlow() {
  var targets = document.querySelectorAll('.glow--mouse');
  if (!targets.length) return;
  window.addEventListener('mousemove', function (e) {
    var x = (e.clientX / window.innerWidth) * 100;
    var y = (e.clientY / window.innerHeight) * 100;
    targets.forEach(function (el) {
      var sec = el.closest('.section') || el.parentElement;
      var r = sec.getBoundingClientRect();
      var lx = ((e.clientX - r.left) / r.width) * 100;
      var ly = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--mx', lx + '%');
      el.style.setProperty('--my', ly + '%');
    });
  }, { passive: true });
}

/* ---- CDD mechanism animation (timeline-driven) ----
   Loop (9s):
   Phase A (0 → 3.6s): T1/d1/c1/w1 appear, then T2/d2/c2/w2 … T6/d6/c6/w6.
     Each column stays visible while the next one builds up.
   Phase B (3.6s → 7.2s): T_i/d_i/c_i/w_i fades out and weighted loss l_i
     appears, one column at a time (l1 … l6 accumulate).
   Phase C (7.5s): a dashed box wraps l1..l6 as a whole and Σ highlights.
   Phase D (8.2s): curved Σ → Student arrow + "Update" label.
   Links are drawn as an SVG overlay, repositioned on resize:
   Student→T1 dashed arrow; Teacher→d1/c1/w1 curves sharing one source
   point; Σ→Student curve from Σ left edge to Student left edge, bowing
   left around Teacher (no crossing). */
function initCddAnim() {
  var root = document.querySelector('.cdd-anim');
  if (!root) return;
  var toks = root.querySelectorAll('.cdd-anim__tok');
  var bars = root.querySelectorAll('.cdd-anim__bar');
  var ls = root.querySelectorAll('.cdd-anim__l');
  var sum = root.querySelector('.cdd-anim__sum');
  if (!toks.length || !sum) return;

  var STEP = 600;           /* ms per token column */
  var TEARDOWN = 3600;      /* all 6 columns built; T1 column starts fading */
  var BOX_AT = 7500;        /* dashed box around l1..l6 + Σ highlight */
  var UPDATE_AT = 8200;     /* Σ → Student "Update" arrow */
  var CYCLE = 9000;         /* full loop */

  /* ---- curved links overlay ---- */
  function ensureLinks() {
    var grid = root.querySelector('.cdd-anim__grid');
    if (!grid) return null;
    var svg = root.querySelector('.cdd-anim__links');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'cdd-anim__links');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML =
        '<defs><marker id="cddArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">' +
        '<path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,100,0,0.75)"/></marker></defs>' +
        '<path id="cddLkSt" class="cdd-link" marker-end="url(#cddArr)"/>' +
        '<path id="cddLkTd" class="cdd-link" marker-end="url(#cddArr)"/>' +
        '<path id="cddLkTc" class="cdd-link" marker-end="url(#cddArr)"/>' +
        '<path id="cddLkTw" class="cdd-link" marker-end="url(#cddArr)"/>' +
        '<circle id="cddLkSrc" r="2.6" fill="rgba(255,100,0,0.85)"/>' +
        '<path id="cddLkSum" class="cdd-link cdd-link--sum" marker-end="url(#cddArr)"/>';
      root.insertBefore(svg, grid);
      var label = document.createElement('span');
      label.className = 'cdd-anim__upd-label';
      label.setAttribute('data-i18n', 'cdd_update');
      var lang = 'en';
      try { lang = localStorage.getItem('gamemind-lang') || 'en'; } catch (e) {}
      label.textContent = (I18N[lang] && I18N[lang].cdd_update) || 'Update';
      root.appendChild(label);
    }
    return svg;
  }

  function drawLinks() {
    var grid = root.querySelector('.cdd-anim__grid');
    var svg = root.querySelector('.cdd-anim__links');
    var label = root.querySelector('.cdd-anim__upd-label');
    if (!grid || !svg || !label) return;
    var student = root.querySelector('.cdd-anim__node--student');
    var teacher = root.querySelector('.cdd-anim__node--teacher');
    var sum = root.querySelector('.cdd-anim__sum');
    var toks = root.querySelectorAll('.cdd-anim__tok');
    var cells = root.querySelectorAll('.cdd-anim__cell');
    if (!student || !teacher || !sum || !toks.length || cells.length < 13) return;
    var tok1 = toks[0];
    var d1 = cells[0], c1 = cells[6], w1 = cells[12];
    var gr = grid.getBoundingClientRect();
    function pt(el, xr, yr) {
      var r = el.getBoundingClientRect();
      return { x: r.left - gr.left + r.width * xr, y: r.top - gr.top + r.height * yr };
    }
    function line(p1, p2) {
      return 'M' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1) +
        ' L' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
    }
    function curve(p1, p2, bend) {
      var mx = (p1.x + p2.x) / 2;
      return 'M' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1) +
        ' C' + mx.toFixed(1) + ',' + (p1.y + bend).toFixed(1) +
        ' ' + mx.toFixed(1) + ',' + (p2.y - bend).toFixed(1) +
        ' ' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
    }
    /* Student → T1: short dashed arrow */
    svg.querySelector('#cddLkSt').setAttribute('d', line(pt(student, 1, 0.5), pt(tok1, 0, 0.5)));
    /* Teacher → d1/c1/w1: curves from one source point (teacher right-middle) */
    var src = pt(teacher, 1, 0.5);
    svg.querySelector('#cddLkTd').setAttribute('d', curve(src, pt(d1, 0, 0.5), 5));
    svg.querySelector('#cddLkTc').setAttribute('d', curve(src, pt(c1, 0, 0.5), 18));
    svg.querySelector('#cddLkTw').setAttribute('d', curve(src, pt(w1, 0, 0.5), 30));
    var srcDot = svg.querySelector('#cddLkSrc');
    if (srcDot) {
      srcDot.setAttribute('cx', src.x.toFixed(1));
      srcDot.setAttribute('cy', src.y.toFixed(1));
    }
    /* Σ → Student: from Σ left edge to Student left edge, bowing left around Teacher.
       Bow is capped by the actual geometry so the leftmost point hugs (tangent to)
       the text's left boundary but never crosses it. */
    var p1 = pt(sum, 0, 0.5), p2 = pt(student, 0, 0.5);
    var bow = -Math.min((p1.x + p2.x) / 1.6, Math.max(40, (p2.y - p1.y) * 0.22));
    svg.querySelector('#cddLkSum').setAttribute('d',
      'M' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1) +
      ' C' + (p1.x + bow).toFixed(1) + ',' + p1.y.toFixed(1) +
      ' ' + (p2.x + bow).toFixed(1) + ',' + p2.y.toFixed(1) +
      ' ' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1));
    label.style.left = ((p1.x + p2.x) / 2) + 'px';
    label.style.top = ((p1.y + p2.y) / 2) + 'px';
  }

  ensureLinks();
  drawLinks();
  var resizeT = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(drawLinks, 120);
  });

  /* prefers-reduced-motion: show the whole sequence statically */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toks.forEach(function (el) { el.classList.add('on'); });
    bars.forEach(function (el) { el.classList.add('on'); });
    ls.forEach(function (el) { el.classList.add('on'); });
    sum.classList.add('on');
    root.classList.add('has-lbox');
    root.classList.add('has-sum');
    return;
  }

  var running = false;
  function step(ts) {
    var tm = ts % CYCLE;
    /* Phase A: token + its d/c/w bars appear column by column and stay */
    for (var i = 0; i < toks.length; i++) {
      toks[i].classList.toggle('on', tm >= i * STEP && tm < TEARDOWN + i * STEP);
    }
    for (var i = 0; i < bars.length; i++) {
      var g = i % 6; /* bars are ordered d1..d6,c1..c6,w1..w6 → d_i/c_i/w_i share g */
      bars[i].classList.toggle('on', tm >= g * STEP + 150 && tm < TEARDOWN + g * STEP);
    }
    /* Phase B: column fades out while its weighted loss l_i appears (accumulates) */
    for (var i = 0; i < ls.length; i++) {
      ls[i].classList.toggle('on', tm >= TEARDOWN + i * STEP);
    }
    /* Phase C: dashed box wraps l1..l6, Σ highlights */
    root.classList.toggle('has-lbox', tm >= BOX_AT);
    sum.classList.toggle('on', tm >= BOX_AT);
    /* Phase D: Σ → Student "Update" */
    root.classList.toggle('has-sum', tm >= UPDATE_AT);
  }
  function loop(ts) {
    if (!running) return;
    step(ts);
    requestAnimationFrame(loop);
  }
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!running) { running = true; requestAnimationFrame(loop); }
    } else {
      running = false;
    }
  }, { threshold: 0.15 });
  io.observe(root);
}

/* ---- Boot ---- */
window.initSite({
  storageKey: 'kuairp-lang',
  i18n: I18N,
});

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMobileMenu();
  initMouseGlow();
  initCddAnim();
});
