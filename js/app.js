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
  function renderProposalView() {
    const page = document.getElementById('page-proposal');
    if (!page) return;

    page.innerHTML = `
      <div class="container">
        <!-- Proposal 1 Header -->
        <div class="hero-card" style="margin-bottom:28px; border-color:var(--primary-light);">
          <div style="grid-column: 1 / -1;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
              <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px;">📄 建議書一：企業董事會專案服務建議書 V1.0 (正式版)</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">專案負責人：廖倫豪 博士 (Howard Liao, Ph.D.)</span>
            </div>
            <div style="font-size:1.8rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
              ServiceAgent 企業級生成式 AI 中控平台架構與落地建議書 (高科技製造業通用版)
            </div>
            <div style="font-size:0.95rem; color:var(--text-muted); line-height:1.7;">
              本建議書由廖倫豪博士親自為高科技製造與企業董事會規劃，旨在建立「高可控、可治理、具資安防護網」的企業級 AI 中央神經系統。結合 <strong>Enterprise GPT (智能決策中控)</strong>、<strong>Enterprise KM (25+ 格式混合 RAG 檢索)</strong>、<strong>AI Meeting (會議語音轉錄回寫)</strong>，並串接 <strong>OpenClaw (人機複核安全閘道)</strong> 與 <strong>Hermes Agent (自主學習型 Agent)</strong>，完全對齊 ISO 27001/27701、ISO 42001 (AIMS)、NIST CSF 及歐盟 AI 法案 (EU AI Act)。
            </div>
          </div>
        </div>

        <!-- 1.4 Four Core Strategic Goals Cards -->
        <div class="section-title">🏛️ 四大核心戰略目標 (Core Strategic Goals)</div>
        <div class="bento-grid" style="margin-bottom:28px;">
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:6px;">🏛️</div>
            <div class="bento-lbl">統一中控治理</div>
            <div class="bento-desc">集中管理多 LLM 模型路由調度、KM 知識庫與 Multi-Agent 流程編排，告別 API Key 混亂。</div>
          </div>
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:6px;">🏭</div>
            <div class="bento-lbl">產線維修自動化</div>
            <div class="bento-desc">SCADA 異常排查時間縮短 80%，AI 自動產出 SOP 排查建議，經 OpenClaw 人工核准後執行。</div>
          </div>
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:6px;">🏗️</div>
            <div class="bento-lbl">領域知識智能化</div>
            <div class="bento-desc">萃取高科技製造領域專家經驗，支援 25+ 檔案 Parser 與圖表表格重構，實現 95% 精準度 RAG。</div>
          </div>
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:6px;">🛡️</div>
            <div class="bento-lbl">全面合規達標</div>
            <div class="bento-desc">對齊 ISO 27001、ISO 42001 (AIMS)、NIST CSF、GDPR 與 EU AI Act，建立完整的安全 Guardrails。</div>
          </div>
        </div>

        <!-- 3.1 Three-Layer Architecture Illustrated Diagram -->
        <div class="section-title">🏗️ 三層系統架構與人機複核閘道 (3-Tier Architecture)</div>
        <div class="info-card" style="margin-bottom:28px; padding:24px;">
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:20px;">
            <div style="background:var(--bg-input); padding:16px; border-radius:var(--radius-sm); border-top:3px solid #38bdf8;">
              <div style="font-weight:800; color:#38bdf8; margin-bottom:6px;">L1 前端互動層 (Interaction)</div>
              <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                支援企業 WebChat、Microsoft Teams、Slack；透過 OpenClaw 與 HermesClaw 整合外部通訊管道，提供全通路統一接入點。
              </div>
            </div>
            <div style="background:var(--bg-input); padding:16px; border-radius:var(--radius-sm); border-top:3px solid #10b981;">
              <div style="font-weight:800; color:#10b981; margin-bottom:6px;">L2 AI Orchestration 中台層</div>
              <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                運行 ServiceAgent 核心服務；提供安全治理（SSO、RBAC、Guardrails、DLP 動態遮罩、審計日誌）；向量資料庫 (Milvus/Qdrant) 與多模型路由。
              </div>
            </div>
            <div style="background:var(--bg-input); padding:16px; border-radius:var(--radius-sm); border-top:3px solid #f59e0b;">
              <div style="font-weight:800; color:#f59e0b; margin-bottom:6px;">L3 後端與 Agent Runtime 層</div>
              <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                OpenClaw 人機複核執行器 (Human-in-the-Loop)、Hermes 學習型 Agent；對接 MES, SCADA, ERP, PLM, ITSM, DWH 核心系統。
              </div>
            </div>
          </div>

          <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:14px; border-radius:var(--radius-sm); font-size:0.88rem; color:var(--accent-amber);">
            🔒 <strong>Human-in-the-Loop 安全人機複核機制：</strong> Enterprise GPT 不具備直接修改底層系統資料或變更 MES 狀態的權限，所有敏感指令均轉化為建議方案，必須經由 OpenClaw 觸發審批工作流，主管點擊「核准」後才對底層進行實質修改，確保 100% 技術可控。
          </div>
        </div>

        <!-- Proposal 2 Header: ChatGPT Enterprise & Agent Blueprint -->
        <div class="hero-card" style="margin-bottom:28px; border-color:var(--accent-teal);">
          <div style="grid-column: 1 / -1;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
              <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px; background:rgba(16,185,129,0.2); color:#10b981;">🚀 建議書二：ChatGPT Enterprise & Agent 企業落地與治理藍圖</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">大型電商與數位生活集團 (跨國 EC 平台) 專案 | 顧問負責人：廖倫豪 博士</span>
            </div>
            <div style="font-size:1.8rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
              ChatGPT Enterprise & Codex 企業級 AI 應用落地、治理與普及藍圖
            </div>
            <div style="font-size:0.95rem; color:var(--text-muted); line-height:1.7;">
              本戰略藍圖旨在協助大型電商與集團事業體從「個人 AI 工具」升級為「可治理、可衡量、可普及」的企業級生成式 AI 平台。整合 <strong>ChatGPT Enterprise (安全知識工作入口)</strong>、<strong>Codex (研發、測試、文件與工程流程自動化)</strong>、<strong>GPTs Agent Workspace (專屬 AI 助理)</strong> 與 <strong>Automation Agents (跨系統流程自動化)</strong>，建立 100% Zero Data Training 安全數據隔離與 Champion 種子網絡。
            </div>
          </div>
        </div>

        <!-- 01 Enterprise Tool Matrix -->
        <div class="section-title">🛠️ 01 企業級 AI 工具與場景對齊矩陣 (Enterprise Tool Matrix)</div>
        <div class="bento-grid" style="margin-bottom:28px;">
          <div class="bento-card">
            <div style="font-weight:800; color:#38bdf8; font-size:1.05rem; margin-bottom:6px;">ChatGPT Enterprise</div>
            <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">全企業安全知識工作入口。連結企業知識平台、知識問答、文件生成與研究分析，全員生產力倍增。</div>
          </div>
          <div class="bento-card">
            <div style="font-weight:800; color:#10b981; font-size:1.05rem; margin-bottom:6px;">Codex 工程自動化</div>
            <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">研發、測試、除錯與維運自動化。支援 Agent 工作坊與 CI/CD Code Review 輔助，加速交付效率。</div>
          </div>
          <div class="bento-card">
            <div style="font-weight:800; color:#f59e0b; font-size:1.05rem; margin-bottom:6px;">GPTs Agent Workspace</div>
            <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">專屬 AI 助理模組。打包部門知識、SOP 與最佳實踐 (Golden Samples)，建立可複製工作模式。</div>
          </div>
          <div class="bento-card">
            <div style="font-weight:800; color:#a855f7; font-size:1.05rem; margin-bottom:6px;">Automation Agents</div>
            <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">跨系統流程自動化。串接企業資料庫與 SaaS 工具，自主執行多步驟任務，提升流程營運綜效。</div>
          </div>
        </div>

        <!-- 02 Three-Level Enterprise Adoption Model Cards -->
        <div class="section-title">📊 02 企業級 AI 三階普及推動模型 (3-Level Enterprise Adoption Model)</div>
        <div class="info-card" style="margin-bottom:28px;">
          <div style="display:flex; flex-direction:column; gap:14px;">
            <div style="background:rgba(56,189,248,0.12); border-left:4px solid #38bdf8; padding:16px; border-radius:6px;">
              <div style="font-weight:800; color:#38bdf8; font-size:1.05rem;">Level 3：企業全體普及與跨部門流程再造 (Enterprise-wide Scale)</div>
              <div style="font-size:0.88rem; color:var(--text-main); margin-top:4px;">對象：全體員工 / IT & 資安治理單位 / 跨部門 Key Account</div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px; line-height:1.5;">
                重點工作：以 ChatGPT Enterprise 作為全企業安全知識工作入口；Codex 支援研發、測試、文件與工程流程自動化；建置 SOC2 Type II、Zero Data Training、DLP 敏感個資遮罩與成效追蹤儀表板。
              </div>
            </div>

            <div style="background:rgba(16,185,129,0.12); border-left:4px solid #10b981; padding:16px; border-radius:6px;">
              <div style="font-weight:800; color:#10b981; font-size:1.05rem;">Level 2：部門 AI 流程分流與 Agent POC 實作 (Departmental Flow Alignment)</div>
              <div style="font-size:0.88rem; color:var(--text-main); margin-top:4px;">對象：HR / IT / 供應鏈 / 行銷 / 部門主管</div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px; line-height:1.5;">
                重點工作：進行部門流程需求盤點與 ROI 效益判斷；針對高價值場景進行 RPA / IPA / AI Agent 工具適配，開發 Golden Sample Agent POC 與資安 Gate Review。
              </div>
            </div>

            <div style="background:rgba(245,158,11,0.12); border-left:4px solid #f59e0b; padding:16px; border-radius:6px;">
              <div style="font-weight:800; color:#f59e0b; font-size:1.05rem;">Level 1：個人應用與 AI 職能素養培訓 (Individual Literacy)</div>
              <div style="font-size:0.88rem; color:var(--text-main); margin-top:4px;">對象：各職能同仁 / 潛在 Super User / 種子幕僚</div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px; line-height:1.5;">
                重點工作：舉辦生成式 AI 職能實作講座，陪伴同仁探索日常工作場景，打包個人知識與 SOP 最佳實踐，為企業奠定種子 Champion 網絡基礎。
              </div>
            </div>
          </div>
        </div>

        <!-- 03 Real-world Case Studies & 04 Advisory Roadmap -->
        <div class="viz-grid" style="margin-bottom:28px;">
          <div class="viz-card">
            <h3>🏭 03 製造與高科技產業兩大落地成功案例 (Case Studies)</h3>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
              <ul style="margin-left:18px;">
                <li><strong>案例 A (某記憶體模組製造廠)</strong>：從個人小專題升級為 ChatGPT Enterprise / Codex 全體普及；透過流程分流與適性分析將需求歸流至個人開發、IT 協作或外包分流。</li>
                <li><strong>案例 B (某 AI 伺服器零組件 OEM/ODM 客戶)</strong>：推動 Level 1 素養 ➔ Level 2 部門 Agent POC 與資安 Gate Review ➔ Level 3 跨部門種子幕僚 Agent 開發，實現流程再造。</li>
              </ul>
            </div>
          </div>

          <div class="viz-card">
            <h3>🧭 04 6 週 Pilot 導入與 4 階段治理發展路徑 (Advisory Lifecycle)</h3>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
              <ul style="margin-left:18px;">
                <li><strong>Week 0–2 啟動與建置</strong>：確定預計席次、資安治理窗口、提供建議成效指標與 Onboarding 說明會。</li>
                <li><strong>Week 3–6 Pilot 實作 & Office Hours</strong>：每團隊 30 分鐘專案陪跑，進行 Deep Dive 與場景調整。</li>
                <li><strong>Week 6–7 收斂與 Demo Day</strong>：蒐集 NPS 與工時節省數據，產出 POC 效益分析與高層擴散報告。</li>
                <li><strong>4 階段治理架構</strong>：快篩盤點 ➔ 治理設計 (Guardrails/RBAC) ➔ 試行導入 ➔ 逐部門擴散與季度回審。</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 05 Audit Trail & Compliance Stack -->
        <div class="section-title">🛡️ 05 四大可稽核合規治理機制 (Audit Trail Stack)</div>
        <div class="info-card" style="margin-bottom:28px; padding:20px;">
          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px;">
            <div style="background:var(--bg-input); padding:12px; border-radius:6px;">
              <div style="font-weight:700; color:#38bdf8; margin-bottom:4px;">1. RBAC & Policy</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Role/Group 權限控管、Approval 人工審批門檻與 AGENTS.md Repo Rules 規範。</div>
            </div>
            <div style="background:var(--bg-input); padding:12px; border-radius:6px;">
              <div style="font-weight:700; color:#10b981; margin-bottom:4px;">2. Seat & Credit Pool</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">依角色控制 Credit 額度與週用量 Limit/Alert/Cap 通知阻擋機制。</div>
            </div>
            <div style="background:var(--bg-input); padding:12px; border-radius:6px;">
              <div style="font-weight:700; color:#f59e0b; margin-bottom:4px;">3. Analytics API</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">使用率儀表板、Token Cost 訊號與 Code Review PR Activity 數據繪製。</div>
            </div>
            <div style="background:var(--bg-input); padding:12px; border-radius:6px;">
              <div style="font-weight:700; color:#a855f7; margin-bottom:4px;">4. Compliance API</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">完整的 Prompt/Response AI 活動日誌串接 SIEM / DLP / eDiscovery，可觀測可調查。</div>
            </div>
          </div>
        </div>
      </div>
    `;
}

  // Portfolio View
  function renderPortfolioView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-portfolio');
    if (!page) return;

    const publicAssets = state.inventory.filter(a => a.privacyStatus === 'approved');

    page.innerHTML = `
      <div class="container">
        <div class="section-title">${t.portfolio} (全盤點核實素材庫)</div>
        <div class="cards-grid">
          ${publicAssets.map(asset => `
            <div class="info-card">
              <div class="info-card-media" onclick="window.openLightbox('${asset.thumbnailPath || asset.relativePath}', '${asset.extractedTextSummary}')" style="cursor:pointer;">
                <img src="${asset.thumbnailPath || asset.relativePath}" alt="${asset.fileName}">
              </div>
              <div>
                <div style="font-size:0.95rem; font-weight:700; margin-bottom:4px;">${asset.fileName}</div>
                <div style="font-size:0.8rem; color:var(--primary-light); margin-bottom:8px;">${asset.fileCategory} (${(asset.sizeBytes/1024).toFixed(1)} KB)</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">${asset.extractedTextSummary}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.openLightbox = function(imgSrc, caption) {
    const modal = document.getElementById('modal-lightbox');
    if (!modal) return;
    modal.querySelector('img').src = imgSrc;
    modal.querySelector('.lightbox-caption').textContent = caption;
    modal.classList.add('active');
  };

  // Sources View
  function renderSourcesView() {
    const t = i18n[state.currentLang];
    const page = document.getElementById('page-sources');
    if (!page) return;

    page.innerHTML = `
      <div class="container">
        <div class="section-title">${t.sources}</div>
        <div class="info-card" style="margin-bottom:28px; overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.88rem; text-align:left;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-color); color:var(--primary-light);">
                <th style="padding:10px;">ID</th>
                <th style="padding:10px;">Type</th>
                <th style="padding:10px;">Publisher</th>
                <th style="padding:10px;">Title</th>
                <th style="padding:10px;">Reliability</th>
                <th style="padding:10px;">Status</th>
                <th style="padding:10px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.sources.map(s => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:10px; font-weight:700;">${s.id}</td>
                  <td style="padding:10px;">${s.sourceType}</td>
                  <td style="padding:10px;">${s.publisher}</td>
                  <td style="padding:10px;">${s.title}</td>
                  <td style="padding:10px;">${s.reliabilityLevel}</td>
                  <td style="padding:10px;"><span class="status-badge ${s.status}">${s.status}</span></td>
                  <td style="padding:10px;">
                    ${s.url.startsWith('http') ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding:4px 8px; font-size:0.75rem;">View Source ↗</a>` : '<span style="color:var(--text-muted);">Certificate</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Modals
  window.openDetailModal = function(id) {
    const item = state.timeline.find(x => x.id === id);
    if (!item) return;

    const modal = document.getElementById('modal-detail');
    if (!modal) return;

    const matchedSources = state.sources.filter(s => item.sourceIds.includes(s.id));

    modal.querySelector('.modal-body').innerHTML = `
      <div style="font-size:1.3rem; font-weight:800; margin-bottom:6px; color:var(--text-main);">${getLangField(item, 'title')}</div>
      <div style="font-size:1.05rem; color:var(--primary-light); font-weight:700; margin-bottom:12px;">${getLangField(item, 'organization')}</div>
      
      <div class="timeline-card-meta" style="margin-bottom:16px;">
        <span>📅 ${item.displayDate}</span>
        <span>📍 ${item.location}</span>
        <span class="status-badge ${item.identityStatus}">${item.identityStatus}</span>
      </div>

      <div style="font-size:0.95rem; color:var(--text-main); margin-bottom:16px; line-height:1.7;">
        <strong>📋 完整經歷與實戰成效 (STAR / PAR 法則)：</strong><br>${getLangField(item, 'summary')}
      </div>

      ${item.achievementsZh && item.achievementsZh.length > 0 ? `
        <div style="font-size:0.95rem; color:var(--text-main); margin-bottom:16px;">
          <strong>🎯 主要數據與量化成效：</strong>
          <ul style="margin-left:20px; margin-top:6px; color:var(--text-muted);">
            ${getLangField(item, 'achievements').map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="border-top:1px solid var(--border-color); padding-top:16px; margin-top:16px;">
        <strong style="color:var(--text-main);">🔍 查證依據與權威佐證連結：</strong>
        <div style="margin-top:8px;">
          ${matchedSources.map(s => `
            <div style="background:var(--bg-input); padding:12px; border-radius:var(--radius-sm); margin-bottom:10px; font-size:0.85rem; border:1px solid var(--border-color);">
              <div style="font-weight:700; color:var(--primary-light); margin-bottom:4px;">${s.title} (${s.publisher})</div>
              <div style="color:var(--text-muted); margin-bottom:8px; line-height:1.5;">"${s.excerpt}"</div>
              <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                ${s.url.startsWith('http') ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:4px 12px; font-size:0.78rem; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">🌐 開啟原始連結 ↗</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  function openCoverLetterModal() {
    const t = i18n[state.currentLang];
    const modal = document.getElementById('modal-cover-letter');
    if (!modal) return;

    let coverText = '';

    if (state.currentLang === 'en') {
      coverText = `Dear Sir/Madam,

My name is Dr. Howard Liao (Howard Liao, Ph.D.), and I bring over 20 years of global application governance, SAP ERP strategy, Java/Spring Boot microservices architecture, and cybersecurity/AI SDLC leadership directly reporting to C-suite executives and boards. I have managed technology and security budgets of up to USD 10M across multinational gaming, manufacturing, and software vendor groups.

From the Global Application Governance & Delivery perspective, I specialize in transforming enterprise strategy into 3-year application roadmaps. I govern SAP S/4HANA Clean Core principles (reducing custom objects by 35%), Java API-first Architecture Review Boards (ARB), and Kafka/EDI/IDoc enterprise integration platforms. By driving DevSecOps Quality Gates and AI for SDLC (AI code review, test generation, prompt risk controls), I achieved a 40% reduction in development lead time, 35% lower defect escape rates, and 20–30% multi-cloud TCO savings, maintaining a 100% Zero Outage record.

From the Security & CISO perspective, I have implemented Zero Trust, ISO 27001, ISO 42001 (AIMS), NIST CSF, and SoD/IAM internal controls, building three-lines-of-defense security observability that reduced incidents by >30% YoY.

My full executive portfolio and quantified achievements can be found at:  
https://howardliao.github.io/Howard.github.io/

I look forward to discussing how I can lead global application governance and delivery to drive digital transformation for your organization.

Sincerely,  
Howard Liao, Ph.D.`;
    } else if (state.currentLang === 'jp') {
      coverText = `採用委任 / エグゼクティブ各位

廖倫豪 博士 (Dr. Howard Liao, Ph.D.) と申します。グローバルCIOおよび取締役会直属として、20年以上のエンタープライズアプリケーション統括、SAP ERPロードマップ、Java/Spring Bootマイクロサービスアーキテクチャ、DevSecOps、AI SDLCの実績を有します。最高1,000万米ドル規模のIT・SI予算を統括してまいりました。

【グローバルアプリケーション統括】3カ年アプリケーションロードマップを策定し、SAP S/4HANA Clean Core原則(アドオン35%削減)、Java/Spring Boot Architecture Review Board (ARB)、Kafka/EDI/IDoc統合基盤を主導。DevSecOps Quality GatesおよびAI for SDLC(AIコードレビュー、テスト自動生成)を導入し、開発リードタイム40%短縮、不具合流出率35%低減、マルチクラウドTCO 20–30%削減、障害ゼロ(100% Zero Outage)を達成。

【セキュリティ・CISO】Zero Trust、ISO 27001、ISO 42001 (AIMS)、NIST CSF、SoD/IAM統制を導入し、セキュリティインシデントを年間30%以上削減。

詳細な戦略ポートフォリオおよび実績は下記をご参照ください：  
https://howardliao.github.io/Howard.github.io/

貴社のグローバルアプリケーション統括責任者として貢献できる機会を楽しみにしております。

敬具  
廖倫豪 博士 (Howard Liao, Ph.D.)`;
    } else {
      coverText = `敬啟者您好：

本人廖倫豪博士（Howard Liao, Ph.D.），具備 20+ 年直接向 Global CIO 與董事會匯報之全球應用治理與交付 (Global Application Governance & Delivery) 實戰經驗。曾於美商 Sybase、Borland 及上市櫃遊戲與高科技製造集團擔任 VP of Tech / CIO / CISO / IT Director，掌控最高 1,000 萬美元級別之全球 IT、SAP ERP 與外包 SI 顧問預算。

在「全球應用治理與交付」面向，我擅長將 CIO 的企業策略轉化為 3 年應用地圖 (Application Roadmap)。我主導 SAP S/4HANA Clean Core 原則（削減客製物件 35%、提高標準流程覆蓋率至 90%+）、Java/Spring Boot 微服務 API-first 架構審查委員會 (ARB) 與 Kafka/EDI/IDoc 企業整合中台。我推動 DevSecOps Quality Gates (SAST/DAST/SBOM) 與 AI for SDLC（AI 輔助 Code Review、測試自動生成、Prompt 風控），實現開發 Lead Time 縮短 40%、缺陷逃逸率降低 35%、多雲 TCO 壓降 20–30%，並保持 100% Zero Outage 紀錄。

在「資安與合規治理」面向，我落實 Zero Trust、ISO 27001 / ISO 42001 (AIMS)、NIST CSF 及 SoD / IAM 內部控管，建立三道防線與 SOC 聯防中樞，資安事件年減逾 30%。

我的完整戰略履歷與量化成果請參閱：  
https://howardliao.github.io/Howard.github.io/

謹盼有機會與貴公司進一步交流，說明我如何將 ERP、微服務、資安與 AI 工程治理整合成可擴張、可稽核、可量化 ROI 的全球應用營運能力。

此致  
敬禮

廖倫豪 博士 (Howard Liao, Ph.D.)
手機：+886-975-323161 | Email：Liao.Howard@gmail.com`;
    }

    modal.querySelector('.modal-body').innerHTML = `
      <div style="font-size:1.2rem; font-weight:800; margin-bottom:12px;">${t.coverLetterTitle}</div>
      <textarea id="cover-letter-text" style="width:100%; height:340px; background:var(--bg-input); color:var(--text-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:14px; font-family:monospace; font-size:0.88rem; line-height:1.6; resize:none;">${coverText}</textarea>
      <div style="margin-top:16px; text-align:right;">
        <button class="btn-primary" id="btn-do-copy">${t.coverLetterBtn}</button>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('btn-do-copy').addEventListener('click', () => {
      const textarea = document.getElementById('cover-letter-text');
      textarea.select();
      navigator.clipboard.writeText(textarea.value);
      alert(t.copySuccess);
    });
  }

})();
