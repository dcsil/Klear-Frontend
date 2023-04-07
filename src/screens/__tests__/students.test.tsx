import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import Students from '../Students'
import { mockNav } from '../../testConfig/setupTests'
import { type Student } from '../../store/StudentTypes'
import { Provider } from 'react-redux'
import { store } from '../../store/StoreConfig'

describe(Students.name, () => {
  let wrapper: any
  let student: Student

  beforeAll(() => {
    wrapper =
      <Provider store={store}>
        <NavigationContainer>
          <Students />
        </NavigationContainer>
      </Provider>
    student = {
      student_id: "1",
      age: 1,
      contact_name: "john",
      contact_number: "555",
      first_name: "karen",
      last_name: "smith",
    }
    fetchMock.mockResponse(JSON.stringify([student]))
  })

  it("should display student name", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    expect(root.getByText(student.first_name, { exact: false })).toBeVisible()
  })

  it("should navigate when clicking on a single student", async () => {
    const root = await waitFor(() =>
      render(wrapper)
    )
    fireEvent.press(root.getByText(student.first_name, { exact: false }))
    expect(mockNav).toBeCalledTimes(1)
  })
})
