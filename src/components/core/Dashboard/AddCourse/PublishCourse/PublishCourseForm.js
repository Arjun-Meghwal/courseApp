import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import IconBtn from '../../../../common/IconBtn';
import { editcourseDetails } from '../../../../../services/operations/courseDetailsApi';
const PublishCourseForm = () => {
  const { register, handleSubmit, setValues, getValues } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
      setValue("public",true);
    }
  },[]);
  const goBack = () => {
    dispatch(setStep(2));
  }
const goToCourse=()=>{
  dispatch(resetCourseState());
  // navigate("/dashboard"my-course)
}
  const handleCoursePublish=async()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true
  ||(course.status===COURSE_STATUS.DRAFT&& getValues("publish")===false))
{
  //no update form
  goToCourse();
  return ;
} 
// if form update
const formData=new formData();
formData.append("courseId",course._id);
const courseStatus=getValues("public")? COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
formData.append("status",courseStatus);
setLoading(true);
const result=await editcourseDetails(formData,token);
if(result){
  goToCourse();
}
setLoading(false);
 }

  const onSubmit = () => {
    handleCoursePublish();
  }
  return (
    <div>
      <h1>publish course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='public'>
            <input
              type='checkbox'
              id='public'
              {...register("public")}
              className='rounded h-4 w-4'
            />
            <span className='ml-3'>
              Make this course as public
            </span>
          </label>
        </div>
        <div>
          <button
            disabled={loading}
            type='button'
            onClick={goBack}
          >
            Back
          </button>
          <IconBtn disabled={loading} text='save changes'/>
        </div>
      </form >
    </div >
  )
}

export default PublishCourseForm
