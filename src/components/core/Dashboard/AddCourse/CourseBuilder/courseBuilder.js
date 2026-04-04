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
    <div className="text-white">
      <p>course builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            section name<sup>*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="add section name"
            {...register("sectionName", { required: true })}
            className="w-full"
          />

          {errors.sectionName && <span>Section is required</span>}
        </div>

        <div>
          <IconBtn
            type="submit"
            text={
              editSectionName
                ? "Edit Section Name"
                : "Create Section Name"
            }
            outline={true}
            customClasses={"text-white"}
          >
            <BiAddToQueue className="text-yellow" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-richblack-300 underline"
            >
              cancel
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 &&
       <NestedView handelChangeEditSectionName={handelChangeEditSectionName}/>}

      <div className="flex justify-end gap-x-3">
        <button onClick={goBack} className="rounded">
          goBack
        </button>

        <IconBtn text="next" onClick={goToNext} />
      </div>
    </div>
  );
};

export default CourseBuilder;