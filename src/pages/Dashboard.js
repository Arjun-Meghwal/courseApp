import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading...
      </div>
    )
  }


return (
  <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white overflow-x-hidden">

    <div className="md:border-r border-white/10 bg-white/5 backdrop-blur-lg">
      <Sidebar />
    </div>

    <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-5 md:p-6 shadow-xl min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)]">
        <Outlet />
      </div>
    </div>

  </div>
)


}

export default Dashboard