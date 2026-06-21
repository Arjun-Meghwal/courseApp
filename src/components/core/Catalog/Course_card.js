import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const Course_card = ({ course, Height }) => {

  console.log("course in course card", course);
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {

    const count = GetAvgRating(course?.ratingAndReviews);

    setAvgReviewCount(count);

  }, [course]);

return (
  <Link to={`/courses/${course?._id}`}>

    <div className="bg-richblack-800 rounded-xl overflow-hidden h-full hover:scale-[1.02] transition-all duration-200">

      <div>
        <img
          src={course?.thumbnail}
          alt="course thumbnail"
          className={`${Height} w-full object-cover`}
        />
      </div>

      <div className="p-3 sm:p-4">

        <p className="text-base sm:text-lg font-semibold text-richblack-5 line-clamp-2">
          {course?.courseName}
        </p>

        <p className="text-richblack-300 text-xs sm:text-sm mt-1">
          {course?.instructor?.firstName}{" "}
          {course?.instructor?.lastName}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-2">

          <span className="text-yellow-50 font-semibold text-sm sm:text-base">
            {avgReviewCount || 0}
          </span>

          <RatingStars Review_Count={avgReviewCount} />

          <span className="text-richblack-300 text-xs sm:text-sm">
            {course?.ratingAndReviews?.length} Ratings
          </span>

        </div>

        <p className="text-yellow-50 font-bold text-lg sm:text-xl mt-3">
          Rs. {course?.price}
        </p>

      </div>

    </div>

  </Link>
);

}

export default Course_card