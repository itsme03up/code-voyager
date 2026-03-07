// src/pages/ColumnsPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useColumns } from '../hooks/useColumns'
import './ColumnsPage.css'

export const ColumnsPage = () => {
  const navigate = useNavigate()
  const { columns, tags } = useColumns()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = columns.filter(col => {
    const matchesSearch = col.title.includes(search) || col.content.includes(search)
    const matchesTag = !selectedTag || col.category === selectedTag
    return matchesSearch && matchesTag
  })

  return (
    <div className="columns-wrapper">
      <div className="columns-header">
        <input
          className="columns-search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="検索..."
        />
        <div className="columns-tags">
          <button onClick={() => setSelectedTag(null)} className={!selectedTag ? 'active' : ''}>ALL</button>
          {tags.map(tag => (
            <button key={tag} onClick={() => setSelectedTag(tag)} className={selectedTag === tag ? 'active' : ''}>{tag}</button>
          ))}
        </div>
      </div>
      <div className="columns-list">
        {filtered.map(col => (
          <div key={col.id} className="column-card" onClick={() => navigate(`/columns/${col.id}`)}>
            <div className="column-category">{col.category}</div>
            <div className="column-title">{col.title}</div>
            <div className="column-preview">{col.content.slice(0, 80)}...</div>
          </div>
        ))}
      </div>
    </div>
  )
}
