import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-[220px] flex-col
      border-r border-richblack-700 bg-richblack-800 py-6">

      {/* DASHBOARD LINKS */}
      <div className="flex flex-col gap-1">
        {sidebarLinks.map((link) => {
          if (link.accountType && user?.accountType !== link.accountType)
            return null;

          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
            />
          );
        })}
      </div>

      {/* PUSH TO BOTTOM */}
      <div className="mt-auto">

        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col gap-1">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-left text-sm text-richblack-300 hover:bg-richblack-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmationModal && (
        <div className="  fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="border rounded-lg bg-richblack-900 p-6 text-white">
            <p className="text-lg font-semibold">{confirmationModal.text1}</p>
            <p className="mt-2 text-sm text-richblack-300">
              {confirmationModal.text2}
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={confirmationModal.btn1Handler}
                className="rounded bg-yellow-50 px-4 py-2 text-black"
              >
                {confirmationModal.btn1Text}
              </button>

              <button
                onClick={confirmationModal.btn2Handler}
                className="rounded bg-richblack-700 px-4 py-2"
              >
                {confirmationModal.btn2Text}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
