// R2-R8: ComparisonTable per BRAND.md v2.0
// Built from vaib215/pricing-table as structural reference
// Source: https://21st.dev/components/vaib215/pricing-table

import React from 'react'
import { Check, X, Minus } from 'lucide-react'

export type CellValue = string | boolean | null | 'partial'

type ComparisonTableRow = {
  cells: CellValue[]
  isWinner?: boolean
}

type ComparisonTableProps = {
  columns: string[]
  rows: ComparisonTableRow[] | Array<string[]>
  caption?: string
  winnerIndex?: number
}

function renderCell(value: CellValue, colIndex: number) {
  if (value === true) {
    // R6: Check icon in green circle
    return (
      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#DCFCE7]">
        <Check className="h-3 w-3 text-[#12B76A]" aria-label="Yes" />
      </span>
    )
  }
  if (value === false) {
    // R7: X icon in red circle
    return (
      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#FEF2F2]">
        <X className="h-3 w-3 text-[#F04438]" aria-label="No" />
      </span>
    )
  }
  if (value === 'partial') {
    return <Minus className="h-5 w-5 text-[#475467]" aria-label="Partial" />
  }
  if (value === null) {
    return <Minus className="h-5 w-5 text-[#475467]" aria-label="N/A" />
  }
  return <span className={colIndex === 0 ? 'font-[600] text-[#0F172A]' : ''}>{value}</span>
}

function normalizeRows(rows: ComparisonTableProps['rows'], winnerIndex?: number): Array<{ cells: CellValue[]; isWinner: boolean }> {
  return rows.map((row, i) => {
    if (Array.isArray(row)) {
      return { cells: row as CellValue[], isWinner: i === winnerIndex }
    }
    return { cells: (row as ComparisonTableRow).cells, isWinner: (row as ComparisonTableRow).isWinner ?? i === winnerIndex }
  })
}

export default function ComparisonTable({ columns, rows, caption, winnerIndex }: ComparisonTableProps) {
  // Guard against undefined props (can happen with certain MDX compilation modes)
  if (!rows || !columns) return null
  const normalizedRows = normalizeRows(rows, winnerIndex)

  return (
    // R3: overflow-x-auto wrapper, relative for scroll-fade overlay
    // R3: right-fade gradient on mobile
    <div className="relative overflow-x-auto rounded-xl border border-[#E8D5C4] after:pointer-events-none after:absolute after:right-0 after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-white after:content-[''] md:after:hidden">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        {caption ? (
          <caption className="border-b border-[#E8D5C4] bg-[#FFF3E8] px-4 py-3 text-left text-[14px] font-[600] text-[#0F172A]">
            {caption}
          </caption>
        ) : null}
        <thead>
          {/* Header row: bg-[#FFF3E8], Manrope 600 14px ink */}
          <tr className="bg-[#FFF3E8]">
            {columns.map((col, i) => (
              <th
                key={col}
                className={`px-4 py-3.5 text-left text-[14px] font-[600] text-[#0F172A] ${
                  // R4: first column sticky on mobile
                  i === 0 ? 'sticky left-0 z-10 bg-[#FFF3E8]' : ''
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`transition-colors duration-150 ${
                row.isWinner
                  // R5: recommended row — orange left border, warm white bg
                  ? 'border-l-4 border-l-[#F97316] bg-[#FFF8F2]'
                  : rowIndex % 2 === 0
                  ? 'bg-white'
                  : 'bg-[#FAFAF9]'
              }`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-t border-[#E8D5C4] px-4 py-3.5 text-[#475467] ${
                    cellIndex === 0
                      // R4: first column sticky
                      ? `sticky left-0 z-10 ${
                          row.isWinner ? 'bg-[#FFF8F2]' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'
                        }`
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">{renderCell(cell, cellIndex)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
