import { Link, useParams } from 'react-router'
import { blogPosts, notes } from '../data/content'
import { getSubjectById } from '../data/levels'
import NoteMarkdown from '../components/NoteMarkdown'
import Seo from '../components/Seo'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function BlogPage() {
  const { blogId } = useParams()
  const post = blogPosts.find((item) => item.id === blogId)

  if (!post) {
    return (
      <section>
        <Seo title="Article not found | Prem Pokhrel" description="The requested article could not be found." />
        <p className="empty-state">This article couldn&apos;t be found.</p>
        <Link to="/blogs" className="back-link">← Back to blogs</Link>
      </section>
    )
  }

  const subject = getSubjectById(post.subjectId)
  const relatedNotes = notes
    .filter((note) => note.subjectId === post.subjectId)
    .slice(0, 3)

  return (
    <article className="article-page">
      <Seo
        title={`${post.title} | Prem Pokhrel`}
        description={post.excerpt}
        type="article"
        image={post.image || undefined}
      />
      <div className="article-page__meta">
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{readingTime(post.body)}</span>
        {subject && <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>}
      </div>
      <h1>{post.title}</h1>
      <p className="article-page__excerpt">{post.excerpt}</p>
      {post.image && <img className="article-page__image" src={post.image} alt="" />}
      <div className="article-page__body">
        <NoteMarkdown content={post.body} />
      </div>

      {relatedNotes.length > 0 && (
        <aside className="related-content" aria-labelledby="related-notes-heading">
          <h2 id="related-notes-heading">Continue with these notes</h2>
          <div className="related-content__grid">
            {relatedNotes.map((note) => (
              <Link to={`/notes/${note.id}`} className="related-content__card" key={note.id}>
                <strong>{note.title}</strong>
                <span>{note.summary}</span>
              </Link>
            ))}
          </div>
        </aside>
      )}
      <Link to="/blogs" className="back-link">← Back to all blogs</Link>
    </article>
  )
}

export default BlogPage
