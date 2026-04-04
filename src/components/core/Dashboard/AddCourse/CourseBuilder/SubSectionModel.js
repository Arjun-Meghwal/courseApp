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
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button
            onClick={() => {
              if (!loading) setModelData(null);
            }}
          >
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            errors={errors}
            video={true}
            viewData={view ? modelData.videoUrl : null}
            editData={edit ? modelData.videoUrl : null}
          />

          <div>
            <label>Lecture Title</label>
            <input
              id="lectureTitle"
              placeholder="enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="w-full"
            />
            {errors.lectureTitle && (
              <span>lecture title is required</span>
            )}
          </div>

          <div>
            <label>Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full min-h-[130px]"
            />
            {errors.lectureDesc && (
              <span>lecture Description is required</span>
            )}
          </div>

          {!view && (
            <div>
              <IconBtn
                type="submit"
                text={
                  loading
                    ? "loading..."
                    : edit
                      ? "Save Changes"
                      : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModel;