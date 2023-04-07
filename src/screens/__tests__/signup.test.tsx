import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import Signup from '../Signup'
import { mockNav } from '../../testConfig/setupTests'

describe(Signup.name, () => {
  it("should show error message when fields are invalid", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ accessToken: "123" }))
    const wrapper = <NavigationContainer>
      <Signup />
    </NavigationContainer>

    const root = await waitFor(() =>
      render(wrapper)
    )
    waitFor(async () => {
      const signUp = root.getByText("SIGN UP")
      fireEvent.press(signUp)
      expect(root.getByText('Please enter your first name')).toBeVisible()
      fireEvent.changeText(root.getByPlaceholderText("First Name"), "john")
      fireEvent.press(signUp)
      fireEvent.changeText(root.getByPlaceholderText("Last Name"), "doe")
      fireEvent.press(signUp)
      fireEvent.changeText(root.getByPlaceholderText("Email"), "gmail.com")
      fireEvent.press(signUp)
      fireEvent.changeText(root.getByPlaceholderText("Password"), "pass1")
      fireEvent.press(signUp)
      fireEvent.changeText(root.getByPlaceholderText("Confirm Password"), "pass1")
      fireEvent.press(signUp)
      await new Promise(setImmediate)
      expect(mockNav).toBeCalledTimes(1)
    })
  })
})
