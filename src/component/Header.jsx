import { useState, useEffect, useRef } from "react";
import { FaBell, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Header() {
  // localStorage থেকে আগের theme নিয়ে আসে — page refresh করলেও মনে থাকবে
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    setShowMenu(false);
    toast.success("Logged out successfully!", {
      description: "See you next time 👋",
    });
  };

  // বাইরে click করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotif(false);
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-800">
      {/* Left */}
      <h1 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
        Welcome Dear! 👋
      </h1>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>

        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotif(!showNotif);
              setShowMenu(false);
            }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
          >
            <FaBell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-700"></span>
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-3 z-50 border border-gray-100 dark:border-gray-700">
              <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-white px-1">
                Notifications
              </h3>
              <div className="space-y-1">
                {[
                  { icon: "💰", title: "Payment received", time: "2 min ago" },
                  {
                    icon: "📩",
                    title: "New message from client",
                    time: "10 min ago",
                  },
                  {
                    icon: "🚀",
                    title: "New Update is here!",
                    time: "1 hour ago",
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-gray-800 dark:text-white">
                      {n.icon} {n.title}
                    </p>
                    <span className="text-xs text-gray-400 mt-0.5 block">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/user/notification" onClick={() => setShowNotif(false)}>
                <button className="w-full mt-2 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white transition-colors">
                  View All Notifications
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNotif(false);
            }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-800 dark:text-white">
              Dear
            </span>
            <FaChevronDown
              size={11}
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
            />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-11 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-1.5 z-50 border border-gray-100 dark:border-gray-700">
              <Link to="/user/profile" onClick={() => setShowMenu(false)}>
                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-white transition-colors">
                  👤 Profile
                </button>
              </Link>
              <Link
                to="/user/accountSettings"
                onClick={() => setShowMenu(false)}
              >
                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-white transition-colors">
                  ⚙️ Account Settings
                </button>
              </Link>
              <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm text-red-500 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
