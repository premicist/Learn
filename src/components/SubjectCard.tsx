import { Link } from 'react-router'
import type { Subject } from '../data/levels'

type SubjectCardProps = {
  subject: Subject
}

function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link to={`/subjects/${subject.id}`} className="subject-card">
      <div className="subject-card__bar" style={{ backgroundColor: subject.color }} />
      <h3>{subject.title}</h3>
      <p>{subject.description}</p>
    </Link>
  )
}

export default SubjectCard
