import { useState } from "react";
import Logo from "../assets/logo.svg";
import { IoSettings } from "react-icons/io5";
import { FaDonate, FaFileInvoice } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import Header from "../component/Header";
import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/user", icon: <FaDonate size={18} />, label: "DashBoard" },
  { to: "/user/profile", icon: <IoSettings size={18} />, label: "Profile" },
  {
    to: "/user/subscription",
    icon: <FaFileInvoice size={18} />,
    label: "Subscription",
  },
  {
    to: "/user/notification",
    icon: <AiFillApi size={18} />,
    label: "Notifications",
  },
  {
    to: "/user/plans",
    icon: <AiFillApi size={18} />,
    label: "Plans",
  },
];

const UserLayOut = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex overflow-hidden">
      {/* Mobile overlay — sidebar খোলা থাকলে পেছনে dark overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md z-30
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo + Close button (mobile) */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <img src={Logo} alt="Logo" className="h-8 object-contain" />
          <button
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <div className="px-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-2">
            Main Menu
          </p>
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/user"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer
                  ${
                    isActive
                      ? "bg-[#efeeff] text-[#6c5ce7] dark:bg-violet-900/40 dark:text-violet-300 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#6c5ce7] dark:hover:text-violet-300"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 shadow z-10">
          <div className="flex items-center px-4 lg:px-0">
            {/* Hamburger — শুধু mobile এ দেখাবে */}
            <button
              className="lg:hidden p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>
            <div className="flex-1">
              <Header />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayOut;
