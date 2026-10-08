import { useEffect, useState } from 'react'
import mermaid from 'mermaid'
import DiagramCard from './DiagramCard'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'inherit',
  fontSize: 13,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 28,
    rankSpacing: 32,
    padding: 10,
  },
})

type MermaidDiagramInnerProps = {
  chart: string
  title?: string
  caption?: string
}

function extractChartTitle(chart: string): string {
  const frontmatterMatch = chart.match(/^---\s*\n([\s\S]*?)\n---/m)
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/^title:\s*(.+)$/m)
    if (titleMatch) return titleMatch[1].trim().replace(/^["']|["']$/g, '')
  }
  const accTitleMatch = chart.match(/^accTitle:\s*([^\n]+)/m)
  if (accTitleMatch) return accTitleMatch[1].trim()
  return ''
}

function processSvg(rawSvg: string): string {
  let cleaned = rawSvg.trim()

  // Retain or construct viewBox for responsive scaling
  if (!/viewBox=/i.test(cleaned)) {
    const widthMatch = cleaned.match(/width="([^"]+)"/i)
    const heightMatch = cleaned.match(/height="([^"]+)"/i)
    if (widthMatch && heightMatch) {
      const w = parseFloat(widthMatch[1])
      const h = parseFloat(heightMatch[1])
      if (!isNaN(w) && !isNaN(h)) {
        cleaned = cleaned.replace(/^<svg\b/i, `<svg viewBox="0 0 ${w} ${h}"`)
      }
    }
  }

  // Remove restrictive max-width inline styles so responsive CSS controls sizing
  cleaned = cleaned.replace(/style="[^"]*max-width:[^"]*"/gi, '')
  cleaned = cleaned.replace(/\s+width="[^"]*"/gi, ' width="100%"')
  cleaned = cleaned.replace(/\s+height="[^"]*"/gi, ' height="auto"')

  if (!/preserveAspectRatio=/i.test(cleaned)) {
    cleaned = cleaned.replace(/^<svg\b/i, '<svg preserveAspectRatio="xMidYMid meet"')
  }

  return cleaned
}

export default function MermaidDiagramInner({ chart, title, caption }: MermaidDiagramInnerProps) {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const inferredTitle = title || extractChartTitle(chart) || 'Mermaid Diagram'

  useEffect(() => {
    let isMounted = true
    const cleanId = `mermaid-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`

    async function renderChart() {
      try {
        setError(null)
        const trimmed = chart.trim()
        if (!trimmed) return
        const { svg: renderedSvg } = await mermaid.render(cleanId, trimmed)
        if (isMounted) {
          setSvg(processSvg(renderedSvg))
        }
      } catch (err) {
        if (isMounted) {
          const tempNode = document.getElementById(cleanId) || document.getElementById(`d${cleanId}`)
          if (tempNode && tempNode.parentNode) {
            tempNode.parentNode.removeChild(tempNode)
          }
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
        }
      }
    }

    renderChart()
    return () => {
      isMounted = false
      const tempNode = document.getElementById(cleanId) || document.getElementById(`d${cleanId}`)
      if (tempNode && tempNode.parentNode) {
        tempNode.parentNode.removeChild(tempNode)
      }
    }
  }, [chart])

  if (error) {
    return (
      <div className="diagram-card diagram-card--error" data-inline-content="true">
        <div className="diagram-card__header">
          <span className="diagram-card__badge">Diagram</span>
          <h4 className="diagram-card__title">{inferredTitle}</h4>
        </div>
        <div className="diagram-card__canvas">
          <p className="note-chart-error">(Diagram could not be rendered)</p>
          <pre><code>{chart}</code></pre>
        </div>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="diagram-card diagram-card--loading" data-inline-content="true">
        <div className="diagram-card__header">
          <span className="diagram-card__badge">Diagram</span>
          <h4 className="diagram-card__title">{inferredTitle}</h4>
        </div>
        <div className="diagram-card__canvas">
          <span className="mermaid-diagram__placeholder">Rendering diagram...</span>
        </div>
      </div>
    )
  }

  return (
    <DiagramCard
      title={inferredTitle}
      badge="Diagram"
      caption={caption}
      rawSvg={svg}
    >
      <div
        className="mermaid-diagram__canvas"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </DiagramCard>
  )
}
