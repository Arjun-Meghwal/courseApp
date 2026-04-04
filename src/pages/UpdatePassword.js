import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = location.pathname.split("/").at(-1);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(resetPassword(password, confirmPassword, token, navigate));
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
        p-8 space-y-6">

          <h1 className="text-3xl font-bold">
            Choose New Password
          </h1>

          <p className="text-sm text-richblack-300">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="block text-sm mb-2 text-richblack-200">
                New Password
              </label>

              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg 
                bg-white/10 text-white placeholder-white/40
                border border-white/10
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-richblack-200">
                Confirm New Password
              </label>

              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg 
                bg-white/10 text-white placeholder-white/40
                border border-white/10
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 
              text-black font-semibold py-3 rounded-lg
              hover:scale-[1.02] transition duration-200"
            >
              Reset Password
            </button>

          </form>

        </div>
      )}

    </div>
  );
};

export default UpdatePassword;