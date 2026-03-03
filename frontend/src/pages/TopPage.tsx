// src/pages/TopPage.tsx
import { useCourses } from '../hooks/useCourses'
import { SkillTreePage } from './SkillTreePage'

export const TopPage = () => {
  const { courses, loading, error } = useCourses()

  if (loading) return <p style={{ color: '#e0f7ff', padding: '40px' }}>LOADING...</p>
  if (error) return <p style={{ color: '#ff4444', padding: '40px' }}>{error}</p>

  return <SkillTreePage courses={courses} />
}