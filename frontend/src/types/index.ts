// src/types/index.ts

export type Script = {
  id: number
  text: string
  order: number
  chapter_id: number
}

export type Chapter = {
  id: number
  course_id: number
  title: string
  description: string | null
  order: number
  scripts: Script[]
  dependency_ids: number[]
}

export type Course = {
  id: number
  title: string
  description: string | null
  icon: string | null
  order: number
  chapters: Chapter[]
}