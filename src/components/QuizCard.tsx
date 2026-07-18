import { useState } from 'react'
import type { Quiz } from '../data/content'

type QuizCardProps = {
  quiz: Quiz
}

function QuizCard({ quiz }: QuizCardProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => quiz.questions.map(() => null),
  )
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)
  const score = answers.reduce<number>(
    (total, answer, index) => (answer === quiz.questions[index].answerIndex ? total + 1 : total),
    0,
  )

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = optionIndex
      return next
    })
  }

  function handleSubmit() {
    if (!allAnswered) return
    setSubmitted(true)
  }

  function handleRetry() {
    setAnswers(quiz.questions.map(() => null))
    setSubmitted(false)
  }

  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>

      {quiz.questions.map((q, qIndex) => (
        <div className="quiz-question" key={qIndex}>
          <p className="quiz-question__text">
            {qIndex + 1}. {q.question}
          </p>
          <div className="quiz-options">
            {q.options.map((option, oIndex) => {
              const isSelected = answers[qIndex] === oIndex
              const isCorrect = oIndex === q.answerIndex
              let optionClass = 'quiz-option'
              if (isSelected) optionClass += ' quiz-option--selected'
              if (submitted && isCorrect) optionClass += ' quiz-option--correct'
              if (submitted && isSelected && !isCorrect) optionClass += ' quiz-option--incorrect'

              return (
                <button
                  key={oIndex}
                  type="button"
                  className={optionClass}
                  onClick={() => selectAnswer(qIndex, oIndex)}
                  disabled={submitted}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      <div className="quiz-actions">
        {!submitted ? (
          <button type="button" className="quiz-submit" onClick={handleSubmit} disabled={!allAnswered}>
            Submit Answers
          </button>
        ) : (
          <>
            <p className="quiz-score">
              You scored {score} / {quiz.questions.length}
            </p>
            <button type="button" className="quiz-submit" onClick={handleRetry}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizCard
