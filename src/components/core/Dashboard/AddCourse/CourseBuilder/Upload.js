import React from "react";

const Upload = ({
  name,
  label,
  register,
  errors,
  setValue,
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

        onChange={(e) => {
          setValue(name, e.target.files[0]);
        }}
      />

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