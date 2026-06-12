import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
// import { courseSubSectionData } from '../../../data';
import { useRef } from 'react';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';
// import { setCompletedLecture } from '../../../slices/viewCourseSlice';
import {AiFillPlayCircle} from "react-icons/ai";
import IconBtn from '../../common/IconBtn';
import {setCompletedLecture,updateCompletedLecture} from "../../../slices/viewCourseSlice";
const VideoDetails = () => {
  const {courseId,sectionId,subSectionId}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const playyerRef=useRef();
  const location=useLocation();
  const {token}=useSelector((state)=>state.auth);
  const [videoData,setVideoData]=useState(null);
  const [videoEnded,setVideoEnded]=useState(false);
  const [loading,setLoading]=useState(false);
  const {
    courseSectionData,
    courseEntireData,
    completedLecture,
    totalNoOfLecture,
  } = useSelector((state) => state.viewCourse);

  console.log("courseSectionData =>", courseSectionData);
  console.log("courseEntireData =>", courseEntireData);
  console.log("totalNoOfLecture =>", totalNoOfLecture);
  console.log("completedLecture =>", completedLecture);
  const isCompleted = completedLecture?.some(
    (id) => id?.toString() === subSectionId?.toString()
  );
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

  const isFirstVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex(
      (data)=>data._id===sectionId
    )
    const subSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=>data._id===subSectionId
    )
    if(currentSectionIndex===0 && subSectionIndex===0){
      return true;
    }
    else{
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
      dispatch(
        setCompletedLecture([
          ...(completedLecture || []),
          subSectionId,
        ])
      );

      setVideoEnded(false);
    }

    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-6 p-6 text-white w-full">

      {!videoData ? (

        <div className="flex h-[400px] items-center justify-center text-xl text-richblack-300">
          No data found
        </div>

      ) : (

        <>
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

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70">

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
                    customClasses="text-xl"
                  />

                  <div className="flex gap-4">

                    {!isFirstVideo() && (

                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-lg bg-richblack-700 px-5 py-2 text-white hover:bg-richblack-600"
                      >
                        Previous
                      </button>

                    )}

                    {!isLastideo() && (

                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-lg bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 hover:scale-95 transition-all"
                      >
                        Next
                      </button>

                    )}

                  </div>

                </div>

              )}

            </Player>

          </div>

          <div className="rounded-xl bg-richblack-800 p-6">

            <h1 className="text-3xl font-bold text-richblack-5">
              {videoData?.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-richblack-300">
              {videoData?.description}
            </p>

          </div>

        </>
      )}

    </div>
  );
}

export default VideoDetails
