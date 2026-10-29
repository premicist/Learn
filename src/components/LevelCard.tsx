import { Link } from 'react-router'
import type { Level } from '../data/levels'

type LevelCardProps = {
  level: Level
  subjectCount: number
  index?: number
  progress?: { completed: number; total: number; percent: number }
  isUserLevel?: boolean
}

function LevelCard({ level, subjectCount, index, progress, isUserLevel }: LevelCardProps) {
  const circumference = 72.26
  const strokeOffset = progress
    ? Math.max(0, circumference - (circumference * Math.min(100, Math.max(0, progress.percent))) / 100)
    : circumference

  return (
    <Link to={`/levels/${level.id}`} className={`level-card ${isUserLevel ? 'level-card--active-track' : ''}`}>
      <div className="level-card__header-row">
        {typeof index === 'number' && (
          <span className="level-card__number">
            {isUserLevel ? '★ YOUR TRACK · ' : ''}
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        {progress && progress.total > 0 && (
          <div className="radial-progress-ring radial-progress-ring--sm" title={`${progress.percent}% completed`}>
            <svg width="30" height="30" viewBox="0 0 30 30" className="radial-progress-ring__svg" aria-hidden="true">
              <circle cx="15" cy="15" r="11.5" className="radial-progress-ring__track" />
              <circle
                cx="15"
                cy="15"
                r="11.5"
                className="radial-progress-ring__fill"
                stroke="var(--teal)"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <span className="radial-progress-ring__text">{progress.percent}%</span>
          </div>
        )}
      </div>

      <h3>{level.title}</h3>
      <p>{level.description}</p>
      <span className="level-card__count">
        {subjectCount} subject{subjectCount === 1 ? '' : 's'}
      </span>
      {progress && progress.total > 0 && (
        <div className="level-card__progress">
          <div className="level-card__progress-bar">
            <div className="level-card__progress-fill" style={{ width: `${progress.percent}%` }} />
          </div>
          <span className="level-card__progress-text">
            {progress.completed}/{progress.total} notes ({progress.percent}%)
          </span>
        </div>
      )}
    </Link>
  )
}

export default LevelCard
