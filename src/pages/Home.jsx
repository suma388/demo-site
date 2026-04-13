import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Home = () => {
  const [activeTab, setActiveTab] = useState("magic");

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl">
        {/* Social Login */}
        <button className="w-full flex items-center justify-center gap-2 border border-[#e9e9e9] py-3 rounded-lg mb-3 hover:bg-gray-50">
          <FaGoogle /> Sign in with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 border rounded-lg hover:bg-gray-50 border-[#e9e9e9] py-3">
          <FaGithub /> Sign in with Github
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab("magic")}
            className={`w-1/2 py-2 rounded-lg text-sm ${
              activeTab === "magic"
                ? "bg-white shadow font-medium"
                : "text-gray-500"
            }`}
          >
            Magic Link
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`w-1/2 py-2 rounded-lg text-sm ${
              activeTab === "password"
                ? "bg-white shadow font-medium"
                : "text-gray-500"
            }`}
          >
            Password
          </button>
        </div>

        {/* Form */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-[#e9e9e9] py-3 mt-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password field (only if selected) */}
        {activeTab === "password" && (
          <div className="mb-4">
            <label className="text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Button */}
        <button className="w-full bg-[#1c274c] text-white py-2 rounded-lg hover:bg-[#283c7f]">
          {activeTab === "magic" ? "Send magic link" : "Login"}
        </button>

        {/* Signup */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Create account →</span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Demo User */}
        <p className="text-center text-sm mb-3 text-gray-500">
          Or Continue as Demo User, Admin
        </p>

        <div className="flex gap-3">
          <button className="w-1/2 bg-[#635bff] text-white py-2 rounded-lg hover:bg-purple-600">
            <Link to="/user">User</Link>
          </button>

          <button className="w-1/2 bg-[#1c274c] text-white py-2 rounded-lg hover:bg-indigo-800">
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
