import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { blogPosts } from '../data/content'
import { getSubjectById, getSubjectsByLevel, levels, subjects } from '../data/levels'
import Seo from '../components/Seo'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Blogs() {
  const [keyword, setKeyword] = useState('')
  const [levelId, setLevelId] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const availableSubjects = levelId ? getSubjectsByLevel(levelId) : subjects
  const results = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    return [...blogPosts]
      .filter((post) => {
        const subject = getSubjectById(post.subjectId)
        const searchable = `${post.title} ${post.excerpt} ${post.body}`.toLowerCase()
        return (!query || searchable.includes(query))
          && (!subjectId || post.subjectId === subjectId)
          && (!levelId || subject?.levelId === levelId)
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [keyword, levelId, subjectId])

  const isFiltered = keyword.trim() !== '' || levelId !== '' || subjectId !== ''

  function clearFilters() {
    setKeyword('')
    setLevelId('')
    setSubjectId('')
  }

  return (
    <section>
      <Seo
        title="Economics blogs | Prem Pokhrel"
        description="Readable economics articles and explainers for school, bachelor’s, and master’s level learners."
      />
      <span className="eyebrow">Ideas beyond the textbook</span>
      <h2>Blogs</h2>
      <p>Articles and explainers to complement your study notes.</p>

      <div className="content-filters" aria-label="Filter blog posts">
        <label>
          <span>Search blogs</span>
          <input
            type="search"
            placeholder="Search by topic or title…"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>
        <label>
          <span>Level</span>
          <select value={levelId} onChange={(event) => { setLevelId(event.target.value); setSubjectId('') }}>
            <option value="">All levels</option>
            {levels.map((level) => <option key={level.id} value={level.id}>{level.shortTitle}</option>)}
          </select>
        </label>
        <label>
          <span>Subject</span>
          <select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
            <option value="">All subjects</option>
            {availableSubjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
          </select>
        </label>
      </div>

      {isFiltered && (
        <div className="filter-summary">
          <span>{results.length} article{results.length === 1 ? '' : 's'} found</span>
          <button type="button" className="text-button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}

      {results.length === 0 ? (
        <div className="no-results">
          <p className="empty-state">No articles match those filters.</p>
          <button type="button" className="text-button" onClick={clearFilters}>Show all articles</button>
        </div>
      ) : (
        <div className="blogs-list">
          {results.map((post) => {
            const subject = getSubjectById(post.subjectId)
            return (
              <article className="blog-item" key={post.id}>
                <div className="blog-item__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {subject && <Link to={`/subjects/${subject.id}`} className="note-item__tag">{subject.title}</Link>}
                </div>
                <h3><Link to={`/blogs/${post.id}`}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link to={`/blogs/${post.id}`} className="see-more-link">Read article →</Link>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Blogs
