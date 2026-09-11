---
version: alpha
name: Egyptian Pharaoh Academic
description: 埃及法老溫暖學術風格 — 暖白為底、曜石深灰正文、溫暖赭石橙大標題、法老琥珀金重點強調、尼羅河綠松石青輔助權威，字重渾厚圓潤，尊崇學術典雅與現代簡約。
metadata:
  designer: "Howard Liao Ph.D. (廖倫豪 博士)"
  scope: [ppt, word, google-docs, web, svg-diagrams]
  canonical_attribution: "報告人 Howard Liao Ph.D.(廖倫豪 博士)"
colors:
  primary: "#D96B27"          # 暖赭石橙 (Egyptian Ochre Orange) — 主標題、主按鈕、章節核心
  secondary: "#2B5F6B"        # 尼羅河綠松石青 (Nile Turquoise Cyan) — 副標題、專業徽章、圖表輔助
  tertiary: "#E5A93C"         # 法老琥珀金 (Pharaoh Amber Gold) — 關鍵高亮、重點摘要卡片、Accent
  neutral: "#1F2421"          # 曜石深灰 (Obsidian Dark Gray) — 主要正文文字 (對比度 > 11:1)
  muted: "#6B726C"            # 沉香灰 (Muted Gray) — 註腳、輔助資訊、次要元數據
  surface: "#FFFFFF"          # 畫布純白 (Canvas White) — 文件主要背景底色
  surface-warm: "#FAF7F2"     # 羊皮紙暖白 (Papyrus Warm Ivory) — 卡片底色、引用區塊底色
  border: "#E8DFD8"           # 暖沙灰 (Warm Sand Border) — 微細分隔線、卡片邊框
  accent-soft: "#FEF7E9"      # 琥珀柔光底 (Soft Amber Glow) — 標註螢光背景、提醒方塊底色
typography:
  h1:
    fontFamily: "Outfit, 'PingFang TC', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Outfit, 'PingFang TC', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Outfit, 'PingFang TC', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, 'PingFang TC', 'Noto Sans TC', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Inter, 'PingFang TC', 'Noto Sans TC', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  card-default:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    padding: "20px"
  card-highlight:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    border: "2px solid {colors.tertiary}"
    padding: "20px"
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "#BC581A"
---

# 埃及法老溫暖學術風格設計系統規範 (Egyptian Pharaoh Academic Design System)

本規範為 **Howard Liao Ph.D. (廖倫豪 博士)** 之跨平台標準設計語彙（Single Source of Truth），統一適用於：
1. **PowerPoint (.pptx) / 簡報投影片**
2. **Word (.docx) / 研究報告與企劃文檔**
3. **Google Docs & Google Slides**
4. **Web 網頁前端 (HTML/CSS/Tailwind)**
5. **架構圖與資訊圖表 (SVG / Excalidraw)**

---

## 1. Overview (設計哲學與品牌基調)

* **核心象徵：** 取法古埃及文明的沉穩、莊嚴、永恆與理性智慧。以暖白羊皮紙為基底，融合尼羅河綠松石青的權威感、帝王琥珀金的洞見光芒，以及赭石橙的學術熱情。
* **字型調性：** 圓潤渾厚（Rounded Bold）、幾何平衡、高辨識度且具學術親和力。
* **統一法定署名：** 所有對外交付封面、報告結尾與簡報底欄均註記：
  > **`報告人 Howard Liao Ph.D.(廖倫豪 博士)`**

---

## 2. Colors (色票與使用規範)

| 語義名稱 | 代碼 (Hex) | RGB | 角色與使用場景 |
|---|---|---|---|
| **Primary 暖赭石橙** | `#D96B27` | `217, 107, 39` | 報告主標題、H1、PPT 首頁強調、主要按鈕 |
| **Secondary 綠松石青** | `#2B5F6B` | `43, 95, 107` | H2 次標題、技術標籤、架構圖核心模組、專業章節 |
| **Tertiary 琥珀金** | `#E5A93C` | `229, 169, 60` | 重點引導高亮、金牌特徵、摘要卡片外框、Callout 強調 |
| **Neutral 曜石深灰** | `#1F2421` | `31, 36, 33` | 主要正文內容文字（取代刺眼全黑，兼顧護眼與 WCAG AAA 對比） |
| **Muted 沉香灰** | `#6B726C` | `107, 114, 108` | 頁碼、圖表次要標籤、補充元資訊、版權聲明 |
| **Surface 純淨白底** | `#FFFFFF` | `255, 255, 255` | 文件主要紙張底色、簡報預設背景 |
| **Surface-Warm 羊皮紙暖白** | `#FAF7F2` | `250, 247, 242` | 卡片容器底色、表格交替底色、次區塊背景 |
| **Accent-Soft 琥珀柔光底** | `#FEF7E9` | `254, 247, 233` | 重點摘要提示框（Callout Box）底色 |
| **Border 暖沙灰** | `#E8DFD8` | `232, 223, 216` | 表格格線、卡片細微邊框、分割線 |

