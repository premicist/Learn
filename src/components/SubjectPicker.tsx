import { getLevelById, type Subject } from '../data/levels'

type SubjectPickerProps = {
  subjects: Subject[]
  resourceLabel: string
  getCount: (subjectId: string) => number
  onSelect: (subjectId: string) => void
}

function SubjectPicker({ subjects, resourceLabel, getCount, onSelect }: SubjectPickerProps) {
  const pluralLabel = resourceLabel === 'quiz' ? 'quizzes' : `${resourceLabel}s`
  return (
    <section className="subject-picker" aria-labelledby="subject-picker-heading">
      <div className="subject-picker__header">
        <div>
          <p className="eyebrow">Choose a subject</p>
          <h2 id="subject-picker-heading">Browse by subject</h2>
        </div>
        <span className="subject-picker__count">{subjects.length} subjects</span>
      </div>
      <div className="subject-picker__grid">
        {subjects.map((subject) => (
          <button type="button" className="subject-picker__card" key={subject.id} onClick={() => onSelect(subject.id)}>
            <span className="subject-picker__bar" style={{ backgroundColor: subject.color }} aria-hidden="true" />
            <span className="subject-picker__copy">
              <span className="subject-picker__level">{getLevelById(subject.levelId)?.shortTitle || subject.levelId}</span>
              <strong>{subject.title}</strong>
              <span>{subject.description}</span>
            </span>
            <span className="subject-picker__meta">{getCount(subject.id)} {getCount(subject.id) === 1 ? resourceLabel : pluralLabel} <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SubjectPicker
