import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const {user}=useSelector((state)=>state.profile)
  const navigate=useNavigate();
  return (
    <div>
      <h1>My Profile</h1>

      <div>
        <div>
          <img 
          src='${user?.image}'
          alt={`profile-${user?.firstName}`}
          className='aspect-squere w-[78px] rounded-full object-cover'
          />
          <div>
            <p>{user?.firstName + " "+user?.lastName}</p>
            <p>{user?.email}</p>
        </div>
      </div>
      <IconBtn
      text="Edit"
      onClick={()=>{
        navigate("/dashboard/settings")
      }}/>
      </div> 
  
    // section 2
    <div>
      <div>
        <p>About</p>
        <IconBtn
        text="Edit"
        onClick={()=>{
          navigate("/dashboard/settings")
        }}/>
      </div>
      <p>{user?.additionalDetails?.about??"write something about yourself"}</p>
    </div>

    {/* section 3 */}
<div>
  <div>
    <p>
      personal details</p>
      <IconBtn
      text="Edit"
      onClick={()=>{
        navigate("/dashboard/settings")
        
      }}/>
      </div>
      <div>
        <div>
          <p>first name</p>
          <p>{user?.firstNamw}</p>
        </div>
          <div>
            <p> email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p>Gender </p>
            <p>{user?.additionalDetails?.gender}</p>
          </div>
          <div>
            <p>last name</p>
            <p>{user?.addionalDetails?.astName}</p>
          </div>
          <div>
            <p> Phone number</p>
            <p>{user?.addionalDetails?.phoneNumber}</p>
          </div>
          <div>
            <p>date of birth </p>
            <p>{user?.addionalDetails?.firstNamw}</p>
          </div>
      </div>
      </div> 

    </div>  
  )
}

export default MyProfile
