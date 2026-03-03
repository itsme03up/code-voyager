// src/pages/CoursePage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Course } from '../types/index'
import { useProgress } from '../hooks/useProgress'

const API_URL = 'http://localhost:8000'

export const CoursePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const { isCompleted, progress } = useProgress()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_URL}/api/courses/${id}`)
      setCourse(response.data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return <p style={{ color: '#e0f7ff', padding: '40px' }}>LOADING...</p>
  if (!course) return <p style={{ color: '#ff4444', padding: '40px' }}>NOT FOUND</p>

  const isChapterUnlocked = (depIds: number[]) => {
    if (depIds.length === 0) return true
    return depIds.every((depId) => progress.completedChapters.includes(depId))
  }

  return (
    <div style={{ padding: '40px', fontFamily: "'Share Tech Mono', monospace", color: '#e0f7ff', background: '#020408', minHeight: '100vh' }}>
      <p style={{ color: '#1a8fb5', fontSize: '12px', letterSpacing: '0.2em', cursor: 'pointer' }} onClick={() => navigate('/')}>
        ← BACK TO MAP
      </p>
      <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: '24px', margin: '16px 0 8px', color: '#e0f7ff' }}>
        {course.icon} {course.title}
      </h1>
      <p style={{ color: '#4a9ab5', fontSize: '13px', marginBottom: '32px' }}>{course.description}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
        {course.chapters.map((chapter) => {
          const unlocked = isChapterUnlocked(chapter.dependency_ids)
          const completed = isCompleted(chapter.id)

          return (
            <div
              key={chapter.id}
              onClick={() => unlocked && navigate(`/chapters/${chapter.id}`)}
              style={{
                padding: '16px 20px',
                border: `1px solid ${completed ? '#ffd700' : unlocked ? '#1a8fb5' : '#0d2a3a'}`,
                borderRadius: '8px',
                background: completed ? 'rgba(255,215,0,0.05)' : unlocked ? 'rgba(26,143,181,0.05)' : 'transparent',
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '13px' }}>
                {completed ? '⭐ ' : unlocked ? '▶ ' : '🔒 '}
                {chapter.title}
              </span>
              {completed && <span style={{ color: '#ffd700', fontSize: '11px', letterSpacing: '0.1em' }}>CLEAR</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}