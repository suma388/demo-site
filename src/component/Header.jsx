import { useState, useEffect } from "react";
import { FaBell, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className=" w-full flex items-center justify-between px-6 py-6 shadow bg-white dark:bg-gray-900">
      {" "}
      {/* Left */}{" "}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {" "}
        Welcome Dear! 👋{" "}
      </h1>
      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>

        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white relative"
          >
            <FaBell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Notifications
              </h3>

              <div className="space-y-2">
                <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <p className=" text-gray-800 dark:text-white">
                    💰 Payment received
                  </p>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>

                <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <p className=" text-gray-800 dark:text-white">
                    📩 New message from client
                  </p>
                  <span className="text-xs text-gray-500">10 min ago</span>
                </div>

                <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <p className=" text-gray-800 dark:text-white">
                    🚀 New Update is here!
                  </p>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </div>

              <Link to="/user/notification">
                <button className="w-full mt-3 py-2 text-lg bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white">
                  View All Notifications
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className="relative"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-800 text-xl dark:text-white">Dear</span>
            <FaChevronDown size={14} />
          </div>

          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-50">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-white">
                👤 Profile
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-white">
                ⚙️ Account Settings
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500">
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
