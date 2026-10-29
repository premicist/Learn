import { useEffect, useState } from 'react'

type ReadingProgressBarProps = {
  /** Target content container selector (e.g. '.note-page__body', or full document if omitted) */
  targetSelector?: string
}

function ReadingProgressBar({ targetSelector }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const calculateProgress = () => {
      let currentScrolled = 0
      let maxScroll = 0

      if (targetSelector) {
        const el = document.querySelector(targetSelector) as HTMLElement | null
        if (el) {
          const rect = el.getBoundingClientRect()
          const totalHeight = el.scrollHeight || el.offsetHeight
          const windowHeight = window.innerHeight
          currentScrolled = Math.max(0, -rect.top)
          maxScroll = Math.max(1, totalHeight - windowHeight + 100)
        }
      }

      if (!targetSelector || maxScroll <= 1) {
        const docEl = document.documentElement
        const body = document.body
        const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop || 0
        const scrollHeight = Math.max(docEl.scrollHeight, body.scrollHeight)
        const clientHeight = window.innerHeight || docEl.clientHeight
        currentScrolled = scrollTop
        maxScroll = scrollHeight - clientHeight
      }

      if (maxScroll > 120) {
        setIsVisible(true)
        const pct = Math.min(100, Math.max(0, (currentScrolled / maxScroll) * 100))
        setProgress(pct)
      } else {
        setIsVisible(false)
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress)
        ticking = true
      }
    }

    calculateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetSelector])

  if (!isVisible) return null

  return (
    <div
      className="reading-progress-wire"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="reading-progress-wire__fill"
        style={{ width: `${progress}%` }}
      >
        <span className="reading-progress-wire__glow" />
      </div>
    </div>
  )
}

export default ReadingProgressBar

