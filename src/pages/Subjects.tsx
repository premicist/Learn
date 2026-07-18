import { levels, getSubjectsByLevel } from '../data/levels'
import SubjectCard from '../components/SubjectCard'

function Subjects() {
  return (
    <section>
      <h2>All Subjects</h2>
      <p>Every subject, grouped by level.</p>

      {levels.map((level) => {
        const levelSubjects = getSubjectsByLevel(level.id)
        if (levelSubjects.length === 0) return null

        return (
          <div className="level-group" key={level.id}>
            <h3 className="level-group__title">{level.title}</h3>
            <div className="subjects-grid">
              {levelSubjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Subjects
