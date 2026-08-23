import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { videos as allVideos } from '../data/content'
import { getSubjectById, getSubjectsByLevel, levels, subjects } from '../data/levels'
import Seo from '../components/Seo'

function Videos() {
  const [keyword, setKeyword] = useState('')
  const [levelId, setLevelId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const availableSubjects = levelId ? getSubjectsByLevel(levelId) : subjects
  const videos = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    return allVideos.filter((video) => {
      const subject = getSubjectById(video.subjectId)
      return (!query || `${video.title} ${video.description} ${video.keyTakeaways.join(' ')}`.toLowerCase().includes(query))
        && (!subjectId || video.subjectId === subjectId)
        && (!levelId || subject?.levelId === levelId)
    })
  }, [keyword, levelId, subjectId])

  return (
    <section>
      <Seo title="Economics videos | Prem Pokhrel" description="Economics lesson videos with key takeaways and optional transcripts." />
      <span className="eyebrow">Watch, pause, revise</span>
      <h2>Videos</h2>
      <p>Watch lesson videos and tutorials by subject.</p>

      <div className="content-filters" aria-label="Filter videos">
        <label><span>Search videos</span><input type="search" placeholder="Search by topic or title…" value={keyword} onChange={(event) => setKeyword(event.target.value)} /></label>
        <label><span>Level</span><select value={levelId} onChange={(event) => { setLevelId(event.target.value); setSubjectId('') }}><option value="">All levels</option>{levels.map((level) => <option key={level.id} value={level.id}>{level.shortTitle}</option>)}</select></label>
        <label><span>Subject</span><select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}><option value="">All subjects</option>{availableSubjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}</select></label>
      </div>
      <div className="filter-summary"><span>{videos.length} video{videos.length === 1 ? '' : 's'}</span></div>

      {videos.length === 0 ? <div className="no-results"><p className="empty-state">No videos match those filters.</p></div> : <div className="videos-list">
        {videos.map((video) => {
          const subject = getSubjectById(video.subjectId)
          return (
            <article className="video-item" key={video.id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              {video.youtubeId ? <div className="video-embed"><iframe loading="lazy" src={`https://www.youtube.com/embed/${video.youtubeId}`} title={video.title} allowFullScreen /></div> : <p className="empty-state">Video not added yet.</p>}
              {video.keyTakeaways.length > 0 && <div className="video-support"><h4>Key takeaways</h4><ul className="takeaways">{video.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></div>}
              {video.transcript && <details className="transcript"><summary>Read transcript</summary><p>{video.transcript}</p></details>}
              {subject && <Link to={`/subjects/${subject.id}`} className="note-item__tag">{subject.title}</Link>}
            </article>
          )
        })}
      </div>}
    </section>
  )
}

export default Videos
