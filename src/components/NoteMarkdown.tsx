import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const CHART_COLORS = ['#146b63', '#b4872a', '#b23a2b', '#47607a', '#0e4a45']

function normalizeMathDelimiters(content: string) {
  const slash = String.fromCharCode(92)
  return content
    .split(`${slash}[`).join('$$\n')
    .split(`${slash}]`).join('\n$$')
    .split(`${slash}(`).join('$')
    .split(`${slash})`).join('$')
}

function slugify(children: ReactNode) {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

type ChartData = {
  xKey: string
  series: string[]
  data: Record<string, string | number>[]
}

function NoteChart({ json }: { json: string }) {
  let parsed: ChartData | null = null
  try {
    parsed = JSON.parse(json) as ChartData
  } catch {
    parsed = null
  }
  if (!parsed || !parsed.xKey || !Array.isArray(parsed.series) || !Array.isArray(parsed.data) || parsed.data.length === 0) {
    return <p className="note-chart-error">(Chart data couldn&apos;t be read.)</p>
  }
  const values = parsed.series.flatMap((key) => parsed.data.map((row) => Number(row[key])).filter(Number.isFinite))
  const min = Math.min(0, ...values)
  const max = Math.max(1, ...values)
  const width = 680
  const height = 300
  const left = 46
  const right = 20
  const top = 20
  const bottom = 44
  const chartWidth = width - left - right
  const chartHeight = height - top - bottom
  const x = (index: number) => left + (index / Math.max(parsed.data.length - 1, 1)) * chartWidth
  const y = (value: number) => top + ((max - value) / (max - min || 1)) * chartHeight
  return (
    <figure className="note-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive economics chart">
        <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="var(--ink-faint)" />
        <line x1={left} y1={height - bottom} x2={width - right} y2={height - bottom} stroke="var(--ink-faint)" />
        {[0, 0.5, 1].map((fraction) => {
          const value = max - fraction * (max - min)
          const yPosition = y(value)
          return <g key={fraction}><line x1={left} y1={yPosition} x2={width - right} y2={yPosition} stroke="var(--line)" strokeDasharray="4 4" /><text x={left - 8} y={yPosition + 4} textAnchor="end" className="chart-label">{Math.round(value * 100) / 100}</text></g>
        })}
        {parsed.data.map((row, index) => <text key={String(row[parsed.xKey])} x={x(index)} y={height - 18} textAnchor="middle" className="chart-label">{String(row[parsed.xKey])}</text>)}
        {parsed.series.map((key, seriesIndex) => {
          const points = parsed.data.map((row, index) => `${x(index)},${y(Number(row[key]))}`).join(' ')
          return <polyline key={key} points={points} fill="none" stroke={CHART_COLORS[seriesIndex % CHART_COLORS.length]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        })}
      </svg>
      <figcaption>{parsed.series.map((key, index) => <span key={key} className="chart-legend"><i style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />{key}</span>)}</figcaption>
    </figure>
  )
}

function NoteMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h2({ children, ...props }) { return <h2 id={slugify(children)} {...props}>{children}</h2> },
        h3({ children, ...props }) { return <h3 id={slugify(children)} {...props}>{children}</h3> },
        code(props) {
          const { className, children, ...rest } = props
          if (className === 'language-chart') return <NoteChart json={String(children).trim()} />
          return <code className={className} {...rest}>{children}</code>
        },
      }}
    >
      {normalizeMathDelimiters(content)}
    </ReactMarkdown>
  )
}

export default NoteMarkdown
