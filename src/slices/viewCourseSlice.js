import { createSlice } from "@reduxjs/toolkit"
import { setCourse } from "./courseSlice"
import { act } from "react"

const initialState={
  coursSectionData:[],
  courseEntireData:[],
  completedLecture:[],
  totalNoOfLecture:0,
}

const viewCourseSlice=createSlice({
  name :"viewCourse",
  initialState,
  reducers:{
    setCourseSectionData:(state,action)=>{
      state.coursSectionData=action.payload
    },
    setEntireCourseData:(state,action)=>{
      state.courseEntireData=action.payload
    },
    setTotalNoOfLecture:(state,action)=>{
      state.totalNoOfLecture=action.payload
    },
    setCompletedLecture:(state,action)=>{
      state.completedLecture(action.payload)
    },
    updateCompletedLecture:(state,action)=>{
      state.completedLecture(action.payload)
    }
  }
})
export const {setCourseSectionData,setEntireCourseData,setTotalNoOfLecture,setCompletedLecture,updateCompletedLecture}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;