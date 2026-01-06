import React from "react";
import { Link } from "react-router-dom";

const catalogData = [
  "Python",
  "Web Development",
  "Android Development",
  "Blockchain",
  "Artificial Intelligence",
  "Data Science",
  "Cloud Computing",
  "DevOps",
  "CyberSecurity",
];

const Catalog = () => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                 w-64 rounded-xl bg-richblack-5
                 shadow-xl border border-richblack-200
                 z-50"
    >
      {/* Arrow */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2
                   w-4 h-4 bg-richblack-5 rotate-45
                   border-l border-t border-richblack-200"
      />

      {/* List */}
      <ul className="py-3">
        {catalogData.map((item, index) => (
          <li key={index}>
            <Link
              to={`/catalog/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block px-5 py-2 text-sm text-richblack-700
                         hover:bg-richblack-50 hover:text-richblack-900
                         transition"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
