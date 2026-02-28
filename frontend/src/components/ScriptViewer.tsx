// src/components/ScriptViewer.tsx
// 狸塚先生と主人公の対話を表示するコンポーネント

import { useState } from 'react'
import type { Chapter } from '../types/index'
import { RubyText } from './RubyText'

type Props = {
  chapter: Chapter
}

export const ScriptViewer = ({ chapter }: Props) => {
  // 現在表示しているセリフのインデックス
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentScript = chapter.scripts[currentIndex]
  const isLast = currentIndex === chapter.scripts.length - 1

  const handleNext = () => {
    if (!isLast) setCurrentIndex(currentIndex + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  return (
    <div>
      <h2>{chapter.title}</h2>
      <p>{currentIndex + 1} / {chapter.scripts.length}</p>

      {/* セリフ表示エリア */}
      <div>
        <p>【{currentScript.character}】</p>
        <p><RubyText text={currentScript.text} /></p>
      </div>

      {/* ナビゲーションボタン */}
      <button onClick={handlePrev} disabled={currentIndex === 0}>
        ← 前へ
      </button>
      <button onClick={handleNext} disabled={isLast}>
        次へ →
      </button>
    </div>
  )
}