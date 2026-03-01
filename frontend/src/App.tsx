// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { TopPage } from './pages/TopPage'
import { useChapter } from './hooks/useChapter'
import { ChapterPage } from './pages/ChapterPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/chapters/:id" element={<ChapterPage />} />
      </Routes>
    </Layout>
  )
}

export default App
