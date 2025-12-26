import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";
import Footer from "./components/core/HomePage/Footer";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-screen min-h-screen bg-richblack-600 flex flex-col font-inter">
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route 
          path="/forgot-password" element={<ForgotPassword />} />

          <Route 
          path="/contact" element={<Contact />} />
          <Route
            path="/update-password/:token"
            element={<UpdatePassword />}
          />
          <Route 
          path="/verify-email" element={<VerifyEmail />} />

          <Route
           path="/about" element={<About />} />


        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
