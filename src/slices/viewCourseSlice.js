import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLecture: [],
  totalNoOfLecture: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },

    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },

    setTotalNoOfLecture: (state, action) => {
      state.totalNoOfLecture = action.payload;
    },

    setCompletedLecture: (state, action) => {
      state.completedLecture = action.payload || [];
    },

    updateCompletedLecture: (state, action) => {
      if (!state.completedLecture) {
        state.completedLecture = [];
      }

      state.completedLecture.push(action.payload);
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLecture,
  setCompletedLecture,
  updateCompletedLecture,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;