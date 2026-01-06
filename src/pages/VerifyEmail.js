import React, {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    // move to next input
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

  // submit OTP
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    dispatch(verifyOtp(enteredOtp, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white px-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-[#020817] p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-2">Verify email</h1>

          <p className="text-sm text-gray-400 mb-6">
            A verification code has been sent to you. Enter the code below.
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
              Verify email
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
              onClick={() => toast.success("OTP resent")}
              className="text-blue-400 hover:underline"
            >
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
