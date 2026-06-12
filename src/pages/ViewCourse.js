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

        console.log("FULL API DADA: ", courseData);
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        console.log(
          "completedVideos =>",
          JSON.stringify(courseData?.completedVideos)
        );
        dispatch(setCompletedLecture(courseData?.completedVideos));
        console.log("completed video", courseData?.completedVideos);

        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec?.subSection?.length || 0;
        })

        dispatch(setTotalNoOfLecture(lectures));
      }

      setCourseSpecificDetails();
    }, [])

    return (
      <>
        <div className="flex h-[calc(100vh-3.5rem)] bg-[#020617] text-white">

          {/* Sidebar */}
          <VideoDetailsSlidebar
            setReviewModel={setReviewModel}
          />

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>

        </div>

        {reviewModel && (
          <CourseReviewModel
            setReviewModel={setReviewModel}
          />
        )}
      </>
    )
    
  }

  export default ViewCourse