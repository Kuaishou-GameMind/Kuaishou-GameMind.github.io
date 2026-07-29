/* ============================================================
   Cutscene Agent — Interactive Figure Components
   Replaces static paper images with animated HTML/SVG/JS
   ============================================================ */

// ─────────────────────────────────────────────
// 1. RADAR CHART (L1 & L2 metrics)
// ─────────────────────────────────────────────

const RADAR_DATA = {
  metrics: ['TSA', 'PV', 'CC', 'CE', 'DC', 'TC', 'CamC', 'TempC'],
  metricsFull: {
    en: ['Tool Selection', 'Param Validity', 'Call Complete.', 'Call Efficiency', 'Dependency', 'Track Complete.', 'Camera Cov.', 'Temporal Cons.'],
    zh: ['工具选择', '参数有效性', '调用完整性', '调用效率', '依赖合规', '轨道完整性', '相机覆盖', '时间一致性']
  },
  models: [
    { name: 'Claude Opus 4.6',   color: '#f97316', values: [100, 100, 100, 97.5, 100, 100, 96.4, 99.5] },
    { name: 'Claude Sonnet 4.6', color: '#60a5fa', values: [100, 99.9, 98.4, 97.4, 100, 99.6, 89.5, 98.6] },
    { name: 'GPT-5.4',           color: '#34d399', values: [100, 96.6, 95.7, 97.4, 98.5, 96.0, 93.5, 98.0] },
    { name: 'Qwen 3.5 Plus',     color: '#06b6d4', values: [99.9, 97.1, 94.5, 99.7, 99.5, 97.9, 89.3, 96.3] },
    { name: 'Kimi K2.5',         color: '#f87171', values: [99.3, 97.4, 91.8, 98.6, 98.7, 91.0, 73.9, 89.2] },
    { name: 'GLM-5',             color: '#a78bfa', values: [99.7, 98.1, 93.1, 99.2, 99.2, 92.4, 77.3, 95.8] },
    { name: 'MiniMax M2.5',      color: '#fbbf24', values: [99.5, 91.6, 90.9, 98.7, 99.2, 94.8, 74.8, 85.3] },
  ],
  rangeMin: 65,
  rangeMax: 100
};

function createRadarChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = 560, height = 560;
  const cx = width / 2, cy = height / 2;
  const radius = 170;
  const metrics = RADAR_DATA.metrics;
  const n = metrics.length;
  const angleStep = (2 * Math.PI) / n;
  const minVal = RADAR_DATA.rangeMin;
  const maxVal = RADAR_DATA.rangeMax;
  const rings = 4; // grid rings

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
  const metricLabels = RADAR_DATA.metricsFull[lang] || RADAR_DATA.metricsFull.en;

  // SVG start
  let svg = `<svg viewBox="0 0 ${width} ${height}" class="radar-svg" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>`;
  RADAR_DATA.models.forEach((m, i) => {
    svg += `<linearGradient id="radarGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${m.color};stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:${m.color};stop-opacity:0.08"/>
    </linearGradient>`;
  });
  svg += `</defs>`;

  // Grid rings
  for (let r = 1; r <= rings; r++) {
    const rr = (r / rings) * radius;
    let pts = [];
    for (let i = 0; i < n; i++) {
      const angle = -Math.PI / 2 + i * angleStep;
      pts.push(`${cx + rr * Math.cos(angle)},${cy + rr * Math.sin(angle)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    // Ring label
    const val = minVal + (r / rings) * (maxVal - minVal);
    svg += `<text x="${cx + 4}" y="${cy - rr + 4}" class="radar-ring-label">${Math.round(val)}%</text>`;
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + i * angleStep;
    const x2 = cx + radius * Math.cos(angle);
    const y2 = cy + radius * Math.sin(angle);
    svg += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;

    // Metric labels
    const labelR = radius + 38;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    let anchor = 'middle';
    if (Math.cos(angle) > 0.3) anchor = 'start';
    else if (Math.cos(angle) < -0.3) anchor = 'end';
    const dy = Math.sin(angle) > 0.3 ? 14 : (Math.sin(angle) < -0.3 ? -4 : 5);
    svg += `<text x="${lx}" y="${ly + dy}" text-anchor="${anchor}" class="radar-metric-label">${metricLabels[i]}</text>`;
  }

  // Model polygons
  RADAR_DATA.models.forEach((model, mi) => {
    let pts = [];
    model.values.forEach((v, i) => {
      const norm = (v - minVal) / (maxVal - minVal);
      const r = Math.max(0, norm) * radius;
      const angle = -Math.PI / 2 + i * angleStep;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    });
    svg += `<polygon points="${pts.join(' ')}" fill="url(#radarGrad${mi})" stroke="${model.color}" stroke-width="1.8" class="radar-polygon" data-model="${mi}" style="animation-delay:${mi * 0.12}s"/>`;

    // Dots on vertices
    model.values.forEach((v, i) => {
      const norm = (v - minVal) / (maxVal - minVal);
      const r = Math.max(0, norm) * radius;
      const angle = -Math.PI / 2 + i * angleStep;
      const dx = cx + r * Math.cos(angle);
      const dy = cy + r * Math.sin(angle);
      svg += `<circle cx="${dx}" cy="${dy}" r="3" fill="${model.color}" class="radar-dot" data-model="${mi}" style="animation-delay:${mi * 0.12 + 0.3}s"/>`;
    });
  });

  svg += `</svg>`;

  // Legend
  let legend = `<div class="radar-legend">`;
  RADAR_DATA.models.forEach((m, i) => {
    legend += `<div class="radar-legend__item" data-model="${i}">
      <span class="radar-legend__color" style="background:${m.color}"></span>
      <span class="radar-legend__name">${m.name}</span>
    </div>`;
  });
  legend += `</div>`;

  container.innerHTML = svg + legend;

  // Legend hover interaction
  container.querySelectorAll('.radar-legend__item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const mi = item.dataset.model;
      const activeColor = RADAR_DATA.models[parseInt(mi)].color;
      container.querySelectorAll('.radar-polygon').forEach(p => {
        if (p.dataset.model === mi) {
          p.style.opacity = '1';
          p.style.strokeWidth = '3.5';
          p.style.filter = `drop-shadow(0 0 8px ${activeColor})`;
          p.style.fill = activeColor;
          p.style.fillOpacity = '0.25';
        } else {
          p.style.opacity = '0.04';
          p.style.strokeWidth = '0.5';
          p.style.filter = '';
        }
      });
      container.querySelectorAll('.radar-dot').forEach(d => {
        if (d.dataset.model === mi) {
          d.style.opacity = '1';
          d.setAttribute('r', '5');
          d.style.filter = `drop-shadow(0 0 4px ${activeColor})`;
        } else {
          d.style.opacity = '0.03';
          d.setAttribute('r', '2');
          d.style.filter = '';
        }
      });
      // Highlight active legend item
      container.querySelectorAll('.radar-legend__item').forEach(li => {
        li.style.opacity = li.dataset.model === mi ? '1' : '0.35';
      });
    });
    item.addEventListener('mouseleave', () => {
      container.querySelectorAll('.radar-polygon').forEach(p => {
        p.style.opacity = '';
        p.style.strokeWidth = '';
        p.style.filter = '';
        p.style.fill = '';
        p.style.fillOpacity = '';
      });
      container.querySelectorAll('.radar-dot').forEach(d => {
        d.style.opacity = '';
        d.setAttribute('r', '3');
        d.style.filter = '';
      });
      container.querySelectorAll('.radar-legend__item').forEach(li => {
        li.style.opacity = '';
      });
    });
  });
}


// ─────────────────────────────────────────────
// 2. EVALUATION FRAMEWORK (3-Layer Pyramid)
// ─────────────────────────────────────────────

function createEvalFramework(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';

  const layers = [
    {
      level: 'L1',
      title: { en: 'Tool-Use Correctness', zh: '工具调用正确性' },
      subtitle: { en: 'Automated trajectory analysis', zh: '自动化调用轨迹分析' },
      color: '#f97316',
      colorBg: 'rgba(249,115,22,0.08)',
      colorBorder: 'rgba(249,115,22,0.28)',
      metrics: [
        { key: 'TSA', en: 'Tool Selection Accuracy', zh: '工具选择准确率' },
        { key: 'PV', en: 'Parameter Validity', zh: '参数有效性' },
        { key: 'CC', en: 'Call Completeness', zh: '调用完整性' },
        { key: 'CE', en: 'Call Efficiency', zh: '调用效率' },
        { key: 'DC', en: 'Dependency Compliance', zh: '依赖合规性' }
      ],
      icon: 'fa-solid fa-code'
    },
    {
      level: 'L2',
      title: { en: 'Structural Integrity', zh: '结构完整性' },
      subtitle: { en: 'Programmatic validation on final sequence', zh: '对最终序列的程序化验证' },
      color: '#60a5fa',
      colorBg: 'rgba(96,165,250,0.08)',
      colorBorder: 'rgba(96,165,250,0.28)',
      metrics: [
        { key: 'TC', en: 'Track Completeness', zh: '轨道完整性' },
        { key: 'CamC', en: 'Camera Coverage', zh: '相机覆盖率' },
        { key: 'TempC', en: 'Temporal Consistency', zh: '时间一致性' }
      ],
      icon: 'fa-solid fa-layer-group'
    },
    {
      level: 'L3',
      title: { en: 'Narrative & Cinematic Quality', zh: '叙事与影视质量' },
      subtitle: { en: 'LLM-as-Judge on rendered video', zh: '基于渲染视频的LLM评审' },
      color: '#a78bfa',
      colorBg: 'rgba(167,139,250,0.08)',
      colorBorder: 'rgba(167,139,250,0.28)',
      metrics: [
        { key: 'SF', en: 'Script Fidelity', zh: '剧本忠实度' },
        { key: 'ChC', en: 'Character Consistency', zh: '角色一致性' },
        { key: 'CQ', en: 'Cinematographic Quality', zh: '影视质量' },
        { key: 'TmpCoh', en: 'Temporal Coherence', zh: '时间连贯性' }
      ],
      icon: 'fa-solid fa-film'
    }
  ];

  let html = `<div class="eval-framework eval-framework--compact">`;

  layers.forEach((layer, idx) => {
    html += `<div class="eval-layer eval-layer--compact" data-level="${layer.level}" style="--layer-color:${layer.color};--layer-bg:${layer.colorBg};--layer-border:${layer.colorBorder}">
      <div class="eval-layer__header">
        <div class="eval-layer__badge">${layer.level}</div>
        <div class="eval-layer__icon"><i class="${layer.icon}"></i></div>
        <div class="eval-layer__info">
          <h4 class="eval-layer__title">${layer.title[lang]}</h4>
          <p class="eval-layer__subtitle">${layer.subtitle[lang]}</p>
        </div>
      </div>
      <div class="eval-layer__metrics">
        ${layer.metrics.map(m => `
          <span class="eval-metric">
            <span class="eval-metric__key">${m.key}</span>
            <span class="eval-metric__name">${m[lang]}</span>
          </span>
        `).join('')}
      </div>
    </div>`;

    // Connector arrow between layers
    if (idx < layers.length - 1) {
      html += `<div class="eval-connector">
        <div class="eval-connector__line"></div>
        <div class="eval-connector__arrow">▼</div>
      </div>`;
    }
  });

  html += `</div>`;
  container.innerHTML = html;
}


// ─────────────────────────────────────────────
// 3. ARCHITECTURE DIAGRAM (Interactive Pipeline)
// ─────────────────────────────────────────────

function createArchitectureDiagram(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';

  const t = {
    input: { en: 'Natural Language Script', zh: '自然语言剧本' },
    director: { en: 'Director Agent', zh: '导演 Agent' },
    directorSub: { en: 'Orchestrates the full pipeline', zh: '统筹全流程' },
    prompt: { en: 'Prompt & Context Manager', zh: '提示词和上下文管理' },
    stateSync: { en: 'Auto State Sync', zh: '自动状态同步' },
    subagents: { en: 'Specialist Subagents', zh: '专业子 Agent' },
    animAgent: { en: 'Animation', zh: '动画' },
    cameraAgent: { en: 'Camera', zh: '运镜' },
    soundAgent: { en: 'Sound', zh: '音效' },
    customAgent: { en: 'Custom', zh: '自定义' },
    visualLoop: { en: 'Visual Feedback Loop', zh: '视觉反馈循环' },
    perceive: { en: 'Perceive', zh: '感知' },
    reason: { en: 'Reason', zh: '推理' },
    act: { en: 'Act', zh: '行动' },
    toolkit: { en: 'Cutscene Toolkit & Services (MCP)', zh: '过场动画工具库与服务 (MCP)' },
    charMgmt: { en: 'Character Mgmt', zh: '角色管理' },
    assetQuery: { en: 'Asset Query', zh: '资产查询' },
    cameraMgmt: { en: 'Camera Mgmt', zh: '相机管理' },
    scenePerc: { en: 'Scene Perception', zh: '场景感知' },
    tts: { en: 'TTS', zh: 'TTS' },
    facialAnim: { en: 'Facial Anim', zh: '面部动画' },
    engine: { en: 'Unreal Engine 5', zh: 'Unreal Engine 5' },
    levelSeq: { en: 'Level Sequence', zh: 'Level Sequence' },
    output: { en: 'Editable Cutscene', zh: '可编辑过场动画' },
    generates: { en: 'generates', zh: '生成' },
    bidirectional: { en: 'Bidirectional Control & Observation', zh: '双向控制与观察' },
    skillPkg: { en: 'Cutscene Skill Package', zh: '过场动画 Skill 包' },
    skillSub: { en: 'Plug-and-play for any agent', zh: '任意 Agent 即插即用' },
    extAgents: { en: 'External Agents', zh: '外部 Agent' },
    loadSkill: { en: 'load skill', zh: '加载 skill' },
  };

  const html = `
  <div class="arch-diagram arch-diagram--wide">
    <!-- Top banner: External Agents → Skill Package → (into Director below) -->
    <div class="arch-skill-banner">
      <div class="arch-ext-agents">
        <span class="arch-ext-agents__label">${t.extAgents[lang]}</span>
        <div class="arch-ext-agents__row">
          <div class="arch-ext-chip"><i class="fa-solid fa-terminal"></i><span>Claude Code</span></div>
          <div class="arch-ext-chip"><i class="fa-brands fa-github"></i><span>Copilot</span></div>
          <div class="arch-ext-chip"><i class="fa-solid fa-robot"></i><span>Other</span></div>
        </div>
      </div>
      <div class="arch-skill-arrow arch-skill-arrow--horiz">
        <svg viewBox="0 0 60 16" width="60" height="16"><path d="M0,8 L60,8" stroke="rgba(6,182,212,0.7)" stroke-width="2" fill="none" stroke-dasharray="4 3"><animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.3s" repeatCount="indefinite"/></path><polygon points="52,4 60,8 52,12" fill="#06b6d4"/></svg>
        <span class="arch-skill-arrow__label">${t.loadSkill[lang]}</span>
      </div>
      <div class="arch-skill-card">
        <div class="arch-skill-card__icon"><i class="fa-solid fa-puzzle-piece"></i></div>
        <div class="arch-skill-card__text">
          <span class="arch-skill-card__title">${t.skillPkg[lang]}</span>
          <span class="arch-skill-card__sub">${t.skillSub[lang]}</span>
        </div>
      </div>
      <div class="arch-skill-banner__down">
        <svg viewBox="0 0 16 40" width="16" height="40"><path d="M8,0 L8,40" stroke="rgba(6,182,212,0.5)" stroke-width="2" fill="none" stroke-dasharray="3 3"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.3s" repeatCount="indefinite"/></path><polygon points="4,32 8,40 12,32" fill="#06b6d4" opacity="0.8"/></svg>
      </div>
    </div>

    <!-- Left column: Input → Agent flow -->
    <div class="arch-io-col">
      <div class="arch-node arch-node--input arch-node--io-card">
        <div class="arch-node__icon-wrap arch-node__icon-wrap--input"><i class="fa-solid fa-scroll"></i></div>
        <div class="arch-node__text">
          <span class="arch-node__label">${t.input[lang]}</span>
        </div>
      </div>
      <div class="arch-io-arrow">
        <svg viewBox="0 0 40 60" width="40" height="60"><path d="M20,0 L20,60" stroke="url(#ioGrad)" stroke-width="2" fill="none" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite"/></path><polygon points="14,52 20,60 26,52" fill="var(--accent)"/><defs><linearGradient id="ioGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient></defs></svg>
      </div>
      <div class="arch-node arch-node--output arch-node--io-card">
        <div class="arch-node__icon-wrap arch-node__icon-wrap--output"><i class="fa-solid fa-clapperboard"></i></div>
        <div class="arch-node__text">
          <span class="arch-node__label">${t.output[lang]}</span>
        </div>
      </div>
      <div class="arch-io-note"><i class="fa-solid fa-arrow-up"></i> ${t.generates[lang]}</div>
    </div>

    <!-- Center: Main agent system -->
    <div class="arch-center-col">
      <div class="arch-h-connector arch-h-connector--left">
        <svg viewBox="0 0 60 24" class="arch-h-svg"><path d="M0,12 L60,12" stroke="url(#hcGrad)" stroke-width="2" fill="none" stroke-dasharray="5 3"><animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite"/></path><polygon points="52,8 60,12 52,16" fill="var(--accent)"/><defs><linearGradient id="hcGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient></defs></svg>
      </div>

      <div class="arch-card arch-card--agent arch-card--hero">
        <div class="arch-card__header">
          <div class="arch-card__header-icon"><i class="fa-solid fa-brain"></i></div>
          <div class="arch-card__header-text">
            <span class="arch-card__header-title">${t.director[lang]}</span>
            <span class="arch-card__sub">${t.directorSub[lang]}</span>
          </div>
          <div class="arch-card__header-glow"></div>
        </div>

        <div class="arch-card__body arch-card__body--wide">
          <div class="arch-module arch-module--prompt">
            <div class="arch-module__title"><i class="fa-solid fa-sliders"></i> ${t.prompt[lang]}</div>
            <div class="arch-module__detail">
              <span class="arch-tag arch-tag--blue">${t.stateSync[lang]}</span>
            </div>
          </div>

          <div class="arch-module arch-module--subagents">
            <div class="arch-module__title"><i class="fa-solid fa-users"></i> ${t.subagents[lang]}</div>
            <div class="arch-subagent-row">
              <div class="arch-subagent"><i class="fa-solid fa-person-walking"></i><span>${t.animAgent[lang]}</span></div>
              <div class="arch-subagent"><i class="fa-solid fa-video"></i><span>${t.cameraAgent[lang]}</span></div>
              <div class="arch-subagent"><i class="fa-solid fa-volume-high"></i><span>${t.soundAgent[lang]}</span></div>
              <div class="arch-subagent arch-subagent--custom"><i class="fa-solid fa-wand-magic-sparkles"></i><span>${t.customAgent[lang]}</span></div>
            </div>
          </div>

          <div class="arch-module arch-module--visual">
            <div class="arch-module__title"><i class="fa-solid fa-eye"></i> ${t.visualLoop[lang]}</div>
            <div class="arch-loop-ring">
              <div class="arch-loop-step" data-step="1"><span>${t.perceive[lang]}</span></div>
              <div class="arch-loop-step" data-step="2"><span>${t.reason[lang]}</span></div>
              <div class="arch-loop-step" data-step="3"><span>${t.act[lang]}</span></div>
              <svg viewBox="0 0 120 120" class="arch-loop-ring-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(251,191,36,0.12)" stroke-width="2"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(251,191,36,0.5)" stroke-width="2" stroke-dasharray="40 274" stroke-linecap="round" class="arch-loop-ring-spinner"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Prominent bidirectional MCP connector -->
      <div class="arch-h-connector arch-h-connector--right arch-h-connector--prominent">
        <svg viewBox="0 0 80 40" class="arch-h-svg arch-h-svg--prominent">
          <defs>
            <linearGradient id="hcGrad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#fbbf24"/></linearGradient>
            <filter id="connGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <!-- Forward arrow (Agent → UE) -->
          <path d="M0,14 L80,14" stroke="url(#hcGrad2)" stroke-width="2.5" fill="none" stroke-dasharray="6 3" filter="url(#connGlow)"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite"/></path>
          <polygon points="72,10 80,14 72,18" fill="var(--accent3)"/>
          <!-- Return arrow (UE → Agent) -->
          <path d="M80,28 L0,28" stroke="url(#hcGrad2)" stroke-width="2" fill="none" stroke-dasharray="4 3" opacity="0.6"><animate attributeName="stroke-dashoffset" from="0" to="14" dur="1.2s" repeatCount="indefinite"/></path>
          <polygon points="8,24 0,28 8,32" fill="var(--accent2)" opacity="0.7"/>
        </svg>
        <span class="arch-h-connector__label">MCP</span>
        <span class="arch-h-connector__sublabel">${t.bidirectional[lang]}</span>
      </div>
    </div>

    <!-- Right column: Merged Toolkit + UE Engine -->
    <div class="arch-right-col">
      <!-- Single merged toolkit card -->
      <div class="arch-card arch-card--toolkit arch-card--right-card">
        <div class="arch-card__header arch-card__header--toolkit">
          <i class="fa-solid fa-toolbox"></i>
          <span>${t.toolkit[lang]}</span>
        </div>
        <div class="arch-toolkit-modules">
          <div class="arch-toolkit-mod"><i class="fa-solid fa-person"></i><span>${t.charMgmt[lang]}</span></div>
          <div class="arch-toolkit-mod"><i class="fa-solid fa-magnifying-glass"></i><span>${t.assetQuery[lang]}</span></div>
          <div class="arch-toolkit-mod"><i class="fa-solid fa-camera"></i><span>${t.cameraMgmt[lang]}</span></div>
          <div class="arch-toolkit-mod"><i class="fa-solid fa-eye"></i><span>${t.scenePerc[lang]}</span></div>
          <div class="arch-toolkit-mod arch-toolkit-mod--external"><i class="fa-solid fa-microphone"></i><span>${t.tts[lang]}</span></div>
          <div class="arch-toolkit-mod arch-toolkit-mod--external"><i class="fa-solid fa-face-smile"></i><span>${t.facialAnim[lang]}</span></div>
        </div>
      </div>
      <!-- Engine node with emphasized styling -->
      <div class="arch-right-engine">
        <div class="arch-ue-connector">
          <svg viewBox="0 0 24 30" width="24" height="30"><path d="M12,0 L12,30" stroke="rgba(251,191,36,0.4)" stroke-width="2" fill="none" stroke-dasharray="3 3"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite"/></path><polygon points="8,24 12,30 16,24" fill="var(--accent3)" opacity="0.7"/></svg>
        </div>
        <div class="arch-node arch-node--engine arch-node--engine-hero">
          <div class="arch-node__icon-wrap arch-node__icon-wrap--engine"><i class="fa-solid fa-gamepad"></i></div>
          <div class="arch-node__text">
            <span class="arch-node__label">${t.engine[lang]}</span>
            <span class="arch-node__sub">${t.levelSeq[lang]}</span>
          </div>
          <div class="arch-node__engine-glow"></div>
        </div>
      </div>
    </div>
  </div>`;

  container.innerHTML = html;

  // Animate the visual loop
  animateVisualLoop(container);
}

function animateVisualLoop(container) {
  const steps = container.querySelectorAll('.arch-loop-step');
  if (!steps.length) return;
  // Clockwise order: top(1) → bottom-right(3) → bottom-left(2)
  const order = [0, 2, 1];
  let idx = 0;
  // Start highlight 500ms before ring (ring has ~500ms DOM-to-paint delay)
  steps[order[0]].classList.add('arch-loop-step--active');
  setInterval(() => {
    steps.forEach(s => s.classList.remove('arch-loop-step--active'));
    idx = (idx + 1) % order.length;
    steps[order[idx]].classList.add('arch-loop-step--active');
  }, 1200);
}


// ─────────────────────────────────────────────
// 4. CAMERA TEMPLATES (Interactive Gallery)
// ─────────────────────────────────────────────

function createCameraTemplates(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';

  const templates = [
    {
      id: 'ots',
      name: { en: 'Over-the-Shoulder', zh: '过肩镜头' },
      desc: { en: 'Camera behind one character\'s shoulder, focusing on the other. Variants: near, mid, high.', zh: '相机位于一个角色肩后，聚焦另一角色。变体：近景、中景、高位。' },
      icon: 'fa-solid fa-user-group',
      svg: createOTSSvg()
    },
    {
      id: 'pov',
      name: { en: 'Point-of-View', zh: '主观镜头' },
      desc: { en: 'Camera at a character\'s eye level, showing their perspective.', zh: '相机位于角色眼睛高度，展示其视角。' },
      icon: 'fa-solid fa-eye',
      svg: createPOVSvg()
    },
    {
      id: 'onaxis',
      name: { en: 'On-Axis', zh: '轴线镜头' },
      desc: { en: 'Camera at the midpoint between two characters, facing one.', zh: '相机位于两个角色中点，面向其中一个。' },
      icon: 'fa-solid fa-arrows-left-right',
      svg: createOnAxisSvg()
    },
    {
      id: 'establishing',
      name: { en: 'Establishing Shot', zh: '全景镜头' },
      desc: { en: 'Wide shot capturing both characters and the environment.', zh: '宽幅画面同时捕捉两个角色及环境。' },
      icon: 'fa-solid fa-mountain-sun',
      svg: createEstablishingSvg()
    },
    {
      id: 'sideprofile',
      name: { en: 'Side Profile', zh: '侧面镜头' },
      desc: { en: 'Camera placed to the left or right at bone level for a profile view.', zh: '相机位于角色左侧或右侧骨骼水平，呈现侧面轮廓。' },
      icon: 'fa-solid fa-user',
      svg: createSideProfileSvg()
    },
    {
      id: 'genericfocus',
      name: { en: 'Generic Focus', zh: '通用聚焦' },
      desc: { en: 'Flexible single-target with configurable distance, pitch, yaw, and bone.', zh: '灵活的单目标镜头，可配置距离、俯仰、偏航和骨骼附着。' },
      icon: 'fa-solid fa-crosshairs',
      svg: createGenericFocusSvg()
    },
    {
      id: 'dolly',
      name: { en: 'Dolly (Movement)', zh: '推拉（运动）' },
      desc: { en: 'Camera approaches or retreats from the target by a ratio.', zh: '相机按比例靠近或远离目标。' },
      icon: 'fa-solid fa-arrows-up-down',
      svg: createDollySvg()
    },
    {
      id: 'orbit',
      name: { en: 'Orbit (Movement)', zh: '环绕（运动）' },
      desc: { en: 'Camera arcs around the look-at target by a specified angle.', zh: '相机围绕注视目标进行弧形运动。' },
      icon: 'fa-solid fa-rotate',
      svg: createOrbitSvg()
    }
  ];

  let html = `<div class="cam-templates-grid">`;
  templates.forEach((tpl) => {
    html += `<div class="cam-tpl-card" data-tpl="${tpl.id}">
      <div class="cam-tpl-card__visual">${tpl.svg}</div>
      <div class="cam-tpl-card__info">
        <div class="cam-tpl-card__name"><i class="${tpl.icon}"></i> ${tpl.name[lang]}</div>
        <p class="cam-tpl-card__desc">${tpl.desc[lang]}</p>
      </div>
    </div>`;
  });
  html += `</div>`;

  container.innerHTML = html;
}

// — SVG helpers for camera templates —

function createOTSSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Character A (near, silhouette) -->
    <ellipse cx="45" cy="55" rx="16" ry="22" fill="rgba(249,115,22,0.3)" stroke="#f97316" stroke-width="1"/>
    <circle cx="45" cy="35" r="10" fill="rgba(249,115,22,0.3)" stroke="#f97316" stroke-width="1"/>
    <!-- Character B (far, focused) -->
    <ellipse cx="150" cy="58" rx="14" ry="20" fill="rgba(234,88,12,0.4)" stroke="#ea580c" stroke-width="1.5"/>
    <circle cx="150" cy="40" r="9" fill="rgba(234,88,12,0.4)" stroke="#ea580c" stroke-width="1.5"/>
    <!-- Camera icon -->
    <rect x="12" y="46" width="16" height="12" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="28,48 36,44 36,62 28,58" fill="#fbbf24" opacity="0.6"/>
    <!-- View cone -->
    <polygon points="36,52 150,30 150,70" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.2)" stroke-width="0.5" stroke-dasharray="3 2"/>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">OTS</text>
  </svg>`;
}

function createPOVSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Character (source) -->
    <circle cx="30" cy="45" r="9" fill="rgba(249,115,22,0.3)" stroke="#f97316" stroke-width="1"/>
    <ellipse cx="30" cy="62" rx="12" ry="16" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/>
    <!-- Camera at eye level -->
    <rect x="40" y="40" width="14" height="10" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="54,42 60,38 60,56 54,52" fill="#fbbf24" opacity="0.6"/>
    <!-- View -->
    <polygon points="60,46 185,15 185,95" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.15)" stroke-width="0.5" stroke-dasharray="3 2"/>
    <!-- Target scene lines -->
    <line x1="160" y1="25" x2="160" y2="95" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="140" y1="25" x2="140" y2="95" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <rect x="148" y="45" width="24" height="35" rx="2" fill="rgba(234,88,12,0.15)" stroke="rgba(234,88,12,0.3)" stroke-width="1"/>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">POV</text>
  </svg>`;
}

function createOnAxisSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Char A -->
    <circle cx="50" cy="42" r="8" fill="rgba(249,115,22,0.35)" stroke="#f97316" stroke-width="1"/>
    <ellipse cx="50" cy="60" rx="11" ry="18" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/>
    <!-- Char B -->
    <circle cx="150" cy="42" r="8" fill="rgba(234,88,12,0.35)" stroke="#ea580c" stroke-width="1"/>
    <ellipse cx="150" cy="60" rx="11" ry="18" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="1"/>
    <!-- Camera at midpoint -->
    <rect x="92" y="10" width="16" height="12" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="100,22 92,28 108,28" fill="#fbbf24" opacity="0.6"/>
    <!-- Axis line -->
    <line x1="50" y1="50" x2="150" y2="50" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4 3"/>
    <circle cx="100" cy="50" r="3" fill="rgba(251,191,36,0.6)"/>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">On-Axis</text>
  </svg>`;
}

function createEstablishingSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Wide frame -->
    <rect x="20" y="15" width="160" height="85" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="4 3"/>
    <!-- Ground -->
    <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <!-- Char A (small) -->
    <circle cx="70" cy="65" r="6" fill="rgba(249,115,22,0.35)" stroke="#f97316" stroke-width="1"/>
    <ellipse cx="70" cy="78" rx="8" ry="12" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/>
    <!-- Char B (small) -->
    <circle cx="130" cy="65" r="6" fill="rgba(234,88,12,0.35)" stroke="#ea580c" stroke-width="1"/>
    <ellipse cx="130" cy="78" rx="8" ry="12" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="1"/>
    <!-- Camera far away -->
    <rect x="88" y="2" width="24" height="14" rx="3" fill="#fbbf24" opacity="0.7"/>
    <text x="100" y="12" text-anchor="middle" fill="white" font-size="7" font-weight="600">WIDE</text>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">Establishing</text>
  </svg>`;
}

function createSideProfileSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Character (side view) -->
    <circle cx="110" cy="38" r="12" fill="rgba(249,115,22,0.3)" stroke="#f97316" stroke-width="1.5"/>
    <!-- Face direction indicator -->
    <line x1="118" y1="38" x2="140" y2="38" stroke="rgba(249,115,22,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
    <ellipse cx="110" cy="62" rx="16" ry="24" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/>
    <!-- Camera to the side -->
    <rect x="24" y="32" width="16" height="12" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="40,34 48,30 48,50 40,46" fill="#fbbf24" opacity="0.6"/>
    <!-- View line -->
    <line x1="48" y1="40" x2="98" y2="40" stroke="rgba(251,191,36,0.3)" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">Side Profile</text>
  </svg>`;
}

function createGenericFocusSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Target character -->
    <circle cx="120" cy="42" r="10" fill="rgba(234,88,12,0.35)" stroke="#ea580c" stroke-width="1.5"/>
    <ellipse cx="120" cy="62" rx="14" ry="22" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="1"/>
    <!-- Crosshair -->
    <line x1="120" y1="28" x2="120" y2="56" stroke="rgba(251,191,36,0.4)" stroke-width="0.8"/>
    <line x1="106" y1="42" x2="134" y2="42" stroke="rgba(251,191,36,0.4)" stroke-width="0.8"/>
    <circle cx="120" cy="42" r="16" fill="none" stroke="rgba(251,191,36,0.3)" stroke-width="0.8"/>
    <!-- Camera with adjustable params -->
    <rect x="30" y="25" width="16" height="12" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="46,27 54,22 54,42 46,37" fill="#fbbf24" opacity="0.6"/>
    <!-- Parameter arcs -->
    <path d="M42,55 Q42,65 52,65" fill="none" stroke="rgba(6,182,212,0.5)" stroke-width="1"/>
    <text x="55" y="68" fill="#06b6d4" font-size="7" opacity="0.8">pitch</text>
    <path d="M42,70 Q42,80 52,80" fill="none" stroke="rgba(239,68,68,0.5)" stroke-width="1"/>
    <text x="55" y="83" fill="#ef4444" font-size="7" opacity="0.8">yaw</text>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">Generic Focus</text>
  </svg>`;
}

function createDollySvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Target -->
    <circle cx="150" cy="45" r="10" fill="rgba(234,88,12,0.35)" stroke="#ea580c" stroke-width="1.5"/>
    <ellipse cx="150" cy="65" rx="14" ry="20" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="1"/>
    <!-- Camera positions (ghost + current) -->
    <rect x="28" y="40" width="14" height="10" rx="2" fill="rgba(251,191,36,0.3)" stroke="rgba(251,191,36,0.3)" stroke-width="0.5" stroke-dasharray="2 2"/>
    <rect x="68" y="40" width="14" height="10" rx="2" fill="#fbbf24" opacity="0.8"/>
    <polygon points="82,42 88,38 88,56 82,52" fill="#fbbf24" opacity="0.6"/>
    <!-- Movement arrow -->
    <line x1="35" y1="56" x2="75" y2="56" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#arrowDolly)"/>
    <defs><marker id="arrowDolly" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#fbbf24"/></marker></defs>
    <text x="55" y="70" text-anchor="middle" fill="rgba(251,191,36,0.7)" font-size="7">dolly in</text>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">Dolly</text>
  </svg>`;
}

