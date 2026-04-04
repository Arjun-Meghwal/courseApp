import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signUp, sendOtp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signupData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    dispatch(
      signUp(
        {
          ...signupData,
          otp: enteredOtp,
        },
        navigate
      )
    );
  };

  const resendOtpHandler = () => {
    dispatch(sendOtp(signupData.email, navigate));
    toast.success("OTP resent");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] px-4 text-white">

      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] 
        p-8 text-center space-y-6">

          <h1 className="text-3xl font-bold">
            Verify Email
          </h1>

          <p className="text-sm text-richblack-300">
            A verification code has been sent to your email
          </p>

          <form onSubmit={submitHandler}>
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg rounded-lg 
                  bg-white/10 text-white
                  border border-white/10
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                  transition"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 
              text-black font-semibold py-3 rounded-lg
              hover:scale-[1.02] transition duration-200"
            >
              Verify & Create Account
            </button>
          </form>

          <div className="flex justify-between items-center text-sm">
            <Link
              to="/login"
              className="text-richblack-300 hover:text-yellow-400 transition"
            >
              ← Back to login
            </Link>

            <button
              onClick={resendOtpHandler}
              className="text-yellow-400 hover:underline"
            >
              Resend OTP
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default VerifyEmail;