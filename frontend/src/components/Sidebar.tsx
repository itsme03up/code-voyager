// src/components/Sidebar.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import type { Chapter } from '../types/index'

const API_URL = 'http://localhost:8000'

export const Sidebar = () => {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await axios.get(`${API_URL}/scripts/chapters`)
      setChapters(response.data)
    }
    fetchChapters()
  }, [])

  return (
    <aside className="sidebar">
      {/* ロゴ */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <span className="sidebar-logo-icon">🦝</span>
        <span className="sidebar-logo-text">狸塚先生の教室</span>
      </div>

      {/* コース一覧 */}
      <nav className="sidebar-nav">
        <p className="sidebar-section-title">📚 コース一覧</p>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`sidebar-item ${String(id) === String(chapter.id) ? 'active' : ''}`}
            onClick={() => navigate(`/chapters/${chapter.id}`)}
          >
            {chapter.title}
          </div>
        ))}
      </nav>
    </aside>
  )
}