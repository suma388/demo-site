import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../assets/logo.svg";
import { Link } from "react-router";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef();
  const searchRef = useRef();

  // Dark mode toggle
  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <nav className="bg-white fixed top-0 left-0 right-0 dark:bg-gray-900 dark:text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <img className="w-[150px] md:w-[250px]" src={Logo} alt="logo" />
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-medium items-center">
            <Link to="/features">
              <li className="hover:text-blue-500 cursor-pointer text-lg">
                Features
              </li>
            </Link>
            <Link to="/pricing">
              {" "}
              <li className="hover:text-blue-500 cursor-pointer text-lg">
                Pricing
              </li>
            </Link>
            <Link to="/blogs">
              <li className="hover:text-blue-500 cursor-pointer text-lg">
                Blog
              </li>
            </Link>

            <li className="hover:text-blue-600 cursor-pointer text-lg">
              Buy Now
            </li>
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-lg hover:text-blue-500"
            >
              <FaSearch />
            </button>

            {/* Dark Mode */}
            <button onClick={toggleTheme} className="text-lg">
              {dark ? <FaMoon /> : <FaSun />}
            </button>

            {/* Account */}
            <div ref={dropdownRef} className="relative">
              <Link to="/user">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="md:text-xl hover:bg-[#463ed5] text-white bg-[#635bff] pt-1 px-2 md:px-5 rounded-lg text-center pb-2"
                >
                  Account
                </button>
              </Link>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Profile
                  </p>
                  <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Settings
                  </p>
                  <p className="px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Logout
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3 bg-white dark:bg-gray-900">
            <Link to="/features">
              <p>Features</p>
            </Link>
            <Link to="/pricing">
              <p>Pricing</p>
            </Link>
            <Link to="blogs">
              <p>Blogs</p>
            </Link>
            <p>Pages</p>
            <p className="bg-blue-500 text-white px-3 py-2 rounded w-fit">
              Buy Now
            </p>
          </div>
        )}
      </nav>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-32 z-50">
          <div
            ref={searchRef}
            className="bg-white dark:bg-gray-800 w-[90%] max-w-xl p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3 border-b pb-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full outline-none bg-transparent"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-3">
              Type something and press Enter...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
