import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsApi";
//  import {setValue} from 'react-hook-form';

const CourseReviewModel = ({ setReviewModel }) => {
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const {courseEntireData}=useSelector((state)=>state.viewCourse);
  // const {reviewModel,setReviewModel}=useState(false);
  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors},
  }=useForm();
  useEffect(()=>{
    setValue("courseExprience","");
    setValue("courseRating",0);
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
    setReviewModel(false);
  }
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/60 backdrop-blur-sm">

      <div className="w-11/12 max-w-[500px] rounded-xl border border-richblack-700 bg-richblack-800 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 p-5">

          <p className="text-xl font-semibold text-white">
            Add Review
          </p>

          <button
            onClick={() => setReviewModel(false)}
            className="text-richblack-300 hover:text-richblack-5"
          >
            
          </button>

        </div>

        {/* Body */}
        <div className="p-6">

          {/* User */}
          <div className="flex items-center gap-4">

            <img
              src={user?.image}
              alt="user"
              className="aspect-square w-[55px] rounded-full object-cover"
            />

            <div>

              <p className="font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm text-white">
                Posting Publicly
              </p>

            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-5"
          >

            {/* Rating */}
            <div className="flex justify-center">

              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={35}
                activeColor="#ffd700"
              />

            </div>

            {/* Review */}
            <div>

              <label className="mb-2 block text-sm text-white">
                Add Your Experience
              </label>

              <textarea
                id="courseExprience"
                placeholder="Share your learning experience..."
                {...register("courseExprience", {
                  required: true,
                })}
                className="min-h-[130px] w-full rounded-lg border border-richblack-500 bg-richblack-700 p-3 text-black outline-none"
              />

              {errors.courseExprience && (
                <span className="mt-1 text-xs text-pink-200">
                  Please add your experience
                </span>
              )}

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setReviewModel(false)}
                className="rounded-lg bg-richblack-700 px-5 py-2 text-richblack-5 hover:bg-richblack-600"
              >
                Cancel
              </button>

              <IconBtn
                text="Save"
                type="submit"
              />

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default CourseReviewModel
