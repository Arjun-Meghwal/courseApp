import React from "react";

import Logo1 from "../../../assets/Logo1.png";
import Logo2 from "../../../assets/Logo2.png";
import Logo3 from "../../../assets/Logo3.png";
import Logo4 from "../../../assets/Logo4.png";
import TimelineImage from "../../../assets/TimelineImage.jpeg";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Taking ownership of outcomes and actions",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "Adapting quickly to changing environments",
  },
  {
    logo: Logo4,
    heading: "Problem Solving",
    description: "Finding effective solutions to challenges",
  },
];

const TimelineSection = () => {
  return (
    <div className="mt-16 sm:mt-24 px-4 overflow-x-hidden">

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-6xl mx-auto">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">

          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-4">

              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow shrink-0">
                <img
                  src={item.logo}
                  alt={item.heading}
                  className="w-6 h-6"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-richblack-800">
                  {item.heading}
                </h3>

                <p className="text-richblack-600 text-sm max-w-full sm:max-w-[280px]">
                  {item.description}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full lg:w-1/2 relative">

          <img
            src={TimelineImage}
            alt="Timeline"
            className="w-full rounded-xl shadow-xl"
          />

          {/* STATS CARD */}
          <div
            className="absolute -bottom-8 sm:-bottom-6 left-1/2 -translate-x-1/2
          bg-green-700 text-white
          w-[90%] sm:w-auto
          flex justify-around sm:justify-center
          gap-6 sm:gap-10
          px-4 sm:px-8 py-4
          rounded-lg shadow-lg"
          >

            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">
                10
              </p>
              <p className="text-[10px] sm:text-xs">
                YEARS EXPERIENCE
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">
                250
              </p>
              <p className="text-[10px] sm:text-xs">
                TYPE OF COURSES
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TimelineSection;
