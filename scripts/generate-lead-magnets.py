#!/usr/bin/env python3
"""
TCP Lead Magnet PDF Generator
Generates two branded PDFs:
1. TikTok RPM Cheat Sheet (8-12 pages)
2. Creator Rewards Eligibility Checklist (2-4 pages)
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak, Image as RLImage
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from PIL import Image as PILImage
import io

# ─── Brand Colors ─────────────────────────────────────────────────────────────
NAVY       = colors.HexColor("#0B0F1A")
ORANGE     = colors.HexColor("#F4A261")
WARM_WHITE = colors.HexColor("#FFF7ED")
ORANGE_LIGHT = colors.HexColor("#FDE8D4")
ORANGE_MID = colors.HexColor("#F8C49A")
NAVY_LIGHT = colors.HexColor("#1A2035")
GRAY_TEXT  = colors.HexColor("#4A5568")
GRAY_LIGHT = colors.HexColor("#E8EDF5")
WHITE      = colors.white
GREEN      = colors.HexColor("#22C55E")
RED        = colors.HexColor("#EF4444")

# ─── Page Setup ───────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = letter  # 8.5 x 11 inches
MARGIN = 0.65 * inch
CONTENT_W = PAGE_W - (2 * MARGIN)

# ─── Font Paths ───────────────────────────────────────────────────────────────
FONT_DIR = "/tmp/manrope_fonts"
LOGO_PATH = "/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program/public/images/brand/tcp-logo.png"

def register_fonts():
    pdfmetrics.registerFont(TTFont("Manrope", f"{FONT_DIR}/Manrope-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("Manrope-Bold", f"{FONT_DIR}/Manrope-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("Manrope-SemiBold", f"{FONT_DIR}/Manrope-SemiBold.ttf"))
    pdfmetrics.registerFont(TTFont("Manrope-ExtraBold", f"{FONT_DIR}/Manrope-ExtraBold.ttf"))

# ─── Custom Flowables ─────────────────────────────────────────────────────────

class OrangeRule(Flowable):
    """A thick orange horizontal rule."""
    def __init__(self, width=None, thickness=3):
        Flowable.__init__(self)
        self.width = width or CONTENT_W
        self.thickness = thickness
        self.height = thickness + 4

    def draw(self):
        self.canv.setFillColor(ORANGE)
        self.canv.rect(0, 0, self.width, self.thickness, fill=1, stroke=0)


class SectionHeader(Flowable):
    """Colored section divider with label."""
    def __init__(self, number, title, width=None):
        Flowable.__init__(self)
        self.number = number
        self.title = title
        self.width = width or CONTENT_W
        self.height = 44

    def draw(self):
        c = self.canv
        # Background bar
        c.setFillColor(NAVY)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=0)

        # Number badge
        badge_w = 32
        c.setFillColor(ORANGE)
        c.roundRect(10, 6, badge_w, 32, 4, fill=1, stroke=0)

        # Number text
        c.setFillColor(NAVY)
        c.setFont("Manrope-ExtraBold", 16)
        c.drawCentredString(10 + badge_w / 2, 14, str(self.number))

        # Title text
        c.setFillColor(WHITE)
        c.setFont("Manrope-Bold", 14)
        c.drawString(52, 14, self.title)


class ChecklistItem(Flowable):
    """A styled checklist item with checkbox graphic."""
    def __init__(self, text, checked=False, width=None, sub_text=None):
        Flowable.__init__(self)
        self.text = text
        self.checked = checked
        self.width = width or CONTENT_W
        self.sub_text = sub_text
        self.height = 36 if not sub_text else 52

    def draw(self):
        c = self.canv
        # Background
        c.setFillColor(WARM_WHITE)
        c.roundRect(0, 2, self.width, self.height - 4, 6, fill=1, stroke=0)

        # Checkbox
        box_size = 20
        box_x = 12
        box_y = (self.height - box_size) / 2
        c.setStrokeColor(ORANGE)
        c.setLineWidth(2)
        c.roundRect(box_x, box_y, box_size, box_size, 3, fill=0, stroke=1)

        # Main text
        c.setFillColor(NAVY)
        c.setFont("Manrope-SemiBold", 11)
        text_y = self.height / 2 + (5 if self.sub_text else 2)
        c.drawString(42, text_y, self.text)

        # Sub text
        if self.sub_text:
            c.setFillColor(GRAY_TEXT)
            c.setFont("Manrope", 9)
            c.drawString(42, text_y - 14, self.sub_text)


class StatBox(Flowable):
    """An orange-accented stat/data box."""
    def __init__(self, label, value, width=None):
        Flowable.__init__(self)
        self.label = label
        self.value = value
        self.width = width or CONTENT_W
        self.height = 70

    def draw(self):
        c = self.canv
        # Outer border
        c.setFillColor(ORANGE_LIGHT)
        c.setStrokeColor(ORANGE)
        c.setLineWidth(2)
        c.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=1)

        # Left orange accent bar
        c.setFillColor(ORANGE)
        c.rect(0, 0, 6, self.height, fill=1, stroke=0)

        # Value
        c.setFillColor(NAVY)
        c.setFont("Manrope-ExtraBold", 26)
        c.drawString(18, 32, str(self.value))

        # Label
        c.setFillColor(GRAY_TEXT)
        c.setFont("Manrope-SemiBold", 10)
        c.drawString(18, 16, self.label.upper())


class PullQuote(Flowable):
    """A styled pull quote block."""
    def __init__(self, text, width=None):
        Flowable.__init__(self)
        self.text = text
        self.width = width or CONTENT_W
        # Estimate height based on text length
        self.height = 70

    def draw(self):
        c = self.canv
        c.setFillColor(NAVY)
        c.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=0)

        # Orange quote mark
        c.setFillColor(ORANGE)
        c.setFont("Manrope-ExtraBold", 48)
        c.drawString(12, 24, "\u201c")

        # Quote text
        c.setFillColor(WHITE)
        c.setFont("Manrope-SemiBold", 11)
        # Wrap text manually
        words = self.text.split()
        lines = []
        line = []
        for word in words:
            test = " ".join(line + [word])
            if c.stringWidth(test, "Manrope-SemiBold", 11) < self.width - 60:
                line.append(word)
            else:
                lines.append(" ".join(line))
                line = [word]
        if line:
            lines.append(" ".join(line))

        y = self.height - 20
        for ln in lines[:2]:
            c.drawString(52, y, ln)
            y -= 16


class MistakeBox(Flowable):
    """A red-accented mistake/warning box."""
    def __init__(self, number, title, body, width=None):
        Flowable.__init__(self)
        self.number = number
        self.title = title
        self.body = body
        self.width = width or CONTENT_W
        self.height = 72

    def draw(self):
        c = self.canv
        c.setFillColor(colors.HexColor("#FEF2F2"))
        c.setStrokeColor(RED)
        c.setLineWidth(1.5)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=1)

        # Red left bar
        c.setFillColor(RED)
        c.rect(0, 0, 5, self.height, fill=1, stroke=0)

        # Number circle
        c.setFillColor(RED)
        c.circle(24, self.height - 20, 11, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Manrope-Bold", 11)
        c.drawCentredString(24, self.height - 25, str(self.number))

        # Title
        c.setFillColor(colors.HexColor("#991B1B"))
        c.setFont("Manrope-Bold", 11)
        c.drawString(44, self.height - 18, self.title)

        # Body text (wrapped)
        c.setFillColor(NAVY)
        c.setFont("Manrope", 9.5)
        words = self.body.split()
        lines = []
        line = []
        for word in words:
            test = " ".join(line + [word])
            if c.stringWidth(test, "Manrope", 9.5) < self.width - 54:
                line.append(word)
            else:
                lines.append(" ".join(line))
                line = [word]
        if line:
            lines.append(" ".join(line))

        y = self.height - 36
        for ln in lines[:2]:
            c.drawString(44, y, ln)
            y -= 13


class WeekBlock(Flowable):
    """30-day plan week block."""
    def __init__(self, week_num, theme, days_text, width=None):
        Flowable.__init__(self)
        self.week_num = week_num
        self.theme = theme
        self.days_text = days_text  # list of (day, action) tuples
        self.width = width or CONTENT_W
        self.height = 30 + len(days_text) * 22

    def draw(self):
        c = self.canv
        # Header
        c.setFillColor(NAVY)
        c.roundRect(0, self.height - 28, self.width, 28, 6, fill=1, stroke=0)

        c.setFillColor(ORANGE)
        c.setFont("Manrope-Bold", 11)
        c.drawString(12, self.height - 19, f"WEEK {self.week_num}")

        c.setFillColor(WHITE)
        c.setFont("Manrope-SemiBold", 11)
        c.drawString(80, self.height - 19, f"— {self.theme}")

        # Body background
        c.setFillColor(WARM_WHITE)
        c.roundRect(0, 0, self.width, self.height - 28, 0, fill=1, stroke=0)

        # Day items
        y = self.height - 48
        for day, action in self.days_text:
            # Day label
            c.setFillColor(ORANGE)
            c.setFont("Manrope-Bold", 9)
            c.drawString(12, y, f"Day {day}")

            # Dot separator
            c.setFillColor(GRAY_LIGHT)
            c.rect(48, y + 4, self.width - 60, 1, fill=1, stroke=0)

            # Action
            c.setFillColor(NAVY)
            c.setFont("Manrope", 9.5)
            # Truncate if too long
            max_w = self.width - 60
            while c.stringWidth(action, "Manrope", 9.5) > max_w and len(action) > 10:
                action = action[:-4] + "..."
            c.drawString(56, y, action)
            y -= 22


# ─── Page Templates ────────────────────────────────────────────────────────────

def make_cover_page_cheatsheet(c, doc):
    """Draw the cover page for the RPM Cheat Sheet."""
    # Full-page navy background
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Orange geometric accent — top right triangle
    c.setFillColor(ORANGE)
    p = c.beginPath()
    p.moveTo(PAGE_W - 2.5 * inch, PAGE_H)
    p.lineTo(PAGE_W, PAGE_H)
    p.lineTo(PAGE_W, PAGE_H - 2.5 * inch)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    # Bottom left accent
    c.setFillColor(colors.HexColor("#1A2035"))
    p = c.beginPath()
    p.moveTo(0, 0)
    p.lineTo(3 * inch, 0)
    p.lineTo(0, 2 * inch)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    # Orange thin accent line
    c.setFillColor(ORANGE)
    c.rect(MARGIN, PAGE_H - 1.1 * inch, 0.4 * inch, 4, fill=1, stroke=0)

    # Logo
    if os.path.exists(LOGO_PATH):
        try:
            c.drawImage(LOGO_PATH, MARGIN, PAGE_H - 1.5 * inch, width=1.6 * inch, height=0.7 * inch,
                       preserveAspectRatio=True, mask="auto")
        except Exception:
            pass

    # Eyebrow label
    c.setFillColor(ORANGE)
    c.setFont("Manrope-Bold", 10)
    c.drawString(MARGIN, PAGE_H * 0.62, "FREE GUIDE  |  TIKTOKCREATIVITYPROGRAM.COM")

    # Main title
    c.setFillColor(WHITE)
    c.setFont("Manrope-ExtraBold", 38)
    c.drawString(MARGIN, PAGE_H * 0.52, "The TikTok Creator")
    c.setFillColor(ORANGE)
    c.drawString(MARGIN, PAGE_H * 0.44, "Rewards Cheat Sheet")

    # Subtitle
    c.setFillColor(colors.HexColor("#94A3B8"))
    c.setFont("Manrope-SemiBold", 14)
    c.drawString(MARGIN, PAGE_H * 0.38, "Everything you need to start earning from")
    c.drawString(MARGIN, PAGE_H * 0.345, "TikTok Creator Rewards — in 15 minutes.")

    # Orange divider
    c.setFillColor(ORANGE)
    c.rect(MARGIN, PAGE_H * 0.32, 2 * inch, 3, fill=1, stroke=0)

    # What's inside box
    box_y = PAGE_H * 0.12
    box_h = PAGE_H * 0.18
    c.setFillColor(colors.HexColor("#1A2035"))
    c.roundRect(MARGIN, box_y, CONTENT_W, box_h, 8, fill=1, stroke=0)

    c.setFillColor(ORANGE)
    c.setFont("Manrope-Bold", 9)
    c.drawString(MARGIN + 14, box_y + box_h - 18, "WHAT\u2019S INSIDE:")

    items = [
        "\u2713  Quick-Start Eligibility Checklist",
        "\u2713  The Money Math (RPM explained)",
        "\u2713  7 Strategies for More Qualified Views",
        "\u2713  Content Types + RPM by Niche Tables",
        "\u2713  5 Mistakes That Kill Your Earnings",
        "\u2713  30-Day Kickstart Plan",
    ]
    c.setFillColor(WHITE)
    c.setFont("Manrope-SemiBold", 10)
    col_w = CONTENT_W / 2 - 10
    for i, item in enumerate(items):
        col = i % 2
        row = i // 2
        x = MARGIN + 14 + col * (col_w + 10)
        y = box_y + box_h - 36 - row * 18
        c.drawString(x, y, item)

    # Footer
    c.setFillColor(colors.HexColor("#4A5568"))
    c.setFont("Manrope", 8)
    c.drawString(MARGIN, 0.3 * inch, "tiktokcreativityprogram.com")
    c.drawRightString(PAGE_W - MARGIN, 0.3 * inch, "\u00a9 2026 TikTok Creativity Program. All rights reserved.")


def make_cover_page_checklist(c, doc):
    """Draw the cover page for the Eligibility Checklist."""
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Geometric accent — different layout from cheat sheet
    c.setFillColor(ORANGE)
    p = c.beginPath()
    p.moveTo(0, PAGE_H)
    p.lineTo(2.5 * inch, PAGE_H)
    p.lineTo(0, PAGE_H - 2.5 * inch)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    c.setFillColor(colors.HexColor("#1A2035"))
    p = c.beginPath()
    p.moveTo(PAGE_W, 0)
    p.lineTo(PAGE_W - 3 * inch, 0)
    p.lineTo(PAGE_W, 2 * inch)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    # Logo
    if os.path.exists(LOGO_PATH):
        try:
            c.drawImage(LOGO_PATH, MARGIN, PAGE_H - 1.5 * inch, width=1.6 * inch, height=0.7 * inch,
                       preserveAspectRatio=True, mask="auto")
        except Exception:
            pass

    # Big checklist icon
    check_x = PAGE_W - MARGIN - 1.8 * inch
    check_y = PAGE_H * 0.38
    c.setFillColor(colors.HexColor("#1A2035"))
    c.roundRect(check_x, check_y, 1.8 * inch, 2.2 * inch, 12, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.setFont("Manrope-ExtraBold", 48)
    c.drawCentredString(check_x + 0.9 * inch, check_y + 1.5 * inch, "\u2713")
    c.setFillColor(colors.HexColor("#4A5568"))
    c.setFont("Manrope", 8)
    for i, line in enumerate(["_ _ _ _ _ _ _ _ _", "_ _ _ _ _ _ _ _ _", "_ _ _ _ _ _ _ _ _"]):
        c.drawCentredString(check_x + 0.9 * inch, check_y + 1.1 * inch - i * 16, line)

    # Eyebrow
    c.setFillColor(ORANGE)
    c.setFont("Manrope-Bold", 10)
    c.drawString(MARGIN, PAGE_H * 0.64, "FREE CHECKLIST  |  TIKTOKCREATIVITYPROGRAM.COM")

    # Title
    c.setFillColor(WHITE)
    c.setFont("Manrope-ExtraBold", 34)
    c.drawString(MARGIN, PAGE_H * 0.54, "TikTok Creator Rewards")
    c.setFillColor(ORANGE)
    c.drawString(MARGIN, PAGE_H * 0.47, "Eligibility Checklist")

    # Subtitle
    c.setFillColor(colors.HexColor("#94A3B8"))
    c.setFont("Manrope-SemiBold", 12)
    c.drawString(MARGIN, PAGE_H * 0.415, "Check every box before you apply.")
    c.drawString(MARGIN, PAGE_H * 0.385, "Miss one and you\u2019ll get rejected.")

    # Divider
    c.setFillColor(ORANGE)
    c.rect(MARGIN, PAGE_H * 0.365, 2 * inch, 3, fill=1, stroke=0)

    # Stats row
    stats = [
        ("5", "Requirements"),
        ("8", "Red Flags to Avoid"),
        ("5", "Steps to Apply"),
    ]
    stat_w = CONTENT_W / 3
    stat_y = PAGE_H * 0.19
    for i, (val, label) in enumerate(stats):
        x = MARGIN + i * stat_w
        c.setFillColor(colors.HexColor("#1A2035"))
        c.roundRect(x + 4, stat_y, stat_w - 12, 0.9 * inch, 8, fill=1, stroke=0)
        c.setFillColor(ORANGE)
        c.setFont("Manrope-ExtraBold", 30)
        c.drawCentredString(x + stat_w / 2, stat_y + 0.5 * inch, val)
        c.setFillColor(colors.HexColor("#94A3B8"))
        c.setFont("Manrope-SemiBold", 9)
        c.drawCentredString(x + stat_w / 2, stat_y + 0.28 * inch, label.upper())

    # Footer
    c.setFillColor(colors.HexColor("#4A5568"))
    c.setFont("Manrope", 8)
    c.drawString(MARGIN, 0.3 * inch, "tiktokcreativityprogram.com")
    c.drawRightString(PAGE_W - MARGIN, 0.3 * inch, "\u00a9 2026 TikTok Creativity Program. All rights reserved.")


def draw_page_footer(c, page_num, total_pages=None):
    """Draw standard footer on interior pages."""
    footer_y = 0.4 * inch
    # Left: URL
    c.setFillColor(GRAY_TEXT)
    c.setFont("Manrope", 8)
    c.drawString(MARGIN, footer_y, "tiktokcreativityprogram.com")

    # Center: page number
    if total_pages:
        page_str = f"{page_num} of {total_pages}"
    else:
        page_str = str(page_num)
    c.drawCentredString(PAGE_W / 2, footer_y, page_str)

    # Right: tagline
    c.drawRightString(PAGE_W - MARGIN, footer_y, "The TikTok Creator Rewards Cheat Sheet")

    # Top rule
    c.setFillColor(GRAY_LIGHT)
    c.rect(MARGIN, footer_y + 12, CONTENT_W, 1, fill=1, stroke=0)


def draw_checklist_footer(c, page_num):
    footer_y = 0.4 * inch
    c.setFillColor(GRAY_TEXT)
    c.setFont("Manrope", 8)
    c.drawString(MARGIN, footer_y, "tiktokcreativityprogram.com")
    c.drawCentredString(PAGE_W / 2, footer_y, str(page_num))
    c.drawRightString(PAGE_W - MARGIN, footer_y, "Creator Rewards Eligibility Checklist")
    c.setFillColor(GRAY_LIGHT)
    c.rect(MARGIN, footer_y + 12, CONTENT_W, 1, fill=1, stroke=0)


# ─── Styles ────────────────────────────────────────────────────────────────────

def get_styles():
    styles = {}

    styles["body"] = ParagraphStyle(
        "body",
        fontName="Manrope",
        fontSize=10.5,
        leading=16,
        textColor=colors.HexColor("#2D3748"),
        spaceBefore=0,
        spaceAfter=0,
    )
    styles["body_sm"] = ParagraphStyle(
        "body_sm",
        fontName="Manrope",
        fontSize=9.5,
        leading=14,
        textColor=GRAY_TEXT,
        spaceBefore=0,
        spaceAfter=0,
    )
    styles["h2"] = ParagraphStyle(
        "h2",
        fontName="Manrope-ExtraBold",
        fontSize=18,
        leading=24,
        textColor=NAVY,
        spaceBefore=10,
        spaceAfter=6,
    )
    styles["h3"] = ParagraphStyle(
        "h3",
        fontName="Manrope-Bold",
        fontSize=13,
        leading=18,
        textColor=NAVY,
        spaceBefore=8,
        spaceAfter=4,
    )
    styles["label"] = ParagraphStyle(
        "label",
        fontName="Manrope-Bold",
        fontSize=9,
        leading=12,
        textColor=ORANGE,
        spaceBefore=0,
        spaceAfter=2,
    )
    styles["caption"] = ParagraphStyle(
        "caption",
        fontName="Manrope",
        fontSize=8.5,
        leading=12,
        textColor=GRAY_TEXT,
        spaceBefore=0,
        spaceAfter=0,
        alignment=TA_CENTER,
    )
    styles["link"] = ParagraphStyle(
        "link",
        fontName="Manrope-SemiBold",
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1D4ED8"),
        spaceBefore=0,
        spaceAfter=0,
    )
    styles["footer_note"] = ParagraphStyle(
        "footer_note",
        fontName="Manrope",
        fontSize=8,
        leading=11,
        textColor=GRAY_TEXT,
        spaceBefore=0,
        spaceAfter=0,
        alignment=TA_CENTER,
    )

    return styles


# ─── Table Styling Helpers ────────────────────────────────────────────────────

def style_data_table(data, col_widths=None, header_bg=NAVY, header_fg=WHITE, row_alt=WARM_WHITE):
    """Return a styled Table flowable."""
    t = Table(data, colWidths=col_widths, repeatRows=1)
    n_rows = len(data)
    n_cols = len(data[0])

    row_styles = []
    for i in range(1, n_rows):
        bg = WHITE if i % 2 == 0 else row_alt
        row_styles.append(("BACKGROUND", (0, i), (-1, i), bg))

    t.setStyle(TableStyle([
        # Header
        ("BACKGROUND", (0, 0), (-1, 0), header_bg),
        ("TEXTCOLOR", (0, 0), (-1, 0), header_fg),
        ("FONTNAME", (0, 0), (-1, 0), "Manrope-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("ALIGN", (0, 0), (-1, 0), "CENTER"),
        # Body
        ("FONTNAME", (0, 1), (-1, -1), "Manrope"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 7),
        ("ALIGN", (0, 1), (-1, -1), "CENTER"),
        ("ALIGN", (0, 1), (0, -1), "LEFT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, row_alt]),
        # Borders
        ("LINEBELOW", (0, 0), (-1, 0), 2, ORANGE),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, GRAY_LIGHT),
        ("BOX", (0, 0), (-1, -1), 1, GRAY_LIGHT),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY),
        *row_styles,
    ]))
    return t


def style_niche_table(data, col_widths=None):
    """RPM niche table with orange accents on high-value rows."""
    t = Table(data, colWidths=col_widths, repeatRows=1)
    row_styles = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Manrope-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("LINEBELOW", (0, 0), (-1, 0), 2, ORANGE),
        ("FONTNAME", (0, 1), (-1, -1), "Manrope"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY),
        ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ("ALIGN", (0, 0), (0, -1), "LEFT"),
        ("BOX", (0, 0), (-1, -1), 1, GRAY_LIGHT),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, GRAY_LIGHT),
        # Top 2 earners get orange accent
        ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#FFF3E8")),
        ("BACKGROUND", (0, 2), (-1, 2), WARM_WHITE),
        ("BACKGROUND", (0, 3), (-1, 3), WHITE),
        ("BACKGROUND", (0, 4), (-1, 4), WARM_WHITE),
        ("BACKGROUND", (0, 5), (-1, 5), WHITE),
        ("BACKGROUND", (0, 6), (-1, 6), WARM_WHITE),
        ("BACKGROUND", (0, 7), (-1, 7), WHITE),
        ("BACKGROUND", (0, 8), (-1, 8), WARM_WHITE),
        # Highlight the RPM value column
        ("TEXTCOLOR", (1, 1), (1, 2), colors.HexColor("#B45309")),
        ("FONTNAME", (1, 1), (1, 2), "Manrope-Bold"),
    ]
    t.setStyle(TableStyle(row_styles))
    return t


# ─── PDF 1: RPM Cheat Sheet ───────────────────────────────────────────────────

def build_cheat_sheet_pdf(output_path):
    register_fonts()
    ST = get_styles()

    elements = []

    # ── Cover Page (drawn via onFirstPage callback, no flowable) ─────────────
    # We'll use a canvas-based approach with a custom document template.
    # For simplicity, we use a Page Break after cover.

    # ── Page 2: What This Covers + Quick-Start Checklist ────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(Paragraph("WHAT THIS CHEAT SHEET COVERS", ST["label"]))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(
        "You've heard about TikTok's Creator Rewards Program. This cheat sheet gives you the full picture "
        "in 15 minutes: how to get in, how the money works, what to post, what to avoid, and a 30-day plan "
        "to go from zero earnings to your first real payout.",
        ST["body"]
    ))
    elements.append(Spacer(1, 0.2 * inch))

    elements.append(SectionHeader(1, "Quick-Start Checklist"))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "Confirm you meet all five requirements. Miss one and you cannot apply.",
        ST["body"]
    ))
    elements.append(Spacer(1, 10))

    checklist_items = [
        ("Personal Account (not Business)", "Business accounts are permanently ineligible — switch back if needed"),
        ("10,000+ Followers", "No workaround. Focus on organic growth if you\u2019re under 10K"),
        ("100,000+ Video Views in Last 30 Days", "This resets monthly. Consistency matters more than one viral hit"),
        ("Age 18+", "Verified through your account settings during application"),
        ("Located in an Eligible Country", "US, UK, France, Germany, Japan, South Korea, Brazil, Mexico"),
    ]

    for title, sub in checklist_items:
        elements.append(ChecklistItem(title, sub_text=sub))
        elements.append(Spacer(1, 6))

    elements.append(Spacer(1, 12))
    elements.append(Paragraph("HOW TO APPLY:", ST["label"]))
    elements.append(Spacer(1, 6))

    apply_steps = [
        ("1", "Go to your TikTok profile and tap the three-line menu"),
        ("2", "Tap Creator tools, then Creativity Program"),
        ("3", "If you meet all requirements, you\u2019ll see an Apply button"),
        ("4", "Accept the terms — videos over 60 seconds now start generating revenue"),
    ]

    step_data = [[Paragraph(f"<b>{n}</b>", ST["body"]), Paragraph(text, ST["body"])] for n, text in apply_steps]
    step_table = Table(step_data, colWidths=[0.35 * inch, CONTENT_W - 0.5 * inch])
    step_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), ORANGE),
        ("TEXTCOLOR", (0, 0), (0, -1), NAVY),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("FONTNAME", (0, 0), (0, -1), "Manrope-ExtraBold"),
        ("FONTSIZE", (0, 0), (0, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (1, 0), (1, -1), 10),
        ("ROWBACKGROUNDS", (1, 0), (1, -1), [WARM_WHITE, WHITE]),
        ("TEXTCOLOR", (1, 0), (1, -1), NAVY),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ]))
    elements.append(step_table)

    elements.append(PageBreak())

    # ── Page 3: The Money Math ────────────────────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(2, "The Money Math"))
    elements.append(Spacer(1, 12))

    # Two key terms
    terms_data = [
        [
            Paragraph("<b>RPM</b>", ParagraphStyle("t", fontName="Manrope-ExtraBold", fontSize=14, textColor=ORANGE)),
            Paragraph("<b>Qualified Views</b>", ParagraphStyle("t", fontName="Manrope-ExtraBold", fontSize=14, textColor=ORANGE)),
        ],
        [
            Paragraph("Revenue Per Mille — what TikTok pays you per 1,000 <b>qualified</b> views. Not fixed. Ranges from $0.40–$5.00+ depending on niche, geography, and content quality.", ST["body_sm"]),
            Paragraph("Not every view counts. Only views on <b>original videos over 60 seconds</b> watched by real users in eligible countries qualify. Expect 40–60% of total views to qualify.", ST["body_sm"]),
        ]
    ]
    terms_table = Table(terms_data, colWidths=[CONTENT_W / 2 - 6, CONTENT_W / 2 - 6])
    terms_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ORANGE_LIGHT),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEAFTER", (0, 0), (0, -1), 1, ORANGE),
        ("BOX", (0, 0), (-1, -1), 1.5, ORANGE),
    ]))
    elements.append(terms_table)

    elements.append(Spacer(1, 14))

    # Formula box
    formula = PullQuote("Earnings = (Qualified Views \u00f7 1,000) \u00d7 RPM")
    formula.height = 58
    elements.append(formula)

    elements.append(Spacer(1, 14))
    elements.append(Paragraph("WHAT THAT LOOKS LIKE:", ST["label"]))
    elements.append(Spacer(1, 6))

    earn_header = ["Total Views", "Qualified Views (est.)", "at $0.50 RPM", "at $1.00 RPM", "at $1.50 RPM"]
    earn_data = [
        earn_header,
        ["10,000", "4K–6K", "$2–$3", "$4–$6", "$6–$9"],
        ["50,000", "20K–30K", "$10–$15", "$20–$30", "$30–$45"],
        ["100,000", "40K–60K", "$20–$30", "$40–$60", "$60–$90"],
        ["500,000", "200K–300K", "$100–$150", "$200–$300", "$300–$450"],
        ["1,000,000", "400K–600K", "$200–$300", "$400–$600", "$600–$900"],
    ]

    col_ws = [1.2*inch, 1.5*inch, 1.1*inch, 1.1*inch, 1.1*inch]
    elements.append(style_data_table(earn_data, col_widths=col_ws))

    elements.append(Spacer(1, 8))
    elements.append(Paragraph(
        "Community-reported estimates. TikTok does not publish official rates. Your RPM depends on niche, "
        "audience geography, and content quality. Use the Earnings Calculator at tiktokcreativityprogram.com/calculators/earnings-calculator",
        ST["caption"]
    ))

    elements.append(PageBreak())

    # ── Page 4: 7 Strategies ──────────────────────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(3, "Seven Ways to Get More Qualified Views"))
    elements.append(Spacer(1, 10))

    strategies = [
        ("Hook Viewers in the First 3 Seconds",
         "The algorithm decides your video\u2019s fate based on early retention. Open with a question, a bold claim, "
         "or a visual that creates curiosity. Never start with \u201cHey guys\u201d or a self-introduction."),
        ("Push Watch Time Past 60 Seconds",
         "Only videos over 60 seconds qualify for Creator Rewards. Use pattern interrupts every 10-15 seconds "
         "(angle changes, text overlays, B-roll cuts) to reset viewer attention."),
        ("Use TikTok Search to Your Advantage",
         "TikTok\u2019s search works like a mini search engine. Use Creator Search Insights to find what people search "
         "in your niche. Put the phrase in your caption and on-screen text. Search-optimized videos earn longer."),
        ("Post When Your Audience Is Online",
         "Check TikTok Studio for your specific audience activity data. Generic advice is useless. Your data overrides "
         "any general rule. If analytics show your audience is active at 2 PM Tuesdays, that\u2019s your prime slot."),
        ("Write Captions That Drive Engagement",
         "Captions are a second hook. Ask a question. Use 3-5 relevant hashtags (not 30). Hashtag stuffing hurts "
         "distribution. Ask something that drives comments \u2014 comments signal quality to the algorithm."),
        ("Optimize for Saves and Shares Over Likes",
         "Saves and shares carry significantly more weight than likes in TikTok\u2019s reward calculation. Create "
         "content people want to reference later: tutorials, step-by-step processes, checklists."),
        ("Keep Everything Original",
         "Duets and Stitches don\u2019t qualify for monetization. Repurposed content with watermarks is ineligible. "
         "Record original audio. Share your own perspective. Originality is a direct RPM factor."),
    ]

    for i, (title, body) in enumerate(strategies):
        # Number + title row
        num_style = ParagraphStyle("ns", fontName="Manrope-ExtraBold", fontSize=22,
                                   textColor=ORANGE, leading=24)
        title_style = ParagraphStyle("ts", fontName="Manrope-Bold", fontSize=12,
                                     textColor=NAVY, leading=16)
        body_style = ParagraphStyle("bs", fontName="Manrope", fontSize=9.5,
                                    textColor=GRAY_TEXT, leading=14)

        row_data = [[
            Paragraph(str(i + 1), num_style),
            [Paragraph(title, title_style), Spacer(1, 3), Paragraph(body, body_style)]
        ]]
        row_table = Table(row_data, colWidths=[0.45 * inch, CONTENT_W - 0.6 * inch])
        row_table.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("BACKGROUND", (0, 0), (-1, -1), WARM_WHITE if i % 2 == 0 else WHITE),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
        ]))
        elements.append(row_table)
        elements.append(Spacer(1, 4))

    elements.append(PageBreak())

    # ── Page 5: Content Types + RPM Tables ───────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(4, "Content Types That Earn the Most"))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "Two variables set your earnings ceiling before you post a single video: your niche and your audience geography.",
        ST["body"]
    ))
    elements.append(Spacer(1, 12))

    # Side-by-side tables
    niche_header = ["Niche", "RPM Range"]
    niche_data = [
        niche_header,
        ["Finance / Business", "$1.50 – $5.00"],
        ["Tech / Education", "$1.00 – $3.00"],
        ["Health / Wellness", "$0.80 – $2.00"],
        ["Lifestyle / Beauty", "$0.70 – $1.50"],
        ["Food / Cooking", "$0.60 – $1.30"],
        ["Travel", "$0.60 – $1.20"],
        ["Entertainment", "$0.50 – $1.20"],
        ["Gaming", "$0.40 – $1.00"],
    ]

    geo_header = ["Market", "Countries", "RPM Range"]
    geo_data = [
        geo_header,
        ["Tier 1", "US, UK, Canada, AU", "$0.75 – $1.50+"],
        ["Tier 2", "DE, FR, JP, KR", "$0.50 – $0.90"],
        ["Tier 3", "MX, BR", "$0.20 – $0.40"],
        ["Tier 4", "Most dev. markets", "$0.10 – $0.20"],
    ]

    niche_t = style_niche_table(niche_data, col_widths=[1.6 * inch, 1.3 * inch])
    geo_t = style_data_table(geo_data, col_widths=[0.75 * inch, 1.4 * inch, 1.0 * inch])

    tables_row = Table(
        [[niche_t, geo_t]],
        colWidths=[3.1 * inch, 3.25 * inch]
    )
    tables_row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))

    lbl1 = Paragraph("RPM BY NICHE", ST["label"])
    lbl2 = Paragraph("RPM BY AUDIENCE GEOGRAPHY", ST["label"])
    labels_row = Table([[lbl1, lbl2]], colWidths=[3.1 * inch, 3.25 * inch])
    labels_row.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))

    elements.append(labels_row)
    elements.append(Spacer(1, 4))
    elements.append(tables_row)

    elements.append(Spacer(1, 14))
    elements.append(PullQuote(
        "A finance creator at $3.00 RPM earns 6x more per qualified view than a gaming creator at $0.50 RPM."
    ))

    elements.append(Spacer(1, 14))
    elements.append(Paragraph("THE FORMAT FACTOR", ST["label"]))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(
        "Tutorial and educational formats consistently outperform entertainment formats on RPM, even within the same niche. "
        "A fitness creator posting step-by-step workout breakdowns will likely earn more per view than one posting "
        "gym fail compilations. Educational content drives saves and longer watch times — both increase the Additional Reward score.",
        ST["body"]
    ))

    elements.append(PageBreak())

    # ── Page 6: Common Mistakes ───────────────────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(5, "5 Common Mistakes That Kill Your Earnings"))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "These five mistakes account for the majority of 'why am I earning nothing' posts in creator communities. Each one is fixable.",
        ST["body"]
    ))
    elements.append(Spacer(1, 12))

    mistakes = [
        ("Using a Business Account",
         "Business accounts cannot join Creator Rewards. If you switched for analytics, switch back. You lose some music "
         "library access but gain the ability to earn. Guide: tiktokcreativityprogram.com/guides/convert-business-to-personal"),
        ("Ignoring Audience Geography",
         "You post in English but 60% of your audience is outside eligible countries. Those views don\u2019t qualify. "
         "Check your geography in TikTok Studio and adjust content to attract Tier 1 viewers."),
        ("Posting Videos Under 60 Seconds",
         "Short videos don\u2019t qualify for Creator Rewards. At all. If your content runs 30-45 seconds, restructure. "
         "Add context, break into steps, or combine two related ideas. Don\u2019t pad — rethink the structure."),
        ("Reposting or Repurposing Content",
         "Reposting older videos, uploading Reels with watermarks, or using someone else\u2019s audio in duets tanks your "
         "originality score. Every video should be freshly recorded with original audio."),
        ("Expecting Instant Dashboard Updates",
         "TikTok\u2019s earnings dashboard lags 2-3 days. A video hitting 500K views shows $0.00 for days. Wait 72 hours "
         "minimum before evaluating a video\u2019s earnings. Don\u2019t delete videos or change strategy based on fresh data."),
    ]

    for i, (title, body) in enumerate(mistakes):
        elements.append(MistakeBox(i + 1, title, body))
        elements.append(Spacer(1, 8))

    elements.append(Spacer(1, 8))
    elements.append(Paragraph("BONUS MISTAKE", ST["label"]))
    elements.append(Spacer(1, 4))

    bonus_data = [[
        Paragraph("Not Tracking Your Numbers", ParagraphStyle(
            "bt", fontName="Manrope-Bold", fontSize=11, textColor=NAVY)),
        Paragraph(
            "The creators who earn the most treat their analytics like a business dashboard. "
            "Know your average RPM, qualified view rate, best content types, and audience geography split. "
            "Check TikTok Studio weekly. If you\u2019re not measuring, you\u2019re guessing.",
            ST["body_sm"]
        )
    ]]
    bonus_t = Table(bonus_data, colWidths=[1.8 * inch, CONTENT_W - 2 * inch])
    bonus_t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ORANGE_LIGHT),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEAFTER", (0, 0), (0, -1), 2, ORANGE),
        ("BOX", (0, 0), (-1, -1), 1, ORANGE),
    ]))
    elements.append(bonus_t)

    elements.append(PageBreak())

    # ── Page 7: 30-Day Kickstart Plan ─────────────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(6, "The 30-Day Kickstart Plan"))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "Follow this week by week to go from zero Creator Rewards earnings to a functioning, optimized content system. "
        "Works for any niche. The biggest mistake: trying to go from zero to daily posting overnight. Build gradually.",
        ST["body"]
    ))
    elements.append(Spacer(1, 12))

    weeks = [
        ("1", "Setup — Days 1-7", [
            ("1", "Confirm eligibility. Switch from Business to Personal if needed"),
            ("2", "Set up TikTok Studio. Learn Analytics: follower activity, territories, metrics"),
            ("3", "Use Creator Search Insights. Write 10 questions your audience searches"),
            ("4", "Study 5 high-performing creators. Note video length, hook style, pacing"),
            ("5", "Plan your first 5 videos. Outline hook, content, and payoff for each"),
            ("6", "Test your recording setup. Film a practice video. Check lighting and audio"),
            ("7", "Rest. Review Week 2 plan. Research any gear gaps. No spend required yet"),
        ]),
        ("2", "Build — Days 8-14", [
            ("8", "Post Video 1 (60+ seconds). Focus on answer clarity and tight pacing"),
            ("9", "Review analytics. Check where viewers drop off. Adjust hook for Video 2"),
            ("10", "Post Video 2. Try a different hook style than Video 1"),
            ("11", "Engage with comments on both videos. Reply to every comment"),
            ("12", "Post Video 3. Experiment with a pattern interrupt at the 15-second mark"),
            ("13", "Post Video 4. Review what\u2019s working by completion rate"),
            ("14", "Post Video 5. Write down what you\u2019ve learned about your audience"),
        ]),
        ("3", "Optimize — Days 15-21", [
            ("15", "Pull Week 2 analytics. Identify best video by completion rate (not views)"),
            ("16", "Plan 5 new videos using what you learned. Double down on what worked"),
            ("17", "Post Video 6 with your optimized approach"),
            ("18", "Check your qualified view percentage. If under 40%, audit geography and length"),
            ("19", "Post Video 7. Focus on pushing watch time past 60 seconds"),
            ("20", "Post Video 8. Add a save-worthy element: checklist, steps, resource list"),
            ("21", "Post Video 9. Review RPM in dashboard for earliest videos"),
        ]),
        ("4", "Scale — Days 22-30", [
            ("22", "Post Video 10. Time yourself from idea to published video"),
            ("23", "Batch-plan next 10 topics from Search Insights + best-performing themes"),
            ("24", "Post Video 11. Experiment with 2-3 minute content if niche supports it"),
            ("25", "Post Video 12. Try video reply to a top comment from an earlier video"),
            ("26-27", "Posts 13-14. Review cumulative earnings and RPM by topic"),
            ("28", "Post Video 15. Set content calendar for next 30 days"),
            ("29-30", "Take stock. Calculate average RPM. Identify top 3 videos by earnings"),
        ]),
    ]

    for week_num, theme, days in weeks:
        elements.append(WeekBlock(week_num, theme, days))
        elements.append(Spacer(1, 8))

    elements.append(PageBreak())

    # ── Page 8: Resources + CTA ───────────────────────────────────────────────
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(SectionHeader(7, "Resources & Deep Dives"))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "Everything in this cheat sheet goes deeper on the TCP website. Find the right guide for where you are.",
        ST["body"]
    ))
    elements.append(Spacer(1, 12))

    resource_sections = [
        ("GETTING STARTED", [
            "Creativity Program Complete Guide 2026 — /guides/creativity-program-complete-guide-2026",
            "Eligibility Requirements — /guides/eligibility-requirements",
            "How to Join — /guides/how-to-join-creativity-program",
            "Program Not Showing? — /guides/creativity-program-not-showing",
            "Convert Business to Personal — /guides/convert-business-to-personal",
        ]),
        ("EARNING MORE", [
            "How to Optimize Your RPM — /guides/optimize-rpm",
            "Maximize Qualified Views — /guides/maximize-qualified-views",
            "No Qualified Views? Fix It — /guides/no-qualified-views",
            "Additional Reward Criteria 2026 — /guides/additional-reward-criteria-2026",
            "Payment Schedule — /guides/tiktok-creator-rewards-payment-schedule",
        ]),
        ("GROWING YOUR CONTENT", [
            "TikTok Hook Formulas — /guides/tiktok-hook-formulas",
            "How to Increase Watch Time — /guides/increase-watch-time-tiktok",
            "Best Posting Schedule — /guides/best-posting-schedule",
            "TikTok Viral Formula — /guides/tiktok-viral-formula",
            "Growing to 10K Followers — /guides/grow-5k-to-10k",
        ]),
        ("CALCULATORS", [
            "Earnings Calculator — /calculators/earnings-calculator",
            "RPM by Country Calculator — /calculators/rpm-by-country",
        ]),
        ("NICHE GUIDES", [
            "Educators, Fitness, Beauty, Comedy, Musicians, Travel",
            "All at tiktokcreativityprogram.com/guides",
        ]),
    ]

    res_col1 = resource_sections[:3]
    res_col2 = resource_sections[3:]

    def make_res_col(sections):
        items = []
        for title, links in sections:
            items.append(Paragraph(title, ST["label"]))
            items.append(Spacer(1, 3))
            for link in links:
                items.append(Paragraph(f"\u2192  {link}", ST["body_sm"]))
                items.append(Spacer(1, 2))
            items.append(Spacer(1, 8))
        return items

    res_data = [[make_res_col(res_col1), make_res_col(res_col2)]]
    res_table = Table(res_data, colWidths=[CONTENT_W / 2 - 6, CONTENT_W / 2 - 6])
    res_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("LINEAFTER", (0, 0), (0, -1), 0.5, GRAY_LIGHT),
    ]))
    elements.append(res_table)

    elements.append(Spacer(1, 16))
    elements.append(OrangeRule())
    elements.append(Spacer(1, 16))

    # CTA Box
    cta_data = [[
        Paragraph(
            "Ready to go deeper?",
            ParagraphStyle("cta_h", fontName="Manrope-ExtraBold", fontSize=18,
                           textColor=NAVY, alignment=TA_CENTER)
        )
    ], [
        Paragraph(
            "Visit tiktokcreativityprogram.com for the full guide library, interactive calculators, "
            "and the most complete TikTok Creator Rewards resource on the internet.",
            ParagraphStyle("cta_b", fontName="Manrope-SemiBold", fontSize=11,
                           textColor=GRAY_TEXT, alignment=TA_CENTER, leading=16)
        )
    ], [
        Paragraph(
            "tiktokcreativityprogram.com",
            ParagraphStyle("cta_url", fontName="Manrope-ExtraBold", fontSize=14,
                           textColor=ORANGE, alignment=TA_CENTER)
        )
    ]]
    cta_table = Table(cta_data, colWidths=[CONTENT_W])
    cta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("LEFTPADDING", (0, 0), (-1, -1), 20),
        ("RIGHTPADDING", (0, 0), (-1, -1), 20),
        ("ROUNDEDCORNERS", [8, 8, 8, 8]),
    ]))
    elements.append(cta_table)

    elements.append(Spacer(1, 12))
    elements.append(Paragraph(
        "This cheat sheet is provided for informational purposes. Earnings figures are community-reported estimates and not guaranteed. "
        "TikTok does not publish official RPM rates. Your results will vary. Copyright 2026 tiktokcreativityprogram.com",
        ST["footer_note"]
    ))

    # ── Build Document ─────────────────────────────────────────────────────────
    page_num_container = [2]  # cover is page 1, content starts at 2

    def on_first_page(c, doc):
        make_cover_page_cheatsheet(c, doc)

    def on_later_pages(c, doc):
        draw_page_footer(c, page_num_container[0])
        page_num_container[0] += 1

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.65 * inch,
        bottomMargin=0.7 * inch,
        title="The TikTok Creator Rewards Cheat Sheet",
        author="TikTok Creativity Program",
        subject="TikTok Creator Rewards Guide 2026",
    )

    doc.build(elements, onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(f"Cheat sheet PDF saved: {output_path}")


# ─── PDF 2: Eligibility Checklist ─────────────────────────────────────────────

def build_eligibility_checklist_pdf(output_path):
    register_fonts()
    ST = get_styles()

    elements = []
    page_num_container = [2]

    # ── Page 2: The 5 Requirements ────────────────────────────────────────────
    elements.append(Spacer(1, 0.15 * inch))
    elements.append(Paragraph("THE 5 REQUIREMENTS", ST["label"]))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(
        "Check every box before you apply. Miss one and you get rejected.",
        ParagraphStyle("intro", fontName="Manrope-SemiBold", fontSize=11, textColor=NAVY, leading=15)
    ))
    elements.append(Spacer(1, 14))

    reqs = [
        {
            "num": "1",
            "req": "Age 18+ (19+ in South Korea)",
            "verify": "TikTok uses the birthdate you entered when you created your account.",
            "if_not": "No workaround exists. Wait until you qualify.",
        },
        {
            "num": "2",
            "req": "10,000+ Followers",
            "verify": "Profile page shows your count. TikTok checks at the moment you submit.",
            "if_not": "Focus on organic growth. See: tiktokcreativityprogram.com/guides/get-10000-followers-tiktok-2026",
        },
        {
            "num": "3",
            "req": "100,000+ Views in Last 30 Days",
            "verify": "Creator tools > Analytics > Content. Total views for past 30 days (not lifetime).",
            "if_not": "Views from TikTok Promote do NOT count. Apply at 150K-200K for a buffer.",
        },
        {
            "num": "4",
            "req": "Personal Account (not Business)",
            "verify": "Settings and Privacy > Account > Account type. If it says Business, you need to switch.",
            "if_not": "Switch > wait 30 days (no shortcut) > then apply. Most common silent rejection.",
        },
        {
            "num": "5",
            "req": "Eligible Country",
            "verify": "Settings and Privacy > Account to confirm your account region.",
            "if_not": "No workaround, no waitlist. See: tiktokcreativityprogram.com/guides/monetization-outside-us",
        },
    ]

    countries_data = [
        ["United States", "United Kingdom"],
        ["Germany", "France"],
        ["Japan", "South Korea"],
        ["Brazil", "Mexico"],
    ]

    for r in reqs:
        # Requirement block
        req_header = Table([[
            Paragraph(r["num"], ParagraphStyle(
                "rn", fontName="Manrope-ExtraBold", fontSize=18, textColor=WHITE)),
            Paragraph(r["req"], ParagraphStyle(
                "rt", fontName="Manrope-Bold", fontSize=13, textColor=WHITE, leading=18)),
            Paragraph("\u2610", ParagraphStyle(
                "cb", fontName="Manrope", fontSize=24, textColor=ORANGE)),
        ]], colWidths=[0.4 * inch, CONTENT_W - 0.85 * inch, 0.4 * inch])
        req_header.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), NAVY),
            ("TOPPADDING", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        elements.append(req_header)

        # Body rows
        body_data = [
            [Paragraph("HOW TO VERIFY", ST["label"]),
             Paragraph(r["verify"], ST["body_sm"])],
            [Paragraph("IF YOU\u2019RE NOT THERE YET", ParagraphStyle(
                "ifn", fontName="Manrope-Bold", fontSize=9, textColor=RED)),
             Paragraph(r["if_not"], ST["body_sm"])],
        ]

        # Special case: add country table for req 5
        if r["num"] == "5":
            ct = Table(countries_data, colWidths=[CONTENT_W / 3, CONTENT_W / 3])
            ct.setStyle(TableStyle([
                ("FONTNAME", (0, 0), (-1, -1), "Manrope-SemiBold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("TEXTCOLOR", (0, 0), (-1, -1), NAVY),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ]))
            body_data.insert(1, [Paragraph("ELIGIBLE COUNTRIES", ST["label"]), ct])

        body_table = Table(body_data, colWidths=[1.5 * inch, CONTENT_W - 1.6 * inch])
        body_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), WARM_WHITE),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LINEAFTER", (0, 0), (0, -1), 1, ORANGE),
            ("LINEBELOW", (0, 0), (-1, -2), 0.5, GRAY_LIGHT),
        ]))
        elements.append(body_table)
        elements.append(Spacer(1, 10))

    elements.append(PageBreak())

    # ── Page 3: Red Flags + How to Apply ─────────────────────────────────────
    elements.append(Spacer(1, 0.15 * inch))
    elements.append(Paragraph("BEFORE YOU HIT SUBMIT: CONTENT CHECK", ST["label"]))
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(
        "Even if you pass all 5 requirements, TikTok reviews your recent content. These will get you rejected:",
        ST["body"]
    ))
    elements.append(Spacer(1, 10))

    red_flag_header = ["Red Flag", "Fix It"]
    red_flags = [
        red_flag_header,
        ["Business account still active", "Switch to personal, wait 30 days"],
        ["Mostly Duets and Stitches", "Post 5-10 original 1+ minute videos first"],
        ["Videos under 60 seconds", "Build a library of longer content before applying"],
        ["Repurposed content with watermarks", "Remove watermarked content. Post originals only"],
        ["Contact info in your bio", "Remove personal/business contact details before applying"],
        ["Clickbait in recent library", "Clean up misleading titles and thumbnails"],
        ["Community Guidelines violations", "Address outstanding strikes. Appeal old ones if applicable"],
        ["Low-quality formats (slideshows)", "Replace with original video content"],
    ]
    rf_col_ws = [2.6 * inch, CONTENT_W - 2.75 * inch]
    rf_table = style_data_table(red_flags, col_widths=rf_col_ws,
                                header_bg=colors.HexColor("#991B1B"),
                                header_fg=WHITE,
                                row_alt=colors.HexColor("#FEF2F2"))
    elements.append(rf_table)

    elements.append(Spacer(1, 18))
    elements.append(OrangeRule())
    elements.append(Spacer(1, 18))

    # How to Apply
    elements.append(Paragraph("HOW TO APPLY", ST["label"]))
    elements.append(Spacer(1, 8))

    apply_steps = [
        ("1", "Open TikTok", "Go to Profile > Menu > Creator tools"),
        ("2", "Select Program", "Select Creator Rewards Program from the list"),
        ("3", "Review Checklist", "Review the in-app eligibility checklist"),
        ("4", "Submit", "Submit your application"),
        ("5", "Wait", "Wait 1-3 business days for approval"),
    ]

    for num, title, desc in apply_steps:
        step_data = [[
            Paragraph(num, ParagraphStyle(
                "sn", fontName="Manrope-ExtraBold", fontSize=18, textColor=NAVY, alignment=TA_CENTER)),
            [
                Paragraph(title, ParagraphStyle(
                    "st", fontName="Manrope-Bold", fontSize=12, textColor=NAVY)),
                Paragraph(desc, ST["body_sm"]),
            ]
        ]]
        step_t = Table(step_data, colWidths=[0.55 * inch, CONTENT_W - 0.7 * inch])
        step_t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), ORANGE),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ROWBACKGROUNDS", (1, 0), (1, -1), [WARM_WHITE]),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
        ]))
        elements.append(step_t)
        elements.append(Spacer(1, 4))

    elements.append(Spacer(1, 12))
    elements.append(Paragraph(
        "After approval, only NEW videos earn. Older videos are permanently excluded. "
        "Post an original 1+ minute video on the day you're approved.",
        ParagraphStyle("note", fontName="Manrope-SemiBold", fontSize=10,
                       textColor=colors.HexColor("#92400E"),
                       backColor=colors.HexColor("#FEF3C7"),
                       leading=14, leftIndent=10, rightIndent=10,
                       borderPad=8)
    ))

    elements.append(Spacer(1, 12))

    # Got Rejected?
    rejected_data = [[
        Paragraph("VIDEO APPEAL", ST["label"]),
        Paragraph("ACCOUNT APPEAL", ST["label"]),
    ], [
        Paragraph(
            "You have 80 days. Go to Creator Rewards dashboard, find the video, tap Appeal. "
            "Reviewed in about 3 business days.",
            ST["body_sm"]
        ),
        Paragraph(
            "You have 30 days from the rejection notification. Tap Appeal inside the notification. "
            "If rejection is for missing metrics, fix the issue and reapply — appealing won\u2019t help.",
            ST["body_sm"]
        ),
    ]]
    rejected_table = Table(rejected_data, colWidths=[CONTENT_W / 2 - 6, CONTENT_W / 2 - 6])
    rejected_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1A2035")),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEAFTER", (0, 0), (0, -1), 1, ORANGE),
        ("BOX", (0, 0), (-1, -1), 1, NAVY),
        ("BACKGROUND", (0, 1), (-1, 1), WARM_WHITE),
    ]))

    elements.append(Paragraph("GOT REJECTED?", ST["label"]))
    elements.append(Spacer(1, 6))
    elements.append(rejected_table)

    elements.append(Spacer(1, 14))
    # Links
    link_data = [[
        Paragraph("\u2192 Full eligibility guide:", ST["body_sm"]),
        Paragraph("tiktokcreativityprogram.com/guides/eligibility-requirements", ST["link"]),
    ], [
        Paragraph("\u2192 Appeal walkthrough:", ST["body_sm"]),
        Paragraph("tiktokcreativityprogram.com/guides/appeal-rejection", ST["link"]),
    ], [
        Paragraph("\u2192 Program not showing up?", ST["body_sm"]),
        Paragraph("tiktokcreativityprogram.com/guides/creativity-program-not-showing", ST["link"]),
    ]]
    link_t = Table(link_data, colWidths=[1.6 * inch, CONTENT_W - 1.8 * inch])
    link_t.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    elements.append(link_t)

    # ── Build Document ─────────────────────────────────────────────────────────
    def on_first_page(c, doc):
        make_cover_page_checklist(c, doc)

    def on_later_pages(c, doc):
        draw_checklist_footer(c, page_num_container[0])
        page_num_container[0] += 1

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.65 * inch,
        bottomMargin=0.7 * inch,
        title="TikTok Creator Rewards Eligibility Checklist",
        author="TikTok Creativity Program",
        subject="Creator Rewards Eligibility Checklist 2026",
    )

    doc.build(elements, onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(f"Eligibility checklist PDF saved: {output_path}")


# ─── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    cheat_sheet_path = "/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program/public/downloads/tcp-rpm-cheat-sheet-2026.pdf"
    checklist_path = "/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program/public/downloads/tcp-eligibility-checklist-2026.pdf"

    print("Building TCP Lead Magnet PDFs...")
    print("=" * 60)

    print("\n[1/2] Building RPM Cheat Sheet...")
    build_cheat_sheet_pdf(cheat_sheet_path)

    print("\n[2/2] Building Eligibility Checklist...")
    build_eligibility_checklist_pdf(checklist_path)

    print("\n" + "=" * 60)
    print("Done. Both PDFs generated successfully.")
