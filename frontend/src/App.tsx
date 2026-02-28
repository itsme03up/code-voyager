// src/App.tsx

import { useChapter } from './hooks/useChapter'
import { ScriptViewer } from './components/ScriptViewer'

function App() {
  const { chapter, loading, error } = useChapter(1) // 1章を取得

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>{error}</p>
  if (!chapter) return <p>章が見つかりません</p>

  return (
    <div>
      <h1>狸塚先生の学習サイト</h1>
      <ScriptViewer chapter={chapter} />
    </div>
  )
}

export default App