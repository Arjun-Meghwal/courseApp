import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { data } from 'autoprefixer';

const CourseReviewModel = () => {
  const {user}=userSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const {courseEntireData}=useSelector((state)=>state.viewCourse);
  const{
    register,
    handleSubmit,
    setValue,
    formState:{error},
  }=useForm();
  useEffect(()=>{
    setValue("courseExperirnce","");
    setvalue("courseRating",0);
  },[])
  const ratingChanged=(newRating)=>{
    setValue("courseRating",newRating);
  }
  const onSubmit=async(data)=>{
    await createRating(
      {
        courseId:courseEntireData._id,
        rating:data.courseRating,
        review:data.courseExprience,
      },
      token
    );
    setRevieModel(false);
  }
  return (
    <div>
       <div>
        <p>Add review</p>
        <button
        onClick={setRevieModel(false)}
        >close</button>
       </div>
       {/* model body */}
       <div>
        <div>
          <img 
          src={user?.image}
          alt='user image'
          className='aspect-square w-[50px] rounded-full object-cover'
          />
          <div>
            <p>{user?.firstName} {user?.lastName}</p>
            <p>posting publicly</p>
          </div>
        </div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-6 flez flez-col items-center'>
          <ReactStars
          count={5}
          onChange={ratingChanged}
          activeColor="#ffd700"
          />
          <div>
            <label>
              Add your Exprience
            </label>
            <textarea
            id='courseExprience'
            placeholder='Add your Exprience'
            {...register("courseExprience",{required:true})}
            className='form-style min-h-[130px] w-full'
            />
            {
              error.courseExprience &&(
                <span>
                  please add your Exprience
                </span>
              )
            }
          </div>
          {/* cancel and save button */}
          <div>
            <button
            onClick={()=>setRevieModel(false)}
          >
              cancel
            </button>
            <IconBtn
            text={"save"}
            ></IconBtn>
          </div>
        </form>
       </div>
    </div>
  )
}

export default CourseReviewModel
