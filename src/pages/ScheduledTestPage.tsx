import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { getScheduledTestById } from '../data/content'
import { getSubjectById } from '../data/levels'
import ScheduledTestSummary from '../components/ScheduledTestSummary'
import {
  formatRemainingTime,
  formatScheduledDate,
  getScheduledTestDeadline,
  getScheduledTestStatus,
  hasScheduledTestSubmission,
  submitScheduledTest,
} from '../lib/scheduledTests'
import type { PracticeAnswerValue } from '../lib/supabase'
import Seo from '../components/Seo'

type StudentInfo = { name: string; studentClass: string; section: string; rollNo: string }
const EMPTY_STUDENT: StudentInfo = { name: '', studentClass: '', section: '', rollNo: '' }
type SaveState = 'idle' | 'saving' | 'saved' | 'failed' | 'duplicate'

type StoredAttempt = {
  student: StudentInfo
  startedAt: number
  answers: string[]
  submitted: boolean
}

function attemptStorageKey(testId: string) {
  return `learn:scheduled-test:${testId}`
}

function readAttempt(testId: string): StoredAttempt | null {
  try {
    const raw = window.localStorage.getItem(attemptStorageKey(testId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredAttempt
    if (!parsed?.student || !parsed.startedAt || !Array.isArray(parsed.answers)) return null
    return parsed
  } catch {
    return null
  }
}

function writeAttempt(testId: string, attempt: StoredAttempt) {
  try {
    window.localStorage.setItem(attemptStorageKey(testId), JSON.stringify(attempt))
  } catch {
    // Ignore quota / private-mode failures; the server still enforces one attempt.
  }
}

function isClose(given: number, answer: number, tolerance: number) {
  return Number.isFinite(given) && Math.abs(given - answer) <= tolerance
}

function ScheduledTestPage() {
  const { scheduledTestId } = useParams<{ scheduledTestId: string }>()
  const test = scheduledTestId ? getScheduledTestById(scheduledTestId) : undefined
  const [student, setStudent] = useState<StudentInfo>(EMPTY_STUDENT)
  const [confirmed, setConfirmed] = useState(false)
  const [started, setStarted] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())
  const [answers, setAnswers] = useState<string[]>(() => test?.questions.map(() => '') || [])
  const [submitted, setSubmitted] = useState(false)
  const [autoSubmitted, setAutoSubmitted] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [submitting, setSubmitting] = useState(false)
  const [checking, setChecking] = useState(false)
  const [identityError, setIdentityError] = useState('')
  const [restored, setRestored] = useState(false)

  const status = test ? getScheduledTestStatus(test, now) : 'invalid'
  const deadline = test && startedAt ? getScheduledTestDeadline(test, startedAt) : null
  const remaining = deadline ? Math.max(0, deadline - now) : 0
  const studentReady = Boolean(student.name.trim() && student.studentClass.trim() && student.section.trim() && student.rollNo.trim() && confirmed)
  const revealAnswers = submitted && status === 'closed'
  const numericalTotal = useMemo(() => test?.questions.reduce((total, question) => total + question.points, 0) || 0, [test])
  const numericalScore = useMemo(() => test?.questions.reduce((total, question, index) => {
    const given = Number.parseFloat(answers[index] || '')
    return total + (isClose(given, question.answer, question.tolerance) ? question.points : 0)
  }, 0) || 0, [answers, test])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), submitted ? 15_000 : 1000)
    return () => window.clearInterval(timer)
  }, [submitted])

  useEffect(() => {
    if (!test || restored) return
    const stored = readAttempt(test.id)
    if (!stored) {
      setRestored(true)
      return
    }
    let active = true
    void hasScheduledTestSubmission(test.id, stored.student.studentClass, stored.student.section, stored.student.rollNo).then((check) => {
      if (!active) return
      setStudent(stored.student)
      setAnswers(stored.answers.length === test.questions.length ? stored.answers : test.questions.map(() => ''))
      setStartedAt(stored.startedAt)
      setStarted(true)
      setConfirmed(true)
      if (stored.submitted || check === 'taken') {
        setSubmitted(true)
        setSaveState(stored.submitted ? 'saved' : 'duplicate')
      }
      setRestored(true)
    })
    return () => { active = false }
  }, [restored, test])

  useEffect(() => {
    if (!test || !started || !startedAt) return
    writeAttempt(test.id, { student, startedAt, answers, submitted })
  }, [answers, started, startedAt, student, submitted, test])

  useEffect(() => {
    if (!started || submitted || !deadline || remaining > 0) return
    void handleSubmit(true)
  }, [deadline, remaining, started, submitted])

  async function handleStart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!test || !studentReady) return
    const startTime = Date.now()
    if (getScheduledTestStatus(test, startTime) !== 'open') return
    setChecking(true)
    setIdentityError('')
    const check = await hasScheduledTestSubmission(test.id, student.studentClass, student.section, student.rollNo)
    setChecking(false)
    if (check === 'taken') {
      setIdentityError('This class, section, and roll number already submitted this test. Only one attempt is allowed.')
      return
    }
    setStartedAt(startTime)
    setNow(startTime)
    setStarted(true)
  }

  async function handleSubmit(isAutomatic = false) {
    if (!test || submitting || submitted) return
    setSubmitting(true)
    setSubmitted(true)
    setAutoSubmitted(isAutomatic)
    setSaveState('saving')
    const answersById: Record<string, PracticeAnswerValue | null> = {}
    test.questions.forEach((_question, index) => {
      const raw = answers[index] || ''
      answersById[`q${index + 1}`] = raw.trim() ? Number.parseFloat(raw) : null
    })
    const result = await submitScheduledTest({
      scheduled_test_id: test.id,
      subject_id: test.subjectId,
      student_name: student.name.trim(),
      class: student.studentClass.trim(),
      section: student.section.trim(),
      roll_no: student.rollNo.trim(),
      answers: answersById,
      numerical_score: numericalScore,
      numerical_total: numericalTotal,
    })
    if (result.ok) setSaveState('saved')
    else if (result.reason === 'duplicate') setSaveState('duplicate')
    else setSaveState('failed')
    setSubmitting(false)
  }

  if (!test) {
    return (
      <section>
        <Seo title="Scheduled test not found | Prem Pokhrel" description="The requested scheduled test could not be found." />
        <h2>Scheduled test not found</h2>
        <p>This test may have been unpublished or the link may be incorrect.</p>
        <Link to="/practice-sets">Back to Practice</Link>
      </section>
    )
  }

  if (status === 'upcoming') {
    return (
      <section>
        <Seo title={`${test.title} | Prem Pokhrel`} description={test.instructions || 'Scheduled numerical test.'} />
        <span className="eyebrow">Scheduled Test</span>
        <h2>{test.title}</h2>
        <div className="scheduled-state scheduled-state--upcoming">
          <h3>Test scheduled</h3>
          <p>This test opens on <strong>{formatScheduledDate(test.opensAt)}</strong>.</p>
          <p>It closes on {formatScheduledDate(test.closesAt)} and allows {test.durationMinutes} minutes once started.</p>
        </div>
        <Link to="/practice-sets">Back to Practice</Link>
      </section>
    )
  }

  if (status === 'closed' && restored && !started) {
    const subject = getSubjectById(test.subjectId)
    return (
      <section>
        <Seo title={`${test.title} | Prem Pokhrel`} description="This scheduled test has closed." />
        <span className="eyebrow">Scheduled Test</span>
        <h2>{test.title}</h2>
        <div className="scheduled-state scheduled-state--closed">
          <h3>Test closed</h3>
          <p>This test closed on {formatScheduledDate(test.closesAt)}.</p>
        </div>
        <ScheduledTestSummary subjectTitle={subject?.title || test.subjectId} tests={[test]} />
        <Link to="/practice-sets">Back to Practice</Link>
      </section>
    )
  }

  if (status === 'invalid') {
    return (
      <section>
        <Seo title={`${test.title} | Prem Pokhrel`} description="This scheduled test has invalid timing." />
        <span className="eyebrow">Scheduled Test</span>
        <h2>{test.title}</h2>
        <div className="scheduled-state scheduled-state--closed">
          <h3>Test unavailable</h3>
          <p>The availability window needs to be corrected by the teacher.</p>
        </div>
      </section>
    )
  }

  if (!started) {
    if (!restored) {
      return (
        <section>
          <Seo title={`${test.title} | Prem Pokhrel`} description={test.instructions || 'Scheduled numerical test.'} />
          <span className="eyebrow">Scheduled Test</span>
          <h2>{test.title}</h2>
          <p className="empty-state">Checking for an existing attempt…</p>
        </section>
      )
    }
    return (
      <section>
        <Seo title={`${test.title} | Prem Pokhrel`} description={test.instructions || 'Scheduled numerical test.'} />
        <span className="eyebrow">Scheduled Test · {test.durationMinutes} minutes</span>
        <h2>{test.title}</h2>
        {test.instructions && <p className="scheduled-test__instructions">{test.instructions}</p>}
        <div className="scheduled-test__notice">
          <strong>Important:</strong> the test timer begins when you start. Your personal timer and the closing time are both enforced; the earlier limit ends the attempt. Each class + section + roll number may submit <strong>once</strong>.
        </div>
        <form className="scheduled-test__student-form" onSubmit={handleStart}>
          <h3>Student details</h3>
          <p>Enter these exactly as your teacher records them. Changing a letter later will not create a second attempt if the roll number already submitted.</p>
          <label>Name<input value={student.name} onChange={(event) => setStudent((current) => ({ ...current, name: event.target.value }))} required autoComplete="name" /></label>
          <label>Class<input value={student.studentClass} onChange={(event) => setStudent((current) => ({ ...current, studentClass: event.target.value }))} required /></label>
          <label>Section<input value={student.section} onChange={(event) => setStudent((current) => ({ ...current, section: event.target.value }))} required /></label>
          <label>Roll No.<input value={student.rollNo} onChange={(event) => setStudent((current) => ({ ...current, rollNo: event.target.value }))} required /></label>
          <label className="scheduled-test__confirm">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
            <span>I confirm these details are mine, and I have not already taken this test.</span>
          </label>
          {identityError && <p className="scheduled-summary__error" role="alert">{identityError}</p>}
          <button className="scheduled-test__start" type="submit" disabled={!studentReady || checking}>
            {checking ? 'Checking…' : 'Start test'}
          </button>
        </form>
      </section>
    )
  }

  return (
    <section>
      <Seo title={`${test.title} | Prem Pokhrel`} description="Scheduled numerical test attempt." />
      <div className="scheduled-test__header">
        <div>
          <span className="eyebrow">Scheduled Test</span>
          <h2>{test.title}</h2>
          <p className="scheduled-summary__detail">{student.name} · Class {student.studentClass} · Section {student.section} · Roll {student.rollNo}</p>
        </div>
        <div className={`scheduled-test__timer${remaining <= 60_000 && !submitted ? ' scheduled-test__timer--urgent' : ''}`} role="timer" aria-live="polite">
          <span>{submitted ? 'Time' : 'Time remaining'}</span>
          <strong>{formatRemainingTime(remaining)}</strong>
        </div>
      </div>
      {test.instructions && <p className="scheduled-test__instructions">{test.instructions}</p>}
      {autoSubmitted && (
        <div className="scheduled-state scheduled-state--upcoming">
          <strong>Time ended.</strong> Your answers were submitted automatically.
        </div>
      )}
      <div className="scheduled-test__questions">
        {test.questions.map((question, index) => {
          const given = Number.parseFloat(answers[index] || '')
          const answered = Boolean((answers[index] || '').trim())
          const correct = isClose(given, question.answer, question.tolerance)
          return (
            <fieldset className="scheduled-test__question" key={index}>
              <legend>{index + 1}. {question.question} <span>({question.points} pts)</span></legend>
              <input
                type="number"
                step="any"
                value={answers[index] || ''}
                disabled={submitted}
                onChange={(event) => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? event.target.value : answer))}
                aria-label={`Answer to question ${index + 1}`}
              />
              {revealAnswers && (
                <p className={`scheduled-feedback ${correct ? 'scheduled-feedback--correct' : 'scheduled-feedback--incorrect'}`}>
                  {answered && correct ? 'Correct.' : `Not quite — the correct answer was ${question.answer}.`}
                </p>
              )}
            </fieldset>
          )
        })}
      </div>
      {!submitted ? (
        <button className="scheduled-test__submit" type="button" onClick={() => void handleSubmit(false)} disabled={!answers.every((answer) => answer.trim())}>
          Submit test
        </button>
      ) : (
        <div className="scheduled-test__result" role="status" aria-live="polite">
          <strong>Score: {numericalScore} / {numericalTotal}</strong>
          {saveState === 'saving' && <p>Saving your submission…</p>}
          {saveState === 'saved' && <p>Submission saved. This roll number cannot submit again. Correct answers appear when the test closes.</p>}
          {saveState === 'duplicate' && <p>This class, section, and roll number already submitted. The new attempt was not saved.</p>}
          {saveState === 'failed' && <p>Your score is shown above, but the submission could not be saved. Please tell your teacher.</p>}
          {!revealAnswers && <p className="scheduled-summary__detail">Answer key is hidden until {formatScheduledDate(test.closesAt)}.</p>}
        </div>
      )}
    </section>
  )
}

export default ScheduledTestPage
