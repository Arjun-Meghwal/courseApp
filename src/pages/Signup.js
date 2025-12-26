import React from "react";
import Templates from "../components/core/Auth/Templates";

const Signup = ({ setIsLoggedIn }) => {
  return (
    <div className="min-h-screen bg-[#020617]  flex items-center justify-center">
      <Templates
        title="Create Account"
        desc1="Start learning"
        desc2="with us today"
        formtype="Signup"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};


export default Signup;
