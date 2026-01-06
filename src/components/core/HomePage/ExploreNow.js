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

                <p className="text-sm mb-6">{course.description}</p>

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
        <div className="mt-6 flex justify-center gap-6">
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-1">
              Explore Full Catalog <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto="/signup">
            Learn More
          </CTAButton>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="mt-4 py-4 w-11/12">
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

      {/* =================  IMAGE ================= */}
      <div className="w-11/12 max-w-7xl mx-auto my-3">
        <div className="flex flex-col lg:flex-row gap- items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-8 w-full lg:w-[45%]">

            {/* ITEM 1 */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100
                    flex items-center justify-center shadow">
                <FaUser className="text-blue-600 text-xl" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-richblack-900">
                  Leadership
                </h3>
                <p className="text-sm text-richblack-500">
                  Fully committed to guiding students towards success.
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-pink-100
                    flex items-center justify-center shadow">
                <FaBook className="text-pink-600 text-xl" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-richblack-900">
                  Responsibility
                </h3>
                <p className="text-sm text-richblack-500">
                  Students’ growth and learning is always our top priority.
                </p>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-emerald-100
                    flex items-center justify-center shadow">
                <FaArrowRight className="text-emerald-600 text-xl" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-richblack-900">
                  Flexibility
                </h3>
                <p className="text-sm text-richblack-500">
                  Learn anytime, anywhere with flexible course structures.
                </p>
              </div>
            </div>

            {/* ITEM 4 */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100
                    flex items-center justify-center shadow">
                <FaBook className="text-yellow-600 text-xl" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-richblack-900">
                  Problem Solving
                </h3>
                <p className="text-sm text-richblack-500">
                  Build real-world solutions by writing practical code.
                </p>
              </div>
            </div>

          </div>


          {/* RIGHT IMAGE */}
          <div className="relative w-full lg:w-[45%] h-[320px] sm:h-[380px] lg:h-[420px]">

            {/* IMAGE */}
            <img
              src={require("../../../assets/learning.avif")}
              alt="learning"
              className="w-full h-full object-cover rounded-xl"
            />

            {/* STATS CARD */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2
               bg-[#064E3B] text-white
               w-[90%] sm:w-[80%]
               flex justify-around items-center
               py-5 rounded-xl shadow-2xl"
            >
              <div className="text-center">
                <p className="text-3xl font-bold">10</p>
                <p className="text-xs sm:text-sm text-white/80">
                  YEARS OF EXPERIENCE
                </p>
              </div>

              <div className="w-[1px] h-12 bg-white/30"></div>

              <div className="text-center">
                <p className="text-3xl font-bold">250</p>
                <p className="text-xs sm:text-sm text-white/80">
                  TYPE OF COURSES
                </p>
              </div>
            </div>
          </div>

          </div>

        </div>
      </div>
  );
};

export default ExploreNow;
