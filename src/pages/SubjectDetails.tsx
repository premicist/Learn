import { Link, useParams } from 'react-router'
import { getSubjectById, getLevelById, type Subject } from '../data/levels'
import { blogPosts, getBlogPostsBySubject, getNotesBySubject, getQuizzesBySubject, getVideosBySubject, notes, quizzes, videos } from '../data/content'
import { getCurriculumBySubject } from '../data/curriculum'
import CurriculumPath from '../components/CurriculumPath'
import ResourceCard, { type Resource, type ResourceKind } from '../components/ResourceCard'
import ResourceRail from '../components/ResourceRail'
import Seo from '../components/Seo'

type FeaturedSelection = Subject['featured'][number]
type FeaturedEntry = { selection: FeaturedSelection; resource: Resource; kind: ResourceKind }

function formatCount(count: number, label: string) {
  const plural = label === 'quiz' ? 'quizzes' : `${label}s`
  return `${count} ${count === 1 ? label : plural}`
}

function resolveFeaturedResources(subject: Subject): FeaturedEntry[] {
  const lookup: Record<FeaturedSelection['type'], { kind: ResourceKind; resources: Resource[] }> = {
    note: { kind: 'notes', resources: notes },
    blog: { kind: 'blogs', resources: blogPosts },
    quiz: { kind: 'quizzes', resources: quizzes },
    video: { kind: 'videos', resources: videos },
  }

  return subject.featured
    .map((selection) => {
      const collection = lookup[selection.type]
      const resource = collection.resources.find((item) => item.id === selection.id)
      return resource ? { selection, resource, kind: collection.kind } : null
    })
    .filter((entry): entry is FeaturedEntry => entry !== null)
}

function SubjectDetails() {
  const { subjectId } = useParams()
  const subject = subjectId ? getSubjectById(subjectId) : undefined

  if (!subject) {
    return (
      <section>
        <Seo title="Subject not found | Prem Pokhrel" description="The requested economics subject could not be found." />
        <h2>Subject not found</h2>
        <p>This subject does not exist yet.</p>
        <Link to="/subjects">Back to subjects</Link>
      </section>
    )
  }

  const level = getLevelById(subject.levelId)
  const subjectNotes = getNotesBySubject(subject.id)
  const subjectBlogs = getBlogPostsBySubject(subject.id)
  const subjectQuizzes = getQuizzesBySubject(subject.id)
  const subjectVideos = getVideosBySubject(subject.id)
  const featured = resolveFeaturedResources(subject)
  const curriculum = getCurriculumBySubject(subject.id)

  return (
    <section className="subject-hub">
      <Seo title={`${subject.title} | Prem Pokhrel`} description={subject.description} />
      <div className="subject-header">
        <div className="subject-header__bar" style={{ backgroundColor: subject.color }} />
        <div>
          <p className="eyebrow">{level?.shortTitle || 'Economics learning'}</p>
          <h1>{subject.title}</h1>
          <p>{subject.description}</p>
          {level && <Link to={`/levels/${level.id}`} className="subject-header__level">View {level.shortTitle}</Link>}
        </div>
      </div>

      <div className="subject-hub__summary" aria-label="Subject resource summary">
        <span>{formatCount(subjectNotes.length, 'note')}</span>
        <span>{formatCount(subjectBlogs.length, 'blog')}</span>
        <span>{formatCount(subjectVideos.length, 'video')}</span>
        <span>{formatCount(subjectQuizzes.length, 'quiz')}</span>
      </div>

      <section className={`subject-featured ${featured.length === 0 ? 'subject-featured--empty' : ''}`} aria-labelledby="featured-heading">
        <div className="subject-rail__header">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="featured-heading">Featured</h2>
            <p className="subject-rail__hint">Hand-picked resources for this subject</p>
          </div>
          <span className="featured-badge">{featured.length > 0 ? `${featured.length} pinned` : 'Coming soon'}</span>
        </div>
        {featured.length > 0 ? (
          <div className="resource-rail resource-rail--featured" tabIndex={0} aria-label={`Featured resources for ${subject.title}`}>
            {featured.map(({ selection, resource, kind }) => (
              <ResourceCard key={`${selection.type}-${selection.id}`} resource={resource} kind={kind} subject={subject} featured />
            ))}
          </div>
        ) : (
          <p className="empty-state">Featured resources will appear here when they are pinned in the content manager.</p>
        )}
      </section>

      {curriculum && <CurriculumPath curriculum={curriculum} />}

      <ResourceRail title="Notes" kind="notes" resources={subjectNotes} subject={subject} viewAllHref="/notes" viewAllLabel="View all notes" />
      <ResourceRail title="Blogs" kind="blogs" resources={subjectBlogs} subject={subject} viewAllHref="/blogs" viewAllLabel="View all blogs" />
      <ResourceRail title="Videos" kind="videos" resources={subjectVideos} subject={subject} viewAllHref="/videos" viewAllLabel="View all videos" />
      <ResourceRail title="Quizzes" kind="quizzes" resources={subjectQuizzes} subject={subject} viewAllHref="/quizzes" viewAllLabel="View all quizzes" />

      <Link to="/subjects" className="back-link">← Back to subjects</Link>
    </section>
  )
}

export default SubjectDetails
