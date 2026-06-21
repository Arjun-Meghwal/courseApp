import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

import {
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard
} from 'swiper/modules'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

import Course_card from './Course_card'

const CourseSlider = ({ Courses }) => {

  return (

    <>
      {
        Courses?.length ? (


          <Swiper
            mousewheel={{
              enabled: true,
              forceToAxis: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            slidesPerView={1}
            loop={false}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            modules={[
              Pagination,
              Navigation,
              FreeMode,
              Mousewheel,
              Keyboard,
            ]}
            className="mySwiper py-4 sm:py-5"
            style={{
              "--swiper-navigation-size": "18px",
            }}
            freeMode={true}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {Courses?.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_card
                  course={course}
                  Height={"h-[200px] sm:h-[220px] lg:h-[250px]"}
                />
              </SwiperSlide>
            ))}
          </Swiper>



        ) : (


          <div className="flex gap-4 overflow-hidden">

            {[1, 2, 3].map((_, index) => (
              <SkeletonTheme
                key={index}
                baseColor="#2C333F"
                highlightColor="#161D29"
              >
                <div>

                  <Skeleton className="h-[200px] sm:h-[250px] w-[250px] sm:w-[300px] rounded-xl" />

                  <Skeleton className="h-[20px] w-[180px] sm:w-[200px] mt-3 rounded-md" />

                  <Skeleton className="h-[20px] w-[120px] sm:w-[150px] mt-2 rounded-md" />

                  <Skeleton className="h-[20px] w-[80px] sm:w-[100px] mt-2 rounded-md" />

                </div>
              </SkeletonTheme>
            ))}

          </div>



        )
      }
    </>
  )
}

export default CourseSlider