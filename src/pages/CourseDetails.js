import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsApi';
import GetAvgRating from '../utils/avgRating';
import Error from '../pages/Error';
import ConfirmationModel from '../components/common/ConfirmationModel';
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/course/CourseDetailsCard'
import { setCourse } from '../slices/courseSlice';

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModel, setConfirmationModel] = useState(null);

  useEffect(() => {
    console.log("COURSE DATA", courseData);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("RESULT => ", result);
        setCourseData(result);
      }
      catch (error) {
        console.log("could not fetch course details");
      }                          
    }
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.ratingAndReviews || []
    );
    console.log(
      "REVIEWS =>",
      courseData?.data?.ratingAndReviews
    );
    setAvgReviewCount(count);
  }, [courseData])

  const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    })
    setTotalNoOfLecture(lectures);
  }, [courseData])

  const [isActive, setIsActive] = useState([]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? [...isActive, id]
        : isActive.filter((e) => e !== id)
    )
  }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModel({
      text1: "you are not login",
      text2: "please login to purches course",
      btn1Text: "login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModel(null),
    })
  }

  if (loading || !courseData) {
    return (
      <div>
        loading..
      </div>
    )
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data || {};
  console.log("COURSE DATA", courseData);


return (
  <div className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white overflow-x-hidden">

    {/* HERO SECTION */}
    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">

        {/* LEFT SIDE */}
        <div className="lg:w-[65%] space-y-4">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">
            {courseName}
          </h1>

          <p className="text-richblack-300">
            {courseDescription}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-yellow-50 font-semibold">
              {avgReviewCount}
            </span>

            <RatingStars
              Review_Count={avgReviewCount}
              Star_Size={20}
            />

            <span className="text-richblack-300">
              ({ratingAndReviews?.length} Reviews)
            </span>

            <span className="text-richblack-300">
              {studentsEnrolled?.length} Students
            </span>
          </div>

          <p className="text-richblack-300">
            Created By{" "}
            <span className="text-yellow-50">
              {instructor?.firstName} {instructor?.lastName}
            </span>
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-6 text-sm text-richblack-300">
            <p>Created At {formatDate(createdAt)}</p>
            <p>English</p>
          </div>

        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-full lg:w-[350px] shrink-0">

          <CourseDetailsCard
            course={courseData?.data}
            setConfirmationModel={setConfirmationModel}
            handleBuyCourse={handleBuyCourse}
          />

        </div>

      </div>

    </div>

    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8 sm:py-10">

      <div className="border border-richblack-700 rounded-md p-4 sm:p-6">

        <h2 className="text-2xl sm:text-3xl font-semibold text-richblack-5 mb-4">
          What you'll learn
        </h2>

        <p className="text-richblack-300">
          {whatYouWillLearn}
        </p>

      </div>

    </div>

    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8 sm:py-10">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">

        <h2 className="text-2xl sm:text-3xl font-semibold text-richblack-5">
          Course Content
        </h2>

        <button
          onClick={() => setIsActive([])}
          className="text-yellow-50 text-sm text-left sm:text-right"
        >
          Collapse all sections
        </button>

      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-richblack-300 mb-5">

        <span>{courseContent?.length} Section(s)</span>

        <span>{totalNoOfLecture} Lecture(s)</span>

        <span>{courseData?.data?.totalDuration}</span>

      </div>

      <div className="border border-richblack-700 rounded-md overflow-hidden">

        {courseContent?.map((section) => (

          <div
            key={section._id}
            className="border-b border-richblack-700 last:border-b-0"
          >

            <div
              className="flex justify-between items-center bg-richblack-700 px-4 sm:px-5 py-4 cursor-pointer"
              onClick={() => handleActive(section._id)}
            >

              <div className="flex items-center gap-2">

                <span>
                  {isActive.includes(section._id) ? "⌄" : "›"}
                </span>

                <p className="text-richblack-5">
                  {section.sectionName}
                </p>

              </div>

              <p className="text-yellow-50 text-xs sm:text-sm">
                {section.subSection?.length} Lecture(s)
              </p>

            </div>

            {isActive.includes(section._id) && (

              <div className="bg-richblack-800">

                {section.subSection?.map((sub) => (

                  <div
                    key={sub._id}
                    onClick={() =>
                      navigate(
                        `/view-course/${courseId}/section/${ section._id }/sub-section/${ sub._id }`
                        // `/view-course/${courseId}/section/${ section._id }/sub-section/${ sub._id }`
                      )
                    }
                    className="px-4 sm:px-5 py-4 border-t border-richblack-700 text-richblack-300 break-words"
                  >

                    📖 {sub.title}

                  </div>

                ))}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

    {/* Author */}
    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8 sm:py-10">

      <h2 className="text-2xl sm:text-3xl font-semibold text-richblack-5 mb-5">
        Author
      </h2>

      <div className="flex items-center gap-3">

        <img
          src={instructor?.image}
          alt="author"
          className="h-10 w-10 rounded-full object-cover"
        />

        <p className="text-base sm:text-lg font-semibold text-richblack-5">
          {instructor?.firstName} {instructor?.lastName}
        </p>

      </div>

    </div>

    {/* Revillscrews */}
    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8 sm:py-10">

      <div className="w-full max-w-[650px] border border-richblack-700 rounded-md p-4 sm:p-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-richblack-5 mb-5">
          Reviews
        </h2>

        <div className="flex items-center gap-4 mb-8">

          <span className="text-4xl sm:text-5xl font-bold text-richblack-5">
            {avgReviewCount}
          </span>

          <div>

            <RatingStars
              Review_Count={avgReviewCount}
              Star_Size={18}
            />

            <p className="text-richblack-300 text-sm mt-1">
              ({ratingAndReviews?.length} Ratings)
            </p>

          </div>

        </div>

        <div>

          {ratingAndReviews?.map((review, index) => (

            <div
              key={review._id}
              className={`py-5 ${
    index !== ratingAndReviews.length - 1
      ? "border-b border-richblack-700"
      : ""
  } `}
            >

              <div className="flex items-start gap-3">

                <img
                  src={
                    review?.user?.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}`
                  }
alt = ""
className = "h-10 w-10 rounded-full object-cover"
  />

  <div className="min-w-0">

    <p className="font-semibold text-richblack-5 break-words">
      {review?.user?.firstName}{" "}
      {review?.user?.lastName}
    </p>

    <RatingStars
      Review_Count={review?.rating}
      Star_Size={14}
    />

    <p className="text-richblack-300 text-sm mt-2 break-words">
      {review?.review}
    </p>

  </div>

              </div >

            </div >

          ))}

        </div >

      </div >

    </div >

  { confirmationModel && (
    <ConfirmationModel modelData={confirmationModel} />
  )}

  </div >
)

}

export default CourseDetails