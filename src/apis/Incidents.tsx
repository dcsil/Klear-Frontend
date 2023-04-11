import { domain, headers } from './Headers'
import * as Sentry from 'sentry-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type Incident } from '../store/IncidentTypes'

export const getAllIncidents = async (active: number): Promise<Incident[] | undefined> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await fetch(domain + `/incidents/all/${active}`, {
      method: 'GET',
      ...headers(accessToken)
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    Sentry.Native.captureException(e)
  }
}

export const getIncident = async (incidentId: number): Promise<Incident | undefined> => {
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
  }
}

export const resolveIncident = async (incidentId: number, status: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await fetch(domain + `/incidents/resolve`, {
      method: 'POST',
      ...headers(accessToken),
      body: JSON.stringify({
        incidentId,
        status
      })
    })
    return response.status == 200
  } catch (e) {
    Sentry.Native.captureException(e)
  }
}
