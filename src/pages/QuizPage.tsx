import { Link, useParams } from 'react-router'
import { getQuizById } from '../data/content'
import { getSubjectById } from '../data/levels'
import QuizCard from '../components/QuizCard'
import Seo from '../components/Seo'

function QuizPage() {
  const { quizId } = useParams()
  const quiz = quizId ? getQuizById(quizId) : undefined
  const subject = quiz ? getSubjectById(quiz.subjectId) : undefined

  if (!quiz || !subject) {
    return (
      <section>
        <Seo title="Quiz not found | Prem Pokhrel" description="The requested economics quiz could not be found." />
        <h2>Quiz not found</h2>
        <Link to="/quizzes">Back to quizzes</Link>
      </section>
    )
  }

  return (
    <section className="article-page">
      <Seo title={`${quiz.title} | Prem Pokhrel`} description={`${quiz.questions.length}-question economics quiz for ${subject.title}.`} type="article" />
      <p className="eyebrow">Practice quiz</p>
      <div className="article-page__meta"><Link to={`/subjects/${subject.id}`}>{subject.title}</Link><span>{quiz.questions.length} questions</span></div>
      <h1>{quiz.title}</h1>
      <p className="article-page__excerpt">Test your understanding and receive instant explanations after submitting.</p>
      <QuizCard quiz={quiz} />
      <Link to={`/subjects/${subject.id}`} className="back-link">← Back to {subject.title}</Link>
    </section>
  )
}

export default QuizPage
