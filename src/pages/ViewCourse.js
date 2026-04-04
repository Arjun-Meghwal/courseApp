import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import VideoDetailsSlidebar from '../components/core/viewCourse/VideoDetailsSlidebar'
import CourseReviewModel from '../components/core/viewCourse/CourseReviewModel';
import { getFullCourseDetails } from '../services/operations/courseDetailsApi';
import {
  setCourseSectionData,
  setCompletedLecture,
  setEntireCourseData,
  setTotalNoOfLecture
} from '../slices/viewCourseSlice';

const ViewCourse = () => {
  const [reviewModel, setReviewModel] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullCourseDetails(courseId, token);

      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData?.courseDetails));
      dispatch(setCompletedLecture(courseData?.completedVideoes));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec?.subSection?.length || 0;
      })

      dispatch(setTotalNoOfLecture(lectures));
    }

    setCourseSpecificDetails();
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white">

      <div className="w-[320px] border-r border-white/10 bg-white/5 backdrop-blur-lg">
        <VideoDetailsSlidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl min-h-[calc(100vh-3rem)]">
          <Outlet />
        </div>
      </div>

      {reviewModel && (
        <CourseReviewModel setReviewModel={setReviewModel} />
      )}

    </div>
  )
}

export default ViewCourse