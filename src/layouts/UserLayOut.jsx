import React from "react";
import Logo from "../assets/logo.svg";
import { IoSettings } from "react-icons/io5";
import { FaDonate, FaFileInvoice } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import Header from "../component/Header";
import { NavLink, Outlet } from "react-router";

const UserLayOut = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/*Sidebar*/}
      <div className="fixed left-0 top-0 w-64 h-full bg-white p-6 shadow-md">
        <img className="mt-3 mb-6" src={Logo} alt="" />

        <h2 className="text-[#b0adb3] text-lg mb-3">Main Menu</h2>

        <ul className="grid gap-1">
          <NavLink to="/user/dashBoard">
            <li className="text-lg hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-2 flex gap-2 items-center cursor-pointer">
              <FaDonate /> DashBoard
            </li>
          </NavLink>

          <NavLink to="/user/profile">
            <li className="text-lg hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-2 flex gap-2 items-center cursor-pointer">
              <IoSettings /> Profile
            </li>
          </NavLink>

          <NavLink to="/user/subscription">
            <li className="text-lg hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-2 flex gap-2 items-center cursor-pointer">
              <FaFileInvoice /> Subscription
            </li>
          </NavLink>

          <li className="text-lg hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-2 flex gap-2 items-center cursor-pointer">
            <AiFillApi /> API
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        <div className="fixed top-0 left-58 right-0 h-16 bg-white shadow z-10 flex items-center px-6">
          <Header />
        </div>
        <div className="pt-16 p-6 h-screen overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default UserLayOut;
