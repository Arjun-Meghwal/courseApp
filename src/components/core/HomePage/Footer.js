import React from "react";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white">

      <div className="max-w-maxContent mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div>
            <h3 className="text-lg font-semibold mb-4">
              StudyNotion
            </h3>

            <ul className="space-y-2 text-sm text-richblack-300">
              <li className="hover:text-yellow-400 cursor-pointer transition">About</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Careers</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Affiliates</li>
            </ul>

            <div className="flex gap-4 mt-5 text-lg">
              <FaFacebook className="cursor-pointer hover:text-yellow-400 transition" />
              <FaGoogle className="cursor-pointer hover:text-yellow-400 transition" />
              <FaTwitter className="cursor-pointer hover:text-yellow-400 transition" />
              <FaYoutube className="cursor-pointer hover:text-yellow-400 transition" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Resources
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300">
              <li className="hover:text-yellow-400 cursor-pointer transition">Articles</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Blog</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Chart Sheet</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Code challenges</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Docs</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Projects</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Videos</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Workspaces</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Plans
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300 mb-6">
              <li className="hover:text-yellow-400 cursor-pointer transition">Paid memberships</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">For students</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Business solutions</li>
            </ul>

            <h4 className="font-semibold mb-4">
              Community
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300">
              <li className="hover:text-yellow-400 cursor-pointer transition">Forums</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Chapters</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Events</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Subjects
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300">
              <li className="hover:text-yellow-400 cursor-pointer transition">AI</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Cloud Computing</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Code Foundations</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Computer Science</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Cybersecurity</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Data Analytics</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Data Science</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Machine Learning</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Web Design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Languages
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300 mb-6">
              <li className="hover:text-yellow-400 cursor-pointer transition">HTML & CSS</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">JavaScript</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Python</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Java</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">C++</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">SQL</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Swift</li>
            </ul>

            <h4 className="font-semibold mb-4">
              Career building
            </h4>

            <ul className="space-y-2 text-sm text-richblack-300">
              <li className="hover:text-yellow-400 cursor-pointer transition">Career paths</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Interview prep</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Professional certification</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Full Catalog</li>
              <li className="hover:text-yellow-400 cursor-pointer transition">Beta Content</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-richblack-300">
          © 2025 StudyNotion. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;