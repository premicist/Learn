// @ts-nocheck
import { useRef } from 'react'
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw'
import { useTheme } from '../utils/useTheme'

// Pre-defined economics curve templates — cast as any[] to bypass strict typing
const CURVE_TEMPLATES: Record<string, (axisColor: string, mutedColor: string) => any[]> = {
  axes: (axisColor) => convertToExcalidrawElements([
    { type: 'line', x: 100, y: 100, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
    { type: 'line', x: 100, y: 500, points: [[0, 0], [600, 0]], strokeColor: axisColor, strokeWidth: 2 },
    { type: 'text', x: 75, y: 75, text: 'P', fontSize: 22, strokeColor: axisColor },
    { type: 'text', x: 715, y: 490, text: 'Q', fontSize: 22, strokeColor: axisColor },
    { type: 'text', x: 45, y: 95, text: 'Price (P)', fontSize: 14, strokeColor: axisColor },
    { type: 'text', x: 610, y: 525, text: 'Output / Quantity (Q)', fontSize: 14, strokeColor: axisColor },
    { type: 'text', x: 80, y: 505, text: '0', fontSize: 16, strokeColor: axisColor },
  ]) as any[],

  demand: () => convertToExcalidrawElements([
    { type: 'line', x: 140, y: 140, points: [[0, 0], [440, 320]], strokeColor: '#e63946', strokeWidth: 3 },
    { type: 'text', x: 595, y: 455, text: 'D', fontSize: 20, strokeColor: '#e63946' },
    { type: 'text', x: 125, y: 115, text: 'D', fontSize: 20, strokeColor: '#e63946' },
  ]) as any[],

  supply: () => convertToExcalidrawElements([
    { type: 'line', x: 140, y: 460, points: [[0, 0], [440, -320]], strokeColor: '#2a9d8f', strokeWidth: 3 },
    { type: 'text', x: 595, y: 125, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
    { type: 'text', x: 125, y: 465, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
  ]) as any[],

  dd_supply: (_axisColor, mutedColor) => convertToExcalidrawElements([
    // Demand Curve
    { type: 'line', x: 140, y: 140, points: [[0, 0], [440, 320]], strokeColor: '#e63946', strokeWidth: 3 },
    { type: 'text', x: 595, y: 455, text: 'D', fontSize: 20, strokeColor: '#e63946' },
    // Supply Curve
    { type: 'line', x: 140, y: 460, points: [[0, 0], [440, -320]], strokeColor: '#2a9d8f', strokeWidth: 3 },
    { type: 'text', x: 595, y: 125, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
    // Equilibrium lines
    { type: 'line', x: 360, y: 300, points: [[0, 0], [-260, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
    { type: 'line', x: 360, y: 300, points: [[0, 0], [0, 200]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
    { type: 'text', x: 370, y: 280, text: 'E', fontSize: 18, strokeColor: '#e63946' },
    { type: 'text', x: 65, y: 290, text: 'Pe', fontSize: 16, strokeColor: mutedColor },
    { type: 'text', x: 350, y: 510, text: 'Qe', fontSize: 16, strokeColor: mutedColor },
  ]) as any[],

  cost_curves: () => convertToExcalidrawElements([
    // AC curve (U-shaped)
    { type: 'freedraw', x: 160, y: 220, points: [[0, 0], [60, 50], [120, 75], [200, 80], [280, 65], [360, 25]], strokeColor: '#f4a261', strokeWidth: 2 },
    { type: 'text', x: 535, y: 235, text: 'AC', fontSize: 16, strokeColor: '#f4a261' },
    // AVC curve (U-shaped below AC)
    { type: 'freedraw', x: 160, y: 300, points: [[0, 0], [60, 30], [150, 40], [240, 25], [340, -15]], strokeColor: '#2a9d8f', strokeWidth: 2 },
    { type: 'text', x: 515, y: 275, text: 'AVC', fontSize: 16, strokeColor: '#2a9d8f' },
    // MC curve (Cuts AVC and AC at their minimum points)
    { type: 'freedraw', x: 180, y: 380, points: [[0, 0], [50, 10], [130, -40], [180, -100], [240, -200], [300, -290]], strokeColor: '#e76f51', strokeWidth: 3 },
    { type: 'text', x: 490, y: 80, text: 'MC', fontSize: 16, strokeColor: '#e76f51' },
  ]) as any[],

  revenue_curves: () => convertToExcalidrawElements([
    // AR = MR = P (Horizontal in perfect competition)
    { type: 'line', x: 100, y: 280, points: [[0, 0], [550, 0]], strokeColor: '#457b9d', strokeWidth: 2.5 },
    { type: 'text', x: 660, y: 270, text: 'AR = MR = P', fontSize: 14, strokeColor: '#457b9d' },
    // TR (Total Revenue ray from origin)
    { type: 'line', x: 100, y: 500, points: [[0, 0], [420, -340]], strokeColor: '#e63946', strokeWidth: 2.5 },
    { type: 'text', x: 530, y: 150, text: 'TR', fontSize: 16, strokeColor: '#e63946' },
  ]) as any[],

  ppc: () => convertToExcalidrawElements([
    // Concave to origin
    { type: 'freedraw', x: 100, y: 140, points: [[0, 0], [120, 20], [240, 70], [340, 160], [410, 250], [440, 360]], strokeColor: '#6a4c93', strokeWidth: 3 },
    { type: 'text', x: 410, y: 230, text: 'PPC', fontSize: 18, strokeColor: '#6a4c93' },
    { type: 'text', x: 45, y: 120, text: 'Good Y', fontSize: 14, strokeColor: '#6a4c93' },
    { type: 'text', x: 510, y: 515, text: 'Good X', fontSize: 14, strokeColor: '#6a4c93' },
  ]) as any[],
}

const BUTTONS: { key: string; label: string; emoji: string; desc: string; color: string }[] = [
  { key: 'axes',        label: 'Axes',          emoji: '📐',  desc: 'P & Q axes',               color: '#111' },
  { key: 'demand',      label: 'Demand',        emoji: '📉',  desc: 'Downward D curve',         color: '#e63946' },
  { key: 'supply',      label: 'Supply',        emoji: '📈',  desc: 'Upward S curve',           color: '#2a9d8f' },
  { key: 'dd_supply',   label: 'D & S',         emoji: '⚖️',  desc: 'Both curves together',     color: '#457b9d' },
  { key: 'cost_curves', label: 'Cost Curves',   emoji: '💰',  desc: 'MC, AC, AVC',              color: '#e76f51' },
  { key: 'revenue_curves', label: 'Revenue',    emoji: '📊',  desc: 'TR, AR = MR = P',          color: '#457b9d' },
  { key: 'ppc',         label: 'PPC',           emoji: '🔄',  desc: 'Production frontier',      color: '#6a4c93' },
]

interface WhiteboardCanvasProps {
  initialData?: any
  onChange: (elements: any[], appState: any) => void
  clearCanvas: () => void
}

function WhiteboardCanvas({ initialData, onChange, clearCanvas }: WhiteboardCanvasProps) {
  const { theme } = useTheme()
  const excalidrawAPIRef = useRef<any>(null)

  const themeMap: Record<string, 'light' | 'dark'> = { light: 'light', dark: 'dark', warm: 'light' }
  const isDark = theme === 'dark'
  const axisColor = isDark ? '#f1f5f9' : '#1e293b'
  const mutedColor = isDark ? '#94a3b8' : '#64748b'

  const handleInsert = (key: string) => {
    if (!excalidrawAPIRef.current) return
    const elements = CURVE_TEMPLATES[key](axisColor, mutedColor)
    const currentElements = excalidrawAPIRef.current.getSceneElements?.() || []
    excalidrawAPIRef.current.updateScene({
      elements: [...currentElements, ...elements],
    })
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas? All drawings and curves will be removed.')) {
      clearCanvas()
      excalidrawAPIRef.current?.updateScene({ elements: [] })
    }
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
          onChange={onChange}
          theme={themeMap[theme] || 'light'}
          UIOptions={{
            canvasActions: {
              export: { saveFileToDisk: true },
              saveToActiveFile: false,
              clearCanvas: false,
              toggleTheme: false,
            },
          }}
          name="Economics Diagram"
        />
      </div>
    </div>
  )
}

export default WhiteboardCanvas