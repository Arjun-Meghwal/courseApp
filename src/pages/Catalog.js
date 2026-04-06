import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/courseDetailsApi";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_card"
import Footer from "../components/core/HomePage/Footer";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);

      const category_id = res?.data?.data
        ?.filter(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]?._id;

      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div>
      <div>
        <p>
          {"Home/Catalog/"}
          <span>
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section 1 */}
        <div>
          <div>course to get you started</div>
          <div>
            <p>most popular</p>
            <p>new</p>
          </div>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* section 2 */}
        <div>
          <div>
            top courses in{" "}
            {catalogPageData?.data?.selectedCategory?.name}
          </div>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>frequently bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <Course_Card
                    course={course}
                    key={index}
                    Height={"h-[400px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;