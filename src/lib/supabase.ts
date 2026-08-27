import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Lets the site keep working (minus saving results) if the keys aren't set yet —
// e.g. in local dev before .env.local is created, or in a preview deploy.
export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export type PracticeAnswerValue = number | string

export type PracticeSubmission = {
  practice_set_id: string
  subject_id: string
  student_name: string
  class: string
  section: string
  roll_no: string
  answers: Record<string, PracticeAnswerValue>
  numerical_score: number | null
  numerical_total: number | null
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'error'; message?: string }

// Fire-and-store: this is a write-only insert. Row Level Security on the
// `practice_submissions` table means this anon key can add rows but can never
// read any submission back — see SETUP.md for the policy.
export async function submitPracticeAnswers(submission: PracticeSubmission): Promise<SubmitResult> {
  if (!supabase) {
    console.warn(
      'Supabase is not configured — this submission was NOT saved. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart the dev server.',
    )
    return { ok: false, reason: 'not-configured' }
  }

  const { error } = await supabase.from('practice_submissions').insert(submission)
  if (error) return { ok: false, reason: 'error', message: error.message }
  return { ok: true }
}
