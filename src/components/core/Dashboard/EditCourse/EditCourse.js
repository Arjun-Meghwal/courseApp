import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RenderSteps from "../AddCourse/RenderSteps";

import { getFullCourseDetails } from "../../../../services/operations/courseDetailsApi";

import {
  setCourse,
  setEditCourse,
} from "../../../../slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();

  const { courseId } = useParams();

  const { loading } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const populateCourseDetails = async () => {
      const result = await getFullCourseDetails(courseId, token);

      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.courseDetails));
      }
    };

    populateCourseDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl text-richblack-5">
        Edit Course
      </h1>

      <RenderSteps />
    </div>
  );
};

export default EditCourse;