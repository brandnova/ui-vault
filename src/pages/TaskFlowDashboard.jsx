import { useState, useEffect } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  DollarSign,
  UserPlus,
  Activity,
  Target,
  Download,
  Filter,
  CreditCard,
  Package,
  MessageSquare,
  HelpCircle,
  User,
  LogOut,
  Zap,
  Shield,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"

// More realistic startup data
const revenueData = [
  { month: "Jan", revenue: 8200, users: 145 },
  { month: "Feb", revenue: 12400, users: 198 },
  { month: "Mar", revenue: 9800, users: 167 },
  { month: "Apr", revenue: 15600, users: 234 },
  { month: "May", revenue: 18900, users: 298 },
  { month: "Jun", revenue: 22100, users: 342 },
]

const userGrowthData = [
  { day: "Mon", signups: 8, active: 156 },
  { day: "Tue", signups: 12, active: 164 },
  { day: "Wed", signups: 6, active: 171 },
  { day: "Thu", signups: 15, active: 185 },
  { day: "Fri", signups: 11, active: 192 },
  { day: "Sat", signups: 4, active: 178 },
  { day: "Sun", signups: 3, active: 168 },
]

const engagementData = [
  { name: "Web App", value: 52, color: "#3B82F6" },
  { name: "Mobile", value: 31, color: "#10B981" },
  { name: "API", value: 17, color: "#F59E0B" },
]

const recentCustomers = [
  { name: "Acme Corp", plan: "Pro", mrr: 89, status: "active", avatar: "A" },
  { name: "TechFlow Inc", plan: "Enterprise", mrr: 299, status: "active", avatar: "T" },
  { name: "StartupXYZ", plan: "Basic", mrr: 29, status: "trial", avatar: "S" },
  { name: "DevTools Co", plan: "Pro", mrr: 89, status: "active", avatar: "D" },
]

