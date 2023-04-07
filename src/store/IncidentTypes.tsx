import { type Student } from './StudentTypes'

export interface Incident {
  incident_id: number
  status: number
  event: string
  date: string
  first_name: string
  last_name: string
  screenshot?: string
  students?: [Student]
}
