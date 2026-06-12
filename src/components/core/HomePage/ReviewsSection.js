
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../../services/apiconnector";
import { ratingsEndpoints } from "../../../services/apis"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        console.log(response.data.data);

        setReviews(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);
  const sliderData = [...reviews, ...reviews, ...reviews];
  return (
    <div className="mt-24 text-center w-11/12 mx-auto">
      <h2 className="text-4xl font-semibold text-white mb-14">
        Reviews from other learners
      </h2>

      {sliderData.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {sliderData.map((item, index) => (
            <SwiperSlide key={`${item._id}-${index}`}>
              <div
                className="
                bg-richblack-800
                p-6
                rounded-xl
                border
                border-richblack-700
                min-h-[220px]
                text-left
              "
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.user?.image}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-white font-semibold">
                      {item.user?.firstName} {item.user?.lastName}
                    </p>

                    <p className="text-sm text-richblack-400">
                      {item.course?.courseName}
                    </p>
                  </div>
                </div>

                <p className="text-richblack-300 text-sm mb-6">
                  {item.review}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">
                    {item.rating}.0
                  </span>

                  <div className="flex gap-1 text-yellow-400">
                    {Array(Math.max(1, Math.floor(item.rating)))
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewsSection;
