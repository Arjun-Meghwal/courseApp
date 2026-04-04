import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from './CourseForm/CourseInformationForm';
// import courseBuilder from './CourseBuilder/courseBuilder';
import CourseBuilder from './CourseBuilder/courseBuilder';
import PublishCourseForm from './PublishCourse/PublishCourseForm';
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information"
    },
     {
      id: 2,
      title: "course builder"
    }
  ];

  return (
    <>
    <div>
      {steps.map((item) => (
        <>
        <div>
        <div
          key={item.id}
          className={`${step === item.id
              ? "bg-yellow-900 border-yellow-50 text-yellow-50"
              : "border-richblack-700 bg-richblack-800 text-richblack-300"
            }`}
        >
          {
                step > item.id ? (<FaCheck />):(item.id)
          }
          </div>
        </div>
        {
          // add desh
          // item.id!=step
        }
        </>
      ))}
    </div>
    <div>
      {steps.map((item)=>{
        <>
        <div>
          <p>{item.title}</p>
        </div>
        </>
      })}
    </div>
    {step===1 && <CourseInformationForm/>}
    {step === 1 && <CourseBuilder />}
    {step === 1 && <PublishCourseForm />}
    </>
  );
};

export default RenderSteps;
