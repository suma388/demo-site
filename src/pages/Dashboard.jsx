import { useState, useEffect, useRef } from "react";
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreVertical,
} from "react-icons/fi";
import { toast } from "sonner";
import ReactApexChart from "react-apexcharts";

// Count-up animation hook — IntersectionObserver দিয়ে screen এ আসলে start হয়
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

const summaryCards = [
  {
    title: "Total Revenue",
    target: 48295,
    display: (n) => "$" + n.toLocaleString(),
    change: "+12.5%",
    up: true,
    icon: FiDollarSign,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Active Users",
    target: 3842,
    display: (n) => n.toLocaleString(),
    change: "+8.1%",
    up: true,
    icon: FiUsers,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Growth",
    target: 246,
    display: (n) => (n / 10).toFixed(1) + "%",
    change: "-2.3%",
    up: false,
    icon: FiTrendingUp,
    color: "bg-orange-100 text-orange-500",
  },
];

// আলাদা component — প্রতিটা card এর নিজের ref ও count থাকবে
function AnimatedCard({ card }) {
  const Icon = card.icon;
  const { count, ref } = useCountUp(card.target, 1800);
  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 sm:gap-4"
    >
      <div className={`p-2.5 sm:p-3 rounded-xl flex-shrink-0 ${card.color}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {card.title}
        </p>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mt-0.5 tabular-nums">
          {card.display(count)}
        </p>
      </div>
      <div
        className={`flex items-center gap-1 text-xs sm:text-sm font-medium flex-shrink-0 ${card.up ? "text-emerald-500" : "text-red-500"}`}
      >
        {card.up ? (
          <FiArrowUpRight size={15} />
        ) : (
          <FiArrowDownRight size={15} />
        )}
        {card.change}
      </div>
    </div>
  );
}

const transactions = [
  {
    id: "#TXN-001",
    name: "Ayesha Rahman",
    email: "ayesha@mail.com",
    amount: "$120.00",
    status: "Paid",
    date: "Apr 10, 2026",
  },
  {
    id: "#TXN-002",
    name: "Rafiq Islam",
    email: "rafiq@mail.com",
    amount: "$85.00",
    status: "Pending",
    date: "Apr 09, 2026",
  },
  {
    id: "#TXN-003",
    name: "Nadia Hossain",
    email: "nadia@mail.com",
    amount: "$200.00",
    status: "Paid",
    date: "Apr 08, 2026",
  },
  {
    id: "#TXN-004",
    name: "Tanvir Ahmed",
    email: "tanvir@mail.com",
    amount: "$55.00",
    status: "Failed",
    date: "Apr 07, 2026",
  },
  {
    id: "#TXN-005",
    name: "Sumaiya Khanam",
    email: "sumaiya@mail.com",
    amount: "$340.00",
    status: "Paid",
    date: "Apr 06, 2026",
  },
];

const statusStyle = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-600",
};

const chartOptions = {
  chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#7c3aed", "#10b981"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.02,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: { style: { colors: "#9ca3af", fontSize: "12px" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: "#9ca3af", fontSize: "12px" } } },
  grid: { borderColor: "#f3f4f6", strokeDashArray: 4 },
  legend: { position: "top", horizontalAlign: "right", fontSize: "13px" },
  tooltip: { theme: "light" },
};

const chartSeries = [
  {
    name: "Revenue",
    data: [
      12000, 18000, 15000, 22000, 20000, 28000, 25000, 32000, 29000, 38000,
      35000, 48295,
    ],
  },
  {
    name: "Users",
    data: [
      800, 1200, 1100, 1500, 1400, 1900, 1800, 2300, 2100, 2800, 3200, 3842,
    ],
  },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    toast.success("Dashboard loaded successfully!");
  }, []);

  // Chart height responsive
  const chartHeight = window.innerWidth < 640 ? 200 : 280;

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {summaryCards.map((card) => (
          <AnimatedCard key={card.title} card={card} />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
              Analytics Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Revenue & Users — 2026
            </p>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={chartHeight}
          />
        </div>
      </div>

      {/* Recent Transactions — Desktop Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
            Recent Transactions
          </h2>
          <button
            className="text-xs sm:text-sm text-violet-600 hover:underline font-medium"
            onClick={() => toast.info("Navigating to Transactions page...")}
          >
            View all
          </button>
        </div>

        {/* Mobile Cards — শুধু mobile এ দেখাবে */}
        <div className="block sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="px-4 py-3.5 flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-800 dark:text-white truncate">
                  {txn.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {txn.id} · {txn.date}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <p className="font-semibold text-sm text-gray-800 dark:text-white">
                  {txn.amount}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[txn.status]}`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table — sm এর উপরে দেখাবে */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Transaction ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                >
                  <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {txn.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-800 dark:text-white">
                      {txn.name}
                    </p>
                    <p className="text-xs text-gray-400">{txn.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 text-xs">
                    {txn.date}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800 dark:text-white">
                    {txn.amount}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[txn.status]}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === txn.id ? null : txn.id)
                      }
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <FiMoreVertical size={16} />
                    </button>
                    {menuOpen === txn.id && (
                      <div className="absolute right-4 top-8 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg py-1 w-36">
                        <button
                          onClick={() => {
                            toast.success(`Viewing ${txn.id}`);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          View details
                        </button>
                        <button
                          onClick={() => {
                            toast.error(`Deleted ${txn.id}`);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
