import React from "react";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white">
      <div className="max-w-maxContent mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ===== Company ===== */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              StudyNotion
            </h3>

            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Affiliates</li>
            </ul>

            <div className="flex gap-4 mt-4 text-xl">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* ===== Resources ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Articles</li>
              <li>Blog</li>
              <li>Chart Sheet</li>
              <li>Code challenges</li>
              <li>Docs</li>
              <li>Projects</li>
              <li>Videos</li>
              <li>Workspaces</li>
            </ul>
          </div>

          {/* ===== Plans & Community ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Plans
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>Paid memberships</li>
              <li>For students</li>
              <li>Business solutions</li>
            </ul>

            <h4 className="text-white font-semibold mb-4">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Forums</li>
              <li>Chapters</li>
              <li>Events</li>
            </ul>
          </div>

          {/* ===== Subjects ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Subjects
            </h4>
            <ul className="space-y-2 text-sm">
              <li>AI</li>
              <li>Cloud Computing</li>
              <li>Code Foundations</li>
              <li>Computer Science</li>
              <li>Cybersecurity</li>
              <li>Data Analytics</li>
              <li>Data Science</li>
              <li>Machine Learning</li>
              <li>Web Design</li>
            </ul>
          </div>

          {/* ===== Languages & Career ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Languages
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>HTML & CSS</li>
              <li>JavaScript</li>
              <li>Python</li>
              <li>Java</li>
              <li>C++</li>
              <li>SQL</li>
              <li>Swift</li>
            </ul>

            <h4 className="text-white font-semibold mb-4">
              Career building
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Career paths</li>
              <li>Interview prep</li>
              <li>Professional certification</li>
              <li>Full Catalog</li>
              <li>Beta Content</li>
            </ul>
          </div>

        </div>

        {/* ===== Bottom Line ===== */}
        <div className="border-t border-richblack-700 mt-10 pt-6 text-center text-sm">
          © 2025 StudyNotion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
