import { Link, useParams } from 'react-router'
import { getVideoById } from '../data/content'
import { getSubjectById } from '../data/levels'
import Seo from '../components/Seo'
import { getCurriculumBySubject } from '../data/curriculum'
import UnitContext from '../components/UnitContext'

function VideoPage() {
  const { videoId } = useParams()
  const video = videoId ? getVideoById(videoId) : undefined
  const subject = video ? getSubjectById(video.subjectId) : undefined
  const curriculum = video ? getCurriculumBySubject(video.subjectId) : undefined

  if (!video || !subject) {
    return (
      <section>
        <Seo title="Video not found | Prem Pokhrel" description="The requested economics video could not be found." />
        <h2>Video not found</h2>
        <Link to="/videos">Back to videos</Link>
      </section>
    )
  }

  return (
    <section className="article-page">
      <Seo title={`${video.title} | Prem Pokhrel`} description={video.description} type="video.other" />
      <p className="eyebrow">Video lesson</p>
      <div className="article-page__meta">
        <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
      </div>
      <h1>{video.title}</h1>
      <p className="article-page__excerpt">{video.description}</p>
      {video.youtubeId ? (
        <div className="video-embed video-embed--detail">
          <iframe loading="eager" src={`https://www.youtube.com/embed/${video.youtubeId}`} title={video.title} allowFullScreen />
        </div>
      ) : (
        <p className="empty-state">Video not added yet. Review the key takeaways below while it is being prepared.</p>
      )}
      {video.keyTakeaways.length > 0 && (
        <div className="video-support">
          <h2>Key takeaways</h2>
          <ul className="takeaways">{video.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
        </div>
      )}
      {video.transcript && <details className="transcript"><summary>Read transcript</summary><p>{video.transcript}</p></details>}
      {curriculum && <UnitContext curriculum={curriculum} currentResourceType="video" currentResourceId={video.id} subjectTitle={subject.title} />}
      <Link to={`/subjects/${subject.id}`} className="back-link">← Back to {subject.title}</Link>
    </section>
  )
}

export default VideoPage
