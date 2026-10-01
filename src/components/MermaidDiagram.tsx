import { useEffect, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'inherit',
  fontSize: 14,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 35,
    rankSpacing: 40,
    padding: 12,
  },
})

type MermaidDiagramProps = {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

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
          setSvg(renderedSvg)
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
      <div className="mermaid-diagram mermaid-diagram--error" data-inline-content="true">
        <p className="note-chart-error">(Diagram could not be rendered)</p>
        <pre><code>{chart}</code></pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="mermaid-diagram mermaid-diagram--loading" data-inline-content="true">
        <span className="mermaid-diagram__placeholder">Rendering diagram...</span>
      </div>
    )
  }

  return (
    <figure className="mermaid-diagram" data-inline-content="true">
      <div
        className="mermaid-diagram__canvas"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  )
}
