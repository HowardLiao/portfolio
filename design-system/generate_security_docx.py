#!/usr/bin/env python3
"""
Generate Cybersecurity Assessment Report (.docx)
adhering to Egyptian Pharaoh Academic Design System
Author: Howard Liao Ph.D. (廖倫豪 博士)
"""

import os
import docx
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Cybersecurity_Assessment_Report_HowardLiao.docx")

HEX_PRIMARY = "D96B27"       # 暖赭石橙
HEX_SECONDARY = "2B5F6B"     # 綠松石青
HEX_TERTIARY = "E5A93C"      # 法老琥珀金
HEX_NEUTRAL = "1F2421"       # 曜石深灰
HEX_MUTED = "6B726C"         # 沉香灰
HEX_SURFACE_WARM = "FAF7F2"  # 羊皮紙暖白
HEX_BORDER = "E8DFD8"        # 暖沙灰
HEX_ACCENT_SOFT = "FEF7E9"   # 琥珀柔光底

RGB_PRIMARY = RGBColor(217, 107, 39)
RGB_SECONDARY = RGBColor(43, 95, 107)
RGB_TERTIARY = RGBColor(229, 169, 60)
RGB_NEUTRAL = RGBColor(31, 36, 33)
RGB_MUTED = RGBColor(107, 114, 108)

