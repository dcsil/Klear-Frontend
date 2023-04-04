import { domain, headers } from './Headers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Sentry from 'sentry-expo'
import { type StudentIncident, type Student } from '../store/StudentTypes'

export const getAllStudents = async (): Promise<Student[] | undefined> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await fetch(domain + "/student/all", {
      method: 'GET',
      ...headers(accessToken)
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
  }
}

export const getStudentHistory =
  async (studentID: string): Promise<StudentIncident[] | undefined> => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      const response = await fetch(domain + `/student/history/${studentID}`, {
        method: 'GET',
        ...headers(accessToken)
      })
      return await response.json()
    } catch (e) {
      Sentry.Native.captureException(e)
    }
  }
