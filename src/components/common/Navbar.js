import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiconnector";
import { categoriesEndpoints } from "../../services/apis";
import { IoIosArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth || {});
  const { user } = useSelector((state) => state.profile || {});
  const { totalItems } = useSelector((state) => state.cart || {});
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  // ================= FETCH CATEGORIES =================
  const fetchSublinks = async () => {
    try {
      const res = await apiConnector(
        "GET",
        categoriesEndpoints.CATEGORIES_API
      );
      setSubLinks(res?.data?.data || []);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b border-richblack-700 bg-[#020617]">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img src={logo} width={160} height={48} alt="StudyNotion" />
        </Link>

        {/* NAV LINKS */}
        <nav>
          <ul className="flex gap-x-6 text-white">

            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">

                {/* ================= CATALOG ================= */}
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p>Catalog</p>
                    <IoIosArrowDropdown />

                    {/* DROPDOWN */}
                    <div
                      className="invisible absolute left-1/2 top-full z-50
                      w-56 -translate-x-1/2 translate-y-3
                      rounded-xl bg-richblack-5 p-4
                      text-richblack-900 opacity-0 shadow-xl
                      transition-all duration-200
                      group-hover:visible group-hover:opacity-100"
                    >
                      {/* ARROW */}
                      <div
                        className="absolute -top-2 left-1/2 h-4 w-4
                        -translate-x-1/2 rotate-45 bg-richblack-5"
                      />

                      {subLinks.length > 0 ? (
                        subLinks.map((subLink) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            key={subLink._id}
                            className="block rounded-md px-3 py-2
                            text-sm hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm">Loading...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ================= NORMAL LINKS ================= */
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-x-4 text-white">

          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-5 w-5
                  items-center justify-center rounded-full
                  bg-yellow-100 text-xs font-bold text-black"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <Link to="/login">
              <button className="rounded-md bg-richblack-700 px-3 py-1">
                Log in
              </button>
            </Link>
          )}

          {!token && (
            <Link to="/signup">
              <button className="rounded-md bg-richblack-800 px-3 py-1">
                Sign up
              </button>
            </Link>
          )}

          {/* {token && <ProfileDropDown />} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
