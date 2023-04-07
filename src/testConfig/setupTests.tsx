import fetchMock from "jest-fetch-mock"

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('sentry-expo', () => { })

jest.mock('react-native-onesignal', () => { })

export const mockNav = jest.fn()

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      name: "Home",
      params: {
        incidentId: "1",
        studentInfo: {
          student_id: "1",
          age: 3,
          contact_name: "john",
          contact_number: "123",
          first_name: "sammy",
          last_name: "rain"
        }
      }
    })
  }
})

fetchMock.enableMocks()
