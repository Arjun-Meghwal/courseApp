import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/courseDetailsApi";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_card from "../components/core/Catalog/Course_card"
import Footer from "../components/core/HomePage/Footer";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Api url for categories", categories.CATEGORIES_API);
      console.log("response from categories api", res);
      console.log("categories in catalog page", res.data.data);
      console.log("catalog name", catalogName);
      const category_id = res?.data?.data
        ?.filter(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            decodeURIComponent(catalogName).toLowerCase()
        )[0]?._id;
        console.log("category id", category_id);
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("catalog page data", res);
        setCatalogPageData(res);
        console.log("catalog page data", catalogPageData);
        console.log("category id", categoryId);
      } catch (error) {
        console.log(error);
      }
    };
 
    if  (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className=" bg-[#020617] text-white">
      {/* Hero Section */}
      <div className="bg-richblack-800 px-6 lg:px-20 py-10">

        <p className="text-sm text-richblack-300">
          {"Home/Catalog/"}
          <span className="text-yellow-50">
            {/* {catalogPageData?.data?.selectedCategory?.name} */}
            {catalogName}
          </span>
        </p>

        <h1 className="text-4xl font-bold mt-4">
          {/* {catalogPageData?.data?.selectedCategory?.name} */}
          {catalogName}
        </h1>

        <p className="text-richblack-300 mt-4 max-w-[700px]">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      {/* Content */}
      <div className="w-11/12 max-w-maxContent mx-auto py-12">

        {/* Section 1 */}
        <div>
          <div className="text-3xl font-semibold mb-5">
            Courses to get you started
          </div>

          <div className="flex gap-6 border-b border-richblack-700 mb-10">
            <p className="text-yellow-50 border-b border-yellow-50 pb-2 cursor-pointer">
              Most Popular
            </p>

            <p className="text-richblack-300 pb-2 cursor-pointer">
              New
            </p>

          </div>

          <CourseSlider
            Courses={catalogPageData?.data?.selectedCourses||[]}
          />
        </div>

        {/* Section 2 */}
        <div className="mt-16">

          <h2 className="text-3xl font-semibold mb-8">
            Top Courses in{" "}
            {catalogPageData?.data?.selectedCategory?.name}
          </h2>

          <CourseSlider
            Courses={catalogPageData?.data?.differentCourses ||[]}
          />
        </div>

        {/* Section 3 */}
        <div className="mt-16">

          <h2 className="text-3xl font-semibold mb-8">
            Frequently Bought
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <Course_card 
                  key={index}
                  course={course}
                  Height={"h-[400px]"}
                />
              ))}
          </div>

        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Catalog;