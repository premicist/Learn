import { useEffect, useState } from 'react'

const SHOW_AFTER_PX = 480

function MoveToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > SHOW_AFTER_PX)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!isVisible) return null

  const moveToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <button type="button" className="move-to-top" onClick={moveToTop} aria-label="Move to top">
      <span aria-hidden="true">↑</span>
      <span>Top</span>
    </button>
  )
}

export default MoveToTop
