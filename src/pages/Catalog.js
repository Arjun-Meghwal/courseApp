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
      className="absolute left-1/2 top-full mt-4 z-[9999]
      -translate-x-1/2 w-72 rounded-2xl 
      bg-white/5 backdrop-blur-xl 
      border border-white/10 
      shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
    >

      {/* ARROW */}
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white/5 border-l border-t border-white/10 backdrop-blur-xl" />

      {/* LIST */}
      <ul className="py-3">
        {catalogData.map((item, index) => (
          <li key={index}>
            <Link
              to={`/catalog/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block px-5 py-3 text-sm text-white/80 
              hover:bg-white/10 hover:text-yellow-400 
              transition-all duration-200"
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