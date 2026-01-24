import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";

import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categoriesEndpoints } from "../../services/apis";
import { logout } from "../../services/operations/authAPI";
import Catalog from "../../pages/Catalog";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const res = await apiConnector(
          "GET",
          categoriesEndpoints.CATEGORIES_API
        );
        setSubLinks(res?.data?.data || []);
      } catch (e) {
        console.log("Category fetch error");
      }
    };
    fetchSublinks();
  }, []);

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname);

  return (
    <div className="sticky top-0 z-[1000] flex h-14 items-center justify-center border-b border-richblack-700 bg-[#020617] text-white">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img src={logo} width={160} alt="Logo" />
        </Link>

        {/* NAV LINKS */}
        <nav>
          <ul className="flex gap-x-6 text-sm text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">

                {link.title === "Catalog" ? (
                  <div className="group flex cursor-pointer items-center gap-1">
                    <span>Catalog</span>
                    <IoIosArrowDropdown />
                    <div className="invisible absolute left-1/2 top-[110%]
                      z-[10] w-[200px] -translate-x-1/2 rounded-md
                      bg-richblack-800 p-4 opacity-0 transition-all
                      duration-200 group-hover:visible group-hover:opacity-100">
                      <Catalog />
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <span
                      className={`${matchRoute(link.path)
                          ? "text-yellow-50"
                          : "text-richblack-25"
                        } hover:text-yellow-50`}
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
        <div className="flex items-center gap-x-4">

          {/* CART */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 px-3 py-1 text-sm">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md bg-yellow-50 px-3 py-1 text-sm text-black">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {token && user && (
            <div className="group relative">
              <img
                src={
                  user.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}`
                }
                alt="profile"
                className="h-8 w-8 cursor-pointer rounded-full"
              />

              <div className="invisible absolute right-0 top-[110%]
                z-[20] w-[160px] rounded-md bg-richblack-800
                p-2 opacity-0 transition-all duration-200
                group-hover:visible group-hover:opacity-100">

                <Link
                  to="/dashboard/my-profile"
                  className="block rounded px-3 py-2 text-sm hover:bg-richblack-700"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => dispatch(logout())}
                  className="w-full rounded px-3 py-2 text-left text-sm hover:bg-richblack-700"
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
