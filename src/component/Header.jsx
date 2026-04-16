import { useState, useEffect, useRef } from "react";
import { FaBell, FaSun, FaMoon, FaChevronDown, FaTimes } from "react-icons/fa"; // FaTimes যোগ করা হয়েছে
import { Link } from "react-router";
import { toast } from "sonner";

export default function Header() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showNotif, setShowNotif] = useState(false); // এটি এখন ড্রয়ার কন্ট্রোল করবে
  const [showMenu, setShowMenu] = useState(false);
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

  // বাইরে click করলে প্রোফাইল মেনু বন্ধ হবে
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ড্রয়ার ওপেন থাকলে বডি স্ক্রল বন্ধ রাখা
  useEffect(() => {
    if (showNotif) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNotif]);

  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
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

        {/* Notification Bell Icon */}
        <button
          onClick={() => {
            setShowNotif(true); // ড্রয়ার ওপেন হবে
            setShowMenu(false);
          }}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
        >
          <FaBell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-700"></span>
        </button>

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

      {/* ── Notification Sidebar Drawer ── */}
      {/* Overlay (পেছনের কালো ঝাপসা অংশ) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          showNotif ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowNotif(false)}
      />

      {/* Drawer Body */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[350px] bg-white dark:bg-gray-800 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          showNotif ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaBell className="text-violet-500" /> Notifications
            </h2>
            <button
              onClick={() => setShowNotif(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[
              {
                id: 1,
                icon: "💰",
                title: "Payment received",
                desc: "You received $250.00 from client.",
                time: "2 min ago",
              },
              {
                id: 2,
                icon: "📩",
                title: "New message",
                desc: "Jhon Doe sent you a new message.",
                time: "10 min ago",
              },
              {
                id: 3,
                icon: "🚀",
                title: "System Update",
                desc: "Version 2.0 is now live with new features.",
                time: "1 hour ago",
              },
              {
                id: 4,
                icon: "🛡️",
                title: "Security Alert",
                desc: "New login detected from Chrome on Mac.",
                time: "5 hours ago",
              },
              {
                id: 5,
                icon: "🎁",
                title: "Reward Earned",
                desc: "You've earned a loyalty badge!",
                time: "Yesterday",
              },
            ].map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
              >
                <div className="flex gap-3">
                  <span className="text-2xl">{n.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
                      {n.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {n.desc}
                    </p>
                    <span className="text-[10px] font-medium text-gray-400 mt-2 block uppercase tracking-wider">
                      {n.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
            <Link to="/user/notification" onClick={() => setShowNotif(false)}>
              <button className="w-full py-3 text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95">
                View All Notifications
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
