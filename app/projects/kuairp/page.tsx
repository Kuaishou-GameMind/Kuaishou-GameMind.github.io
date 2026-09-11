import SitePage from "@/components/sites/SitePage";

export const metadata = {
  title: "Kuairp 系列角色扮演模型技术报告 | Kuaishou GameMind Lab",
  description:
    "Kuairp series role-play models technical report — standardized role template, SFT data pipeline, reinforcement learning, and two-stage OPD on-policy distillation with the original CDD (Cumulative-Divergence Decay) mechanism.",
};

/* Inline lucide-style stroke icons (match homepage iconography) */
const ICO = {
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 10l-5.8 1.9L12 18l-1.9-5.8L4 10l5.8-1.9z"/><path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  drama: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>',
};

const BODY_HTML = `
<div class="grain" aria-hidden="true"></div>

<!-- ============ NAVBAR ============ -->
<nav class="navbar" id="navbar" aria-label="Primary">
  <div class="navbar__inner">
    <a href="/" class="navbar__logo" aria-label="Kuairp 1.0 home">
      <span class="navbar__logo-icon">${ICO.drama}</span>
      <span>Kuairp 1.0</span>
    </a>
    <div class="navbar__links">
      <a href="#goals" data-i18n="nav_goals">Features</a>
      <a href="#innovations" data-i18n="nav_innov">Core Innovations</a>
      <a href="#results" data-i18n="nav_results">Results</a>
    </div>
    <div class="navbar__actions">
      <div class="lang-switch" role="group" aria-label="Language">
        <button type="button" class="lang-btn" data-lang="en">EN</button>
        <button type="button" class="lang-btn" data-lang="zh">中文</button>
      </div>
      <button id="themeToggle" class="theme-toggle" type="button" aria-label="Toggle theme">
        <span class="icon-moon">${ICO.moon}</span>
        <span class="icon-sun">${ICO.sun}</span>
      </button>
      <a href="/" class="navbar__home" aria-label="Back to home">${ICO.home}</a>
      <button id="navBurger" class="navbar__burger" type="button" aria-label="Menu">${ICO.menu}</button>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="#goals" data-i18n="nav_goals">Features</a>
  <a href="#innovations" data-i18n="nav_innov">Core Innovations</a>
  <a href="#results" data-i18n="nav_results">Results</a>
</div>

<!-- ============ HERO ============ -->
<header class="hero" id="home">
  <div class="glow glow--top" aria-hidden="true"></div>
  <div class="grid-lines" aria-hidden="true"></div>
  <div class="hero__rule" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="hero__badge" data-aos="fade-up">
      <span class="hero__dot" aria-hidden="true"></span>
      <span class="hero__badge-text">Kuaishou GameMind Lab</span>
      <span class="hero__badge-sep">/</span>
      <span class="hero__badge-text" data-i18n="hero_badge_meta">Technical Report · Aug 2026</span>
    </div>

    <h1 class="hero__title">
      <span class="hero__title-line hero__title-line--accent" data-aos="fade-up" data-aos-delay="100">Kuairp1.0</span>
      <span class="hero__title-sub" data-aos="fade-up" data-aos-delay="200" data-i18n="hero_title_sub">Role-Play Models Technical Report</span>
    </h1>

    <div class="hero__authors" data-aos="fade-up" data-aos-delay="200">
      <span class="author">Yipeng Wang</span><span class="hero__badge-sep">·</span>
      <span class="author">Ziwei Zhang</span><span class="hero__badge-sep">·</span>
      <span class="author">Jiahui Zhang</span><span class="hero__badge-sep">·</span>
      <span class="author">Qi Gan</span><span class="hero__badge-sep">·</span>
      <span class="author">Kai Sheng</span>
      <span class="affil" data-i18n="hero_affil">Kuaishou GameMind Lab</span>
    </div>

    <p class="hero__desc" data-aos="fade-up" data-aos-delay="300" data-i18n="hero_desc">
      A complete technical recipe for the Kuairp series of role-play models.
    </p>

    <div class="hero__btns" data-aos="fade-up" data-aos-delay="300">
      <a href="https://arxiv.org/pdf/2609.11127" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        ${ICO.file}<span data-i18n="hero_btn_paper">Read Report</span>
      </a>
      <a href="#innovations" class="btn btn--ghost">
        <span data-i18n="hero_btn_innov">Explore Innovations</span>${ICO.arrowDown}
      </a>
    </div>
  </div>

  <div class="hero__scroll" aria-hidden="true">
    <div class="hero__scroll-line"></div>
    <span data-i18n="scroll_hint">Scroll</span>
  </div>
</header>

<main>
  <!-- ============ GOALS ============ -->
  <section class="section" id="goals">
    <div class="grid-lines" aria-hidden="true"></div>
    <div class="container">
      <div class="header-left" data-aos="fade-up">
        <p class="eyebrow" data-i18n="goals_eyebrow">Model Features</p>
        <h2 class="section-title" data-i18n="goals_title">Role-play tailored to game scenarios</h2>
        <p class="section-sub" data-i18n="goals_sub">A small dedicated model embeds role-play ability and domain world knowledge while preserving general tool-calling, to support diverse in-game play.</p>
      </div>
      <div class="goals-grid">
        <div class="goal-card" data-aos="fade-up">
          <div class="goal-card__idx">01</div>
          <div class="goal-card__icon">${ICO.zap}</div>
          <h3 class="goal-card__title" data-i18n="goal1_title">Small & Efficient</h3>
          <p class="goal-card__desc" data-i18n="goal1_desc">Goal 1 desc.</p>
        </div>
        <div class="goal-card" data-aos="fade-up" data-aos-delay="100">
          <div class="goal-card__idx">02</div>
          <div class="goal-card__icon">${ICO.sparkles}</div>
          <h3 class="goal-card__title" data-i18n="goal2_title">Prompt-Engineering Friendly</h3>
          <p class="goal-card__desc" data-i18n="goal2_desc">Goal 2 desc.</p>
        </div>
        <div class="goal-card" data-aos="fade-up" data-aos-delay="200">
          <div class="goal-card__idx">03</div>
          <div class="goal-card__icon">${ICO.globe}</div>
          <h3 class="goal-card__title" data-i18n="goal3_title">Built-in World Knowledge</h3>
          <p class="goal-card__desc" data-i18n="goal3_desc">Goal 3 desc.</p>
        </div>
        <div class="goal-card" data-aos="fade-up" data-aos-delay="300">
          <div class="goal-card__idx">04</div>
          <div class="goal-card__icon">${ICO.shield}</div>
          <h3 class="goal-card__title" data-i18n="goal4_title">General Tool-Calling Ability</h3>
          <p class="goal-card__desc" data-i18n="goal4_desc">Goal 4 desc.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CORE INNOVATIONS (Method + CDD merged) ============ -->
  <section class="section" id="innovations">
    <div class="glow glow--mouse" aria-hidden="true"></div>
    <div class="container">
      <div class="header-left" data-aos="fade-up">
        <p class="eyebrow" data-i18n="innov_eyebrow">Core Innovations</p>
        <h2 class="section-title" data-i18n="innov_title">Three Core Innovations</h2>
        <p class="section-sub" data-i18n="innov_sub">From the SFT data pipeline and reinforcement learning to two-stage OPD on-policy distillation — with CDD at its core.</p>
      </div>

      <!-- 01 High-quality SFT data pipeline -->
      <div class="method" data-aos="fade-up">
        <aside class="method__aside">
          <div class="method__num" data-i18n="m_sft_num">INNOVATION 01</div>
          <h3 class="method__name" data-i18n="m_sft_name">High-Quality SFT Data Synthesis Pipeline</h3>
        </aside>
        <div class="method__body">
          <div class="feat-list">
            <div class="feat-item">
              <span class="feat-item__bullet">${ICO.check}</span>
              <div>
                <div class="feat-item__title" data-i18n="m_sft_feat1_title">Instruction-injected user behavior</div>
                <div class="feat-item__desc" data-i18n="m_sft_feat1_desc">Feat 1 desc.</div>
              </div>
            </div>
            <div class="feat-item">
              <span class="feat-item__bullet">${ICO.check}</span>
              <div>
                <div class="feat-item__title" data-i18n="m_sft_feat2_title">Reverse Profile Filtering (RPF)</div>
                <div class="feat-item__desc" data-i18n="m_sft_feat2_desc">Feat 2 desc.</div>
              </div>
            </div>
            <div class="feat-item">
              <span class="feat-item__bullet">${ICO.check}</span>
              <div>
                <div class="feat-item__title" data-i18n="m_sft_feat3_title">Turn-count stratified sampling</div>
                <div class="feat-item__desc" data-i18n="m_sft_feat3_desc">Feat 3 desc.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 02 Domain-adaptation pipeline that preserves general ability (RL + OPD) -->
      <div class="method" data-aos="fade-up">
        <aside class="method__aside">
          <div class="method__num" data-i18n="m_rl_num">INNOVATION 02</div>
          <h3 class="method__name" data-i18n="innov2_name">Domain-Adaptation Training That Preserves General Ability</h3>
        </aside>
        <div class="method__body">
          <!-- Training pipeline diagram (single figure, animated flow) -->
          <div class="pipeline">
            <div class="pipeline__phase">
              <div class="pipeline__phase-head">
                <span class="pipeline__phase-tag" data-i18n="pipe_p1_tag">PHASE 1</span>
                <span class="pipeline__phase-name" data-i18n="pipe_p1">Domain Expert Training</span>
              </div>
              <div class="pipeline__flow">
                <span class="pipeline__node pipeline__node--gm pipe-glow" style="--d:0s" data-i18n="pipe_gm">General Model</span>
                <span class="pipeline__arrow pipe-arrow" style="--d:0.65s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--step pipe-glow" style="--d:1.3s" data-i18n="pipe_sft">SFT</span>
                <span class="pipeline__arrow pipe-arrow" style="--d:1.95s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--step pipe-glow" style="--d:2.6s" data-i18n="pipe_rl">RL</span>
                <span class="pipeline__arrow pipe-arrow" style="--d:3.25s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--out pipe-glow" style="--d:3.9s" data-i18n="pipe_de">Domain Expert</span>
              </div>
            </div>

            <div class="pipeline__link pipe-arrow" style="--d:4.55s" aria-hidden="true">${ICO.arrowDown}</div>

            <div class="pipeline__phase">
              <div class="pipeline__phase-head">
                <span class="pipeline__phase-tag" data-i18n="pipe_p2_tag">PHASE 2</span>
                <span class="pipeline__phase-name" data-i18n="pipe_p2">OPD Alignment & Fusion</span>
              </div>
              <div class="pipeline__flow">
                <div class="pipeline__inputs">
                  <span class="pipeline__node pipeline__node--gm pipe-glow" style="--d:5.2s" data-i18n="pipe_gm">General Model</span>
                  <span class="pipeline__node pipeline__node--out pipe-glow" style="--d:5.2s" data-i18n="pipe_de">Domain Expert</span>
                </div>
                <span class="pipeline__arrow pipe-arrow" style="--d:5.85s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--step pipe-glow" style="--d:6.5s" data-i18n="pipe_opd1">OPD-stage1</span>
                <span class="pipeline__arrow pipe-arrow" style="--d:7.15s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--step pipe-glow" style="--d:7.8s" data-i18n="pipe_opd2">OPD-stage2</span>
                <span class="pipeline__arrow pipe-arrow" style="--d:8.45s">${ICO.arrowRight}</span>
                <span class="pipeline__node pipeline__node--out pipe-glow" style="--d:9.1s" data-i18n="pipe_fde">Expert with<br/>General Ability</span>
              </div>
            </div>
          </div>

          <div class="feat-list">
            <div class="feat-item pipe-card" style="--d:6.5s">
              <span class="feat-item__bullet">${ICO.check}</span>
              <div>
                <div class="feat-item__title" data-i18n="m_opd_stage1_title">OPD Stage 1: inject format &amp; style into the general model</div>
                <div class="feat-item__desc" data-i18n="m_opd_stage1_desc">Stage 1 desc.</div>
              </div>
            </div>
            <div class="feat-item pipe-card" style="--d:7.8s">
              <span class="feat-item__bullet">${ICO.check}</span>
              <div>
                <div class="feat-item__title" data-i18n="m_opd_stage2_title">OPD Stage 2: inject world knowledge into the general model</div>
                <div class="feat-item__desc" data-i18n="m_opd_stage2_desc">Stage 2 desc.</div>
              </div>
            </div>
          </div>
          <a href="#cdd" class="btn btn--ghost" style="margin-top:6px">
            <span data-i18n="m_opd_cdd_btn">Dive into CDD</span>${ICO.arrowDown}
          </a>
        </div>
      </div>

      <!-- 03 OPD gradient-noise suppression: CDD -->
      <div class="method" data-aos="fade-up" id="cdd">
        <aside class="method__aside">
          <div class="method__num" data-i18n="m_opd_num">INNOVATION 03</div>
          <h3 class="method__name" data-i18n="m_opd_name">OPD Gradient-Noise Suppression: CDD</h3>
        </aside>
        <div class="method__body">
          <div class="cdd-panel">
            <h2 class="cdd-title" data-i18n="cdd_title">Cumulative-Divergence Decay (CDD)</h2>

            <div class="cdd-label" data-i18n="cdd_mech_label">The mechanism</div>
            <div class="cdd-anim">
              <div class="cdd-anim__grid">
                <div class="cdd-anim__rail">
                  <span class="cdd-anim__node cdd-anim__node--student" data-i18n="cdd_student">Student</span>
                </div>
                <span class="cdd-anim__tok">T1</span>
                <span class="cdd-anim__tok">T2</span>
                <span class="cdd-anim__tok">T3</span>
                <span class="cdd-anim__tok">T4</span>
                <span class="cdd-anim__tok">T5</span>
                <span class="cdd-anim__tok">T6</span>

                <div class="cdd-anim__rail cdd-anim__rail--teacher">
                  <span class="cdd-anim__node cdd-anim__node--teacher" data-i18n="cdd_teacher">Teacher</span>
                </div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:10%"></i></div><span class="cdd-anim__tag">d1</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:14%"></i></div><span class="cdd-anim__tag">d2</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:18%"></i></div><span class="cdd-anim__tag">d3</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:22%"></i></div><span class="cdd-anim__tag">d4</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:16%"></i></div><span class="cdd-anim__tag">d5</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--div" style="--h:10%"></i></div><span class="cdd-anim__tag">d6</span></div>

                <span class="cdd-anim__rail" aria-hidden="true"></span>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:10%"></i></div><span class="cdd-anim__tag">c1</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:24%"></i></div><span class="cdd-anim__tag">c2</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:42%"></i></div><span class="cdd-anim__tag">c3</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:64%"></i></div><span class="cdd-anim__tag">c4</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:80%"></i></div><span class="cdd-anim__tag">c5</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--cum" style="--h:90%"></i></div><span class="cdd-anim__tag">c6</span></div>

                <span class="cdd-anim__rail" aria-hidden="true"></span>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:100%"></i></div><span class="cdd-anim__tag">w1</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:88%"></i></div><span class="cdd-anim__tag">w2</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:72%"></i></div><span class="cdd-anim__tag">w3</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:55%"></i></div><span class="cdd-anim__tag">w4</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:40%"></i></div><span class="cdd-anim__tag">w5</span></div>
                <div class="cdd-anim__cell"><div class="cdd-anim__track"><i class="cdd-anim__bar cdd-anim__bar--w" style="--h:30%"></i></div><span class="cdd-anim__tag">w6</span></div>

                <div class="cdd-anim__rail">
                  <span class="cdd-anim__sum">Σ</span>
                </div>
                <div class="cdd-anim__lbox">
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l1</span></div>
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l2</span></div>
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l3</span></div>
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l4</span></div>
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l5</span></div>
                  <div class="cdd-anim__cell cdd-anim__cell--l"><span class="cdd-anim__l">l6</span></div>
                </div>
              </div>

              <p class="cdd-anim__note" data-i18n="cdd_anim_note"><code>di</code>: the student-teacher divergence for token i<br/><code>ci</code>: the student-teacher divergence for token i<br/><code>wi</code>: the loss weight for token i<br/><code>li</code>: the weighted loss for token i<br/>All <code>li</code> are summed to update the Student.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ RESULTS ============ -->
  <section class="section" id="results">
    <div class="grid-lines" aria-hidden="true"></div>
    <div class="container">
      <div class="header-left" data-aos="fade-up">
        <p class="eyebrow" data-i18n="res_eyebrow">Evaluation Results</p>
        <h2 class="section-title" data-i18n="res_title">Domain ability peaks, general ability preserved</h2>
      </div>

      <div class="chart-legend" data-aos="fade-up">
        <span class="legend-item"><i class="legend-dot legend-dot--base"></i>qwen3-8b (baseline)</span>
        <span class="legend-item"><i class="legend-dot legend-dot--kuairp"></i>Kuairp 1.0<sup class="fn-mark">†</sup></span>
        <span class="legend-item"><i class="legend-dot legend-dot--m2her"></i>M2-HER</span>
      </div>

      <div class="chart-scroll" data-aos="fade-up">
        <div class="chart">
          <div class="chart__barsrow">
            <div class="chart__y" aria-hidden="true">
              <span class="chart__y-line" style="bottom:0%"></span>
              <span class="chart__y-line" style="bottom:25%"></span>
              <span class="chart__y-line" style="bottom:50%"></span>
              <span class="chart__y-line" style="bottom:75%"></span>
              <span class="chart__y-line" style="bottom:100%"></span>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">85.14</span><div class="bar bar--base" style="--h:0.8514"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">92.08</span><div class="bar bar--kuairp" style="--h:0.9208"></div></div>
              <div class="bar-col"><span class="bar-val">89.22</span><div class="bar bar--m2her" style="--h:0.8922"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">60.00</span><div class="bar bar--base" style="--h:0.6000"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">72.50</span><div class="bar bar--kuairp" style="--h:0.7250"></div></div>
              <div class="bar-col"><span class="bar-val">60.00</span><div class="bar bar--m2her" style="--h:0.6000"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">61.48</span><div class="bar bar--base" style="--h:0.6148"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">97.44</span><div class="bar bar--kuairp" style="--h:0.9744"></div></div>
              <div class="bar-col"><span class="bar-val">98.89</span><div class="bar bar--m2her" style="--h:0.9889"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">97.57</span><div class="bar bar--base" style="--h:0.9757"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">99.12</span><div class="bar bar--kuairp" style="--h:0.9912"></div></div>
              <div class="bar-col"><span class="bar-val">99.62</span><div class="bar bar--m2her" style="--h:0.9962"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">93.75</span><div class="bar bar--base" style="--h:0.9375"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">100.00</span><div class="bar bar--kuairp" style="--h:1.0000"></div></div>
              <div class="bar-col"><span class="bar-val">96.40</span><div class="bar bar--m2her" style="--h:0.9640"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">1.90</span><div class="bar bar--base" style="--h:0.0190"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">32.86</span><div class="bar bar--kuairp" style="--h:0.3286"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--na">n/a</span><div class="bar bar--na"></div></div>
            </div>
            <div class="chart-group">
              <div class="bar-col"><span class="bar-val">24.83</span><div class="bar bar--base" style="--h:0.2483"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--hl">24.78</span><div class="bar bar--kuairp" style="--h:0.2478"></div></div>
              <div class="bar-col"><span class="bar-val bar-val--na">n/a</span><div class="bar bar--na"></div></div>
            </div>
          </div>
          <div class="chart__labelsrow">
            <div class="chart-label" data-i18n="axis_char">Char-Consist.</div>
            <div class="chart-label" data-i18n="axis_mem">Memory</div>
            <div class="chart-label" data-i18n="axis_div">Diversity</div>
            <div class="chart-label" data-i18n="axis_lang">LangQuality</div>
            <div class="chart-label" data-i18n="axis_len">Length</div>
            <div class="chart-label" data-i18n="axis_know">World Knowledge<sup class="fn-mark">‡</sup></div>
            <div class="chart-label" data-i18n="axis_tool">Tool Calling<sup class="fn-mark">*‡</sup></div>
          </div>
        </div>
      </div>

      <p class="chart-note chart-foot" data-aos="fade-up" data-i18n="chart_footnote_bfcl">BFCL footnote.</p>
      <p class="chart-note chart-foot" data-aos="fade-up" data-i18n="chart_footnote_kuairp">Kuairp footnote.</p>
      <p class="chart-note chart-foot" data-aos="fade-up" data-i18n="chart_footnote_m2her">M2-HER footnote.</p>
      <p class="chart-note chart-foot" data-aos="fade-up">
        <a href="https://arxiv.org/pdf/2609.11127" target="_blank" rel="noopener noreferrer" class="chart-more" data-i18n="chart_footnote_more">More comparison data in our report</a>
      </p>

      <div class="points" data-aos="fade-up">
        <div class="point">
          <span class="point__icon">${ICO.check}</span>
          <div>
            <div class="point__title" data-i18n="res_point1_title">Domain role-play ability greatly improved</div>
            <div class="point__desc" data-i18n="res_point1_desc">Point 1 desc.</div>
          </div>
        </div>
        <div class="point">
          <span class="point__icon">${ICO.check}</span>
          <div>
            <div class="point__title" data-i18n="res_point2_title">Domain world knowledge internalized</div>
            <div class="point__desc" data-i18n="res_point2_desc">Point 2 desc.</div>
          </div>
        </div>
        <div class="point">
          <span class="point__icon">${ICO.check}</span>
          <div>
            <div class="point__title" data-i18n="res_point3_title">General tool-calling ability preserved</div>
            <div class="point__desc" data-i18n="res_point3_desc">Point 3 desc.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- ============ FOOTER ============ -->
<footer class="footer">
  <div class="footer__glow" aria-hidden="true"></div>
  <div class="container footer__inner">
    <div class="footer__bottom">
      <div class="footer__brand">
        <img src="/logo.svg" alt="" width="30" height="30" />
        <span data-i18n="footer_tagline">Kuaishou GameMind Lab</span>
      </div>
      <div class="footer__links">
        <a href="/" data-i18n="footer_link_home">Back to Home</a>
        <a href="https://arxiv.org/pdf/2609.11127" target="_blank" rel="noopener noreferrer" data-i18n="footer_link_paper">Read Report</a>
      </div>
      <div class="footer__copy" data-i18n="footer_copy">© 2026 Kuaishou GameMind Lab</div>
    </div>
  </div>
</footer>
`;

export default function KuairpPage() {
  return (
    <SitePage
      bodyHtml={BODY_HTML}
      stylesheets={[
        { href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" },
        { href: "/projects/kuairp/style.css?v=11" },
      ]}
      scripts={[
        { src: "/_shared/ui.js", strategy: "beforeInteractive" },
        { src: "/projects/kuairp/script.js?v=9" },
      ]}
    />
  );
}
