import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { getSubjectById, getLevelById } from '../data/levels'
import {
  getNotesBySubject,
  getBlogPostsBySubject,
  getQuizzesBySubject,
  getVideosBySubject,
} from '../data/content'
import QuizCard from '../components/QuizCard'
import NoteCard from '../components/NoteCard'

type Tab = 'notes' | 'blogs' | 'quizzes' | 'videos'

function SubjectDetails() {
  const { subjectId } = useParams()
  const [activeTab, setActiveTab] = useState<Tab>('notes')

  const subject = subjectId ? getSubjectById(subjectId) : undefined

  if (!subject) {
    return (
      <section>
        <h2>Subject not found</h2>
        <p>This subject does not exist yet.</p>
        <Link to="/subjects">Back to Subjects</Link>
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
      <div className="subject-header">
        <div className="subject-header__bar" style={{ backgroundColor: subject.color }} />
        <div>
          <h2>{subject.title}</h2>
          <p>{subject.description}</p>
          {level && (
            <Link to={`/levels/${level.id}`} className="subject-header__level">
              {level.shortTitle}
            </Link>
          )}
        </div>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab ${activeTab === tab.key ? 'tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'notes' && (
          notes.length === 0 ? (
            <p className="empty-state">No notes yet for this subject.</p>
          ) : (
            <div className="note-card-grid">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} subject={subject} showSubjectTag={false} />
              ))}
            </div>
          )
        )}

        {activeTab === 'blogs' && (
          blogs.length === 0 ? (
            <p className="empty-state">No blog posts yet for this subject.</p>
          ) : (
            <div className="blogs-list">
              {blogs.map((post) => (
                <article className="blog-item" key={post.id}>
                  <h4>{post.title}</h4>
                  <p className="blog-item__date">{post.date}</p>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          )
        )}

        {activeTab === 'quizzes' && (
          quizzes.length === 0 ? (
            <p className="empty-state">No quizzes yet for this subject.</p>
          ) : (
            <div className="quizzes-list">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          )
        )}

        {activeTab === 'videos' && (
          videos.length === 0 ? (
            <p className="empty-state">No videos yet for this subject.</p>
          ) : (
            <div className="videos-list">
              {videos.map((video) => (
                <div className="video-item" key={video.id}>
                  <h4>{video.title}</h4>
                  <p>{video.description}</p>
                  {video.youtubeId ? (
                    <div className="video-embed">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <p className="empty-state">Video not added yet.</p>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <Link to="/subjects" className="back-link">
      Back to Subjects
      </Link>
    </section>
  )
}

export default SubjectDetails
