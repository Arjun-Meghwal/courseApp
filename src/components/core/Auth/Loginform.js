import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Loginform = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
    navigate("/home");
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-md mx-auto rounded-2xl
                 backdrop-blur-md
                 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                 flex flex-col gap-6"
    >
      {/* Email */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-richblack-200">
          Email Address <sup className="text-pink-500">*</sup>
        </span>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email address"
          className="w-full rounded-lg bg-richblack-700 px-3 py-2
                     text-black placeholder-richblack-300
                     outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </label>

      {/* Password */}
      <label className="flex flex-col gap-1 text-sm relative">
        <span className="text-richblack-200">
          Password <sup className="text-pink-500">*</sup>
        </span>

        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter password"
          className="w-full rounded-lg bg-richblack-700 px-3 py-2 pr-10
                     text-black placeholder-richblack-300
                     outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <span
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-[34px]
                     cursor-pointer text-xl
                     text-richblack-300 hover:text-yellow-400
                     transition"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>

        <Link
          to="/forgot-password"
          className="mt-1 text-right text-xs
                     text-yellow-400 hover:underline"
        >
          Forgot password?
        </Link>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 w-full rounded-lg
                   bg-yellow-400 py-2.5
                   font-semibold text-richblack-900
                   hover:bg-yellow-300
                   transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default Loginform;
