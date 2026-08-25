import type { NoteVisualBlock as VisualBlock } from '../data/content'

type NoteVisualBlockProps = {
  block: VisualBlock
  showTitle?: boolean
}

function displayValue(value: string | number) {
  if (typeof value === 'number') return value.toLocaleString('en-IN', { maximumFractionDigits: 2 })
  return value
}

function NoteVisualBlock({ block, showTitle = true }: NoteVisualBlockProps) {
  if (block.type === 'formula') {
    return (
      <section className="note-visual-block note-visual-block--formula" aria-label={`Formula: ${block.title}`}>
        {showTitle && <p className="note-visual-block__eyebrow">Formula</p>}
        {showTitle && <h3>{block.title}</h3>}
        <div className="note-formula" role="img" aria-label={`${block.title}: ${block.expression || ''}`}>{block.expression}</div>
        {block.explanation && <p className="note-visual-block__explanation">{block.explanation}</p>}
      </section>
    )
  }

  if (block.type === 'table') {
    return (
      <section className="note-visual-block note-visual-block--table" aria-label={`Table: ${block.title}`}>
        {showTitle && <p className="note-visual-block__eyebrow">Validated table</p>}
        {showTitle && <h3>{block.title}</h3>}
        <div className="note-table-wrap">
          <table>
            <thead>
              <tr>{(block.columns || []).map((column) => <th key={column} scope="col">{column}</th>)}</tr>
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

  if (block.type === 'graph' && block.asset) {
    return (
      <figure className="note-visual-block note-visual-block--graph">
        {showTitle && <p className="note-visual-block__eyebrow">Python-generated graph</p>}
        {showTitle && <h3>{block.title}</h3>}
        <img src={block.asset} alt={`${block.title}. ${block.yLabel || 'Y values'} plotted against ${block.xLabel || 'X values'}.`} />
        <figcaption>{block.xLabel} against {block.yLabel}. Values are generated from the validated note data.</figcaption>
      </figure>
    )
  }

  return null
}

export default NoteVisualBlock
