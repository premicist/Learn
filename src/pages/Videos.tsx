import { useMemo, useState } from 'react'
import { videos as allVideos } from '../data/content'
import { getSubjectById, subjects } from '../data/levels'
import Seo from '../components/Seo'
import SubjectPicker from '../components/SubjectPicker'
import VideoModal from '../components/VideoModal'
import { groupByTopic } from '../utils/resourceGrouping'
import type { Video } from '../data/content'

function Videos() {
  const [subjectId, setSubjectId] = useState('')
  const [topicTitle, setTopicTitle] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const subject = subjectId ? getSubjectById(subjectId) : undefined
  const subjectVideos = useMemo(() => allVideos.filter((video) => video.subjectId === subjectId), [subjectId])
  const topicGroups = useMemo(() => groupByTopic(subjectVideos, 'video', (video) => video.topic), [subjectVideos])
  const selectedTopic = topicGroups.find((group) => group.title === topicTitle)
  const query = keyword.trim().toLowerCase()
  const visibleVideos = (selectedTopic?.items || []).filter((video) => !query || `${video.title} ${video.description} ${video.keyTakeaways.join(' ')}`.toLowerCase().includes(query))

  function chooseSubject(nextSubjectId: string) {
    setSubjectId(nextSubjectId)
    setTopicTitle('')
    setKeyword('')
    setSelectedVideo(null)
  }

  function chooseTopic(nextTopic: string) {
    setTopicTitle(nextTopic)
    setKeyword('')
  }

  return (
    <section>
      <Seo title="Economics videos | Prem Pokhrel" description="Choose a subject and topic, then watch economics lesson videos in a focused page modal." />
      <span className="eyebrow">Watch, pause, revise</span>
      <h1>Videos</h1>
      <p>Choose a subject and topic, then watch the available lessons without leaving this page.</p>

      {!subject ? (
        <SubjectPicker subjects={subjects} resourceLabel="video" getCount={(id) => allVideos.filter((video) => video.subjectId === id).length} onSelect={chooseSubject} />
      ) : (
        <>
          <div className="discovery-breadcrumbs">
            <button type="button" onClick={() => chooseSubject('')}>All subjects</button>
            <span aria-hidden="true">/</span>
            <strong>{subject.title}</strong>
            {topicTitle && <><span aria-hidden="true">/</span><strong>{topicTitle}</strong></>}
          </div>

          <section className="discovery-header" aria-labelledby="video-subject-heading">
            <div>
              <p className="eyebrow">{subject.levelId}</p>
              <h2 id="video-subject-heading">{subject.title}</h2>
              <p>{subject.description}</p>
            </div>
            <span className="discovery-count">{subjectVideos.length} video{subjectVideos.length === 1 ? '' : 's'}</span>
          </section>

          {!topicTitle ? (
            <section className="topic-directory" aria-labelledby="video-topics-heading">
              <div className="discovery-section-heading">
                <div>
                  <p className="eyebrow">Choose a topic</p>
                  <h2 id="video-topics-heading">Topics</h2>
                </div>
              </div>
              <div className="topic-directory__grid">
                {topicGroups.map((group, index) => (
                  <button type="button" className="topic-directory__card" key={group.title} onClick={() => chooseTopic(group.title)}>
                    <span className="topic-directory__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{group.title}</strong>
                      <span>{group.items.length} video{group.items.length === 1 ? '' : 's'} <span aria-hidden="true">→</span></span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className="set-directory" aria-labelledby="video-list-heading">
              <div className="discovery-section-heading">
                <div>
                  <p className="eyebrow">{topicTitle}</p>
                  <h2 id="video-list-heading">Available videos</h2>
                </div>
                <button type="button" className="text-button" onClick={() => chooseTopic('')}>Change topic</button>
              </div>
              <label className="discovery-search">
                <span>Search this topic</span>
                <input type="search" placeholder="Search by title or concept…" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
              </label>
              {visibleVideos.length > 0 ? (
                <div className="set-directory__grid">
                  {visibleVideos.map((video) => (
                    <button type="button" className="set-directory__card set-directory__card--video" key={video.id} onClick={() => setSelectedVideo(video)}>
                      <span className="set-directory__card-topline"><span>{video.youtubeId ? 'Watch now' : 'Coming soon'}</span><span>{video.keyTakeaways.length} takeaways</span></span>
                      <strong>{video.title}</strong>
                      <span>{video.description}</span>
                      <span className="set-directory__action">Open video <span aria-hidden="true">↗</span></span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No videos match that search.</p>
              )}
            </section>
          )}
        </>
      )}

      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </section>
  )
}

export default Videos
