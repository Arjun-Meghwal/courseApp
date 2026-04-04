import React from "react";
import CountryDropdown from "../components/common/CountryDropdown";
import { useState } from "react";

const stats = [
  { value: "5K+", label: "Active Students" },
  { value: "10+", label: "Mentors" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Awards" },
];

const About = () => {
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <div className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white">

      {/* HERO */}
      <section className="mx-auto max-w-maxContent px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Driving Innovation in Online Education for a{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Brighter Future
          </span>
        </h1>

        <p className="mt-6 text-richblack-300 max-w-3xl mx-auto text-lg">
          Studynotion is at the forefront of driving innovation in online
          education. We’re passionate about creating a brighter future by
          offering cutting-edge courses, leveraging engaging technologies,
          and nurturing a vibrant learning community.
        </p>
      </section>

      {/* IMAGES */}
      <section className="flex flex-col md:flex-row gap-6 justify-center px-4">
        <img
          src="https://images.pexels.com/photos/7092364/pexels-photo-7092364.jpeg"
          alt="Learning online"
          className="rounded-xl object-cover w-full md:w-[30%] shadow-lg hover:scale-105 transition duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
          alt="Student studying"
          className="rounded-xl object-cover w-full md:w-[30%] shadow-lg hover:scale-105 transition duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Writing notes"
          className="rounded-xl object-cover w-full md:w-[30%] shadow-lg hover:scale-105 transition duration-300"
        />
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-maxContent px-4 py-20 text-center">
        <p className="text-2xl font-medium leading-relaxed">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <span className="text-blue-300">combines technology</span>,{" "}
          <span className="text-yellow-400">expertise</span>, and{" "}
          <span className="text-orange-300">community</span> to create an{" "}
          <span className="text-yellow-400">
            unparalleled educational experience
          </span>.
        </p>
      </section>

      {/* FOUNDING */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
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
          className="rounded-xl shadow-[0_0_40px_rgba(255,100,100,0.2)] hover:scale-105 transition duration-300"
        />
      </section>

      {/* VISION + MISSION */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-16">
        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:scale-105 transition">
          <h2 className="text-3xl font-semibold text-orange-300 mb-4">
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

        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:scale-105 transition">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
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

      {/* STATS */}
      <section className="bg-richblack-800 py-14">
        <div className="mx-auto max-w-maxContent grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="hover:scale-105 transition">
              <h3 className="text-3xl font-bold text-richblack-5">
                {stat.value}
              </h3>
              <p className="text-richblack-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING */}
      <section className="mx-auto max-w-maxContent px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            World-Class Learning for{" "}
            <span className="text-blue-300">Anyone, Anywhere</span>
          </h2>

          <p className="text-richblack-300 mb-6">
            Studynotion partners with more than 275+ leading universities
            and companies to bring flexible, affordable, job-relevant
            online learning to individuals and organizations worldwide.
          </p>

          <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:scale-105 transition">
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
              className="bg-white/5 p-6 rounded-lg text-richblack-300 backdrop-blur-md border border-white/10 hover:scale-105 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-maxContent px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
          Get in Touch
        </h2>

        <p className="text-richblack-300 text-center mb-10">
          We'd love to hear from you. Please fill out this form.
        </p>

        <form className="max-w-xl mx-auto space-y-4 bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="input-modern"
              placeholder="First Name"
            />
            <input
              type="text"
              className="input-modern"
              placeholder="Last Name"
            />
          </div>

          <input
            type="email"
            className="input-modern"
            placeholder="Email Address"
          />

          <div className="flex gap-2">
            <CountryDropdown value={countryCode} onChange={setCountryCode} />
            <input
              type="tel"
              className="input-modern"
              placeholder="Phone Number"
            />
          </div>

          <textarea
            rows="4"
            className="input-modern resize-none"
            placeholder="Message"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
};

export default About; 