function createOrbitSvg() {
  return `<svg viewBox="0 0 200 120" class="cam-svg">
    <!-- Target (center) -->
    <circle cx="110" cy="50" r="10" fill="rgba(234,88,12,0.35)" stroke="#ea580c" stroke-width="1.5"/>
    <ellipse cx="110" cy="68" rx="14" ry="18" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="1"/>
    <!-- Orbit arc -->
    <path d="M50,35 A65,65 0 0,1 170,35" fill="none" stroke="rgba(251,191,36,0.3)" stroke-width="1.2" stroke-dasharray="4 3"/>
    <!-- Camera positions -->
    <rect x="42" y="28" width="14" height="10" rx="2" fill="rgba(251,191,36,0.3)" stroke-dasharray="2 2" stroke="rgba(251,191,36,0.4)" stroke-width="0.5"/>
    <rect x="160" y="28" width="14" height="10" rx="2" fill="#fbbf24" opacity="0.8"/>
    <!-- Arrow along arc -->
    <path d="M60,28 A55,55 0 0,1 160,28" fill="none" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#arrowOrbit)"/>
    <defs><marker id="arrowOrbit" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#fbbf24"/></marker></defs>
    <text x="110" y="20" text-anchor="middle" fill="rgba(251,191,36,0.7)" font-size="7">orbit arc</text>
    <text x="100" y="110" text-anchor="middle" class="cam-svg-label">Orbit</text>
  </svg>`;
}


