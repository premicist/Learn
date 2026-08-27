import { useState } from 'react'
import type { PracticeSet } from '../data/content'
import { submitPracticeAnswers, type PracticeAnswerValue } from '../lib/supabase'

type PracticeSetCardProps = {
  practiceSet: PracticeSet
}

type StudentInfo = {
  name: string
  studentClass: string
  section: string
  rollNo: string
}

const EMPTY_STUDENT: StudentInfo = { name: '', studentClass: '', section: '', rollNo: '' }

function isNumericallyClose(given: number, answer: number, tolerance: number) {
  return Math.abs(given - answer) <= tolerance
}

function PracticeSetCard({ practiceSet }: PracticeSetCardProps) {
  const [student, setStudent] = useState<StudentInfo>(EMPTY_STUDENT)
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<PracticeAnswerValue[]>(() => practiceSet.questions.map(() => ''))
  const [submitted, setSubmitted] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')

  const studentReady = student.name.trim() && student.studentClass.trim() && student.section.trim() && student.rollNo.trim()
  const allAnswered = answers.every((answer) => String(answer).trim() !== '')

  const numericalQuestions = practiceSet.questions.filter((q) => q.type === 'numerical')
  const numericalTotal = numericalQuestions.reduce((sum, q) => sum + q.points, 0)
  const numericalScore = practiceSet.questions.reduce((sum, question, index) => {
    if (question.type !== 'numerical') return sum
    const given = Number.parseFloat(String(answers[index]))
    if (Number.isNaN(given)) return sum
    return isNumericallyClose(given, question.answer, question.tolerance) ? sum + question.points : sum
  }, 0)

  function updateAnswer(index: number, value: PracticeAnswerValue) {
    setAnswers((previous) => {
      const next = [...previous]
      next[index] = value
      return next
    })
  }

  async function handleSubmit() {
    if (!allAnswered) return
    setSubmitted(true)
    setSaveState('saving')

    const answersById: Record<string, PracticeAnswerValue> = {}
    practiceSet.questions.forEach((question, index) => {
      answersById[`q${index + 1}`] = question.type === 'numerical' ? Number.parseFloat(String(answers[index])) : answers[index]
    })

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
            <input value={student.name} onChange={(e) => setStudent((s) => ({ ...s, name: e.target.value }))} required />
          </label>
          <label>
            Class
            <input value={student.studentClass} onChange={(e) => setStudent((s) => ({ ...s, studentClass: e.target.value }))} required />
          </label>
          <label>
            Section
            <input value={student.section} onChange={(e) => setStudent((s) => ({ ...s, section: e.target.value }))} required />
          </label>
          <label>
            Roll No.
            <input value={student.rollNo} onChange={(e) => setStudent((s) => ({ ...s, rollNo: e.target.value }))} required />
          </label>
          <button type="submit" className="practice-card__start" disabled={!studentReady}>
            Start practice set
          </button>
        </form>
      </article>
    )
  }

  return (
    <article className="practice-card">
      <h3>{practiceSet.title}</h3>
      <p className="practice-progress">
        {answers.filter((a) => String(a).trim() !== '').length} of {practiceSet.questions.length} answered
      </p>

      {practiceSet.questions.map((question, index) => (
        <fieldset className="practice-question" key={index}>
          <legend className="practice-question__text">
            {index + 1}. {question.question} <span className="practice-question__points">({question.points} pts)</span>
          </legend>

          {question.type === 'numerical' ? (
            <input
              type="number"
              step="any"
              className="practice-question__numeric-input"
              value={answers[index]}
              onChange={(e) => updateAnswer(index, e.target.value)}
              disabled={submitted}
              aria-label={`Answer to question ${index + 1}`}
            />
          ) : (
            <textarea
              className="practice-question__text-input"
              value={answers[index]}
              onChange={(e) => updateAnswer(index, e.target.value)}
              disabled={submitted}
              rows={4}
              aria-label={`Answer to question ${index + 1}`}
            />
          )}

          {submitted && question.type === 'numerical' && (
            <p
              className={
                isNumericallyClose(Number.parseFloat(String(answers[index])), question.answer, question.tolerance)
                  ? 'practice-feedback practice-feedback--correct'
                  : 'practice-feedback practice-feedback--incorrect'
              }
            >
              {isNumericallyClose(Number.parseFloat(String(answers[index])), question.answer, question.tolerance)
                ? 'Correct.'
                : `Not quite — the correct answer was ${question.answer}.`}
            </p>
          )}
          {submitted && question.type === 'writing' && (
            <p className="practice-feedback practice-feedback--pending">Saved — your teacher will grade this by hand.</p>
          )}
        </fieldset>
      ))}

      <div className="practice-card__actions">
        {!submitted ? (
          <button type="button" className="practice-submit" onClick={handleSubmit} disabled={!allAnswered}>
            Submit answers
          </button>
        ) : (
          <>
            {numericalTotal > 0 && (
              <p className="practice-score" role="status" aria-live="polite">
                Auto-graded score: {numericalScore} / {numericalTotal} on the numerical questions.
              </p>
            )}
            {saveState === 'saving' && <p className="practice-save-status">Saving your submission…</p>}
            {saveState === 'saved' && <p className="practice-save-status practice-save-status--ok">Submission saved.</p>}
            {saveState === 'failed' && (
              <p className="practice-save-status practice-save-status--error">
                Your score above is accurate, but we couldn't save this submission for your teacher — please let them know.
              </p>
            )}
          </>
        )}
      </div>
    </article>
  )
}

export default PracticeSetCard
