import { Link } from 'react-router'
import { blogPosts, notes, quizzes, videos } from '../data/content'

type InlineResourceType = 'note' | 'blog' | 'quiz' | 'video'

type InlineResourceProps = {
  resourceType?: string
  resourceId?: string
  label?: string
}

type InlineResourceItem = {
  kind: string
  title: string
  summary: string
  href: string
}

function findResource(resourceType: InlineResourceType, resourceId: string): InlineResourceItem | undefined {
  if (resourceType === 'note') {
    const resource = notes.find((item) => item.id === resourceId)
    return resource && { kind: 'Note', title: resource.title, summary: resource.summary, href: `/notes/${resource.id}` }
  }
  if (resourceType === 'blog') {
    const resource = blogPosts.find((item) => item.id === resourceId)
    return resource && { kind: 'Blog', title: resource.title, summary: resource.excerpt, href: `/blogs/${resource.id}` }
  }
  if (resourceType === 'quiz') {
    const resource = quizzes.find((item) => item.id === resourceId)
    return resource && { kind: 'Quiz', title: resource.title, summary: `${resource.questions.length} questions with instant feedback`, href: `/quizzes/${resource.id}` }
  }
  const resource = videos.find((item) => item.id === resourceId)
  return resource && { kind: 'Video', title: resource.title, summary: resource.description, href: `/videos/${resource.id}` }
}

function InlineResource({ resourceType, resourceId, label }: InlineResourceProps) {
  const type = resourceType as InlineResourceType
  const resource = resourceId && ['note', 'blog', 'quiz', 'video'].includes(type)
    ? findResource(type, resourceId)
    : undefined

  if (!resource || !resourceId) {
    return (
      <aside className="inline-resource inline-resource--missing" aria-label="Unavailable inline resource">
        <span className="inline-resource__eyebrow">Resource link</span>
        <strong>{label || resourceId || 'Resource not selected'}</strong>
        <span>This resource is not available yet.</span>
      </aside>
    )
  }

  return (
    <aside className="inline-resource" aria-label={`Related ${resource.kind.toLowerCase()}`}>
      <span className="inline-resource__eyebrow">Related {resource.kind}</span>
      <Link to={resource.href} className="inline-resource__link">{label || resource.title} <span aria-hidden="true">→</span></Link>
      <span className="inline-resource__summary">{resource.summary}</span>
    </aside>
  )
}

export default InlineResource
