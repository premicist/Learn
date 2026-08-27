import { useId } from 'react'
import type { NoteVisualBlock as VisualBlock } from '../data/content'
import NoteMath from './NoteMath'

type NoteVisualBlockProps = {
  block: VisualBlock
  showTitle?: boolean
}

function displayValue(value: string | number) {
  if (typeof value === 'number') return value.toLocaleString('en-IN', { maximumFractionDigits: 2 })
  return value
}

function InlineGraph({ block, title }: { block: VisualBlock; title: string }) {
  const points = (block.points || []).filter((point): point is [number, number] => (
    Array.isArray(point) && point.length === 2 && point.every((value) => typeof value === 'number' && Number.isFinite(value))
  ))
  if (points.length < 2) return <p className="note-chart-error">(Graph data couldn&apos;t be read.)</p>

  const width = 760
  const height = 390
  const left = 86
  const right = 26
  const top = 44
  const bottom = 76
  const xValues = points.map(([value]) => value)
  const yValues = points.map(([, value]) => value)
  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)
  const minY = Math.min(0, ...yValues)
  const maxY = Math.max(1, ...yValues)
  const chartWidth = width - left - right
  const chartHeight = height - top - bottom
  const x = (value: number) => left + ((value - minX) / (maxX - minX || 1)) * chartWidth
  const y = (value: number) => top + ((maxY - value) / (maxY - minY || 1)) * chartHeight
  const graphId = useId().replace(/:/g, '')
  const gridValues = [maxY, (maxY + minY) / 2, minY]
  const pointsString = points.map(([xValue, yValue]) => `${x(xValue)},${y(yValue)}`).join(' ')

  return (
    <figure className="note-visual-block note-visual-block--graph">
      <p className="note-visual-block__eyebrow">Inline graph</p>
      <h3>{title}</h3>
      <svg className="note-inline-graph" viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${graphId}-title ${graphId}-description`}>
        <title id={`${graphId}-title`}>{title}</title>
        <desc id={`${graphId}-description`}>{block.yLabel || 'Y values'} plotted against {block.xLabel || 'X values'}.</desc>
        {gridValues.map((value, index) => (
          <g key={`${value}-${index}`}>
            <line x1={left} y1={y(value)} x2={width - right} y2={y(value)} stroke="var(--line)" strokeDasharray="5 5" />
            <text x={left - 12} y={y(value) + 5} textAnchor="end" className="chart-label">{displayValue(Math.round(value * 100) / 100)}</text>
          </g>
        ))}
        <line className="note-inline-graph__axis" x1={left} y1={top} x2={left} y2={height - bottom} />
        <line className="note-inline-graph__axis" x1={left} y1={height - bottom} x2={width - right} y2={height - bottom} />
        <polyline className="note-inline-graph__line" points={pointsString} />
        {points.map(([xValue, yValue]) => (
          <g key={`${xValue}-${yValue}`}>
            <circle className="note-inline-graph__dot" cx={x(xValue)} cy={y(yValue)} r="7" />
            <text x={x(xValue)} y={height - bottom + 26} textAnchor="middle" className="chart-label">{displayValue(xValue)}</text>
          </g>
        ))}
        <text x={(left + width - right) / 2} y={height - 16} textAnchor="middle" className="note-inline-graph__label">{block.xLabel || 'X'}</text>
        <text x="18" y={(top + height - bottom) / 2} textAnchor="middle" className="note-inline-graph__label" transform={`rotate(-90 18 ${(top + height - bottom) / 2})`}>{block.yLabel || 'Y'}</text>
      </svg>
      <figcaption>{block.xLabel || 'X'} against {block.yLabel || 'Y'}. Values are rendered from the validated inline block.</figcaption>
    </figure>
  )
}

function NoteVisualBlock({ block, showTitle = true }: NoteVisualBlockProps) {
  const title = block.title || 'Untitled visual'

  if (block.type === 'formula') {
    return (
      <section className="note-visual-block note-visual-block--formula" aria-label={`Formula: ${title}`}>
        {showTitle && <p className="note-visual-block__eyebrow">Formula</p>}
        {showTitle && <h3>{title}</h3>}
        <div className="note-formula">
          <NoteMath expression={block.expression || ''} display />
        </div>
        {block.explanation && <p className="note-visual-block__explanation">{block.explanation}</p>}
      </section>
    )
  }

  if (block.type === 'table') {
    return (
      <section className="note-visual-block note-visual-block--table" aria-label={`Table: ${title}`}>
        {showTitle && <p className="note-visual-block__eyebrow">Table</p>}
        {showTitle && <h3>{title}</h3>}
        <div className="note-table-wrap">
          <table>
            <thead>
              <tr>{(block.columns || []).map((column, index) => <th key={`${column}-${index}`} scope="col">{column}</th>)}</tr>
            </thead>
            <tbody>
              {(block.rows || []).map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((value, columnIndex) => <td key={`cell-${rowIndex}-${columnIndex}`}>{displayValue(value)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  if (block.type === 'graph') {
    if (block.asset) {
      return (
        <figure className="note-visual-block note-visual-block--graph">
          {showTitle && <p className="note-visual-block__eyebrow">Graph</p>}
          {showTitle && <h3>{title}</h3>}
          <img src={block.asset} alt={`${title}. ${block.yLabel || 'Y values'} plotted against ${block.xLabel || 'X values'}.`} />
          <figcaption>{block.xLabel} against {block.yLabel}. Values are generated from the validated note data.</figcaption>
        </figure>
      )
    }
    return <InlineGraph block={block} title={title} />
  }

  return null
}

export default NoteVisualBlock
