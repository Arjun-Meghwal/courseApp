import React from "react";
import SingupFrome from "./SingupFrome";
import Loginform from "./Loginform";
import frame from "../../../assets/frame.jpg";
import image from "../../../assets/group.png";

const Templates = ({ title, desc1, desc2, formtype, setIsLoggedIn }) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full 
    bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] 
    flex items-center justify-center px-4 sm:px-8 text-white">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 
      gap-10 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {title}
            </h1>

            <p className="mt-2 text-richblack-300 text-base">
              {desc1}{" "}
              <span className="text-yellow-400 font-semibold">
                {desc2}
              </span>
            </p>
          </div>

          <div className="mt-4">
            {formtype === "Signup" ? (
              <SingupFrome setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Loginform setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[1px] w-full bg-white/10"></div>
            <p className="text-sm text-richblack-300 font-medium">OR</p>
            <div className="h-[1px] w-full bg-white/10"></div>
          </div>

          <button
            className="flex items-center justify-center gap-3 rounded-lg 
            border border-white/10 bg-white/5 backdrop-blur-md
            py-3 hover:bg-white/10 transition-all duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-semibold text-white">
              Continue with Google
            </span>
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative hidden md:flex items-center justify-center">

          <div className="relative w-[70%]">

            <img
              src={frame}
              alt="frame"
              className="w-full rounded-2xl opacity-80"
              loading="lazy"
            />

            <img
              src={image}
              alt="overlay"
              className="absolute top-0 left-0 w-full z-10 pointer-events-none 
              drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              loading="lazy"
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Templates;