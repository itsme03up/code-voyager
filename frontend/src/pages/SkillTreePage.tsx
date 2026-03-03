// src/pages/SkillTreePage.tsx
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import type { Course } from '../types/index'
import './SkillTreePage.css'

type Props = {
  courses: Course[]
}

export const SkillTreePage = ({ courses }: Props) => {
  const navigate = useNavigate()
  const { isCompleted, progress } = useProgress()

  // コースの最初のチャプターが解放されているか確認
  const isCourseUnlocked = (course: Course): boolean => {
    if (course.chapters.length === 0) return false
    const firstChapter = course.chapters[0]

    // 依存関係がなければ解放済み
    if (firstChapter.dependency_ids.length === 0) return true

    // 全ての前提チャプターが完了していれば解放
    return firstChapter.dependency_ids.every((depId) =>
      progress.completedChapters.includes(depId)
    )
  }

  const isCourseCompleted = (course: Course): boolean => {
    if (course.chapters.length === 0) return false
    return course.chapters.every((ch) => isCompleted(ch.id))
  }

  return (
    <div className="skilltree-wrapper">
      <div className="skilltree-header">
        <h1 className="skilltree-title">CODE VOYAGER</h1>
        <p className="skilltree-subtitle">// SELECT MISSION</p>
      </div>

      <div className="skilltree-grid">
        {courses.map((course) => {
          const unlocked = isCourseUnlocked(course)
          const completed = isCourseCompleted(course)

          return (
            <div
              key={course.id}
              className={`skilltree-node ${completed ? 'completed' : ''} ${unlocked && !completed ? 'unlocked' : ''} ${!unlocked ? 'locked' : ''}`}
              onClick={() => unlocked && navigate(`/courses/${course.id}`)}
            >
              <div className="node-icon">{course.icon}</div>
              <div className="node-title">{course.title}</div>
              <div className="node-desc">{course.description}</div>
              {completed && <div className="node-badge">[ CLEAR ]</div>}
              {!unlocked && <div className="node-lock">🔒</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}