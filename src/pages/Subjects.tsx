import { useState } from 'react'
import { levels, getSubjectsByLevel, getLevelById } from '../data/levels'
import { notes } from '../data/generated/content'
import SubjectCard from '../components/SubjectCard'
import Seo from '../components/Seo'
import { useStudentProfile } from '../utils/useStudentProfile'
import { useLessonProgress } from '../utils/useLessonProgress'

function Subjects() {
  const { profile, isPersonalized } = useStudentProfile()
  const { getUnitProgress } = useLessonProgress()

  const [selectedLevelId, setSelectedLevelId] = useState<string>(() => {
    return profile?.levelId || ''
  })

  const userLevel = profile?.levelId ? getLevelById(profile.levelId) : undefined

  const getSubjectProgress = (subjectId: string) => {
    const subjNoteIds = notes.filter((n) => n.subjectId === subjectId).map((n) => n.id)
    return getUnitProgress(subjNoteIds)
  }

  const displayedLevels = selectedLevelId
    ? levels.filter((lvl) => lvl.id === selectedLevelId)
    : levels

  return (
    <section>
      <Seo
        title="Economics subjects | Prem Pokhrel"
        description="Explore economics subjects organized by school, bachelor’s, and master’s level."
      />
      <span className="eyebrow">
        {userLevel ? `Curriculum · ${userLevel.title}` : 'Economics Coursework'}
      </span>
      <h2>Subjects</h2>
      <p>Explore economics subjects tailored to your syllabus.</p>

      {/* Level Filter Tabs */}
      <div className="tabs" style={{ margin: '18px 0 24px' }}>
        {isPersonalized && userLevel && (
          <button
            type="button"
            className={`tab-button ${selectedLevelId === userLevel.id ? 'is-active' : ''}`}
            onClick={() => setSelectedLevelId(userLevel.id)}
          >
            ★ My Track ({userLevel.shortTitle || userLevel.title})
          </button>
        )}
        <button
          type="button"
          className={`tab-button ${selectedLevelId === '' ? 'is-active' : ''}`}
          onClick={() => setSelectedLevelId('')}
        >
          All Levels
        </button>
        {levels.map((level) => {
          if (isPersonalized && level.id === userLevel?.id) return null
          return (
            <button
              key={level.id}
              type="button"
              className={`tab-button ${selectedLevelId === level.id ? 'is-active' : ''}`}
              onClick={() => setSelectedLevelId(level.id)}
            >
              {level.shortTitle || level.title}
            </button>
          )
        })}
      </div>

      {displayedLevels.map((level) => {
        const levelSubjects = getSubjectsByLevel(level.id)
        if (levelSubjects.length === 0) return null

        return (
          <div className="level-group" key={level.id}>
            <h3 className="level-group__title">{level.title}</h3>
            <div className="subjects-grid">
              {levelSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={getSubjectProgress(subject.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Subjects
