import { compressImage } from './supabase'

const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL

export const googleDriveEnabled = Boolean(googleScriptUrl && googleScriptUrl.trim() !== '')

export type GoogleSubmissionAnswer = {
  text?: string
  image_url?: string
  image_base64?: string
  image_mime?: string
}

export type GooglePracticeSubmission = {
  practice_set_id: string
  subject_id: string
  student_name: string
  class: string
  section: string
  roll_no: string
  answers: Record<string, GoogleSubmissionAnswer | number | string>
  numerical_score: number | null
  numerical_total: number | null
}

export async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  // Compress before encoding to keep payload fast and lightweight
  const compressed = await compressImage(file, 1920, 0.85)

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve({
        base64: result,
        mimeType: compressed.type || 'image/jpeg',
      })
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(compressed)
  })
}

export async function submitToGoogleDrive(
  payload: GooglePracticeSubmission,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!googleScriptUrl) {
    return { ok: false, error: 'Google Script URL is not configured in .env' }
  }

  try {
    // Google Apps Script accepts text/plain POST to avoid strict CORS preflight checks
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    // If redirected or returned JSON
    if (response.ok || response.type === 'opaque') {
      return { ok: true }
    }

    try {
      const data = await response.json()
      if (data && data.ok) return { ok: true }
      return { ok: false, error: data.error || 'Submission error' }
    } catch {
      return { ok: true }
    }
  } catch (err) {
    console.error('Google Apps Script Webhook error:', err)
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
