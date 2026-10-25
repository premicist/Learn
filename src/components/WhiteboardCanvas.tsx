// @ts-nocheck
import { useRef, useState, useEffect } from 'react'
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { useTheme } from '../utils/useTheme'

// Template generators centered around (0, 0) so they can be smoothly offset to the user's viewport center
type TemplateFn = (axisColor: string, mutedColor: string) => any[]

interface TemplateItem {
  id: string
  title: string
  category: 'models' | 'curves'
  emoji: string
  description: string
  generator: TemplateFn
}

const TEMPLATES: TemplateItem[] = [
  // --- COMPLETE MODELS ---
  {
    id: 'market_equilibrium',
    title: 'Market Equilibrium',
    category: 'models',
    emoji: '⚖️',
    description: 'Demand, Supply, Equilibrium price Pe and quantity Qe',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
      // Demand Curve (D)
      { type: 'line', x: -200, y: -150, points: [[0, 0], [400, 310]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 210, y: 165, text: 'D', fontSize: 20, strokeColor: '#e63946' },
      // Supply Curve (S)
      { type: 'line', x: -200, y: 160, points: [[0, 0], [400, -310]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 210, y: -160, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
      // Equilibrium lines
      { type: 'line', x: 0, y: 5, points: [[0, 0], [-250, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: 0, y: 5, points: [[0, 0], [0, 195]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      // Equilibrium labels
      { type: 'ellipse', x: -6, y: -1, width: 12, height: 12, backgroundColor: '#e63946', fillStyle: 'solid', strokeColor: '#e63946' },
      { type: 'text', x: 12, y: -15, text: 'E', fontSize: 18, strokeColor: '#e63946' },
      { type: 'text', x: -285, y: -5, text: 'Pe', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -8, y: 210, text: 'Qe', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'demand_shift',
    title: 'Rightward Demand Shift',
    category: 'models',
    emoji: '📈',
    description: 'Demand increases from D1 to D2, showing new equilibrium',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [530, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 280, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      // D1
      { type: 'line', x: -220, y: -120, points: [[0, 0], [360, 280]], strokeColor: '#94a3b8', strokeWidth: 2, strokeStyle: 'dashed' },
      { type: 'text', x: 145, y: 165, text: 'D1', fontSize: 16, strokeColor: '#94a3b8' },
      // D2
      { type: 'line', x: -140, y: -160, points: [[0, 0], [380, 290]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 245, y: 135, text: 'D2', fontSize: 18, strokeColor: '#e63946' },
      // Supply
      { type: 'line', x: -220, y: 160, points: [[0, 0], [440, -320]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 225, y: -170, text: 'S', fontSize: 18, strokeColor: '#2a9d8f' },
      // Shift Arrow
      { type: 'arrow', x: -10, y: -10, points: [[0, 0], [55, 0]], strokeColor: '#e63946', strokeWidth: 2 },
      // E1 & E2
      { type: 'text', x: -55, y: 5, text: 'E1', fontSize: 16, strokeColor: '#64748b' },
      { type: 'text', x: 45, y: -45, text: 'E2', fontSize: 16, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'cost_curves',
    title: 'Short-Run Cost Curves',
    category: 'models',
    emoji: '💰',
    description: 'Marginal Cost (MC) cutting AC and AVC at their minimums',
    generator: (axisColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [520, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Cost (C)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 270, y: 190, text: 'Output (Q)', fontSize: 18, strokeColor: axisColor },
      // AC curve (U-shaped)
      { type: 'freedraw', x: -180, y: -40, points: [[0, 0], [60, 50], [140, 75], [230, 80], [320, 50], [400, -10]], strokeColor: '#f4a261', strokeWidth: 2.5 },
      { type: 'text', x: 230, y: -60, text: 'AC', fontSize: 18, strokeColor: '#f4a261' },
      // AVC curve (U-shaped below AC)
      { type: 'freedraw', x: -180, y: 40, points: [[0, 0], [60, 30], [150, 45], [240, 30], [340, -15], [390, -50]], strokeColor: '#2a9d8f', strokeWidth: 2.5 },
      { type: 'text', x: 220, y: -15, text: 'AVC', fontSize: 18, strokeColor: '#2a9d8f' },
      // MC curve (Cuts AVC and AC at minimum points)
      { type: 'freedraw', x: -150, y: 130, points: [[0, 0], [50, 10], [120, -50], [180, -130], [250, -220], [310, -320]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 170, y: -205, text: 'MC', fontSize: 18, strokeColor: '#e76f51' },
    ]) as any[],
  },
  {
    id: 'perfect_competition',
    title: 'Perfect Competition Firm',
    category: 'models',
    emoji: '🏭',
    description: 'Horizontal AR=MR=P, Profit-maximizing MC=MR output',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [520, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'P, MR, MC', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 270, y: 190, text: 'Output (Q)', fontSize: 18, strokeColor: axisColor },
      // Horizontal AR = MR = P line
      { type: 'line', x: -260, y: -20, points: [[0, 0], [510, 0]], strokeColor: '#457b9d', strokeWidth: 3 },
      { type: 'text', x: 260, y: -30, text: 'P = AR = MR', fontSize: 16, strokeColor: '#457b9d' },
      // AC curve
      { type: 'freedraw', x: -160, y: -10, points: [[0, 0], [60, 40], [140, 50], [220, 30], [300, -30]], strokeColor: '#f4a261', strokeWidth: 2 },
      { type: 'text', x: 150, y: -50, text: 'AC', fontSize: 16, strokeColor: '#f4a261' },
      // MC curve
      { type: 'freedraw', x: -140, y: 120, points: [[0, 0], [60, -20], [120, -90], [180, -170], [240, -260]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 110, y: -155, text: 'MC', fontSize: 18, strokeColor: '#e76f51' },
      // Equilibrium output projection
      { type: 'line', x: -30, y: -20, points: [[0, 0], [0, 220]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -40, y: 210, text: 'Q*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -20, y: -45, text: 'E (MC=MR)', fontSize: 14, strokeColor: '#e76f51' },
    ]) as any[],
  },
  {
    id: 'ppc',
    title: 'Production Possibility Frontier (PPC)',
    category: 'models',
    emoji: '🔄',
    description: 'Concave PPC with efficient, inefficient & unattainable points',
    generator: (axisColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Good Y (Capital)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Good X (Consumer)', fontSize: 16, strokeColor: axisColor },
      // Concave PPC Curve
      { type: 'freedraw', x: -250, y: -160, points: [[0, 0], [90, 20], [190, 60], [280, 130], [360, 230], [410, 360]], strokeColor: '#6a4c93', strokeWidth: 3.5 },
      { type: 'text', x: 170, y: 80, text: 'PPC', fontSize: 20, strokeColor: '#6a4c93' },
      // Points
      // Point A on curve (Efficient)
      { type: 'ellipse', x: -35, y: -45, width: 10, height: 10, backgroundColor: '#2a9d8f', fillStyle: 'solid', strokeColor: '#2a9d8f' },
      { type: 'text', x: -20, y: -55, text: 'A (Efficient)', fontSize: 14, strokeColor: '#2a9d8f' },
      // Point B inside (Inefficient)
      { type: 'ellipse', x: -120, y: 60, width: 10, height: 10, backgroundColor: '#e76f51', fillStyle: 'solid', strokeColor: '#e76f51' },
      { type: 'text', x: -105, y: 50, text: 'B (Underemployment)', fontSize: 14, strokeColor: '#e76f51' },
      // Point C outside (Unattainable)
      { type: 'ellipse', x: 130, y: -60, width: 10, height: 10, backgroundColor: '#e63946', fillStyle: 'solid', strokeColor: '#e63946' },
      { type: 'text', x: 145, y: -70, text: 'C (Unattainable)', fontSize: 14, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'surplus',
    title: 'Consumer & Producer Surplus',
    category: 'models',
    emoji: '🎯',
    description: 'Equilibrium showing shaded regions for CS and PS',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [480, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 240, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      // Demand and Supply
      { type: 'line', x: -200, y: -160, points: [[0, 0], [380, 310]], strokeColor: '#e63946', strokeWidth: 2.5 },
      { type: 'text', x: 190, y: 155, text: 'D', fontSize: 18, strokeColor: '#e63946' },
      { type: 'line', x: -200, y: 150, points: [[0, 0], [380, -310]], strokeColor: '#2a9d8f', strokeWidth: 2.5 },
      { type: 'text', x: 190, y: -170, text: 'S', fontSize: 18, strokeColor: '#2a9d8f' },
      // Pe and Qe dashed lines
      { type: 'line', x: -10, y: -5, points: [[0, 0], [-240, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -10, y: -5, points: [[0, 0], [0, 205]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -275, y: -15, text: 'Pe', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -18, y: 210, text: 'Qe', fontSize: 16, strokeColor: mutedColor },
      // Surplus labels
      { type: 'text', x: -160, y: -65, text: 'Consumer\nSurplus (CS)', fontSize: 14, strokeColor: '#e63946' },
      { type: 'text', x: -160, y: 45, text: 'Producer\nSurplus (PS)', fontSize: 14, strokeColor: '#2a9d8f' },
    ]) as any[],
  },

  // --- SINGLE CURVES & ELEMENTS ---
  {
    id: 'axes_only',
    title: 'P & Q Axes',
    category: 'curves',
    emoji: '📐',
    description: 'Empty coordinate axes with P, Q, and origin labels',
    generator: (axisColor) => convertToExcalidrawElements([
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -225, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
    ]) as any[],
  },
  {
    id: 'demand_curve',
    title: 'Demand Curve (D)',
    category: 'curves',
    emoji: '📉',
    description: 'Downward-sloping demand line with D labels',
    generator: () => convertToExcalidrawElements([
      { type: 'line', x: -180, y: -140, points: [[0, 0], [360, 280]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 190, y: 145, text: 'D', fontSize: 20, strokeColor: '#e63946' },
      { type: 'text', x: -205, y: -165, text: 'D', fontSize: 20, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'supply_curve',
    title: 'Supply Curve (S)',
    category: 'curves',
    emoji: '📈',
    description: 'Upward-sloping supply line with S labels',
    generator: () => convertToExcalidrawElements([
      { type: 'line', x: -180, y: 140, points: [[0, 0], [360, -280]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 190, y: -165, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
      { type: 'text', x: -205, y: 145, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
    ]) as any[],
  },
  {
    id: 'shift_arrow',
    title: 'Shift Indicator',
    category: 'curves',
    emoji: '➡️',
    description: 'Rightward shift arrow with delta symbol',
    generator: () => convertToExcalidrawElements([
      { type: 'arrow', x: -50, y: 0, points: [[0, 0], [100, 0]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: -10, y: -30, text: 'Δ Shift', fontSize: 16, strokeColor: '#e63946' },
    ]) as any[],
  },
]

interface WhiteboardCanvasProps {
  initialData?: any
  onChange: (elements: any[], appState: any) => void
  clearCanvas: () => void
}

function WhiteboardCanvas({ initialData, onChange, clearCanvas }: WhiteboardCanvasProps) {
  const { theme } = useTheme()
  const excalidrawAPIRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [activeMenu, setActiveMenu] = useState<'models' | 'curves' | 'help' | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const themeMap: Record<string, 'light' | 'dark'> = { light: 'light', dark: 'dark', warm: 'light' }
  const isDark = theme === 'dark'
  const axisColor = isDark ? '#f1f5f9' : '#1e293b'
  const mutedColor = isDark ? '#94a3b8' : '#64748b'

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 2500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.wb-toolbar')) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Insert template centered on the current visible viewport
  const handleInsert = (template: TemplateItem, replaceAll = false) => {
    if (!excalidrawAPIRef.current) return

    const appState = excalidrawAPIRef.current.getAppState?.() || {}
    const zoom = appState.zoom?.value || 1
    const scrollX = appState.scrollX || 0
    const scrollY = appState.scrollY || 0
    const width = appState.width || window.innerWidth
    const height = appState.height || window.innerHeight

    // Center in current scene coordinate space
    const targetCenterX = -scrollX + width / (2 * zoom)
    const targetCenterY = -scrollY + height / (2 * zoom)

    const rawElements = template.generator(axisColor, mutedColor)

    // Translate all generated elements so that (0,0) in template matches targetCenter
    const translatedElements = rawElements.map((el) => ({
      ...el,
      x: el.x + targetCenterX,
      y: el.y + targetCenterY,
    }))

    const currentElements = replaceAll ? [] : (excalidrawAPIRef.current.getSceneElements?.() || [])
    excalidrawAPIRef.current.updateScene({
      elements: [...currentElements, ...translatedElements],
      commitToHistory: true,
    })

    setActiveMenu(null)
    setToastMessage(`Added "${template.title}" to canvas`)
  }

  const handleClear = () => {
    if (window.confirm('Clear canvas? All drawings and diagrams will be removed.')) {
      clearCanvas()
      excalidrawAPIRef.current?.updateScene({ elements: [] })
      setToastMessage('Canvas cleared')
    }
  }

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
      }
    } catch {
      // ignore fullscreen API restrictions
    }
  }

  return (
    <div
      ref={containerRef}
      className={`whiteboard-container ${isFullscreen ? 'whiteboard-container--fullscreen' : ''}`}
    >
      {/* Sleek Top Toolbar */}
      <header className="wb-toolbar" aria-label="Whiteboard controls">
        <div className="wb-toolbar__left">
          {/* Models Dropdown */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn wb-btn--primary ${activeMenu === 'models' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'models' ? null : 'models'))
              }}
              aria-expanded={activeMenu === 'models'}
            >
              <span className="wb-btn__icon">📊</span>
              <span className="wb-btn__label">Complete Diagrams</span>
              <span className="wb-btn__chevron">▾</span>
            </button>

            {activeMenu === 'models' && (
              <div className="wb-menu">
                <div className="wb-menu__header">
                  <strong>Economics Models</strong>
                  <span>Drops directly into your view</span>
                </div>
                <div className="wb-menu__list">
                  {TEMPLATES.filter((t) => t.category === 'models').map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      className="wb-menu__item"
                      onClick={() => handleInsert(tmpl)}
                    >
                      <span className="wb-menu__item-emoji">{tmpl.emoji}</span>
                      <div className="wb-menu__item-text">
                        <span className="wb-menu__item-title">{tmpl.title}</span>
                        <span className="wb-menu__item-desc">{tmpl.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Single Curves Dropdown */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn ${activeMenu === 'curves' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'curves' ? null : 'curves'))
              }}
              aria-expanded={activeMenu === 'curves'}
            >
              <span className="wb-btn__icon">➕</span>
              <span className="wb-btn__label">Add Curve / Axis</span>
              <span className="wb-btn__chevron">▾</span>
            </button>

            {activeMenu === 'curves' && (
              <div className="wb-menu">
                <div className="wb-menu__header">
                  <strong>Building Blocks</strong>
                  <span>Single curves and axes</span>
                </div>
                <div className="wb-menu__list">
                  {TEMPLATES.filter((t) => t.category === 'curves').map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      className="wb-menu__item"
                      onClick={() => handleInsert(tmpl)}
                    >
                      <span className="wb-menu__item-emoji">{tmpl.emoji}</span>
                      <div className="wb-menu__item-text">
                        <span className="wb-menu__item-title">{tmpl.title}</span>
                        <span className="wb-menu__item-desc">{tmpl.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="wb-toolbar__right">
          {/* Quick Help Popover */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn wb-btn--ghost ${activeMenu === 'help' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'help' ? null : 'help'))
              }}
              title="Tips & Shortcuts"
            >
              <span className="wb-btn__icon">💡</span>
              <span className="wb-btn__label">Shortcuts</span>
            </button>

            {activeMenu === 'help' && (
              <div className="wb-menu wb-menu--right wb-menu--help">
                <div className="wb-menu__header">
                  <strong>Quick Shortcuts & Tips</strong>
                </div>
                <ul className="wb-help-list">
                  <li><kbd>V</kbd> Selection / Move tool</li>
                  <li><kbd>P</kbd> Freehand Pen</li>
                  <li><kbd>A</kbd> Arrow tool (for shifts)</li>
                  <li><kbd>T</kbd> Text tool (labels)</li>
                  <li><kbd>Space</kbd> + Drag to Pan</li>
                  <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> Undo</li>
                  <li><kbd>Del</kbd> Delete selected</li>
                </ul>
                <div className="wb-help-footer">
                  💡 Double-click any text element on canvas to edit its label.
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen / Presentation Mode */}
          <button
            type="button"
            className="wb-btn wb-btn--ghost"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Smartboard / Fullscreen Mode'}
          >
            <span className="wb-btn__icon">{isFullscreen ? '🗗' : '⛶'}</span>
            <span className="wb-btn__label">{isFullscreen ? 'Exit Focus' : 'Focus Mode'}</span>
          </button>

          {/* Clear Canvas */}
          <button
            type="button"
            className="wb-btn wb-btn--danger"
            onClick={handleClear}
            title="Clear all drawings"
          >
            <span className="wb-btn__icon">🧽</span>
            <span className="wb-btn__label">Clear</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="wb-canvas-viewport">
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

        {/* Dynamic Toast Feedback */}
        {toastMessage && (
          <div className="wb-toast" role="status">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default WhiteboardCanvas
