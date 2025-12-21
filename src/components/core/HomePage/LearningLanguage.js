import React from "react";
import HighlightText from "../../HighlightText";
import CTAButton from "./Button";

import progressImg from "../../../assets/progress.png";
import compareImg from "../../../assets/compaire.svg";
import calendarImg from "../../../assets/calender.svg";

const LearningLanguage = () => {
  return (
    <div className="flex flex-col items-center text-center gap-8 mt-32">

      {/* ===== Heading ===== */}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Your swiss knife for{" "}
        <HighlightText text="learning any language" />
      </h2>

      {/* ===== Description ===== */}
      <p className="max-w-[700px] text-lg text-richblack-300 leading-relaxed">
        Learn multiple languages easily with smart progress tracking,
        structured lessons, and hands-on practice.
      </p>

      {/* ===== 3 Image Cards ===== */}
      <div className="relative mt-14 flex items-center justify-center">

        {/* Left card */}
        <img
          src={progressImg}
          alt="Know your progress"
          className="w-[260px] rotate-[-12deg] shadow-xl"
        />

        {/* Center card */}
        <img
          src={compareImg}
          alt="Compare with others"
          className="w-[280px] z-10 -mx-14 shadow-2xl"
        />

        {/* Right card */}
        <img
          src={calendarImg}
          alt="Plan your lessons"
          className="w-[260px] rotate-[12deg] shadow-xl"
        />

      </div>

      {/* ===== CTA ===== */}
      <div className="mt-10">
        <CTAButton active={true} linkto="/signup">
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguage;
