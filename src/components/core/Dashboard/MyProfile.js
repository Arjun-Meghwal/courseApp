import React from "react";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] min-h-screen py-6 sm:py-10 text-white">
      <div className="mx-auto w-11/12 max-w-[1000px]">

        <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-medium">
          My Profile
        </h1>

        <div className="flex flex-col gap-6 sm:gap-8">

          {/* SECTION 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-md bg-richblack-800 p-4 sm:p-6 border">

            <div className="flex items-center gap-4">
              <img
                src={
                  user?.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
                }
className = "aspect-square w-[60px] sm:w-[78px] rounded-full object-cover bg-richblack-700"
alt = "profile"
  />

  <div className="break-all">
    <p className="text-base sm:text-lg font-semibold">
      {user?.firstName} {user?.lastName}
    </p>

    <p className="text-xs sm:text-sm text-richblack-300">
      {user?.email}
    </p>
  </div>
            </div >

  <IconBtn
    text="Edit"
    onClick={() => navigate("/dashboard/settings")}
  />
          </div >

  {/* SECTION 2 */ }
  < div className = "border rounded-md bg-richblack-800 p-4 sm:p-6" >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-lg font-semibold">About</p>

              <IconBtn
                text="Edit"
                onClick={() => navigate("/dashboard/settings")}
              />
            </div>

            <p className="mt-3 text-sm sm:text-base text-richblack-300">
              {user?.additionalDetails?.about ||
                "Write something about yourself"}
            </p>

          </div >

  {/* SECTION 3 */ }
  < div className = "border rounded-md bg-richblack-800 p-4 sm:p-6" >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-lg font-semibold">
                Personal Details
              </p>

              <IconBtn
                text="Edit"
                onClick={() => navigate("/dashboard/settings")}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">

              <div>
                <p className="text-richblack-400">First Name</p>
                <p>{user?.firstName}</p>
              </div>

              <div>
                <p className="text-richblack-400">Last Name</p>
                <p>{user?.lastName}</p>
              </div>

              <div>
                <p className="text-richblack-400">Email</p>
                <p className="break-all">{user?.email}</p>
              </div>

              <div>
                <p className="text-richblack-400">Gender</p>
                <p>
                  {user?.additionalDetails?.gender || "Add Gender"}
                </p>
              </div>

              <div>
                <p className="text-richblack-400">Phone Number</p>
                <p>
                  {user?.additionalDetails?.contactNumber ||
                    "Add Phone Number"}
                </p>
              </div>

              <div>
                <p className="text-richblack-400">Date of Birth</p>
                <p>
                  {user?.additionalDetails?.dateOfBirth || "Add DOB"}
                </p>
              </div>

            </div>
          </div >

        </div >
      </div >
    </div >
  );
};

export default MyProfile;

