import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const Loginform = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    dispatch(
      login(formData.email, formData.password, navigate)
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-md mx-auto rounded-2xl
      bg-white/5 backdrop-blur-xl border border-white/10
      p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]
      flex flex-col gap-6 text-white"
    >

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
          className="w-full rounded-lg px-4 py-3
          bg-white/10 text-white placeholder-white/40
          border border-white/10
          outline-none focus:ring-2 focus:ring-yellow-400
          transition"
        />
      </label>

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
          className="w-full rounded-lg px-4 py-3 pr-10
          bg-white/10 text-white placeholder-white/40
          border border-white/10
          outline-none focus:ring-2 focus:ring-yellow-400
          transition"
        />

        <span
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-[38px]
          cursor-pointer text-xl
          text-white/60 hover:text-yellow-400 transition"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>

        <Link
          to="/forgot-password"
          className="mt-1 text-right text-xs text-yellow-400 hover:underline"
        >
          Forgot password?
        </Link>
      </label>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg
        bg-gradient-to-r from-yellow-400 to-yellow-300
        py-3 font-semibold text-black
        hover:scale-[1.02] transition duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default Loginform;