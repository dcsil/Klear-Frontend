import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import NewLogin from '../NewLogin'
import { mockNav } from '../../testConfig/setupTests'

describe(NewLogin.name, () => {
  let wrapper: any
  beforeAll(() => {
    wrapper = <NavigationContainer>
      <NewLogin />
    </NavigationContainer>
  })
  it("should display prompt to enter details", () => {
    const screen = render(wrapper)
    expect(screen.getByText("Enter your detail")).toBeVisible()
  })

  it("should be able to login with demo user", async () => {
    const screen = render(wrapper)
    fireEvent.changeText(screen.getByPlaceholderText("Email"), { target: { value: 'someEmail' } })
    fireEvent.changeText(screen.getByPlaceholderText("Password"), { target: { value: '123' } })
    fetchMock.mockResponseOnce(JSON.stringify({ accessToken: "123" }))
    fireEvent.press(screen.getByText("SIGN IN"))
    await new Promise(setImmediate)
    expect(mockNav).toBeCalledWith("Home")
  })
})
