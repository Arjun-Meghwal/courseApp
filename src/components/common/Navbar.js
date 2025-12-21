import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth || {});
  const { user } = useSelector((state) => state.profile || {});
  const { totalItems } = useSelector((state) => state.cart || {});
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center border-b-[1px] justify-center border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* image */}
        <Link to="/">
          <img src={logo} width={160} height={48} />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "catalog" ? (
                  <div></div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
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

        {/* login signup */}
        <div className="flex gap-x-4 items-center">
          {
            user && user?.accountTypes != "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <spam>
                      {totalItems}
                    </spam>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link>
                <button>
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button>
                  signup
                </button>
              </Link>
            )
          }
          {
            token !==null &&<profileDropDown/>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
