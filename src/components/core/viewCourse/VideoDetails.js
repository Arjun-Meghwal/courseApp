import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
// import { courseSubSectionData } from '../../../data';
import { useRef } from 'react';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';
import { setCompletedLecture } from '../../../slices/viewCourseSlice';
import {AiFillPlayCircle} from "react-icons/ai";
const VideoDetails = () => {
  const [courseId,sectionId,subSectionId]=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const playyerRef=useRef();
  const location=useLocation();
  const {token}=useSelector((state)=>state.auth);
  const {courseSectionData,courseEntireData,completedLecture}=useSelector((state)=>state.viewCourse);
  const [videoData,setVideoData]=useState([]);
  const [videoEnded,setVideoEnded]=useState(false);
  const [loading,setLoading]=useState(false);
  
  useEffect(()=>{
    const setVideoSpecificDetails=async()=>{
      if(!courseSectionData.length)
        return ;
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-course");
      }
      else{
        const filtereData=courseSubSectionData.filter(
          (course)=>course._id===sectionId
        )
        const filterVideoData=filtereData?.filterData?.[0].subSection.filter(
          (data)=>data._id===subSectionId
        )
        setVideoData(filterVideoData[0])
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  },[])
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
  const isLastideo=()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length;

    const subSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex===courseSectionData.length-1 &&
      subSectionIndex===noOfSubSection-1
    ){
      return true;
    }

  }
  const goToNextVideo=()=>{
    
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

    const subSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex===noOfSubSection-1){
      const nextSectionIndex=courseSectionData[currentSectionIndex].subSection[currentSectionIndex+1]._id;
      navigate(`view-course/$courseId/section/${sectionId}/sub-section/${nextSubSectionId}`)

    }
    else{
      const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
      const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`view-course/${courseId}/${nextSectionId}/sub-section/$nextsubSectionId`)

    }
  }
  const goToPrevVideo=()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

    const subSectionIndex = courseSectionData[currentSectionIndex].subSection .findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex!=0 ){
      const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex-1];
      navigate(`view-course/$courseId/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
      const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
      const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
      navigate(`view-course/${courseId}/${prevSectionId}/sub-section/${prevSubSectionId}`) 
    }

  }
  const handleLectureCompletion=async()=>{
    setLoading(true);
    //course progress pending

    const res=await markLectureAsComplete({courseId,sectionId,subSectionId},token);
    if(res){
      dispatch(setCompletedLecture(subSectionId));
    }
    setLoading(false);
}
  return (
    <div>
      {
        !videoData ?(<div>
          No data found
          </div>)
          :(
            <Player
              ref={playyerRef}
              aspectRatio="16:9"
              playsline
              onEnded={()=>setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
              <AiFillPlayCircle/>
              {
                videoEnded && (
                  <div>
                    {
                      !completedLecture.includes(subSectionId) && (
                        <IconBtn
                        disabled={loading}
                        onClick={()=>handleLectureCompletion()}
                        text={!loading? "mark as complete ":"marking..."}
                        />
                      )
                    }
                    <IconBtn
                    disabled={loading}
                    onClick={()=>{
                      if(playyerRef?.current){
                        playyerRef?.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text="replay"
                    customClasses="text-xl"
                    />
                    <div>
                      {
                        !isFirstVideo() && (
                          <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className='blackButton'
                          >
                            prev
                          </button>
                      )}
                      {
                        !isLastideo() &&(
                          <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className='blackButton'
                          >
                            next
                          </button>
                        )
                      }
                    </div>
                  </div>
                )
              }
            </Player>
          )
      }      
      <h1>
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails
