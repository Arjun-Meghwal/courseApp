import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Banner from "../assets/Banner.mp4";
import ReviewsSection from '../components/core/HomePage/ReviewsSection';
import ExploreNow from '../components/core/HomePage/ExploreNow';
import LearningLanguage from '../components/core/HomePage/LearningLanguage';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white overflow-x-hidden">

      <div className="relative mx-auto flex flex-col max-w-maxContent
        items-center justify-center min-h-[80vh] gap-6 text-center px-4">

        <Link to="/dashboard/my-profile">
          <div className="flex items-center gap-2 rounded-full
            bg-white/5 backdrop-blur-md border border-white/10
            mt-8
            px-6 py-2 text-sm text-richblack-200
            hover:bg-white/10 hover:text-yellow-400 transition-all duration-200">
            <p>Become an instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-6">
          Empower your future with{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            coding skills
          </span>
        </h1>

        <p className="max-w-[600px] text-lg text-richblack-300 leading-relaxed">
          With our online courses, you can learn at your own pace from anywhere
          in the world and gain hands-on experience with real projects.
        </p>

        <div className="flex gap-6 mt-8 flex-wrap justify-center">
          <CTAButton active={true} linkto="/signup">
            Learn more
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book a demo
          </CTAButton>
        </div>

        <div className="mx-auto w-full max-w-[900px] mt-12">
          <div className="relative overflow-hidden rounded-xl border border-white/10 
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <video
              muted
              loop
              autoPlay
              playsInline
              className="w-full aspect-video object-cover hover:scale-[1.01] transition duration-300"
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>

      </div>

      <div className="mt-10 w-11/12 mx-auto max-w-maxContent">
        <CodeBlocks
          position="flex-row"
          heading={
            <h2 className="text-3xl font-semibold">
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

      <div className="w-11/12 mx-auto max-w-maxContent mt-10">
        <CodeBlocks
          position="flex-row-reverse"
          heading={
            <h2 className="text-3xl font-semibold">
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

      <div className="mt-16">
        <ExploreNow />
      </div>

      <div className="mt-16">
        <LearningLanguage />
      </div>

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col
        items-center gap-10 py-20">
        <InstructorSection />
        <ReviewsSection />
      </div>

    </div>
  );
};

export default Home;