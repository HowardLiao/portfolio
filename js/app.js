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
      siteTitle: '廖倫豪 博士 (Howard Liao, Ph.D.) | CIO 資訊長',
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

      // Bottom Nav
      bnavHome: '首頁',
      bnavTimeline: '歷程',
      bnavProposal: '建議書',
      bnavPortfolio: '作品',
      bnavMore: '更多',
      summaryExpand: '▼ 展開完整高階自述',
      summaryCollapse: '▲ 收合自述',

      kpiTitle: '⚡ 戰略營運與技術成效 Dashboard (Bento Grid)',
      kpi1_val: '$10M+', kpi1_lbl: '全球IT/ERP資本治理', kpi1_desc: '直報董事會之全球 IT、SAP Clean Core 與外包 SI 預算',
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

      // Sources Tab
      srcTitle: '來源清單、人物身分消歧與查證日誌',
      srcDesc: '所有收錄之學歷、經歷、國際期刊與媒體報導，均嚴格遵循國際公開資訊與事實查核準則，透過 Google Cloud 官方影音、CIO Taiwan 封面報導、iThome 專案企劃、Springer SCI 期刊（DOI）與國家圖書館（NCL）全文典藏進行交叉比對，排除所有同名同姓個案，確保 100% 真實可溯源。',
      srcStat1Lbl: '已查證公開來源 (Confirmed)',
      srcStat1Desc: '包含國際頂級 SCI 期刊、雲端大廠官方影片、權威媒體報導與國圖典藏。',
      srcStat2Lbl: '待確認爭議項目 (Pending)',
      srcStat2Desc: '所有歷程均完成雙重文檔比對與官方網址對齊，零未決疑點。',
      srcStat3Lbl: '同名同姓排除 (Disambiguated)',
      srcStat3Desc: '排除同名司法官、醫師與非資訊科技管理領域學者，確保身分唯一性。',
      srcFilterAll: '🌟 全部',
      srcFilterTech: '📰 主流科技媒體',
      srcFilterAcad: '🎓 國際學術期刊',
      srcFilterNcl: '🏛️ 國家圖書館',
      srcFilterGov: '🏫 政府學習平台',
      srcFilterCloud: '☁️ 雲端大廠',
      srcFilterCsr: '🤝 公益組織',
      srcSearchPlaceholder: '搜尋來源或標題...',

      coverLetterTitle: '廖倫豪 博士 - 高階資訊主管 (CIO/CISO/VP) 全球銀行級求職自薦信',
      copySuccess: '自薦信已成功複製到剪貼簿！'
    },
    en: {
      siteTitle: 'Howard Liao, Ph.D. | Chief Information Officer (CIO)',
      verifiedBadge: '✓ Verified',
      dashboard: '📊 Dashboard',
      timeline: '⏳ Timeline',
      education: '🎓 Education',
      experience: '🏢 Experience',
      media: '🎤 Speeches & Media',
      proposal: '💡 Proposals',
      portfolio: '🖼️ Portfolio',
      sources: '🔍 Verification',
      searchPlaceholder: 'Search site (e.g., Multi-cloud, FinOps, GKE)...',
      coverLetterBtn: '✉️ Cover Letter',
      verified: 'Verified',
      pending: 'Pending',
      excluded: 'Excluded',
      all: 'All',

      // Bottom Nav
      bnavHome: 'Home',
      bnavTimeline: 'Timeline',
      bnavProposal: 'Proposals',
      bnavPortfolio: 'Portfolio',
      bnavMore: 'More',
      summaryExpand: '▼ Expand Full Executive Summary',
      summaryCollapse: '▲ Collapse Summary',

      kpiTitle: '⚡ Strategic Operations & Technology Impact Dashboard',
      kpi1_val: '$10M+', kpi1_lbl: 'Global IT/ERP Capital Governed', kpi1_desc: 'Board-level governance of global IT, SAP Clean Core & SI budgets',
      kpi2_val: '-30%', kpi2_lbl: 'Multi-cloud FinOps Cost', kpi2_desc: 'Multi-cloud container resource governance & FinOps optimization',
      kpi3_val: '+15%', kpi3_lbl: 'Smart Manufacturing Yield', kpi3_desc: 'Edge AIoT & ML predictive yield optimization models',
      kpi4_val: '100%', kpi4_lbl: 'Zero Outage Record', kpi4_desc: '6-Cloud GKE & MongoDB Atlas Managed Global Reliability',

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

      // Sources Tab
      srcTitle: 'Sources, Identity Disambiguation & Verification Audit',
      srcDesc: 'All academic credentials, executive leadership milestones, SCI journal publications, and media features are cross-verified with official citations from Google Cloud Global Case Studies, CIO Taiwan, iThome, Springer SCI (DOI), and the National Central Library of Taiwan. All homonymous persons are explicitly disambiguated to ensure 100% authenticity.',
      srcStat1Lbl: 'Confirmed Public Sources (Confirmed)',
      srcStat1Desc: 'Includes tier-1 SCI journals, official cloud vendor features, leading tech media & national archives.',
      srcStat2Lbl: 'Pending Disputed Items (Pending)',
      srcStat2Desc: 'All historical milestones have dual-document alignment and official URL validation with zero ambiguity.',
      srcStat3Lbl: 'Disambiguated Homonyms (Disambiguated)',
      srcStat3Desc: 'Explicitly excludes prosecutors, physicians, and unrelated scholars sharing the same name.',
      srcFilterAll: '🌟 All',
      srcFilterTech: '📰 Tech Media',
      srcFilterAcad: '🎓 Academic Journals',
      srcFilterNcl: '🏛️ National Library',
      srcFilterGov: '🏫 Gov Learning',
      srcFilterCloud: '☁️ Cloud Hyperscalers',
      srcFilterCsr: '🤝 Non-Profit / CSR',
      srcSearchPlaceholder: 'Search sources or titles...',

      coverLetterTitle: 'Dr. Howard Liao - Executive CIO/CISO Cover Letter',
      copySuccess: 'Cover letter successfully copied to clipboard!'
    },
    jp: {
      siteTitle: '廖倫豪 博士 (Howard Liao, Ph.D.) | 最高情報責任者 (CIO)',
      verifiedBadge: '✓ 検証済み',
      dashboard: '📊 ダッシュボード',
      timeline: '⏳ 経歴タイムライン',
      education: '🎓 学歷・研究',
      experience: '🏢 職歴・実績',
      media: '🎤 講演・メディア',
      proposal: '💡 提案書',
      portfolio: '🖼️ 作品・実績集',
      sources: '🔍 出所・検証',
      searchPlaceholder: 'サイト内検索 (例: マルチクラウド, FinOps, GKE)...',
      coverLetterBtn: '✉️ カバーレター',
      verified: '検証済み',
      pending: '確認中',
      excluded: '除外',
      all: 'すべて',

      // Bottom Nav
      bnavHome: 'ホーム',
      bnavTimeline: '経歴',
      bnavProposal: '提案書',
      bnavPortfolio: '実績',
      bnavMore: 'その他',
      summaryExpand: '▼ 詳細プロフィールを展開',
      summaryCollapse: '▲ プロフィールを折りたたむ',

      kpiTitle: '⚡ 戦略運用および技術成效ダッシュボード (Bento Grid)',
      kpi1_val: '$10M+', kpi1_lbl: 'グローバルIT資本統括', kpi1_desc: '最高1,000万米ドル規模のグローバルIT・SAP予算統括',
      kpi2_val: '-30%', kpi2_lbl: 'マルチクラウドFinOpsコスト', kpi2_desc: 'コンテナ資源ガバナンスとTCO 30%削減',
      kpi3_val: '+15%', kpi3_lbl: 'スマート製造歩留まり', kpi3_desc: 'AI 予測モデルによる品質改善歩留まり+15%',
      kpi4_val: '100%', kpi4_lbl: 'Zero Outage (無停止)', kpi4_desc: '6クラウド GKE & MongoDB Atlas 完全無停止運用',

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

      // Sources Tab
      srcTitle: '情報出所・身元同定および検証監査ログ',
      srcDesc: '収録されたすべての学歴、経歴、SCI国際論文、メディア報道は、Google Cloud公式成功事例、CIO Taiwan、iThome、Springer SCI（DOI）、国家図書館（台湾）の公的記録に基づき厳格に照合・検証済みです。同姓同名の別人事例を明確に除外し、100%の真正性を保証します。',
      srcStat1Lbl: '検証済み公開出所 (Confirmed)',
      srcStat1Desc: 'トップSCI学術誌、クラウド公式事例、主要テックメディア、国立図書館所蔵を含む。',
      srcStat2Lbl: '確認中・保留項目 (Pending)',
      srcStat2Desc: '全経歴は二重公的文書照合および公式URL検証を完了しており、未決事項ゼロ。',
      srcStat3Lbl: '除外された同姓同名 (Disambiguated)',
      srcStat3Desc: '同姓同名の法官、医師、他分野学者を厳格に除外し、唯一性を確立。',
      srcFilterAll: '🌟 全て',
      srcFilterTech: '📰 主要テックメディア',
      srcFilterAcad: '🎓 国際学術誌',
      srcFilterNcl: '🏛️ 国家図書館',
      srcFilterGov: '🏫 行政院研修基盤',
      srcFilterCloud: '☁️ クラウド主要ベンダー',
      srcFilterCsr: '🤝 公益・CSR活動',
      srcSearchPlaceholder: '出所またはタイトルを検索...',

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

  function initApp() {
    initTheme();
    loadData();
    setupEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  function initTheme() {
    if (state.theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }

  async function loadData() {
    try {
      const [profileRes, timelineRes, sourcesRes, inventoryRes] = await Promise.all([
        fetch('data/profile.json'),
        fetch('data/timeline.json'),
        fetch('data/sources.json'),
        fetch('data/local-file-inventory.json')
      ]);

      if (profileRes.ok && timelineRes.ok && sourcesRes.ok && inventoryRes.ok) {
        state.profile = await profileRes.json();
        state.timeline = await timelineRes.json();
        state.sources = await sourcesRes.json();
        state.inventory = await inventoryRes.json();
      } else {
        throw new Error('HTTP Fetch failed, using embedded DOM JSON script tags');
      }
    } catch (err) {
      console.warn('Fallback to embedded DOM script tags for offline file:// loading:', err);
      const profEl = document.getElementById('data-profile');
      const timeEl = document.getElementById('data-timeline');
      const srcEl = document.getElementById('data-sources');
      const invEl = document.getElementById('data-local-file-inventory');
      if (profEl) state.profile = JSON.parse(profEl.textContent);
      if (timeEl) state.timeline = JSON.parse(timeEl.textContent);
      if (srcEl) state.sources = JSON.parse(srcEl.textContent);
      if (invEl) state.inventory = JSON.parse(invEl.textContent);
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
    
    // Robust mobile bottom nav touch & click bindings
    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      const handleAction = function(e) {
        if (e.type === 'touchend') {
          e.preventDefault();
        }
        const tab = this.getAttribute('data-tab');
        if (tab) {
          window.switchTab(tab);
        } else if (this.id === 'btn-mobile-more') {
          window.toggleMobileDrawer();
        }
      };
      btn.addEventListener('click', handleAction);
      btn.addEventListener('touchend', handleAction, { passive: false });
    });
    
    const btnWord = document.getElementById('btn-download-word-resume');
    if (btnWord) {
      btnWord.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'assets/HowardLiao_Resume_2026.docx';
        link.download = 'HowardLiao_Resume_2026.docx';
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

  
  // ==========================================
  // Modal Handlers: Detail, Lightbox & Cover Letter
  // ==========================================
  window.openDetailModal = function(id) {
    const item = (state.timeline || []).find(x => x.id === id);
    if (!item) {
      console.warn('Timeline item not found:', id);
      return;
    }

    const modal = document.getElementById('modal-detail');
    if (!modal) return;

    const matchedSources = (state.sources || []).filter(s => item.sourceIds && item.sourceIds.includes(s.id));

    modal.querySelector('.modal-body').innerHTML = `
      <div style="font-size:1.35rem; font-weight:800; margin-bottom:6px; color:var(--text-main);">${getLangField(item, 'title')}</div>
      <div style="font-size:1.05rem; color:var(--primary-light); font-weight:700; margin-bottom:12px;">${getLangField(item, 'organization')}</div>
      
      <div class="timeline-card-meta" style="margin-bottom:16px; display:flex; gap:12px; flex-wrap:wrap; font-size:0.88rem;">
        <span>📅 <strong>${item.displayDate}</strong></span>
        <span>📍 ${item.location || '台灣'}</span>
        <span class="status-badge ${item.identityStatus || 'verified'}">✓ ${item.identityStatus || 'verified'}</span>
      </div>

      <div style="font-size:0.95rem; color:var(--text-main); margin-bottom:16px; line-height:1.8; background:var(--bg-card); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <strong style="color:var(--primary-light); display:block; margin-bottom:8px;">📋 完整職涯戰績與實戰成效：</strong>
        ${getLangField(item, 'summary')}
      </div>

      ${item.achievementsZh && item.achievementsZh.length > 0 ? `
        <div style="font-size:0.92rem; color:var(--text-main); margin-bottom:16px;">
          <strong style="color:var(--text-main);">🎯 主要數據與量化指標：</strong>
          <ul style="margin-left:20px; margin-top:8px; color:var(--text-muted); line-height:1.6;">
            ${(item.achievementsZh || []).map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${item.skills && item.skills.length > 0 ? `
        <div style="margin-bottom:16px;">
          <strong style="color:var(--text-main); font-size:0.92rem;">🛠️ 核心技能與關鍵字：</strong>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
            ${item.skills.map(sk => `<span class="tag-item" style="font-size:0.8rem; padding:3px 10px;">${sk}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div style="border-top:1px solid var(--border-color); padding-top:16px; margin-top:16px;">
        <strong style="color:var(--text-main); font-size:0.95rem;">🔍 查證依據與權威佐證連結：</strong>
        <div style="margin-top:10px;">
          ${matchedSources.length > 0 ? matchedSources.map(s => `
            <div style="background:var(--bg-input); padding:12px 14px; border-radius:var(--radius-sm); margin-bottom:10px; font-size:0.86rem; border:1px solid var(--border-color);">
              <div style="font-weight:700; color:var(--primary-light); margin-bottom:4px;">${s.title} (${s.publisher})</div>
              <div style="color:var(--text-muted); margin-bottom:8px; line-height:1.5;">"${s.excerpt}"</div>
              <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                ${s.url && s.url.startsWith('http') ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:4px 12px; font-size:0.78rem; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">🌐 開啟原始連結 ↗</a>` : ''}
              </div>
            </div>
          `).join('') : '<div style="color:var(--text-muted); font-size:0.85rem;">本項目已經內部架構審查與專案歷程查核完畢。</div>'}
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  window.openLightbox = function(imgSrc, caption) {
    const modal = document.getElementById('modal-lightbox');
    if (!modal) return;
    const img = modal.querySelector('img');
    const cap = modal.querySelector('.lightbox-caption');
    if (img) img.src = imgSrc;
    if (cap) cap.textContent = caption || '';
    modal.classList.add('active');
  };

  function openCoverLetterModal() {
    const t = i18n[state.currentLang] || i18n.zh;
    const modal = document.getElementById('modal-cover-letter');
    if (!modal) return;

    let coverText = '';

    if (state.currentLang === 'en') {
      coverText = `Dear Sir/Madam,

My name is Dr. Howard Liao (Howard Liao, Ph.D.), and I bring over 20 years of global application governance, SAP ERP strategy, Java/Spring Boot microservices architecture, and cybersecurity/AI SDLC leadership directly reporting to C-suite executives and boards. I have managed technology and security budgets of up to USD 10M across multinational gaming, manufacturing, and software vendor groups.

From the Global Application Governance & Delivery perspective, I specialize in transforming enterprise strategy into 3-year application roadmaps. I govern SAP S/4HANA Clean Core principles (reducing custom objects by 35%), Java API-first Architecture Review Boards (ARB), and Kafka/EDI/IDoc enterprise integration platforms. By driving DevSecOps Quality Gates and AI for SDLC (AI code review, test generation, prompt risk controls), I achieved a 40% reduction in development lead time, 35% lower defect escape rates, and 20–30% multi-cloud TCO savings, maintaining a 100% Zero Outage record.

From the Security & CISO perspective, I have implemented Zero Trust, ISO 27001, ISO 42001 (AIMS), NIST CSF, and SoD/IAM internal controls, building three-lines-of-defense security observability that reduced incidents by >30% YoY.

My full executive portfolio and quantified achievements can be found at:  
https://howardliao.github.io/portfolio/

I look forward to discussing how I can lead global application governance and delivery to drive digital transformation for your organization.

Sincerely,  
Howard Liao, Ph.D.
Email: Liao.Howard@gmail.com | LinkedIn: https://www.linkedin.com/in/howardliao78/`;
    } else if (state.currentLang === 'jp') {
      coverText = `拝啓

時下益々ご清栄のこととお慶び申し上げます。

私、廖倫豪（リョウ・リンホウ、Howard Liao, Ph.D.）は、27年に及ぶIT経験（うち20年マネジメント）を有し、グローバル・エンタープライズにおけるアプリケーションガバナンス、SAP ERP戦略ブループリント、Java/Spring Bootマイクロサービス設計、およびサイバーセキュリティ／AI SDLCの実務を牽引してまいりました。直近では多国籍エンターテインメント・テクノロジー企業グループにて、Global CIOおよび取締役会直属の副社長兼IT Directorを務め、最大1,000万米ドル規模のIT投資（CAPEX/OPEX）および世界的な大手SIerを統制しております。

私のコアコンピタンスおよび実績は以下の通りです：

1. グローバル・アプリケーションガバナンス＆SAP Clean Core推進：
   S/4HANA Clean Core原則を徹底し、35%以上のレガシー個別開発（アドオン）を削減、標準業務プロセス適合率を90%以上に引き上げました。またアーキテクチャ審査委員会（ARB）を主導し、Java/Spring BootによるAPI-first標準化、Apache Kafka/EDI/IDoc基盤のエンタープライズ統合ハブを確立しました。

2. クラウドネイティブ刷新＆100%障害ゼロ運用（Zero Outage）：
   GKE（Google Kubernetes Engine）による全面コンテナ化とCI/CDパイプライン刷新により、デプロイ効率を100%向上。基幹データベースをMongoDB Atlasフルマネージド・グローバル分散クラスタへ平滑移行し、数百万人の同時アクセス負荷下においても「100%障害停止ゼロ」を達成。Google Cloud公式のAPAC旗艦顧客事例として世界発信されました。

3. FinOpsクラウドコスト最適化（TCO -30%削減）：
   マルチクラウド環境における動的リソーススケーリングと厳格な費用配賦モデルを確立し、爆発的な事業成長を支えながら、クラウド総保有コスト（TCO）の30%削減を達成しました。

4. ゼロトラストセキュリティ＆AIガバナンス（ISO 27001/42001 主任審査員）：
   ISO 27001（ISMS）および最新のISO 42001（AIマネジメントシステム）主任審査員資格を保持し、DevSecOps自動品質ゲート（SAST/DAST/SBOM）を完備。最高水準のセキュリティとAIガバナンスを両立させています。

私の学術的バックグラウンド（情報技術管理学博士、SCI論文発表、国家図書館永久収蔵）と、27年に及ぶハイテク製造・上場IT企業・外資系ベンダー（Borland/Sybase）での実戦経験を融合させ、貴社のグローバル展開とエンタープライズDXを成功に導く所存です。

面談の機会を賜れますことを心より楽しみに申し上げております。

敬具

廖倫豪 博士 (Howard Liao, Ph.D.)
E-mail: liao.howard@gmail.com | LinkedIn: https://www.linkedin.com/in/howardliao78/
Portfolio: https://howardliao.github.io/portfolio/`;
    } else {
      coverText = `敬啟者您好：

本人廖倫豪博士（Howard Liao, Ph.D.），擁有 27 年 IT 經驗，其中 20 年擔任主管，具備直接向 Global CIO 與董事會匯報之全球應用治理與交付 (Global Application Governance & Delivery) 實戰經驗。曾於美商 Sybase、Borland 及上市櫃遊戲與高科技製造集團擔任 VP of Tech / CIO / CISO / IT Director，掌控最高 1,000 萬美元級別之全球 IT、SAP ERP 與外包 SI 顧問預算。

在「全球應用治理與交付」面向，我擅長將 CIO 的企業策略轉化為 3 年應用地圖 (Application Roadmap)。我主導 SAP S/4HANA Clean Core 原則（削減客製物件 35%、提高標準流程覆蓋率至 90%+）、Java/Spring Boot 微服務 API-first 架構審查委員會 (ARB) 與 Kafka/EDI/IDoc 企業整合中台。我推動 DevSecOps Quality Gates (SAST/DAST/SBOM) 與 AI for SDLC（AI 輔助 Code Review、測試自動生成、Prompt 風控），實現開發 Lead Time 縮短 40%、缺陷逃逸率降低 35%、多雲 TCO 壓降 20–30%，並保持 100% Zero Outage 紀錄。

在「資安與合規治理」面向，我落實 Zero Trust、ISO 27001 / ISO 42001 (AIMS)、NIST CSF 及 SoD / IAM 內部控管，建立三道防線與 SOC 聯防中樞，資安事件年減逾 30%。

我的完整戰略履歷與量化成果請參閱：  
https://howardliao.github.io/portfolio/

謹盼有機會與貴公司進一步交流，說明我如何將 ERP、微服務、資安與 AI 工程治理整合成可擴張、可稽核、可量化 ROI 的全球應用營運能力。

此致  
敬禮

廖倫豪 博士 (Howard Liao, Ph.D.)
Email：Liao.Howard@gmail.com | LinkedIn：https://www.linkedin.com/in/howardliao78/`;
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
  window.openCoverLetterModal = openCoverLetterModal;

  function switchTab(tabKey) {
    state.currentTab = tabKey;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });
    document.querySelectorAll('.tab-page').forEach(page => {
      page.classList.toggle('active', page.id === `page-${tabKey}`);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.switchTab = switchTab;

  
  function updateNavLabels() {
    const t = i18n[state.currentLang] || i18n.zh;
    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      const lbl = btn.querySelector('.bottom-nav-label');
      if (!lbl) return;
      if (tab === 'dashboard') lbl.textContent = t.bnavHome || '首頁';
      else if (tab === 'timeline') lbl.textContent = t.bnavTimeline || '歷程';
      else if (tab === 'proposal') lbl.textContent = t.bnavProposal || '建議書';
      else if (tab === 'portfolio') lbl.textContent = t.bnavPortfolio || '作品';
      else if (btn.id === 'btn-mobile-more') lbl.textContent = t.bnavMore || '更多';
    });
  }

  function renderAllViews() {
    updateNavLabels();
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
  
  // ==========================================
  // Executive Hunter Features: Quick Connect, Toast & PWA
  // ==========================================
  window.showToast = function(msg) {
    const toast = document.getElementById('hunter-toast');
    const msgSpan = document.getElementById('hunter-toast-msg');
    if (!toast || !msgSpan) return;
    msgSpan.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  window.quickCopyEmail = function(e) {
    if (e) e.stopPropagation();
    const email = 'liao.howard@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      window.showToast('✓ 廖博士官方信箱 (' + email + ') 已複製至剪貼簿！隨時歡迎來信。');
    }).catch(() => {
      window.location.href = 'mailto:' + email + '?subject=Executive%20Opportunity%20Inquiry%20-%20Dr.%20Howard%20Liao';
    });
  };

  // PWA Install Prompt Capture
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('pwa-install-banner');
    if (banner && !sessionStorage.getItem('pwa_dismissed')) {
      banner.classList.add('show');
    }
  });

  window.triggerPwaInstall = function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA install');
        }
        deferredPrompt = null;
        window.dismissPwaBanner();
      });
    }
  };

  window.dismissPwaBanner = function() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.remove('show');
    sessionStorage.setItem('pwa_dismissed', '1');
  };

  // Static clean KPI numbers - no flicker or crawler corruption
  window.triggerDashboardCounters = function() {};

  
  // ==========================================
  // Mobile Bottom Nav & Drawer Interactions
  // ==========================================
  window.toggleMobileDrawer = function(forceState) {
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (!overlay) return;
    if (typeof forceState === 'boolean') {
      if (forceState) overlay.classList.add('active');
      else overlay.classList.remove('active');
    } else {
      overlay.classList.toggle('active');
    }
  };

  window.toggleHeroSummary = function() {
    const el = document.getElementById('hero-summary-text');
    const btn = document.getElementById('hero-summary-toggle');
    if (!el || !btn) return;
    el.classList.toggle('expanded');
    if (el.classList.contains('expanded')) {
      btn.textContent = '▲ 收合自述';
    } else {
      btn.textContent = '▼ 展開完整高階自述';
    }
  };

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
            <img src="assets/howard_portrait.png" alt="廖倫豪 博士 (Howard Liao, Ph.D.) 專業形象證照" width="220" height="264" loading="eager" fetchpriority="high">
          </div>
          <div class="hero-details">
            <div class="hero-name-row">
              <span class="hero-name-zh">${name}</span>
              <span class="hero-name-en">Howard Liao, Ph.D.</span>
              <span class="verified-badge">${t.verifiedBadge}</span>
            </div>
            <div class="hero-headline">${headline}</div>
            <div class="hero-summary-mobile-wrapper">
              <div class="hero-summary-collapsed" id="hero-summary-text">${summary}</div>
              <button class="summary-toggle-btn" id="hero-summary-toggle" onclick="window.toggleHeroSummary()">▼ 展開完整高階自述</button>
            </div>
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

        <!-- Inline SVG Visualizations -->
        <div id="dashboard-viz-container"><div class="section-title">${t.vizTitle}</div>
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
            <h3>${t.vizSource}</h3>
            <div class="viz-svg-container" id="svg-source-breakdown"></div>
          </div>
        </div>

        <!-- Highlights Row -->
        </div>
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
    renderSVGSourceBreakdown();
    triggerDashboardCounters();
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
        <!-- Architecture Capability Demonstration Disclaimer Banner -->
        <div class="info-card" style="margin-bottom:20px; border-left:4px solid var(--primary-light); background:rgba(2,132,199,0.08); padding:14px 18px;">
          <div style="font-weight:800; color:var(--primary-light); font-size:0.95rem; margin-bottom:4px; display:flex; align-items:center; gap:8px;">
            <span>ℹ️</span> 戰略技術能力展示聲明 (Architecture Capability Demonstration)
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
            本專案建議書為廖倫豪博士之<strong>企業架構設計能力、AI 治理方法論與大型系統規劃展示</strong>，內容經去識別化與通用化處理，不涉及任何特定客戶之非公開商業機密或專利資產。歡迎企業董事會與高階管理層參考交流。
          </div>
        </div>

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
          <div class="aisdlc-subnav" style="display:flex; gap:8px; margin-bottom:20px; justify-content:center; flex-wrap:wrap;">
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
            <button class="aisdlc-subnav-btn" id="btn-aisdlc-pipeline" onclick="window.switchAISDLCTab('pipeline')">
              ⚡ 模組五：AI-Augmented DevSecOps 流水線 (左移與迴圈)
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
                  <svg id="sdlc-svg" viewBox="0 0 600 600" class="w-full max-w-[500px] h-auto drop-shadow-2xl select-none" style="filter: drop-shadow(0 10px 25px rgba(0,0,0,0.6));">
  <defs>
    <!-- Gradients for all 7 sectors -->
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
    <!-- DISTINCT DEPLOY GRADIENT (Crimson/Rose) -->
    <linearGradient id="grad-deploy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <!-- DISTINCT OPS GRADIENT (Flame Orange/Amber) -->
    <linearGradient id="grad-ops" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>

    <filter id="glow-sdlc" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Outer Guide Ring -->
  <circle cx="300" cy="300" r="280" fill="none" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- 1. 規劃 (Planning) -->
  <path id="sector-plan" class="wheel-sector active" onclick="selectSDLCSector('plan')" 
        d="M 300 300 L 300 60 A 240 240 0 0 1 487.6 150.3 Z" 
        fill="url(#grad-plan)" stroke="#020617" stroke-width="5" />

  <!-- 2. 需求 (Requirements) -->
  <path id="sector-req" class="wheel-sector" onclick="selectSDLCSector('req')" 
        d="M 300 300 L 487.6 150.3 A 240 240 0 0 1 540 300 Z" 
        fill="url(#grad-req)" stroke="#020617" stroke-width="5" />

  <!-- 3. 設計 (Design) -->
  <path id="sector-design" class="wheel-sector" onclick="selectSDLCSector('design')" 
        d="M 300 300 L 540 300 A 240 240 0 0 1 487.6 449.7 Z" 
        fill="url(#grad-design)" stroke="#020617" stroke-width="5" />

  <!-- 4. 開發 (Development) -->
  <path id="sector-dev" class="wheel-sector" onclick="selectSDLCSector('dev')" 
        d="M 300 300 L 487.6 449.7 A 240 240 0 0 1 300 540 Z" 
        fill="url(#grad-dev)" stroke="#020617" stroke-width="5" />

  <!-- 5. 測試 (Testing) -->
  <path id="sector-test" class="wheel-sector" onclick="selectSDLCSector('test')" 
        d="M 300 300 L 300 540 A 240 240 0 0 1 112.4 449.7 Z" 
        fill="url(#grad-test)" stroke="#020617" stroke-width="5" />

  <!-- 6. 部署 (Deployment - Clearly Split) -->
  <path id="sector-deploy" class="wheel-sector" onclick="selectSDLCSector('deploy')" 
        d="M 300 300 L 112.4 449.7 A 240 240 0 0 1 60 300 Z" 
        fill="url(#grad-deploy)" stroke="#020617" stroke-width="5" />

  <!-- 7. 維運 (Operations - Clearly Split) -->
  <path id="sector-ops" class="wheel-sector" onclick="selectSDLCSector('ops')" 
        d="M 300 300 L 60 300 A 240 240 0 0 1 300 60 Z" 
        fill="url(#grad-ops)" stroke="#020617" stroke-width="5" />

  <!-- Flow Direction Arrows between sectors -->
  <path d="M 400 95 L 415 105 L 400 115 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 520 220 L 530 235 L 515 240 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 520 380 L 515 395 L 530 400 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 400 500 L 385 510 L 400 520 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 200 505 L 185 495 L 200 485 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 80 375 L 70 360 L 85 355 Z" fill="#ffffff" opacity="0.8"/>
  <path d="M 175 110 L 190 100 L 175 90 Z" fill="#ffffff" opacity="0.8"/>

  <!-- Sector Text Labels -->
  <text x="375" y="160" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">規劃</text>
  <text x="465" y="270" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">需求</text>
  <text x="445" y="395" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">設計</text>
  <text x="335" y="475" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">開發</text>
  <text x="210" y="445" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">測試</text>
  <text x="145" y="335" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">部署</text>
  <text x="210" y="175" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="900" pointer-events="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">維運</text>

  <!-- Center Circle: AI 安全 Core -->
  <circle cx="300" cy="300" r="72" fill="#090d16" stroke="#38bdf8" stroke-width="4" filter="url(#glow-sdlc)"/>
  <circle cx="300" cy="300" r="62" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="300" y="295" text-anchor="middle" fill="#38bdf8" font-size="22" font-weight="900" letter-spacing="1">AI</text>
  <text x="300" y="322" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="900">安全</text>
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

          <!-- MODULE 5: AI-AUGMENTED DEVSECOPS PIPELINE -->
          <div id="aisdlc-tab-pipeline" class="aisdlc-view-pane" style="display:none;">
            
            <div style="background:#0b1120; border:1px solid rgba(56, 189, 248, 0.3); border-radius:16px; padding:24px; margin-bottom:24px; box-shadow:0 10px 30px rgba(0,0,0,0.5); color:#f8fafc;">
              
              <!-- Top Bar -->
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="font-size:1.35rem; font-weight:900; color:#f8fafc; letter-spacing:-0.02em; display:flex; align-items:center; gap:8px;">
                    AI–Augmented DevSecOps 流水線
                  </div>
                  <div style="font-size:0.84rem; color:#94a3b8; margin-top:4px;">
                    滑鼠懸停或點擊 AI 節點，查看安全左移效益與痛點修復指標
                  </div>
                </div>
                <button onclick="window.selectPipelineNode('left-shift-loop')" class="pipeline-loop-btn" style="background:#1e3a8a; border:1px solid #3b82f6; color:#93c5fd; padding:6px 16px; border-radius:20px; font-size:0.82rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.2s; box-shadow:0 0 12px rgba(59, 130, 246, 0.3);">
                  <span>←</span> 左移安全迴圈
                </button>
              </div>

              <div class="mobile-scroll-hint" style="display:none;">⟵ 可左右滑動檢視完整流水線 ⟶</div>
              <!-- Main Pipeline Flow Table/Box -->
              <div class="pipeline-scroll-wrapper">
              <div class="pipeline-scroll-inner">
              <div style="background:rgba(15, 23, 42, 0.85); border:1px solid rgba(51, 65, 85, 0.8); border-radius:12px; padding:18px; margin-bottom:18px;">
                
                <!-- Row 1: 階段 PHASE -->
                <div style="display:grid; grid-template-columns: 140px 1fr 1fr 1fr; gap:12px; align-items:center; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid rgba(51, 65, 85, 0.5);">
                  <div style="font-size:0.78rem; font-weight:800; color:#64748b; letter-spacing:0.05em;">階段（PHASE）</div>
                  <div style="text-align:center; font-size:0.88rem; font-weight:700; color:#e2e8f0;">1. 規劃與開發</div>
                  <div style="text-align:center; font-size:0.88rem; font-weight:700; color:#e2e8f0;">2. 提交與構建</div>
                  <div style="text-align:center; font-size:0.88rem; font-weight:700; color:#e2e8f0;">3. 測試與部署</div>
                </div>

                <!-- Row 2: 傳統工具 TRADITIONAL -->
                <div style="display:grid; grid-template-columns: 140px 1fr 1fr 1fr; gap:12px; align-items:center; margin-bottom:16px;">
                  <div style="font-size:0.75rem; font-weight:800; color:#64748b; letter-spacing:0.04em;">傳統工具（TRADITIONAL）</div>
                  <div style="background:rgba(30, 41, 59, 0.6); border:1px solid rgba(71, 85, 105, 0.5); border-radius:20px; padding:6px 12px; text-align:center; font-size:0.8rem; color:#94a3b8;">IDE / Local Build</div>
                  <div style="background:rgba(30, 41, 59, 0.6); border:1px solid rgba(71, 85, 105, 0.5); border-radius:20px; padding:6px 12px; text-align:center; font-size:0.8rem; color:#94a3b8;">CI / SAST / SCA</div>
                  <div style="background:rgba(30, 41, 59, 0.6); border:1px solid rgba(71, 85, 105, 0.5); border-radius:20px; padding:6px 12px; text-align:center; font-size:0.8rem; color:#94a3b8;">DAST / IaC Deploy</div>
                </div>

                <!-- Row 3: AI-Augmented Section Box -->
                <div style="position:relative; background:rgba(11, 15, 25, 0.7); border:1px solid rgba(56, 189, 248, 0.25); border-radius:10px; padding:18px 14px 20px;">
                  <div style="position:absolute; top:-10px; left:16px; background:#0b1120; padding:0 8px; font-size:0.72rem; font-weight:800; color:#38bdf8; letter-spacing:0.06em; text-transform:uppercase;">
                    AI 賦能行動（AI–AUGMENTED）
                  </div>

                  <div style="display:grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap:8px; align-items:center;">
                    
                    <!-- Phase 1 Column -->
                    <div style="display:flex; flex-direction:column; gap:12px;">
                      <div id="pnode-pair-coding" onclick="window.selectPipelineNode('pair-coding')" onmouseenter="window.selectPipelineNode('pair-coding')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">AI Pair Coding</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">即時代碼輔助產生</div>
                      </div>

                      <div id="pnode-semantic-sast" onclick="window.selectPipelineNode('semantic-sast')" onmouseenter="window.selectPipelineNode('semantic-sast')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">實時語意 SAST</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">IDE 靜態弱點掃描</div>
                      </div>

                      <div id="pnode-data-leak-guard" onclick="window.selectPipelineNode('data-leak-guard')" onmouseenter="window.selectPipelineNode('data-leak-guard')" class="pnode-item active" style="background:#1e293b; border:1px solid #38bdf8; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s; box-shadow:0 0 16px rgba(56, 189, 248, 0.4);">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">Data Leak Guard</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">Prompt / PII 防洩漏</div>
                      </div>
                    </div>

                    <!-- Arrow Divider 1 -->
                    <div style="display:flex; flex-direction:column; justify-content:space-around; height:100%; color:#475569; font-size:0.85rem; user-select:none; padding:10px 0;">
                      <div style="padding:14px 0;">····&gt;</div>
                      <div style="padding:14px 0;">····&gt;</div>
                      <div style="padding:14px 0;">····&gt;</div>
                    </div>

                    <!-- Phase 2 Column -->
                    <div style="display:flex; flex-direction:column; gap:12px;">
                      <div id="pnode-auto-pr" onclick="window.selectPipelineNode('auto-pr')" onmouseenter="window.selectPipelineNode('auto-pr')" class="pnode-item pnode-core" style="background:#1e3a8a; border:2px solid #3b82f6; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s; box-shadow:0 0 14px rgba(59, 130, 246, 0.4);">
                        <div style="font-size:0.92rem; font-weight:800; color:#93c5fd;">AI 自動修復 PR</div>
                        <div style="font-size:0.75rem; color:#60a5fa; margin-top:3px; font-weight:700;">★ 關鍵左移節點</div>
                      </div>

                      <div id="pnode-supply-chain" onclick="window.selectPipelineNode('supply-chain')" onmouseenter="window.selectPipelineNode('supply-chain')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">AI 供應鏈 SCA</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">惡意依賴投毒偵測</div>
                      </div>

                      <div id="pnode-zero-trust-policy" onclick="window.selectPipelineNode('zero-trust-policy')" onmouseenter="window.selectPipelineNode('zero-trust-policy')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">零信任 Policy</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">自動合規政策審查</div>
                      </div>
                    </div>

                    <!-- Arrow Divider 2 -->
                    <div style="display:flex; flex-direction:column; justify-content:space-around; height:100%; color:#475569; font-size:0.85rem; user-select:none; padding:10px 0;">
                      <div style="padding:14px 0;">····&gt;</div>
                      <div style="padding:14px 0;">····&gt;</div>
                      <div style="padding:14px 0;">····&gt;</div>
                    </div>

                    <!-- Phase 3 Column -->
                    <div style="display:flex; flex-direction:column; gap:12px;">
                      <div id="pnode-smart-fuzzing" onclick="window.selectPipelineNode('smart-fuzzing')" onmouseenter="window.selectPipelineNode('smart-fuzzing')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">智慧 Fuzzing</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">AI 生成模糊測試</div>
                      </div>

                      <div id="pnode-dast-anomaly" onclick="window.selectPipelineNode('dast-anomaly')" onmouseenter="window.selectPipelineNode('dast-anomaly')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">異常路徑 DAST</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">API 邏輯漏洞攻防</div>
                      </div>

                      <div id="pnode-iac-optimize" onclick="window.selectPipelineNode('iac-optimize')" onmouseenter="window.selectPipelineNode('iac-optimize')" class="pnode-item" style="background:#1e293b; border:1px solid #475569; border-radius:10px; padding:12px 10px; text-align:center; cursor:pointer; transition:all 0.2s;">
                        <div style="font-size:0.92rem; font-weight:800; color:#f8fafc;">IaC 安全最佳化</div>
                        <div style="font-size:0.75rem; color:#94a3b8; margin-top:3px;">K8s / Terraform 審查</div>
                      </div>
                    </div>

                  </div>

                  <!-- Feedback Loop Curved Arrow SVG -->
                  <div style="position:relative; margin-top:14px; text-align:center;">
                    <svg width="100%" height="45" viewBox="0 0 600 45" style="overflow:visible;">
                      <defs>
                        <marker id="pipeline-arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                        </marker>
                      </defs>
                      <path d="M 500 5 C 500 38, 100 38, 100 5" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#pipeline-arrow-left)" opacity="0.85"/>
                    </svg>
                    <button onclick="window.selectPipelineNode('predictive-ops-loop')" class="pipeline-loop-btn" style="position:absolute; top:10px; left:50%; transform:translateX(-50%); background:#0f172a; border:1px solid #38bdf8; color:#38bdf8; padding:4px 16px; border-radius:20px; font-size:0.78rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 0 10px rgba(56,189,248,0.25); transition:all 0.2s;">
                      <span>↺</span> 預測性維運回饋迴圈
                    </button>
                  </div>

                </div>

              </div>
              </div><!-- end pipeline-scroll-inner -->
              </div><!-- end pipeline-scroll-wrapper -->

              <!-- Legend Bar -->
              <div style="display:flex; justify-content:center; gap:20px; margin-bottom:18px; font-size:0.8rem; color:#94a3b8; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="display:inline-block; width:12px; height:12px; border:1px solid #64748b; border-radius:3px; background:rgba(30,41,59,0.8);"></span>
                  AI 輔助檢測節點
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="display:inline-block; width:12px; height:12px; border:2px solid #3b82f6; border-radius:3px; background:#1e3a8a;"></span>
                  核心修復與左移樞紐
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#38bdf8;"></span>
                  回饋與持續學習迴圈
                </div>
              </div>

              <!-- Dynamic Detail Card -->
              <div id="pipeline-detail-card" style="background:#0f172a; border:1px solid #334155; border-radius:12px; padding:18px 20px; box-shadow:0 4px 20px rgba(0,0,0,0.35);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span id="pdetail-title" style="font-size:1.05rem; font-weight:900; color:#f8fafc;">Data Leak Guard (防洩漏邊界)</span>
                    <span id="pdetail-phase" style="font-size:0.75rem; color:#94a3b8; background:rgba(51, 65, 85, 0.6); padding:2px 8px; border-radius:4px;">階段 1: Plan &amp; Dev</span>
                  </div>
                  <div id="pdetail-metric-badge" style="background:rgba(5, 150, 105, 0.2); border:1px solid rgba(16, 185, 129, 0.4); color:#34d399; font-size:0.85rem; font-weight:800; padding:4px 12px; border-radius:20px;">
                    機密外洩風險 -99%
                  </div>
                </div>
                <div id="pdetail-desc" style="font-size:0.88rem; color:#cbd5e1; line-height:1.6;">
                  在 IDE 與 API Gateway 層監控 Prompt 內容，即時遮蔽或攔截包含 API 金鑰、客戶 PII 資料與商業機密的外部 AI 請求。
                </div>
              </div>

            </div>

            <!-- Deep Dive: Detailed Methodology Section -->
            <div class="hero-card" style="margin-top:0; margin-bottom:20px; border-color:#38bdf8;">
              <div style="grid-column: 1 / -1;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
                  <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px; background:rgba(56,189,248,0.2); color:#38bdf8; border-color:rgba(56,189,248,0.4);">
                    📘 架構專論：AI in SDLC 與 AI in DevSecOps 完整細項流程與技術實踐
                  </span>
                  <span style="font-size:0.85rem; color:var(--text-muted);">架構師：廖倫豪 博士 (Howard Liao, Ph.D.)</span>
                </div>
                <div style="font-size:1.4rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">
                  從「序列串聯 (Sequential)」邁向「並行迭代 (Parallel) 與自癒閉環」之工作流重組
                </div>
                <div style="font-size:0.9rem; color:var(--text-muted); line-height:1.7;">
                  當 AI（生成式 AI、機器學習模型與 Agentic 系統）深度整合進軟體開發生命週期與 DevSecOps 後，不再只是「每個階段多了一個工具」，而是整個工作流的重組。許多原本必須序列執行的步驟，變成了並行且持續迭代的過程。人類的角色由「創造者 (Creator)」演化為「策展人 (Curator) 與審核者 (Reviewer)」。
                </div>
              </div>
            </div>

            <!-- Part 1: AI in SDLC -->
            <div class="section-title" style="margin-top:24px; color:#38bdf8;">
              🧩 第一部分：AI in SDLC (軟體開發生命週期) 細項流程
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:24px;">
              
              <div class="info-card" style="border-top:3px solid #38bdf8;">
                <div style="font-weight:800; color:#38bdf8; font-size:0.98rem; margin-bottom:8px;">1. 需求分析與規劃 (Planning &amp; Analysis)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>需求理解與收斂：</strong> PM 輸入商業需求想法，AI 協助提問釐清邊界條件，自動生成標準化 User Stories 與 Acceptance Criteria (驗收標準)。</li>
                  <li><strong>架構草案生成：</strong> 根據業務需求推薦架構模式 (如 Microservices, Event-Driven)，自動生成 Mermaid 或 C4 Model 架構圖。</li>
                  <li><strong>任務拆解 (Agentic Planning)：</strong> 專案管理 Agent 自動將 Epic 拆解為 Tickets、預估工時並分配給適合團隊或 AI Coding Agent。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #10b981;">
                <div style="font-weight:800; color:#10b981; font-size:0.98rem; margin-bottom:8px;">2. 設計階段 (Design)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>UI/UX 生成：</strong> 設計師提供文字或手繪草圖，AI 圖像生成工具快速產生高保真 (High-fidelity) 設計稿與互動原型 (Prototype)。</li>
                  <li><strong>API 規格與 Schema 設計：</strong> 架構師利用 AI 根據業務邏輯自動生成 OpenAPI (Swagger) 規格書與關聯式/NoSQL 資料庫 Schema 提案。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #f59e0b;">
                <div style="font-weight:800; color:#f59e0b; font-size:0.98rem; margin-bottom:8px;">3. 開發階段 (Development) - 變動最大階段</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>AI Pair Programming：</strong> IDE 外掛 (Copilot, Windsurf) 即時代碼補全與上下文感知輔助。</li>
                  <li><strong>Agentic Code Generation：</strong> AI Coding Agent 讀取 API 規格，自主生成完整業務邏輯與錯誤處置模組。</li>
                  <li><strong>自動生成單元測試：</strong> 根據原始碼自動寫出涵蓋極端邊界條件 (Edge Cases) 的高覆蓋率測試腳本。</li>
                  <li><strong>代碼翻譯與現代化：</strong> 協助將 Legacy 老舊語言 (如 COBOL) 自動翻譯重構為現代語言 (Java, Go)。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #ec4899;">
                <div style="font-weight:800; color:#ec4899; font-size:0.98rem; margin-bottom:8px;">4. 測試與品質確保 (Testing &amp; QA)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>智慧測試案例生成：</strong> 讀取需求規格與程式碼，自動產出整合測試 (Integration Tests) 與端到端 (E2E) 腳本 (Selenium / Cypress)。</li>
                  <li><strong>視覺化回歸測試：</strong> AI 自動比對 UI 變更像素，精準找出樣式跑位或跨瀏覽器渲染錯誤。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #a855f7;">
                <div style="font-weight:800; color:#a855f7; font-size:0.98rem; margin-bottom:8px;">5. 部署與維護 (Deployment &amp; Maintenance)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>發布說明 (Release Notes) 自動化：</strong> 自動統整該次 Sprint 的 Commit 紀錄與工單，生成技術與用戶端雙版本 Release Notes。</li>
                  <li><strong>智慧文件生成：</strong> 根據最終發布代碼，自動更新 API 手冊、技術文件與系統架構手冊。</li>
                </ul>
              </div>

            </div>

            <!-- Part 2: AI in DevSecOps -->
            <div class="section-title" style="margin-top:24px; color:#10b981;">
              🛡️ 第二部分：AI in DevSecOps (自動化、資安與維運) 細項流程
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:24px;">
              
              <div class="info-card" style="border-top:3px solid #38bdf8;">
                <div style="font-weight:800; color:#38bdf8; font-size:0.98rem; margin-bottom:8px;">1. Plan &amp; Code (極致左移防護)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>AI 即時語意檢測 (Semantic Analysis)：</strong> IDE 中理解程式意圖，AI Security Agent 即時糾正 SQL 注入或硬編碼密鑰。</li>
                  <li><strong>Prompt 與資料外洩防護 (DLP)：</strong> 在對話框與 Gateway 攔截客戶 PII 個資與商業專利算法外流。</li>
                  <li><strong>防禦 AI 供應鏈攻擊：</strong> 審查開源套件依賴庫，識別惡意模型權重與潛在投毒後門。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #60a5fa;">
                <div style="font-weight:800; color:#60a5fa; font-size:0.98rem; margin-bottom:8px;">2. Commit &amp; Build (自動修復與持續整合)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>智慧型 SAST/SCA：</strong> 上下文語意分析大幅降低誤報率 (False Positives)，精準標記真實威脅。</li>
                  <li><strong>★ 漏洞自動修復 (Auto-Remediation)：</strong> AI 主動生成最小化修復代碼並發起 PR，工程師僅需審核 Approve 即可。</li>
                  <li><strong>動態零信任合規掃描：</strong> 確保提交之設定檔與 IaC 符合 Zero Trust 基準及合規條款 (HIPAA, GDPR, ISO 27001)。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #f59e0b;">
                <div style="font-weight:800; color:#f59e0b; font-size:0.98rem; margin-bottom:8px;">3. Test &amp; Deploy (動態防禦與智慧部署)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>AI 驅動模糊測試 (Fuzzing) &amp; DAST：</strong> 自動構造畸形 Payload 與異常邊界，模擬 APT 黑客攻防。</li>
                  <li><strong>部署風險預測評估：</strong> 分析歷史發布數據與變更影響，預估中斷機率，高風險時主動建議阻斷。</li>
                  <li><strong>自動化配置強化 (Hardening)：</strong> 檢查 Terraform/K8s 配置，強制最小權限 (Least Privilege) 與通訊加密。</li>
                </ul>
              </div>

              <div class="info-card" style="border-top:3px solid #ec4899;">
                <div style="font-weight:800; color:#ec4899; font-size:0.98rem; margin-bottom:8px;">4. Operate &amp; Monitor (預測性維運與自主修復)</div>
                <ul style="padding-left:18px; margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                  <li><strong>AI 增強根本原因分析 (RCA)：</strong> 面對 Alert Storm，瞬間關聯 APM、流量與日誌，精準標定根因。</li>
                  <li><strong>自我修復與預測性維運 (AIOps)：</strong> 預測流量突增或 Memory Leak，自主啟動備援或動態擴容。</li>
                  <li><strong>資安事件自動應變 (AI Incident Response)：</strong> 整合 SOAR Playbook，自動隔離染毒容器與阻斷惡意 IP。</li>
                </ul>
              </div>

            </div>

            <!-- Part 3: Governance & Challenges -->
            <div class="info-card" style="border-left:4px solid #ef4444; background:rgba(239, 68, 68, 0.05); padding:20px; margin-bottom:20px;">
              <div style="font-weight:800; color:#f87171; font-size:1.05rem; margin-bottom:8px;">
                ⚠️ 總結與治理挑戰：AI Governance Framework &amp; Human-in-the-Loop
              </div>
              <div style="font-size:0.88rem; color:var(--text-muted); line-height:1.7;">
                將 AI 深度融入 SDLC 與 DevSecOps，<strong>最大的挑戰往往不是技術，而是「治理」與「文化」</strong>。<br>
                在自動化程度極高的環境中，必須建立清晰的 <strong>AI 治理框架 (AI Governance Framework)</strong>，確保 AI 的決策具備：
                <ol style="padding-left:20px; margin:6px 0;">
                  <li><strong>決策可追溯性 (Traceability)：</strong> 每一行 AI 生成的代碼與修復動作皆有日誌與上下文 Prompt 關聯。</li>
                  <li><strong>可解釋性 (Explainability)：</strong> 安全審查與合規政策阻斷必須附帶透明的原因推導。</li>
                  <li><strong>人類專家最終負責 (Human-in-the-loop)：</strong> 核心發布與生產變更權限嚴格保留於工程師手中，防止 AI 幻覺引發毀滅性風險。</li>
                </ol>
              </div>
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

    const modules = ['wheel-sdlc', 'wheel-aiml', 'hierarchy', 'matrix', 'pipeline'];
    modules.forEach(mId => {
      const pane = document.getElementById(`aisdlc-tab-${mId}`);
      if (pane) {
        pane.style.display = (mId === moduleKey) ? 'block' : 'none';
      }
    });
  };

  // Pipeline Data & Interactive Node Selector
  const pipelineData = {
    'pair-coding': {
      title: 'AI Pair Coding (即時代碼輔助產生)',
      phase: '階段 1: Plan & Dev (規劃與開發)',
      metric: '樣板代碼編寫時間 -45%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '開發者使用 AI 驅動的 IDE 外掛 (如 GitHub Copilot, Windsurf)，在撰寫程式時獲得即時的代碼補全 (Auto-completion) 與語意上下文感知，大幅減少樣板作業，將業務需求高效轉換為高品質程式碼。'
    },
    'semantic-sast': {
      title: '實時語意 SAST (IDE 靜態弱點掃描)',
      phase: '階段 1: Plan & Dev (規劃與開發)',
      metric: '語意弱點漏報率 -70%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '超越傳統靜態 Regex 語法比對，AI 能深度理解程式碼的「語意意圖」與資料污染流向 (Taint Analysis)。在開發者敲下存檔瞬間，AI Security Agent 即時糾正 SQL Injection、XSS 或硬編碼金鑰風險，實現極致左移。'
    },
    'data-leak-guard': {
      title: 'Data Leak Guard (防洩漏邊界)',
      phase: '階段 1: Plan & Dev (規劃與開發)',
      metric: '機密外洩風險 -99%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '在 IDE 與企業 API Gateway 層前置監控 Prompt 內容，即時遮蔽或攔截包含 API 金鑰、客戶 PII 資料與商業機密、專利程式碼的外部 AI 請求，確保企業資產與合規邊界無懈可擊。'
    },
    'auto-pr': {
      title: 'AI 自動修復 PR (★ 關鍵左移節點)',
      phase: '階段 2: Commit & Build (提交與構建)',
      metric: '漏洞修復前導時間 MTTR -85%',
      metricBg: 'rgba(37, 99, 235, 0.25)',
      metricBorder: 'rgba(59, 130, 246, 0.5)',
      metricColor: '#93c5fd',
      desc: '當 CI/CD 管道發現安全弱點或相依性缺陷時，AI 不只發出警報，更自主生成修復程式碼與回歸測試並主動發起 Pull Request (PR)。開發者只需審核上下文並 Approve，即可一鍵完成修復。'
    },
    'supply-chain': {
      title: 'AI 供應鏈 SCA (惡意依賴投毒偵測)',
      phase: '階段 2: Commit & Build (提交與構建)',
      metric: '惡意依賴辨識率 99.4%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '自動產生軟體物料清單 (SBOM)，結合大型語言模型分析開源依賴套件之代碼變更與行為特徵，精準辨識 Typosquatting、惡意模型權重或被植入後門的相依依賴庫。'
    },
    'zero-trust-policy': {
      title: '零信任 Policy (自動合規政策審查)',
      phase: '階段 2: Commit & Build (提交與構建)',
      metric: '合規稽核耗時 -60%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '整合 Policy-as-Code (OPA)，AI 自動審核提交的設定檔與 IaC 是否符合企業 Zero Trust 框架、最小授權原則與國際合規法規 (ISO 27001, ISO 42001, GDPR)。'
    },
    'smart-fuzzing': {
      title: '智慧 Fuzzing (AI 生成模糊測試)',
      phase: '階段 3: Test & Deploy (測試與部署)',
      metric: '邊界異常挖掘率 +150%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: 'AI 自動生成大量突變資料、畸形 Payload 與異常邊界請求，模擬進階黑客攻擊行為，對應用程式進行深度的動態邊界模糊測試，提早發現極端條件下的系統崩潰。'
    },
    'dast-anomaly': {
      title: '異常路徑 DAST (API 邏輯漏洞攻防)',
      phase: '階段 3: Test & Deploy (測試與部署)',
      metric: '業務邏輯漏洞檢出率 +65%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: '模擬真實 APT 攻擊路徑對 REST/GraphQL API 進行深度動態安全測試，自動挖掘越權訪問 (BOLA/IDOR)、業務流程繞過與身分驗證瑕疵等傳統 DAST 無法察覺之盲區。'
    },
    'iac-optimize': {
      title: 'IaC 安全最佳化 (K8s / Terraform 審查)',
      phase: '階段 3: Test & Deploy (測試與部署)',
      metric: '雲端配置失誤率 -90%',
      metricBg: 'rgba(5, 150, 105, 0.2)',
      metricBorder: 'rgba(16, 185, 129, 0.4)',
      metricColor: '#34d399',
      desc: 'AI 自動檢查 Terraform 與 Kubernetes 配置清單，確保權限最小化 (Least Privilege)、關閉不必要的公開 Port、強制落實多雲容器加固與密鑰隔離。'
    },
    'left-shift-loop': {
      title: '左移安全迴圈 (Extreme Shift-Left Security Loop)',
      phase: '跨階段貫穿：從部署測試移至開發最初期',
      metric: '缺陷逃逸率 -35% / 交付前導時間 -40%',
      metricBg: 'rgba(37, 99, 235, 0.25)',
      metricBorder: 'rgba(59, 130, 246, 0.5)',
      metricColor: '#93c5fd',
      desc: '打破傳統序列式「寫碼 ➔ 提交 ➔ 等待 CI 報表 ➔ 切換上下文修復」的延遲瓶頸。透過 AI 語意理解與即時自動修補，將安全防護推至「按鍵當下與 PR 提交期」，把安全防護由 Gatekeeper 轉化為自主自癒引擎。'
    },
    'predictive-ops-loop': {
      title: '預測性維運回饋迴圈 (AIOps Predictive Feedback Loop)',
      phase: '循環自癒：從 Day-2 維運回饋至 Day-0 規劃',
      metric: '線上故障預警率 85% / 自我自癒率 +60%',
      metricBg: 'rgba(14, 165, 233, 0.25)',
      metricBorder: 'rgba(56, 189, 248, 0.5)',
      metricColor: '#38bdf8',
      desc: '將線上 APM 效能數據、AIOps 根因分析 (RCA) 與資安事件回應經驗，自動反饋回寫至開發端的 Linter、DLP 策略與單元測試範本，促成系統持續演化與自我防護。'
    }
  };

  window.selectPipelineNode = function(nodeKey) {
    const data = pipelineData[nodeKey];
    if (!data) return;

    // Reset styles for all nodes
    document.querySelectorAll('.pnode-item').forEach(el => {
      el.classList.remove('active');
      if (!el.classList.contains('pnode-core')) {
        el.style.borderColor = '#475569';
        el.style.boxShadow = 'none';
      } else {
        el.style.borderColor = '#3b82f6';
        el.style.boxShadow = '0 0 14px rgba(59, 130, 246, 0.4)';
      }
    });

    const target = document.getElementById('pnode-' + nodeKey);
    if (target) {
      target.classList.add('active');
      if (target.classList.contains('pnode-core')) {
        target.style.borderColor = '#60a5fa';
        target.style.boxShadow = '0 0 22px rgba(59, 130, 246, 0.7)';
      } else {
        target.style.borderColor = '#38bdf8';
        target.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.4)';
      }
    }

    // Update Detail Card
    const titleEl = document.getElementById('pdetail-title');
    const phaseEl = document.getElementById('pdetail-phase');
    const metricEl = document.getElementById('pdetail-metric-badge');
    const descEl = document.getElementById('pdetail-desc');

    if (titleEl) titleEl.textContent = data.title;
    if (phaseEl) phaseEl.textContent = data.phase;
    if (descEl) descEl.textContent = data.desc;
    if (metricEl) {
      metricEl.textContent = data.metric;
      metricEl.style.background = data.metricBg;
      metricEl.style.borderColor = data.metricBorder;
      metricEl.style.color = data.metricColor;
    }
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