// ─────────────────────────────────────────────
// 5. L3 BAR CHART (Narrative & Cinematic Quality)
// ─────────────────────────────────────────────

const L3_DATA = {
  models: ['Opus 4.6', 'Sonnet 4.6', 'GPT-5.4', 'Qwen 3.5+', 'Kimi K2.5', 'GLM-5', 'MiniMax'],
  dimensions: [
    { key: 'SF', en: 'Script Fidelity', zh: '剧本忠实度', color: '#f97316' },
    { key: 'ChC', en: 'Char. Consistency', zh: '角色一致性', color: '#fbbf24' },
    { key: 'CQ', en: 'Cinematography', zh: '影视质量', color: '#a78bfa' },
    { key: 'TmpCoh', en: 'Temporal Coh.', zh: '时间连贯', color: '#06b6d4' }
  ],
  values: [
    [10.8, 14.1, 13.2, 12.1],   // Opus
    [10.4, 11.7,  9.8,  9.8],   // Sonnet
    [10.2, 12.2, 10.0, 10.0],   // GPT
    [ 7.4,  9.7,  5.7,  7.2],   // Qwen
    [ 8.6,  9.6,  5.4,  7.1],   // Kimi
    [ 8.0,  8.4,  5.7,  6.8],   // GLM
    [ 7.5,  7.6,  4.4,  6.2],   // MiniMax
  ]
};

