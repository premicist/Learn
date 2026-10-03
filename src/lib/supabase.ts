import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Lets the site keep working (minus saving results) if the keys aren't set yet —
// e.g. in local dev before .env.local is created, or in a preview deploy.
export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export type WritingAnswerData = {
  text?: string
  image_url?: string
}

export type PracticeAnswerValue = number | string | WritingAnswerData

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

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'error' | 'duplicate'; message?: string }

export async function compressImage(file: File, maxDimension = 1920, quality = 0.85): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  if (file.type === 'image/svg+xml' || file.size < 400 * 1024) return file

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(file)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file)
            } else {
              const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            }
          },
          'image/jpeg',
          quality,
        )
      }
      img.onerror = () => resolve(file)
      img.src = e.target?.result as string
    }
    reader.onerror = () => resolve(file)
    reader.readAsDataURL(file)
  })
}

export async function uploadPracticeAnswerImage(
  file: File,
  practiceSetId: string,
  questionIndex: number,
  studentRoll: string,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured' }
  }

  try {
    const compressed = await compressImage(file)
    const fileExt = compressed.name.split('.').pop() || 'jpg'
    const cleanRoll = studentRoll.replace(/[^a-zA-Z0-9_-]/g, '_') || 'anon'
    const fileName = `${practiceSetId}/q${questionIndex + 1}_roll${cleanRoll}_${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from('practice-uploads').upload(fileName, compressed, {
      cacheControl: '3600',
      upsert: true,
    })

    if (error) {
      return { ok: false, error: error.message }
    }

    const { data: publicData } = supabase.storage.from('practice-uploads').getPublicUrl(data.path)
    return { ok: true, url: publicData.publicUrl }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Image upload failed' }
  }
}

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
