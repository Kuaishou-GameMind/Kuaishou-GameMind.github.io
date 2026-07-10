/* TRACE BENCH interactive trace and paper-aligned leaderboard. */

const LEADERBOARD_FILES = {
  all: 'leaderboard/Leaderboard-Agentic.csv',
  ce: 'leaderboard/Leaderboard-Agentic-subsec-CE.csv',
  scenario: 'leaderboard/Leaderboard-Agentic-subsec-NonCE.csv',
};

const leaderboardCache = {};
const leaderboardState = {
  tab: 'all',
  view: window.innerWidth < 768 ? 'chart' : 'table',
  sortKey: 'Rank',
  sortDirection: 'asc',
  search: '',
};

function getLang() {
  return typeof currentLang === 'undefined' ? 'en' : currentLang;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getFigureText() {
  const lang = getLang();
  const copy = {
    en: {
      user: 'User Agent',
      target: 'Roleplay Model',
      private: 'Private checklist update',
      response: 'response',
      stateEvidence: 'state / evidence',
      live: 'live',
      userLine: 'You were asked to guide me, not hide records. What changed?',
      targetLine: 'A blue ward lit near the archive. Report it before moonrise.',
      evidence: 'Evidence: archive ward and deadline stated',
      checklist: 'Live tracker',
      identity: 'Stay in role',
      world: 'Maintain world knowledge',
      goal: 'Follow goal',
      relation: 'Remember relationship',
      done: 'completed',
      progress: 'in progress',
      pending: 'pending',
      all: 'All 200 cases',
      ce: '78 CharacterEval-derived',
      scenario: '122 scenario-generated',
      search: 'Search models',
      table: 'Table',
      chart: 'Chart',
      model: 'Model',
      type: 'Type',
      loading: 'Loading paper results...',
      empty: 'No models match this search.',
      error: 'Leaderboard data could not be loaded.',
      rankHint: 'Official paper rank remains fixed when sorting or filtering.',
      diagnostic: 'Diagnostic only',
    },
    zh: {
      user: 'User Agent',
      target: 'Roleplay Model',
      private: '私有清单更新',
      response: '回复',
      stateEvidence: '状态 / 证据',
      live: '在线',
      userLine: '你应该带我行动，而不是隐瞒记录。到底发生了什么？',
      targetLine: '档案馆附近亮起了蓝色结界，必须在月升前上报。',
      evidence: '证据：给出了档案馆结界与截止时间',
      checklist: '在线追踪器',
      identity: '保持角色身份',
      world: '维持世界知识',
      goal: '遵循交互目标',
      relation: '记住人物关系',
      done: '已完成',
      progress: '进行中',
      pending: '待测试',
      all: '全部 200 用例',
      ce: '78 个 CharacterEval 衍生用例',
      scenario: '122 个场景生成用例',
      search: '搜索模型',
      table: '表格',
      chart: '图表',
      model: '模型',
      type: '类型',
      loading: '正在加载论文结果...',
      empty: '没有匹配的模型。',
      error: '排行榜数据加载失败。',
      rankHint: '排序或筛选时，论文官方排名保持不变。',
      diagnostic: '仅作诊断',
    },
  };
  return copy[lang];
}

function createHeroFigure(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const t = getFigureText();

  container.innerHTML = `
    <div class="trace-console">
      <div class="trace-console__topbar">
        <span><i></i><i></i><i></i></span>
        <code>trace/session_042</code>
        <span class="trace-console__live">${t.live}</span>
      </div>
      <div class="trace-console__dialogue">
        <div class="trace-message trace-message--user">
          <span>${t.user}</span>
          <p>${t.userLine}</p>
        </div>
        <div class="trace-connector"><span>${t.response}</span></div>
        <div class="trace-message trace-message--target">
          <span>${t.target}</span>
          <p>${t.targetLine}</p>
        </div>
        <div class="trace-tool">
          <div class="trace-tool__head"><i class="fa-solid fa-lock"></i>${t.private}</div>
          <code>C3: pending -&gt; completed</code>
          <small>${t.evidence}</small>
        </div>
      </div>
      <div class="trace-console__tracker">
        <div class="trace-console__tracker-head">
          <span>${t.checklist}</span><span>${t.stateEvidence}</span>
        </div>
        <div><span>C1 ${t.identity}</span><em class="status status--done">${t.done}</em></div>
        <div><span>C2 ${t.relation}</span><em class="status status--done">${t.done}</em></div>
        <div class="trace-console__highlight"><span>C3 ${t.world}</span><em class="status status--done">${t.done}</em></div>
        <div><span>C4 ${t.goal}</span><em class="status status--progress">${t.progress}</em></div>
        <div><span>C5 STM probe</span><em class="status status--pending">${t.pending}</em></div>
      </div>
    </div>`;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(',');
  return lines.map((line) => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
  });
}

