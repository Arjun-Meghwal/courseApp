import React from "react";
import SingupFrome from "./SingupFrome";
import Loginform from "./Loginform";
import frame from "../../../assets/frame.jpg";
import image from "../../../assets/group.png";

const Templates = ({ title, desc1, desc2, formtype, setIsLoggedIn }) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full bg-richblack-900 flex items-center justify-center px-4 sm:px-8">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white">

        {/* ===== LEFT SECTION ===== */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-richblack-5">
              {title}
            </h1>
            <p className="mt-2 text-richblack-300 text-base">
              {desc1}{" "}
              <span className="text-blue-400 font-semibold">
                {desc2}
              </span>
            </p>
          </div>

          {/* ===== FORM ===== */}
          <div className="mt-4">
            {formtype === "Signup" ? (
              <SingupFrome setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Loginform setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>

          {/* ===== DIVIDER ===== */}
          <div className="flex items-center ">
            <div className="h-[1px] w-full bg-richblack-600"></div>
            <p className="text-sm text-richblack-300 font-medium">OR</p>
            <div className="h-[1px] w-full bg-richblack-600"></div>
          </div>

          {/* ===== GOOGLE BUTTON ===== */}
          <button
            className="flex items-center justify-center gap-3 rounded-lg border
                       border-richblack-600 bg-richblack-800 py-2
                       hover:bg-richblack-700 transition-all duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-richblack-50 font-semibold">
              Continue with Google
            </span>
          </button>
        </div>

        {/* ===== RIGHT IMAGE SECTION ===== */}
        <div className="relative hidden md:flex items-center justify-center">
          <img
            src={frame}
            alt="frame"
            className="w-[60%] rounded-2xl z-0"
            loading="lazy"
          />
          <img
            src={image}
            alt="overlay"
            className="absolute w-[90%] z-10 pointer-events-none"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
};

export default Templates;
