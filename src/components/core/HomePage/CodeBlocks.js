import React from "react";
import CTAButton from "./Button";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
}) => {
  return (
    <div
      className={`flex ${position} gap-10 items-center justify-between
      bg-gradient-to-br from-richblack-900 to-richblack-800
      rounded-xl p-10`}
    >
      {/* LEFT / RIGHT CONTENT */}
      <div className="w-1/2 flex flex-col gap-6">
        {heading}

        <p className="text-richblack-300">
          {subheading}
        </p>

        <div className="flex gap-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {ctabtn1.text}
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.text}
          </CTAButton>
        </div>
      </div>

      {/* CODE BLOCK */}
      <div className="w-1/2 bg-richblack-900 rounded-lg border border-richblack-700 overflow-hidden">
        <div className="flex gap-2 px-4 py-2 bg-richblack-800">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <pre className="text-sm text-richblack-100 p-4 overflow-x-auto">
          <code>{codeblock}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlocks;
