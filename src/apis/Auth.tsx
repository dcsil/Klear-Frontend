import { domain, headers } from './Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

export const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<string> => {
  try {
    const response = await fetch(domain + "/register", {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });
    if (response.status == 409) return "Email already exists"
    const responeJson = await response.json()
    if (!responeJson.accessToken) return "Sign up Error"
    AsyncStorage.setItem('accessToken', responeJson.accessToken);
    return "success"

  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e);
    return "Unexpected Error"
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(domain + "/login", {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({
        email,
        password
      })
    });
    if (response.status !== 200) return false
    const responeJson = await response.json()
    if (!responeJson.accessToken) return false
    AsyncStorage.setItem('accessToken', responeJson.accessToken);
    return true
  } catch (e) {
    console.log(e);
    Sentry.Native.captureException(e);
  }
}
