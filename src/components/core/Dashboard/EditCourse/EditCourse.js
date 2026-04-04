import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';

const EditCourse = () => {
  const disptch=useDispatch();
  const {course}=useParams();
  const {loading,setLoading}=useSelector((state)=>state.course);
  const {token}=useSelctor((state)=>state.auth);

  useEffect(()=>{
    const populateCourseDetails=async()=>{
      seLoading(true);
      const result=await getFullDEtailsCourse(courseId,token);
      if(result?.courseDetails){
        dispatchEvent(setEditCourse(true));
        dipatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    }
    populateCourseDetails();
  })
  if(loadinf){
    return (
      <div>
      loadinf..
      </div>
    )
  }
  return (
    <div>
      <h1>edit course</h1>
      <div>
        {
          course ? (<RenderSteps/>) :(<p>Course not found</p>)
        }
      </div>
      
    </div>
  )
}

export default EditCourse
