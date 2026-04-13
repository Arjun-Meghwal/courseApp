import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../../../slices/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import Upload from "./Upload"

const SubSectionModel = ({
  modelData,
  setModelData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modelData.title);
      setValue("lectureDesc", modelData.description);
      setValue("lectureVideo", modelData.videoUrl);
    }
  }, [view, edit, modelData, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modelData.title ||
      currentValues.lectureDesc !== modelData.description ||
      currentValues.lectureVideo !== modelData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modelData.sectionId);
    formData.append("subSectionId", modelData._id);

    if (currentValues.lectureTitle !== modelData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modelData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modelData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      dispatch(setCourse(result));
    }

    setModelData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("no changes made to the form");
        return;
      } else {
        await handleEditSubSection();
        return;
      }
    }

    const formData = new FormData();
    formData.append("sectionId", modelData.sectionId);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      dispatch(setCourse(result));
    }

    setModelData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black/40 backdrop-blur-sm">

      <div className="w-11/12 max-w-[700px] rounded-xl border border-richblack-700 bg-richblack-800 shadow-md">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl border-b border-richblack-600 px-6 py-4">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button
            onClick={() => {
              if (!loading) setModelData(null);
            }}
          >
            <RxCross2 className="text-richblack-200 hover:text-pink-200" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-6 py-6"
        >
          {/* Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            errors={errors}
            video={true}
            viewData={view ? modelData.videoUrl : null}
            editData={edit ? modelData.videoUrl : null}
          />

          {/* Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-richblack-200">
              Lecture Title
            </label>

            <input
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />

            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-richblack-200">
              Lecture Description
            </label>

            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              className="form-style min-h-[130px] w-full"
            />

            {errors.lectureDesc && (
              <span className="text-xs text-pink-200">
                Lecture description is required
              </span>
            )}
          </div>

          {/* Button */}
          {!view && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-yellow-50 px-6 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : edit
                    ? "Save Changes"
                    : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModel;