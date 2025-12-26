import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiconnector";
import { categoriesEndpoints } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
// import Login from "../../pages/Login";
// import Signup from "../../pages/Signup";
// import SignupForm from "../core/Auth/SingupFrome";
// import Loginform from "../core/Auth/Loginform";
// import Templates from "../core/Auth/Templates";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth || {});
  const { user } = useSelector((state) => state.profile || {});
  const { totalItems } = useSelector((state) => state.cart || {});
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categoriesEndpoints.CATEGORIES_API);
      setSubLinks(result?.data?.data || []);
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
    <div className="flex bg-[#020617] text-white h-14 items-center border-b-[1px] justify-center border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* image */}
        <Link to="/">
          <img src={logo} width={160} height={48} alt="study notion"/>
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks?.map((link, index) => (
              <li key={index}>
                {link.title === "catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div
                      className="invisible absolute left-1/2 top-full z-50
                      flex flex-col rounded-md bg-richblack-5 p-5
                      text-richblack-900 opacity-0 transition-all duration-200
                      group-hover:visible group-hover:opacity-100"
                    >
                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, idx) => (
                          <Link to={subLink.link} key={idx}>
                            <p>{subLink.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
<div>
  <Link to="Contact">
  </Link>

</div>
        {/* login signup */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountTypes !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {!token && (
            <Link to="/Login">
              <button>Log in</button>
            </Link>
          )}

          {!token && (
            <Link to="/Signup">
              <button>Signup</button>
            </Link>
          )}

          {/* {token && <ProfileDropDown />} */}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
