import React from 'react'
// import Swiper from 'swiper'
// install npm swiper

import{ Swiper,SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode,Pagin} from 'swiper'

import Course_card from './Course_card'


const CourseSlider = ({courses}) => {
  return (
    <div>
      {
        courses?.length?(
          <Swiper
          slidesPerview={1}
          loop={true}
          spaceBetween={50}
          pagination={true}
          modules={[pagination]}
          >
            {
            Courses?.map((course,index)=>(
              <SwiperSlide key={index}>
                <Course_card course={course} Height={"h-[250px]"}/>
              </SwiperSlide>
            ))
          }
          </Swiper>
        )
        :(
          <p>No course found</p>
        )
      }
      
    </div>
  )
}

export default CourseSlider
