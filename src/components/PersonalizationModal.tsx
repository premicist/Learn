import { useEffect, useState } from 'react'
import { levels, getSubjectsByLevel } from '../data/levels'
import type { StudentProfile } from '../utils/useStudentProfile'

type PersonalizationModalProps = {
  isOpen: boolean
  initialProfile: StudentProfile | null
  onSave: (profile: StudentProfile) => void
  onClose: () => void
}

export default function PersonalizationModal({
  isOpen,
  initialProfile,
  onSave,
  onClose,
}: PersonalizationModalProps) {
  const [firstName, setFirstName] = useState(initialProfile?.firstName || '')
  const [lastName, setLastName] = useState(initialProfile?.lastName || '')
  const [levelId, setLevelId] = useState(initialProfile?.levelId || levels[0]?.id || 'school')

  const availableSubjects = getSubjectsByLevel(levelId)
  const [subjectId, setSubjectId] = useState(
    initialProfile?.subjectId || availableSubjects[0]?.id || 'class-11'
  )

  // Update subject if current subject is not in available subjects when level changes
  useEffect(() => {
    const valid = availableSubjects.some((s) => s.id === subjectId)
    if (!valid && availableSubjects.length > 0) {
      setSubjectId(availableSubjects[0].id)
    }
  }, [levelId, availableSubjects, subjectId])

  // Sync with initialProfile when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialProfile) {
        setFirstName(initialProfile.firstName || '')
        setLastName(initialProfile.lastName || '')
        if (initialProfile.levelId) setLevelId(initialProfile.levelId)
        if (initialProfile.subjectId) setSubjectId(initialProfile.subjectId)
      }
    }
  }, [isOpen, initialProfile])

  // Keyboard escape handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      levelId,
      subjectId: subjectId || availableSubjects[0]?.id || 'class-11',
      onboarded: true,
    })
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <div className="personalize-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="personalize-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="personalize-title"
      >
        <div className="personalize-modal-header">
          <div className="personalize-modal-header__title">
            <span className="personalize-modal-icon">🎯</span>
            <div>
              <h2 id="personalize-title">Personalize Your Study Track</h2>
              <p>Tell us what you&apos;re studying so we can customize your syllabus, notes, and quizzes.</p>
            </div>
          </div>
          <button
            type="button"
            className="personalize-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="personalize-modal-form">
          {/* Name Details */}
          <div className="personalize-form-section">
            <label className="personalize-label">Your Name (Optional)</label>
            <div className="personalize-name-grid">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name (e.g. Prem)"
                autoComplete="given-name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name (e.g. Pokhrel)"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Level Selection */}
          <div className="personalize-form-section">
            <label className="personalize-label">1. Select Your Academic Level</label>
            <div className="personalize-level-options">
              {levels.map((level) => {
                const isSelected = level.id === levelId
                return (
                  <button
                    key={level.id}
                    type="button"
                    className={`personalize-level-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setLevelId(level.id)}
                  >
                    <strong>{level.shortTitle || level.title}</strong>
                    <small>{level.description}</small>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subject Selection */}
          <div className="personalize-form-section">
            <label htmlFor="subject-select" className="personalize-label">
              2. Select Your Core Subject
            </label>
            <select
              id="subject-select"
              className="personalize-select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              {availableSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.title}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="personalize-modal-actions">
            <button type="submit" className="personalize-submit-btn">
              Start Learning Now →
            </button>
            <button type="button" onClick={handleSkip} className="personalize-skip-btn">
              Skip &amp; Browse All
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
