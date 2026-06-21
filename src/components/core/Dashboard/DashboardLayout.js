import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div
      className="
      bg-[#020617] text-white
      min-h-[calc(100vh-3.5rem)]
      flex flex-col md:flex-row
      "
    >
      {/* SIDEBAR */}
      <div
        className="
        w-full md:w-auto
        border-b md:border-b-0
        border-richblack-700
        "
      >
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
        flex-1
        overflow-x-hidden
        overflow-y-auto
        p-4 sm:p-6 md:p-8
        bg-richblack-900
        "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;