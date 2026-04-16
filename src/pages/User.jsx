import { useState, useMemo } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import { toast } from "sonner";

// ── Mock Data ──────────────────────────────────────────────
const initialUsers = [
  {
    id: 1,
    name: "Ayesha Rahman",
    email: "ayesha@mail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rafiq Islam",
    email: "rafiq@mail.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Nadia Hossain",
    email: "nadia@mail.com",
    role: "User",
    status: "Suspended",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    email: "tanvir@mail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Sumaiya Khanam",
    email: "sumaiya@mail.com",
    role: "User",
    status: "Suspended",
  },
  {
    id: 6,
    name: "Imran Hossain",
    email: "imran@mail.com",
    role: "User",
    status: "Active",
  },
  {
    id: 7,
    name: "Fatema Begum",
    email: "fatema@mail.com",
    role: "Admin",
    status: "Active",
  },
];

const emptyForm = { name: "", email: "", role: "User", status: "Active" };

// ── Badge Components ───────────────────────────────────────
const RoleBadge = ({ role }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
      role === "Admin"
        ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
    }`}
  >
    {role}
  </span>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
      status === "Active"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
        : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
    }`}
  >
    {status}
  </span>
);

// ── Avatar ─────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = [
    "bg-violet-200 text-violet-700",
    "bg-emerald-200 text-emerald-700",
    "bg-orange-200 text-orange-700",
    "bg-blue-200 text-blue-700",
    "bg-pink-200 text-pink-700",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color}`}
    >
      {initials}
    </div>
  );
};

// ── Modal ──────────────────────────────────────────────────
function UserModal({ mode, user, onClose, onSave }) {
  const [form, setForm] = useState(user || emptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            {mode === "add" ? "Add New User" : "Edit User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              placeholder="Enter email address"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Role
              </label>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition appearance-none"
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition appearance-none"
                >
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white transition flex items-center gap-2"
          >
            <FiCheck size={15} />
            {mode === "add" ? "Add User" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Popover ─────────────────────────────────────────
function DeletePopover({ onConfirm, onCancel }) {
  return (
    <div className="absolute right-10 top-0 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl p-4 w-56">
      <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">
        Delete user?
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        This action cannot be undone.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// ── Main Users Page ────────────────────────────────────────
export default function User() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal, setModal] = useState(null); // { mode: "add"|"edit", user }
  const [deleteId, setDeleteId] = useState(null);

  // ── Filtered users ──────────────────────────────────────
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || u.role === roleFilter;
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // ── Handlers ────────────────────────────────────────────
  const handleSave = (form) => {
    if (modal.mode === "add") {
      setUsers([...users, { ...form, id: Date.now() }]);
      toast.success("User added successfully!");
    } else {
      setUsers(
        users.map((u) => (u.id === modal.user.id ? { ...u, ...form } : u)),
      );
      toast.success("User updated successfully!");
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteId(null);
    toast.error("User deleted.");
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
            Users
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add", user: null })}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition self-start sm:self-auto"
        >
          <FiPlus size={16} />
          Add User
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
        </div>

        {/* Role Filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-4 pr-9 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition appearance-none w-full sm:w-auto"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <FiChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-9 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition appearance-none w-full sm:w-auto"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <FiChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="px-5 py-3.5 font-medium">User</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-gray-400 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} />
                        <span className="font-medium text-gray-800 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-5 py-3.5">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2 relative">
                        {/* Edit */}
                        <button
                          onClick={() => setModal({ mode: "edit", user })}
                          className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        {/* Delete */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setDeleteId(deleteId === user.id ? null : user.id)
                            }
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                            title="Delete"
                          >
                            <FiTrash2 size={15} />
                          </button>
                          {deleteId === user.id && (
                            <DeletePopover
                              onConfirm={() => handleDelete(user.id)}
                              onCancel={() => setDeleteId(null)}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-gray-400 text-sm">
              No users found.
            </div>
          ) : (
            filtered.map((user) => (
              <div
                key={user.id}
                className="px-4 py-4 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Avatar name={user.name} />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-800 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <RoleBadge role={user.role} />
                      <StatusBadge status={user.status} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 relative">
                  <button
                    onClick={() => setModal({ mode: "edit", user })}
                    className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDeleteId(deleteId === user.id ? null : user.id)
                      }
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                    >
                      <FiTrash2 size={15} />
                    </button>
                    {deleteId === user.id && (
                      <DeletePopover
                        onConfirm={() => handleDelete(user.id)}
                        onCancel={() => setDeleteId(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <UserModal
          mode={modal.mode}
          user={modal.user}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
