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

  const circumference = 81.68
  const strokeOffset = progress
    ? Math.max(0, circumference - (circumference * Math.min(100, Math.max(0, progress.percent))) / 100)
    : circumference

  return (
    <Link
      to={`/subjects/${subject.id}`}
      className="subject-card"
      style={{ '--card-accent': subject.color } as React.CSSProperties}
    >
      <div className="subject-card__header-row">
        <div className="subject-card__bar" style={{ backgroundColor: subject.color }} />
        {progress && progress.total > 0 && (
          <div className="radial-progress-ring" title={`${progress.percent}% completed`}>
            <svg width="34" height="34" viewBox="0 0 34 34" className="radial-progress-ring__svg" aria-hidden="true">
              <circle cx="17" cy="17" r="13" className="radial-progress-ring__track" />
              <circle
                cx="17"
                cy="17"
                r="13"
                className="radial-progress-ring__fill"
                stroke={subject.color || 'var(--teal)'}
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <span className="radial-progress-ring__text">{progress.percent}%</span>
          </div>
        )}
      </div>

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
