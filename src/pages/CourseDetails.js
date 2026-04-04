import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsApi';
import GetAvgRating from '../utils/avgRatting';
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
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
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
    const count = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData])

  const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.CourseDetails?.courseContent?.forEach((sec) => {
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
    courseDescripation,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data?.CourseDetails;

  return (
    <div className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white min-h-screen">

      <div className="max-w-maxContent mx-auto px-6 py-10">

        <div className="space-y-4">

          <p className="text-4xl font-bold">{courseName}</p>

          <p className="text-richblack-300 max-w-[700px]">
            {courseDescripation}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-yellow-400 font-semibold">
              {avgReviewCount}
            </span>

            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />

            <span className="text-richblack-300">
              ({ratingAndReviews?.length} review)
            </span>

            <span className="text-richblack-300">
              ({studentsEnrolled?.length} student enrolled)
            </span>
          </div>

          <div>
            <p className="text-richblack-300">
              Created by{" "}
              <span className="text-yellow-400">
                {instructor?.firstName}
              </span>
            </p>
          </div>

          <div className="flex gap-6 text-sm text-richblack-300">
            <p>created At {formatDate(createdAt)}</p>
            <p>English</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-xl">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModel={setConfirmationModel}
              handleBuyCourse={handleBuyCourse}
            />
          </div>

        </div>

      </div>

      <div className="max-w-maxContent mx-auto px-6 py-10">
        <p className="text-2xl font-semibold mb-4 capitalize">
          what you will learn
        </p>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-richblack-300 leading-relaxed">
          {whatYouWillLearn}
        </div>
      </div>

      <div className="max-w-maxContent mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold capitalize">
            course content :
          </p>

          <button
            onClick={() => setIsActive([])}
            className="text-yellow-400 hover:underline text-sm"
          >
            collapse all sections
          </button>
        </div>

        <div className="flex gap-x-6 text-sm text-richblack-300 mb-6 flex-wrap">
          <span>{courseContent.length} sections</span>
          <span>{totalNoOfLecture} lectures</span>
          <span>{courseData.data?.totalDuration}</span>
        </div>

        <div className="space-y-4">
          {courseContent?.map((section, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
            >
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => handleActive(section._id)}
              >
                <p>{section.sectionName}</p>
                <span>
                  {isActive.includes(section._id) ? "-" : "+"}
                </span>
              </div>

              {isActive.includes(section._id) && (
                <div className="mt-3 text-richblack-300 text-sm space-y-1">
                  {section.subSection?.map((sub, i) => (
                    <p key={i}>
                      • {sub.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {confirmationModel && <ConfirmationModel modelData={confirmationModel} />}

    </div>
  )
}

export default CourseDetails