def set_cell_background(cell, hex_color):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def build_security_report():
    doc = docx.Document()

    for sec in doc.sections:
        sec.top_margin = Inches(1.0)
        sec.bottom_margin = Inches(1.0)
        sec.left_margin = Inches(1.0)
        sec.right_margin = Inches(1.0)

        hp = sec.header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("資安防禦體系評估報告 | 零信任戰略架構")
        hrun.font.name = "Outfit"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGB_MUTED

        fp = sec.footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        frun = fp.add_run("報告人 Howard Liao Ph.D.(廖倫豪 博士)  |  企業資訊安全長 (CISO) 專案諮詢")
        frun.font.name = "Inter"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGB_MUTED

    # ==========================================
    # COVER PAGE
    # ==========================================
    p_tag = doc.add_paragraph()
    p_tag.paragraph_format.space_before = Pt(72)
    p_tag.paragraph_format.space_after = Pt(8)
    rt = p_tag.add_run("CYBERSECURITY POSTURE & ZERO TRUST ASSESSMENT")
    rt.font.name = "Outfit"
    rt.font.size = Pt(11)
    rt.font.bold = True
    rt.font.color.rgb = RGB_SECONDARY

    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_after = Pt(12)
    r_tit = p_title.add_run("企業零信任資安防禦成熟度\n與威脅風險評估報告")
    r_tit.font.name = "Outfit"
    r_tit.font.size = Pt(28)
    r_tit.font.bold = True
    r_tit.font.color.rgb = RGB_PRIMARY

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(36)
    r_sub = p_sub.add_run("針對身份認證、端點防護、網路微分區與機敏資料合規之全維度診斷")
    r_sub.font.name = "Inter"
    r_sub.font.size = Pt(13)
    r_sub.font.color.rgb = RGB_NEUTRAL

    # Decorative Bar
    line_tbl = doc.add_table(rows=1, cols=2)
    line_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
    set_cell_background(line_tbl.rows[0].cells[0], HEX_PRIMARY)
    set_cell_background(line_tbl.rows[0].cells[1], HEX_TERTIARY)
    line_tbl.rows[0].cells[0].width = Inches(2.2)
    line_tbl.rows[0].cells[1].width = Inches(4.3)
    trPr = line_tbl.rows[0]._element.get_or_add_trPr()
    trHeight = parse_xml(f'<w:trHeight {nsdecls("w")} w:val="50" w:hRule="exact"/>')
    trPr.append(trHeight)

    # Attribution card
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(130)

    auth_tbl = doc.add_table(rows=1, cols=1)
    auth_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_auth = auth_tbl.rows[0].cells[0]
    c_auth.width = Inches(6.5)
    set_cell_background(c_auth, HEX_ACCENT_SOFT)
    set_cell_margins(c_auth, top=200, bottom=200, left=240, right=240)

    tcPr = c_auth._element.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:left w:val="single" w:sz="24" w:space="0" w:color="{HEX_PRIMARY}"/>'
        f'<w:top w:val="single" w:sz="8" w:space="0" w:color="{HEX_BORDER}"/>'
        f'<w:right w:val="single" w:sz="8" w:space="0" w:color="{HEX_BORDER}"/>'
        f'<w:bottom w:val="single" w:sz="8" w:space="0" w:color="{HEX_BORDER}"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

    p_a1 = c_auth.paragraphs[0]
    ra1 = p_a1.add_run("報告人 Howard Liao Ph.D.(廖倫豪 博士)")
    ra1.font.name = "Outfit"
    ra1.font.size = Pt(14)
    ra1.font.bold = True
    ra1.font.color.rgb = RGB_PRIMARY

    p_a2 = c_auth.add_paragraph()
    p_a2.paragraph_format.space_after = Pt(0)
    ra2 = p_a2.add_run("資訊安全長 (CISO) / 資安評估稽核專家  |  評估基準：NIST CSF 2.0 & ISO 27001:2022")
    ra2.font.name = "Inter"
    ra2.font.size = Pt(9.5)
    ra2.font.color.rgb = RGB_SECONDARY

    doc.add_page_break()

    # ==========================================
    # BODY CONTENT
    # ==========================================
    h1 = doc.add_paragraph()
    h1.paragraph_format.space_before = Pt(16)
    h1.paragraph_format.space_after = Pt(8)
    rh1 = h1.add_run("一、 執行摘要與總體成熟度分數")
    rh1.font.name = "Outfit"
    rh1.font.size = Pt(18)
    rh1.font.bold = True
    rh1.font.color.rgb = RGB_PRIMARY

    pb1 = doc.add_paragraph()
    pb1.paragraph_format.space_after = Pt(10)
    pb1.paragraph_format.line_spacing = 1.35
    rb1 = pb1.add_run(
        "本次資安評估由 Howard Liao Ph.D. 團隊主持，涵蓋企業混合雲、地端機房與遠端端點之全方位安全架構。評估採用美國國家標準技術研究院 (NIST CSF 2.0) 與零信任架構標準 (NIST SP 800-207)。總體成熟度評分為 3.8 / 5.0（定義級別向最佳化邁進），其中在「身份認證」與「雲端基礎防護」表現卓越，但在「跨網段微分區」與「資料主動防外洩 (DLP)」領域尚存強化空間。"
    )
    rb1.font.name = "Inter"
    rb1.font.size = Pt(10.5)
    rb1.font.color.rgb = RGB_NEUTRAL

    # Heading 2
    h2 = doc.add_paragraph()
    h2.paragraph_format.space_before = Pt(14)
    h2.paragraph_format.space_after = Pt(6)
    rh2 = h2.add_run("二、 零信任五大支柱評估矩陣")
    rh2.font.name = "Outfit"
    rh2.font.size = Pt(14)
    rh2.font.bold = True
    rh2.font.color.rgb = RGB_SECONDARY

    # Assessment Table
    tbl = doc.add_table(rows=6, cols=4)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers = ["評估支柱", "現行現況分析", "成熟度評級", "優先補強行動 (Next Step)"]
    for i, h_text in enumerate(headers):
        c = tbl.rows[0].cells[i]
        set_cell_background(c, HEX_PRIMARY)
        set_cell_margins(c, top=140, bottom=140, left=160, right=160)
        p = c.paragraphs[0]
        run = p.add_run(h_text)
        run.font.name = "Outfit"
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    matrix = [
        ("1. 身份 (Identity)", "已落實 Entra ID SSO 與條件式存取 MFA", "4.2 / 5.0 (優良)", "擴展無密碼 FIDO2 金鑰導入"),
        ("2. 端點設備 (Device)", "全集團部署 EDR，但 BYOD 設備缺乏合規檢查", "3.6 / 5.0 (中等)", "落實 MDM 強制安全基準線檢查"),
        ("3. 網路 (Network)", "傳統邊界防火牆運作良好，但內部東西向未隔離", "3.0 / 5.0 (待加強)", "實施微隔離 (Micro-segmentation)"),
        ("4. 應用程式 (App)", "CI/CD 已整合 SAST/DAST，缺少 API Gateway 防護", "3.9 / 5.0 (優良)", "導入 WAAP 抵禦自動化 API 惡意爬蟲"),
        ("5. 資料 (Data)", "核心資料庫具備 TDE 加密，缺乏動態脫敏機制", "3.4 / 5.0 (中等)", "部署機敏資料外洩防護 (DLP) 監控")
    ]

    for r_idx, r_data in enumerate(matrix, start=1):
        bg = HEX_SURFACE_WARM if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(r_data):
            cell = tbl.rows[r_idx].cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.name = "Inter"
            run.font.size = Pt(9.5)
            run.font.color.rgb = RGB_NEUTRAL
            if c_idx == 0:
                run.font.bold = True

    # Amber Callout Box
    p_box_space = doc.add_paragraph()
    p_box_space.paragraph_format.space_before = Pt(16)
    p_box_space.paragraph_format.space_after = Pt(4)

    callout_tbl = doc.add_table(rows=1, cols=1)
    callout_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_box = callout_tbl.rows[0].cells[0]
    c_box.width = Inches(6.5)
    set_cell_background(c_box, HEX_ACCENT_SOFT)
    set_cell_margins(c_box, top=160, bottom=160, left=200, right=200)

    tcPr = c_box._element.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:left w:val="single" w:sz="28" w:space="0" w:color="{HEX_TERTIARY}"/>'
        f'<w:top w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

    cp = c_box.paragraphs[0]
    c_run1 = cp.add_run("🛡️ 資安長戰略改善建議 (CISO Strategic Action)：\n")
    c_run1.font.name = "Outfit"
    c_run1.font.size = Pt(10.5)
    c_run1.font.bold = True
    c_run1.font.color.rgb = RGB_PRIMARY

    c_run2 = cp.add_run(
        "建議於 2026 Q3 優先啟動『東西向網路微隔離工程』與『特權帳號管理 (PAM) 金庫深化』。零信任的核心並非一次性採購產品，而是『永不信任、始終驗證 (Never Trust, Always Verify)』的動態決策流程。"
    )
    c_run2.font.name = "Inter"
    c_run2.font.size = Pt(9.5)
    c_run2.font.color.rgb = RGB_NEUTRAL

    doc.save(OUTPUT_FILE)
    print(f"Cybersecurity Report generated successfully: {OUTPUT_FILE}")

if __name__ == "__main__":
    build_security_report()