async function loadLeaderboard(tab) {
  if (leaderboardCache[tab]) return leaderboardCache[tab];
  const response = await fetch(LEADERBOARD_FILES[tab]);
  if (!response.ok) throw new Error(`Failed to load ${LEADERBOARD_FILES[tab]}`);
  const data = parseCsv(await response.text());
  leaderboardCache[tab] = data;
  return data;
}

function getLeaderboardColumns(tab, t) {
  const columns = [
    { key: 'Rank', label: '#', numeric: true },
    { key: 'Model', label: t.model, numeric: false },
  ];
  if (tab === 'all') columns.push({ key: 'Type', label: t.type, numeric: false });
  columns.push(
    { key: 'Overall', label: 'Overall', numeric: true, highlight: true },
    { key: 'CC', label: 'CC', numeric: true },
    { key: 'STM', label: 'STM', numeric: true },
    { key: 'Diversity', label: 'Diversity', numeric: true },
    { key: 'LQ', label: 'LQ', numeric: true },
    { key: 'Length', label: 'Length', numeric: true },
  );
  if (tab === 'all')
    columns.push({ key: 'CtoF', label: 'C->F ↓', numeric: true, diagnostic: true });
  return columns;
}

function getVisibleRows(rows) {
  const query = leaderboardState.search.trim().toLowerCase();
  const filtered = query
    ? rows.filter((row) => row.Model.toLowerCase().includes(query))
    : [...rows];
  const key = leaderboardState.sortKey;
  const direction = leaderboardState.sortDirection === 'asc' ? 1 : -1;
  return filtered.sort((a, b) => {
    const numeric = key !== 'Model' && key !== 'Type';
    const comparison = numeric
      ? Number(a[key]) - Number(b[key])
      : String(a[key]).localeCompare(String(b[key]));
    return comparison * direction;
  });
}

