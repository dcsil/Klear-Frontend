import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import StudentInfo from '../StudentInfo'
import { mockNav } from '../../testConfig/setupTests'
import { translateTime } from '../../helpers/convertDates'
import { type StudentIncident } from '../../store/StudentTypes'

describe(StudentInfo.name, () => {
  let wrapper: any
  let studentIncident: StudentIncident

  beforeAll(() => {
    wrapper = <NavigationContainer>
      <StudentInfo />
    </NavigationContainer>
    studentIncident = {
      student_id: "1",
      incident_id: "1",
      status: "1",
      event: "fall",
      date: "2023-03-23 16:18:17",
      resolved_user: "karen smith",
      type: "incident",
    }
    fetchMock.mockResponse(JSON.stringify([studentIncident]))
  })

  it("should display incident name", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    expect(root.getByText(studentIncident.event)).toBeVisible()
  })

  it("should navigate when clicking on an incident", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    fireEvent.press(root.getByText(translateTime(studentIncident.date)))
    expect(mockNav).toBeCalledWith("IncidentInfo", { incidentId: studentIncident.incident_id })
  })
})
