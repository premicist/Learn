import { useEffect, useRef, useState } from 'react'
import type { PracticeSet } from '../data/content'
import {
  submitPracticeAnswers,
  uploadPracticeAnswerImage,
  type PracticeAnswerValue,
  type WritingAnswerData,
} from '../lib/supabase'

type PracticeSetCardProps = {
  practiceSet: PracticeSet
}

type StudentInfo = {
  name: string
  studentClass: string
  section: string
  rollNo: string
}

type WritingState = {
  text: string
  imageFile: File | null
  previewUrl: string | null
  uploadedUrl?: string
  mode: 'type' | 'upload' | 'both'
}

const EMPTY_STUDENT: StudentInfo = { name: '', studentClass: '', section: '', rollNo: '' }

function isNumericallyClose(given: number, answer: number, tolerance: number) {
  return Math.abs(given - answer) <= tolerance
}

function PracticeSetCard({ practiceSet }: PracticeSetCardProps) {
  const [student, setStudent] = useState<StudentInfo>(EMPTY_STUDENT)
  const [started, setStarted] = useState(false)
  const [numericalAnswers, setNumericalAnswers] = useState<Record<number, string>>({})
  const [writingAnswers, setWritingAnswers] = useState<Record<number, WritingState>>(() => {
    const initial: Record<number, WritingState> = {}
    practiceSet.questions.forEach((q, index) => {
      if (q.type === 'writing') {
        initial[index] = { text: '', imageFile: null, previewUrl: null, mode: 'type' }
      }
    })
    return initial
  })
  const [submitted, setSubmitted] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [uploadStatus, setUploadStatus] = useState('')
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string } | null>(null)
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  // Clean up object URLs when unmounting or changing files
  useEffect(() => {
    return () => {
      Object.values(writingAnswers).forEach((state) => {
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)
      })
    }
  }, [writingAnswers])

  const studentReady =
    student.name.trim() !== '' &&
    student.studentClass.trim() !== '' &&
    student.section.trim() !== '' &&
    student.rollNo.trim() !== ''

  // Question Answer Validation
  const isQuestionAnswered = (index: number) => {
    const question = practiceSet.questions[index]
    if (question.type === 'numerical') {
      const val = numericalAnswers[index]
      return val !== undefined && val.trim() !== '' && !Number.isNaN(Number.parseFloat(val))
    }
    const writing = writingAnswers[index]
    if (!writing) return false
    return writing.text.trim() !== '' || writing.imageFile !== null || Boolean(writing.uploadedUrl)
  }

  const answeredCount = practiceSet.questions.filter((_, idx) => isQuestionAnswered(idx)).length
  const allAnswered = answeredCount === practiceSet.questions.length

  const numericalQuestions = practiceSet.questions.filter((q) => q.type === 'numerical')
  const numericalTotal = numericalQuestions.reduce((sum, q) => sum + q.points, 0)
  const numericalScore = practiceSet.questions.reduce((sum, question, index) => {
    if (question.type !== 'numerical') return sum
    const val = numericalAnswers[index]
    if (!val) return sum
    const given = Number.parseFloat(val)
    if (Number.isNaN(given)) return sum
    return isNumericallyClose(given, question.answer, question.tolerance) ? sum + question.points : sum
  }, 0)

  function updateWritingText(index: number, text: string) {
    setWritingAnswers((prev) => ({
      ...prev,
      [index]: { ...prev[index], text },
    }))
  }

  function updateWritingMode(index: number, mode: 'type' | 'upload' | 'both') {
    setWritingAnswers((prev) => ({
      ...prev,
      [index]: { ...prev[index], mode },
    }))
  }

  function handleFileSelect(index: number, file: File | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP, etc.).')
      return
    }

    const previewUrl = URL.createObjectURL(file)
    setWritingAnswers((prev) => {
      if (prev[index]?.previewUrl) URL.revokeObjectURL(prev[index].previewUrl)
      return {
        ...prev,
        [index]: {
          ...prev[index],
          imageFile: file,
          previewUrl,
        },
      }
    })
  }

  function removeImage(index: number) {
    setWritingAnswers((prev) => {
      if (prev[index]?.previewUrl) URL.revokeObjectURL(prev[index].previewUrl)
      return {
        ...prev,
        [index]: {
          ...prev[index],
          imageFile: null,
          previewUrl: null,
          uploadedUrl: undefined,
        },
      }
    })
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ''
    }
  }

  async function handleSubmit() {
    if (!allAnswered) return
    setSubmitted(true)
    setSaveState('saving')
    setUploadStatus('Processing answers…')

    try {
      const answersById: Record<string, PracticeAnswerValue> = {}
      const writingIndices = practiceSet.questions
        .map((q, idx) => (q.type === 'writing' ? idx : -1))
        .filter((idx) => idx !== -1)

      // Step 1: Upload images if any
      let uploadedCount = 0
      const totalImagesToUpload = writingIndices.filter((idx) => writingAnswers[idx]?.imageFile).length

      for (const idx of writingIndices) {
        const writing = writingAnswers[idx]
        const qKey = `q${idx + 1}`
        let finalImageUrl = writing.uploadedUrl

        if (writing.imageFile) {
          uploadedCount++
          setUploadStatus(`Uploading handwritten sheets (${uploadedCount}/${totalImagesToUpload})…`)
          const uploadRes = await uploadPracticeAnswerImage(
            writing.imageFile,
            practiceSet.id,
            idx,
            student.rollNo.trim(),
          )
          if (uploadRes.ok) {
            finalImageUrl = uploadRes.url
          } else {
            console.warn(`Could not upload image for ${qKey}:`, uploadRes.error)
          }
        }

        const writingPayload: WritingAnswerData = {}
        if (writing.text.trim()) writingPayload.text = writing.text.trim()
        if (finalImageUrl) writingPayload.image_url = finalImageUrl

        answersById[qKey] =
          Object.keys(writingPayload).length > 0 ? writingPayload : { text: '(No response provided)' }
      }

      // Step 2: Add numerical answers
      practiceSet.questions.forEach((q, idx) => {
        if (q.type === 'numerical') {
          const qKey = `q${idx + 1}`
          const numVal = Number.parseFloat(numericalAnswers[idx] || '0')
          answersById[qKey] = Number.isNaN(numVal) ? 0 : numVal
        }
      })

      // Step 3: Submit record to Supabase
      setUploadStatus('Saving your complete submission…')
      const result = await submitPracticeAnswers({
        practice_set_id: practiceSet.id,
        subject_id: practiceSet.subjectId,
        student_name: student.name.trim(),
        class: student.studentClass.trim(),
        section: student.section.trim(),
        roll_no: student.rollNo.trim(),
        answers: answersById,
        numerical_score: numericalTotal > 0 ? numericalScore : null,
        numerical_total: numericalTotal > 0 ? numericalTotal : null,
      })

      setSaveState(result.ok ? 'saved' : 'failed')
    } catch (err) {
      console.error('Submission failed:', err)
      setSaveState('failed')
    } finally {
      setUploadStatus('')
    }
  }

  if (!started) {
    return (
      <article className="practice-card">
        <h3>{practiceSet.title}</h3>
        {practiceSet.instructions && <p className="practice-card__instructions">{practiceSet.instructions}</p>}
        <form
          className="practice-card__student-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (studentReady) setStarted(true)
          }}
        >
          <label>
            Name
            <input
              value={student.name}
              placeholder="e.g. Aayush Sharma"
              onChange={(e) => setStudent((s) => ({ ...s, name: e.target.value }))}
              required
            />
          </label>
          <label>
            Class / Program
            <input
              value={student.studentClass}
              placeholder="e.g. BBA 1st Sem / Class 11"
              onChange={(e) => setStudent((s) => ({ ...s, studentClass: e.target.value }))}
              required
            />
          </label>
          <label>
            Section
            <input
              value={student.section}
              placeholder="e.g. A"
              onChange={(e) => setStudent((s) => ({ ...s, section: e.target.value }))}
              required
            />
          </label>
          <label>
            Roll No.
            <input
              value={student.rollNo}
              placeholder="e.g. 15"
              inputMode="numeric"
              onChange={(e) => setStudent((s) => ({ ...s, rollNo: e.target.value }))}
              required
            />
          </label>
          <button type="submit" className="practice-card__start" disabled={!studentReady}>
            Start practice set →
          </button>
        </form>
      </article>
    )
  }

  return (
    <article className="practice-card">
      <div className="practice-card__header-bar">
        <h3>{practiceSet.title}</h3>
        <span className="practice-card__student-badge">
          {student.name} ({student.studentClass} - {student.section}, Roll #{student.rollNo})
        </span>
      </div>

      <div className="practice-progress-wrap">
        <span className="practice-progress">
          {answeredCount} of {practiceSet.questions.length} answered
        </span>
        <div className="practice-progress-bar">
          <div
            className="practice-progress-bar__fill"
            style={{ width: `${(answeredCount / practiceSet.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {practiceSet.questions.map((question, index) => {
        const isNumerical = question.type === 'numerical'
        const writing = writingAnswers[index]

        return (
          <fieldset className="practice-question" key={index}>
            <legend className="practice-question__text">
              <span className="practice-question__num">Q{index + 1}.</span> {question.question}{' '}
              <span className="practice-question__points">({question.points} pts)</span>
            </legend>

            {/* Numerical Question Input */}
            {isNumerical && (
              <div className="practice-question__numerical-wrap">
                <label className="practice-question__input-label">
                  Your Numeric Answer:
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    className="practice-question__numeric-input"
                    value={numericalAnswers[index] || ''}
                    placeholder="Enter final number"
                    onChange={(e) => setNumericalAnswers((prev) => ({ ...prev, [index]: e.target.value }))}
                    disabled={submitted}
                    aria-label={`Answer to question ${index + 1}`}
                  />
                </label>
              </div>
            )}

            {/* Writing / Hybrid Answer Input */}
            {!isNumerical && writing && (
              <div className="practice-writing-block">
                {!submitted && (
                  <div className="practice-writing-modes" role="group" aria-label="Choose submission mode">
                    <button
                      type="button"
                      className={`practice-mode-btn ${writing.mode === 'type' ? 'is-active' : ''}`}
                      onClick={() => updateWritingMode(index, 'type')}
                    >
                      ✍️ Type Text
                    </button>
                    <button
                      type="button"
                      className={`practice-mode-btn ${writing.mode === 'upload' ? 'is-active' : ''}`}
                      onClick={() => updateWritingMode(index, 'upload')}
                    >
                      📷 Upload Photo
                    </button>
                    <button
                      type="button"
                      className={`practice-mode-btn ${writing.mode === 'both' ? 'is-active' : ''}`}
                      onClick={() => updateWritingMode(index, 'both')}
                    >
                      📝 Text + Photo
                    </button>
                  </div>
                )}

                {/* Text Area Input */}
                {(writing.mode === 'type' || writing.mode === 'both' || (submitted && writing.text.trim())) && (
                  <div className="practice-writing-text-wrap">
                    <textarea
                      className="practice-question__text-input"
                      value={writing.text}
                      onChange={(e) => updateWritingText(index, e.target.value)}
                      disabled={submitted}
                      rows={writing.mode === 'both' ? 3 : 5}
                      placeholder="Type your explanation, formula derivations, and answers here..."
                      aria-label={`Written answer to question ${index + 1}`}
                    />
                  </div>
                )}

                {/* Image Upload / Camera Dropzone */}
                {(writing.mode === 'upload' || writing.mode === 'both' || (submitted && writing.previewUrl)) && (
                  <div className="practice-upload-section">
                    <input
                      type="file"
                      accept="image/*"
                      className="visually-hidden"
                      ref={(el) => {
                        fileInputRefs.current[index] = el
                      }}
                      onChange={(e) => handleFileSelect(index, e.target.files?.[0] || null)}
                      disabled={submitted}
                      id={`file-upload-q${index}`}
                    />

                    {/* Pre-upload Dropzone / Button */}
                    {!submitted && !writing.previewUrl && (
                      <div
                        className="practice-upload-dropzone"
                        onClick={() => fileInputRefs.current[index]?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') fileInputRefs.current[index]?.click()
                        }}
                      >
                        <span className="practice-upload-dropzone__icon" aria-hidden="true">
                          📸
                        </span>
                        <div>
                          <strong>Take photo or select handwritten paper</strong>
                          <small>Supports camera capture &amp; gallery images (JPG, PNG)</small>
                        </div>
                        <span className="practice-upload-dropzone__btn">Browse / Snap</span>
                      </div>
                    )}

                    {/* Image Preview Card */}
                    {writing.previewUrl && (
                      <div className="practice-image-card">
                        <div
                          className="practice-image-card__thumb-wrap"
                          onClick={() =>
                            setActiveModalImage({
                              url: writing.previewUrl!,
                              title: `Question ${index + 1} Handwritten Sheet`,
                            })
                          }
                          title="Click to view full image"
                        >
                          <img
                            src={writing.previewUrl}
                            alt={`Handwritten answer for Question ${index + 1}`}
                            className="practice-image-card__thumb"
                          />
                          <span className="practice-image-card__zoom-badge">🔍 Zoom</span>
                        </div>
                        <div className="practice-image-card__info">
                          <strong>Handwritten Answer Attached</strong>
                          {writing.imageFile && (
                            <small>
                              {writing.imageFile.name} ({(writing.imageFile.size / 1024).toFixed(0)} KB)
                            </small>
                          )}
                          {!submitted && (
                            <div className="practice-image-card__actions">
                              <button
                                type="button"
                                className="practice-image-action-btn practice-image-action-btn--change"
                                onClick={() => fileInputRefs.current[index]?.click()}
                              >
                                Replace Photo
                              </button>
                              <button
                                type="button"
                                className="practice-image-action-btn practice-image-action-btn--delete"
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submitted Feedback States */}
            {submitted && isNumerical && (
              <p
                className={
                  isNumericallyClose(
                    Number.parseFloat(numericalAnswers[index] || '0'),
                    question.answer,
                    question.tolerance,
                  )
                    ? 'practice-feedback practice-feedback--correct'
                    : 'practice-feedback practice-feedback--incorrect'
                }
              >
                {isNumericallyClose(
                  Number.parseFloat(numericalAnswers[index] || '0'),
                  question.answer,
                  question.tolerance,
                )
                  ? '✓ Correct numerical answer.'
                  : `✗ Not quite — the expected answer was ${question.answer} (tolerance ±${question.tolerance}).`}
              </p>
            )}

            {submitted && !isNumerical && (
              <p className="practice-feedback practice-feedback--pending">
                ✓ Response recorded — your teacher will grade your written/handwritten answer.
              </p>
            )}
          </fieldset>
        )
      })}

      {/* Action Footer */}
      <div className="practice-card__actions">
        {!submitted ? (
          <button type="button" className="practice-submit" onClick={handleSubmit} disabled={!allAnswered}>
            Submit all answers ({answeredCount}/{practiceSet.questions.length})
          </button>
        ) : (
          <div className="practice-submitted-summary">
            {numericalTotal > 0 && (
              <p className="practice-score" role="status" aria-live="polite">
                Auto-graded score: <strong>{numericalScore}</strong> / {numericalTotal} on numerical questions.
              </p>
            )}
            {saveState === 'saving' && (
              <p className="practice-save-status">
                <span className="spinner" aria-hidden="true" /> {uploadStatus || 'Saving your submission…'}
              </p>
            )}
            {saveState === 'saved' && (
              <p className="practice-save-status practice-save-status--ok">
                ✓ Your submission and handwritten answers have been safely saved for teacher review.
              </p>
            )}
            {saveState === 'failed' && (
              <p className="practice-save-status practice-save-status--error">
                Your score above is calculated, but could not connect to Supabase storage. If in development, ensure
                Supabase credentials are set.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {activeModalImage && (
        <div className="practice-image-modal" onClick={() => setActiveModalImage(null)}>
          <div className="practice-image-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="practice-image-modal__header">
              <h3>{activeModalImage.title}</h3>
              <button
                type="button"
                className="practice-image-modal__close"
                onClick={() => setActiveModalImage(null)}
                aria-label="Close image viewer"
              >
                ✕
              </button>
            </div>
            <div className="practice-image-modal__body">
              <img src={activeModalImage.url} alt={activeModalImage.title} className="practice-image-modal__img" />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default PracticeSetCard