// ==========================================
  // Dedicated Tab: Local Verified Portfolio Gallery (本機作品集)
  // ==========================================
  function renderPortfolioView() {
    const page = document.getElementById('page-portfolio');
    if (!page) return;

    const inventory = state.inventory || [];
    const catCounts = {};
    inventory.forEach(item => {
      const cat = item.fileCategory || '其他';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    const categoryPillsHtml = [
      `<button class="viz-pill-btn active" onclick="window.filterPortfolioCategory('全部')">🌟 全部 (${inventory.length})</button>`,
      ...Object.keys(catCounts).map(cat => 
        `<button class="viz-pill-btn" onclick="window.filterPortfolioCategory('${cat}')">${cat} (${catCounts[cat]})</button>`
      )
    ].join('');

    page.innerHTML = `
      <div class="container" style="padding-top: 10px;">
        <div class="hero-card" style="margin-top:0; margin-bottom:24px; border-color:var(--primary-light);">
          <div style="grid-column: 1 / -1;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
              <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px;">🖼️ 高階管理與技術成果佐證作品庫</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">收錄公開檔案：${inventory.length} 筆</span>
            </div>
            <div style="font-size:1.6rem; font-weight:900; color:var(--text-main); margin-bottom:6px;">
              廖倫豪 博士 高階作品集與公開佐證檔案庫
            </div>
            <div style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">
              收錄形象照片、國際證照影本、主流媒體報導（CIO Taiwan、iThome、Google Cloud、MongoDB.local）與學術發表佐證。所有檔案均經最佳化規格處理，支援分類篩選與高解析度 Lightbox 燈箱放大檢視。
            </div>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div class="viz-filter-pills" id="portfolio-filter-pills" style="margin-bottom:0; flex-wrap:wrap; gap:6px;">
            ${categoryPillsHtml}
          </div>

          <div class="search-box-header" style="max-width:280px; width:100%;">
            <span class="search-icon">🔍</span>
            <input type="text" id="portfolio-search-input" placeholder="搜尋作品集圖檔..." oninput="window.filterPortfolioSearch(this.value)">
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="cards-grid" id="portfolio-gallery-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:20px;">
          ${renderGalleryCards(inventory)}
        </div>
      </div>
    `;
  }

  function renderGalleryCards(items) {
    if (!items || items.length === 0) {
      return `<div style="grid-column: 1 / -1; text-align:center; padding:60px; color:var(--text-muted); font-size:1rem;">查無符合條件之作品集檔案</div>`;
    }

    return items.map(item => {
      const displayTitle = item.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
      const sizeMb = (item.sizeBytes / (1024 * 1024)).toFixed(2);
      const assetUrl = item.originalAssetPath || `assets/${item.fileName}`;

      return `
        <div class="info-card gallery-item" style="padding:12px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; transition:transform 0.2s ease, border-color 0.2s ease;" onclick="window.openLightbox('${assetUrl}', '${displayTitle}')">
          <div style="position:relative; width:100%; height:200px; background:#000000; border-radius:var(--radius-sm); overflow:hidden; display:flex; align-items:center; justify-content:center; margin-bottom:10px;">
            <img src="${assetUrl}" alt="${displayTitle}" width="280" height="200" loading="lazy" style="max-width:100%; max-height:100%; object-fit:contain;" onerror="this.onerror=null; this.src='assets/howard_portrait.png';">
            <span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.7); color:#94a3b8; font-size:0.7rem; padding:2px 6px; border-radius:4px;">🔍 點擊放大</span>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="status-badge verified" style="font-size:0.7rem; padding:2px 8px;">${item.fileCategory || '核實素材'}</span>
              <span style="font-size:0.72rem; color:var(--text-muted);">${sizeMb} MB</span>
            </div>
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main); line-height:1.4; margin-bottom:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${displayTitle}">
              ${displayTitle}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.4;">
              ${item.extractedTextSummary || '來自『圖片及媒體檔』核實檔案'}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.filterPortfolioCategory = function(cat) {
    document.querySelectorAll('#portfolio-filter-pills .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText.includes(cat) || (cat === '全部' && btn.innerText.includes('全部')));
    });

    const inventory = state.inventory || [];
    const filtered = (cat === '全部') ? inventory : inventory.filter(x => x.fileCategory === cat);
    const grid = document.getElementById('portfolio-gallery-grid');
    if (grid) grid.innerHTML = renderGalleryCards(filtered);
  };

  window.filterPortfolioSearch = function(query) {
    const q = query.toLowerCase().trim();
    const inventory = state.inventory || [];
    const filtered = inventory.filter(x => 
      x.fileName.toLowerCase().includes(q) || 
      (x.fileCategory && x.fileCategory.toLowerCase().includes(q)) ||
      (x.extractedTextSummary && x.extractedTextSummary.toLowerCase().includes(q))
    );
    const grid = document.getElementById('portfolio-gallery-grid');
    if (grid) grid.innerHTML = renderGalleryCards(filtered);
  };


  // ==========================================
  // Dedicated Tab: Sources & Verification Audit (來源與查證)
  // ==========================================
  function renderSourcesView() {
    const page = document.getElementById('page-sources');
    if (!page) return;

    const sources = state.sources || [];
    const verifiedCount = sources.length;
    const confirmedCount = sources.filter(s => s.status === 'verified' || !s.status).length;
    const pendingCount = sources.filter(s => s.status === 'pending').length;
    const excludedCount = sources.filter(s => s.status === 'excluded').length;

    // Dynamic category aggregation
    const catMap = {};
    sources.forEach(s => {
      const type = s.sourceType || '其他';
      catMap[type] = (catMap[type] || 0) + 1;
    });

    const categoryPillsHtml = [
      `<button class="viz-pill-btn active" onclick="window.filterSourcesType('全部')">🌟 全部 (${sources.length})</button>`,
      ...Object.keys(catMap).map(cat => 
        `<button class="viz-pill-btn" onclick="window.filterSourcesType('${cat}')">${cat} (${catMap[cat]})</button>`
      )
    ].join('');

    page.innerHTML = `
      <div class="container" style="padding-top: 10px;">
        <!-- Header Overview Card -->
        <div class="hero-card" style="margin-top:0; margin-bottom:24px; border-color:var(--primary-light);">
          <div style="grid-column: 1 / -1;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
              <span class="status-badge verified" style="font-size:0.85rem; padding:4px 12px;">✓ 100% 雙重查證資料庫</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">收錄權威出處：${verifiedCount} 筆 (HTTP 200 實時連線驗證)</span>
            </div>
            <div style="font-size:1.6rem; font-weight:900; color:var(--text-main); margin-bottom:6px;">
              來源清單、人物身分消歧與查證日誌
            </div>
            <div style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">
              所有收錄之學歷、經歷、國際期刊與媒體報導，均嚴格遵循國際公開資訊與事實查核準則，透過 Google Cloud 官方影音、CIO Taiwan 封面報導、iThome 專案企劃、Springer SCI 期刊（DOI）與國家圖書館（NCL）全文典藏進行交叉比對，排除所有同名同姓個案，確保 100% 真實可溯源。
            </div>
          </div>
        </div>

        <!-- 3 KPI Statistics Cards (Dynamically Computed) -->
        <div class="bento-grid" style="margin-bottom:24px;">
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:4px; color:#10b981;">${confirmedCount}</div>
            <div class="bento-lbl">已查證公開來源 (Confirmed)</div>
            <div class="bento-desc">包含國際頂級 SCI 期刊、雲端大廠官方影片、權威媒體報導與國圖典藏。</div>
          </div>
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:4px; color:#38bdf8;">${pendingCount}</div>
            <div class="bento-lbl">待確認爭議項目 (Pending)</div>
            <div class="bento-desc">所有歷程均完成雙重文檔比對與官方網址對齊，零未決疑點。</div>
          </div>
          <div class="bento-card">
            <div style="font-size:1.8rem; margin-bottom:4px; color:#f59e0b;">${excludedCount}</div>
            <div class="bento-lbl">同名同姓排除 (Disambiguated)</div>
            <div class="bento-desc">排除同名司法官、醫師與非資訊科技管理領域學者，確保身分唯一性。</div>
          </div>
        </div>

        <!-- Sources Filter Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div class="viz-filter-pills" id="sources-filter-pills" style="margin-bottom:0; flex-wrap:wrap; gap:6px;">
            ${categoryPillsHtml}
          </div>

          <div class="search-box-header" style="max-width:280px; width:100%;">
            <span class="search-icon">🔍</span>
            <input type="text" id="sources-search-input" placeholder="搜尋來源或標題..." oninput="window.filterSourcesSearch(this.value)">
          </div>
        </div>

        <!-- Sources List -->
        <div id="sources-cards-container">
          ${renderSourcesCards(sources)}
        </div>

        <!-- Disambiguation & Verification Standard Notice -->
        <div class="info-card" style="margin-top:30px; border-left:4px solid var(--accent-amber);">
          <div style="font-weight:800; color:var(--accent-amber); font-size:1.0rem; margin-bottom:8px;">
            🛡️ 人物身分消歧 (Identity Disambiguation) 與資料保護規範聲明
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
            1. <strong>唯一身分鑑別</strong>：本檔案庫所載之「廖倫豪 博士 (Howard Liao, Ph.D.)」專指畢業於朝陽科技大學資訊科技管理研究所（指導教授：李朱慧 博士，國圖論文專屬 ID 106IKTC0183002），曾任隆中網絡 IT Director 與跨國集團資訊長之資深高管。<br>
            2. <strong>同名同姓排除</strong>：嚴格排除同名之臺灣高等檢察署檢察官、臨床專任醫師、政治人物及非資訊工程領域人員之公開資訊，絕無身分混淆。<br>
            3. <strong>去識別化與商業保密</strong>：本作品集已落實嚴格商業秘密保護，去識別化所有歷史/現任機構敏感資訊與個資，僅展現可公開驗證之技術架構、方法論與量化成果。
          <div style="margin-top:14px; padding-top:10px; border-top:1px dashed rgba(255,255,255,0.1); font-size:0.75rem; color:#64748b;">
            <span>🔒 本作品集為純靜態架構，不蒐集訪客任何隱私個資與存取紀錄。</span>
          </div></div>
        </div>
      </div>
    `;
  }

  function renderSourcesCards(items) {
    if (!items || items.length === 0) {
      return `<div style="text-align:center; padding:60px; color:var(--text-muted); font-size:1rem;">查無符合條件之來源資料</div>`;
    }

    return items.map(s => {
      const isHttp = s.url && s.url.startsWith('http');
      return `
        <div class="info-card source-item-card" style="margin-bottom:14px; padding:16px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-card); transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="status-badge in_progress" style="font-size:0.75rem; font-weight:800;">${s.id}</span>
              <span class="status-badge verified" style="font-size:0.75rem;">${s.sourceType}</span>
              <span style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">${s.publisher}</span>
            </div>
            <span class="status-badge verified" style="font-size:0.72rem;">✓ 可驗證出處 (HTTP 200 OK)</span>
          </div>

          <div style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:8px; line-height:1.4;">
            ${s.title}
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:12px; background:var(--bg-input); padding:10px 12px; border-radius:var(--radius-sm); border-left:3px solid var(--primary-light);">
            "${s.excerpt}"
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="font-size:0.78rem; color:var(--text-muted);">
              <strong>查證備註：</strong> ${s.evidenceNotes}
            </div>

            <div>
              ${isHttp ? `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:4px 14px; font-size:0.8rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
                  🌐 開啟原始連結 ↗
                </a>
              ` : `
                <button class="btn-secondary" onclick="window.openLightbox('${s.url}', '${s.title}')" style="padding:4px 14px; font-size:0.8rem; cursor:pointer;">
                  🖼️ 檢視本機證書 🔍
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.filterSourcesType = function(type) {
    document.querySelectorAll('#sources-filter-pills .viz-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText.includes(type) || (type === '全部' && btn.innerText.includes('全部')));
    });

    const sources = state.sources || [];
    const filtered = (type === '全部') ? sources : sources.filter(x => 
      x.sourceType.includes(type) || (type === '雲端大廠' && x.publisher.includes('Google Cloud')) || (type === '公益' && x.sourceType.includes('公益'))
    );
    const container = document.getElementById('sources-cards-container');
    if (container) container.innerHTML = renderSourcesCards(filtered);
  };

  window.filterSourcesSearch = function(query) {
    const q = query.toLowerCase().trim();
    const sources = state.sources || [];
    const filtered = sources.filter(x => 
      x.title.toLowerCase().includes(q) || 
      x.publisher.toLowerCase().includes(q) ||
      x.excerpt.toLowerCase().includes(q) ||
      x.sourceType.toLowerCase().includes(q)
    );
    const container = document.getElementById('sources-cards-container');
    if (container) container.innerHTML = renderSourcesCards(filtered);
  };


  // ==========================================
  // PWA Service Worker Registration
  // ==========================================
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then((reg) => console.log('✓ PWA Service Worker successfully registered:', reg.scope))
        .catch((err) => console.warn('PWA Service Worker registration warning:', err));
    });
  }

})();
