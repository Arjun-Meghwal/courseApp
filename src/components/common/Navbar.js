import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { categories } from "../../services/apis";
import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { logout } from "../../services/operations/authAPI";
import { HiMenu, HiX } from "react-icons/hi";



const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);



  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
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
    <div className="sticky top-0 z-[1000] text-white bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617] border-b border-white/10 backdrop-blur-md">

      <div className="flex h-16 w-11/12 max-w-maxContent mx-auto items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            width={140}
            alt="Study Notion"
            className="hover:scale-110 transition duration-300"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-[15px] font-medium">

            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">

                {link.title === "Catalog" ? (
                  <div className="group flex items-center gap-1 cursor-pointer">

                    <span className="hover:text-yellow-400 transition">
                      Catalog
                    </span>

                    <IoIosArrowDropdown className="group-hover:rotate-180 transition" />

                    <div
                      className="
    invisible absolute left-1/2 top-[130%]
    -translate-x-1/2
    opacity-0
    group-hover:visible
    group-hover:opacity-100
    transition-all duration-300

    w-[280px]
    rounded-3xl
    border border-white/10
    bg-[#0F172A]/95
    backdrop-blur-xl
    shadow-[0_20px_50px_rgba(0,0,0,0.6)]

    p-3
    z-50
  "
                    >

                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()
                              }`}
                            key={i}
                          >
                            <p className="rounded-xl px-4 py-3 text-white hover:bg-richblack-700 hover:text-yellow-400 transition-all">
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
                        className={`${matchRoute(link.path) ? "text-yellow-400" : ""
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

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden md:flex items-center gap-x-5">

          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl hover:text-yellow-400 transition" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-1 border border-richblack-600 rounded-md hover:border-yellow-400 hover:text-yellow-400 transition">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-4 py-1 bg-yellow-400 text-black rounded-md">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <div className="relative group">

              <img
                src={
                  user?.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
                }
                alt="profile"
                className="h-9 w-9 rounded-full cursor-pointer border border-richblack-600"
              />

                <div
                  className="
    invisible absolute left-1/2 top-[130%]
    -translate-x-1/2
    opacity-0
    group-hover:visible
    group-hover:opacity-100
    transition-all duration-300

    w-[280px]
    rounded-3xl
    border border-white/10
    bg-[#0F172A]/95
    backdrop-blur-xl
    shadow-[0_20px_50px_rgba(0,0,0,0.6)]

    p-3
    z-50
  "
                >

                <Link
                  to="/dashboard/my-profile"
                  className="block px-3 py-2 rounded text-sm hover:bg-richblack-700"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => dispatch(logout(navigate))}
                  className="w-full text-left px-3 py-2 rounded text-sm hover:bg-richblack-700"
                >
                  Logout
                </button>

              </div>
            </div >
          )}

        </div >

        {/* MOBILE MENU BUTTON */}
        < button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-3xl"
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button >

      </div >

      {/* MOBILE MENU */}
      {
        mobileMenuOpen && (
          <div className="md:hidden bg-richblack-900 border-t border-white/10">

            <div className="flex flex-col p-4 gap-3">

              {NavbarLinks.map((link, index) => (
                <div key={index}>

                  {link.title === "Catalog" ? (
                    <>
                      <button
                        onClick={() => setShowCatalog(!showCatalog)}
                        className="flex w-full items-center justify-between rounded-lg bg-richblack-800 px-3 py-3"
                      >
                        <span>Catalog</span>

                        <IoIosArrowDropdown
                          className={`transition-all duration-300 ${showCatalog ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {showCatalog && (
                        <div className="mt-2 ml-3 flex flex-col gap-2">

                          {subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setShowCatalog(false);
                              }}
                              className="rounded-lg bg-richblack-700 px-3 py-2 text-sm hover:text-yellow-400"
                            >
                              {subLink.name}
                            </Link>
                          ))}

                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-3 hover:bg-richblack-800"
                    >
                      {link.title}
                    </Link>
                  )}

                </div>
              ))}

              {!token ? (
                <>
                  <Link to="/login">
                    <button className="w-full rounded-lg border border-richblack-600 py-2">
                      Login
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="w-full rounded-lg bg-yellow-400 py-2 text-black font-semibold">
                      Signup
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard/my-profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => dispatch(logout(navigate))}
                    className="text-left"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>

          </div>
        )
      }

    </div >
  );


};

export default Navbar;