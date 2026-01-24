import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("Student");

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

    // 1️⃣ Save signup data in redux
    dispatch(
      setSignupData({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmpassword,
        accountType,
      })
    );

    dispatch(sendOtp(formData.email, navigate));
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-8 shadow-lg bg-richblack-800 text-white">

      {/* Account Type */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => setAccountType("Student")}
          className={`px-5 py-2 rounded-full ${accountType === "Student"
              ? "bg-yellow-400 text-black"
              : "bg-richblack-700"
            }`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => setAccountType("Instructor")}
          className={`px-5 py-2 rounded-full ${accountType === "Instructor"
              ? "bg-yellow-400 text-black"
              : "bg-richblack-700"
            }`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Name */}
        <div className="flex gap-4">
          <input
            required
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={changeHandler}
            className="w-full p-2 rounded bg-richblack-700"
          />

          <input
            required
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={changeHandler}
            className="w-full p-2 rounded bg-richblack-700"
          />
        </div>

        {/* Email */}
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={changeHandler}
          className="w-full p-2 rounded bg-richblack-700"
        />

        {/* Password */}
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full p-2 rounded bg-richblack-700"
          />
          <span
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2 cursor-pointer"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <input
          required
          type={showPassword ? "text" : "password"}
          name="confirmpassword"
          placeholder="Confirm Password"
          value={formData.confirmpassword}
          onChange={changeHandler}
          className="w-full p-2 rounded bg-richblack-700"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded font-semibold"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