---

## 3. Typography (字型階層規範)

### 跨平台字體替代對照表
* **英文/數字優先：** `Outfit` / `DM Sans` / `Inter` / `Arial Rounded MT Bold`
* **繁體中文優先：** `PingFang TC` (macOS), `Microsoft JhengHei UI` (Windows), `Noto Sans TC` (Web)

### 字階與行距設定
* **H1 (主標題)：** 32–40pt (PPT) / 24–28pt (Word) / 2.25rem (Web)，粗體圓潤，色彩 `#D96B27`。
* **H2 (次標題/節)：** 20–24pt (PPT) / 16–18pt (Word) / 1.5rem (Web)，粗體，色彩 `#2B5F6B`。
* **H3 (小標題/項)：** 16–18pt (PPT) / 13–14pt (Word) / 1.25rem (Web)，半粗體，色彩 `#1F2421` 或 `#D96B27`。
* **Body (正文)：** 12–14pt (PPT) / 10.5–11pt (Word) / 1rem (Web)，常規體，色彩 `#1F2421`，行距 1.5–1.6。
* **Caption / Footer (註腳/頁尾)：** 9–10pt (PPT) / 8.5–9pt (Word) / 0.85rem (Web)，色彩 `#6B726C`。

---

## 4. Platform Specifications (跨平台落地標準)

### A. PowerPoint (.pptx)
1. **簡報比例：** 16:9 寬螢幕 (`13.333 x 7.5 英吋`)。
2. **封面結構：**
   * 背景：純白 `#FFFFFF`，左側或頂部飾有法老赭石橙 (`#D96B27`) 幾何邊條。
   * 大標題：暖赭石橙 40pt Bold。
   * 副標題：綠松石青 22pt。
   * 報告人落款專用欄：右下角或居中顯示 `報告人 Howard Liao Ph.D.(廖倫豪 博士)`。
3. **內頁版型：**
   * 頁首標題左上方配有一道 4px 琥珀金 (`#E5A93C`) 裝飾強調線。
   * 內文卡片採用羊皮紙暖白 (`#FAF7F2`) 圓角矩形，搭配暖沙灰邊框。
   * 頁底統一顯示章節路徑與右側頁碼，左側註記報告人資訊。

### B. Word / Google Docs (.docx)
1. **版面：** A4 標準邊界（上下左右各 2.54 cm）。
2. **標題格式：**
   * 標題 1 (Heading 1)：底部附帶 1.5pt 暖赭石橙下底線，前間距 12pt，後間距 6pt。
   * 標題 2 (Heading 2)：綠松石青，前間距 8pt，後間距 4pt。
3. **表格設計：**
   * 表頭底色：暖赭石橙 (`#D96B27`)，文字純白粗體。
   * 奇數行底色：純白 (`#FFFFFF`)；偶數行底色：羊皮紙暖白 (`#FAF7F2`)。
   * 邊框：暖沙灰 (`#E8DFD8`)。
4. **重點提示框 (Callout Box)：**
   * 底色：琥珀柔光底 (`#FEF7E9`)。
   * 左邊框：3pt 粗琥珀金線 (`#E5A93C`)。

### C. Web 前端 (CSS / Tailwind / HTML)
1. 根目錄注入 CSS 變數：
   ```css
   :root {
     --pharaoh-primary: #D96B27;
     --pharaoh-secondary: #2B5F6B;
     --pharaoh-tertiary: #E5A93C;
     --pharaoh-text: #1F2421;
     --pharaoh-muted: #6B726C;
     --pharaoh-bg: #FFFFFF;
     --pharaoh-surface: #FAF7F2;
     --pharaoh-border: #E8DFD8;
     --pharaoh-accent-soft: #FEF7E9;
   }
   ```
2. 元件皆使用微細 1px 暖沙灰邊框與柔和陰影（`box-shadow: 0 4px 12px rgba(217, 107, 39, 0.06)`）。

---

## 5. Do's and Don'ts (準則與禁忌)

* **Do's (必須遵行)：**
  * 保持背景高亮清爽（白色或極淺羊皮紙暖白），嚴禁使用全黑底作為正式報告文檔。
  * 標題文字保持暖赭石橙或綠松石青，形成清晰的階層律動。
  * 報告封面務必統一使用標準格式：`報告人 Howard Liao Ph.D.(廖倫豪 博士)`。
  * 關鍵數字、KPI 或重點結論一律使用法老琥珀金色塊或高亮強調。
* **Don'ts (嚴格禁止)：**
  * 嚴禁使用刺眼的高飽和螢光色（如螢光綠、鮮紅）破壞學術莊嚴感。
  * 嚴禁正文使用純黑 `#000000`（改用高雅的曜石深灰 `#1F2421`）。
  * 嚴禁混用超過 3 種字體家族，避免視覺雜亂。
