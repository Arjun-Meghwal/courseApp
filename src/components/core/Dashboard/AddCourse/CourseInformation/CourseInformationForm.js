  import React, { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { useDispatch, useSelector } from 'react-redux';
  import { addCourseDetails, editcourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsApi';
  import { HiOutlineCurrencyRupee } from 'react-icons/hi';
  import { BiUpload } from 'react-icons/bi';
  import RequirementField from './RequirementField';
  import { setStep, setCourse, setEditCourse } from '../../../../../slices/courseSlice';
  import IconBtn from '../../../../common/IconBtn';
  import { COURSE_STATUS } from '../../../../../utils/constants';
  import { toast } from 'react-hot-toast';
  import Upload from './Upload'
  import ChipInput from './ChipInput';

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
        if (categories.length > 0) {
          setCourseCategories(categories);
        }
        setLoading(false);
      }

      if (editCourse) {
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.category);
        setValue("courseRequirements", course.instructions);
        setValue("courseImage", course.thumbnail);
      }

      getCategories();
    }, [])

    const isFormUpdated = () => {
      const currentValues = getValues();
      if (currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString())
        return true;
      else
        return false;
    }

    //handles next button click 
    const onSubmit = async (data) => {

      if (editCourse) {
        if (isFormUpdated()) {
          const currentValues = getValues();
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

          if (currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory);
          }

          if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
            formData.append("instructions", JSON.stringify(data.courseRequirements));
          }

          setLoading(true);
          const result = await editcourseDetails(formData, token);
          setLoading(false);
          if (result) {
            dispatch(setEditCourse(false));
            dispatch(setStep(2));
            dispatch(setCourse(result));
          }
        }
        else {
          toast.error("NO Changes made so far");
        }
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

        return;
      }

      //create a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("thumbnailImage", data.courseImage);

      setLoading(true);
      console.log("BEFORE add course API call");
      console.log("PRINTING FORMDATA", formData);
      const result = await addCourseDetails(formData, token);
      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
      setLoading(false);
      console.log("AFTER add course API call");
      console.log("PRINTING FORMDATA", [...formData]);
      console.log("PRINTING result", result);

    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6'
      >

        {/* Course Title */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5'>
            Course Title<sup className='text-pink-200'>*</sup>
          </label>

          <input
            {...register("courseTitle", { required: true })}
            placeholder='Enter Course Title'
            className='w-full rounded-md bg-[#2C333F] px-3 py-2 text-richblack-5 border border-richblack-600'
          />

          {errors.courseTitle && (
            <span className='text-xs text-pink-200'>Course Title is Required</span>
          )}
        </div>

        {/* Description */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5'>
            Course Short Description<sup className='text-pink-200'>*</sup>
          </label>

          <textarea
            {...register("courseShortDesc", { required: true })}
            placeholder='Enter Description'
            className='w-full min-h-[130px] rounded-md bg-[#2C333F] px-3 py-2 text-richblack-5 border border-richblack-600'
          />

          {errors.courseShortDesc && (
            <span className='text-xs text-pink-200'>
              Course Description is required
            </span>
          )}
        </div>

        {/* Price */}
        <div className='relative flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5'>
            Course Price<sup className='text-pink-200'>*</sup>
          </label>

          <input
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            placeholder='Enter Course Price'
            className='w-full rounded-md bg-[#2C333F] px-3 py-2 pl-12 text-richblack-5 border border-richblack-600'
          />

          <HiOutlineCurrencyRupee className='absolute left-3 top-[38px] text-richblack-400' />

          {errors.coursePrice && (
            <span className='text-xs text-pink-200'>Course Price is Required</span>
          )}
        </div>

        {/* Category */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5 '>
            Course Category<sup className='text-pink-200 bg-[#2C333F]'>*</sup>
          </label>

          <select
            disabled={editCourse}
            {...register("courseCategory", { required: true })}
            className='w-full rounded-md bg-[#2C333F] px-3 py-2 text-richblack-5 border border-richblack-600'
          >
            <option className='bg-[#2C333F]' value="">Choose a Category</option>

            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>

          {errors.courseCategory && (
            <span className='text-xs text-pink-200'>
              Course Category is Required
            </span>
          )}
        </div>

        {/* Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Upload */}
        <Upload
          name={"courseImage"}
          label={"Course Thumbnail"}
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Benefits */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5 '>
            Benefits of the course<sup className='bg-[#2C333F] text-pink-200'>*</sup>
          </label>

          <textarea
            {...register("courseBenefits", { required: true })}
            placeholder='Enter Benefits of the course'
            className='w-full min-h-[130px] rounded-md bg-[#2C333F] px-3 py-2 text-richblack-5 border border-richblack-600'
          />

          {errors.courseBenefits && (
            <span className='text-xs text-pink-200'>
              Benefits are required
            </span>
          )}
        </div>

        {/* Requirements */}
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          error={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Buttons */}
        <div className='flex justify-end gap-x-2'>
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='px-4 py-2 rounded-md bg-[#2C333F]text-richblack-900 font-semibold'
            >
              Continue Without Saving
            </button>
          )}

          <IconBtn
            type={"submit"}
            text={!editCourse ? "Next" : "Save Changes"}
          />
        </div>

      </form>
    )
  }

  export default CourseInformationForm
