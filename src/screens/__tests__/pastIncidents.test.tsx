import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import PastIncidents from '../PastIncidents'
import { mockNav } from '../../testConfig/setupTests'
import { type Incident } from '../../store/IncidentTypes'
import { translateTime } from '../../helpers/convertDates'

describe(PastIncidents.name, () => {
  let wrapper: any
  let incident: Incident

  beforeAll(() => {
    wrapper = <NavigationContainer>
      <PastIncidents />
    </NavigationContainer>
    incident = {
      incident_id: 1,
      status: 1,
      event: "fall",
      date: "2023-03-23 16:18:17",
      first_name: "karen",
      last_name: "smith",
    }
    fetchMock.mockResponse(JSON.stringify([incident]))
  })

  it("should display incident event name", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    expect(root.getByText(incident.event)).toBeVisible()
  })

  it("should navigate when clicking on event", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    fireEvent.press(root.getByText(translateTime(incident.date)))
    expect(mockNav).toBeCalledWith("IncidentInfo", { incidentId: incident.incident_id })
  })
})
