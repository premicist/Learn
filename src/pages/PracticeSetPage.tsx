import { Link, useParams } from 'react-router'
import { getPracticeSetById } from '../data/content'
import { getSubjectById } from '../data/levels'
import PracticeSetCard from '../components/PracticeSetCard'
import Seo from '../components/Seo'

function PracticeSetPage() {
  const { practiceSetId } = useParams()
  const practiceSet = practiceSetId ? getPracticeSetById(practiceSetId) : undefined
  const subject = practiceSet ? getSubjectById(practiceSet.subjectId) : undefined

  if (!practiceSet || !subject) {
    return (
      <section>
        <Seo title="Practice set not found | Prem Pokhrel" description="The requested practice set could not be found." />
        <h2>Practice set not found</h2>
        <Link to="/practice-sets">Back to practice sets</Link>
      </section>
    )
  }

  return (
    <section className="article-page">
      <Seo
        title={`${practiceSet.title} | Prem Pokhrel`}
        description={`${practiceSet.questions.length}-question practice set for ${subject.title}.`}
        type="article"
      />
      <p className="eyebrow">Practice set</p>
      <div className="article-page__meta">
        <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
        <span>{practiceSet.questions.length} questions</span>
      </div>
      <h1>{practiceSet.title}</h1>
      <p className="article-page__excerpt">
        Numerical answers are scored instantly. Writing answers are saved for your teacher to grade.
      </p>
      <PracticeSetCard practiceSet={practiceSet} />
      <Link to={`/subjects/${subject.id}`} className="back-link">← Back to {subject.title}</Link>
    </section>
  )
}

export default PracticeSetPage
