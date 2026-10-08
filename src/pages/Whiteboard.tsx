import Seo from '../components/Seo'
import { lazy, Suspense } from 'react'

const WhiteboardCanvas = lazy(() => import('../components/WhiteboardCanvas'))
import { useWhiteboard } from '../utils/useWhiteboard'

function Whiteboard() {
  const { initialData, handleChange, clearCanvas } = useWhiteboard()

  return (
    <section className="whiteboard-page">
      <Seo
        title="Whiteboard | Prem Pokhrel"
        description="Draw economics diagrams interactively — axes, demand and supply curves, cost curves, PPC, and more."
      />
      <div className="whiteboard-shell">
        <span className="eyebrow">Sketch. Drag. Export.</span>
        <h2>Whiteboard</h2>
        <p>Insert pre-drawn curves below, then drag, rotate, relabel and export your diagram as PNG or SVG.</p>
        <Suspense fallback={<div className="route-loading" role="status">Loading editor…</div>}>
          <WhiteboardCanvas
            initialData={initialData}
            onChange={handleChange}
            clearCanvas={clearCanvas}
          />
        </Suspense>
      </div>
    </section>
  )
}

export default Whiteboard