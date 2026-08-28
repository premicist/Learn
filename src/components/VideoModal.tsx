import { useEffect, useRef } from 'react'
import type { Video } from '../data/content'

type VideoModalProps = {
  video: Video
  onClose: () => void
}

function VideoModal({ video, onClose }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="video-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="video-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
        <div className="video-modal__header">
          <div>
            <p className="eyebrow">Video lesson</p>
            <h2 id="video-modal-title">{video.title}</h2>
          </div>
          <button ref={closeButtonRef} type="button" className="video-modal__close" onClick={onClose} aria-label="Close video">×</button>
        </div>
        {video.youtubeId ? (
          <div className="video-embed video-embed--modal">
            <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <p className="empty-state">This video is not available yet.</p>
        )}
        <p className="video-modal__description">{video.description}</p>
      </div>
    </div>
  )
}

export default VideoModal
