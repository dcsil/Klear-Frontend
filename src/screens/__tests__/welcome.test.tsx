import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import WelcomeScreen from '../Welcome'
import { mockNav } from '../../testConfig/setupTests'

describe(WelcomeScreen.name, () => {
  it("should allow the user to signup and login", () => {
    const wrapper = <NavigationContainer>
      <WelcomeScreen />
    </NavigationContainer>

    const screen = render(wrapper)
    fireEvent.press(screen.getByText("GET STARTED"))
    expect(mockNav).toBeCalledWith('Signup')
    fireEvent.press(screen.getByText("I ALREADY HAVE AN ACCOUNT"))
    expect(mockNav).toBeCalledWith('Login')
  })
})
