import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import Login from '../Login'
import { mockNav } from '../../testConfig/setupTests'

describe(Login.name, () => {
  let screen: any

  beforeEach(() => {
    const wrapper = <NavigationContainer>
      <Login />
    </NavigationContainer>
    screen = render(wrapper)
  })

  it("should display at least the demo user", () => {
    expect(screen.getByText("Karen Smith")).toBeVisible()
  })

  it("should be able to login with demo user", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ accessToken: "123" }))
    fireEvent.press(screen.getByText("Karen Smith"))
    await new Promise(setImmediate)
    expect(mockNav).toBeCalledWith("Home")
  })

  it("should be able to navigate to new login screen", async () => {
    fireEvent.press(screen.getByText("LOG IN WITH ANOTHER", { exact: false }))
    expect(mockNav).toBeCalledWith("NewLogin")
  })
})
