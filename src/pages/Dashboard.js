import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Slide } from 'react-toastify';
import Sidebar from '../components/core/dashboard.js/Sidebar';
const Dashboard = () => {
  const {loading: authLoading}=useSelector((state)=>state.auth);
  const {loading:profileLoading}=useSelector((state)=>state.profile);
  if(profileLoading||authLoading){
    return(
      <div>loading</div>
    )
  }
  return (
    <div>
      <Sidebar/>
      <div>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
