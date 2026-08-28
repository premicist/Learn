import { useEffect, useRef } from 'react'
import type { ScheduledLeaderboardRow } from '../lib/scheduledTests'

type LeaderboardModalProps = {
  title: string
  closedAt: string
  rows: ScheduledLeaderboardRow[]
  error?: string
  onClose: () => void
}

function rankClass(position: number) {
  if (position === 1) return 'scheduled-leaderboard__row--gold'
  if (position === 2) return 'scheduled-leaderboard__row--silver'
  if (position === 3) return 'scheduled-leaderboard__row--bronze'
  return ''
}

function LeaderboardModal({ title, closedAt, rows, error, onClose }: LeaderboardModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="leaderboard-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="leaderboard-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaderboard-modal-title"
      >
        <div className="leaderboard-modal__header">
          <div>
            <p className="eyebrow">Top 10 results</p>
            <h2 id="leaderboard-modal-title">{title}</h2>
            <p className="leaderboard-modal__meta">Closed {closedAt}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="leaderboard-modal__close"
            onClick={onClose}
            aria-label="Close leaderboard"
          >
            ×
          </button>
        </div>
        {error && <p className="scheduled-summary__error">Leaderboard is temporarily unavailable.</p>}
        {!error && rows.length === 0 && (
          <p className="empty-state">No leaderboard results are available yet.</p>
        )}
        {rows.length > 0 && (
          <div className="scheduled-leaderboard-wrap scheduled-leaderboard-wrap--modal">
            <table className="scheduled-leaderboard">
              <caption className="visually-hidden">Top 10 results for {title}</caption>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.position}-${row.roll_no}`} className={rankClass(row.position)}>
                    <td>{row.position}</td>
                    <td>{row.roll_no}</td>
                    <td>{row.class}</td>
                    <td>{row.section}</td>
                    <td>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardModal
