import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants';
import { addCourseToCategory, editcourseDetails } from '../../../../../services/operations/courseDetailsApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

  const goBack = () => dispatch(setStep(2));

  const goToMyCourses = () => navigate("/dashboard/my-courses");

  const handlePublish = async () => {
    setLoading(true);

    try {
      if (
        (course?.status === COURSE_STATUS.PUBLISHED && getValues("public")) ||
        (course?.status === COURSE_STATUS.DRAFT && !getValues("public"))
      ) {
        goToMyCourses();
        dispatch(setStep(1));
        dispatch(setEditCourse(null));
        return;
      }

      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append(
        "status",
        getValues("public")
          ? COURSE_STATUS.PUBLISHED
          : COURSE_STATUS.DRAFT
      );

      const result = await editcourseDetails(formData, token);

      const addCourseCategory = await addCourseToCategory(
        {
          categoryId: course.category,
          courseId: course._id,
        },
        token
      );

      if (result && addCourseCategory) {
        goToMyCourses();
        dispatch(setStep(1));
        dispatch(setEditCourse(null));
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while publishing course");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => handlePublish();

  return (
    <div className="w-full">
      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-md">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-richblack-5">
          Publish Settings
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">

          {/* Checkbox */}
          <div className="flex items-center gap-3 rounded-lg bg-richblack-700 p-4">
            <input
              type="checkbox"
              id="public"
              className="h-5 w-5 rounded bg-richblack-500 text-yellow-50 focus:ring-2 focus:ring-yellow-50"
              {...register("public")}
            />
            <label
              htmlFor="public"
              className="text-richblack-200 font-medium"
            >
              Make this course public
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">

            <button
              type="button"
              disabled={loading}
              onClick={goBack}
              className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:opacity-50"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishCourse;