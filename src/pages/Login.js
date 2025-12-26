import React from "react";
import Templates from "../components/core/Auth/Templates";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Templates
        title="Welcome Back"
        desc1="Build skills for today"
        desc2="and tomorrow"
        formtype="Login"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};
export default Login