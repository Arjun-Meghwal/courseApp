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
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import DashboardLayout from "./components/core/Dashboard/DashboardLayout";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/accountType";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import MyCourses from "./components/core/Dashboard/MyCourses/Mycourses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-screen min-h-screen bg-richblack-600 flex flex-col font-inter">
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="catalog" element={<Catalog />} />

          <Route path="courses/:courseId" element={<CourseDetails />} />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />

          {/* Dashboard */}
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

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="cart" element={<Cart />} />
                <Route
                  path="enrolled-courses"
                  element={<EnrolledCourse />}
                />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="add-course" element={<AddCourse />} />
                <Route path="my-course" element={<MyCourses />} />
                <Route
                  path="edit-course/:courseID"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          {/* View Course (FIXED inside Routes) */}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            )}
          </Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;