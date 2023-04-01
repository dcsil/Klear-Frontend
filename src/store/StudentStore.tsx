import { createSlice } from "@reduxjs/toolkit"
import { type IStudentStore } from "./StudentTypes"

export const StudentStore = createSlice({
  name: "Students",
  initialState: {
    students: [],
  } as IStudentStore,
  reducers: {
    updateStudentList: (state, action) => ({
      ...state,
      students: action.payload ?? []
    })
  }
})
