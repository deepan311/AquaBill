import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo2 from "../../../asset/Logo2.png";
import { AiFillDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import UserInfo from "./UserInfo";
import AdminInfo from "./AminInfo";
import AdminProfile from "./AdminProfile";

import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Average from "./Average";
import { AuthContext } from "../../../AuthProvider";
import { BiLoaderAlt } from "react-icons/bi";
import Register from "../../User/Register";

function AdminDashbord() {
  const { logOut, fetchData, currentUser, userData } = useContext(AuthContext);

  console.log(userData);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (!userData) {
    return (
      <div className="flex justify-center w-full bg-black/20 h-screen items-center">
        <BiLoaderAlt className="text-2xl animate-spin text-black-500" />
        DataLoading...
      </div>
    );
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (userData.roll != "admin") {
    return (
      <>
        <div className="w-full h-screen bg-gray-300 flex justify-center items-center" >
          <h2> oops! Sorry you Are not admin ...!</h2>
          <NavLink to='/' className="bg-black/60 px-4 py-2 rounded-md text-white ">Go Back</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-1 fixed ">
      {/* NavBar */}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center  justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isOpen}
                onClick={handleToggle}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FaTimes className="block h-6 w-6 " />
                ) : (
                  <FaBars className="block h-6 w-6 " />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 w-full justify-center md:justify-start flex items-center">
              <img className="  h-12 w-auto" src={Logo2} alt="Workflow" />
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700 font-medium hover:text-white"
                >
                  <AiFillDashboard className="text-2xl" />
                </a>

               <h4 className="mx-3 px-4 text-white">{userData.name}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={isOpen ? "block sm:hidden" : "hidden"}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
          </div>
        </div>
      </nav>
      {/* NavBar */}
      <div className="grid grid-cols-1 lg:grid-cols-6 h-screen">
        {/* Sidebar */}
        <div className="  lg:col-span-1 bg-gradient-to-tr from-black to-gray-900 flex justify-between flex-col items-center">
          <div className=" text-white w-full  py-6 flex-shrink-0">
            <div className="flex items-center justify-center mb-8">
              <NavLink to="/admin" className="text-2xl font-bold">
                Dashboard
              </NavLink>
            </div>
            <ul className="space-y-4 ">
              <li>
                <NavLink
                  to="user-info"
                  className={`flex items-center space-x-2 py-4 px-4 rounded-md hover:bg-blue-600 w-full ${
                    location.pathname === "/admin/user-info" && "bg-blue-500"
                  }`}
                >
                  <FaUserFriends />
                  <span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="admin-info"
                  className={`flex items-center space-x-2 py-4 px-4 rounded-md hover:bg-blue-600 w-full ${
                    location.pathname === "/admin/admin-info" && "bg-blue-500"
                  }`}
                >
                  <MdAdminPanelSettings />
                  <span>Admins</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="bill-gen"
                  className={`flex items-center space-x-2 py-4 px-4 rounded-md hover:bg-blue-600 w-full ${
                    location.pathname === "/admin/bill-gen" && "bg-blue-500"
                  }`}
                >
                  <RiBillFill />
                  <span>Generate Bill</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="add-user"
                  className={`flex items-center space-x-2 py-4 px-4 rounded-md hover:bg-blue-600 w-full ${
                    location.pathname === "/admin/add-user" && "bg-blue-500"
                  }`}
                >
                  <FaUsers />
                  <span>Add User</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="profile"
                  className={`flex items-center space-x-2 py-4 px-4 rounded-md hover:bg-blue-600 w-full ${
                    location.pathname === "/admin/profile" && "bg-blue-500"
                  }`}
                >
                  <CgProfile />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* NavBar */}

        {/* Main Content */}
        <div className="lg:col-span-5 h-screen bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-400 p-4 py-11 overflow-auto">
          <Routes>
            <Route path="/" element={<Average />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="admin-info" element={<AdminInfo />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="add-user" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
