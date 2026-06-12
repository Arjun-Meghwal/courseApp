import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourse } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const EnrolledCourse = () => {

  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  const getEnrolledCourse = async () => {

    try {

      const response = await getUserEnrolledCourse(token);

      setEnrolledCourses(response);

    } catch (error) {

      console.log("Unable to fetch courses");

    }
  };

  useEffect(() => {

    getEnrolledCourse();

  }, []);

  return (

    <div className="text-white p-6">

      <h2 className="text-3xl font-bold mb-8">
        Enrolled Courses
      </h2>

      {!enrolledCourses ? (

        <div>Loading...</div>

      ) : !enrolledCourses.length ? (

        <p>You have not enrolled in any course yet</p>

      ) : (

        <div className="flex flex-col gap-6">

          {enrolledCourses.map((course) => (

            <div
              key={course._id}
              onClick={() =>
                navigate(
                  `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }
              className="flex flex-col lg:flex-row gap-6 bg-richblack-800 rounded-xl p-4 cursor-pointer hover:bg-richblack-700 transition-all"
            >

              {/* Left */}
              <div className="flex gap-4 w-full lg:w-[70%]">

                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-[180px] w-[300px] rounded-lg object-cover"
                />

                <div className="flex flex-col gap-2">

                  <p className="text-2xl font-semibold">
                    {course.courseName}
                  </p>

                  <p className="text-richblack-300 line-clamp-3">
                    {course.courseDescription}
                  </p>

                </div>

              </div>

              {/* Right */}
              <div className="flex flex-col justify-center gap-4 w-full lg:w-[30%]">

                <div>

                  <p className="text-sm text-richblack-300 mb-2">
                    Duration
                  </p>

                  <p className="text-lg font-semibold">
                    {course?.totalDuration || "2h 30m"}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-richblack-300 mb-2">
                    Progress: {course.progressPercentage || 0}%
                  </p>

                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="10px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default EnrolledCourse;