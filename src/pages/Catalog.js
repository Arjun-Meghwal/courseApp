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
      className="absolute left-1/2 top-full mt-3 z-[9999]
      -translate-x-1/2 w-72 rounded-xl bg-white shadow-xl border"
    >
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />

      <ul className="py-3">
        {catalogData.map((item, index) => (
          <li key={index}>
            <Link
              to={`/catalog/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
