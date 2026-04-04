import React from "react";
import Templates from "../components/core/Auth/Templates";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] px-4 text-white">

      <div className="w-full max-w-5xl 
      bg-white/5 backdrop-blur-xl 
      border border-white/10 
      rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] 
      p-6 md:p-10">

        <Templates
          title="Welcome Back"
          desc1="Build skills for today"
          desc2="and tomorrow"
          formtype="Login"
          setIsLoggedIn={setIsLoggedIn}
        />

      </div>

    </div>
  );
};

export default Login;