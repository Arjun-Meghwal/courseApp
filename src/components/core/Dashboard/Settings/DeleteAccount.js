import React from "react";

const DeleteAccount = () => {
  return (
    <div className="mt-10 rounded-md border border-pink-700 bg-pink-900/20 p-6">
      <h2 className="text-lg font-semibold text-pink-200">
        Delete Account
      </h2>

      <p className="mt-2 text-sm text-pink-300">
        This action is permanent. Once you delete your account, all data will be removed.
      </p>

      <button
        className="mt-4 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white"
        onClick={() => alert("Delete account API later")}
      >
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
