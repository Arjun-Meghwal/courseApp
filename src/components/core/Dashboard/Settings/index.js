import UpdatePassword from "../../../../pages/UpdatePassword";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-white">

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>

      {/* Change profile picture */}
      <ChangeProfilePicture />

      {/* Edit profile details */}
      <EditProfile />

      {/* Change password */}
      <UpdatePassword />

      {/* Delete account */}
      <DeleteAccount />

    </div>
  );
}
