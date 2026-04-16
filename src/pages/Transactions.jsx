import { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiCalendar,
} from "react-icons/fi";

// ── Mock Data ──────────────────────────────────────────────
const initialTransactions = [
  {
    id: "TXN001",
    date: "2024-03-20",
    amount: 250.0,
    status: "Paid",
    method: "Credit Card",
  },
  {
    id: "TXN002",
    date: "2024-03-19",
    amount: 120.5,
    status: "Pending",
    method: "PayPal",
  },
  {
    id: "TXN003",
    date: "2024-03-18",
    amount: 45.0,
    status: "Failed",
    method: "Bank Transfer",
  },
  {
    id: "TXN004",
    date: "2024-03-15",
    amount: 800.0,
    status: "Paid",
    method: "Credit Card",
  },
  {
    id: "TXN005",
    date: "2024-03-12",
    amount: 15.99,
    status: "Paid",
    method: "PayPal",
  },
  {
    id: "TXN006",
    date: "2024-03-10",
    amount: 310.0,
    status: "Pending",
    method: "Apple Pay",
  },
  {
    id: "TXN007",
    date: "2024-03-08",
    amount: 50.0,
    status: "Failed",
    method: "Debit Card",
  },
];

// ── Status Badge Component ─────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Failed: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// ── Main Transactions Component ─────────────────────────────
export default function Transactions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter((txn) => {
      const matchesSearch =
        txn.id.toLowerCase().includes(search.toLowerCase()) ||
        txn.method.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Transactions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage and track your recent payments
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID or Method..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-violet-500 outline-none transition dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[160px]">
          <select
            className="w-full appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-violet-500 outline-none transition dark:text-white cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                      {txn.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {txn.method}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-bold ${txn.status === "Failed" ? "text-red-500" : "text-gray-800 dark:text-white"}`}
                      >
                        ${txn.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={txn.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No transactions found for your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
