import { domain, headers } from './Headers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Sentry from 'sentry-expo'

export const signup = async (firstName: string, lastName: string,
  email: string, password: string): Promise<string> => {
  try {
    const response = await fetch(domain + "/register", {
      method: 'POST',
      ...headers(),
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
    if (response.status == 409) return "Email already exists"
    const responeJson = await response.json()
    if (!responeJson.accessToken) return "Sign up Error"
    AsyncStorage.setItem('accessToken', responeJson.accessToken)
    return "success"
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
    return "Unexpected Error"
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(domain + "/login", {
      method: 'POST',
      ...headers(),
      body: JSON.stringify({
        email,
        password
      })
    })
    if (response.status == 401) return "Invalid Email/Password"
    const responeJson = await response.json()
    if (!responeJson.accessToken) return "Unexpected Error"
    AsyncStorage.setItem('accessToken', responeJson.accessToken)
    return "success"
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
    return "Unexpected Error"
  }
}
