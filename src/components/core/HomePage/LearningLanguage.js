import React from "react";
import HighlightText from "../../HighlightText";
import CTAButton from "./Button";

import progressImg from "../../../assets/progress.png";
import compareImg from "../../../assets/compaire.svg";
import calendarImg from "../../../assets/calender.svg";
import { useSelector } from "react-redux";
// const { token } = useSelector((state) => state.auth);

const LearningLanguage = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center text-center gap-6 sm:gap-8 mt-16 sm:mt-24 lg:mt-32 px-4 overflow-x-hidden">

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        Your swiss knife for{" "}
        <HighlightText text="learning any language" />
      </h2>

      {/* Description */}
      <p className="max-w-[700px] text-base sm:text-lg text-richblack-300 leading-relaxed">
        Learn multiple languages easily with smart progress tracking,
        structured lessons, and hands-on practice.
      </p>

      {/* Images */}
      <div className="relative mt-8 sm:mt-14 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">

        {/* Left */}
        <img
          src={progressImg}
          alt="Know your progress"
          className="w-[220px] sm:w-[260px] md:rotate-[-12deg] shadow-xl"
        />

        {/* Center */}
        <img
          src={compareImg}
          alt="Compare with others"
          className="w-[240px] sm:w-[280px] z-10 md:-mx-14 shadow-2xl"
        />

        {/* Right */}
        <img
          src={calendarImg}
          alt="Plan your lessons"
          className="w-[220px] sm:w-[260px] md:rotate-[12deg] shadow-xl"
        />

      </div>

      {/* CTA */}
      <div className="mt-2">
        <CTAButton
          active={true}
          linkto={token ? "/dashboard/my-profile" : "/login"}
        >
          Learn More
        </CTAButton>
      </div>

    </div>
  );
};

export default LearningLanguage;