function renderTable(rows, columns, t) {
  if (!rows.length) return `<p class="lb-empty">${t.empty}</p>`;
  const headers = columns
    .map((column) => {
      const active = leaderboardState.sortKey === column.key;
      const arrow = active ? (leaderboardState.sortDirection === 'asc' ? 'up' : 'down') : 'sort';
      const title = column.diagnostic ? ` title="${t.diagnostic}"` : '';
      const ariaSort = active
        ? leaderboardState.sortDirection === 'asc'
          ? 'ascending'
          : 'descending'
        : 'none';
      return `<th scope="col" aria-sort="${ariaSort}"${title}><button type="button" data-sort="${column.key}" class="${active ? 'active' : ''}">${column.label}<i class="fa-solid fa-${arrow}"></i></button></th>`;
    })
    .join('');
  const body = rows
    .map((row) => {
      const rank = Number(row.Rank);
      const cells = columns
        .map((column) => {
          const value = escapeHtml(row[column.key]);
          const classes = [
            column.highlight ? 'lb-overall' : '',
            column.key === 'Model' ? 'lb-model' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return `<td class="${classes}">${value}</td>`;
        })
        .join('');
      return `<tr class="${rank <= 3 ? `lb-top lb-top--${rank}` : ''}">${cells}</tr>`;
    })
    .join('');
  return `<div class="lb-table-wrap"><table class="lb-table"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderChart(rows, t) {
  if (!rows.length) return `<p class="lb-empty">${t.empty}</p>`;
  const bars = rows
    .map((row) => {
      const rank = Number(row.Rank);
      const score = Number(row.Overall);
      return `<div class="lb-chart-row ${rank <= 3 ? `lb-chart-row--${rank}` : ''}">
        <span class="lb-chart-rank">${rank}</span>
        <span class="lb-chart-model" title="${escapeHtml(row.Model)}">${escapeHtml(row.Model)}</span>
        <div class="lb-chart-track"><span style="width:${score}%"></span></div>
        <strong>${score.toFixed(2)}</strong>
      </div>`;
    })
    .join('');
  return `<div class="lb-chart">${bars}</div>`;
}

function renderLeaderboardContent(container, rows) {
  const t = getFigureText();
  const visibleRows = getVisibleRows(rows);
  const columns = getLeaderboardColumns(leaderboardState.tab, t);
  const output = container.querySelector('[data-lb-output]');
  output.innerHTML =
    leaderboardState.view === 'table'
      ? renderTable(visibleRows, columns, t)
      : renderChart(visibleRows, t);
  bindSortControls(container, rows);
}

function bindSortControls(container, rows) {
  container.querySelectorAll('[data-sort]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.sort;
      if (leaderboardState.sortKey === key) {
        leaderboardState.sortDirection = leaderboardState.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        leaderboardState.sortKey = key;
        leaderboardState.sortDirection =
          key === 'Rank' || key === 'Model' || key === 'CtoF' ? 'asc' : 'desc';
      }
      renderLeaderboardContent(container, rows);
    });
  });
}

function leaderboardShell(t) {
  const tabs = [
    ['all', t.all],
    ['ce', t.ce],
    ['scenario', t.scenario],
  ];
  return `
    <div class="lb-controls">
      <div class="lb-tabs" role="tablist">
        ${tabs.map(([key, label]) => `<button type="button" role="tab" data-lb-tab="${key}" aria-controls="leaderboardOutput" aria-selected="${leaderboardState.tab === key}" tabindex="${leaderboardState.tab === key ? '0' : '-1'}" class="${leaderboardState.tab === key ? 'active' : ''}">${label}</button>`).join('')}
      </div>
      <div class="lb-tools">
        <label class="lb-search"><i class="fa-solid fa-magnifying-glass"></i><span class="sr-only">${t.search}</span><input type="search" data-lb-search placeholder="${t.search}" value="${escapeHtml(leaderboardState.search)}" /></label>
        <div class="lb-view-toggle">
          <button type="button" data-lb-view="table" aria-pressed="${leaderboardState.view === 'table'}" class="${leaderboardState.view === 'table' ? 'active' : ''}">${t.table}</button>
          <button type="button" data-lb-view="chart" aria-pressed="${leaderboardState.view === 'chart'}" class="${leaderboardState.view === 'chart' ? 'active' : ''}">${t.chart}</button>
        </div>
      </div>
    </div>
    <p class="lb-rank-hint"><i class="fa-solid fa-circle-info"></i>${t.rankHint}</p>
    <div id="leaderboardOutput" role="tabpanel" data-lb-output><p class="lb-loading"><i class="fa-solid fa-spinner fa-spin"></i>${t.loading}</p></div>`;
}

function bindLeaderboardControls(container, rows) {
  container.querySelectorAll('[data-lb-tab]').forEach((button) => {
    button.addEventListener('click', async () => {
      leaderboardState.tab = button.dataset.lbTab;
      leaderboardState.sortKey = 'Rank';
      leaderboardState.sortDirection = 'asc';
      await createLeaderboard(container.id);
    });
  });
  container.querySelector('[data-lb-search]').addEventListener('input', (event) => {
    leaderboardState.search = event.target.value;
    renderLeaderboardContent(container, rows);
  });
  container.querySelectorAll('[data-lb-view]').forEach((button) => {
    button.addEventListener('click', () => {
      leaderboardState.view = button.dataset.lbView;
      container.querySelectorAll('[data-lb-view]').forEach((item) => {
        const active = item.dataset.lbView === leaderboardState.view;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderLeaderboardContent(container, rows);
    });
  });
}

async function createLeaderboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const t = getFigureText();
  container.innerHTML = leaderboardShell(t);
  try {
    const rows = await loadLeaderboard(leaderboardState.tab);
    renderLeaderboardContent(container, rows);
    bindLeaderboardControls(container, rows);
  } catch {
    container.querySelector('[data-lb-output]').innerHTML = `<p class="lb-empty">${t.error}</p>`;
  }
}

function initAllFigures() {
  createHeroFigure('heroFigure');
  createLeaderboard('leaderboardChart');
}

function refreshFigures() {
  initAllFigures();
}
