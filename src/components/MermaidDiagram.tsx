import { lazy, Suspense, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Lazy-load the inner Mermaid diagram component to keep the main bundle light
const MermaidDiagramInner = lazy(() => import('./MermaidDiagramInner'))

type MermaidDiagramProps = {
  chart: string
  title?: string
  caption?: string
}

export default function MermaidDiagram({ chart, title, caption }: MermaidDiagramProps) {
  const [loadError, setLoadError] = useState<string | null>(null)

  const errorCard = (msg?: string) => (
    <div className="diagram-card diagram-card--error" data-inline-content="true">
      <div className="diagram-card__header">
        <span className="diagram-card__badge">Diagram</span>
        <h4 className="diagram-card__title">{title || 'Mermaid Diagram'}</h4>
      </div>
      <div className="diagram-card__canvas">
        <p className="note-chart-error">({msg || 'Diagram could not be rendered'})</p>
        <pre><code>{chart}</code></pre>
      </div>
    </div>
  )

  if (loadError) {
    return errorCard(loadError)
  }

  return (
    <ErrorBoundary
      fallbackTitle={title ? `Diagram: ${title}` : 'Mermaid Diagram'}
      fallback={errorCard()}
      onError={(err) => setLoadError(err.message)}
    >
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
        <MermaidDiagramInner chart={chart} title={title} caption={caption} />
      </Suspense>
    </ErrorBoundary>
  )
}
