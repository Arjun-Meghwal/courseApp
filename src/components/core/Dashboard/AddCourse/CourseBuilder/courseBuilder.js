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

  console.log("FINAL COURSE STATE", course);
  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("please add atleast one section");
      return;
    }
    console.log("SECTION DATA", course?.courseContent);
    const hasEmptySection = course?.courseContent?.some(
      (section) =>
        !section?.subSection || section.subSection.length === 0
    );

    if (hasEmptySection) {
      toast.error("please add atleast one lecture in each section");
      return;
    }
    console.log("SECTION DATA", course?.courseContent);

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
    <div
      className="
    w-11/12 max-w-2xl
    rounded-2xl
    border border-richblack-700
    bg-richblack-800
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
    animate-scaleIn
  "
    >
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-richblack-5 tracking-tight">
            Course Builder
          </h2>

          <p className="mt-1 text-sm text-richblack-300">
            Organize your course into sections and lectures
          </p>
        </div>

        <div className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-50">
          Step 2 of 3
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border border-richblack-700 bg-richblack-900/60 p-6"
      >

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-richblack-100">
            Section Name
          </label>

          <input
            id="sectionName"
            placeholder="Enter section name..."
            {...register("sectionName", { required: true })}
            className="w-full rounded-xl border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-2 focus:ring-yellow-500/30"
          />

          {errors.sectionName && (
            <p className="text-xs font-medium text-pink-200">
              Section name is required
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-300 active:scale-95"
          >
            <BiAddToQueue className="text-lg" />

            {loading
              ? "Processing..."
              : editSectionName
                ? "Update Section"
                : "Create Section"}
          </button>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-richblack-600 px-4 py-2 text-sm text-richblack-300 transition-all hover:border-richblack-400 hover:text-richblack-5"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Nested Sections */}
      {course?.courseContent?.length > 0 && (
        <div className="rounded-xl border border-richblack-700 bg-richblack-900/40 p-4">
          <NestedView
            handelChangeEditSectionName={handelChangeEditSectionName}
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end gap-4 border-t border-richblack-700 pt-6">

        <button
          onClick={goBack}
          className="rounded-xl border border-richblack-600 px-5 py-2.5 font-semibold text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
        >
          Back
        </button>

        <button
          onClick={goToNext}
          className="rounded-xl bg-yellow-400 px-6 py-2.5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-300 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;