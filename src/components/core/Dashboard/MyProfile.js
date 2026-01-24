import React from "react";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] py-10 text-white">
      <div className="mx-auto w-11/12 max-w-[1000px]">

        <h1 className="mb-8 text-3xl font-medium text-richblack-5">
          My Profile
        </h1>

        <div className="flex flex-col gap-8">

          {/* SECTION 1 */}
          <div className="flex items-center justify-between rounded-md bg-richblack-800 p-6 border">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
                }
                className="aspect-square w-[78px] rounded-full object-cover bg-richblack-700"
                alt="profile"
              />

              <div>
                <p className="text-lg font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-richblack-300">
                  {user?.email}
                </p>
              </div>
            </div>

            <IconBtn
              text="Edit"
              onClick={() => navigate("/dashboard/settings")}
            />
          </div>

          {/* SECTION 2 */}
          <div className=" border rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">About</p>
              <IconBtn
                text="Edit"
                onClick={() => navigate("/dashboard/settings")}
              />
            </div>

            <p className="mt-2 text-richblack-300">
              {user?.additionalDetails?.about ||
                "Write something about yourself"}
            </p>
          </div>

          {/* SECTION 3 */}
          <div className=" border rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Personal Details</p>
              <IconBtn
                text="Edit"
                onClick={() => navigate("/dashboard/settings")}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
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
                <p>{user?.email}</p>
              </div>

              <div>
                <p className="text-richblack-400">Gender</p>
                <p>{user?.additionalDetails?.gender || "Add Gender"}</p>
              </div>

              <div>
                <p className="text-richblack-400">Phone Number</p>
                <p>{user?.additionalDetails?.phoneNumber || "Add Phone Number"}</p>
              </div>

              <div>
                <p className="text-richblack-400">Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth || "Add DOB"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
