import React from "react";
import CountryDropdown from "../components/common/CountryDropdown";
import { useState } from "react";
// import {HighlightText} from "../components/HighlightText";

const stats = [
  { value: "5K+", label: "Active Students" },
  { value: "10+", label: "Mentors" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Awards" },
];


const About = () => {
  const [countryCode, setCountryCode] = useState("+91");
  return (
    <div className="bg-[#020617] text-white">

      {/* ========== HERO SECTION ========== */}
      <section className="mx-auto max-w-maxContent px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold">
          Driving Innovation in Online Education for a{" "}
          <span className="text-blue-100">Brighter Future</span>
        </h1>

        <p className="mt-6 text-richblack-300 max-w-3xl mx-auto">
          Studynotion is at the forefront of driving innovation in online
          education. We’re passionate about creating a brighter future by
          offering cutting-edge courses, leveraging engaging technologies,
          and nurturing a vibrant learning community.
        </p>
       </section>

      {/* ========== IMAGE STRIP ========== */}
      <section className="flex flex-col md:flex-row gap-6 justify-center px-4">
        <img
          src="https://images.pexels.com/photos/7092364/pexels-photo-7092364.jpeg"
          alt="Learning online"
          className="rounded-xl object-cover w-full md:w-[30%]"
        />
        <img
          src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
          alt="Student studying"
          className="rounded-xl object-cover w-full md:w-[30%]"
        />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Writing notes"
          className="rounded-xl object-cover w-full md:w-[30%]"
        />
      </section>

      {/* ========== MISSION STATEMENT ========== */}
      <section className="mx-auto max-w-maxContent px-4 py-20 text-center">
        <p className="text-2xl font-medium">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <span className="text-blue-100">combines technology</span>,{" "}
          <span className="text-yellow-50">expertise</span>, and{" "}
          <span className="text-orange-100">community</span> to create an{" "}
          <span className="text-yellow-50">unparalleled educational experience</span>.
        </p>
      </section>

      {/* ========== FOUNDING STORY ========== */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold text-pink-200 mb-6">
            Our Founding Story
          </h2>

          <p className="text-richblack-300 mb-4">
            Our e-learning platform was born out of a shared vision and
            passion for transforming education. It all began with a group
            of educators, technologists, and lifelong learners who
            recognized the need for accessible, flexible, and high-quality
            learning opportunities in a rapidly evolving digital world.
          </p>

          <p className="text-richblack-300">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems.
            We believed that education should not be confined to the walls
            of a classroom or restricted by geographical boundaries.
          </p>
        </div>
         
        <img 
          src="https://images.unsplash.com/photo-1588072432836-e10032774350"
          alt="Team discussion"
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* ========== VISION & MISSION ========== */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-semibold text-orange-100 mb-4">
            Our Vision
          </h2>
          <p className="text-richblack-300">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people
            learn. Our team of dedicated experts worked tirelessly to
            develop a robust and intuitive platform that combines
            cutting-edge technology with engaging content.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-blue-100 mb-4">
            Our Mission
          </h2>
          <p className="text-richblack-300">
            Our mission goes beyond just delivering courses online. We
            wanted to create a vibrant community of learners where
            individuals can connect, collaborate, and learn from one
            another through forums, live sessions, and networking
            opportunities.
          </p>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="bg-richblack-800 py-14">
        <div className="mx-auto max-w-maxContent grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-richblack-5">
                {stat.value}
              </h3>
              <p className="text-richblack-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== LEARNING SECTION ========== */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            World-Class Learning for{" "}
            <span className="text-blue-100">Anyone, Anywhere</span>
          </h2>

          <p className="text-richblack-300 mb-6">
            Studynotion partners with more than 275+ leading universities
            and companies to bring flexible, affordable, job-relevant
            online learning to individuals and organizations worldwide.
          </p>

          <button className="bg-yellow-50 text-black px-6 py-3 rounded-md font-semibold">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            "Curriculum Based on Industry Needs",
            "Our Learning Methods",
            "Certification",
            "Rating & Auto-grading",
            "Ready to Work",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-richblack-800 p-6 rounded-lg text-richblack-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ========== CONTACT FORM ========== */}

      <section className="mx-auto max-w-maxContent px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
          Get in Touch
        </h2>

        <p className="text-richblack-300 text-center mb-10">
          We'd love to hear from you. Please fill out this form.
        </p>

        <form className="max-w-xl mx-auto space-y-4 bg-[#020617]" >

          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4 bg-[#020617]">
            <input
              type="text"
              className="w-full p-3 rounded-md text-black placeholder-gray-400 caret-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="First Name"
            />
            <input
              type="text"
              className="w-full p-3 rounded-md bg-richblack-900 text-black placeholder-gray-400 caret-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            className="w-full p-3 rounded-md bg-richblack-800 text-black placeholder-gray-400 caret-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Email Address"
          />

          {/* Phone */}
          <div className="flex gap-2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ">
            <CountryDropdown
              value={countryCode}
              onChange={setCountryCode}
            />

          <input
            type="tel"
            className="w-full p-3 rounded-md bg-richblack-800 text-black placeholder-gray-400 caret-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Phone Number"
          />
          
</div>
          {/* Message */}
          <textarea
            rows="4"
            className="w-full p-3 rounded-md bg-richblack-900 text-black placeholder-gray-400 caret-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            placeholder="Message"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-50 text-black py-3 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-200"
          >
            Send Message
          </button>

        </form>
      </section>

    </div>
  );
};
export default About;
