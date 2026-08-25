const VISUAL_TYPES = new Set(['formula', 'table', 'graph'])

function normalizeTableRows(rows) {
  if (!Array.isArray(rows)) return rows
  return rows.map((row) => {
    if (Array.isArray(row)) return row
    if (row && typeof row === 'object' && Array.isArray(row.cells)) return row.cells
    return row
  })
}

function normalizeGraphPoints(points) {
  if (!Array.isArray(points)) return points
  return points.map((point) => {
    if (Array.isArray(point)) return point
    if (point && typeof point === 'object' && point.x !== undefined && point.y !== undefined) {
      return [point.x, point.y]
    }
    return point
  })
}

export function normalizeVisualBlocks(blocks) {
  if (!Array.isArray(blocks)) return blocks
  return blocks.map((block) => {
    if (!block || typeof block !== 'object' || Array.isArray(block) || !VISUAL_TYPES.has(block.type)) return block
    if (block.type === 'table') return { ...block, rows: normalizeTableRows(block.rows) }
    if (block.type === 'graph') return { ...block, points: normalizeGraphPoints(block.points) }
    return { ...block }
  })
}
