import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Hitarth Sharma",
    course: "My Course",
    review: "Badhiya course",
    rating: 5,
    initials: "HS",
    color: "bg-red-500",
  },
  {
    name: "Harsh Sindhu",
    course: "My Course",
    review: "Aage badhne ke liye best",
    rating: 5,
    initials: "HS",
    color: "bg-blue-500",
  },
  {
    name: "Eleanor Pena",
    course: "Testing Course",
    review: "Nice Course",
    rating: 5,
    initials: "EP",
    color: "bg-pink-500",
  },
  {
    name: "Kristin Watson",
    course: "Learn Next.js",
    review: "From zero to hero ❤️",
    rating: 5,
    initials: "KW",
    color: "bg-orange-500",
  },
];

const ReviewsSection = () => {
  return (
    <div className="mt-24 text-center">

      {/* Heading */}
      <h2 className="text-4xl font-semibold text-white mb-14">
        Reviews from other learners
      </h2>

      {/* Reviews */}
      <div className="flex gap-6 justify-center flex-wrap">

        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-richblack-800 p-6 rounded-xl w-[280px]
              border border-richblack-700"
          >
            {/* User */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center
                  text-white font-bold ${item.color}`}
              >
                {item.initials}
              </div>

              <div className="text-left">
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-sm text-richblack-400">{item.course}</p>
              </div>
            </div>

            {/* Review */}
            <p className="text-richblack-300 text-sm mb-4 text-left">
              {item.review}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-semibold">
                {item.rating}.0
              </span>

              <div className="flex gap-1 text-yellow-400">
                {Array(item.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ReviewsSection;
