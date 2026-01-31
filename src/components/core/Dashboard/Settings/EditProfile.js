import React, { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../../services/apiconnector"
import { profileEndpoints } from "../../../../services/apis"

import { toast } from "react-hot-toast"
// import  api

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    about: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        dateOfBirth: user.additionalDetails?.dateOfBirth ?? "",
        gender: user.additionalDetails?.gender ?? "",
        phoneNumber: user.additionalDetails?.phoneNumber ?? "",
        about: user.additionalDetails?.about ?? "",
      })
    }
  }, [user])

  const changeHandler = (e) => {
    setFormData((prev) => ({  
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const { token } = useSelector((state) => state.auth)

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(" SUBMIT CLICKED");   

    try {
      const res = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_PROFILE_API,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error(error)
      toast.error("Profile update failed")
    }
  }
  return (
    <form
      onSubmit={submitHandler}
      className="mb-14 rounded-xl bg-richblack-800 p-8 shadow-[0_0_40px_0_rgba(0,0,0,0.35)]"
    >
      <h2 className="text-2xl font-semibold mb-2">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={changeHandler}
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={changeHandler}
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={changeHandler}
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={changeHandler}
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm mb-1">
            Contact Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={changeHandler}
            placeholder="Enter Contact Number"
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm mb-1">
            About
          </label>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={changeHandler}
            placeholder="Enter Bio Details"
            className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          className="rounded-md bg-richblack-700 px-6 py-2 text-sm
          text-richblack-200 hover:bg-richblack-600 transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-yellow-400 px-6 py-2 text-sm
          font-semibold text-richblack-900 hover:bg-yellow-300 transition-all"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default EditProfile
