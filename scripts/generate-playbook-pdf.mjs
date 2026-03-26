#!/usr/bin/env node
/**
 * TCP Creator Rewards Playbook PDF Generator
 *
 * Converts content/playbook-full-content.md into a premium branded PDF
 * using Puppeteer for HTML-to-PDF rendering with proper print CSS.
 *
 * Usage: node scripts/generate-playbook-pdf.mjs
 * Output: public/downloads/tcp-creator-rewards-playbook-2026.pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Brand Colors ───────────────────────────────────────────────────────────
const NAVY = '#0F172A';
const ORANGE = '#F4A261';
const WARM_WHITE = '#FFFCF8';
const LIGHT_WARM = '#F9F5F0';
const WARM_GRAY_BORDER = '#E0D8D0';
const MUTED_TEXT = '#6B7280';
const BODY_TEXT = '#1E293B';

// ─── Read markdown content ──────────────────────────────────────────────────
const mdPath = path.join(ROOT, 'content', 'playbook-full-content.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

// ─── Image paths (base64-encoded for embedded HTML) ─────────────────────────
function imageToBase64(relPath) {
  const fullPath = path.join(ROOT, 'public', relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: Image not found: ${fullPath}`);
    return '';
  }
  const ext = path.extname(fullPath).slice(1).replace('jpg', 'jpeg');
  const mime = ext === 'webp' ? 'image/webp' : ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
  const data = fs.readFileSync(fullPath);
  return `data:${mime};base64,${data.toString('base64')}`;
}

const logoBase64 = imageToBase64('images/brand/tcp-logo.png');
const heroBase64 = imageToBase64('images/brand/landpress-marketing-hero.png');
const marketing2Base64 = imageToBase64('images/brand/landpress-marketing-2.png');
const marketing3Base64 = imageToBase64('images/brand/landpress-marketing-3.png');
const marketing4Base64 = imageToBase64('images/brand/landpress-marketing-4.png');

// ─── Markdown to HTML conversion ────────────────────────────────────────────

function parseSections(md) {
  // Split by "# SECTION" headings
  const lines = md.split('\n');
  const sections = [];
  let currentSection = null;
  let coverContent = [];
  let inCover = true;

  for (const line of lines) {
    if (line.match(/^# SECTION \d+/)) {
      inCover = false;
      if (currentSection) sections.push(currentSection);
      const match = line.match(/^# SECTION (\d+):\s*(.+)/);
      currentSection = {
        number: match ? match[1] : '',
        title: match ? match[2].trim() : line.replace(/^# /, ''),
        lines: []
      };
    } else if (inCover) {
      coverContent.push(line);
    } else if (currentSection) {
      currentSection.lines.push(line);
    }
  }
  if (currentSection) sections.push(currentSection);
  return { coverContent, sections };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function convertInlineMarkdown(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  // Links - convert tiktokcreativityprogram.com references
  text = text.replace(
    /tiktokcreativityprogram\.com(\/[^\s,.)]*)?/g,
    (match) => `<span class="link-text">${match}</span>`
  );
  return text;
}

function convertBlockToHtml(lines) {
  let html = '';
  let i = 0;
  let inTable = false;
  let tableRows = [];
  let inBlockquote = false;
  let inList = false;
  let listType = 'ul';
  let listItems = [];

  function flushList() {
    if (listItems.length > 0) {
      html += `<${listType} class="content-list">`;
      for (const item of listItems) {
        html += `<li>${convertInlineMarkdown(item)}</li>`;
      }
      html += `</${listType}>`;
      listItems = [];
      inList = false;
    }
  }

  function flushTable() {
    if (tableRows.length > 0) {
      // Check if this is a fillable worksheet (has underscores)
      const isFillable = tableRows.some(r => r.some(c => c.includes('___')));
      const tableClass = isFillable ? 'worksheet-table' : 'data-table';

      html += `<div class="table-wrapper"><table class="${tableClass}">`;

      // First row is header
      html += '<thead><tr>';
      for (const cell of tableRows[0]) {
        html += `<th>${convertInlineMarkdown(cell.trim())}</th>`;
      }
      html += '</tr></thead><tbody>';

      // Skip separator row (index 1), render rest
      for (let r = 2; r < tableRows.length; r++) {
        const isHighlight = tableRows[r].some(c => c.includes('1,000,000') || c.includes('TOTAL'));
        const isFillableRow = tableRows[r].some(c => c.includes('___'));
        const rowClass = isFillableRow ? 'fillable-row' : (r % 2 === 0 ? 'alt-row' : '');
        html += `<tr class="${rowClass} ${isHighlight ? 'highlight-row' : ''}">`;
        for (const cell of tableRows[r]) {
          const cellContent = cell.trim().replace(/___+/g, '<span class="fill-blank"></span>');
          html += `<td>${convertInlineMarkdown(cellContent)}</td>`;
        }
        html += '</tr>';
      }
      html += '</tbody></table></div>';
      tableRows = [];
      inTable = false;
    }
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (trimmed === '') {
      flushList();
      if (inBlockquote) {
        html += '</blockquote>';
        inBlockquote = false;
      }
      i++;
      continue;
    }

    // Horizontal rule
    if (trimmed === '---') {
      flushList();
      flushTable();
      i++;
      continue;
    }

    // Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      // Check if separator row
      const isSeparator = trimmed.replace(/[|\s-:]/g, '') === '';
      const cells = trimmed.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(cells);
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Code block (matrix diagram)
    if (trimmed.startsWith('```')) {
      flushList();
      i++;
      let codeContent = '';
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeContent += escapeHtml(lines[i]) + '\n';
        i++;
      }
      html += `<div class="matrix-diagram"><pre>${codeContent}</pre></div>`;
      i++; // skip closing ```
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      if (!inBlockquote) {
        html += '<blockquote class="formula-block">';
        inBlockquote = true;
      }
      html += `<p>${convertInlineMarkdown(trimmed.slice(2))}</p>`;
      i++;
      continue;
    }

    // H2 heading
    if (trimmed.startsWith('## ')) {
      flushList();
      flushTable();
      const text = trimmed.slice(3);
      html += `<h2>${convertInlineMarkdown(text)}</h2>`;
      i++;
      continue;
    }

    // H3 heading
    if (trimmed.startsWith('### ')) {
      flushList();
      flushTable();
      const text = trimmed.slice(4);
      html += `<h3>${convertInlineMarkdown(text)}</h3>`;
      i++;
      continue;
    }

    // Checkbox items
    if (trimmed.startsWith('[ ]') || trimmed.startsWith('[x]') || trimmed.startsWith('[X]')) {
      flushList();
      const checked = trimmed.startsWith('[x]') || trimmed.startsWith('[X]');
      const text = trimmed.slice(3).trim();
      html += `<div class="checkbox-item"><span class="checkbox ${checked ? 'checked' : ''}">${checked ? '&#10003;' : ''}</span><span>${convertInlineMarkdown(text)}</span></div>`;
      i++;
      continue;
    }

    // Checklist with - [ ]
    if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]') || trimmed.startsWith('- [X]')) {
      flushList();
      const checked = trimmed.startsWith('- [x]') || trimmed.startsWith('- [X]');
      const text = trimmed.slice(5).trim();
      html += `<div class="checkbox-item"><span class="checkbox ${checked ? 'checked' : ''}">${checked ? '&#10003;' : ''}</span><span>${convertInlineMarkdown(text)}</span></div>`;
      i++;
      continue;
    }

    // Ordered list
    if (trimmed.match(/^\d+\.\s/)) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      i++;
      continue;
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(trimmed.slice(2));
      i++;
      continue;
    }

    // Fill-in lines (underscores)
    if (trimmed.match(/^_+$/)) {
      flushList();
      html += '<div class="fill-line"></div>';
      i++;
      continue;
    }

    // Lines with fill-in fields
    if (trimmed.includes('___')) {
      flushList();
      const converted = trimmed.replace(/___+/g, '<span class="fill-blank-inline"></span>');
      html += `<p class="fill-field">${convertInlineMarkdown(converted)}</p>`;
      i++;
      continue;
    }

    // Regular paragraph
    flushList();
    html += `<p>${convertInlineMarkdown(trimmed)}</p>`;
    i++;
  }

  flushList();
  flushTable();
  if (inBlockquote) html += '</blockquote>';

  return html;
}

// ─── Build full HTML ────────────────────────────────────────────────────────

const { coverContent, sections } = parseSections(mdContent);

// Extract cover info
const coverTitle = 'THE TIKTOK CREATOR REWARDS PLAYBOOK';
const coverSubtitle = 'Your step-by-step system for turning TikTok content into consistent monthly income.';

// Build "What is inside" list from Section 1 content
const tocSection = sections.find(s => s.number === '1');
const tocItems = [];
if (tocSection) {
  for (const line of tocSection.lines) {
    const match = line.match(/^\d+\.\s+(.+)/);
    if (match) tocItems.push(match[1]);
  }
}

// Build content sections (skip section 1 as it's the cover/TOC)
const contentSections = sections.filter(s => s.number !== '1');

function buildSectionHtml(section) {
  let html = '';

  // Section banner
  html += `
    <div class="section-banner">
      <div class="section-number">SECTION ${section.number}</div>
      <div class="section-title">${escapeHtml(section.title)}</div>
    </div>
  `;

  // Image placement per Vale's brief
  const sectionNum = parseInt(section.number);

  // Section content
  html += '<div class="section-content">';

  // Add contextual images per Vale's placement map
  if (sectionNum === 2) {
    html += `<div class="section-image-float right"><img src="${heroBase64}" alt="Eligibility checklist" /></div>`;
  }

  html += convertBlockToHtml(section.lines);

  // Images placed after content per brief
  if (sectionNum === 5) {
    html += `<div class="section-image-center"><img src="${marketing2Base64}" alt="Analytics dashboard" /></div>`;
  }
  if (sectionNum === 9) {
    html += `<div class="section-image-center"><img src="${marketing3Base64}" alt="Team collaboration" /></div>`;
  }
  if (sectionNum === 11) {
    html += `<div class="section-image-center"><img src="${marketing4Base64}" alt="Mobile commerce" /></div>`;
  }

  html += '</div>';
  return html;
}

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The TikTok Creator Rewards Playbook - 2026 Edition</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

  /* ─── Reset & Base ──────────────────────────────────────────────── */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --navy: ${NAVY};
    --orange: ${ORANGE};
    --warm-white: ${WARM_WHITE};
    --light-warm: ${LIGHT_WARM};
    --warm-gray: ${WARM_GRAY_BORDER};
    --muted: ${MUTED_TEXT};
    --body-text: ${BODY_TEXT};
  }

  body {
    font-family: 'Manrope', system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: var(--body-text);
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ─── Page Rules ────────────────────────────────────────────────── */
  @page {
    size: letter;
    margin: 0;
  }

  @page :first {
    margin: 0;
  }

  @page content {
    margin: 60pt 50pt 70pt 50pt;
  }

  /* ─── Cover Page ────────────────────────────────────────────────── */
  .cover-page {
    page: cover;
    width: 100%;
    height: 100vh;
    background: var(--navy);
    color: white;
    display: flex;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
  }

  .cover-left {
    width: 60%;
    padding: 80pt 50pt 60pt 60pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .cover-logo {
    width: 180px;
    margin-bottom: 40pt;
  }

  .cover-logo img {
    width: 100%;
    height: auto;
  }

  .cover-edition {
    font-size: 10pt;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16pt;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16pt;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 13pt;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255,255,255,0.8);
    margin-bottom: 36pt;
    max-width: 380px;
  }

  .cover-url {
    font-size: 10pt;
    font-weight: 600;
    color: var(--orange);
    letter-spacing: 0.5px;
  }

  .cover-right {
    width: 40%;
    position: relative;
  }

  .cover-accent {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--orange);
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 0.12;
  }

  .cover-accent-line {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: var(--orange);
    right: 40%;
  }

  .cover-decoration {
    position: absolute;
    bottom: 80pt;
    right: 50pt;
    width: 160px;
    opacity: 0.15;
  }

  .cover-decoration-circles {
    position: absolute;
    top: 120pt;
    right: 60pt;
  }

  .cover-decoration-circles .circle {
    width: 8px;
    height: 8px;
    background: var(--orange);
    border-radius: 50%;
    display: inline-block;
    margin: 4px;
    opacity: 0.4;
  }

  /* ─── TOC Page ──────────────────────────────────────────────────── */
  .toc-page {
    page: content;
    padding: 60pt 50pt;
    page-break-after: always;
    break-after: page;
  }

  .toc-header {
    font-size: 10pt;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 12pt;
  }

  .toc-title {
    font-size: 22pt;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 32pt;
  }

  .toc-list {
    list-style: none;
    counter-reset: toc-counter;
  }

  .toc-list li {
    counter-increment: toc-counter;
    padding: 12pt 0;
    border-bottom: 1px solid var(--warm-gray);
    display: flex;
    align-items: baseline;
    gap: 16pt;
  }

  .toc-list li:last-child {
    border-bottom: none;
  }

  .toc-number {
    font-size: 14pt;
    font-weight: 800;
    color: var(--orange);
    min-width: 28pt;
  }

  .toc-item-title {
    font-size: 11pt;
    font-weight: 600;
    color: var(--navy);
    flex: 1;
  }

  .toc-exclusive {
    font-size: 8pt;
    font-weight: 700;
    color: var(--orange);
    background: rgba(244, 162, 97, 0.1);
    padding: 2pt 8pt;
    border-radius: 3pt;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .toc-note {
    margin-top: 24pt;
    padding: 16pt 20pt;
    background: var(--warm-white);
    border-left: 4px solid var(--orange);
    font-size: 10pt;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ─── Content Pages ─────────────────────────────────────────────── */
  .content-wrapper {
    padding: 0 50pt;
  }

  /* Section Banner */
  .section-banner {
    background: var(--navy);
    color: white;
    padding: 28pt 50pt;
    margin: 0 -50pt;
    page-break-before: always;
    break-before: page;
    margin-bottom: 32pt;
  }

  .section-banner:first-child {
    page-break-before: auto;
  }

  .section-number {
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 8pt;
  }

  .section-title {
    font-size: 22pt;
    font-weight: 800;
    line-height: 1.2;
  }

  .section-content {
    padding: 0 0 24pt 0;
  }

  /* ─── Typography ────────────────────────────────────────────────── */
  h2 {
    font-size: 15pt;
    font-weight: 700;
    color: var(--navy);
    margin: 28pt 0 12pt 0;
    padding-bottom: 6pt;
    border-bottom: 2px solid var(--orange);
    page-break-before: always;
    break-before: page;
    page-break-after: avoid;
    break-after: avoid;
  }

  h3 {
    font-size: 12pt;
    font-weight: 700;
    color: var(--navy);
    margin: 20pt 0 8pt 0;
    page-break-after: avoid;
    break-after: avoid;
  }

  h4 {
    page-break-after: avoid;
    break-after: avoid;
  }

  p {
    margin: 0 0 10pt 0;
    font-size: 10.5pt;
    line-height: 1.65;
    orphans: 3;
    widows: 3;
  }

  strong {
    font-weight: 700;
    color: var(--navy);
  }

  em {
    color: var(--muted);
    font-style: italic;
  }

  code {
    font-family: 'Manrope', monospace;
    font-size: 9.5pt;
    background: var(--light-warm);
    padding: 1pt 4pt;
    border-radius: 2pt;
  }

  .link-text {
    color: var(--orange);
    font-weight: 500;
    font-size: 9.5pt;
  }

  /* ─── Lists ─────────────────────────────────────────────────────── */
  .content-list {
    margin: 8pt 0 14pt 20pt;
    font-size: 10.5pt;
    line-height: 1.6;
  }

  .content-list li {
    margin-bottom: 4pt;
    padding-left: 4pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  ol.content-list {
    list-style: decimal;
  }

  ul.content-list {
    list-style: disc;
  }

  /* ─── Checkbox Items ────────────────────────────────────────────── */
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 10pt;
    margin: 8pt 0;
    padding: 10pt 14pt;
    background: var(--warm-white);
    border-radius: 4pt;
    page-break-inside: avoid;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    min-width: 18px;
    border: 2px solid var(--orange);
    border-radius: 3px;
    font-size: 12px;
    color: var(--orange);
    flex-shrink: 0;
    margin-top: 1pt;
  }

  .checkbox.checked {
    background: var(--orange);
    color: white;
  }

  /* ─── Blockquote / Formula ──────────────────────────────────────── */
  .formula-block {
    background: var(--warm-white);
    border-left: 4px solid var(--orange);
    padding: 16pt 20pt;
    margin: 16pt 0;
    page-break-inside: avoid;
  }

  .formula-block p {
    font-size: 13pt;
    font-weight: 600;
    color: var(--navy);
    margin: 0;
    line-height: 1.5;
  }

  /* ─── Matrix Diagram ────────────────────────────────────────────── */
  .matrix-diagram {
    background: var(--warm-white);
    border: 1px solid var(--warm-gray);
    border-radius: 6pt;
    padding: 20pt;
    margin: 16pt 0;
    page-break-inside: avoid;
  }

  .matrix-diagram pre {
    font-family: 'Manrope', monospace;
    font-size: 9pt;
    line-height: 1.5;
    color: var(--navy);
    white-space: pre;
    text-align: center;
  }

  /* ─── Tables ────────────────────────────────────────────────────── */
  .table-wrapper {
    margin: 16pt 0;
    page-break-inside: avoid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    line-height: 1.4;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Data Tables */
  .data-table thead th {
    background: var(--navy);
    color: white;
    font-weight: 700;
    padding: 10pt 10pt;
    text-align: left;
    font-size: 9pt;
    letter-spacing: 0.3px;
  }

  .data-table thead th:first-child {
    border-radius: 4pt 0 0 0;
  }

  .data-table thead th:last-child {
    border-radius: 0 4pt 0 0;
  }

  .data-table tbody td {
    padding: 8pt 10pt;
    border-bottom: 1px solid var(--warm-gray);
    vertical-align: top;
  }

  .data-table .alt-row td {
    background: var(--light-warm);
  }

  .data-table .highlight-row td {
    background: var(--orange);
    color: var(--navy);
    font-weight: 600;
  }

  /* Worksheet Tables */
  .worksheet-table {
    background: var(--warm-white);
    border-radius: 6pt;
    overflow: hidden;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .worksheet-table thead th {
    background: var(--orange);
    color: var(--navy);
    font-weight: 700;
    padding: 10pt 10pt;
    text-align: left;
    font-size: 9pt;
  }

  .worksheet-table tbody td {
    padding: 10pt 10pt;
    border-bottom: 1px dashed #ccc;
    min-height: 30pt;
    vertical-align: top;
  }

  .worksheet-table .fillable-row td {
    background: white;
    height: 36pt;
  }

  .fill-blank {
    display: inline-block;
    width: 100%;
    min-width: 80pt;
    border-bottom: 1px dashed #ccc;
    height: 16pt;
  }

  /* ─── Fill-in Fields ────────────────────────────────────────────── */
  .fill-field {
    padding: 10pt 16pt;
    background: var(--warm-white);
    border-radius: 4pt;
    margin: 6pt 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .fill-blank-inline {
    display: inline-block;
    min-width: 200pt;
    border-bottom: 2px dashed #ccc;
    height: 14pt;
    vertical-align: bottom;
  }

  .fill-line {
    width: 100%;
    border-bottom: 2px dashed #ccc;
    height: 24pt;
    margin: 4pt 0;
  }

  /* ─── Images ────────────────────────────────────────────────────── */
  .section-image-float {
    margin: 0 0 16pt 24pt;
    float: right;
    width: 35%;
    page-break-inside: avoid;
  }

  .section-image-float.left {
    float: left;
    margin: 0 24pt 16pt 0;
  }

  .section-image-float img,
  .section-image-center img {
    width: 100%;
    height: auto;
    border-radius: 6pt;
  }

  .section-image-center {
    text-align: center;
    margin: 24pt auto;
    max-width: 50%;
    page-break-inside: avoid;
  }

  /* ─── Quick Reference Card ──────────────────────────────────────── */
  .qrc-page {
    background: var(--navy);
    color: white;
    padding: 40pt 50pt;
    page-break-before: always;
    break-before: page;
    min-height: 100vh;
  }

  .qrc-page h2 {
    color: white;
    border-bottom-color: var(--orange);
    font-size: 14pt;
  }

  .qrc-page p {
    color: rgba(255,255,255,0.85);
  }

  .qrc-page strong {
    color: white;
  }

  .qrc-page .checkbox-item {
    background: rgba(255,255,255,0.08);
  }

  .qrc-page .checkbox {
    border-color: var(--orange);
  }

  .qrc-page .content-list {
    color: rgba(255,255,255,0.85);
  }

  .qrc-page .content-list li {
    color: rgba(255,255,255,0.85);
  }

  .qrc-page .data-table thead th {
    background: var(--orange);
    color: var(--navy);
  }

  .qrc-page .data-table tbody td {
    color: rgba(255,255,255,0.85);
    border-bottom-color: rgba(255,255,255,0.1);
  }

  .qrc-page .data-table .alt-row td {
    background: rgba(255,255,255,0.05);
  }

  .qrc-page .worksheet-table tbody td {
    color: rgba(255,255,255,0.85);
    border-bottom-color: rgba(255,255,255,0.15);
  }

  .qrc-page .fill-blank-inline {
    border-bottom-color: rgba(255,255,255,0.3);
  }

  .qrc-page .link-text {
    color: var(--orange);
  }

  /* ─── Back Cover ────────────────────────────────────────────────── */
  .back-cover {
    page-break-before: always;
    break-before: page;
    width: 100%;
    height: 100vh;
    background: var(--navy);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
  }

  .back-cover-logo {
    width: 200px;
    margin-bottom: 32pt;
  }

  .back-cover-logo img {
    width: 100%;
    height: auto;
  }

  .back-cover-tagline {
    font-size: 14pt;
    font-weight: 300;
    color: rgba(255,255,255,0.6);
    margin-bottom: 12pt;
  }

  .back-cover-url {
    font-size: 14pt;
    font-weight: 700;
    color: var(--orange);
    letter-spacing: 0.5px;
  }

  .back-cover-copyright {
    position: absolute;
    bottom: 40pt;
    font-size: 8pt;
    color: rgba(255,255,255,0.35);
  }

  .back-cover-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--orange);
  }

  /* ─── Page Footer (added via Puppeteer headerTemplate/footerTemplate) ─── */

  /* ─── Utility ───────────────────────────────────────────────────── */
  .clearfix::after {
    content: '';
    display: table;
    clear: both;
  }

  .page-break {
    page-break-before: always;
    break-before: page;
  }

  /* Suppress page break on first h2 right after a section banner */
  .section-content > h2:first-child {
    page-break-before: auto;
    break-before: auto;
  }

  /* Orange divider strip */
  .orange-divider {
    width: calc(100% + 100pt);
    margin: 24pt -50pt;
    height: 3pt;
    background: var(--orange);
  }

</style>
</head>
<body>

<!-- ═══════════════════════════════════════════════════════════════════════════
     COVER PAGE
     ═══════════════════════════════════════════════════════════════════════ -->
<div class="cover-page">
  <div class="cover-left">
    <div class="cover-logo">
      <img src="${logoBase64}" alt="TCP Logo" />
    </div>
    <div class="cover-edition">2026 EDITION</div>
    <div class="cover-title">THE TIKTOK<br>CREATOR REWARDS<br>PLAYBOOK</div>
    <div class="cover-subtitle">${coverSubtitle}</div>
    <div class="cover-url">tiktokcreativityprogram.com</div>
  </div>
  <div class="cover-right">
    <div class="cover-accent"></div>
    <div class="cover-accent-line"></div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════════════
     TABLE OF CONTENTS
     ═══════════════════════════════════════════════════════════════════════ -->
<div class="toc-page">
  <div class="toc-header">INSIDE THIS PLAYBOOK</div>
  <div class="toc-title">What You Will Learn</div>
  <ol class="toc-list">
    ${tocItems.map((item, idx) => {
      const isExclusive = item.includes('EXCLUSIVE');
      const cleanTitle = item.replace(/\s*\(EXCLUSIVE\)\s*/g, '').replace(/\s*--\s*/g, ' -- ');
      return `
        <li>
          <span class="toc-number">${String(idx + 1).padStart(2, '0')}</span>
          <span class="toc-item-title">${escapeHtml(cleanTitle)}</span>
          ${isExclusive ? '<span class="toc-exclusive">Exclusive</span>' : ''}
        </li>
      `;
    }).join('')}
  </ol>
  <div class="toc-note">
    Items marked <strong>EXCLUSIVE</strong> are not available on the website. They are only in this playbook.
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════════════
     CONTENT SECTIONS
     ═══════════════════════════════════════════════════════════════════════ -->
<div class="content-wrapper">
${contentSections.map((section, idx) => {
  // Section 12 (Quick Reference Card) gets special dark treatment
  if (section.number === '12') {
    return `
      <div class="qrc-page">
        <div class="section-number" style="color:var(--orange);letter-spacing:4px;font-size:9pt;font-weight:700;margin-bottom:8pt;">SECTION 12</div>
        <div style="font-size:22pt;font-weight:800;color:white;margin-bottom:24pt;">QUICK REFERENCE CARD</div>
        <p style="color:rgba(255,255,255,0.6);font-size:10pt;margin-bottom:24pt;">Print this page. Pin it next to your desk. Check it before every post.</p>
        ${convertBlockToHtml(section.lines)}
      </div>
    `;
  }
  return `<div class="clearfix">${buildSectionHtml(section)}</div>`;
}).join('\n')}
</div>

<!-- ═══════════════════════════════════════════════════════════════════════════
     BACK COVER
     ═══════════════════════════════════════════════════════════════════════ -->
<div class="back-cover">
  <div class="back-cover-accent"></div>
  <div class="back-cover-logo">
    <img src="${logoBase64}" alt="TCP Logo" />
  </div>
  <div class="back-cover-tagline">The most complete TikTok Creator Rewards resource on the internet.</div>
  <div class="back-cover-url">tiktokcreativityprogram.com</div>
  <div class="back-cover-copyright">
    Copyright 2026 tiktokcreativityprogram.com. All rights reserved.<br>
    This playbook is provided for informational purposes. Earnings figures are community-reported estimates and not guaranteed.
  </div>
</div>

</body>
</html>`;

// ─── Generate PDF ───────────────────────────────────────────────────────────

async function generatePdf() {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set content
  await page.setContent(fullHtml, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 2000));

  const outputPath = path.join(ROOT, 'public', 'downloads', 'tcp-creator-rewards-playbook-2026.pdf');

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%;font-family:Manrope,system-ui,sans-serif;font-size:8px;display:flex;justify-content:space-between;align-items:center;padding:0 50px;color:#6B7280;">
        <span>tiktokcreativityprogram.com</span>
        <span style="display:flex;align-items:center;gap:6px;">
          <img src="${logoBase64}" style="height:12px;width:auto;opacity:0.5;" />
          <span class="pageNumber"></span>
        </span>
      </div>
    `,
    margin: {
      top: '40px',
      bottom: '60px',
      left: '0',
      right: '0'
    },
    preferCSSPageSize: false,
  });

  console.log(`PDF generated: ${outputPath}`);

  // Get file size
  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`File size: ${sizeMB} MB`);

  await browser.close();
  console.log('Done.');
}

generatePdf().catch(err => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
