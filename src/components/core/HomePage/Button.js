import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <button
        className={`relative inline-flex items-center justify-center
        px-7 py-3 rounded-lg text-sm font-semibold
        transition-all duration-200 ease-out
        ${active
            ? "bg-yellow-50 text-black hover:bg-yellow-100 shadow-md shadow-yellow-50/20"
            : "bg-richblack-800 text-white hover:bg-richblack-700 border border-richblack-700"
          }`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
