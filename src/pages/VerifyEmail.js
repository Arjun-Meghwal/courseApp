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

  // 🔒 Protect route if refreshed
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  // handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // submit OTP (REAL SIGNUP HERE)
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

  // resend OTP
  const resendOtpHandler = () => {
    dispatch(sendOtp(signupData.email, navigate));
    toast.success("OTP resent");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white px-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-[#020817] p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-2">Verify email</h1>

          <p className="text-sm text-gray-400 mb-6">
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
                  className="w-12 h-12 text-center text-lg rounded-md bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
            >
              Verify & Create Account
            </button>
          </form>

          <div className="flex justify-between items-center mt-4 text-sm">
            <Link
              to="/login"
              className="text-gray-400 hover:text-yellow-400"
            >
              ← Back to login
            </Link>

            <button
              onClick={resendOtpHandler}
              className="text-blue-400 hover:underline"
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
