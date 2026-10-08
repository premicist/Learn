import { lazy, Suspense, useEffect, useState } from 'react'

// Lazy-load the inner Mermaid diagram component to keep the main bundle light
const MermaidDiagramInner = lazy(() => import('./MermaidDiagramInner'))

type MermaidDiagramProps = {
  chart: string
  title?: string
  caption?: string
}

export default function MermaidDiagram({ chart, title, caption }: MermaidDiagramProps) {
  const [loadError, setLoadError] = useState<string | null>(null)

  if (loadError) {
    return (
      <div className="diagram-card diagram-card--error" data-inline-content="true">
        <div className="diagram-card__header">
          <span className="diagram-card__badge">Diagram</span>
          <h4 className="diagram-card__title">{title || 'Mermaid Diagram'}</h4>
        </div>
        <div className="diagram-card__canvas">
          <p className="note-chart-error">(Diagram could not be rendered)</p>
          <pre><code>{chart}</code></pre>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="diagram-card diagram-card--loading" data-inline-content="true">
          <div className="diagram-card__header">
            <span className="diagram-card__badge">Diagram</span>
            <h4 className="diagram-card__title">{title || 'Diagram'}</h4>
          </div>
          <div className="diagram-card__canvas">
            <span className="mermaid-diagram__placeholder">Loading diagram...</span>
          </div>
        </div>
      }
    >
      <MermaidDiagramFallback onError={setLoadError}>
        <MermaidDiagramInner chart={chart} title={title} caption={caption} />
      </MermaidDiagramFallback>
    </Suspense>
  )
}

// Custom simple fallback/error handler in case of network or component failures
function MermaidDiagramFallback({
  children,
  onError,
}: {
  children: React.ReactNode
  onError: (err: string) => void
}) {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e?.error?.message?.includes('mermaid') || e?.message?.includes('mermaid')) {
        onError('Diagram failed to load')
      }
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [onError])

  return children
}



