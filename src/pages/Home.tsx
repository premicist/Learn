import { Link, useNavigate } from 'react-router'
import { useEffect, useState, useMemo } from 'react'
import { levels, getSubjectsByLevel, getSubjectById, subjects } from '../data/levels'
import LevelCard from '../components/LevelCard'
import SubjectCard from '../components/SubjectCard'
import Seo from '../components/Seo'
import PersonalizationModal from '../components/PersonalizationModal'
import InteractiveMarketCurve from '../components/InteractiveMarketCurve'
import { useLessonProgress } from '../utils/useLessonProgress'
import { useBookmarks } from '../utils/useBookmarks'
import { useStudentProfile } from '../utils/useStudentProfile'
import { notes } from '../data/generated/content'
import { formatDate } from '../components/NoteCard'

type ResumeTab = 'continue' | 'completed' | 'bookmarked'

function Home() {
  const { completed: completedLessonIds, toggleLesson, isCompleted, getUnitProgress } = useLessonProgress()
  const { bookmarks: bookmarkedNoteIds, toggleBookmark, isBookmarked } = useBookmarks()
  const { profile, saveProfile, isPersonalized } = useStudentProfile()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<ResumeTab>('continue')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [streak, setStreak] = useState(0)
  const [weeklyGoal, setWeeklyGoal] = useState(5)
  const [customGoalInput, setCustomGoalInput] = useState('5')

  // Onboarding modal is accessible via "Personalize Now" button without aggressively blocking first-time visitors

  const [lastStudiedNoteId, setLastStudiedNoteId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('learn:lastStudiedNoteId')
    }
    return null
  })

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('learn:lastStudiedSubjectId')
    }
    return null
  })

  // Identify student's active/last studied subject (prioritizing personalized profile)
  const activeSubject = useMemo(() => {
    if (profile?.subjectId) {
      const found = getSubjectById(profile.subjectId)
      if (found) return found
    }
    if (selectedSubjectId) {
      const found = getSubjectById(selectedSubjectId)
      if (found) return found
    }
    if (lastStudiedNoteId) {
      const note = notes.find((n) => n.id === lastStudiedNoteId)
      if (note) {
        const found = getSubjectById(note.subjectId)
        if (found) return found
      }
    }
    if (completedLessonIds.length > 0) {
      const lastCompleted = notes.find((n) => n.id === completedLessonIds[completedLessonIds.length - 1])
      if (lastCompleted) {
        const found = getSubjectById(lastCompleted.subjectId)
        if (found) return found
      }
    }
    if (bookmarkedNoteIds.length > 0) {
      const lastBookmarked = notes.find((n) => n.id === bookmarkedNoteIds[bookmarkedNoteIds.length - 1])
      if (lastBookmarked) {
        const found = getSubjectById(lastBookmarked.subjectId)
        if (found) return found
      }
    }
    return subjects.find((s) => s.id === 'class-11') || subjects[0]
  }, [profile, selectedSubjectId, lastStudiedNoteId, completedLessonIds, bookmarkedNoteIds])

  const activeLevel = useMemo(() => {
    return levels.find((l) => l.id === activeSubject?.levelId)
  }, [activeSubject])

  // Notes in active subject
  const activeSubjectNotes = useMemo(() => {
    if (!activeSubject) return []
    return notes.filter((n) => n.subjectId === activeSubject.id)
  }, [activeSubject])

  const uncompletedSubjectNotes = useMemo(() => {
    return activeSubjectNotes.filter((n) => !completedLessonIds.includes(n.id))
  }, [activeSubjectNotes, completedLessonIds])

  const upNextNotes = uncompletedSubjectNotes.length > 0 ? uncompletedSubjectNotes : activeSubjectNotes
  const subjectTotalNotes = activeSubjectNotes.length
  const subjectCompletedCount = completedLessonIds.filter((id) =>
    activeSubjectNotes.some((note) => note.id === id)
  ).length
  const subjectProgressPercent = subjectTotalNotes > 0
    ? Math.round((subjectCompletedCount / subjectTotalNotes) * 100)
    : 0

  const completedNotes = useMemo(() => activeSubjectNotes.filter((note) => completedLessonIds.includes(note.id)), [activeSubjectNotes, completedLessonIds])
  const bookmarkedNotes = useMemo(() => activeSubjectNotes.filter((note) => bookmarkedNoteIds.includes(note.id)), [activeSubjectNotes, bookmarkedNoteIds])

  const nextNoteToStudy = upNextNotes[0] || activeSubjectNotes[0] || notes[0]

  // Generate the last 7 days for the weekly habit strip
  const last7Days = useMemo(() => {
    const days: { dateStr: string; dayLabel: string; dayNum: number; isToday: boolean; isActive: boolean }[] = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    let activeDates: string[] = []
    let lastActive: string | null = null
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('learn:activeDates')
        if (stored) activeDates = JSON.parse(stored)
      } catch {
        activeDates = []
      }
      lastActive = localStorage.getItem('learn:lastActiveDate')
    }

    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const isToday = i === 0

      const isActive =
        activeDates.includes(dateStr) ||
        lastActive === dateStr ||
        (streak > 0 && lastActive === todayStr && i < streak)

      days.push({
        dateStr,
        dayLabel: dayNames[d.getDay()],
        dayNum: d.getDate(),
        isToday,
        isActive,
      })
    }
    return days
  }, [streak])

  // Record daily study activity and calculate streak
  const recordActivity = () => {
    if (typeof window === 'undefined') return
    const today = new Date().toISOString().split('T')[0]
    const lastDate = localStorage.getItem('learn:lastActiveDate')
    const savedStreak = parseInt(localStorage.getItem('learn:streak') || '0', 10)

    // Maintain rolling list of active dates for habit matrix
    try {
      const storedDates = localStorage.getItem('learn:activeDates')
      let dates = storedDates ? JSON.parse(storedDates) : []
      if (!dates.includes(today)) {
        dates.push(today)
        if (dates.length > 30) dates = dates.slice(dates.length - 30)
        localStorage.setItem('learn:activeDates', JSON.stringify(dates))
      }
    } catch {
      // ignore
    }

    if (!lastDate) {
      localStorage.setItem('learn:streak', '1')
      localStorage.setItem('learn:lastActiveDate', today)
      setStreak(1)
    } else if (lastDate === today) {
      if (savedStreak === 0) {
        localStorage.setItem('learn:streak', '1')
        setStreak(1)
      }
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      if (lastDate === yesterday) {
        const newStreak = savedStreak + 1
        localStorage.setItem('learn:streak', newStreak.toString())
        localStorage.setItem('learn:lastActiveDate', today)
        setStreak(newStreak)
      } else {
        localStorage.setItem('learn:streak', '1')
        localStorage.setItem('learn:lastActiveDate', today)
        setStreak(1)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStreak = localStorage.getItem('learn:streak')
      const savedGoal = localStorage.getItem('learn:weeklyGoal')
      if (savedStreak) setStreak(parseInt(savedStreak, 10))
      if (savedGoal) {
        const parsed = parseInt(savedGoal, 10)
        if (!isNaN(parsed) && parsed > 0) {
          setWeeklyGoal(parsed)
          setCustomGoalInput(parsed.toString())
        }
      }
    }
  }, [])

  const handleToggleLesson = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    toggleLesson(id)
    setLastStudiedNoteId(id)
    recordActivity()
  }

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    toggleBookmark(id)
    setLastStudiedNoteId(id)
    recordActivity()
  }

  const handleSetWeeklyGoal = (goal: number) => {
    if (goal > 0) {
      setWeeklyGoal(goal)
      setCustomGoalInput(goal.toString())
      if (typeof window !== 'undefined') {
        localStorage.setItem('learn:weeklyGoal', goal.toString())
      }
    }
  }

  const handleCustomGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const parsed = parseInt(customGoalInput, 10)
    if (!isNaN(parsed) && parsed > 0) {
      handleSetWeeklyGoal(parsed)
    }
  }

  const handleContinueLearning = () => {
    if (nextNoteToStudy) {
      navigate(`/notes/${nextNoteToStudy.id}`)
    }
  }

  // Level and subject specific progress calculations using getUnitProgress
  const getLevelProgress = (levelId: string) => {
    const levelSubjects = getSubjectsByLevel(levelId)
    const levelSubjectIds = levelSubjects.map((s) => s.id)
    const levelNoteIds = notes.filter((n) => levelSubjectIds.includes(n.subjectId)).map((n) => n.id)
    return getUnitProgress(levelNoteIds)
  }

  const getSubjectProgress = (subjectId: string) => {
    const subjNoteIds = notes.filter((n) => n.subjectId === subjectId).map((n) => n.id)
    return getUnitProgress(subjNoteIds)
  }

  // Display notes based on selected tab (showing top 3 under Up Next)
  const displayNotes = activeTab === 'completed'
    ? completedNotes
    : activeTab === 'bookmarked'
    ? bookmarkedNotes
    : upNextNotes.slice(0, 3)

  return (
    <>
      <Seo title="Economics, explained | Prem Pokhrel" description="Notes, articles, quizzes, and videos in economics for school, bachelor’s, and master’s level learners." />
      
      {/* Personalization Welcome Modal */}
      <PersonalizationModal
        isOpen={isModalOpen}
        initialProfile={profile}
        onSave={(newProfile) => {
          saveProfile(newProfile)
          if (newProfile.subjectId) {
            setSelectedSubjectId(newProfile.subjectId)
          }
          setIsModalOpen(false)
        }}
        onClose={() => setIsModalOpen(false)}
      />

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">
            {profile?.firstName
              ? `Welcome, ${profile.firstName}! · ${activeSubject?.title}`
              : 'Class 11 & 12 · Bachelor’s · Master’s'}
          </span>
          <h1>
            Where supply meets <em>understanding</em>.
          </h1>
          <p>
            Notes, articles, quizzes, and videos in economics — built for students pursuing class 11-12,
            bachelor’s and master’s level coursework.
          </p>

          {/* Active Study Track Personalization Bar */}
          <div className={`study-track-banner ${!isPersonalized ? 'study-track-banner--unconfigured' : ''}`}>
            <div className="study-track-banner__info">
              <span className="study-track-banner__icon">{isPersonalized ? '🎯' : '✨'}</span>
              <div>
                <span className="study-track-banner__label">
                  {isPersonalized ? 'Active Track:' : 'Personalize your curriculum:'}
                </span>
                <strong>{activeSubject?.title}</strong>
                {activeLevel && (
                  <span className="study-track-banner__level">
                    &nbsp;({activeLevel.shortTitle || activeLevel.title})
                  </span>
                )}
              </div>
            </div>
            {streak > 0 && (
              <span className="study-track-banner__streak-pill" title={`${streak} day study streak`}>
                🔥 {streak} {streak === 1 ? 'day' : 'days'}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="study-track-banner__btn"
              title="Change your target level or subject"
            >
              {isPersonalized ? '⚙️ Change Track' : 'Personalize Now →'}
            </button>
          </div>
          
          {/* Progress Dashboard */}
          <div className="progress-dashboard">
            <div className="progress-dashboard__header">
              <span className="progress-dashboard__label">
                {activeSubject ? `Subject Progress · ${activeSubject.title}` : 'Subject Progress'}
              </span>
              <span className="progress-dashboard__value">{subjectProgressPercent}%</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${subjectProgressPercent}%` }}
              />
            </div>
            <div className="progress-dashboard__footer">
              <span>
                {subjectCompletedCount} of {subjectTotalNotes} notes completed
              </span>
              {nextNoteToStudy && (
                <button
                  type="button"
                  onClick={handleContinueLearning}
                  className="progress-dashboard__cta"
                >
                  Resume: {nextNoteToStudy.title.slice(0, 24)}... →
                </button>
              )}
            </div>
          </div>

          <div className="hero-actions">
            <button type="button" onClick={handleContinueLearning} className="hero-cta">
              Continue Learning →
            </button>
            {isPersonalized && activeSubject ? (
              <Link to={`/subjects/${activeSubject.id}`} className="hero-secondary">
                View {activeSubject.title} Syllabus →
              </Link>
            ) : isPersonalized && activeLevel ? (
              <Link to={`/levels/${activeLevel.id}`} className="hero-secondary">
                Browse {activeLevel.shortTitle || activeLevel.title} Subjects →
              </Link>
            ) : (
              <Link to="/subjects" className="hero-secondary">
                Browse all subjects
              </Link>
            )}
          </div>
        </div>

        <div className="hero-graphic-wrap">
          <InteractiveMarketCurve />
        </div>
      </section>

      {/* Resume Your Learning */}
      <section className="resume-section">
        <span className="eyebrow">Study Workspace</span>
        <h2>Resume Your Learning</h2>
        <div className="resume-tabs">
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'continue' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('continue')}
          >
            Up Next <span className="resume-tab-badge">{subjectTotalNotes}</span>
          </button>
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'completed' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed <span className="resume-tab-badge">{completedNotes.length}</span>
          </button>
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'bookmarked' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('bookmarked')}
          >
            Bookmarked <span className="resume-tab-badge">{bookmarkedNotes.length}</span>
          </button>
        </div>

        <div className="home-note-grid">
          {displayNotes.map((note) => {
            const subject = getSubjectById(note.subjectId)
            const bookmarked = isBookmarked(note.id)
            const completed = isCompleted(note.id)

            return (
              <article key={note.id} className="home-note-card">
                <div className="home-note-card__top">
                  {subject ? (
                    <Link to={`/subjects/${subject.id}`} className="home-note-card__tag">
                      {subject.title}
                    </Link>
                  ) : (
                    <span className="home-note-card__tag">Economics</span>
                  )}

                  <div className="home-note-card__actions">
                    <button
                      type="button"
                      className={`home-note-card__btn ${bookmarked ? 'is-active home-note-card__btn--bookmark' : ''}`}
                      onClick={(e) => handleToggleBookmark(note.id, e)}
                      title={bookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
                      aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
                      aria-pressed={bookmarked}
                    >
                      ★
                    </button>
                    <button
                      type="button"
                      className={`home-note-card__btn ${completed ? 'is-active home-note-card__btn--complete' : ''}`}
                      onClick={(e) => handleToggleLesson(note.id, e)}
                      title={completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                      aria-label={completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                      aria-pressed={completed}
                    >
                      ✓
                    </button>
                  </div>
                </div>

                <h3 className="home-note-card__title">
                  <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </h3>
                <p className="home-note-card__summary">{note.summary}</p>

                <div className="home-note-card__footer">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  <Link to={`/notes/${note.id}`} className="home-note-card__link">
                    Read Note →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {activeTab === 'continue' && activeSubject && activeSubjectNotes.length > 0 && (
          <div className="home-view-more-wrap">
            <Link
              to={`/subjects/${activeSubject.id}`}
              className="home-view-more-btn"
            >
              View all {activeSubject.title} notes ({subjectTotalNotes}) →
            </Link>
          </div>
        )}

        {displayNotes.length === 0 && (
          <div className="resume-empty">
            {activeTab === 'completed' && (
              <p>You haven’t marked any notes as completed yet. Read any note and click "Mark Complete" to track your progress!</p>
            )}
            {activeTab === 'bookmarked' && (
              <p>You haven’t saved any bookmarks yet. Click the star icon on any note to pin it here for quick review!</p>
            )}
            {activeTab === 'continue' && (
              <p>All notes completed in {activeSubject?.title}! Excellent achievement.</p>
            )}
            <Link to="/notes" className="hero-cta" style={{ marginTop: '1rem' }}>
              Explore All Notes →
            </Link>
          </div>
        )}
      </section>

      {/* Stay Motivated */}
      <section className="motivation-section">
        <span className="eyebrow">Stay motivated</span>
        <h2>Keep up your momentum</h2>
        <div className="motivation-grid">
          <div className="motivation-card motivation-card--streak">
            <div className="motivation-card__header">
              <h3>🔥 Study Streak</h3>
              <span className="home-note-card__tag">Consistency</span>
            </div>
            <div className="streak-display">
              <span className="streak-number">{streak}</span>
              <span className="streak-label">{streak === 1 ? 'Day Active' : 'Days Streak'}</span>
            </div>

            {/* 7-Day Habit Activity Matrix */}
            <div className="activity-matrix" aria-label="7-day study activity history">
              <div className="activity-matrix__header">
                <span className="activity-matrix__title">Weekly Momentum</span>
                <span className="activity-matrix__subtitle">Last 7 Days</span>
              </div>
              <div className="activity-matrix__dots">
                {last7Days.map((day) => (
                  <div
                    key={day.dateStr}
                    className={`activity-dot-col ${day.isToday ? 'is-today' : ''} ${day.isActive ? 'is-active' : ''}`}
                    title={`${day.dayLabel} (${day.dateStr}): ${day.isActive ? 'Studied' : 'Rest day'}`}
                  >
                    <span className="activity-dot-col__label">{day.dayLabel}</span>
                    <div className="activity-dot">
                      {day.isActive ? (
                        <span className="activity-dot__check" aria-hidden="true">✓</span>
                      ) : (
                        <span className="activity-dot__ring" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="streak-hint">
              {streak > 0
                ? 'Great consistency! Study or mark notes completed daily to keep your streak alive.'
                : 'Complete or bookmark a note today to start your study streak!'}
            </p>
          </div>

          <div className="motivation-card">
            <div className="motivation-card__header">
              <h3>🎯 Weekly Goal</h3>
              <span className="home-note-card__tag">Target</span>
            </div>
            <div className="goal-progress-wrap">
              <div className="goal-progress-text">
                <span>{subjectCompletedCount} of {weeklyGoal} target</span>
                <span>{Math.min(100, Math.round((subjectCompletedCount / weeklyGoal) * 100))}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${Math.min(100, (subjectCompletedCount / weeklyGoal) * 100)}%` }}
                />
              </div>
            </div>

            <div className="goal-presets">
              <span>Presets:</span>
              {[3, 5, 10, 15].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`goal-preset-btn ${weeklyGoal === g ? 'is-active' : ''}`}
                  onClick={() => handleSetWeeklyGoal(g)}
                >
                  {g} notes
                </button>
              ))}
            </div>

            <form onSubmit={handleCustomGoalSubmit} className="goal-form">
              <input
                type="number"
                min="1"
                max="100"
                value={customGoalInput}
                onChange={(e) => setCustomGoalInput(e.target.value)}
                placeholder="Custom goal"
                aria-label="Set custom weekly goal"
              />
              <button type="submit">Set Goal</button>
            </form>
          </div>
        </div>
      </section>

      {/* Curriculum & Subjects Section */}
      <section>
        {isPersonalized && activeLevel ? (
          <>
            <div className="discovery-section-heading">
              <div>
                <span className="eyebrow">Your Syllabus · {activeLevel.title}</span>
                <h2>Subjects in {activeLevel.shortTitle || activeLevel.title}</h2>
                <p>Follow your coursework with real-time completion tracking.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="study-track-banner__btn"
              >
                ⚙️ Switch Level
              </button>
            </div>
            <div className="subjects-grid">
              {getSubjectsByLevel(activeLevel.id).map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={getSubjectProgress(subject.id)}
                />
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link to="/levels" className="back-link">
                Want to explore other academic levels? Browse all levels →
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="eyebrow">Your curriculum, in order</span>
            <h2>Choose your level</h2>
            <p>Pick where you are in your studies to see relevant subjects and track syllabus progress.</p>
            <div className="levels-grid">
              {levels.map((level, index) => (
                <LevelCard
                  key={level.id}
                  level={level}
                  subjectCount={getSubjectsByLevel(level.id).length}
                  progress={getLevelProgress(level.id)}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Home
