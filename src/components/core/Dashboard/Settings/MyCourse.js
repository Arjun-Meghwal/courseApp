import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn';

const MyCourse = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const[courses,srtCourse]=useState([]);

  useEffect(()=>{
    const fetchCourse=async()=>{
    const result=await fetchInstructorCourse(token);
    if(result){
      setCourse(result);
    }
    }
    fetchCourse();
  },[])
  return (
    <div>
      <div>
        <h1>My course</h1>
        <IconBtn
        text='Add Course'
        onClick={()=>navigate("/dashboard/add-course")}
        //todo icon add
        />
      </div>
      {courses && <CoursesTable courses={courses}setCourses={setCourses}/>}
      
    </div>
  )
}

export default MyCourse
