import { useState, useRef } from "react";
import {
  FiCamera,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiTrash2,
  FiSave,
  FiLock,
} from "react-icons/fi";
import { toast } from "sonner";

export default function Profile() {
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfileImg(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!currentPass) {
      toast.error("Enter your current password");
      return;
    }
    if (!newPass) {
      toast.error("Enter a new password");
      return;
    }
    if (newPass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPass !== retypePass) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password changed successfully!");
    setCurrentPass("");
    setNewPass("");
    setRetypePass("");
  };

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    toast.error("Account deleted!");
    setDeleteConfirm(false);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your profile and account settings
        </p>
      </div>

      {/* Top Section — Edit Profile + Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Edit Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-5">
            Edit Profile
          </h2>

          {/* Avatar Upload */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <div
              className="relative w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer flex-shrink-0 overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-violet-400 transition-colors"
              onClick={() => fileRef.current.click()}
            >
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FiCamera size={24} className="text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiCamera size={18} className="text-white" />
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".jpeg,.jpg,.png"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recommended size:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  300×300px
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Supported formats:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  jpeg, png, jpg
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Max size:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  2MB
                </span>
              </p>
              {profileImg && (
                <button
                  onClick={() => setProfileImg(null)}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-violet-600 hover:bg-gray-700 dark:hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            <FiSave size={15} />
            Save Changes
          </button>
        </div>

        {/* Password Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-5">
            <FiLock size={16} className="text-gray-500 dark:text-gray-400" />
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              Password
            </h2>
          </div>

          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showCurrent ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Re-type Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Re-type new Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showRetype ? "text" : "password"}
                value={retypePass}
                onChange={(e) => setRetypePass(e.target.value)}
                placeholder="Re-type your new password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowRetype(!showRetype)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showRetype ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {/* Password match indicator */}
            {retypePass && (
              <p
                className={`text-xs mt-1.5 ${newPass === retypePass ? "text-emerald-500" : "text-red-500"}`}
              >
                {newPass === retypePass
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-violet-600 hover:bg-gray-700 dark:hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            <FiLock size={15} />
            Change Password
          </button>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-red-100 dark:border-red-900/40">
        <div className="flex items-center gap-2 mb-1">
          <FiAlertCircle size={16} className="text-red-500" />
          <h2 className="text-base font-semibold text-red-500">Danger Zone</h2>
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Delete Account
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Deleting the Account will erase all traces of this Account,
            including all submissions and file uploads and Settings.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                deleteConfirm
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white"
              }`}
            >
              <FiTrash2 size={14} />
              {deleteConfirm ? "Confirm Delete" : "Delete"}
            </button>
            {deleteConfirm && (
              <button
                onClick={() => setDeleteConfirm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              >
                Cancel
              </button>
            )}
          </div>
          {deleteConfirm && (
            <p className="text-xs text-red-500 mt-2">
              ⚠️ Click "Confirm Delete" again to permanently delete your
              account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
