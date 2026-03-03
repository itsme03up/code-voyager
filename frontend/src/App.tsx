// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { TopPage } from './pages/TopPage'
import { CoursePage } from './pages/CoursePage'
import { ChapterPage } from './pages/ChapterPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/chapters/:id" element={<ChapterPage />} />
      </Routes>
    </Layout>
  )
}

export default App

