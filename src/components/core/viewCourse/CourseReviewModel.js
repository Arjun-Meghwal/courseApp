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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-[550px] overflow-hidden rounded-xl bg-richblack-800 border border-richblack-700">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Add Review
          </h2>

          <button
            type="button"
            onClick={() => setReviewModel(false)}
            className="text-richblack-300 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="user"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h3 className="text-white font-semibold text-lg">
                {user?.firstName} {user?.lastName}
              </h3>

              <p className="text-sm text-white">
                Posting Publicly
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-5"
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
              <label
                htmlFor="courseExprience"
                className="mb-2 block text-sm font-medium text-white"
              >
                Add Your Experience
              </label>

              <textarea
                id="courseExprience"
                rows={5}
                placeholder="Share your learning experience..."
                {...register("courseExprience", {
                  required: "Review is required",
                })}
                className="w-full rounded-lg border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 placeholder:text-richblack-400 focus:border-yellow-50 focus:outline-none"
              />

              {errors.courseExprience && (
                <p className="mt-1 text-sm text-pink-200">
                  {errors.courseExprience.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewModel(false)}
                className="rounded-md bg-richblack-700 px-5 py-2 text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-black"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );


}

export default CourseReviewModel
