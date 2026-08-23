import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MoveToTop from './components/MoveToTop'

const Home = lazy(() => import('./pages/Home'))
const Subjects = lazy(() => import('./pages/Subjects'))
const LevelDetails = lazy(() => import('./pages/LevelDetails'))
const SubjectDetails = lazy(() => import('./pages/SubjectDetails'))
const Notes = lazy(() => import('./pages/Notes'))
const NotePage = lazy(() => import('./pages/NotePage'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const Quizzes = lazy(() => import('./pages/Quizzes'))
const Videos = lazy(() => import('./pages/Videos'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<SubjectDetails />} />
            <Route path="/levels/:levelId" element={<LevelDetails />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:noteId" element={<NotePage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<BlogPage />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MoveToTop />
    </>
  )
}

export default App
