import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoDetailsSlidebar = ({ setReviewModel }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLecture = 0,
    completedLecture = [],
  } = useSelector((state) => state.viewCourse || {});
console.log("completelecture", completedLecture); 
  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData?.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
          (data) => data._id === subSectionId
        );

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [
    courseSectionData,
    location.pathname,
    sectionId,
    subSectionId,
  ]);
  

  return (
    <div className="h-[calc(100vh-3.5rem)] w-[280px] bg-richblack-900 border-r border-richblack-700 overflow-y-auto">

      {/* Header */}
      <div className="border-b border-richblack-700 p-4">

        <div className="flex items-center justify-between mb-4">

          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-richblack-5 text-sm"
          >
            ← Back
          </button>

          <button
            onClick={() => setReviewModel(true)}
            className="bg-yellow-500 text-richblack-900 px-3 py-2 rounded-md text-sm font-semibold"
          >
            Review
          </button>

        </div>

        <h2 className="text-xl font-bold text-richblack-5">
          {courseEntireData?.courseName}
        </h2>

        <p className="text-richblack-300 text-sm mt-1">
          {completedLecture?.length}/{totalNoOfLecture} Lectures Completed
        </p>

      </div>

      {/* Sections */}
      <div>

        {courseSectionData?.map((course) => (
          <div
            key={course._id}
            className="border-b border-richblack-700"
          >

            {/* Section Header */}
            <div
              onClick={() =>
                setActiveStatus(
                  activeStatus === course._id ? "" : course._id
                )
              }
              className="flex items-center justify-between bg-richblack-700 px-4 py-3 cursor-pointer"
            >

              <p className="font-medium text-richblack-5">
                {course?.sectionName}
              </p>

              <span className="text-richblack-5">
                {activeStatus === course._id ? "⌃" : "⌄"}
              </span>

            </div>

            {/* Lectures */}
            {/* Lectures */}
            {activeStatus === course._id && (
              <div>
                {course?.subSection?.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition-all
        ${videobarActive === topic._id
                        ? "bg-yellow-500 text-richblack-900"
                        : "bg-richblack-800 text-richblack-25 hover:bg-richblack-700"
                      }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    {console.log(
                      "topic id =>",
                      topic._id,
                      "completedLecture =>",
                      completedLecture,
                      "matched =>",
                      completedLecture?.some(
                        (id) => String(id) === String(topic._id)
                      )
                    )}

                    <input
                      type="checkbox"
                      checked={
                        completedLecture?.some(
                          (id) => String(id) === String(topic._id)
                        )
                      }
                      readOnly
                    />

                    <span>{topic?.title}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default VideoDetailsSlidebar;