import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
// import { courseSubSectionData } from '../../../data';
import { useRef } from 'react';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';
// import { setCompletedLecture } from '../../../slices/viewCourseSlice';
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';
import { setCompletedLecture, updateCompletedLecture } from "../../../slices/viewCourseSlice";
import { apiConnector } from '../../../services/apiconnector';
import { aiEndpoints } from '../../../services/apis';
import { getRecommendations } from '../../../services/operations/aiApi';
import CourseRecommendationModal from "./CourseRecommendationModal";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playyerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    courseSectionData,
    courseEntireData,
    completedLecture,
    totalNoOfLecture,
  } = useSelector((state) => state.viewCourse);
  const [openAI, setOpenAI] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  console.log("courseSectionData =>", courseSectionData);
  console.log("courseEntireData =>", courseEntireData);
  console.log("totalNoOfLecture =>", totalNoOfLecture);
  console.log("completedLecture =>", completedLecture);
  const isCompleted = completedLecture?.some(
    (id) => id?.toString() === subSectionId?.toString()
  );

  //ai recomndation 
  const [showRecommendation, setShowRecommendation] =
    useState(false);

  const [recommendations, setRecommendations] =
    useState([]);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData?.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const selectedSection = courseSectionData.find(
        (course) => course._id === sectionId
      );

      if (!selectedSection) return;

      const selectedVideo = selectedSection?.subSection?.find(
        (data) => data._id === subSectionId
      );

      if (!selectedVideo) return;

      setVideoData(selectedVideo);
      setVideoEnded(false);
    };

    setVideoSpecificDetails();
  }, [
    courseSectionData,
    courseId,
    sectionId,
    subSectionId,
    navigate,
  ]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const subSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if (currentSectionIndex === 0 && subSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }

  }
  const isLastideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const subSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === noOfSubSection - 1
    );
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const subSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    if (subSectionIndex < noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          subSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId =
        courseSectionData[currentSectionIndex + 1]._id;

      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const subSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (subSectionIndex > 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          subSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId =
        courseSectionData[currentSectionIndex - 1]._id;

      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;

      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId,
        sectionId,
        subSectionId,
      },
      token
    );

    console.log("RESPONSE => ", res);

    if (res?.success) {

      const updatedLectures = [
        ...(completedLecture || []),
        subSectionId,
      ];

      dispatch(
        setCompletedLecture(updatedLectures)
      );

      setVideoEnded(false);

      console.log(
        "Completed:",
        updatedLectures.length,
        "/",
        totalNoOfLecture
      );

      // Course Completed
      if (
        updatedLectures.length >= totalNoOfLecture
      ) {

        await fetchRecommendation();

        setTimeout(() => {
          setShowRecommendation(true);
        }, 500);

      }
    }

    setLoading(false);
  };

  //new ai code 
  const askAI = async () => {
    try {
      setAiLoading(true);

      const prompt = `
  Course Name: ${courseEntireData?.courseName}

  Lecture Title: ${videoData?.title}

  Lecture Description:
  ${videoData?.description}

  Student Question:
  ${question}

  Answer in simple beginner friendly language.
  `;

      const response = await apiConnector(
        "POST",
        aiEndpoints.ASK_AI_API,
        {
          question: prompt,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {

      console.log(error);

    } finally {

      setAiLoading(false);

    }
  };

  //ai recondation
  const fetchRecommendation = async () => {
    try {

      const response =
        await getRecommendations(token);

      console.log("AI Response =>", response);

      if (response?.success) {

        const courseList =
          response.recommendations
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item);

        setRecommendations(courseList);

        return true;
      }

    } catch (error) {

      console.log(error);

    }

    return false;
  };
  
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-6 text-white w-full">

      {!videoData ? (

        <div className="flex h-[300px] sm:h-[400px] items-center justify-center text-lg sm:text-xl text-richblack-300">
          No data found
        </div>

      ) : (

        <>
          {/* Video */}
          <div className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-lg">

            <Player
              ref={playyerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >

              <AiFillPlayCircle />

              {videoEnded && (

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 sm:gap-4 bg-black/70 p-4">

                  {!isCompleted && (
                    <IconBtn
                      disabled={loading}
                      onClick={handleLectureCompletion}
                      text={!loading ? "Mark As Complete" : "Marking..."}
                    />
                  )}

                  <IconBtn
                    disabled={loading}
                    onClick={() => {
                      if (playyerRef?.current) {
                        playyerRef.current.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text="Replay"
                    customClasses="text-base sm:text-xl"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-lg bg-richblack-700 px-4 sm:px-5 py-2 text-white hover:bg-richblack-600"
                      >
                        Previous
                      </button>
                    )}

                    {!isLastideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-lg bg-yellow-50 px-4 sm:px-5 py-2 font-semibold text-richblack-900 hover:scale-95 transition-all"
                      >
                        Next
                      </button>
                    )}

                  </div>

                </div>

              )}

            </Player>

          </div>

          {/* Details */}
          <div className="rounded-xl bg-richblack-800 p-4 sm:p-6">

            <h1 className="text-xl sm:text-3xl font-bold text-richblack-5 break-words">
              {videoData?.title}
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-richblack-300">
              {videoData?.description}
            </p>
            <button
              onClick={() => {
                setQuestion("");
                setAnswer("");
                setOpenAI(true);
              }}
              className="
  mt-5
  rounded-xl
  bg-gradient-to-r
  from-yellow-400
  to-yellow-500
  px-5
  py-3
  font-semibold
  text-black
  shadow-lg
  hover:scale-105
  transition-all
  "
            >
              ✨ Ask AI
            </button>

          </div>

        </>
      )}
      {
        openAI && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-5">

            <div className="w-full max-w-4xl rounded-3xl border border-richblack-700 bg-richblack-800 shadow-[0_0_40px_rgba(255,214,10,0.15)] overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-richblack-700 px-4 sm:px-6 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-xl font-bold text-black">
                    AI
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">
                      AI Course Assistant
                    </h2>

                    <p className="text-xs sm:text-sm text-richblack-300">
                      Ask doubts about this lecture
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => {
                    setOpenAI(false);
                    setQuestion("");
                    setAnswer("");
                  }}
                  className="rounded-lg px-3 py-2 text-richblack-300 hover:bg-richblack-700 text-white"
                >
                  ✕
                </button>

              </div>

              {/* Ask Question Section */}
              {!answer && (
                <div className="p-4 sm:p-6">

                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything about this lecture..."
                    rows={5}
                    className="
                w-full
                rounded-2xl
                border
                border-richblack-600
                bg-richblack-900
                p-4
                text-black
                outline-none
                focus:border-yellow-400
                resize-none
              "
                  />

                  <button
                    onClick={askAI}
                    disabled={aiLoading || !question.trim()}
                    className="
                mt-4
                w-full
                rounded-xl
                bg-yellow-400
                py-3
                font-semibold
                text-black
                transition-all
                hover:scale-[1.02]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                  >
                    {aiLoading ? "Generating Answer..." : "✨ Ask AI"}
                  </button>

                </div>
              )}

              {/* Answer Section */}
              {answer && (
                <div className="p-4 sm:p-6">

                  <div className="mb-4 flex items-center justify-between">

                    <h3 className="text-xl font-bold text-yellow-300">
                      🤖 AI Answer
                    </h3>

                    <button
                      onClick={() => {
                        setAnswer("");
                        setQuestion("");
                      }}
                      className="
                  rounded-lg
                  bg-yellow-400
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-black
                "
                    >
                      Ask New Question
                    </button>

                  </div>

                  <div
                    className="
                max-h-[60vh]
                overflow-y-auto
                rounded-2xl
                border
                border-richblack-700
                bg-richblack-900
                p-5
                custom-scroll
              "
                  >

                    <div className="whitespace-pre-wrap text-sm sm:text-base leading-7 text-richblack-50">
                      {answer}
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>
        )
      }
      {
        showRecommendation && (
          <CourseRecommendationModal
            recommendations={recommendations}
            setShowRecommendation={
              setShowRecommendation
            }
          />
        )
      }
    </div>
  );


}

export default VideoDetails
