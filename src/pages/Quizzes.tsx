import { Link } from 'react-router'
import { quizzes } from '../data/content'
import { getSubjectById } from '../data/levels'
import QuizCard from '../components/QuizCard'

function Quizzes() {
  return (
    <section>
      <h2>Quizzes</h2>
      <p>Test your understanding with short quizzes for each subject.</p>

      <div className="quizzes-list">
        {quizzes.map((quiz) => {
          const subject = getSubjectById(quiz.subjectId)
          return (
            <div key={quiz.id}>
              <QuizCard quiz={quiz} />
              {subject && (
                <Link to={`/subjects/${subject.id}`} className="note-item__tag">
                  {subject.title}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Quizzes
