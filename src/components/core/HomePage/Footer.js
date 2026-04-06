import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

  const footerData = [
    {
      title: "Company",
      links: ["About", "Careers", "Affiliates"],
    },
    {
      title: "Resources",
      links: ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"],
    },
    {
      title: "Plans",
      links: ["Paid Memberships", "For Students", "Business Solutions"],
    },
    {
      title: "Community",
      links: ["Forums", "Chapters", "Events"],
    },
    {
      title: "Subjects",
      links: ["AI", "Cloud Computing", "Cybersecurity", "Data Science", "Machine Learning", "Web Design"],
    },
    {
      title: "Languages",
      links: ["HTML & CSS", "JavaScript", "Python", "Java", "C++", "SQL"],
    },
  ];

  const bottomLinks = ["Privacy Policy", "Terms", "Cookie Policy"];

  return (
    <footer className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white">

      <div className="max-w-maxContent mx-auto px-6 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">

          {/* LOGO + SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-4">StudyNotion</h3>

            <ul className="space-y-2 text-sm text-richblack-300">
              {footerData[0].links.map((item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item.split(" ").join("-").toLowerCase()}`}
                    className="hover:text-yellow-400 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-5 text-lg">
              <a href="#"><FaFacebook className="hover:text-yellow-400" /></a>
              <a href="#"><FaGoogle className="hover:text-yellow-400" /></a>
              <a href="#"><FaTwitter className="hover:text-yellow-400" /></a>
              <a href="#"><FaYoutube className="hover:text-yellow-400" /></a>
            </div>
          </div>

          {/* OTHER SECTIONS */}
          {footerData.slice(1).map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>

              <ul className="space-y-2 text-sm text-richblack-300">
                {section.links.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/${item.split(" ").join("-").toLowerCase()}`}
                      className="hover:text-yellow-400 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-richblack-300 gap-3">

          <div className="flex gap-4">
            {bottomLinks.map((item, i) => (
              <Link
                key={i}
                to={`/${item.split(" ").join("-").toLowerCase()}`}
                className="hover:text-yellow-400 transition"
              >
                {item}
              </Link>
            ))}
          </div>

          <div>
            © {new Date().getFullYear()} StudyNotion. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;