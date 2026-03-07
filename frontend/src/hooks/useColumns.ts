// src/hooks/useColumns.ts
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

type Column = {
  id: number
  chapter_id: number
  title: string
  content: string
  category: string | null
  order: number
}

export const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/api/columns`).then(res => setColumns(res.data))
  }, [])

  const tags = [...new Set(columns.map(c => c.category).filter(Boolean))] as string[]

  return { columns, tags }
}
