import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getSubjectById, getLevelById, type Subject } from '../data/levels'
import { blogPosts, getBlogPostsBySubject, getNotesBySubject, getPracticeSetsBySubject, getQuizzesBySubject, getScheduledTestsBySubject, getVideosBySubject, notes, quizzes, videos } from '../data/content'
import { getCurriculumBySubject } from '../data/curriculum'
import CurriculumPath from '../components/CurriculumPath'
import ResourceCard, { type Resource, type ResourceKind } from '../components/ResourceCard'
import ResourceRail from '../components/ResourceRail'
import Seo from '../components/Seo'
import ScheduledTestSummary from '../components/ScheduledTestSummary'
import { useLessonProgress } from '../utils/useLessonProgress'

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
  const { isCompleted } = useLessonProgress()
  const [searchQuery, setSearchQuery] = useState('')

  const level = subject ? getLevelById(subject.levelId) : undefined
  const subjectNotes = subject ? getNotesBySubject(subject.id) : []
  const subjectBlogs = subject ? getBlogPostsBySubject(subject.id) : []
  const subjectQuizzes = subject ? getQuizzesBySubject(subject.id) : []
  const subjectVideos = subject ? getVideosBySubject(subject.id) : []
  const subjectPracticeSets = subject ? getPracticeSetsBySubject(subject.id) : []
  const subjectScheduledTests = subject ? getScheduledTestsBySubject(subject.id) : []
  const featured = subject ? resolveFeaturedResources(subject) : []
  const curriculum = subject ? getCurriculumBySubject(subject.id) : undefined

  // Calculate overall syllabus progress
  const allLessonIds = useMemo(() => {
    if (!curriculum) return []
    return curriculum.units.flatMap((u) => u.lessons.map((l) => l.id))
  }, [curriculum])

  const completedCount = allLessonIds.filter(isCompleted).length
  const progressPercent = allLessonIds.length > 0 ? Math.round((completedCount / allLessonIds.length) * 100) : 0

  // Filter notes and topics by search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase().trim()
    return subjectNotes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    )
  }, [subjectNotes, searchQuery])

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

      {/* Resource Count Summary */}
      <div className="subject-hub__summary" aria-label="Subject resource summary">
        <span>{formatCount(subjectNotes.length, 'note')}</span>
        <span>{formatCount(subjectBlogs.length, 'blog')}</span>
        <span>{formatCount(subjectVideos.length, 'video')}</span>
        <span>{formatCount(subjectQuizzes.length, 'quiz')}</span>
        <span>{formatCount(subjectPracticeSets.length, 'practice set')}</span>
      </div>

      {/* Overall Syllabus Completion Progress Card */}
      {allLessonIds.length > 0 && (
        <div className="subject-progress-card">
          <div className="subject-progress-card__info">
            <div>
              <span className="subject-progress-card__label">Course Progress</span>
              <strong>{completedCount} of {allLessonIds.length} syllabus topics completed</strong>
            </div>
            <span className="subject-progress-card__pct">{progressPercent}%</span>
          </div>
          <div className="subject-progress-card__track">
            <div className="subject-progress-card__fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      )}

      {/* Featured Resources (Only if pinned) */}
      {featured.length > 0 && (
        <section className="subject-featured" aria-labelledby="featured-heading">
          <div className="subject-rail__header">
            <div>
              <p className="eyebrow">Start here</p>
              <h2 id="featured-heading">Featured Highlights</h2>
              <p className="subject-rail__hint">Hand-picked foundational topics for {subject.title}</p>
            </div>
            <span className="featured-badge">{featured.length} pinned</span>
          </div>
          <div className="resource-rail resource-rail--featured" tabIndex={0} aria-label={`Featured resources for ${subject.title}`}>
            {featured.map(({ selection, resource, kind }) => (
              <ResourceCard key={`${selection.type}-${selection.id}`} resource={resource} kind={kind} subject={subject} featured />
            ))}
          </div>
        </section>
      )}

      {/* In-Page Quick Lesson / Note Search Filter */}
      <div className="subject-search-bar">
        <span className="subject-search-bar__icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          placeholder={`Search ${subject.title} topics, notes, formulas...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="subject-search-bar__input"
          aria-label={`Search within ${subject.title}`}
        />
        {searchQuery && (
          <button
            type="button"
            className="subject-search-bar__clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Instant Search Results (if searching) */}
      {searchQuery.trim() && (
        <section className="subject-search-results" aria-label="Search results">
          <p className="subject-search-results__count">
            Found <strong>{filteredNotes.length}</strong> matching notes for &ldquo;{searchQuery}&rdquo;:
          </p>
          {filteredNotes.length > 0 ? (
            <div className="subject-search-grid">
              {filteredNotes.map((note) => (
                <Link to={`/notes/${note.id}`} key={note.id} className="subject-search-card">
                  <div className="subject-search-card__eyebrow">Note</div>
                  <strong>{note.title}</strong>
                  <p>{note.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty-state">No matching notes found for &ldquo;{searchQuery}&rdquo;.</p>
          )}
        </section>
      )}

      {/* Guided Curriculum Syllabus */}
      {curriculum && <CurriculumPath curriculum={curriculum} notes={subjectNotes} />}

      {/* Scheduled Tests (Only rendered if there are tests) */}
      {subjectScheduledTests.length > 0 && (
        <section className="subject-scheduled-tests" aria-labelledby="subject-scheduled-tests-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Occasional exam-style assessment</p>
              <h2 id="subject-scheduled-tests-heading">Scheduled Tests</h2>
            </div>
          </div>
          <ScheduledTestSummary subjectTitle={subject.title} tests={subjectScheduledTests} />
        </section>
      )}

      {/* Resource Rails (Only rendered for non-empty categories) */}
      {subjectNotes.length > 0 && (
        <ResourceRail title="All Subject Notes" kind="notes" resources={subjectNotes} subject={subject} viewAllHref="/notes" viewAllLabel="View all notes catalog" />
      )}
      {subjectBlogs.length > 0 && (
        <ResourceRail title="Articles & Explanations" kind="blogs" resources={subjectBlogs} subject={subject} viewAllHref="/blogs" viewAllLabel="View all blogs" />
      )}
      {subjectVideos.length > 0 && (
        <ResourceRail title="Video Lessons" kind="videos" resources={subjectVideos} subject={subject} viewAllHref="/videos" viewAllLabel="View all videos" />
      )}
      {subjectQuizzes.length > 0 && (
        <ResourceRail title="Quizzes" kind="quizzes" resources={subjectQuizzes} subject={subject} viewAllHref="/quizzes" viewAllLabel="View all quizzes" />
      )}
      {subjectPracticeSets.length > 0 && (
        <ResourceRail
          title="Practice Sets"
          kind="practiceSets"
          resources={subjectPracticeSets}
          subject={subject}
          viewAllHref="/practice-sets"
          viewAllLabel="View all practice sets"
        />
      )}

      <Link to="/subjects" className="back-link">← Back to subjects</Link>
    </section>
  )
}

export default SubjectDetails
