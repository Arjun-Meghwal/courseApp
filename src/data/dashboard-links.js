import {
  VscAccount,
  VscDashboard,
  VscBook,
  VscAdd,
  VscMortarBoard,
  VscCreditCard,
  VscSettingsGear,
} from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { ACCOUNT_TYPE } from "../utils/accountType";
/*
  accountType:
  - "Student"
  - "Instructor"
*/

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: VscAccount,
  },

  // {
    // id: 2,
    // name: "Dashboard",
    // path: "/dashboard/instructor",
    // type:ACCOUNT_TYPE.INSTRUCTOR,
    // icon: VscDashboard,
    // },

  // {
  //   id: 3,
  //   name: "My Courses",
  //   path: "/dashboard/my-courses",
  //   icon: VscBook,
  //   type: ACCOUNT_TYPE.INSTRUCTOR,
  // },

  // {
  //   id: 4,
  //   name: "Add Course",
  //   path: "/dashboard/add-course",
  //   icon: VscAdd,
  //   type: ACCOUNT_TYPE.INSTRUCTOR,
  // },

  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    icon: VscMortarBoard,
    type: ACCOUNT_TYPE.STUDENT,
  },
  {
    id:3,
    name:"Cart",
    path:"/dashboard/Cart",
    icon: AiOutlineShoppingCart,
    type:ACCOUNT_TYPE.STUDENT,
  },

  // {
  //   id: 6,
  //   name: "Purchased Courses",
  //   path: "/dashboard/purchased-courses",
  //   icon: VscCreditCard,
  //   type: ACCOUNT_TYPE.STUDENT,
  // },

  {
    id: 7,
    name: "Settings",
    path: "/dashboard/settings",
    icon: VscSettingsGear,
  },
];
