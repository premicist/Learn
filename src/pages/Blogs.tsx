import { Link } from 'react-router'
import { blogPosts } from '../data/content'
import { getSubjectById } from '../data/levels'

function Blogs() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <section>
      <h2>Blogs</h2>
      <p>Articles and explainers to complement your study notes.</p>

      <div className="blogs-list">
        {sorted.map((post) => {
          const subject = getSubjectById(post.subjectId)
          return (
            <article className="blog-item" key={post.id}>
              <h4>{post.title}</h4>
              <p className="blog-item__date">{post.date}</p>
              <p>{post.excerpt}</p>
              {subject && (
                <Link to={`/subjects/${subject.id}`} className="note-item__tag">
                  {subject.title}
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Blogs
