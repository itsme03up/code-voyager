// src/hooks/useChapterContent.ts
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Quiz, Terminal } from '../types/index'

const API_URL = 'http://localhost:8000'

type Column = {
  id: number
  chapter_id: number
  title: string
  content: string
  category: string | null
  order: number
}

export const useChapterContent = (chapterId: number) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [terminals, setTerminals] = useState<Terminal[]>([])
  const [columns, setColumns] = useState<Column[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const [qRes, tRes, cRes] = await Promise.all([
        axios.get(`${API_URL}/api/chapters/${chapterId}/quizzes`),
        axios.get(`${API_URL}/api/chapters/${chapterId}/terminals`),
        axios.get(`${API_URL}/api/chapters/${chapterId}/columns`),
      ])
      setQuizzes(qRes.data)
      setTerminals(tRes.data)
      setColumns(cRes.data)
      setLoading(false)
    }
    fetch()
  }, [chapterId])

  return { quizzes, terminals, columns, loading }
}