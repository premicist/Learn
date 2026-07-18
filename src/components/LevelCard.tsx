import { Link } from 'react-router'
import type { Level } from '../data/levels'

type LevelCardProps = {
  level: Level
  subjectCount: number
}

function LevelCard({ level, subjectCount }: LevelCardProps) {
  return (
    <Link to={`/levels/${level.id}`} className="level-card">
      <h3>{level.title}</h3>
      <p>{level.description}</p>
      <span className="level-card__count">
        {subjectCount} subject{subjectCount === 1 ? '' : 's'}
      </span>
    </Link>
  )
}

export default LevelCard
