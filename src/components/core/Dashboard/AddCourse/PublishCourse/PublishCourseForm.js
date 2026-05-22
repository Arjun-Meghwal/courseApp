import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editcourseDetails } from "../../../../../services/operations/courseDetailsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToMyCourses = () => {
    navigate("/dashboard/my-courses");
  };

  const handlePublish = async () => {
    setLoading(true);

    try {
      // no changes made
      if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
          getValues("public")) ||
        (course?.status === COURSE_STATUS.DRAFT &&
          !getValues("public"))
      ) {
        goToMyCourses();
        dispatch(setStep(1));
        dispatch(setEditCourse(false));
        return;
      }

      const formData = new FormData();

      console.log("COURSE STATE", course);

      formData.append(
        "courseId",
        course?.data?._id || course?._id
      );

      formData.append(
        "status",
        getValues("public")
          ? COURSE_STATUS.PUBLISHED
          : COURSE_STATUS.DRAFT
      );

      const result = await editcourseDetails(formData, token);

      if (result) {
        toast.success("Course Published Successfully");

        dispatch(setStep(1));
        dispatch(setEditCourse(false));

        goToMyCourses();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("PUBLISH COURSE ERROR:", error);
      toast.error("Error while publishing course");
    }

    setLoading(false);
  };

  const onSubmit = () => {
    handlePublish();
  };

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">

      <h2 className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-6"
      >

        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-4 w-4 cursor-pointer"
            defaultChecked={course?.status === COURSE_STATUS.PUBLISHED}
          />

          <label
            htmlFor="public"
            className="text-richblack-100"
          >
            Make this course public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-yellow-500 px-5 py-2 font-semibold text-richblack-900"
          >
            {loading ? "Publishing..." : "Save Changes"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default PublishCourse;