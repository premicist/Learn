import { supabase, supabaseEnabled, type PracticeAnswerValue, type SubmitResult } from './supabase'
import type { ScheduledTest } from '../data/content'

export type ScheduledTestStatus = 'upcoming' | 'open' | 'closed' | 'invalid'

export type ScheduledLeaderboardRow = {
  position: number
  roll_no: string
  class: string
  section: string
  score: number
}

export type ScheduledTestSubmission = {
  scheduled_test_id: string
  subject_id: string
  student_name: string
  class: string
  section: string
  roll_no: string
  answers: Record<string, PracticeAnswerValue | null>
  numerical_score: number
  numerical_total: number
}

export function getScheduledTestStatus(test: ScheduledTest, now = Date.now()): ScheduledTestStatus {
  const opensAt = Date.parse(test.opensAt)
  const closesAt = Date.parse(test.closesAt)
  if (!Number.isFinite(opensAt) || !Number.isFinite(closesAt) || closesAt <= opensAt) return 'invalid'
  if (now < opensAt) return 'upcoming'
  if (now >= closesAt) return 'closed'
  return 'open'
}

export function getScheduledTestDeadline(test: ScheduledTest, startedAt: number) {
  const windowClose = Date.parse(test.closesAt)
  const personalClose = startedAt + test.durationMinutes * 60_000
  return Math.min(windowClose, personalClose)
}

export function formatScheduledDate(value: string) {
  const timestamp = Date.parse(value)
  if (!Number.isFinite(timestamp)) return 'a date to be confirmed'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp)
}

export function formatRemainingTime(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

export async function submitScheduledTest(submission: ScheduledTestSubmission): Promise<SubmitResult> {
  if (!supabase) {
    console.warn('Supabase is not configured — this scheduled-test submission was NOT saved.')
    return { ok: false, reason: 'not-configured' }
  }
  const { error } = await supabase.from('scheduled_test_submissions').insert(submission)
  if (error) return { ok: false, reason: 'error', message: error.message }
  return { ok: true }
}

export async function getScheduledTestLeaderboard(testId: string): Promise<{ rows: ScheduledLeaderboardRow[]; error?: string }> {
  if (!supabaseEnabled || !supabase) return { rows: [] }
  const { data, error } = await supabase.rpc('get_scheduled_test_leaderboard', { test_id: testId })
  if (error) return { rows: [], error: error.message }
  return {
    rows: (Array.isArray(data) ? data : []).map((row) => ({
      position: Number(row.position),
      roll_no: String(row.roll_no || ''),
      class: String(row.class || ''),
      section: String(row.section || ''),
      score: Number(row.score || 0),
    })),
  }
}
