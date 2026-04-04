import React from 'react'

const Course_card = (course,Height) => {

  const [avgReviewCount,setAvgReviewCount]=useState(0);

  useEffect(()=>{
    const count=GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  },[course])
  return (
    <div>
      <Link to={`course/${course._id}`}>
        <div>
          <div>
            <img
            src={course?.thumbnail}
            alt='course ka thumbnail'
            className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div>
            <p>{course?.courseNAme}</p>
            <p>{course?.instructor?.firstName}{course?.instructor?.lastName}</p>

            <div>
              <span>{avgReviewCount ||0}</span>
              <RatingStars Review_Count={avgReviewCount}/>
              <span>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_card
