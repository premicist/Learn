import { Link } from 'react-router'
import { videos } from '../data/content'
import { getSubjectById } from '../data/levels'

function Videos() {
  return (
    <section>
      <h2>Videos</h2>
      <p>Watch lesson videos and tutorials by subject.</p>

      <div className="videos-list">
        {videos.map((video) => {
          const subject = getSubjectById(video.subjectId)
          return (
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
              {subject && (
                <Link to={`/subjects/${subject.id}`} className="note-item__tag">
                  {subject.title}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Videos
