import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  addCourseDetails,
  editcourseDetails,
  fetchCourseCategories, 
} from "../../../../../services/operations/courseDetailsApi"
import RequirementField from "./RequirementField";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast"; 

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues, 
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories(); 

      if (categories?.length > 0) {
        setCourseCategories(categories);
      }

      if (editCourse && course) {
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.category?._id);
        setValue("courseRequirements", course.instructions); 
        setValue("courseImage", course.thumbnail);
      }

      setLoading(false);
    };

    getCategories();
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category?._id || 
      currentValues.courseRequirements?.toString() !==
      course.instructions?.toString() 
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      const currentValues = getValues();

      if (!isFormUpdated()) {
        console.log("No changes made");
        return;
      }

      const formData = new FormData();
      formData.append("courseId", course._id);

      if (currentValues.courseTitle !== course.courseName) {
        formData.append("courseName", data.courseTitle);
      }

      if (currentValues.courseShortDesc !== course.courseDescription) {
        formData.append("courseDescription", data.courseShortDesc);
      }

      if (currentValues.coursePrice !== course.price) {
        formData.append("price", data.coursePrice);
      }

      if (currentValues.courseBenefits !== course.whatYouWillLearn) {
        formData.append("whatYouWillLearn", data.courseBenefits);
      }

      if (currentValues.courseCategory !== course.category._id) {
        formData.append("category", data.courseCategory);
      }

      if (
        JSON.stringify(currentValues.courseRequirements) !==
        JSON.stringify(course.instructions)
      ) {
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        ); 
      }

      setLoading(true);
      const result = await editcourseDetails(formData, token);
      setLoading(false);

      if (result) {
        dispatch(setStep(2)); 
        dispatch(setCourse(result));
      }
    } else {
      // create new course logic (your original logic preserved)
      const formData = new FormData();
      formData.append("courseName", data.courseTitle); 
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append(
        "instructions",
        JSON.stringify(data.courseRequirements)
      );

      setLoading(true);
      const result = await addCourseDetails(formData, token);

      if (result) {
        dispatch(setStep(2)); 
        dispatch(setCourse(result)); 
      }

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      {/* Course Title */}
      <div>
        <label htmlFor="courseTitle">
          Course Title <sub>*</sub>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter course title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        />
        {errors.courseTitle && <span>Course title is required</span>}
      </div>

      {/* Course Description */}
      <div>
        <label htmlFor="courseShortDesc">
          Course Short Description <sub>*</sub>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[140px] w-full"
        />
        {errors.courseShortDesc && (
          <span>Course description is required</span>
        )}
      </div>

      {/* Course Price */}
      <div className="relative">
        <label htmlFor="coursePrice">
          Course Price <sub>*</sub>
        </label>
        <input
          id="coursePrice"
          type="number" 
          placeholder="Enter course price"
          {...register("coursePrice", { required: true })}
          className="w-full"
        />
        <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
        {errors.coursePrice && <span>Course price is required</span>}
      </div>

      {/* Course Category */}
      <div>
        <label htmlFor="courseCategory">
          Course Category <sub>*</sub>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a category
          </option>

          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span>Course category is required</span>
        )}
      </div>

      {/* Benefits */}
      <div>
        <label>
          Benefits of the course<sub>*</sub>
        </label>
        <textarea
          placeholder="enter benefits of the course"
          {...register("courseBenefits", { required: true })}
        />
        {errors.courseBenefits && (
          <span>Benefits of the course are required</span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/instructions"
        register={register}
        error={errors} 
        getValues={getValues}
      />

      <div>
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex item-center gap-2 bg-richblack-300"
          >
            continue without saving
          </button>
        )}

        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"} 
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;