import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiAddToQueue } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";
import { toast } from "react-hot-toast";
import { setCourse, setStep, setEditCourse } from "../../../../../slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsApi"

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const course = useSelector((state) => state.course.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("please add atleast one section");
      return;
    }

    if (
      course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };
const handelChangeEditSectionName=(sectionId,sectionName)=>{
  if(editSectionName===sectionId){
    cancelEdit();
    return ;
  }
  setEditSectionName(sectionId);
  setValue("sectionName",sectionName);
}
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

      {/* Heading */}
      <p className="text-2xl font-semibold text-richblack-5">
        Course Builder
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />

          {errors.sectionName && (
            <p className="ml-2 text-xs tracking-wide text-pink-200">
              This field is required
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text={
              editSectionName
                ? "Edit Section Name"
                : "Create Section"
            }
            outline={true}
            customClasses={"text-yellow-50"}
          >
            <BiAddToQueue className="text-yellow-50" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested Sections */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handelChangeEditSectionName={handelChangeEditSectionName}
        />
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>

        <button
          onClick={goToNext}
          className="flex items-center bg-yellow-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;