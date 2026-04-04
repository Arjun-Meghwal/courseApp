import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoDetailsSlidebar = ({ setReviewModel }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subsectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOdLectures,
    completedLectures,
  } = useSelector((state) => state.viewcourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData?.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subsection?.findIndex(
          (data) => data._id === subsectionId
        );

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subsection?.[currentSubSectionIndex]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div>
      <div>
        {/* for button and heading */}
        <div>
          {/* for button */}
          <div>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              back
            </div>

            <div>
              <button onClick={() => setReviewModel(true)}>
                Add review
              </button>
            </div>
          </div>

          {/* heading */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length}/{totalNoOdLectures}
            </p>
          </div>

          {/* section + subsection */}
          <div>
            {courseSectionData?.map((course, index) => (
              <div
                key={index}
                onClick={() => setActiveStatus(course._id)}
              >
                {/* section */}
                <div>
                  <div>{course?.sectionName}</div>
                </div>

                {/* subsection */}
                <div>
                  {activeStatus === course?._id && (
                    <div>
                      {course?.subsection?.map((topic, index) => (
                        <div
                          key={index}
                          className={`flex gap-2 p-5 ${videobarActive === topic._id
                              ? "bg-yellow-200 text-richblack-900"
                              : "bg-richblack-900 text-white"
                            }`}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            );
                            setVideoBarActive(topic._id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            onChange={() => { }}
                          />

                          <span>{topic.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSlidebar; 