import React from "react";
import Instructor from "../../../assets/Instructor.png";
import HighlightText from "../../HighlightText";
import CTABUtton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      {/*  width controlled  */}
      <div className="flex flex-row items-center gap-10 max-w-6xl mx-auto">

        {/* Instructor Image */}
        <div className="w-[40%] relative">
          <div className="absolute -top-5 -left-5 w-full h-full bg-white"></div>

          <img
            src={Instructor}
            alt="Instructor"
            className="relative z-10 w-full"
          />
        </div>

        {/* Text Content */}
        <div className="w-[60%] flex flex-col gap-5">
          <div className="text-4xl font-semibold text-white">
            Become an <HighlightText text={"Instructor"} />
          </div>

          <p className="font-medium text-richblack-300 max-w-[90%]">
            Instructors from around the world teach millions of students on our
            platform. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTABUtton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTABUtton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorSection;
