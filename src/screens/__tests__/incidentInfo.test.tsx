import { NavigationContainer } from '@react-navigation/native'
import { render, waitFor } from '@testing-library/react-native'
import React from 'react'
import IncidentInfo from '../IncidentInfo'

describe(IncidentInfo.name, () => {
  it("should display active incidents text", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      incident_id: 1,
      status: 1,
      event: "fall",
      date: "today",
      first_name: "karen",
      last_name: "smith",
      students: [{ first_name: 'Alice', last_name: 'May' }]
    }))

    const wrapper = <NavigationContainer>
      <IncidentInfo />
    </NavigationContainer>

    const root = await waitFor(() =>
      render(wrapper)
    )
    expect(root.getByText("Related Student", { exact: false })).toBeVisible()
    expect(root.getByText("Alice May", { exact: false })).toBeVisible()
  })
})
