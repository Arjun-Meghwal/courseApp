import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative flex items-center gap-x-2 px-8 py-2 text-sm font-medium
        ${matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "text-richblack-300 hover:bg-richblack-700"
        }`}
    >
      {/* ACTIVE BAR */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
      />

      {/* ICON */}
      {Icon && <Icon className="text-lg" />}

      {/* TEXT */}
      <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLink;
