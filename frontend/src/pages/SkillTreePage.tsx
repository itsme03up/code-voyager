// src/pages/SkillTreePage.tsx
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import type { Course } from '../types/index'
import './SkillTreePage.css'

type Props = {
  courses: Course[]
}

const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: 'FUNDAMENTALS',
  programming_language: 'PROGRAMMING LANGUAGE',
  container: 'CONTAINER',
  cloud: 'CLOUD',
  iac: 'IaC',
  cicd: 'CI/CD',
}

export const SkillTreePage = ({ courses }: Props) => {
  const navigate = useNavigate()
  const { isCompleted, progress } = useProgress()

  const isCourseUnlocked = (course: Course): boolean => {
    if (course.chapters.length === 0) return false
    const firstChapter = course.chapters[0]
    if (firstChapter.dependency_ids.length === 0) return true
    return firstChapter.dependency_ids.every((depId) =>
      progress.completedChapters.includes(depId)
    )
  }

  const isCourseCompleted = (course: Course): boolean => {
    if (course.chapters.length === 0) return false
    return course.chapters.every((ch) => isCompleted(ch.id))
  }

  // カテゴリでグループ化
  const categoryOrder = ['fundamentals', 'programming_language', 'container', 'cloud', 'iac', 'cicd']
  const grouped = categoryOrder.reduce((acc, cat) => {
    const filtered = courses.filter((c) => c.category === cat)
    if (filtered.length > 0) acc[cat] = filtered
    return acc
  }, {} as Record<string, Course[]>)

  return (
    <div className="skilltree-wrapper">
      <div className="skilltree-header">
        <h1 className="skilltree-title">CODE VOYAGER</h1>
        <p className="skilltree-subtitle">// SELECT MISSION</p>
      </div>

      <div className="skilltree-roadmap">
        {categoryOrder.filter((cat) => grouped[cat]).map((cat, catIndex) => (
          <div key={cat} className="skilltree-category-block">
            {/* カテゴリ間のライン */}
            {catIndex > 0 && (
              <div className="skilltree-connector">
                <div className="connector-line" />
              </div>
            )}

            {/* カテゴリラベル */}
            <div className="skilltree-category-label">
              {CATEGORY_LABELS[cat] || cat.toUpperCase()}
            </div>

            {/* コースノード群 */}
            <div className="skilltree-nodes-row">
              {grouped[cat].map((course) => {
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
                    {completed && <div className="node-badge">[ CLEAR ]</div>}
                    {!unlocked && <div className="node-lock">🔒</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}