import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getSubjectById, getLevelById } from '../data/levels'
import { getNotesBySubject, getBlogPostsBySubject, getQuizzesBySubject, getVideosBySubject } from '../data/content'
import QuizCard from '../components/QuizCard'
import NoteCard from '../components/NoteCard'
import Seo from '../components/Seo'

type Tab = 'notes' | 'blogs' | 'quizzes' | 'videos'

function SubjectDetails() {
  const { subjectId } = useParams()
  const [activeTab, setActiveTab] = useState<Tab>('notes')
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
  const notes = getNotesBySubject(subject.id)
  const blogs = getBlogPostsBySubject(subject.id)
  const quizzes = getQuizzesBySubject(subject.id)
  const videos = getVideosBySubject(subject.id)
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'notes', label: 'Notes', count: notes.length },
    { key: 'blogs', label: 'Blogs', count: blogs.length },
    { key: 'quizzes', label: 'Quizzes', count: quizzes.length },
    { key: 'videos', label: 'Videos', count: videos.length },
  ]

  return (
    <section>
      <Seo title={`${subject.title} | Prem Pokhrel`} description={subject.description} />
      <div className="subject-header">
        <div className="subject-header__bar" style={{ backgroundColor: subject.color }} />
        <div>
          <p className="eyebrow">{level?.shortTitle || 'Economics learning'}</p>
          <h2>{subject.title}</h2>
          <p>{subject.description}</p>
          {level && <Link to={`/levels/${level.id}`} className="subject-header__level">View {level.shortTitle}</Link>}
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label={`${subject.title} resources`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={activeTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            className={`tab ${activeTab === tab.key ? 'tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'notes' && <div id="panel-notes" role="tabpanel" aria-labelledby="tab-notes">
          {notes.length === 0 ? <p className="empty-state">No notes yet for this subject.</p> : <div className="note-card-grid">{notes.map((note) => <NoteCard key={note.id} note={note} subject={subject} showSubjectTag={false} />)}</div>}
        </div>}
        {activeTab === 'blogs' && <div id="panel-blogs" role="tabpanel" aria-labelledby="tab-blogs">
          {blogs.length === 0 ? <p className="empty-state">No blog posts yet for this subject.</p> : <div className="blogs-list">{blogs.map((post) => <article className="blog-item" key={post.id}><div className="blog-item__meta"><time dateTime={post.date}>{post.date}</time></div><h3><Link to={`/blogs/${post.id}`}>{post.title}</Link></h3><p>{post.excerpt}</p></article>)}</div>}
        </div>}
        {activeTab === 'quizzes' && <div id="panel-quizzes" role="tabpanel" aria-labelledby="tab-quizzes">
          {quizzes.length === 0 ? <p className="empty-state">No quizzes yet for this subject.</p> : <div className="quizzes-list">{quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}</div>}
        </div>}
        {activeTab === 'videos' && <div id="panel-videos" role="tabpanel" aria-labelledby="tab-videos">
          {videos.length === 0 ? <p className="empty-state">No videos yet for this subject.</p> : <div className="videos-list">{videos.map((video) => <div className="video-item" key={video.id}><h3>{video.title}</h3><p>{video.description}</p>{video.youtubeId ? <div className="video-embed"><iframe loading="lazy" src={`https://www.youtube.com/embed/${video.youtubeId}`} title={video.title} allowFullScreen /></div> : <p className="empty-state">Video not added yet. Review the key takeaways below.</p>}{video.keyTakeaways.length > 0 && <ul className="takeaways">{video.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>}</div>)}</div>}
        </div>}
      </div>

      <Link to="/subjects" className="back-link">← Back to subjects</Link>
    </section>
  )
}

export default SubjectDetails
