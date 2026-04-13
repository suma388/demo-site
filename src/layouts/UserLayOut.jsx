import React from "react";
import { Outlet } from "react-router";
import Logo from "../assets/logo.svg";
import { IoSettings } from "react-icons/io5";
import { FaDonate, FaFileInvoice } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import Header from "../component/Header";

const UserLayOut = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 p-6">
        <img className="mt-3 mb-6" src={Logo} alt="" />
        <h2 className="text-[#b0adb3] text-lg mb-3">Main Menu</h2>
        <ul className="grid gap-1">
          <li className="text-xl hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-1 flex gap-2 items-center">
            <IoSettings /> Account Settings
          </li>
          <li className="text-xl hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-1 flex gap-2 items-center">
            <FaDonate /> Biling
          </li>
          <li className="text-xl hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-1 flex gap-2 items-center">
            <FaFileInvoice /> Invoice
          </li>
          <li className="text-xl hover:text-[#998bff] hover:bg-[#efeeff] rounded-lg py-2 px-1 flex gap-2 items-center">
            <AiFillApi /> API
          </li>
        </ul>
      </div>
      <div className="col-span-4 border">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserLayOut;
