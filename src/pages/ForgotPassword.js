import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const { loading = false } = useSelector(
    (state) => state.auth || {}
  );

  function submitHandler(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Password reset link sent to your email!");
    setEmailSent(true);
  }

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
        p-8 space-y-6">

          <h1 className="text-3xl font-bold text-center">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>

          <p className="text-sm text-richblack-300 text-center leading-relaxed">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={submitHandler} className="space-y-5">
            {!emailSent && (
              <div>
                <label className="block text-sm mb-2 text-richblack-200">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg 
                  bg-white/10 text-white placeholder-white/40
                  border border-white/10
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                  transition"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 
              text-black font-semibold py-3 rounded-lg
              hover:scale-[1.02] transition duration-200"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-richblack-300 hover:text-yellow-400 transition"
            >
              ← Back to login
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default ForgotPassword;