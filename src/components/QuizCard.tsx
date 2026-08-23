import { useState } from 'react'
import type { Quiz } from '../data/content'

type QuizCardProps = {
  quiz: Quiz
  onCompleted?: (score: number, total: number) => void
}

function QuizCard({ quiz, onCompleted }: QuizCardProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((answer) => answer !== null)
  const score = answers.reduce<number>(
    (total, answer, index) => (answer === quiz.questions[index].answerIndex ? total + 1 : total),
    0,
  )

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return
    setAnswers((previous) => {
      const next = [...previous]
      next[questionIndex] = optionIndex
      return next
    })
  }

  function handleSubmit() {
    if (!allAnswered) return
    setSubmitted(true)
    const key = `learn.quiz.${quiz.id}`
    const previousBest = Number.parseInt(localStorage.getItem(key) || '-1', 10)
    if (score > previousBest) localStorage.setItem(key, String(score))
    onCompleted?.(score, quiz.questions.length)
  }

  function handleRetry() {
    setAnswers(quiz.questions.map(() => null))
    setSubmitted(false)
  }

  return (
    <article className="quiz-card">
      <h3>{quiz.title}</h3>
      <p className="quiz-progress">{answers.filter((answer) => answer !== null).length} of {quiz.questions.length} answered</p>

      {quiz.questions.map((question, questionIndex) => (
        <fieldset className="quiz-question" key={questionIndex}>
          <legend className="quiz-question__text">
            {questionIndex + 1}. {question.question}
          </legend>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => {
              const isSelected = answers[questionIndex] === optionIndex
              const isCorrect = optionIndex === question.answerIndex
              let optionClass = 'quiz-option'
              if (isSelected) optionClass += ' quiz-option--selected'
              if (submitted && isCorrect) optionClass += ' quiz-option--correct'
              if (submitted && isSelected && !isCorrect) optionClass += ' quiz-option--incorrect'

              return (
                <button
                  key={optionIndex}
                  type="button"
                  className={optionClass}
                  onClick={() => selectAnswer(questionIndex, optionIndex)}
                  disabled={submitted}
                  aria-pressed={isSelected}
                >
                  {option}
                </button>
              )
            })}
          </div>
          {submitted && (
            <p className={question.answerIndex === answers[questionIndex] ? 'quiz-feedback quiz-feedback--correct' : 'quiz-feedback quiz-feedback--incorrect'}>
              {question.answerIndex === answers[questionIndex] ? 'Correct. ' : 'Not quite. '}
              {question.explanation}
            </p>
          )}
        </fieldset>
      ))}

      <div className="quiz-actions">
        {!submitted ? (
          <button type="button" className="quiz-submit" onClick={handleSubmit} disabled={!allAnswered}>
            Submit answers
          </button>
        ) : (
          <>
            <p className="quiz-score" role="status" aria-live="polite">
              You scored {score} / {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%).
            </p>
            <button type="button" className="quiz-submit" onClick={handleRetry}>Try again</button>
          </>
        )}
      </div>
    </article>
  )
}

export default QuizCard
