import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Banner from "../assets/Banner.mp4";
import Footer from '../components/core/HomePage/Footer';
import ReviewsSection from '../components/core/HomePage/ReviewsSection';
import ExploreNow from '../components/core/HomePage/ExploreNow';

const Home = () => {
  return (
    <div className="bg-[#020617] text-gray-300 overflow-x-hidden">

      {/* =====  SECTION ===== */}
      <div className="relative mx-auto flex flex-col max-w-maxContent
        items-center justify-center min-h-[70vh] gap-6 text-center">

        <Link to="/signup">
          <div className="flex items-center gap-2 rounded-full
            bg-richblack-800 px-6 py-2 text-sm text-richblack-200
            hover:bg-richblack-700 transition">
            <p>Become an instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <h1 className="text-5xl font-bold leading-tight mt-6 text-richblack-600">
          Empower your future with{" "}
          <HighlightText text="coding skills" />
        </h1>

        <p className="max-w-[600px] text-lg text-richblack-800 leading-relaxed">
          With our online courses, you can learn at your own pace from anywhere
          in the world and gain hands-on experience with real projects.
        </p>

        <div className="flex gap-6 mt-10">
          <CTAButton active={true} linkto="/signup">
            Learn more
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book a demo
          </CTAButton>
        </div>

        {/* =====  video add ===== */}
        <div className="mx-auto mt-16 w-11/12 max-w-maxContent">
          <div className="relative overflow-hidden rounded-xl border border-richblack-700 shadow-2xl">
            <video
              muted
              loop
              autoPlay
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* =====  section end ===== */}


      {/* ===== code section ===== */}
      <div className="mt-24 w-11/12 mx-auto max-w-maxContent">
        <CodeBlocks
          position="flex-row"
          heading={
            <h2 className="text-3xl font-semibold text-white">
              Unlock your <HighlightText text="coding potential" />
            </h2>
          }
          subheading="Learn by building real projects with hands-on guidance."
          ctabtn1={{
            active: true,
            linkto: "/signup",
            text: "Try it yourself",
          }}
          ctabtn2={{
            active: false,
            linkto: "/login",
            text: "Learn more",
          }}
          codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
</html>`}
        />
      </div>

      {/* ===== REVERSE CODE SECTION ===== */}
      <div className="mt-24 w-11/12 mx-auto max-w-maxContent">
        <CodeBlocks
          position="flex-row-reverse"
          heading={
            <h2 className="text-3xl font-semibold text-white">
              Start <HighlightText text="coding in seconds" />
            </h2>
          }
          subheading="Go from beginner to pro with practical coding experience."
          ctabtn1={{
            active: true,
            linkto: "/signup",
            text: "Continue lesson",
          }}
          ctabtn2={{
            active: false,
            linkto: "/login",
            text: "Learn more",
          }}
          codeblock={`function greet() {
  console.log("Hello World");
}

greet();`}
        />
      </div>

<ExploreNow/>
     

      {/* ===== instructor section ===== */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col
        items-center -gap-6 py-24 bg-richblack-900">
        <InstructorSection />
        <ReviewsSection />
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />

    </div>
  );
};

export default Home;
