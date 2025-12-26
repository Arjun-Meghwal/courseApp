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

  // token comes from URL
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-2">
            Choose New Password
          </h1>

          <p className="text-sm text-slate-300 mb-6">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                New Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Confirm New Password
              </label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 rounded-md bg-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition"
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
  