const notifications = [
  { id: 1, type: "success", message: "Payment received from Acme Corp", time: "2m ago" },
  { id: 2, type: "warning", message: "Server usage at 85%", time: "15m ago" },
  { id: 3, type: "info", message: "New feature request submitted", time: "1h ago" },
  { id: 4, type: "success", message: "3 new signups today", time: "2h ago" },
]

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Default to closed on mobile
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [dropdowns, setDropdowns] = useState({
    notifications: false,
    profile: false,
    analytics: false,
    customers: false,
  })

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setSidebarOpen(true) // Open sidebar on larger screens
      } else {
        setSidebarOpen(false) // Close sidebar on smaller screens
      }
    }

    handleResize() // Set initial state
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const kpiCards = [
    {
      title: "Monthly Revenue",
      value: "$22,100",
      change: "+17%",
      trend: "up",
      icon: DollarSign,
      subtitle: "342 paying customers",
    },
    {
      title: "New Signups",
      value: "59",
      change: "+24%",
      trend: "up",
      icon: UserPlus,
      subtitle: "This month",
    },
    {
      title: "Active Users",
      value: "1,847",
      change: "+12%",
      trend: "up",
      icon: Activity,
      subtitle: "Last 30 days",
    },
    {
      title: "Churn Rate",
      value: "2.1%",
      change: "-0.8%",
      trend: "up",
      icon: Target,
      subtitle: "Industry avg: 5.2%",
    },
  ]

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      key: "dashboard",
      hasDropdown: false,
    },
    {
      icon: Users,
      label: "Customers",
      key: "customers",
      hasDropdown: true,
      dropdownItems: [
        { label: "All Customers", key: "customers-all" },
        { label: "Active Trials", key: "customers-trials" },
        { label: "Churned", key: "customers-churned" },
      ],
    },
    {
      icon: TrendingUp,
      label: "Analytics",
      key: "analytics",
      hasDropdown: true,
      dropdownItems: [
        { label: "Revenue", key: "analytics-revenue" },
        { label: "User Behavior", key: "analytics-behavior" },
        { label: "Conversion", key: "analytics-conversion" },
      ],
    },
    {
      icon: CreditCard,
      label: "Billing",
      key: "billing",
      hasDropdown: false,
    },
    {
      icon: Package,
      label: "Products",
      key: "products",
      hasDropdown: false,
    },
    {
      icon: MessageSquare,
      label: "Support",
      key: "support",
      hasDropdown: false,
    },
    {
      icon: Settings,
      label: "Settings",
      key: "settings",
      hasDropdown: false,
    },
  ]

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const closeAllDropdowns = () => {
    setDropdowns({
      notifications: false,
      profile: false,
      analytics: false,
      customers: false,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        closeAllDropdowns()
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "customers":
      case "customers-all":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
              <h2 className="text-xl md:text-2xl font-bold">Customer Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center justify-center space-x-1 md:space-x-2 text-sm transition-colors">
                <Plus size={14} md:size={16} />
                <span>Add Customer</span>
              </button>
            </div>
            <div
              className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg md:rounded-xl border overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <tr>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium uppercase tracking-wider">
                        MRR
                      </th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentCustomers.map((customer, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-3 py-3 md:px-4 md:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 md:mr-3">
                              <span className="text-white font-semibold text-xs md:text-sm">{customer.avatar}</span>
                            </div>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 md:px-4 md:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              customer.plan === "Enterprise"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                : customer.plan === "Pro"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            }`}
                          >
                            {customer.plan}
                          </span>
                        </td>
                        <td className="px-3 py-3 md:px-4 md:py-4 whitespace-nowrap font-medium">${customer.mrr}</td>
                        <td className="px-3 py-3 md:px-4 md:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              customer.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 md:px-4 md:py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "analytics":
      case "analytics-revenue":
        return (
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-bold">Revenue Analytics</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Revenue Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <XAxis dataKey="month" stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Customer Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <XAxis dataKey="month" stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4 md:space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {kpiCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  } p-3 sm:p-4 rounded-lg md:rounded-xl border hover:shadow-lg transition-shadow duration-200`}
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div
                      className={`p-1.5 md:p-2 rounded-md md:rounded-lg bg-gradient-to-r ${
                        index === 0
                          ? "from-blue-500 to-blue-600"
                          : index === 1
                            ? "from-emerald-500 to-emerald-600"
                            : index === 2
                              ? "from-purple-500 to-purple-600"
                              : "from-amber-500 to-amber-600"
                      }`}
                    >
                      <card.icon size={16} className="text-white" />
                    </div>
                    <div
                      className={`flex items-center space-x-0.5 text-xs md:text-sm font-medium ${
                        card.trend === "up" ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {card.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      <span>{card.change}</span>
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`text-xs md:text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-0.5`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold mb-0.5">{card.value}</p>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              {/* Revenue Chart */}
              <div
                className={`${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold">Revenue Trend</h3>
                  <button
                    className={`p-1.5 md:p-2 rounded-md md:rounded-lg ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } transition-colors`}
                  >
                    <Download size={14} />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <XAxis dataKey="month" stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* User Growth Chart */}
              <div
                className={`${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold">Daily Activity</h3>
                  <button
                    className={`p-1.5 md:p-2 rounded-md md:rounded-lg ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } transition-colors`}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
                    <XAxis dataKey="day" stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="signups"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Engagement Breakdown */}
              <div
                className={`${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-3 md:mt-4">
                  {engagementData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs md:text-sm">{item.name}</span>
                      </div>
                      <span className="text-xs md:text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Customers */}
              <div
                className={`lg:col-span-2 ${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                  <h3 className="text-base md:text-lg font-semibold">Recent Customers</h3>
                  <button
                    onClick={() => setCurrentPage("customers")}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {recentCustomers.map((customer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">{customer.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {customer.plan} plan
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${customer.mrr}/mo</p>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } flex`}
    >
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 md:w-72 z-50 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md md:rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold">TaskFlow</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-1.5 rounded-md ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } transition-colors md:hidden`}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.key} className="dropdown-container">
                <button
                  onClick={() => {
                    if (item.hasDropdown) {
                      toggleDropdown(item.key)
                    } else {
                      setCurrentPage(item.key)
                      setSidebarOpen(window.innerWidth >= 768) // Close sidebar on mobile after selection
                      closeAllDropdowns()
                    }
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md transition-all duration-150 text-sm ${
                    currentPage === item.key || currentPage.startsWith(item.key + "-")
                      ? `${isDark ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-600"}`
                      : `${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"} hover:text-current`
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <item.icon size={16} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${dropdowns[item.key] ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {item.hasDropdown && dropdowns[item.key] && (
                  <div className="mt-1 ml-5 space-y-0.5">
                    {item.dropdownItems.map((subItem) => (
                      <button
                        key={subItem.key}
                        onClick={() => {
                          setCurrentPage(subItem.key)
                          setSidebarOpen(window.innerWidth >= 768) // Close sidebar on mobile after selection
                          closeAllDropdowns()
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors text-sm ${
                          currentPage === subItem.key
                            ? `${isDark ? "bg-blue-600/10 text-blue-400" : "bg-blue-50 text-blue-600"}`
                            : `${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"} hover:text-current`
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className={`p-2.5 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Zap size={14} className="text-yellow-500" />
                <span className="text-sm font-medium">Usage</span>
              </div>
              <div className="text-xs text-gray-400 mb-1.5">2.1k of 10k API calls</div>
              <div className="w-full bg-gray-600 rounded-full h-1.5">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "21%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-200 ${sidebarOpen ? "ml-64 md:ml-72" : "ml-0"}`}>
        {/* Top Bar */}
        <header
          className={`${
            isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          } border-b backdrop-blur-xl sticky top-0 z-40`}
        >
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 md:py-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-lg md:text-xl font-bold capitalize">
                  {currentPage
                    .replace("-", " ")
                    .replace("customers", "customer management")
                    .replace("analytics", "analytics")}
                </h1>
                <p className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {currentPage === "dashboard"
                    ? "Overview of your SaaS metrics"
                    : currentPage.includes("customers")
                      ? "Manage your customer base"
                      : currentPage.includes("analytics")
                        ? "Detailed performance insights"
                        : "Manage your account settings"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4">
              {/* Search - hidden on mobile */}
              <div className="relative hidden sm:block">
                <Search
                  size={14}
                  className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-9 pr-3 py-1.5 rounded-md w-48 md:w-64 text-sm ${
                    isDark
                      ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                      : "bg-gray-100 border-gray-200 placeholder-gray-500"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>

              {/* Mobile search button */}
              <button
                className={`p-2 rounded-lg sm:hidden ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                <Search size={16} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Notifications */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("notifications")}
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors relative`}
                >
                  <Bell size={16} />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[9px] text-white font-bold">{notifications.length}</span>
                  </div>
                </button>

                {dropdowns.notifications && (
                  <div
                    className={`absolute right-0 mt-2 w-64 sm:w-72 ${
                      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border rounded-lg shadow-lg z-50`}
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-start space-x-2.5">
                            <div
                              className={`p-0.5 rounded-full ${
                                notification.type === "success"
                                  ? "bg-green-100 dark:bg-green-900"
                                  : notification.type === "warning"
                                    ? "bg-yellow-100 dark:bg-yellow-900"
                                    : "bg-blue-100 dark:bg-blue-900"
                              }`}
                            >
                              {notification.type === "success" ? (
                                <CheckCircle size={12} className="text-green-600 dark:text-green-400" />
                              ) : notification.type === "warning" ? (
                                <AlertCircle size={12} className="text-yellow-600 dark:text-yellow-400" />
                              ) : (
                                <Clock size={12} className="text-blue-600 dark:text-blue-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-xs">{notification.message}</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("profile")}
                  className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">A</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium">Alex Chen</p>
                    <p className="text-xs text-gray-500">Founder</p>
                  </div>
                  <ChevronDown size={14} className={`transition-transform ${dropdowns.profile ? "rotate-180" : ""}`} />
                </button>

                {dropdowns.profile && (
                  <div
                    className={`absolute right-0 mt-2 w-48 sm:w-56 ${
                      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border rounded-lg shadow-lg z-50`}
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">A</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Alex Chen</p>
                          <p className="text-xs text-gray-500">alex@taskflow.co</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1.5">
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2.5 text-sm">
                        <User size={14} />
                        <span>Profile Settings</span>
                      </button>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2.5 text-sm">
                        <CreditCard size={14} />
                        <span>Billing</span>
                      </button>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2.5 text-sm">
                        <Shield size={14} />
                        <span>Security</span>
                      </button>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2.5 text-sm">
                        <HelpCircle size={14} />
                        <span>Help & Support</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 py-1.5">
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2.5 text-red-600 text-sm">
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-3 sm:p-4 md:p-6">{renderPage()}</main>
      </div>
    </div>
  )
}

export default Dashboard
