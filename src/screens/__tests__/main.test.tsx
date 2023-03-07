import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import MainScreen from '../Main'

describe(MainScreen.name, () => {
  let wrapper;

  it("should display a welcome text", ()=>{
    wrapper = <NavigationContainer>
      <MainScreen/>
    </NavigationContainer>

    const screen = render(wrapper)
    expect(screen.getByText("Welcome to Klear")).toBeVisible()
  })
})
