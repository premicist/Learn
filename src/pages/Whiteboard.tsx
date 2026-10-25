import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'
import Seo from '../components/Seo'
import { useWhiteboard } from '../utils/useWhiteboard'

const WhiteboardCanvas = lazy(() => import('../components/WhiteboardCanvas'))

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class WhiteboardErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Whiteboard crashed:', error, errorInfo)
  }

  handleReset = () => {
    try {
      localStorage.removeItem('learn:whiteboard-scene')
    } catch {
      // ignore
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="wb-error-boundary" role="alert">
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <h3>Whiteboard encountered an issue</h3>
          <p>
            {this.state.error?.message ||
              'A cached drawing state or canvas initialization error occurred.'}
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleReset}
            >
              Reset Canvas & Reload
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function Whiteboard() {
  const { initialData, handleChange, clearCanvas } = useWhiteboard()

  return (
    <section className="whiteboard-page">
      <Seo
        title="Economics Whiteboard & Diagram Editor | Prem Pokhrel"
        description="Interactive economics whiteboard: drop ready-to-use market equilibrium, cost curves, PPC, and surplus diagrams, sketch with stylus/pen, and export high-resolution PNG or SVG."
      />
      <div className="whiteboard-shell">
        <div className="whiteboard-header">
          <div>
            <span className="eyebrow">Interactive Studio</span>
            <h2>Economics Whiteboard</h2>
          </div>
          <p className="whiteboard-subtitle">
            Insert pre-built economic models, adjust labels, sketch curve shifts, and export clean graphics for study or presentations.
          </p>
        </div>

        <WhiteboardErrorBoundary>
          <Suspense fallback={<div className="route-loading" role="status">Loading interactive whiteboard…</div>}>
            <WhiteboardCanvas
              initialData={initialData}
              onChange={handleChange}
              clearCanvas={clearCanvas}
            />
          </Suspense>
        </WhiteboardErrorBoundary>
      </div>
    </section>
  )
}

export default Whiteboard
