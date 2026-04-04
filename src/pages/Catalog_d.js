import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/core/HomePage/Footer'
import { useState } from 'react'
import {categories} from '../services/apis'
import { getCatlogPageData } from './pageAndComponentsData'
import Catalog from './Catalog'
import Course_card from '../components/core/Catalog/Course_card'
import CourseSlider   from '../components/core/Catalog/CourseSlider'
const Catalog_d = () => {

  const {catalogName}=useParams();
  const [catalogPageData,setCateLogPageData]=useState(null);
  const [categoryId,setCategoryId]=useState("");  

  // fetch all category
  useEffect(()=>{
    const getCategories=async()=>{
    const res=await apiConnector("GET",categories.CATEGORIES.API,);
    const categories_id=res?.data?.data?.filter((ct)=>ct.name.split("").join("-").toLowerCase()===catelogName)[0].API
    _id;
    setCategoryId(category_Id);
    }
    getCategories();
  },[catalogName])
  useEffect(()=>{
    const getCategoryDetails=async()=>{
      try{
        const res=await getCatlogPageData(categoryId);
        setCateLogPageData(res);
      }
      catch(error){
        console.log(error)
      }
    }
    getCategoryDetails();

  },[categoryId]);

  return (
    <div>
      <div>
        <p>{'Home/Catalog/'}
          <span>
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p>  {catalogPageData?.data?.selectedCategory?.name}</p>
        <p>  {catalogPageData?.data?.selectedCategory?.description}</p>
      </div>
      <div>
        {/* section 1 */}
        <div>
          <div>course to get you started </div>
          <div>
            <p>most popular</p>
            <p>new</p>
          </div>
          <div>
              <CourseSlider
              Course={catalogPageData?.data?.selectedCategory?.courses} />
              </div>
        </div>
        {/* section 2 */}
        <div>
          <div>top courses in   {catalogPageData?.data?.selectedCategory?.name}</div>
          <div>
            <courseSlider
              Course={catalogPageData?.data?.differentCategory?.courses} />
          </div>
        </div>
        {/* section 3 */}
        <div>
          <div>frequently bought </div>
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                .map((course,index)=>{
                  <Course_Card course={course}key={index} Height={"h-[400px]"}/>
                })
              }
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Catalog_d
