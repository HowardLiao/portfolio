/**
 * 廖倫豪 博士 (Howard Liao, Ph.D.) 互動式個人網站與戰略檔案 - Single Page Application
 * 100% Full Trilingual Support (ZH / EN / JP) & Offline Compatible (file:// and http://)
 * First-Person Narrative ("我") & Anonymous Group Title
 */

(function() {
  'use strict';

  // Application State
  const state = {
    profile: null,
    timeline: [],
    sources: [],
    inventory: [],
    verificationLog: [],
    
    currentTab: 'dashboard',
    currentLang: 'zh', // 'zh', 'en', 'jp'
    theme: localStorage.getItem('hl_theme') || 'dark',
    
    filters: {
      search: '',
      sort: 'desc',
      category: 'all',
      org: 'all',
      tag: 'all',
      status: 'all',
      confidence: 'all',
      showExcluded: false,
      year: 'all'
    }
  };

  const i18n = {
    zh: {
      siteTitle: '廖倫豪 博士 | 跨國企業技術副總 (VP) 暨 資訊長 (CIO) & 資安長 (CISO) 戰略資歷檔案',
      verifiedBadge: '✓ 雙重驗證',
      dashboard: '📊 首頁儀表板',
      timeline: '⏳ 職涯時間軸',
      education: '🎓 學歷與研究',
      experience: '🏢 工作與專案',
      media: '🎤 演講與媒體',
      proposal: '💡 專案建議書',
      portfolio: '🖼️ 本機作品集',
      sources: '🔍 來源與查證',
      searchPlaceholder: '全站關鍵字搜尋 (如: 多雲, FinOps, GKE)...',
      coverLetterBtn: '✉️ 自薦信',
      verified: '已驗證',
      pending: '待確認',
      excluded: '已排除同名',
      all: '全部',

      kpiTitle: '⚡ 戰略營運與技術成效 Dashboard (Bento Grid)',
      kpi1_val: '+55%', kpi1_lbl: 'AI 運維自動化效率', kpi1_desc: 'Agentic AI 運維自動化與工單處理',
      kpi2_val: '-30%', kpi2_lbl: '跨國多雲架構成本', kpi2_desc: 'FinOps 多雲容器部署與資源治理',
      kpi3_val: '+15%', kpi3_lbl: '智慧製造產品良率', kpi3_desc: 'AI 預測模型與大數據生產優化',
      kpi4_val: '100%', kpi4_lbl: 'Zero Outage 零停機', kpi4_desc: '六朵雲 GKE 與 MongoDB Atlas 全託管',

      statConfirmed: '已驗證資料 (Confirmed)',
      statPending: '待確認資料 (Pending)',
      statExcluded: '已排除同名 (Excluded)',

      vizTitle: '📊 動態資料視覺化 (Dynamic Visualizations)',
      vizYearly: '📈 職涯年度事件分布圖 (點擊年份篩選)',
      vizRadar: '🕸️ 專業領域與技能關聯圖',
      vizDonut: '🛡️ 資料查證狀態儀表板',
      vizSource: '📚 資料來源管道分布',

      highlightsTitle: '🌟 最新重點核實事件 (Verified Highlights)',

      sortDesc: '⏳ 由近到遠排序',
      sortAsc: '⌛ 由遠到近排序',
      allCat: '📁 所有類別',
      catExp: '🏢 工作經歷',
      catEdu: '🎓 學歷與研究',
      catMedia: '🎤 媒體與演講',
      catCert: '📜 證照與專案',
      allStatus: '🛡️ 所有驗證狀態',
      showExcludedCheckbox: '顯示已排除同名資料',
      clearFilters: '清除所有條件',
      showingCount: '顯示條件結果：',
      viewDetail: '查看細節與佐證 ↗',

      coverLetterTitle: '廖倫豪 博士 - 高階資訊主管 (CIO/CISO/VP) 全球銀行級求職自薦信',
      copySuccess: '自薦信已成功複製到剪貼簿！'
    },
    en: {
      siteTitle: 'Howard Liao, Ph.D. | VP of Tech / CIO & CISO Executive Portfolio',
      verifiedBadge: '✓ Verified',
      dashboard: '📊 Dashboard',
      timeline: '⏳ Timeline',
      education: '🎓 Education',
      experience: '🏢 Experience',
      media: '🎤 Speeches & Media',
      proposal: '💡 Proposals',
      portfolio: '🖼️ Portfolio',
      sources: '🔍 Verification',
      searchPlaceholder: 'Search site...',
      coverLetterBtn: '✉️ Cover Letter',
      verified: 'Verified',
      pending: 'Pending',
      excluded: 'Excluded',
      all: 'All',

      kpiTitle: '⚡ Strategic Operations & Technology Impact Dashboard',
      kpi1_val: '+55%', kpi1_lbl: 'AI Operations Efficiency', kpi1_desc: 'Agentic AI automated ticket processing',
      kpi2_val: '-30%', kpi2_lbl: 'Multi-cloud FinOps Cost', kpi2_desc: 'Multi-cloud container resource governance',
      kpi3_val: '+15%', kpi3_lbl: 'Smart Manufacturing Yield', kpi3_desc: 'AI yield prediction model optimization',
      kpi4_val: '100%', kpi4_lbl: 'Zero Outage Record', kpi4_desc: '6-Cloud GKE & MongoDB Atlas Managed',

      statConfirmed: 'Verified Data (Confirmed)',
      statPending: 'Pending Items (Pending)',
      statExcluded: 'Excluded Homonyms (Excluded)',

      vizTitle: '📊 Dynamic Data Visualizations',
      vizYearly: '📈 Yearly Event Distribution (Click year to filter)',
      vizRadar: '🕸️ Tech Domain & Skill Network',
      vizDonut: '🛡️ Verification Breakdown',
      vizSource: '📚 Data Source Distribution',

      highlightsTitle: '🌟 Key Verified Highlights',

      sortDesc: '⏳ Newest First',
      sortAsc: '⌛ Oldest First',
      allCat: '📁 All Categories',
      catExp: '🏢 Experience',
      catEdu: '🎓 Education',
      catMedia: '🎤 Speeches & Media',
      catCert: '📜 Certifications',
      allStatus: '🛡️ All Statuses',
      showExcludedCheckbox: 'Show Excluded Homonym Data',
      clearFilters: 'Clear Filters',
      showingCount: 'Matching Records: ',
      viewDetail: 'View Evidence & Details ↗',

      coverLetterTitle: 'Dr. Howard Liao - Executive CIO/CISO Cover Letter',
      copySuccess: 'Cover letter successfully copied to clipboard!'
    },
    jp: {
      siteTitle: '廖倫豪 博士 | 企業技術副社長 兼 CIO & CISO ポータル',
      verifiedBadge: '✓ 検証済み',
      dashboard: '📊 ダッシュボード',
      timeline: '⏳ 経歴タイムライン',
      education: '🎓 学歷・研究',
      experience: '🏢 職歴・実績',
      media: '🎤 講演・メディア',
      proposal: '💡 提案書',
      portfolio: '🖼️ 作品・実績集',
      sources: '🔍 出所・検証',
      searchPlaceholder: 'サイト内検索...',
      coverLetterBtn: '✉️ カバーレター',
      verified: '検証済み',
      pending: '確認中',
      excluded: '除外',
      all: 'すべて',

      kpiTitle: '⚡ 戦略運用および技術成效ダッシュボード (Bento Grid)',
      kpi1_val: '+55%', kpi1_lbl: 'AI 運用自動化効率', kpi1_desc: 'Agentic AI 運用自動化とチケット処理',
      kpi2_val: '-30%', kpi2_lbl: 'マルチクラウドFinOpsコスト', kpi2_desc: 'コンテナ資源ガバナンスと最適化',
      kpi3_val: '+15%', kpi3_lbl: 'スマート製造歩留まり', kpi3_desc: 'AI 予測モデルによる品質改善',
      kpi4_val: '100%', kpi4_lbl: 'Zero Outage (障害ゼロ)', kpi4_desc: '6クラウド GKE & MongoDB Atlas 運用',

      statConfirmed: '検証済みデータ (Confirmed)',
      statPending: '確認待ち項目 (Pending)',
      statExcluded: '除外同姓同名 (Excluded)',

      vizTitle: '📊 動的データビジュアル',
      vizYearly: '📈 年次イベント分布図 (クリックで絞り込み)',
      vizRadar: '🕸️ 専門領域とスキルネットワーク',
      vizDonut: '🛡️ データ検証ステータス',
      vizSource: '📚 出所チャンネル分布',

      highlightsTitle: '🌟 検証済みハイライト',

      sortDesc: '⏳ 新しい順',
      sortAsc: '⌛ 古い順',
      allCat: '📁 全カテゴリ',
      catExp: '🏢 職歴',
      catEdu: '🎓 学歷・研究',
      catMedia: '🎤 講演・メディア',
      catCert: '📜 資格・実績',
      allStatus: '🛡️ 全ステータス',
      showExcludedCheckbox: '除外データを表示',
      clearFilters: '条件クリア',
      showingCount: '該当件数: ',
      viewDetail: '詳細・検証根拠を見る ↗',

      coverLetterTitle: '廖倫豪 博士 - エグゼクティブ CIO/CISO カバーレター',
      copySuccess: 'カバーレターがクリップボードにコピーされました！'
    }
  };

  function getLangField(obj, fieldBase) {
    if (!obj) return '';
    const langKey = state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1);
    const localizedKey = fieldBase + langKey;
    if (obj[localizedKey]) return obj[localizedKey];
    if (obj[fieldBase + 'Zh']) return obj[fieldBase + 'Zh'];
    if (obj[fieldBase]) return obj[fieldBase];
    return '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadData();
    setupEventListeners();
  });

  function initTheme() {
    if (state.theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }

  async function loadData() {
    try {
      const [profileRes, timelineRes, sourcesRes, inventoryRes, vlogRes] = await Promise.all([
        fetch('data/profile.json'),
        fetch('data/timeline.json'),
        fetch('data/sources.json'),
        fetch('data/local-file-inventory.json'),
        fetch('data/verification-log.json')
      ]);

      if (profileRes.ok && timelineRes.ok && sourcesRes.ok && inventoryRes.ok && vlogRes.ok) {
        state.profile = await profileRes.json();
        state.timeline = await timelineRes.json();
        state.sources = await sourcesRes.json();
        state.inventory = await inventoryRes.json();
        state.verificationLog = await vlogRes.json();
      } else {
        throw new Error('HTTP Fetch failed, using embedded DOM JSON script tags');
      }
    } catch (err) {
      console.warn('Fallback to embedded DOM script tags for offline file:// loading:', err);
      state.profile = JSON.parse(document.getElementById('data-profile').textContent);
      state.timeline = JSON.parse(document.getElementById('data-timeline').textContent);
      state.sources = JSON.parse(document.getElementById('data-sources').textContent);
      state.inventory = JSON.parse(document.getElementById('data-local-file-inventory').textContent);
      state.verificationLog = JSON.parse(document.getElementById('data-verification-log').textContent);
    }

    renderAllViews();
  }

  function setupEventListeners() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        switchTab(e.currentTarget.dataset.tab);
      });
    });

    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('hl_theme', state.theme);
      initTheme();
    });

    document.getElementById('lang-toggle-btn').addEventListener('click', () => {
      const langs = ['zh', 'en', 'jp'];
      const nextIdx = (langs.indexOf(state.currentLang) + 1) % langs.length;
      state.currentLang = langs[nextIdx];
      document.getElementById('lang-label').textContent = state.currentLang.toUpperCase();
      renderAllViews();
    });

    document.getElementById('header-search-input').addEventListener('input', (e) => {
      state.filters.search = e.target.value.toLowerCase().trim();
      if (state.currentTab !== 'timeline') {
        switchTab('timeline');
      } else {
        renderTimelineView();
      }
    });

    document.getElementById('btn-copy-cover-letter').addEventListener('click', openCoverLetterModal);
    
    const btnWord = document.getElementById('btn-download-word-resume');
    if (btnWord) {
      btnWord.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'assets/廖倫豪_博士_高階履歷_Gemini生成版.docx';
        link.download = '廖倫豪_博士_高階履歷_Gemini生成版.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close-btn')) {
          modal.classList.remove('active');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  }

  function switchTab(tabKey) {
    state.currentTab = tabKey;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });
    document.querySelectorAll('.tab-page').forEach(page => {
      page.classList.toggle('active', page.id === `page-${tabKey}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderAllViews() {
    renderHeaderUI();
    renderDashboardView();
    renderTimelineView();
    renderEducationView();
    renderExperienceView();
    renderMediaView();
    renderProposalView();
    renderPortfolioView();
    renderSourcesView();
  }

  function renderHeaderUI() {
    const t = i18n[state.currentLang];
    document.title = t.siteTitle;
    document.getElementById('btn-copy-cover-letter').textContent = t.coverLetterBtn;
    document.getElementById('header-search-input').placeholder = t.searchPlaceholder;

    const tabsMap = {
      dashboard: t.dashboard, timeline: t.timeline, education: t.education,
      experience: t.experience, media: t.media, proposal: t.proposal,
      portfolio: t.portfolio, sources: t.sources
    };

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const k = btn.dataset.tab;
      if (tabsMap[k]) btn.textContent = tabsMap[k];
    });
  }

  // Dashboard View
  function renderDashboardView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-dashboard');
    if (!page || !state.profile) return;

    const name = getLangField(state.profile, 'displayName');
    const headline = getLangField(state.profile, 'professionalHeadline');
    const summary = getLangField(state.profile, 'professionalSummary');

    const verifiedCount = state.timeline.filter(x => x.identityStatus === 'verified').length;
    const pendingCount = state.timeline.filter(x => x.identityStatus === 'pending').length;
    const excludedCount = state.timeline.filter(x => x.identityStatus === 'excluded').length;

    page.innerHTML = `
      <div class="container">
        <!-- Hero Card -->
        <div class="hero-card">
          <div class="hero-portrait-container">
            <img src="assets/202605_Howard_003.png" alt="Dr. Howard Liao UOMO Cover">
          </div>
          <div class="hero-details">
            <div class="hero-name-row">
              <span class="hero-name-zh">${name}</span>
              <span class="hero-name-en">Howard Liao, Ph.D.</span>
              <span class="verified-badge">${t.verifiedBadge}</span>
            </div>
            <div class="hero-headline">${headline}</div>
            <div class="hero-summary">${summary}</div>
            <div class="hero-tags">
              ${state.profile.verifiedExpertiseTags.map(tag => `<span class="tag-item">${tag}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Bento Grid Dashboard KPI -->
        <div class="section-title">${t.kpiTitle}</div>
        <div class="bento-grid">
          <div class="bento-card">
            <div class="bento-val">${t.kpi1_val}</div>
            <div class="bento-lbl">${t.kpi1_lbl}</div>
            <div class="bento-desc">${t.kpi1_desc}</div>
          </div>
          <div class="bento-card">
            <div class="bento-val">${t.kpi2_val}</div>
            <div class="bento-lbl">${t.kpi2_lbl}</div>
            <div class="bento-desc">${t.kpi2_desc}</div>
          </div>
          <div class="bento-card">
            <div class="bento-val">${t.kpi3_val}</div>
            <div class="bento-lbl">${t.kpi3_lbl}</div>
            <div class="bento-desc">${t.kpi3_desc}</div>
          </div>
          <div class="bento-card">
            <div class="bento-val">${t.kpi4_val}</div>
            <div class="bento-lbl">${t.kpi4_lbl}</div>
            <div class="bento-desc">${t.kpi4_desc}</div>
          </div>
        </div>

        <!-- Verification Stat Trigger Cards -->
        <div class="stats-row">
          <div class="stat-card" onclick="window.filterByStatus('verified')">
            <div class="stat-icon-box confirmed">✓</div>
            <div>
              <div class="stat-num">${verifiedCount}</div>
              <div class="stat-label">${t.statConfirmed}</div>
            </div>
          </div>
          <div class="stat-card" onclick="window.filterByStatus('pending')">
            <div class="stat-icon-box pending">⏳</div>
            <div>
              <div class="stat-num">${pendingCount}</div>
              <div class="stat-label">${t.statPending}</div>
            </div>
          </div>
          <div class="stat-card" onclick="window.filterByStatus('excluded')">
            <div class="stat-icon-box excluded">🚫</div>
            <div>
              <div class="stat-num">${excludedCount}</div>
              <div class="stat-label">${t.statExcluded}</div>
            </div>
          </div>
        </div>

        <!-- Inline SVG Visualizations -->
        <div class="section-title">${t.vizTitle}</div>
        <div class="viz-grid">
          <div class="viz-card">
            <h3>${t.vizYearly}</h3>
            <div class="viz-svg-container" id="svg-yearly-distribution"></div>
          </div>
          <div class="viz-card">
            <h3>${t.vizRadar}</h3>
            <div class="viz-svg-container" id="svg-tech-radar"></div>
          </div>
          <div class="viz-card">
            <h3>${t.vizDonut}</h3>
            <div class="viz-svg-container" id="svg-verification-donut"></div>
          </div>
          <div class="viz-card">
            <h3>${t.vizSource}</h3>
            <div class="viz-svg-container" id="svg-source-breakdown"></div>
          </div>
        </div>

        <!-- Highlights Row -->
        <div class="section-title">${t.highlightsTitle}</div>
        <div class="cards-grid">
          ${state.timeline.filter(x => x.isHighlighted && x.identityStatus === 'verified').slice(0, 3).map(item => `
            <div class="info-card">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span class="status-badge verified">✓ ${t.verified}</span>
                  <span style="font-size:0.8rem; color:var(--text-muted);">${item.displayDate}</span>
                </div>
                <div style="font-size:1.15rem; font-weight:700; margin-bottom:4px;">${getLangField(item, 'title')}</div>
                <div style="font-size:0.95rem; color:var(--primary-light); margin-bottom:10px;">${getLangField(item, 'organization')}</div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${getLangField(item, 'summary')}</div>
              </div>
              <button class="btn-secondary" onclick="window.openDetailModal('${item.id}')">${t.viewDetail}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    renderSVGYearlyDistribution();
    renderSVGTechRadar();
    renderSVGVerificationDonut();
    renderSVGSourceBreakdown();
  }

  window.filterByStatus = function(status) {
    state.filters.status = status;
    if (status === 'excluded') state.filters.showExcluded = true;
    switchTab('timeline');
    renderTimelineView();
  };

  // Chart 1: Yearly Event Distribution
  function renderSVGYearlyDistribution() {
    const container = document.getElementById('svg-yearly-distribution');
    if (!container) return;

    const dataByYear = [
      { year: '2014', exp: 1, edu: 2, media: 0, cert: 0 },
      { year: '2018', exp: 1, edu: 0, media: 0, cert: 1 },
      { year: '2022', exp: 1, edu: 0, media: 1, cert: 1 },
      { year: '2024', exp: 0, edu: 0, media: 4, cert: 2 },
      { year: '2025', exp: 1, edu: 0, media: 0, cert: 1 },
      { year: '2026', exp: 1, edu: 0, media: 0, cert: 0 }
    ];

    const colors = { exp: '#38bdf8', edu: '#a855f7', media: '#10b981', cert: '#f59e0b' };
    let barsSVG = '';
    const startX = 35, widthX = 46, gapX = 14, maxH = 140, baseY = 185;

    dataByYear.forEach((d, idx) => {
      const total = d.exp + d.edu + d.media + d.cert;
      const x = startX + idx * (widthX + gapX);
      let currY = baseY;

      ['exp', 'edu', 'media', 'cert'].forEach(cat => {
        const count = d[cat];
        if (count > 0) {
          const segH = (count / 6) * maxH;
          currY -= segH;

          barsSVG += `
            <rect x="${x}" y="${currY}" width="${widthX}" height="${segH}" fill="${colors[cat]}" rx="3" opacity="0.88" 
                  class="chart-bar-seg year-bar-${d.year} cat-bar-${cat}" 
                  onmouseover="window.showBarTooltip(event, '${d.year}', '${cat}', ${count})"
                  onmouseout="window.hideChartTooltip()"
                  onclick="window.filterByYear('${d.year}')" 
                  style="cursor:pointer; color:${colors[cat]};">
            </rect>
          `;
        }
      });

      barsSVG += `
        <circle cx="${x + widthX/2}" cy="${currY - 6}" r="4" fill="#38bdf8" class="pulse-node" style="color:#38bdf8;"/>
        <text x="${x + widthX/2}" y="${currY - 14}" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="800">${total}</text>
        <text x="${x + widthX/2}" y="206" fill="#94a3b8" font-size="11" text-anchor="middle">${d.year}</text>
      `;
    });

    container.innerHTML = `
      <div style="position:relative; width:100%; height:100%;">
        <div class="viz-filter-pills">
          <button class="viz-pill-btn active" onclick="window.filterYearlyCat('all')">全選</button>
          <button class="viz-pill-btn" style="border-color:#38bdf8; color:#38bdf8;" onclick="window.filterYearlyCat('exp')">工作經歷</button>
          <button class="viz-pill-btn" style="border-color:#a855f7; color:#a855f7;" onclick="window.filterYearlyCat('edu')">學歷與研究</button>
          <button class="viz-pill-btn" style="border-color:#10b981; color:#10b981;" onclick="window.filterYearlyCat('media')">媒體與演講</button>
          <button class="viz-pill-btn" style="border-color:#f59e0b; color:#f59e0b;" onclick="window.filterYearlyCat('cert')">證照與專案</button>
        </div>

        <svg width="100%" height="210" viewBox="0 0 380 220" style="overflow:visible;">
          <defs>
            <linearGradient id="baseline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
              <stop offset="50%" stop-color="#10b981" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.2"/>
            </linearGradient>
          </defs>
          <line x1="20" y1="${baseY}" x2="370" y2="${baseY}" stroke="url(#baseline-grad)" stroke-width="2"/>
          ${barsSVG}
        </svg>

        <div id="chart-floating-tooltip" class="chart-tooltip-floating" style="display:none;"></div>
      </div>
    `;
  }

  window.filterYearlyCat = function(catKey) {
    document.querySelectorAll('#svg-yearly-distribution .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${catKey}'`));
    });

    const allSegs = document.querySelectorAll('.chart-bar-seg');
    allSegs.forEach(seg => {
      if (catKey === 'all' || seg.classList.contains(`cat-bar-${catKey}`)) {
        seg.style.opacity = '0.9';
        seg.style.filter = 'none';
      } else {
        seg.style.opacity = '0.15';
        seg.style.filter = 'grayscale(100%)';
      }
    });
  };

  window.showBarTooltip = function(evt, year, cat, count) {
    const tooltip = document.getElementById('chart-floating-tooltip');
    if (!tooltip) return;
    const catNames = { exp: '🏢 工作經歷', edu: '🎓 學歷與研究', media: '🎤 媒體與演講', cert: '📜 證照與專案' };
    tooltip.innerHTML = `
      <div style="font-weight:800; color:var(--primary-light);">${year} 年分布細節</div>
      <div style="margin-top:2px;">${catNames[cat] || cat}: <strong>${count} 筆</strong></div>
      <div style="font-size:0.7rem; color:#94a3b8; margin-top:4px;">點擊直條圖篩選時間軸 ↗</div>
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = (evt.offsetX + 10) + 'px';
    tooltip.style.top = (evt.offsetY - 40) + 'px';
  };

  window.hideChartTooltip = function() {
    const tooltip = document.getElementById('chart-floating-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  };

  window.filterByYear = function(yr) {
    state.filters.year = yr;
    switchTab('timeline');
    renderTimelineView();
  };

  // Chart 2: Tech Radar / Network
  function renderSVGTechRadar() {
    const container = document.getElementById('svg-tech-radar');
    if (!container) return;

    const clusters = [
      { id: 'cloud', name: '多雲架構 FinOps', color: '#38bdf8', cx: 100, cy: 60, skills: ['AWS/GCP/Azure', 'Kubernetes GKE', 'Terraform IaC', 'Zero Outage'] },
      { id: 'security', name: '零信任與資安合規', color: '#a855f7', cx: 280, cy: 60, skills: ['ISO 27001', 'ISO 42001 AI', 'Zero Trust', 'DevSecOps'] },
      { id: 'factory', name: '智慧製造 OT/IT', color: '#10b981', cx: 310, cy: 180, skills: ['MES/ERP/PLM', 'BPR 流程再造', 'Edge AIoT', 'OEE 優化'] },
      { id: 'pm', name: '工程可行性與PM', color: '#f59e0b', cx: 70, cy: 180, skills: ['Feasibility Analysis', 'Monday.com', 'ClickUp/Notion', 'Agile Scrum'] },
      { id: 'ai', name: 'AI & 大數據平台', color: '#ec4899', cx: 190, cy: 220, skills: ['Agentic AI', 'MongoDB Atlas', 'AI Yield Model', 'Data Governance'] }
    ];

    let linesSVG = '';
    let nodesSVG = '';
    const centerCX = 190, centerCY = 120;

    clusters.forEach(c => {
      linesSVG += `<line x1="${centerCX}" y1="${centerCY}" x2="${c.cx}" y2="${c.cy}" stroke="${c.color}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>`;
      
      c.skills.forEach((sk, idx) => {
        const angle = (idx * (360 / c.skills.length)) * (Math.PI / 180);
        const radius = 38;
        const sx = c.cx + Math.cos(angle) * radius;
        const sy = c.cy + Math.sin(angle) * radius;

        linesSVG += `<line x1="${c.cx}" y1="${c.cy}" x2="${sx}" y2="${sy}" stroke="${c.color}" stroke-width="1" opacity="0.35"/>`;
        
        nodesSVG += `
          <g class="radar-node-sub cluster-${c.id}" transform="translate(${sx},${sy})" onclick="window.showSkillTooltip('${sk}', '${c.name}', '${c.color}')" style="cursor:pointer; transition:all 0.3s ease;">
            <circle r="6" fill="${c.color}" opacity="0.85" class="pulse-node" style="color:${c.color};"/>
            <text y="12" fill="#e2e8f0" font-size="8" text-anchor="middle" font-weight="600">${sk}</text>
          </g>
        `;
      });

      nodesSVG += `
        <g class="radar-node-hub cluster-${c.id}" transform="translate(${c.cx},${c.cy})" onclick="window.showSkillTooltip('${c.name}', '主技術聚落', '${c.color}')" style="cursor:pointer; transition:all 0.3s ease;">
          <circle r="16" fill="${c.color}" opacity="0.25"/>
          <circle r="10" fill="${c.color}" opacity="0.9" class="pulse-node" style="color:${c.color};"/>
          <text y="3.5" fill="#ffffff" font-size="8.5" text-anchor="middle" font-weight="800">${c.name.split(' ')[0]}</text>
        </g>
      `;
    });

    container.innerHTML = `
      <div style="position:relative; width:100%; height:100%;">
        <div class="viz-filter-pills">
          <button class="viz-pill-btn active" onclick="window.filterRadarCluster('all')">全域視圖</button>
          <button class="viz-pill-btn" onclick="window.filterRadarCluster('cloud')">多雲 FinOps</button>
          <button class="viz-pill-btn" onclick="window.filterRadarCluster('security')">零信任資安</button>
          <button class="viz-pill-btn" onclick="window.filterRadarCluster('factory')">智慧製造</button>
          <button class="viz-pill-btn" onclick="window.filterRadarCluster('pm')">工程與PM</button>
          <button class="viz-pill-btn" onclick="window.filterRadarCluster('ai')">AI & 大數據</button>
        </div>

        <svg width="100%" height="220" viewBox="0 0 380 260" style="overflow:visible;">
          <defs>
            <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <circle cx="${centerCX}" cy="${centerCY}" r="110" fill="none" stroke="rgba(56,189,248,0.15)" stroke-width="1" stroke-dasharray="4,4" class="spin-ring"/>
          <circle cx="${centerCX}" cy="${centerCY}" r="65" fill="none" stroke="rgba(56,189,248,0.25)" stroke-width="1"/>

          ${linesSVG}

          <g transform="translate(${centerCX},${centerCY})" filter="url(#glow-effect)" style="cursor:pointer;">
            <circle r="22" fill="#0284c7" opacity="0.3" class="pulse-node" style="color:#0284c7;"/>
            <circle r="14" fill="#0284c7"/>
            <text y="-2" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="900">廖倫豪博士</text>
            <text y="8" fill="#38bdf8" font-size="7.5" text-anchor="middle" font-weight="700">π-Leader</text>
          </g>

          ${nodesSVG}
        </svg>

        <div id="radar-tooltip-box" style="display:none; position:absolute; bottom:10px; right:10px; background:rgba(15,23,42,0.95); border:1px solid var(--primary-light); backdrop-filter:blur(8px); padding:10px 14px; border-radius:8px; font-size:0.8rem; color:#f8fafc; box-shadow:0 8px 24px rgba(0,0,0,0.6); max-width:220px; z-index:100;">
          <div id="radar-tooltip-title" style="font-weight:800; color:var(--primary-light); margin-bottom:4px;"></div>
          <div id="radar-tooltip-body" style="font-size:0.75rem; color:#94a3b8; line-height:1.4;"></div>
        </div>
      </div>
    `;
  }

  window.filterRadarCluster = function(clusterId) {
    document.querySelectorAll('#svg-tech-radar .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${clusterId}'`));
    });

    const allNodes = document.querySelectorAll('.radar-node-hub, .radar-node-sub');
    allNodes.forEach(node => {
      if (clusterId === 'all' || node.classList.contains(`cluster-${clusterId}`)) {
        node.style.opacity = '1';
        node.style.filter = 'none';
      } else {
        node.style.opacity = '0.15';
        node.style.filter = 'grayscale(100%)';
      }
    });
  };

  window.showSkillTooltip = function(title, category, color) {
    const box = document.getElementById('radar-tooltip-box');
    const tTitle = document.getElementById('radar-tooltip-title');
    const tBody = document.getElementById('radar-tooltip-body');
    if (!box || !tTitle || !tBody) return;

    tTitle.textContent = title;
    tTitle.style.color = color || '#38bdf8';
    
    const detailsMap = {
      'AWS/GCP/Azure': '精通跨國 AWS / GCP / Azure 三大公有雲整合，FinOps 雲端架構費用最佳化。',
      'Kubernetes GKE': '主導 GKE 跨六朵雲容器部署，自動擴縮容與高可用設計。',
      'Terraform IaC': '基礎設施即程式碼 (IaC)，實現全自動化無縫跨區部署。',
      'Zero Outage': '隆中網絡及跨國手遊平台實戰，創下 Zero Outage 零停機紀錄。',
      'ISO 27001': '持有 ISO 27001 資安主任稽核員認證，建置企業 ISMS 與 DevSecOps。',
      'ISO 42001 AI': '持有 ISO 42001 (AIMS) AI 治理主任稽核員認證，規範企業級 AI 應用。',
      'Zero Trust': '以身份為中心，導入 IAM/MFA/SSO 零信任資安架構，減少 30% 資安風險。',
      'DevSecOps': '將 SAST/DAST 安全檢測嵌入 CI/CD 管道，實現資安自動化。',
      'MES/ERP/PLM': '深諳製造業 OT/IT 流程，整合 SAP/Oracle ERP 與 MES/PLM/APS。',
      'BPR 流程再造': '主導跨部門 BPR，消除資訊孤島，建立 Single Source of Truth。',
      'Edge AIoT': '佈署 Edge Computing 感測器與工控隔離 (IEC 62443)，打造智慧工廠。',
      'OEE 優化': '7x24 預警架構提升整體設備效率 (OEE) 並縮短交期。',
      'Feasibility Analysis': '具軟體/系統工程師背景，能精準進行可行性分析，消除溝通 Gap。',
      'Monday.com': '運用 Monday.com 進行專案甘特圖、管報與資源分配精準追蹤。',
      'ClickUp/Notion': '結合 ClickUp 與 Notion 建立企業級知識庫 KM 與敏捷 Backlog。',
      'Agile Scrum': 'CIO 級敏捷領導 (Scrum Master CIO)，推動跨國多團隊高效迭代。',
      'Agentic AI': '導入 Agentic AI 運維自動化與工單處理，提升 55% 運維效率。',
      'MongoDB Atlas': 'MongoDB.local Keynote 演講代表，主導全託管數據平台建置。',
      'AI Yield Model': '開發 AI 良率預測模型，提升高科技製造產品良率達 15%。',
      'Data Governance': 'MDM 主資料管理與跨國數據營運分析儀表板建置。'
    };

    tBody.textContent = detailsMap[title] || `具備 20+ 年跨國高管實戰落地經驗之核心技能。`;
    box.style.display = 'block';

    setTimeout(() => {
      box.style.display = 'none';
    }, 4500);
  };

  // Chart 3: Verification Breakdown Donut
  function renderSVGVerificationDonut() {
    const container = document.getElementById('svg-verification-donut');
    if (!container) return;

    container.innerHTML = `
      <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; align-items:center;">
        <div class="viz-filter-pills" style="margin-bottom:6px;">
          <button class="viz-pill-btn active" onclick="window.filterDonutStatus('all')">全域 100%</button>
          <button class="viz-pill-btn" style="border-color:#10b981; color:#10b981;" onclick="window.filterDonutStatus('verified')">已驗證 (85%)</button>
          <button class="viz-pill-btn" style="border-color:#f59e0b; color:#f59e0b;" onclick="window.filterDonutStatus('pending')">待確認 (10%)</button>
          <button class="viz-pill-btn" style="border-color:#6b7280; color:#6b7280;" onclick="window.filterDonutStatus('excluded')">已排除 (5%)</button>
        </div>

        <svg width="100%" height="190" viewBox="0 0 320 210" style="overflow:visible;">
          <circle cx="120" cy="105" r="72" fill="none" stroke="rgba(16,185,129,0.2)" stroke-width="10" stroke-dasharray="10 20" class="spin-ring"/>

          <circle cx="120" cy="105" r="62" fill="none" stroke="#10b981" stroke-width="18" stroke-dasharray="280 120" class="donut-segment donut-seg-verified" 
                  style="color:#10b981; cursor:pointer;" 
                  onclick="window.filterByStatus('verified')"
                  onmouseover="window.showDonutHover('85%', '已驗證 (Confirmed)', '18 筆項目具備權威雙重佐證')" />

          <circle cx="120" cy="105" r="62" fill="none" stroke="#f59e0b" stroke-width="18" stroke-dasharray="35 365" stroke-dashoffset="-280" class="donut-segment donut-seg-pending"
                  style="color:#f59e0b; cursor:pointer;" 
                  onclick="window.filterByStatus('pending')"
                  onmouseover="window.showDonutHover('10%', '待確認 (Pending)', '2 筆內部擬議過渡草稿')" />

          <circle cx="120" cy="105" r="62" fill="none" stroke="#6b7280" stroke-width="18" stroke-dasharray="25 375" stroke-dashoffset="-315" class="donut-segment donut-seg-excluded"
                  style="color:#6b7280; cursor:pointer;" 
                  onclick="window.filterByStatus('excluded')"
                  onmouseover="window.showDonutHover('5%', '已排除同名 (Excluded)', '體育同名選手資訊排除')" />

          <text id="donut-center-pct" x="120" y="107" fill="#f8fafc" font-size="20" font-weight="900" text-anchor="middle" class="pulse-node" style="color:#38bdf8;">100%</text>
          <text id="donut-center-lbl" x="120" y="123" fill="#10b981" font-size="9" font-weight="700" text-anchor="middle">核實健康度</text>

          <g transform="translate(205,45)" onclick="window.filterByStatus('verified')" style="cursor:pointer;">
            <rect width="14" height="14" fill="#10b981" rx="3" class="pulse-node" style="color:#10b981;"/>
            <text x="22" y="12" fill="#f8fafc" font-size="11" font-weight="700">已驗證 (85%)</text>
          </g>
          <g transform="translate(205,85)" onclick="window.filterByStatus('pending')" style="cursor:pointer;">
            <rect width="14" height="14" fill="#f59e0b" rx="3"/>
            <text x="22" y="12" fill="#f8fafc" font-size="11" font-weight="700">待確認 (10%)</text>
          </g>
          <g transform="translate(205,125)" onclick="window.filterByStatus('excluded')" style="cursor:pointer;">
            <rect width="14" height="14" fill="#6b7280" rx="3"/>
            <text x="22" y="12" fill="#f8fafc" font-size="11" font-weight="700">已排除 (5%)</text>
          </g>
        </svg>

        <div id="donut-hover-card" style="position:absolute; bottom:2px; left:10px; right:10px; background:rgba(15,23,42,0.92); border:1px solid var(--border-color); padding:5px 12px; border-radius:6px; font-size:0.75rem; color:#94a3b8; text-align:center;">
          點擊圓環區塊可自動篩選時間軸對應項目
        </div>
      </div>
    `;
  }

  window.filterDonutStatus = function(statusKey) {
    document.querySelectorAll('#svg-verification-donut .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${statusKey}'`));
    });

    const segs = document.querySelectorAll('.donut-segment');
    segs.forEach(seg => {
      if (statusKey === 'all' || seg.classList.contains(`donut-seg-${statusKey}`)) {
        seg.style.opacity = '1';
        seg.style.strokeWidth = '18';
      } else {
        seg.style.opacity = '0.2';
        seg.style.strokeWidth = '12';
      }
    });
  };

  window.showDonutHover = function(pct, title, desc) {
    const pctTxt = document.getElementById('donut-center-pct');
    const card = document.getElementById('donut-hover-card');
    if (pctTxt) pctTxt.textContent = pct;
    if (card) card.innerHTML = `<strong style="color:#f8fafc;">${title}:</strong> ${desc}`;
  };

  // Chart 4: Source Pipeline Distribution
  function renderSVGSourceBreakdown() {
    const container = document.getElementById('svg-source-breakdown');
    if (!container) return;

    const sources = [
      { id: 'cloud', name: '雲端大廠 (Google/MongoDB)', count: 3, color: '#38bdf8' },
      { id: 'media', name: '權威科技媒體 (CIO/iThome)', count: 4, color: '#10b981' },
      { id: 'academic', name: '學術/國家圖書館 (Springer)', count: 2, color: '#a855f7' },
      { id: 'cert', name: '國際認證機構 (BSI/SGS/ISO)', count: 2, color: '#f59e0b' },
      { id: 'edu', name: '專業社群 (LinkedIn/文教)', count: 3, color: '#ec4899' }
    ];

    let itemsSVG = sources.map((s, idx) => {
      const y = 22 + idx * 36;
      const barW = (s.count / 4) * 180;

      return `
        <g class="source-bar-group src-group-${s.id}" transform="translate(15, ${y})" style="cursor:pointer; transition:all 0.3s ease;" onclick="switchTab('sources')">
          <text x="0" y="10" fill="#f8fafc" font-size="10.5" font-weight="700">${s.name}</text>
          <rect x="0" y="16" width="220" height="10" fill="rgba(255,255,255,0.06)" rx="3"/>
          <rect x="0" y="16" width="${barW}" height="10" fill="${s.color}" rx="3" opacity="0.9" class="chart-bar-seg" style="color:${s.color};"/>
          
          <circle cx="${barW}" cy="21" r="5" fill="${s.color}" class="pulse-node" style="color:${s.color};"/>
          <text x="${barW + 12}" y="25" fill="${s.color}" font-size="10" font-weight="800">${s.count} 筆權威來源</text>
        </g>
      `;
    }).join('');

    container.innerHTML = `
      <div style="position:relative; width:100%; height:100%;">
        <div class="viz-filter-pills">
          <button class="viz-pill-btn active" onclick="window.filterSourceGroup('all')">全選 14 筆</button>
          <button class="viz-pill-btn" onclick="window.filterSourceGroup('cloud')">雲端大廠</button>
          <button class="viz-pill-btn" onclick="window.filterSourceGroup('media')">科技媒體</button>
          <button class="viz-pill-btn" onclick="window.filterSourceGroup('academic')">學術圖書館</button>
          <button class="viz-pill-btn" onclick="window.filterSourceGroup('cert')">國際認證</button>
        </div>

        <svg width="100%" height="200" viewBox="0 0 360 210" style="overflow:visible;">
          <line x1="235" y1="15" x2="235" y2="195" stroke="rgba(56,189,248,0.15)" stroke-width="1.5" stroke-dasharray="3,3"/>
          ${itemsSVG}
        </svg>
      </div>
    `;
  }

  window.filterSourceGroup = function(groupId) {
    document.querySelectorAll('#svg-source-breakdown .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${groupId}'`));
    });

    const groups = document.querySelectorAll('.source-bar-group');
    groups.forEach(g => {
      if (groupId === 'all' || g.classList.contains(`src-group-${groupId}`)) {
        g.style.opacity = '1';
        g.style.filter = 'none';
      } else {
        g.style.opacity = '0.18';
        g.style.filter = 'grayscale(100%)';
      }
    });
  };

  // Timeline View
  function renderTimelineView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-timeline');
    if (!page) return;

    let filtered = state.timeline.filter(item => {
      if (!state.filters.showExcluded && item.identityStatus === 'excluded') return false;
      if (state.filters.status !== 'all' && item.identityStatus !== state.filters.status) return false;
      if (state.filters.category !== 'all' && item.category !== state.filters.category) return false;
      if (state.filters.year !== 'all' && !item.displayDate.includes(state.filters.year)) return false;

      if (state.filters.search) {
        const q = state.filters.search;
        const title = getLangField(item, 'title').toLowerCase();
        const org = getLangField(item, 'organization').toLowerCase();
        const role = getLangField(item, 'role').toLowerCase();
        const summary = getLangField(item, 'summary').toLowerCase();
        const matchSkills = item.skills.some(s => s.toLowerCase().includes(q));
        if (!title.includes(q) && !org.includes(q) && !role.includes(q) && !summary.includes(q) && !matchSkills) {
          return false;
        }
      }

      return true;
    });

    filtered.sort((a, b) => {
      return state.filters.sort === 'asc' ? a.sortDate.localeCompare(b.sortDate) : b.sortDate.localeCompare(a.sortDate);
    });

    page.innerHTML = `
      <div class="container">
        <div class="controls-card">
          <div class="control-group">
            <select class="form-select" id="timeline-sort-select">
              <option value="desc" ${state.filters.sort === 'desc' ? 'selected' : ''}>${t.sortDesc}</option>
              <option value="asc" ${state.filters.sort === 'asc' ? 'selected' : ''}>${t.sortAsc}</option>
            </select>

            <select class="form-select" id="timeline-cat-select">
              <option value="all">${t.allCat}</option>
              <option value="工作經歷" ${state.filters.category === '工作經歷' ? 'selected' : ''}>${t.catExp}</option>
              <option value="學歷" ${state.filters.category === '學歷' ? 'selected' : ''}>${t.catEdu}</option>
              <option value="演講活動" ${state.filters.category === '演講活動' ? 'selected' : ''}>${t.catMedia}</option>
              <option value="證照獎項" ${state.filters.category === '證照獎項' ? 'selected' : ''}>${t.catCert}</option>
            </select>

            <select class="form-select" id="timeline-status-select">
              <option value="all" ${state.filters.status === 'all' ? 'selected' : ''}>${t.allStatus}</option>
              <option value="verified" ${state.filters.status === 'verified' ? 'selected' : ''}>✓ ${t.verified}</option>
              <option value="pending" ${state.filters.status === 'pending' ? 'selected' : ''}>⏳ ${t.pending}</option>
              <option value="excluded" ${state.filters.status === 'excluded' ? 'selected' : ''}>🚫 ${t.excluded}</option>
            </select>
          </div>

          <div class="control-group">
            <label class="checkbox-label">
              <input type="checkbox" id="show-excluded-checkbox" ${state.filters.showExcluded ? 'checked' : ''}>
              ${t.showExcludedCheckbox}
            </label>
            <button class="btn-secondary" id="btn-clear-filters">${t.clearFilters}</button>
          </div>
        </div>

        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">
          ${t.showingCount} <strong style="color:var(--primary-light);">${filtered.length}</strong>
        </div>

        <div class="timeline-stream">
          ${filtered.map(item => `
            <div class="timeline-item">
              <div class="timeline-node ${item.identityStatus}"></div>
              <div class="timeline-content-card">
                <div class="timeline-card-header">
                  <div>
                    <div class="timeline-card-title">${getLangField(item, 'title')}</div>
                    <div class="timeline-card-org">${getLangField(item, 'organization')}</div>
                  </div>
                  <span class="status-badge ${item.identityStatus}">
                    ${item.identityStatus === 'verified' ? '✓ ' + t.verified : (item.identityStatus === 'pending' ? '⏳ ' + t.pending : '🚫 ' + t.excluded)}
                  </span>
                </div>

                <div class="timeline-card-meta">
                  <span>📅 ${item.displayDate}</span>
                  <span>📍 ${item.location}</span>
                  <span>🏷️ ${item.category}</span>
                </div>

                <div class="timeline-card-body">${getLangField(item, 'summary')}</div>

                <div class="hero-tags" style="margin-bottom:12px;">
                  ${item.skills.map(s => `<span class="tag-item">${s}</span>`).join('')}
                </div>

                <div class="timeline-card-footer">
                  <span style="font-size:0.8rem; color:var(--text-muted);">SRC: ${item.sourceIds.join(', ')}</span>
                  <button class="btn-secondary" onclick="window.openDetailModal('${item.id}')">${t.viewDetail}</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('timeline-sort-select').addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderTimelineView();
    });
    document.getElementById('timeline-cat-select').addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderTimelineView();
    });
    document.getElementById('timeline-status-select').addEventListener('change', (e) => {
      state.filters.status = e.target.value;
      renderTimelineView();
    });
    document.getElementById('show-excluded-checkbox').addEventListener('change', (e) => {
      state.filters.showExcluded = e.target.checked;
      renderTimelineView();
    });
    document.getElementById('btn-clear-filters').addEventListener('click', () => {
      state.filters = { search: '', sort: 'desc', category: 'all', org: 'all', tag: 'all', status: 'all', confidence: 'all', showExcluded: false, year: 'all' };
      renderTimelineView();
    });
  }

  // Education View
  function renderEducationView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-education');
    if (!page) return;

    const eduItems = state.timeline.filter(x => x.category === '學歷' || x.category === '研究出版');

    page.innerHTML = `
      <div class="container">
        <div class="section-title">${t.education}</div>
        <div class="cards-grid">
          ${eduItems.map(item => `
            <div class="info-card">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span class="status-badge ${item.identityStatus}">✓ ${t.verified}</span>
                  <span style="font-size:0.8rem; color:var(--text-muted);">${item.displayDate}</span>
                </div>
                <div style="font-size:1.15rem; font-weight:700; margin-bottom:4px;">${getLangField(item, 'title')}</div>
                <div style="font-size:0.95rem; color:var(--primary-light); margin-bottom:12px;">${getLangField(item, 'organization')}</div>
                <div style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:14px;">${getLangField(item, 'summary')}</div>
              </div>
              <button class="btn-secondary" onclick="window.openDetailModal('${item.id}')">${t.viewDetail}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Experience View
  function renderExperienceView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-experience');
    if (!page) return;

    const expItems = state.timeline.filter(x => x.category === '工作經歷');

    page.innerHTML = `
      <div class="container">
        <div class="section-title">${t.experience}</div>
        <div class="cards-grid">
          ${expItems.map(item => `
            <div class="info-card">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span class="status-badge ${item.identityStatus}">✓ ${t.verified}</span>
                  <span style="font-size:0.8rem; color:var(--text-muted);">${item.displayDate}</span>
                </div>
                <div style="font-size:1.2rem; font-weight:800; margin-bottom:4px;">${getLangField(item, 'title')}</div>
                <div style="font-size:1.0rem; color:var(--primary-light); font-weight:700; margin-bottom:10px;">${getLangField(item, 'organization')}</div>
                <div style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:14px;">${getLangField(item, 'summary')}</div>
              </div>
              <div>
                <div class="hero-tags" style="margin-bottom:12px;">
                  ${item.skills.map(s => `<span class="tag-item">${s}</span>`).join('')}
                </div>
                <button class="btn-secondary" style="width:100%;" onclick="window.openDetailModal('${item.id}')">${t.viewDetail}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Media View
  function renderMediaView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-media');
    if (!page) return;

    const mediaItems = state.timeline.filter(x => x.category === '媒體報導' || x.category === '演講活動');

    page.innerHTML = `
      <div class="container">
        <div class="section-title">${t.media}</div>
        
        <!-- Google Cloud Video Embed -->
        <div class="info-card" style="margin-bottom:24px;">
          <div style="font-size:1.15rem; font-weight:700; margin-bottom:12px;">🎥 Google Cloud Official APAC Customer Success Story (Video Interview)</div>
          <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:var(--radius-md); background:#000;">
            <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                    src="https://www.youtube-nocookie.com/embed/_kTZSZ_0lNE" 
                    title="Google Cloud GameSparcs Case Study" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
          </div>
          <div style="margin-top:10px; font-size:0.85rem; color:var(--text-muted);">
            🔗 官方影音採訪：<a href="https://youtu.be/_kTZSZ_0lNE?si=CT2lo8c4IF0zI1Ki" target="_blank" rel="noopener noreferrer" style="color:var(--primary-light);">https://youtu.be/_kTZSZ_0lNE?si=CT2lo8c4IF0zI1Ki ↗</a>
          </div>
        </div>

        <div class="cards-grid">
          ${mediaItems.map(item => `
            <div class="info-card">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span class="status-badge verified">✓ ${t.verified}</span>
                  <span style="font-size:0.8rem; color:var(--text-muted);">${item.displayDate}</span>
                </div>
                <div style="font-size:1.1rem; font-weight:700; margin-bottom:4px;">${getLangField(item, 'title')}</div>
                <div style="font-size:0.9rem; color:var(--primary-light); margin-bottom:10px;">${getLangField(item, 'organization')}</div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${getLangField(item, 'summary')}</div>
              </div>
              <button class="btn-secondary" onclick="window.openDetailModal('${item.id}')">${t.viewDetail}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Proposal View

// ==========================================
  // Dedicated Tab: Enterprise AI & AISDLC Governance Proposals (專案服務建議書)
  // ==========================================

  const sdlcData = {
    plan: {
      badge: "Phase 1 / 7",
      title: "規劃 (Planning)",
      category: "商業價值與治理前置",
      ai: "商業分析、可行性分析、風險評估、成本與效益預估、法遵與合規基線自動比對。",
      engineering: ["商業分析", "利害關係人管理", "開發團隊組建", "Waterfall 模型", "Agile 敏捷方法", "DevSecOps 文化規劃"],
      security: ["資安&資料治理", "法律遵循與合規檢核", "資安角色與職責定義", "資訊資產安全等級鑑別 (普/中/高)", "RFP 資安條款與預算配置"],
      standard: "NIST SSDF: PO.1, PO.2 | ISO 27001: 5.1 | ISO 42001: 5.1",
      gate: "Gate G0 (商業與資安立項基線)"
    },
    req: {
      badge: "Phase 2 / 7",
      title: "需求 (Requirements)",
      category: "需求結構化與安全基線",
      ai: "需求萃取、會議語音摘要、需求分類、需求追溯矩陣 (RTM) 自動關聯、資安需求檢核與誤用情境 (Misuse Cases) 挖掘。",
      engineering: ["需求引出 (Elicitation)", "需求記錄 (SRS)", "需求分析與確認", "需求追溯 (Traceability)"],
      security: ["安全需求明確化 (C.I.A. / 授權 / 會話)", "威脅與風險評估", "軟體安全查檢表 (Checklist)", "個資保護與合規驗收標準 (GDPR/HIPAA)"],
      standard: "NIST SSDF: PW.1 | ISO 27001: 8.25 | OWASP ASVS",
      gate: "Gate G1 (需求追溯與安全需求規格)"
    },
    design: {
      badge: "Phase 3 / 7",
      title: "設計 (Design)",
      category: "架構強化與威脅建模",
      ai: "架構安全模式建議、威脅建模自動推導 (STRIDE)、設計審查助手、API / 資料模型安全草稿生成、Clean Core 架構驗證。",
      engineering: ["系統分析 (SA)", "V & V (驗證與確認)", "變更管理", "三層式架構", "虛擬機 (VM) / Container 容器架構", "資料庫結構設計", "資訊建模 (Data Modeling)", "設計審查 (Design Review)"],
      security: ["雲端安全架構", "Serverless 安全配置", "存取管理 (IAM)", "零信任 (Zero Trust) 邊界", "資料安全與密碼學 (Encryption/KMS)", "威脅建模 (STRIDE / Attack Surface)", "安全設計原則 (Least Privilege / Defense in Depth)"],
      standard: "NIST SSDF: PW.2, PS.1 | ISO 27001: 8.26 | ISO 42001: B.6",
      gate: "Gate G1.5 (架構審查與威脅模型核准)"
    },
    dev: {
      badge: "Phase 4 / 7",
      title: "開發 (Development)",
      category: "安全編碼與供應鏈防護",
      ai: "AI 程式碼助手 (Copilot/Cursor)、單元測試自動生成、即時 Code Review、Secret/憑證外洩即時阻斷、相依套件弱點預測與自動修補建議。",
      engineering: ["程式語言與開發框架選型", "整合開發環境 (IDE)", "Git 版本控制與分支策略", "同行代碼審查 (Peer Code Review)"],
      security: ["軟體供應鏈安全", "軟體物料清單 (SBOM: CycloneDX/SPDX)", "金鑰與 Secret 管理 (Vault/GitGuardian)", "安全編碼實踐 (Secure Coding Standards)", "健全例外與錯誤處理", "OWASP Top 10 防護 (SQLi, XSS, CSRF, SSRF)"],
      standard: "NIST SSDF: PS.2, PW.4, PW.5 | ISO 27001: 8.28 | SLSA Level 3",
      gate: "Gate G2 (Clean Core、Secret Scan、SAST 門檻)"
    },
    test: {
      badge: "Phase 5 / 7",
      title: "測試 (Testing)",
      category: "全面驗證與對抗測試",
      ai: "自動生成極端測試案例、單元/整合測試自動化、智慧模糊測試 (AI Fuzzing)、弱點關聯與誤報過濾、AI Red Teaming 對抗性攻擊測試。",
      engineering: ["單元測試 (Unit Test)", "整合測試 (介面/回歸測試)", "安裝與相容性測試", "使用者驗收測試 (UAT)", "系統功能測試"],
      security: ["靜態應用安全測試 (SAST)", "動態應用安全測試 (DAST)", "互動式安全測試 (IAST)", "原始碼弱點掃描 (SCA)", "壓力與負載測試", "模糊測試 (Fuzzing)", "合成交易驗證", "Misuse Case 濫用情境測試"],
      standard: "NIST SSDF: PW.7, PW.8 | ISO 27001: 8.29 | ISO 42001: B.8",
      gate: "Gate G3 (動態弱掃無中高風險、UAT 資安通過)"
    },
    deploy: {
      badge: "Phase 6 / 7",
      title: "部署 (Deployment)",
      category: "環境加固與安全發布",
      ai: "IaC 安全語法與權限檢核、環境組態漂移預測、發布風險評估、Canary / Blue-Green 漸進發布智慧決策與自動 Rollback 觸發。",
      engineering: ["部署環境準備 (Staging / Prod)", "配置與組態管理 (CMDB)", "CI/CD 自動化 Pipeline", "Canary / Blue-Green 發布"],
      security: ["基礎設施即程式碼 (IaC Security: Terraform/Checkov)", "作業系統與伺服器加固 (CIS Benchmarks)", "CWE (常見弱點枚舉) 比對", "CVE (已知漏洞) 防堵", "更新與安全修補程序", "軟體製品數位簽章 (Cosign/Sigstore)"],
      standard: "NIST SSDF: PS.3, PW.6 | ISO 27001: 8.9, 8.31 | CIS Benchmarks",
      gate: "Gate G4 (IaC 掃描、容器簽名與發布審批)"
    },
    ops: {
      badge: "Phase 7 / 7",
      title: "維運 (Operations)",
      category: "持續監控、防禦與營運韌性",
      ai: "AIOps 智能維運、全鏈路日誌智慧分析 (Log Anomaly)、事件即時關聯與根因分析 (RCA)、智慧告警降噪、即時防禦修補腳本建議。",
      engineering: ["Issue Tracking 追蹤系統", "BC (營運持續計畫)", "IR (資安事件應變)", "DR (災難復原)", "全方位監控與日誌收集 (APM/OpenTelemetry)"],
      security: ["資安稽核 (ISMS Audit)", "全員資安教育培訓", "紅藍隊演練 (Red/Blue Teaming)", "外部滲透測試 (Pen-testing)", "惡意程式防護 (病毒/蠕蟲/木馬/勒索軟體)", "DDoS 防禦與清洗", "社交工程防禦與釣魚演練", "執行期自我防護 (RASP)"],
      standard: "NIST SSDF: RV.1, RV.2, RV.3 | ISO 27001: 8.16, 5.24 | ISO 42001: 9.1",
      gate: "Gate G5 (AIOps 持續監控、IR/DR 演練與漏洞修補)"
    }
  };

  const aimlData = {
    pre: {
      badge: "Quadrant 1 / 4",
      title: "開發前 (Pre-development)",
      focus: "商業問題定義與資料整備",
      steps: ["1. 定義問題", "2. 蒐集資料", "3. 資料前處理", "4. 探索性資料分析 (EDA)"],
      work: "釐清商業目標、預期 KPI (如 Precision 提升至 70%)、資料來源合法性與權限評估、建立可重現的資料清洗與特徵管線、EDA 探索特徵分布以避免未來資料洩漏 (Data Leakage)。",
      gov: [
        "落實資料分類分級，隔離並遮罩敏感個資 (PII)",
        "評估資料來源之資料血緣 (Data Lineage) 與智慧財產權合規性",
        "建立受控之特徵庫 (Feature Store)，確保訓練與線上推論一致性",
        "評估潛在樣本偏誤 (Bias) 與族群代表性失衡風險"
      ],
      ref: "NIST AI RMF: MAP 1.1, MAP 2.1 | ISO 42001: A.6 (AI 系統規劃)",
      tool: "Unity Catalog, Delta Lake, Lakeflow Designer"
    },
    dev: {
      badge: "Quadrant 2 / 4",
      title: "開發 (Development)",
      focus: "模型選型、實驗追蹤與多維驗證",
      steps: ["5. 選擇模型 / 基礎模型", "6. 訓練模型與調參", "7. 評估模型 (Evaluation)"],
      work: "基於資料特性選擇演算法或預訓練基礎模型 (Foundation Models)、微調 (Fine-tuning) 或 RAG 架構建置、超參數最佳化、記錄完整實驗軌跡 (Parameters / Metrics / Artifacts)。",
      gov: [
        "使用 MLflow / Weights & Biases 進行 100% 實驗版本可追溯性記錄",
        "評估指標除準確度外，必須涵蓋延遲、推論成本、穩健性與公平性測試",
        "實施 AI 安全紅隊測試 (Red Teaming) 與對抗樣本攻擊防禦檢驗",
        "產出模型卡 (Model Card) 與詳細評估報告供跨部門審查"
      ],
      ref: "NIST AI RMF: MEASURE 2.5, 2.7 | ISO 42001: B.7 (開發與評估)",
      tool: "MLflow, Ray, HuggingFace Hub, PyTorch"
    },
    deploy: {
      badge: "Quadrant 3 / 4",
      title: "部署 (Deployment)",
      focus: "模型登錄、測試與安全上線",
      steps: ["8. 部署模型 (Serving)", "9. 透明性與文件化 (Model Registry)"],
      work: "將評估通過之模型封裝為即時 REST API 或批次推論管線、在 Staging 環境進行端對端整合測試、執行 Shadow Deployment 或 A/B Testing、完成上線簽核。",
      gov: [
        "於 Model Registry 明確標註生命週期狀態 (Staging / Production) 並綁定審批鏈",
        "部署動態 LLM / 模型防護閘道 (LLM Firewall: 防範 Prompt Injection / 毒性輸出)",
        "實施嚴格的 API 存取控制 (RBAC / Token Rate Limiting)",
        "備妥即時回滾 (Rollback) 與降級機制，防範推論異常導致業務中斷"
      ],
      ref: "NIST AI RMF: MANAGE 2.2, 3.2 | ISO 42001: B.8 (部署與驗證)",
      tool: "Databricks Model Serving, vLLM, KServe, Triton"
    },
    post: {
      badge: "Quadrant 4 / 4",
      title: "部署後 (Post-deployment)",
      focus: "持續監控、漂移偵測與再訓練閉環",
      steps: ["10. 監視與維護模型 (Monitoring)", "11. 持續回饋與改善 (Continuous Feedback)"],
      work: "即時採集線上推論日誌 (Inference Tables)、監控特徵漂移 (Data Drift) 與概念漂移 (Concept Drift)、收集真實業務回饋、自動化觸發再訓練管線或模型退役流程。",
      gov: [
        "監控 Training-Serving Skew (訓練與線上推論特徵偏離)",
        "完整記錄推論輸入/輸出日誌 (敏感資料遮罩保存) 供合規稽核追溯",
        "定義明確的自動化再訓練 (Automated Retraining) 觸發閾值與關卡",
        "建立模型退役 (Retirement) 與歷史權重封存歸檔政策"
      ],
      ref: "NIST AI RMF: MANAGE 4.2 | ISO 42001: 9.1 (監控、衡量與持續改善)",
      tool: "Inference Tables, Evidently AI, Prometheus, Grafana"
    }
  };

  function renderProposalView() {
    const page = document.getElementById('page-proposal');
    if (!page) return;

    page.innerHTML = `
      <div class="container" style="padding-top: 10px;">
        <!-- Interactive Sub-tab Switcher -->
        <div class="proposal-subnav">
          <button class="proposal-subtab-btn active" id="subtab-btn-all" onclick="window.switchProposalSection('all')">
            📑 展開全覽 (All)
          </button>
          <button class="proposal-subtab-btn" id="subtab-btn-serviceagent" onclick="window.switchProposalSection('serviceagent')">
            🤖 建議書一：ServiceAgent AI 中控平台
          </button>
          <button class="proposal-subtab-btn" id="subtab-btn-chatgpt" onclick="window.switchProposalSection('chatgpt')">
            🚀 建議書二：ChatGPT Enterprise 藍圖
          </button>
          <button class="proposal-subtab-btn" id="subtab-btn-aisdlc" onclick="window.switchProposalSection('aisdlc')">
            🛡️ 建議書三：AISDLC 雙軌開發治理
          </button>
          <button class="proposal-subtab-btn" id="subtab-btn-policy" onclick="window.switchProposalSection('policy')">
            📜 附件四：AI 治理辦法與規範
          </button>
        </div>

        <!-- ========================================== -->
        <!-- PROPOSAL 1: ServiceAgent Enterprise AI Platform -->
        <!-- ========================================== -->
        <div id="section-serviceagent" class="proposal-content-section" style="margin-bottom:36px;">
          <div class="hero-card" style="margin-top:0; margin-bottom:20px; border-color:var(--primary-light);">
            <div style="grid-column: 1 / -1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px;">📄 建議書一：企業董事會專案服務建議書 V1.0 (正式版)</span>
                <span style="font-size:0.85rem; color:var(--text-muted);">專案負責人：廖倫豪 博士 (Howard Liao, Ph.D.)</span>
              </div>
              <div style="font-size:1.7rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
                ServiceAgent 企業級生成式 AI 中控平台架構與落地建議書 (高科技製造業通用版)
              </div>
              <div style="font-size:0.92rem; color:var(--text-muted); line-height:1.7;">
                本建議書由廖倫豪博士親自為高科技製造與企業董事會規劃，旨在建立「高可控、可治理、具資安防護網」的企業級 AI 中央神經系統。結合 <strong>Enterprise GPT (智能決策中控)</strong>、<strong>Enterprise KM (25+ 格式混合 RAG 檢索)</strong>、<strong>AI Meeting (會議語音轉錄回寫)</strong>，並串接 <strong>OpenClaw (人機複核安全閘道)</strong> 與 <strong>Hermes Agent (自主學習型 Agent)</strong>，完全對齊 ISO 27001/27701、ISO 42001 (AIMS)、NIST CSF 及歐盟 AI 法案 (EU AI Act)。
              </div>
            </div>
          </div>

          <div class="bento-grid" style="margin-bottom:20px;">
            <div class="bento-card">
              <div style="font-size:1.6rem; margin-bottom:4px;">🏛️</div>
              <div class="bento-lbl">統一中控治理</div>
              <div class="bento-desc">集中管理多 LLM 模型路由調度、KM 知識庫與 Multi-Agent 流程編排，告別 API Key 混亂。</div>
            </div>
            <div class="bento-card">
              <div style="font-size:1.6rem; margin-bottom:4px;">🏭</div>
              <div class="bento-lbl">產線維修自動化</div>
              <div class="bento-desc">SCADA 異常排查時間縮短 80%，AI 自動產出 SOP 排查建議，經 OpenClaw 人工核准後執行。</div>
            </div>
            <div class="bento-card">
              <div style="font-size:1.6rem; margin-bottom:4px;">🏗️</div>
              <div class="bento-lbl">領域知識智能化</div>
              <div class="bento-desc">萃取高科技製造領域專家經驗，支援 25+ 檔案 Parser 與圖表表格重構，實現 95% 精準度 RAG。</div>
            </div>
            <div class="bento-card">
              <div style="font-size:1.6rem; margin-bottom:4px;">🛡️</div>
              <div class="bento-lbl">全面合規達標</div>
              <div class="bento-desc">對齊 ISO 27001、ISO 42001 (AIMS)、NIST CSF、GDPR 與 EU AI Act，建立完整的安全 Guardrails。</div>
            </div>
          </div>

          <div class="info-card" style="padding:20px;">
            <div style="font-weight:800; color:var(--text-main); font-size:1.05rem; margin-bottom:14px;">🏗️ 三層系統架構與人機複核閘道 (3-Tier Architecture)</div>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; margin-bottom:16px;">
              <div style="background:var(--bg-input); padding:14px; border-radius:var(--radius-sm); border-top:3px solid #38bdf8;">
                <div style="font-weight:800; color:#38bdf8; margin-bottom:4px; font-size:0.9rem;">L1 前端互動層 (Interaction)</div>
                <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">支援企業 WebChat、Microsoft Teams、Slack；透過 OpenClaw 與 HermesClaw 整合外部通訊管道。</div>
              </div>
              <div style="background:var(--bg-input); padding:14px; border-radius:var(--radius-sm); border-top:3px solid #10b981;">
                <div style="font-weight:800; color:#10b981; margin-bottom:4px; font-size:0.9rem;">L2 AI Orchestration 中台層</div>
                <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">運行 ServiceAgent 核心服務；提供安全治理（SSO、RBAC、Guardrails、DLP 遮罩）；向量資料庫與多模型路由。</div>
              </div>
              <div style="background:var(--bg-input); padding:14px; border-radius:var(--radius-sm); border-top:3px solid #f59e0b;">
                <div style="font-weight:800; color:#f59e0b; margin-bottom:4px; font-size:0.9rem;">L3 後端與 Agent Runtime 層</div>
                <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">OpenClaw 人機複核執行器 (Human-in-the-Loop)、Hermes 學習型 Agent；對接 MES, SCADA, ERP, PLM, ITSM。</div>
              </div>
            </div>
            <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:12px; border-radius:var(--radius-sm); font-size:0.82rem; color:var(--accent-amber);">
              🔒 <strong>Human-in-the-Loop 安全人機複核機制：</strong> Enterprise GPT 不具備直接修改底層系統資料的權限，所有敏感指令強制經由 OpenClaw 觸發審批工作流，主管核准後才對底層進行實質修改。
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PROPOSAL 2: ChatGPT Enterprise & Agent Blueprint -->
        <!-- ========================================== -->
        <div id="section-chatgpt" class="proposal-content-section" style="margin-bottom:36px;">
          <div class="hero-card" style="margin-top:0; margin-bottom:20px; border-color:var(--accent-teal);">
            <div style="grid-column: 1 / -1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px; background:rgba(168,85,247,0.2); color:#c084fc;">🚀 建議書二：ChatGPT Enterprise & Agent 企業落地與治理藍圖</span>
                <span style="font-size:0.85rem; color:var(--text-muted);">大型電商與數位生活集團 (跨國 EC 平台) 專案 | 顧問負責人：廖倫豪 博士</span>
              </div>
              <div style="font-size:1.7rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
                ChatGPT Enterprise & Codex 企業級 AI 應用落地、治理與普及藍圖
              </div>
              <div style="font-size:0.92rem; color:var(--text-muted); line-height:1.7;">
                本戰略藍圖旨在協助大型電商與集團事業體從「個人 AI 工具」升級為「可治理、可衡量、可普及」的企業級生成式 AI 平台。整合 <strong>ChatGPT Enterprise (安全知識工作入口)</strong>、<strong>Codex (研發、測試、文件與工程流程自動化)</strong>、<strong>GPTs Agent Workspace (專屬 AI 助理)</strong> 與 <strong>Automation Agents (跨系統流程自動化)</strong>，建立 100% Zero Data Training 安全數據隔離與 Champion 種子網絡。
              </div>
            </div>
          </div>

          <div class="bento-grid" style="margin-bottom:20px;">
            <div class="bento-card">
              <div style="font-weight:800; color:#38bdf8; font-size:0.95rem; margin-bottom:4px;">ChatGPT Enterprise</div>
              <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">全企業安全知識工作入口。連結企業知識平台、知識問答、文件生成與研究分析，全員生產力倍增。</div>
            </div>
            <div class="bento-card">
              <div style="font-weight:800; color:#10b981; font-size:0.95rem; margin-bottom:4px;">Codex 工程自動化</div>
              <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">研發、測試、除錯與維運自動化。支援 Agent 工作坊與 CI/CD Code Review 輔助，加速交付效率。</div>
            </div>
            <div class="bento-card">
              <div style="font-weight:800; color:#f59e0b; font-size:0.95rem; margin-bottom:4px;">GPTs Agent Workspace</div>
              <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">專屬 AI 助理模組。打包部門知識、SOP 與最佳實踐 (Golden Samples)，建立可複製工作模式。</div>
            </div>
            <div class="bento-card">
              <div style="font-weight:800; color:#a855f7; font-size:0.95rem; margin-bottom:4px;">Automation Agents</div>
              <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">跨系統流程自動化。串接企業資料庫與 SaaS 工具，自主執行多步驟任務，提升流程營運綜效。</div>
            </div>
          </div>

          <div class="viz-grid">
            <div class="viz-card">
              <h3>📊 三階企業級普及推動模型</h3>
              <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">
                <p><strong>Level 1 (個人應用)</strong>：AI 職能素養培訓、小專題實作與工作流打包。</p>
                <p><strong>Level 2 (部門分流)</strong>：流程需求盤點、Golden Sample Agent POC、資安 Gate Review。</p>
                <p><strong>Level 3 (全體普及)</strong>：全體 ChatGPT Enterprise / Codex 導入、跨部門流程再造。</p>
              </div>
            </div>
            <div class="viz-card">
              <h3>🛡️ 四大可稽核合規治理機制</h3>
              <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">
                <p><strong>1. RBAC & Policy</strong>：角色權限控管、審批門檻與 AGENTS.md Repo 規範。</p>
                <p><strong>2. Seat & Credit Pool</strong>：依角色限制 Credit 與週用量 Limit/Alert/Cap。</p>
                <p><strong>3. Analytics API</strong>：使用率趨勢追蹤、Token Cost 訊號與 PR activity 指標。</p>
                <p><strong>4. Compliance API</strong>：活動日誌串接 SIEM / DLP / eDiscovery，100% 可觀測可調查。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PROPOSAL 3: AISDLC DevSecOps & AI Lifecycle Governance (WITH INTERACTIVE WHEELS & DIAGRAMS) -->
        <!-- ========================================== -->
        <div id="section-aisdlc" class="proposal-content-section" style="margin-bottom:36px;">
          <div class="hero-card" style="margin-top:0; margin-bottom:20px; border-color:#a855f7; background:linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(30,27,75,0.4) 100%);">
            <div style="grid-column: 1 / -1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px; background:rgba(168,85,247,0.25); color:#c084fc; border-color:rgba(168,85,247,0.4);">🛡️ 建議書三：AI in SDLC 企業級雙軌全程治理架構 (AISDLC 藍圖)</span>
                <span style="font-size:0.85rem; color:var(--text-muted);">架構負責人：廖倫豪 博士 (Howard Liao, Ph.D.)</span>
              </div>
              <div style="font-size:1.7rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
                AI in SDLC with DevSecOps & AI Lifecycle 企業級雙軌治理藍圖 (全動態互動視覺版)
              </div>
              <div style="font-size:0.92rem; color:var(--text-muted); line-height:1.7;">
                本架構融合<strong>安全軟體開發生命週期 (Secure SDLC + DevSecOps 7 階段輪盤)</strong>、<strong>AI 模型開發生命週期 (AI/ML Lifecycle 4 象限輪盤)</strong> 與 <strong>AI ➔ ML ➔ DL ➔ GenAI ➔ LLM 包含關係階層圖</strong>，建立企業級「全程治理底座 (Foundation Governance & Guardrails)」。
              </div>
            </div>
          </div>

          <!-- Sub-module Filter Pills for AISDLC -->
          <div style="display:flex; gap:8px; margin-bottom:20px; justify-content:center; flex-wrap:wrap;">
            <button class="aisdlc-subnav-btn active" id="btn-aisdlc-wheel-sdlc" onclick="window.switchAISDLCTab('wheel-sdlc')">
              🎡 模組一：安全 SDLC 7 階段互動輪盤
            </button>
            <button class="aisdlc-subnav-btn" id="btn-aisdlc-wheel-aiml" onclick="window.switchAISDLCTab('wheel-aiml')">
              🧠 模組二：AI 模型生命週期 4 象限輪盤
            </button>
            <button class="aisdlc-subnav-btn" id="btn-aisdlc-hierarchy" onclick="window.switchAISDLCTab('hierarchy')">
              📦 模組三：AI ➔ ML ➔ DL ➔ GenAI ➔ LLM 階層圖
            </button>
            <button class="aisdlc-subnav-btn" id="btn-aisdlc-matrix" onclick="window.switchAISDLCTab('matrix')">
              🌐 模組四：國際合規標準對應矩陣
            </button>
          </div>

          <!-- MODULE 1: SDLC 7-STAGE INTERACTIVE WHEEL -->
          <div id="aisdlc-tab-wheel-sdlc" class="aisdlc-view-pane" style="display:block;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items:center;" class="viz-grid">
              <!-- Left: SVG Interactive Wheel -->
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; text-align:center;">
                <div style="font-weight:800; font-size:0.95rem; color:#38bdf8; margin-bottom:10px;">
                  🎡 點擊扇區探索：安全 SDLC 7 階段與 AI 賦能
                </div>
                <div style="display:flex; justify-content:center;">
                  <svg id="sdlc-svg" viewBox="0 0 600 600" class="w-full max-w-[500px] h-auto drop-shadow-2xl select-none">
              <defs>
                <!-- Gradients for 7 sectors -->
                <linearGradient id="grad-plan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b"/>
                  <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
                <linearGradient id="grad-req" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fbbf24"/>
                  <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
                <linearGradient id="grad-design" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7"/>
                  <stop offset="100%" stop-color="#0369a1"/>
                </linearGradient>
                <linearGradient id="grad-dev" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0369a1"/>
                  <stop offset="100%" stop-color="#1d4ed8"/>
                </linearGradient>
                <linearGradient id="grad-test" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb"/>
                  <stop offset="100%" stop-color="#1e40af"/>
                </linearGradient>
                <linearGradient id="grad-deploy" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#dc2626"/>
                  <stop offset="100%" stop-color="#b91c1c"/>
                </linearGradient>
                <linearGradient id="grad-ops" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ea580c"/>
                  <stop offset="100%" stop-color="#dc2626"/>
                </linearGradient>

                <!-- Arrow markers -->
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- Background Guides -->
              <circle cx="300" cy="300" r="280" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
              
              <!-- 7 Sector Arcs -->
              <path id="sector-plan" class="wheel-sector active" onclick="selectSDLCSector('plan')" 
                    d="M 300 300 L 300 60 A 240 240 0 0 1 487.6 150.3 Z" 
                    fill="url(#grad-plan)" stroke="#0f172a" stroke-width="4" />
              
              <path id="sector-req" class="wheel-sector" onclick="selectSDLCSector('req')" 
                    d="M 300 300 L 487.6 150.3 A 240 240 0 0 1 540 300 Z" 
                    fill="url(#grad-req)" stroke="#0f172a" stroke-width="4" />

              <path id="sector-design" class="wheel-sector" onclick="selectSDLCSector('design')" 
                    d="M 300 300 L 540 300 A 240 240 0 0 1 487.6 449.7 Z" 
                    fill="url(#grad-design)" stroke="#0f172a" stroke-width="4" />

              <path id="sector-dev" class="wheel-sector" onclick="selectSDLCSector('dev')" 
                    d="M 300 300 L 487.6 449.7 A 240 240 0 0 1 300 540 Z" 
                    fill="url(#grad-dev)" stroke="#0f172a" stroke-width="4" />

              <path id="sector-test" class="wheel-sector" onclick="selectSDLCSector('test')" 
                    d="M 300 300 L 300 540 A 240 240 0 0 1 112.4 449.7 Z" 
                    fill="url(#grad-test)" stroke="#0f172a" stroke-width="4" />

              <path id="sector-deploy" class="wheel-sector" onclick="selectSDLCSector('deploy')" 
                    d="M 300 300 L 112.4 449.7 A 240 240 0 0 1 60 300 Z" 
                    fill="url(#grad-deploy)" stroke="#0f172a" stroke-width="4" />

              <path id="sector-ops" class="wheel-sector" onclick="selectSDLCSector('ops')" 
                    d="M 300 300 L 60 300 A 240 240 0 0 1 300 60 Z" 
                    fill="url(#grad-ops)" stroke="#0f172a" stroke-width="4" />

              <!-- Sector Labels -->
              <text x="375" y="155" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">規劃</text>
              <text x="445" y="275" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">需求</text>
              <text x="415" y="395" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">設計</text>
              <text x="300" y="460" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">開發</text>
              <text x="185" y="395" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">測試</text>
              <text x="155" y="275" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">部署</text>
              <text x="225" y="155" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="800" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">維運</text>

              <!-- Central Core Hub: AI 安全 -->
              <circle cx="300" cy="300" r="75" fill="#ffffff" stroke="#ef4444" stroke-width="5" filter="drop-shadow(0 4px 16px rgba(239,68,68,0.4))"/>
              <circle cx="300" cy="300" r="65" fill="#ffffff"/>
              <text x="300" y="290" text-anchor="middle" fill="#dc2626" font-size="21" font-weight="900" letter-spacing="1">AI</text>
              <text x="300" y="322" text-anchor="middle" fill="#dc2626" font-size="21" font-weight="900" letter-spacing="2">安全</text>
            </svg>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:8px;">
                  💡 點擊上方 7 個扇區（規劃、需求、設計、開發、測試、部署、維運）即時載入右側工程與資安檢核點
                </div>
              </div>

              <!-- Right: Real-time Inspection Detail Card -->
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span id="detail-badge" class="status-badge in_progress" style="font-size:0.75rem;">Phase 1 / 7</span>
                  <span id="detail-category" style="font-size:0.8rem; color:var(--accent-teal); font-weight:700;">商業價值與治理前置</span>
                </div>
                <div id="detail-title" style="font-size:1.4rem; font-weight:900; color:var(--text-main); margin-bottom:12px;">規劃 (Planning)</div>
                
                <div style="margin-bottom:14px; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); padding:10px; border-radius:6px; font-size:0.82rem; color:var(--primary-light);">
                  🤖 <strong>AI 角色與賦能：</strong> <span id="detail-ai">商業分析、可行性分析、風險評估、成本與效益預估、法遵與合規基線自動比對。</span>
                </div>

                <div style="margin-bottom:12px;">
                  <div style="font-weight:700; font-size:0.82rem; color:var(--text-main); margin-bottom:6px;">🛠️ 工程與開發實踐：</div>
                  <div id="detail-engineering" style="display:flex; flex-wrap:wrap; gap:4px;"></div>
                </div>

                <div style="margin-bottom:14px;">
                  <div style="font-weight:700; font-size:0.82rem; color:#f87171; margin-bottom:6px;">🛡️ 資安控制與防護檢核 (Security)：</div>
                  <div id="detail-security" style="display:flex; flex-wrap:wrap; gap:4px;"></div>
                </div>

                <div style="border-top:1px solid var(--border-color); padding-top:10px; font-size:0.78rem; color:var(--text-muted); display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
                  <div>🚪 <strong>品質門檻：</strong> <span id="detail-gate" style="color:var(--accent-amber);">Gate G0 (商業與資安立項基線)</span></div>
                  <div id="detail-standard" style="color:var(--text-muted);">NIST SSDF: PO.1, PO.2 | ISO 27001: 5.1</div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 2: AI/ML 4-QUADRANT INTERACTIVE WHEEL -->
          <div id="aisdlc-tab-wheel-aiml" class="aisdlc-view-pane" style="display:none;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items:center;" class="viz-grid">
              <!-- Left: SVG 4-Quadrant Wheel -->
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; text-align:center;">
                <div style="font-weight:800; font-size:0.95rem; color:#f59e0b; margin-bottom:10px;">
                  🧠 點擊象限探索：AI 模型生命週期 (MLOps 治理)
                </div>
                <div style="display:flex; justify-content:center;">
                  <svg id="aiml-svg" viewBox="0 0 600 600" class="w-full max-w-[500px] h-auto drop-shadow-2xl select-none">
              <defs>
                <linearGradient id="grad-q1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fbbf24"/>
                  <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
                <linearGradient id="grad-q2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b"/>
                  <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
                <linearGradient id="grad-q3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7"/>
                  <stop offset="100%" stop-color="#1d4ed8"/>
                </linearGradient>
                <linearGradient id="grad-q4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7"/>
                  <stop offset="100%" stop-color="#0369a1"/>
                </linearGradient>
              </defs>

              <!-- Outer Guide Ring -->
              <circle cx="300" cy="300" r="275" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>

              <!-- Q1: 開發前 (Pre-development) -->
              <path id="quad-pre" class="wheel-sector active" onclick="selectAIMLQuadrant('pre')"
                    d="M 300 300 L 300 90 A 210 210 0 0 1 510 300 Z"
                    fill="url(#grad-q1)" stroke="#0f172a" stroke-width="5"/>
              
              <!-- Q2: 開發 (Development) -->
              <path id="quad-dev" class="wheel-sector" onclick="selectAIMLQuadrant('dev')"
                    d="M 300 300 L 510 300 A 210 210 0 0 1 300 510 Z"
                    fill="url(#grad-q2)" stroke="#0f172a" stroke-width="5"/>

              <!-- Q3: 部署 (Deployment) -->
              <path id="quad-deploy" class="wheel-sector" onclick="selectAIMLQuadrant('deploy')"
                    d="M 300 300 L 300 510 A 210 210 0 0 1 90 300 Z"
                    fill="url(#grad-q3)" stroke="#0f172a" stroke-width="5"/>

              <!-- Q4: 部署後 (Post-deployment) -->
              <path id="quad-post" class="wheel-sector" onclick="selectAIMLQuadrant('post')"
                    d="M 300 300 L 90 300 A 210 210 0 0 1 300 90 Z"
                    fill="url(#grad-q4)" stroke="#0f172a" stroke-width="5"/>

              <!-- Quadrant Inner Labels -->
              <text x="390" y="210" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">開發前</text>
              <text x="390" y="232" text-anchor="middle" fill="#fef08a" font-size="12" font-weight="600">Pre-development</text>

              <text x="390" y="375" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">開發</text>
              <text x="390" y="397" text-anchor="middle" fill="#fef08a" font-size="12" font-weight="600">Development</text>

              <text x="210" y="375" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">部署</text>
              <text x="210" y="397" text-anchor="middle" fill="#bae6fd" font-size="12" font-weight="600">Deployment</text>

              <text x="210" y="210" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">部署後</text>
              <text x="210" y="232" text-anchor="middle" fill="#bae6fd" font-size="12" font-weight="600">Post-deployment</text>

              <!-- Outer Orbit Step Nodes -->
              <text x="420" y="60" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">定義問題</text>
              <text x="520" y="140" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">蒐集資料</text>
              <text x="535" y="225" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">資料前處理</text>
              <text x="540" y="320" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">探索性資料分析</text>
              <text x="530" y="415" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">選擇模型</text>
              <text x="470" y="495" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">訓練模型</text>
              <text x="350" y="555" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">評估模型</text>
              <text x="180" y="525" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">部署模型</text>
              <text x="135" y="310" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">透明性與文件化</text>
              <text x="145" y="175" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">監視與維護模型</text>
              <text x="245" y="60" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">持續回饋與改善</text>

              <!-- Central Core: 治理 -->
              <circle cx="300" cy="300" r="55" fill="#ffffff" stroke="#dc2626" stroke-width="4" filter="drop-shadow(0 4px 12px rgba(220,38,38,0.35))"/>
              <text x="300" y="308" text-anchor="middle" fill="#dc2626" font-size="20" font-weight="900" letter-spacing="2">治理</text>
            </svg>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:8px;">
                  💡 點擊 4 大象限（開發前、開發、部署、部署後）檢視完整 MLOps 流程與資安治理措施
                </div>
              </div>

              <!-- Right: Real-time AIML Detail Card -->
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span id="aiml-badge" class="status-badge verified" style="font-size:0.75rem;">Quadrant 1 / 4</span>
                  <span id="aiml-focus" style="font-size:0.8rem; color:var(--accent-amber); font-weight:700;">商業問題定義與資料整備</span>
                </div>
                <div id="aiml-title" style="font-size:1.4rem; font-weight:900; color:var(--text-main); margin-bottom:12px;">開發前 (Pre-development)</div>
                
                <div style="margin-bottom:12px;">
                  <div style="font-weight:700; font-size:0.82rem; color:var(--text-main); margin-bottom:6px;">📍 階段標準步驟：</div>
                  <div id="aiml-steps" style="display:flex; flex-wrap:wrap; gap:4px;"></div>
                </div>

                <div style="margin-bottom:12px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.25); padding:10px; border-radius:6px; font-size:0.82rem; color:var(--accent-amber);">
                  📋 <strong>核心工作範疇：</strong> <span id="aiml-work">釐清商業目標、預期 KPI、資料來源合法性與權限評估、建立特徵管線。</span>
                </div>

                <div style="margin-bottom:14px;">
                  <div style="font-weight:700; font-size:0.82rem; color:#34d399; margin-bottom:6px;">🛡️ 治理與 MLOps 檢核點：</div>
                  <ul id="aiml-gov" style="margin-left:18px; font-size:0.8rem; color:var(--text-muted); line-height:1.5;"></ul>
                </div>

                <div style="border-top:1px solid var(--border-color); padding-top:10px; font-size:0.78rem; color:var(--text-muted); display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
                  <div>🛠️ <strong>推薦工具鏈：</strong> <span id="aiml-tool" style="color:#38bdf8;">Unity Catalog, Delta Lake</span></div>
                  <div id="aiml-ref" style="color:var(--text-muted);">NIST AI RMF: MAP 1.1 | ISO 42001: A.6</div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 3: AI -> ML -> DL -> GenAI -> LLM HIERARCHY DIAGRAM -->
          <div id="aisdlc-tab-hierarchy" class="aisdlc-view-pane" style="display:none;">
            <div class="ai-hierarchy-outer">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                <span style="font-size:1.15rem; font-weight:900; color:#38bdf8;">🤖 人工智慧 (Artificial Intelligence, AI)</span>
                <span class="status-badge" style="font-size:0.75rem; background:rgba(56,189,248,0.2); color:#38bdf8;">最外層：廣義智慧系統</span>
              </div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">
                涵蓋所有能模擬人類智慧行為之技術與系統（如智慧語音助理 Siri/Alexa、自主移動機器人、自駕車導航、專家系統與規則引擎）。
              </div>

              <!-- ML Level -->
              <div class="ai-hierarchy-ml">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                  <span style="font-size:1.05rem; font-weight:900; color:#10b981;">📊 機器學習 (Machine Learning, ML)</span>
                  <span class="status-badge" style="font-size:0.75rem; background:rgba(16,185,129,0.2); color:#10b981;">第二層：從資料中學習規律</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">
                  利用統計演算法從資料中自動學習特徵與模式（涵蓋監督式學習、非監督式學習、強化學習、隨機森林、XGBoost、特徵工程與水果/圖像分類）。
                </div>

                <!-- DL Level -->
                <div class="ai-hierarchy-dl">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                    <span style="font-size:1.0rem; font-weight:900; color:#f59e0b;">🧠 深度學習 (Deep Learning, DL)</span>
                    <span class="status-badge" style="font-size:0.75rem; background:rgba(245,158,11,0.2); color:#f59e0b;">第三層：多層神經網絡</span>
                  </div>
                  <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">
                    利用多層深層神經網路 (CNN、RNN、Transformer) 自主抽取高階抽象特徵（如複雜圖像識別、貓狗辨識、語音特徵合成）。
                  </div>

                  <!-- GenAI Level -->
                  <div class="ai-hierarchy-genai">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                      <span style="font-size:0.95rem; font-weight:900; color:#c084fc;">🎨 生成式 AI (Generative AI, GenAI)</span>
                      <span class="status-badge" style="font-size:0.75rem; background:rgba(168,85,247,0.2); color:#c084fc;">第四層：創造全新內容</span>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">
                      能創造全新文字、圖像、音訊、視訊與代碼之多模態模型（如 Runway 視訊生成、Midjourney 繪圖、AIVA 音樂生成、Suno、Stable Diffusion）。
                    </div>

                    <!-- LLM Level -->
                    <div class="ai-hierarchy-llm">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                        <span style="font-size:0.95rem; font-weight:900; color:#06b6d4;">💬 大型語言模型 (Large Language Models, LLM)</span>
                        <span class="status-badge" style="font-size:0.75rem; background:rgba(6,182,212,0.25); color:#06b6d4;">核心：數十億至兆級參數語言核心</span>
                      </div>
                      <div style="font-size:0.82rem; color:var(--text-main); font-weight:600;">
                        以超大規模文字語料預訓練之 Transformer 語言架構（包含 ChatGPT / GPT-4o、Claude 3.5 Sonnet、Google Gemini 1.5/3.7、Microsoft Copilot、開源 LLaMA 3 及 DeepSeek）。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 4: COMPLIANCE MATRIX -->
          <div id="aisdlc-tab-matrix" class="aisdlc-view-pane" style="display:none;">
            <div class="info-card" style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
                <thead>
                  <tr style="border-bottom:2px solid var(--border-color); color:var(--primary-light);">
                    <th style="padding:12px;">生命週期階段</th>
                    <th style="padding:12px;">ISO 27001 / 27701</th>
                    <th style="padding:12px;">ISO 42001 (AIMS)</th>
                    <th style="padding:12px;">NIST CSF / AI RMF</th>
                    <th style="padding:12px;">OWASP Top 10 LLM / EU AI Act</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#38bdf8;">規劃 (Planning)</td>
                    <td style="padding:10px;">A.5.8, A.5.19 供應鏈與資安要求</td>
                    <td style="padding:10px;">Clause 4, 6 AI 目標與風險評估</td>
                    <td style="padding:10px;">GV.OC-01, MAP 1.1 背景與風險邊界</td>
                    <td style="padding:10px;">EU AI Act 風險分級與合規評定</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#10b981;">設計 (Design)</td>
                    <td style="padding:10px;">A.8.25 安全系統架構與工程原則</td>
                    <td style="padding:10px;">A.6.2 AI 系統架構設計與邊界審查</td>
                    <td style="padding:10px;">ID.RA-01, MAP 2.2 威脅建模 (STRIDE)</td>
                    <td style="padding:10px;">LLM01: Prompt Injection 防護設計</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#f59e0b;">開發 (Dev)</td>
                    <td style="padding:10px;">A.8.28 安全編碼 (Secure Coding)</td>
                    <td style="padding:10px;">A.7.2 訓練資料主權與脫敏管理</td>
                    <td style="padding:10px;">PR.DS-01, MEASURE 2.5 SBOM 物料清單</td>
                    <td style="padding:10px;">LLM06: 敏感資訊外洩防護 (DLP)</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#ec4899;">測試 (Testing)</td>
                    <td style="padding:10px;">A.8.29 安全測試與弱點掃描 (DAST)</td>
                    <td style="padding:10px;">A.8.2 模型偏見評測與穩健性驗證</td>
                    <td style="padding:10px;">PR.IP-01, MEASURE 1.1 邊界模糊測試</td>
                    <td style="padding:10px;">LLM02: 不安全輸出處置防護</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#a855f7;">部署 (Deploy)</td>
                    <td style="padding:10px;">A.8.31 環境隔離與變更管理</td>
                    <td style="padding:10px;">A.9.1 AI 系統部署簽署與驗收</td>
                    <td style="padding:10px;">PR.AC-01, MANAGE 2.2 產銷履歷驗證</td>
                    <td style="padding:10px;">LLM05: 供應鏈脆弱性管理 (SLSA)</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; font-weight:700; color:#06b6d4;">維運 (Ops)</td>
                    <td style="padding:10px;">A.8.16 活動監控與日誌審計 (SIEM)</td>
                    <td style="padding:10px;">Clause 9, 10 漂移監控與持續改進</td>
                    <td style="padding:10px;">DE.CM-01, GOVERN 1.2 AIOps 監控</td>
                    <td style="padding:10px;">EU AI Act 上線後監控與事件回報</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- ATTACHMENT 4: Enterprise Generative AI & Autonomous Agent Governance Policy -->
        <!-- ========================================== -->
        <div id="section-policy" class="proposal-content-section" style="margin-bottom:36px;">
          <div class="hero-card" style="margin-top:0; margin-bottom:20px; border-color:#10b981; background:linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(6,78,59,0.3) 100%);">
            <div style="grid-column: 1 / -1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px; background:rgba(16,185,129,0.25); color:#34d399; border-color:rgba(16,185,129,0.4);">📜 專案附件四：企業級生成式 AI 與 AI Agent 治理管理辦法 (內部正式規範)</span>
                <span style="font-size:0.85rem; color:var(--text-muted);">文件編號：ENT-AI-GOV-001 | 治理擁有者：VP 暨 AI 治理委員會</span>
              </div>
              <div style="font-size:1.7rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
                企業級生成式 AI 與自主 AI Agent 治理管理辦法
              </div>
              <div style="font-size:0.92rem; color:var(--text-muted); line-height:1.7;">
                (整合 <strong>ISO/IEC 27001:2022 ISMS</strong>、<strong>ISO/IEC 42001:2023 AIMS</strong> 與 <strong>NIST GenAI RMF</strong> 國際合規規範)<br>
                本管理辦法確立四大核心防線：<strong>身分與密鑰強制隔離 (SSO/MFA/Vault)</strong>、<strong>最小權限與環境分級 (A0～A4 Agent 劃分)</strong>、<strong>人類最終負責與資料遮罩 (L1～L4 分類)</strong>、<strong>全程可稽核與營運持續 (1 小時通報 SLA 與緊急 Kill Switch)</strong>。
              </div>
            </div>
          </div>

          <!-- Policy 1: A0~A4 Agent Autonomous Levels -->
          <div class="section-title">🤖 AI Agent 自主性五級分級管制標準 (Agent Autonomy Tiers)</div>
          <div class="cards-grid" style="margin-bottom:20px;">
            <div class="info-card">
              <div>
                <div style="font-weight:800; color:#38bdf8; font-size:0.95rem; margin-bottom:4px;">A0 級：輔助查詢型 (Read-Only)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">唯讀模式，僅得查詢公開或 L1～L2 授權文檔，無任何系統寫入或 API 執行權限。</div>
              </div>
            </div>
            <div class="info-card">
              <div>
                <div style="font-weight:800; color:#10b981; font-size:0.95rem; margin-bottom:4px;">A1 級：受控建議型 (Drafting Only)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">可生成草稿、工單建議或代碼，需經權責人員手動檢視與確認後方可由人工複製執行。</div>
              </div>
            </div>
            <div class="info-card">
              <div>
                <div style="font-weight:800; color:#f59e0b; font-size:0.95rem; margin-bottom:4px;">A2 級：半自主審批型 (Approval Gate)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">具備呼叫非破壞性 API 權限，涉及敏感狀態修改時強制觸發 OpenClaw 人工審批流。</div>
              </div>
            </div>
            <div class="info-card">
              <div>
                <div style="font-weight:800; color:#ec4899; font-size:0.95rem; margin-bottom:4px;">A3 級：高度自主沙盒型 (Sandbox)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">僅限隔離沙盒 (Sandbox) 環境內自主執行多步驟任務，全面實施實時監控與硬性配額。</div>
              </div>
            </div>
            <div class="info-card" style="border-color:#ef4444;">
              <div>
                <div style="font-weight:800; color:#ef4444; font-size:0.95rem; margin-bottom:4px;">A4 級：完全自主型 (Prohibited)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">無人監管之全自主系統。<strong>【企業目前全面嚴格禁止引進與使用】</strong>。</div>
              </div>
            </div>
          </div>

          <!-- Policy 2: L1~L4 Data Classification & Five Absolute Prohibitions -->
          <div class="viz-grid">
            <div class="viz-card">
              <h3>🚫 五大絕對禁止輸入項目 (Absolute Prohibitions)</h3>
              <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">
                <ul style="margin-left:18px;">
                  <li><strong>1. 認證與存取憑證</strong>：系統密碼、MFA Token、API Key、私鑰、TLS 憑證、SSH Key、資料庫連線字串。</li>
                  <li><strong>2. 個人敏感隱私 (PII)</strong>：客戶真實姓名、身分證字號、護照、手機、住址、銀行卡號、員工薪資績效。</li>
                  <li><strong>3. 未公開商業機密</strong>：併購計畫、董事會議事錄、未公開財務預測、核心定價公式、投標底價。</li>
                  <li><strong>4. 維運與攻擊性資訊</strong>：未修補之弱點掃描報告 (DAST/SAST)、滲透測試細節、Production DB Dump。</li>
                  <li><strong>5. 核心智慧財產權</strong>：未公開之核心撮合演算法、核心加密協議代碼、受 NDA 嚴格保護之技術。</li>
                </ul>
              </div>
            </div>

            <div class="viz-card">
              <h3>⚡ 應變機制與緊急阻斷 (Kill Switch & SLA)</h3>
              <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">
                <ul style="margin-left:18px;">
                  <li><strong>1 小時通報 SLA</strong>：發現誤上傳機密、疑似 Token 外洩、Agent 異常連線時，須於 1 小時內通報資安團隊。</li>
                  <li><strong>緊急阻斷開關 (Kill Switch)</strong>：SRE/MIS 具備一鍵切斷 API Key、終止 Agent Session 與隔離容器之控制權。</li>
                  <li><strong>手動替代 SOP</strong>：所有關鍵 AI 輔助流程均備妥傳統人工備援操作路徑，確保業務連續性 (BCP)。</li>
                  <li><strong>每年 2 小時全員培訓</strong>：全體同仁每年須完成至少 2 小時 AI 資安與倫理培訓並通過測驗。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize interactive sectors
    window.selectSDLCSector('plan');
    window.selectAIMLQuadrant('pre');
  }

  // Sub-navigation Switcher between AISDLC Modules
  window.switchAISDLCTab = function(moduleKey) {
    document.querySelectorAll('.aisdlc-subnav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `btn-aisdlc-${moduleKey}`);
    });

    const modules = ['wheel-sdlc', 'wheel-aiml', 'hierarchy', 'matrix'];
    modules.forEach(mId => {
      const pane = document.getElementById(`aisdlc-tab-${mId}`);
      if (pane) {
        pane.style.display = (mId === moduleKey) ? 'block' : 'none';
      }
    });
  };

  // Interactive SDLC Sector Selector
  window.selectSDLCSector = function(phaseKey) {
    const data = sdlcData[phaseKey];
    if (!data) return;

    document.querySelectorAll('#sdlc-svg .wheel-sector').forEach(el => el.classList.remove('active'));
    const activeSector = document.getElementById('sector-' + phaseKey);
    if (activeSector) activeSector.classList.add('active');

    const badge = document.getElementById('detail-badge');
    const title = document.getElementById('detail-title');
    const cat = document.getElementById('detail-category');
    const ai = document.getElementById('detail-ai');
    const std = document.getElementById('detail-standard');
    const gate = document.getElementById('detail-gate');
    const engCont = document.getElementById('detail-engineering');
    const secCont = document.getElementById('detail-security');

    if (badge) badge.innerText = data.badge;
    if (title) title.innerText = data.title;
    if (cat) cat.innerText = data.category;
    if (ai) ai.innerText = data.ai;
    if (std) std.innerText = data.standard;
    if (gate) gate.innerText = data.gate;

    if (engCont) {
      engCont.innerHTML = data.engineering.map(tag => 
        `<span class="node-pill" style="background:#1e293b; color:#e2e8f0; border:1px solid #334155;">${tag}</span>`
      ).join('');
    }

    if (secCont) {
      secCont.innerHTML = data.security.map(tag => 
        `<span class="node-pill" style="background:rgba(239,68,68,0.15); color:#fca5a5; border:1px solid rgba(239,68,68,0.4);">${tag}</span>`
      ).join('');
    }
  };

  // Interactive AIML Quadrant Selector
  window.selectAIMLQuadrant = function(quadKey) {
    const data = aimlData[quadKey];
    if (!data) return;

    document.querySelectorAll('#aiml-svg .wheel-sector').forEach(el => el.classList.remove('active'));
    const activeQuad = document.getElementById('quad-' + quadKey);
    if (activeQuad) activeQuad.classList.add('active');

    const badge = document.getElementById('aiml-badge');
    const title = document.getElementById('aiml-title');
    const focus = document.getElementById('aiml-focus');
    const work = document.getElementById('aiml-work');
    const ref = document.getElementById('aiml-ref');
    const tool = document.getElementById('aiml-tool');
    const stepsCont = document.getElementById('aiml-steps');
    const govCont = document.getElementById('aiml-gov');

    if (badge) badge.innerText = data.badge;
    if (title) title.innerText = data.title;
    if (focus) focus.innerText = data.focus;
    if (work) work.innerText = data.work;
    if (ref) ref.innerText = data.ref;
    if (tool) tool.innerText = data.tool;

    if (stepsCont) {
      stepsCont.innerHTML = data.steps.map(s => 
        `<span class="node-pill" style="background:rgba(245,158,11,0.2); color:#fde68a; border:1px solid rgba(245,158,11,0.5); font-weight:700;">${s}</span>`
      ).join('');
    }

    if (govCont) {
      govCont.innerHTML = data.gov.map(g => `<li>${g}</li>`).join('');
    }
  };

  // Main Proposal Sub-tab Switcher
  window.switchProposalSection = function(sectionKey) {
    document.querySelectorAll('.proposal-subtab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `subtab-btn-${sectionKey}`);
    });

    const sections = ['serviceagent', 'chatgpt', 'aisdlc', 'policy'];
    
    if (sectionKey === 'all') {
      sections.forEach(secId => {
        const el = document.getElementById(`section-${secId}`);
        if (el) el.style.display = 'block';
      });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      sections.forEach(secId => {
        const el = document.getElementById(`section-${secId}`);
        if (el) {
          if (secId === sectionKey) {
            el.style.display = 'block';
            const offset = el.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          } else {
            el.style.display = 'none';
          }
        }
      });
    }
  };

})();
