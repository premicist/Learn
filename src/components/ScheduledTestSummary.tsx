import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { ScheduledTest } from '../data/content'
import { formatScheduledDate, getScheduledTestLeaderboard, getScheduledTestStatus, type ScheduledLeaderboardRow } from '../lib/scheduledTests'
import LeaderboardModal from './LeaderboardModal'

type ScheduledTestSummaryProps = { subjectTitle: string; tests: ScheduledTest[] }

function chooseRelevantTest(tests: ScheduledTest[], now: number) {
  return [...tests]
    .sort((left, right) => Date.parse(left.opensAt) - Date.parse(right.opensAt))
    .find((test) => getScheduledTestStatus(test, now) === 'open')
    || [...tests]
      .sort((left, right) => Date.parse(left.opensAt) - Date.parse(right.opensAt))
      .find((test) => getScheduledTestStatus(test, now) === 'upcoming')
    || [...tests]
      .sort((left, right) => Date.parse(right.closesAt) - Date.parse(left.closesAt))
      .find((test) => getScheduledTestStatus(test, now) === 'closed')
}

function ScheduledTestSummary({ subjectTitle, tests }: ScheduledTestSummaryProps) {
  const [now, setNow] = useState(Date.now())
  const [leaderboard, setLeaderboard] = useState<ScheduledLeaderboardRow[]>([])
  const [leaderboardError, setLeaderboardError] = useState('')
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const test = useMemo(() => chooseRelevantTest(tests, now), [now, tests])
  const status = test ? getScheduledTestStatus(test, now) : null

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!test || status !== 'closed') {
      setLeaderboard([])
      setLeaderboardError('')
      setLeaderboardOpen(false)
      return
    }
    let active = true
    void getScheduledTestLeaderboard(test.id).then((result) => {
      if (!active) return
      setLeaderboard(result.rows)
      setLeaderboardError(result.error || '')
    })
    return () => { active = false }
  }, [status, test])

  return (
    <article className="scheduled-summary">
      <div className="scheduled-summary__header">
        <div>
          <p className="eyebrow">Scheduled Tests</p>
          <h3>{subjectTitle}</h3>
        </div>
        {test && status === 'open' && <span className="scheduled-summary__status scheduled-summary__status--open">Open now</span>}
        {test && status === 'closed' && <span className="scheduled-summary__status">Closed</span>}
      </div>
      {!test && <p className="empty-state">No test/exam scheduled yet.</p>}
      {test && status === 'upcoming' && (
        <>
          <p><strong>Test scheduled for {formatScheduledDate(test.opensAt)}.</strong></p>
          <p className="scheduled-summary__detail">{test.title} · {test.durationMinutes} minutes</p>
        </>
      )}
      {test && status === 'open' && (
        <>
          <p>{test.title} is available until {formatScheduledDate(test.closesAt)}.</p>
          <Link className="scheduled-summary__action" to={`/scheduled-tests/${test.id}`}>Enter test →</Link>
        </>
      )}
      {test && status === 'closed' && (
        <>
          <p>Final results for <strong>{test.title}</strong> · closed {formatScheduledDate(test.closesAt)}.</p>
          {leaderboardError && <p className="scheduled-summary__error">Leaderboard is temporarily unavailable.</p>}
          {!leaderboardError && leaderboard.length > 0 && (
            <p className="scheduled-summary__results-prompt">
              Top 10 results (
              <button
                type="button"
                className="scheduled-summary__click-here"
                onClick={() => setLeaderboardOpen(true)}
              >
                click here
              </button>
              )!
            </p>
          )}
          {!leaderboardError && leaderboard.length === 0 && (
            <p className="empty-state">No leaderboard results are available yet.</p>
          )}
          {leaderboardOpen && (
            <LeaderboardModal
              title={test.title}
              closedAt={formatScheduledDate(test.closesAt)}
              rows={leaderboard}
              error={leaderboardError}
              onClose={() => setLeaderboardOpen(false)}
            />
          )}
        </>
      )}
    </article>
  )
}

export default ScheduledTestSummary
