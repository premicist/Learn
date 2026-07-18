import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Subjects from './pages/Subjects'
import LevelDetails from './pages/LevelDetails'
import SubjectDetails from './pages/SubjectDetails'
import Notes from './pages/Notes'
import Blogs from './pages/Blogs'
import Quizzes from './pages/Quizzes'
import Videos from './pages/Videos'
import About from './pages/About'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<SubjectDetails />} />
          <Route path="/levels/:levelId" element={<LevelDetails />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
