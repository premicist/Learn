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
  return (
    <Link to={`/levels/${level.id}`} className={`level-card ${isUserLevel ? 'level-card--active-track' : ''}`}>
      {typeof index === 'number' && (
        <span className="level-card__number">
          {isUserLevel ? '★ YOUR TRACK · ' : ''}
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
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
