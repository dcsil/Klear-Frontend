import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import WelcomeScreen from '../Welcome'

describe(WelcomeScreen.name, () => {
  let wrapper

  it("should display a welcome text", () => {
    wrapper = <NavigationContainer>
      <WelcomeScreen />
    </NavigationContainer>

    const screen = render(wrapper)
    expect(screen.getByText("Take better care of your children.")).toBeVisible()
  })
})
