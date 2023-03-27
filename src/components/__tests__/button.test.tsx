import { render } from '@testing-library/react-native'
import React from 'react'
import Button from '../Button'

describe(Button.name, () => {
  it("should render a button with the given name", () => {
    const btn = <Button name="test1" onClick={() => { }} />
    const button = render(btn)
    expect(button.getByText("test1")).toBeVisible()
  })
})
