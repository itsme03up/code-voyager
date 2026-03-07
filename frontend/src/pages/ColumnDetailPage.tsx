// src/pages/ColumnDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useColumns } from '../hooks/useColumns'
import './ChapterPage.css'
import './ColumnsPage.css'

export const ColumnDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { columns } = useColumns()
  const column = columns.find(col => col.id === Number(id))

  if (!column) return <div>コラムが見つかりません</div>

  return (
    <div className="column-detail-wrapper">
      <button className="chapter-button" onClick={() => navigate(-1)}>← BACK</button>
      <div className="column-category">{column.category}</div>
      <div className="column-title">{column.title}</div>
      <div className="column-content">
        {column.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  )
}
