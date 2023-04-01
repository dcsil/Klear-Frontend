export interface IStudentStore {
  students: Student[]
}

export interface Student {
  student_id: string
  age: number
  contact_name: string
  contact_number: string
  first_name: string
  last_name: string
}

export interface StudentIncident {
  date: string
  event: string
  resolved_user: string
  status: string
  student_id: string
  type: string
  activity?: string
  incident_id?: string
}
