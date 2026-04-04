import React from "react";

const Upload = ({
  name,
  label,
  register,
  errors,
  video = false,
  viewData,
  editData,
}) => {
  return (
    <div>
      <label>
        {label} <sup>*</sup>
      </label>

      <input
        type="file"
        accept={video ? "video/*" : "image/*"}
        {...register(name, { required: true })}
      />

      {viewData && (
        <p className="text-sm text-green-400">
          Current: {viewData}
        </p>
      )}

      {editData && (
        <p className="text-sm text-yellow-400">
          Editing: {editData}
        </p>
      )}

      {errors[name] && (
        <span className="text-red-500">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;