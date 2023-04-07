import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import Home from '../Home'
import AsyncStorage from '@react-native-async-storage/async-storage'

describe(Home.name, () => {
  it("should display active incidents text", async () => {
    fetchMock.mockResponse(JSON.stringify([{
      incident_id: 1,
      status: 1,
      event: "fall",
      date: "today",
      first_name: "karen",
      last_name: "smith",
    }]))
    const wrapper = <NavigationContainer>
      <Home />
    </NavigationContainer>

    const root = await waitFor(() =>
      render(wrapper)
    )
    expect(root.getByText("fall")).toBeVisible()
    const logout = root.getByText('Logout')
    fireEvent.press(logout)
    expect(AsyncStorage.setItem).toBeCalledWith('accessToken', '')
  })

  it("should clear accessToken from asyncstorage when logout is pressed", async () => {
    const wrapper = <NavigationContainer>
      <Home />
    </NavigationContainer>

    const root = await waitFor(() =>
      render(wrapper)
    )
    const logout = root.getByText('Logout')
    fireEvent.press(logout)
    expect(AsyncStorage.setItem).toBeCalledWith('accessToken', '')
  })
})
