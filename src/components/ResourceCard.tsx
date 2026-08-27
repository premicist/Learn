import { Link } from 'react-router'
import type { BlogPost, Note, PracticeSet, Quiz, Video } from '../data/content'
import type { Subject } from '../data/levels'

export type ResourceKind = 'notes' | 'blogs' | 'videos' | 'quizzes' | 'practiceSets'
export type Resource = Note | BlogPost | Quiz | Video | PracticeSet

type ResourceCardProps = {
  resource: Resource
  kind: ResourceKind
  subject: Subject
  featured?: boolean
}

function getResourceDetails(resource: Resource, kind: ResourceKind) {
  if (kind === 'notes') {
    const note = resource as Note
    return { title: note.title, summary: note.summary, href: `/notes/${note.id}`, action: 'Read more', label: 'Note' }
  }
  if (kind === 'blogs') {
    const blog = resource as BlogPost
    return { title: blog.title, summary: blog.excerpt, href: `/blogs/${blog.id}`, action: 'Read article', label: 'Blog' }
  }
  if (kind === 'videos') {
    const video = resource as Video
    return { title: video.title, summary: video.description, href: `/videos/${video.id}`, action: 'Watch video', label: 'Video' }
  }
  if (kind === 'quizzes') {
    const quiz = resource as Quiz
    return { title: quiz.title, summary: `${quiz.questions.length} questions with instant feedback`, href: `/quizzes/${quiz.id}`, action: 'Start quiz', label: 'Quiz' }
  }
  const practiceSet = resource as PracticeSet
  return {
    title: practiceSet.title,
    summary: `${practiceSet.questions.length} questions · numerical scored instantly, writing graded by your teacher`,
    href: `/practice-sets/${practiceSet.id}`,
    action: 'Start practice set',
    label: 'Practice set',
  }
}

function ResourceCard({ resource, kind, subject, featured = false }: ResourceCardProps) {
  const details = getResourceDetails(resource, kind)
  const note = kind === 'notes' ? resource as Note : undefined

  return (
    <article className={`resource-card resource-card--${kind} ${featured ? 'resource-card--featured' : ''}`}>
      {note?.image ? (
        <img className="resource-card__image" src={note.image} alt={note.imageAlt || ''} loading="lazy" />
      ) : (
        <div className="resource-card__accent" style={{ backgroundColor: subject.color }} aria-hidden="true" />
      )}
      <div className="resource-card__body">
        <span className="resource-card__label">{details.label}</span>
        <h3><Link to={details.href}>{details.title}</Link></h3>
        <p>{details.summary}</p>
        <Link to={details.href} className="resource-card__action" aria-label={`${details.action}: ${details.title}`}>
          {details.action} →
        </Link>
      </div>
    </article>
  )
}

export default ResourceCard
