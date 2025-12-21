import React, { useState } from "react";
import { FaUser, FaBook, FaArrowRight } from "react-icons/fa";
import HighlightText from "../../HighlightText";
import CTAButton from "./Button";
import { HomePageExplore } from "../../../data/homepage-explore";

const tabs = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreNow = () => {
  const [activeTab, setActiveTab] = useState("Free");
  const [activeCard, setActiveCard] = useState(0);

  // get courses based on active tab
  const selectedTabData = HomePageExplore.find(
    (item) => item.tag === activeTab
  );

  const courses = selectedTabData?.courses || [];

  return (
    <div className="w-full mt-20">

      {/* ================= TOP SECTION ================= */}
      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Unlock the <span className="text-cyan-400">Power of Code</span>
        </h2>
        <p className="mt-3 text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>

        {/* Tabs */}
        <div className="flex justify-center mt-10">
          <div className="flex bg-richblack-800 rounded-full p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveCard(0);
                }}
                className={`px-6 py-2 rounded-full text-sm transition
                  ${activeTab === tab
                    ? "bg-richblack-900 text-white"
                    : "text-richblack-300 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          {courses.map((course, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-[320px] p-6 rounded-xl text-left cursor-pointer transition-all
                  ${isActive
                    ? "bg-white text-black relative"
                    : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700"
                  }`}
              >
                {isActive && (
                  <div className="absolute -left-3 top-6 w-2 h-[85%] bg-yellow-400"></div>
                )}

                <h3 className="text-xl font-semibold mb-3">
                  {course.heading}
                </h3>

                <p className="text-sm mb-6">
                  {course.description}
                </p>

                <hr className="border-dashed border-richblack-400 mb-4" />

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FaUser />
                    {course.level}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBook />
                    {course.lessonNumber} Lessons
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="mt-16 flex justify-center gap-6">
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Explore Full Catalog <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto="/signup">
            Learn More
          </CTAButton>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="mt-24 py-24">
        <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-start gap-16">

          <h2 className="text-4xl font-semibold text-richblack-900 w-[45%]">
            Get the skills you need for a{" "}
            <HighlightText text="job that is in demand." />
          </h2>

          <div className="w-[40%] flex flex-col gap-6 text-richblack-600">
            <p>
              The modern StudyNotion dictates its own terms. Today, to be
              competitive requires more than professional skills.
            </p>

            <CTAButton active={true} linkto="/signup">
              Learn More
            </CTAButton>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExploreNow;
