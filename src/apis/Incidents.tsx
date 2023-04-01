import { domain, headers } from './Headers'
import * as Sentry from 'sentry-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAllPastIncidents = async (): Promise<any> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await fetch(domain + "/incidents/all", {
      method: 'GET',
      ...headers(accessToken)
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
    return 'Error in fetching past incidents'
  }
}

export const getIncident = async(incidentId: number): Promise<any> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await fetch(domain + `/incidents/get/${incidentId}`, {
      method: 'GET',
      ...headers(accessToken)
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
    return 'Error in fetching the incident'
  }
}
