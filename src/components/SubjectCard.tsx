import { Link } from 'react-router'
import type { Subject } from '../data/levels'
import { blogPosts, notes, quizzes, videos } from '../data/content'

type SubjectCardProps = {
  subject: Subject
  progress?: { completed: number; total: number; percent: number }
}

function SubjectCard({ subject, progress }: SubjectCardProps) {
  const resourceCount = (label: string, count: number): [string, number] => [label, count]
  const counts = [
    resourceCount('notes', notes.filter((note) => note.subjectId === subject.id).length),
    resourceCount('blogs', blogPosts.filter((post) => post.subjectId === subject.id).length),
    resourceCount('quizzes', quizzes.filter((quiz) => quiz.subjectId === subject.id).length),
    resourceCount('videos', videos.filter((video) => video.subjectId === subject.id).length),
  ].filter(([, count]) => count > 0)

  return (
    <Link to={`/subjects/${subject.id}`} className="subject-card">
      <div className="subject-card__bar" style={{ backgroundColor: subject.color }} />
      <h3>{subject.title}</h3>
      <p>{subject.description}</p>
      {progress && progress.total > 0 ? (
        <div className="subject-card__progress">
          <div className="subject-card__progress-bar">
            <div
              className="subject-card__progress-fill"
              style={{ width: `${progress.percent}%`, backgroundColor: subject.color || 'var(--teal)' }}
            />
          </div>
          <div className="subject-card__progress-meta">
            <span>{progress.completed}/{progress.total} notes completed</span>
            <span className="subject-card__progress-percent">{progress.percent}%</span>
          </div>
        </div>
      ) : (
        <span className="subject-card__counts">
          {counts.length > 0 ? counts.map(([label, count]) => `${count} ${label}`).join(' · ') : 'Resources coming soon'}
        </span>
      )}
    </Link>
  )
}

export default SubjectCard
