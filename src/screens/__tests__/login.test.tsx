import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import Login from '../Login'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('sentry-expo', () => { })

describe(Login.name, () => {
  let wrapper

  it("should display a welcome text", () => {
    wrapper = <NavigationContainer>
      <Login />
    </NavigationContainer>

    const screen = render(wrapper)
    expect(screen.getByText("Sign back in")).toBeVisible()
  })
})
