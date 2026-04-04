import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Table,Tbody,Thead,Tr} from 'react-super-responsive-table'
import {COURSE_STATUS} from '../../../../utils/constant';
import confirmationModel from '../../../common/ConfirmationModel'
import {deleteCourse ,fetchInstructorCourse }from '../../../../services/operations/courseDetailsApi'
import { setCourses } from '../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
const CourseTable = (courses,setCourses) => {
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const [confirmationModel,setConfirmationModel]=useSate(null);
  const naviagte=useNavigate();
  const handleCourseDelete=async(courseId)=>{
    setLoading(true);
    await deleteCourse({courseId:courseId},token);
      const result =await fetchInstructorCourse(token);
      if(result){
        setcourses(result);
      }
      setConfirmationModel(null);
      setLoading(false);
  }
    return (
    <div>
      <Table>
        <Thead>
          <Tr>
              <Th>
                courses
              </Th>
              <Th>
                Duration
              </Th>
              <Th>
                Price
              </Th>
              <Th>
                Action
              </Th>
          </Tr>
        </Thead>
      </Table>
      <Tbody>
        {
          course.length===0?(
            <Tr>
              <Td>
                No courses Found
              </Td>
            </Tr>
          )
          :(
            course?.map((course)=>(
              <Tr key={course._id}>
                <Td>
                  <img
                    src={course?.thumbnail}
                    className='h-[150px] w-[220px] rounded-lg object-cover'
                  />
                  <div className='flex flex-col'>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                    <p>created:{formattedDate}</p>
                    {
                      course.status===COURSE_STATUS.DRAFT ?(
                        <P className='text-red'>DRAFTED</P>
                      )
                      :(
                        <P className='text-yellow'>PUBLISHED</P>
                      )
                    }

                  </div>
                  </Td>  
              </Tr>
            ))
          )
        }
      </Tbody>
    </div>
  )
}

export default CourseTable
