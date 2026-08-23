import Seo from '../components/Seo'

function About() {
  return (
    <section>
      <Seo title="About | Prem Pokhrel" description="Learn about Prem Pokhrel’s economics learning resources for school, bachelor’s, and master’s level students." />
      <span className="eyebrow">About the project</span>
      <h2>About Prem Pokhrel ECON</h2>
      <p>
        Prem Pokhrel ECON is a learning resource covering economics from Class 11 &amp; 12 (NEB)
        through bachelor&apos;s and master&apos;s level. It brings together study notes, blog articles,
        short quizzes, and videos for each subject in one place.
      </p>
      <p>
        Subjects currently covered include Microeconomics, Macroeconomics, Mathematical Economics,
        Sociology, Revenue Management, Human Resource Management, and Managerial Economics,
        alongside school-level Economics.
      </p>
      <p>
        This site is a work in progress. New notes, quizzes, and videos are added regularly, and
        learners can request topics that would help them study more effectively.
      </p>
      <a className="no-results__cta" href="https://forms.gle/fwU1Fyxs3RKVEHxT7" target="_blank" rel="noopener noreferrer">
        Request a topic →
      </a>
    </section>
  )
}

export default About
