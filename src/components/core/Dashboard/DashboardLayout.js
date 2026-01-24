import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className=" bg-[#020617] text-white relative flex min-h-[calc(100vh-3.5rem)]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto bg-richblack-900 p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
