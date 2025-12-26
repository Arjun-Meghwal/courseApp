import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account created successfully!");
    navigate("/Home");
  }

  return (
    <div className="w-full max-w-md mx-auto bg-richblack-800/90 backdrop-blur-md
                    text-black rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

      {/* Role buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          type="button"
          className="px-5 py-2 rounded-full bg-richblack-700
                     hover:bg-richblack-600 transition font-medium"
        >
          Student
        </button>
        <button
          type="button"
          className="px-5 py-2 rounded-full bg-richblack-700
                     hover:bg-richblack-600 transition font-medium"
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="w-full">
            <p className="text-sm mb-1 text-richblack-200">
              First Name <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={changeHandler}
              placeholder="First name"
              className="w-full rounded-lg bg-richblack-700 px-3 py-2
                         outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>

          <label className="w-full">
            <p className="text-sm mb-1 text-richblack-200">
              Last Name <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={changeHandler}
              placeholder="Last name"
              className="w-full rounded-lg bg-richblack-700 px-3 py-2
                         outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="text-sm mb-1 text-richblack-200">
            Email Address <sup className="text-pink-500">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email address"
            className="w-full rounded-lg bg-richblack-700 px-3 py-2
                       outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        {/* Passwords */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="w-full relative">
            <p className="text-sm mb-1 text-richblack-200">
              Create Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Password"
              className="w-full rounded-lg bg-richblack-700 px-3 py-2 pr-10
                         outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-[38px] cursor-pointer
                         text-xl text-richblack-300 hover:text-white"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-sm mb-1 text-richblack-200">
              Confirm Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={changeHandler}
              placeholder="Confirm password"
              className="w-full rounded-lg bg-richblack-700 px-3 py-2 pr-10
                         outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 rounded-lg bg-yellow-400 py-2.5
                     text-black font-semibold hover:bg-yellow-300
                     transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
