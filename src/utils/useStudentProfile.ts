import { useEffect, useState } from 'react'

export type StudentProfile = {
  firstName: string
  lastName: string
  levelId: string
  subjectId: string
  onboarded: boolean
}

const PROFILE_STORAGE_KEY = 'learn:studentProfile'

export function getStoredProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StudentProfile) : null
  } catch {
    return null
  }
}

export function useStudentProfile() {
  const [profile, setProfileState] = useState<StudentProfile | null>(getStoredProfile)

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === PROFILE_STORAGE_KEY) {
        setProfileState(getStoredProfile())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const saveProfile = (newProfile: StudentProfile) => {
    setProfileState(newProfile)
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile))
      if (newProfile.subjectId) {
        localStorage.setItem('learn:lastStudiedSubjectId', newProfile.subjectId)
      }
    } catch {
      // ignore localStorage error
    }
  }

  const clearProfile = () => {
    setProfileState(null)
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return {
    profile,
    saveProfile,
    clearProfile,
    isPersonalized: Boolean(profile?.onboarded && profile?.subjectId),
  }
}
