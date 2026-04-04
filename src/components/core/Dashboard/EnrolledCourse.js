import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourse } from "../../../services/operations/profileAPI";

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

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
    <div>
      <h2>Enrolled Courses</h2>

      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>

          {/* cards */}
          {enrolledCourses.map((course) => (
            <div key={course._id}>
              <div>
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>

              <div>{course?.totalDuration}</div>

              <div>
                <p>
                  Progress: {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
