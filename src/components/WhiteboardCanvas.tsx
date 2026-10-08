// @ts-nocheck
import { useRef } from 'react'
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw'
import { useTheme } from '../utils/useTheme'

// Pre-defined economics curve templates — cast as any[] to bypass strict typing
const CURVE_TEMPLATES: Record<string, () => any[]> = {
  axes: () => convertToExcalidrawElements([
    { type: 'line', x: 120, y: 520, points: [[0, 0], [0, -480]], strokeColor: '#111', strokeWidth: 2 },
    { type: 'line', x: 120, y: 520, points: [[0, 0], [800, 0]], strokeColor: '#111', strokeWidth: 2 },
    { type: 'text', x: 100, y: 60, text: 'P', fontSize: 22, strokeWidth: 1 },
    { type: 'text', x: 860, y: 510, text: 'Q', fontSize: 22, strokeWidth: 1 },
    { type: 'text', x: 60, y: 480, text: 'Price (P)', fontSize: 14, strokeWidth: 1 },
    { type: 'text', x: 680, y: 560, text: 'Output (Q)', fontSize: 14, strokeWidth: 1 },
  ]) as any[],
  // @ts-ignore - Excalidraw skeleton types are overly strict for our use case
  demand: () => convertToExcalidrawElements([
    { type: 'freedraw', x: 160, y: 180, points: [[0, 0], [60, -20], [120, -45], [200, -100], [300, -180], [420, -280]], strokeColor: '#e63946', strokeWidth: 3 },
    { type: 'text', x: 460, y: -320, text: 'D', fontSize: 20, strokeColor: '#e63946' },
  ]) as any[],
  // @ts-ignore
  supply: () => convertToExcalidrawElements([
    { type: 'freedraw', x: 180, y: 460, points: [[0, 0], [40, -30], [100, -80], [180, -160], [280, -270], [400, -400]], strokeColor: '#2a9d8f', strokeWidth: 3 },
    { type: 'text', x: 440, y: -440, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
  ]) as any[],
  // @ts-ignore
  dd_supply: () => convertToExcalidrawElements([
    { type: 'freedraw', x: 160, y: 180, points: [[0, 0], [60, -20], [120, -45], [200, -100], [300, -180], [420, -280]], strokeColor: '#e63946', strokeWidth: 3 },
    { type: 'text', x: 460, y: -320, text: 'D', fontSize: 20, strokeColor: '#e63946' },
    { type: 'freedraw', x: 180, y: 460, points: [[0, 0], [40, -30], [100, -80], [180, -160], [280, -270], [400, -400]], strokeColor: '#2a9d8f', strokeWidth: 3 },
    { type: 'text', x: 440, y: -440, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
  ]) as any[],
  // @ts-ignore
  cost_curves: () => convertToExcalidrawElements([
    { type: 'freedraw', x: 140, y: 300, points: [[0, 0], [30, 10], [60, 15], [100, 12], [150, 0], [200, -20], [260, -30], [320, -25], [380, -10]], strokeColor: '#e76f51', strokeWidth: 2 },
    { type: 'text', x: 400, y: -10, text: 'MC', fontSize: 16, strokeColor: '#e76f51' },
    { type: 'freedraw', x: 120, y: 280, points: [[0, -20], [40, -10], [80, -5], [130, -2], [180, -5], [240, -15], [300, -30], [360, -35]], strokeColor: '#f4a261', strokeWidth: 2 },
    { type: 'text', x: 380, y: -40, text: 'AC', fontSize: 16, strokeColor: '#f4a261' },
    { type: 'freedraw', x: 150, y: 320, points: [[0, 10], [50, 15], [100, 10], [160, 0], [220, -15], [280, -30], [340, -35]], strokeColor: '#2a9d8f', strokeWidth: 2 },
    { type: 'text', x: 360, y: -45, text: 'AVC', fontSize: 16, strokeColor: '#2a9d8f' },
  ]) as any[],
  // @ts-ignore
  revenue_curves: () => convertToExcalidrawElements([
    { type: 'line', x: 120, y: 480, points: [[0, 0], [700, 0]], strokeColor: '#457b9d', strokeWidth: 2 },
    { type: 'text', x: 720, y: -20, text: 'AR = MR = P', fontSize: 14, strokeColor: '#457b9d' },
    { type: 'freedraw', x: 140, y: 300, points: [[0, 0], [50, -10], [100, -30], [160, -65], [230, -110], [310, -165], [400, -230]], strokeColor: '#e63946', strokeWidth: 2 },
    { type: 'text', x: 420, y: -250, text: 'TR', fontSize: 16, strokeColor: '#e63946' },
  ]) as any[],
  // @ts-ignore
  ppc: () => convertToExcalidrawElements([
    { type: 'freedraw', x: 160, y: 480, points: [[0, 0], [30, -15], [60, -35], [100, -60], [150, -90], [210, -120], [280, -145], [360, -165]], strokeColor: '#6a4c93', strokeWidth: 3 },
    { type: 'text', x: 380, y: -180, text: 'PPC', fontSize: 16, strokeColor: '#6a4c93' },
    { type: 'text', x: 100, y: 520, text: 'Good X', fontSize: 14 },
    { type: 'text', x: 20, y: 380, text: 'Good Y', fontSize: 14 },
  ]) as any[],
}

const BUTTONS: { key: string; label: string; emoji: string; desc: string; color: string }[] = [
  { key: 'axes',        label: 'Axes',          emoji: '📐',  desc: 'P & Q axes',               color: '#111' },
  { key: 'demand',      label: 'Demand',        emoji: '📉',  desc: 'Downward D curve',         color: '#e63946' },
  { key: 'supply',      label: 'Supply',        emoji: '📈',  desc: 'Upward S curve',           color: '#2a9d8f' },
  { key: 'dd_supply',   label: 'D & S',         emoji: '⚖️',  desc: 'Both curves together',     color: '#111' },
  { key: 'cost_curves', label: 'Cost Curves',   emoji: '💰',  desc: 'MC, AC, AVC',              color: '#e76f51' },
  { key: 'revenue_curves', label: 'Revenue',    emoji: '📊',  desc: 'TR, AR = MR = P',          color: '#457b9d' },
  { key: 'ppc',         label: 'PPC',           emoji: '🔄',  desc: 'Production frontier',      color: '#6a4c93' },
]

interface WhiteboardCanvasProps {
  initialData?: any
  onChange: (elements: any[], appState: any) => void
  clearCanvas: () => void
}

function WhiteboardCanvas({ initialData, handleChange, clearCanvas }: WhiteboardCanvasProps) {
  const { theme } = useTheme()
  const excalidrawAPIRef = useRef<any>(null)

  const themeMap: Record<string, 'light' | 'dark'> = { light: 'light', dark: 'dark', warm: 'light' }

  const handleInsert = (key: string) => {
    if (!excalidrawAPIRef.current) return
    const elements = CURVE_TEMPLATES[key]()
    excalidrawAPIRef.current.updateScene({ elements: [...(initialData?.elements || []), ...elements] })
  }

  const handleClear = () => {
    clearCanvas()
    excalidrawAPIRef.current?.updateScene({ elements: [] })
  }

  return (
    <div className="whiteboard-layout">
      <aside className="whiteboard-palette" aria-label="Curve templates">
        <h3>Insert Curve</h3>
        <p className="whiteboard-palette__hint">Click to add to canvas</p>
        <div className="whiteboard-palette__grid">
          {BUTTONS.map((btn) => (
            <button
              key={btn.key}
              type="button"
              className="whiteboard-palette__btn"
              style={{ borderLeftColor: btn.color }}
              onClick={() => handleInsert(btn.key)}
              title={btn.desc}
            >
              <span className="whiteboard-palette__btn-emoji">{btn.emoji}</span>
              <span className="whiteboard-palette__btn-text">
                <span className="whiteboard-palette__btn-label">{btn.label}</span>
                <span className="whiteboard-palette__btn-desc">{btn.desc}</span>
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="whiteboard-palette__clear" onClick={handleClear}>
          Clear Canvas
        </button>
      </aside>
      <div className="whiteboard-canvas-wrap">
        <Excalidraw
          excalidrawAPI={(api) => { excalidrawAPIRef.current = api }}
          initialData={initialData}
          onChange={handleChange}
          theme={themeMap[theme] || 'light'}
          UIOptions={{ canvasActions: { export: false, saveToActiveFile: true, clearCanvas: false, toggleTheme: false } }}
          name="Economics Diagram"
        />
      </div>
    </div>
  )
}

export default WhiteboardCanvas