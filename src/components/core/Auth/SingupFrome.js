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
    <div className="w-full max-w-md mx-auto rounded-2xl p-8 
    bg-white/5 backdrop-blur-xl border border-white/10 
    shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-white">

      <div className="flex justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => setAccountType("Student")}
          className={`px-5 py-2 rounded-full transition-all duration-200
            ${accountType === "Student"
              ? "bg-yellow-400 text-black shadow-lg"
              : "bg-white/10 hover:bg-white/20"
            }`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => setAccountType("Instructor")}
          className={`px-5 py-2 rounded-full transition-all duration-200
            ${accountType === "Instructor"
              ? "bg-yellow-400 text-black shadow-lg"
              : "bg-white/10 hover:bg-white/20"
            }`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">

        <div className="flex gap-4">
          <input
            required
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-lg 
            bg-white/10 text-white placeholder-white/40
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <input
            required
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-lg 
            bg-white/10 text-white placeholder-white/40
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={changeHandler}
          className="w-full px-4 py-3 rounded-lg 
          bg-white/10 text-white placeholder-white/40
          border border-white/10
          focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />

        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-lg 
            bg-white/10 text-white placeholder-white/40
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <span
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 cursor-pointer text-white/60 hover:text-yellow-400"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <input
          required
          type={showPassword ? "text" : "password"}
          name="confirmpassword"
          placeholder="Confirm Password"
          value={formData.confirmpassword}
          onChange={changeHandler}
          className="w-full px-4 py-3 rounded-lg 
          bg-white/10 text-white placeholder-white/40
          border border-white/10
          focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 
          text-black py-3 rounded-lg font-semibold
          hover:scale-[1.02] transition duration-200"
        >
          Create Account
        </button>

      </form>
    </div>
  );
};

export default SignupForm;