function createL3BarChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
  const maxTotal = 55; // scale ceiling for visual

  // Calculate totals
  const totals = L3_DATA.models.map((model, mi) => ({
    name: model,
    values: L3_DATA.values[mi],
    total: L3_DATA.values[mi].reduce((a, b) => a + b, 0),
    idx: mi
  }));

  // Sort descending
  totals.sort((a, b) => b.total - a.total);

  const dims = L3_DATA.dimensions;

  // Build horizontal stacked bar chart
  let html = `<div class="l3-hchart">`;

  // Legend
  html += `<div class="l3-hchart__legend">`;
  dims.forEach(d => {
    html += `<span class="l3-hchart__legend-item"><span class="l3-hchart__legend-dot" style="background:${d.color}"></span>${d[lang]}</span>`;
  });
  html += `</div>`;

  // Rows
  html += `<div class="l3-hchart__rows">`;
  totals.forEach((item, idx) => {
    const barPct = (item.total / maxTotal) * 100;
    const isTop = idx === 0;
    html += `<div class="l3-hchart__row ${isTop ? 'l3-hchart__row--top' : ''}" style="animation-delay:${idx * 0.07}s">`;
    // Model name
    html += `<span class="l3-hchart__model-name">${item.name}</span>`;
    // Bar track with stacked segments
    html += `<div class="l3-hchart__bar-track" style="width:100%">`;
    item.values.forEach((v, di) => {
      const segPct = (v / maxTotal) * 100;
      html += `<div class="l3-hchart__seg" style="flex:${v} 0 0;background:${dims[di].color}" title="${dims[di][lang]}: ${v.toFixed(1)}">
        <span class="l3-hchart__seg-label">${v.toFixed(1)}</span>
      </div>`;
    });
    // Empty space to fill remaining width
    const remaining = maxTotal - item.total;
    if (remaining > 0) {
      html += `<div style="flex:${remaining} 0 0"></div>`;
    }
    html += `</div>`;
    // Score
    html += `<span class="l3-hchart__score">${item.total.toFixed(1)}</span>`;
    html += `</div>`;
  });
  html += `</div>`;

  html += `</div>`;
  container.innerHTML = html;
}


// ─────────────────────────────────────────────
// 6. INIT ALL FIGURES
// ─────────────────────────────────────────────

function initAllFigures() {
  createArchitectureDiagram('archDiagram');
  createRadarChart('radarChart');
  createEvalFramework('evalFramework');
  createL3BarChart('l3BarChart');
}

// Re-render on language change
function refreshFigures() {
  initAllFigures();
}

document.addEventListener('DOMContentLoaded', () => {
  // Delay slightly to ensure i18n is set up
  setTimeout(initAllFigures, 100);
});
