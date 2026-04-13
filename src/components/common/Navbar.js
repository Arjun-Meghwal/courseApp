import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { categories } from "../../services/apis";
import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  //  Fetch categories
  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        );
        setSubLinks(res?.data?.data || []);
      } catch (e) {
        console.log("Category fetch error", e);
      }
    };
    fetchSublinks();
  }, []);

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname);

  return (
    <div className="sticky top-0 z-[1000] flex h-16 items-center justify-center text-white 
    bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617] 
    border-b border-white/10 backdrop-blur-md">

      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            width={160}
            alt="Study Notion"
            className="hover:scale-110 transition duration-300"
          />
        </Link>

        {/* NAV LINKS */}
        <nav>
          <ul className="flex gap-x-8 text-[15px] font-medium">

            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">

                {link.title === "Catalog" ? (
                  <div className="group flex items-center gap-1 cursor-pointer">

                    <span className="hover:text-yellow-400 transition">
                      Catalog
                    </span>

                    <IoIosArrowDropdown className="group-hover:rotate-180 transition" />

                    {/*  DROPDOWN FIXED */}
                    <div className="invisible absolute left-1/2 top-[120%] 
                      z-[10] w-[220px] -translate-x-1/2 rounded-xl 
                      bg-richblack-800 shadow-xl p-4 opacity-0 
                      transition-all duration-200 
                      group-hover:visible group-hover:opacity-100">

                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={i}
                          >
                            <p className="text-white hover:text-yellow-400 py-1">
                              {subLink.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}

                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <span
                      className={`${matchRoute(link.path)
                          ? "text-yellow-400"
                          : ""
                        } hover:text-yellow-400 transition`}
                    >
                      {link.title}
                    </span>
                  </Link>
                )}

              </li>
            ))}

          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-x-5">

          {/* 🛒 CART */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative group">
              <AiOutlineShoppingCart className="text-2xl hover:text-yellow-400 transition" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 
                  items-center justify-center rounded-full bg-yellow-400 
                  text-xs font-bold text-black animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* AUTH / PROFILE */}
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-1 border border-richblack-600 rounded-md hover:border-yellow-400 hover:text-yellow-400 transition">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-4 py-1 bg-yellow-400 text-black rounded-md hover:scale-95 transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <div className="relative group">

              {/*  PROFILE IMAGE */}
              <img
                src={
                  user?.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
                }
                alt="profile"
                className="h-9 w-9 rounded-full cursor-pointer border border-richblack-600 hover:border-yellow-400 transition"
              />

              {/*  DROPDOWN */}
              <div className="invisible absolute right-0 top-[120%] 
                z-[20] w-[170px] rounded-xl bg-richblack-800 shadow-xl 
                p-2 opacity-0 transition-all duration-200 
                group-hover:visible group-hover:opacity-100">

                <Link
                  to="/dashboard/my-profile"
                  className="block px-3 py-2 rounded text-sm hover:bg-richblack-700"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-3 py-2 rounded text-sm hover:bg-richblack-700"
                >
                  Logout
                </button>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;