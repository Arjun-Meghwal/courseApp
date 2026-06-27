import React from "react";

const CourseRecommendationModal = ({
  recommendations,
  setShowRecommendation,
}) => {

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center p-4">

      <div className="w-full max-w-xl rounded-xl bg-richblack-800 p-6 border border-richblack-600">

        <h2 className="text-3xl font-bold text-yellow-50 mb-2">
          🎉 Course Completed
        </h2>

        <p className="text-richblack-200 mb-6">
          Recommended Next Courses
        </p>

        <div className="space-y-3">

          {recommendations.map(
            (course, index) => (
              <div
                key={index}
                className="rounded-lg bg-richblack-700 p-4 text-white"
              >
                {course}
              </div>
            )
          )}

        </div>

        <button
          onClick={() =>
            setShowRecommendation(false)
          }
          className="mt-6 bg-yellow-50 text-black px-5 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default CourseRecommendationModal;