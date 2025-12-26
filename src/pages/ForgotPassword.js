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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-slate-900 text-white rounded-2xl shadow-xl p-8 space-y-6">

          <h1 className="text-2xl font-semibold text-center">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>

          <p className="text-sm text-slate-300 text-center">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            {!emailSent && (
              <div>
                <label className="block text-sm mb-1 text-slate-300">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition-all duration-200"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-slate-400 hover:text-yellow-400 transition"
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
