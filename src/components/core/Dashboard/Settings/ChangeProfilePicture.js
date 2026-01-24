import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../services/apiconnector"
import { profileEndpoints } from "../../../../services/apis"
import axios from "axios"
import toast from "react-hot-toast";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const [image, setImage] = useState(null);

  const { token } = useSelector((state) => state.auth);

  const uploadHandler = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const res = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_PROFILE_PICTURE_API,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Profile picture updated");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };


  return (
    <div className="mb-10 flex flex-col gap-6 rounded-xl bg-richblack-800 p-6
    shadow-[0_0_40px_0_rgba(0,0,0,0.35)]
    md:flex-row md:items-center">

      {/* PROFILE IMAGE */}
      <img
        src={
          image
            ? URL.createObjectURL(image)
            : user?.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
        }
        alt="profile"
        className="aspect-square w-[90px] self-center rounded-full
        object-cover bg-richblack-700 md:self-start"
      />

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-3 w-full">

        <p className="text-lg font-semibold text-richblack-5">
          Change Profile Picture
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* SELECT BUTTON */}
          <label
            htmlFor="profileImage"
            className="cursor-pointer rounded-md bg-richblack-700
            px-5 py-2 text-center text-sm text-richblack-50
            hover:bg-richblack-600 transition-all"
          >
            Select
          </label>

          {/* HIDDEN INPUT */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* UPLOAD BUTTON */}
          <button
            onClick={uploadHandler}
            className="rounded-md bg-yellow-400 px-6 py-2 text-sm
            font-semibold text-richblack-900 hover:bg-yellow-300
            transition-all"
          >
            Upload
          </button>
        </div>

        {/* FILE NAME */}
        {image && (
          <p className="text-xs text-richblack-400">
            Selected: {image.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
