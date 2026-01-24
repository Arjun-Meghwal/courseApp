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
import Catalog from "./pages/Catalog";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute"; 
import DashboardLayout from "./components/core/Dashboard/DashboardLayout";
import Settings from "./components/core/Dashboard/Settings";

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



          <Route path="catalog"
           element={<Catalog />} />

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


<Route
element={
  <privateRoute>
                <Dashboard />
  </privateRoute>
}
/>   
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
