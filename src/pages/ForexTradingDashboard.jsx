import { useState, useEffect, useRef, useMemo } from "react"
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
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
  Activity,
  Target,
  Plus,
  User,
  LogOut,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  StopCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Bitcoin,
  Eye,
  EyeOff,
  TrendingDownIcon as TrendDown,
  BookOpen,
} from "lucide-react"

// TradingView Widget Component
const TradingViewWidget = ({ widgetType, config, height = "400px", className = "" }) => {
  const containerRef = useRef(null)
  const scriptRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ""

    const widgetContainer = document.createElement("div")
    widgetContainer.className = "tradingview-widget-container"

    const widgetDiv = document.createElement("div")
    widgetDiv.className = "tradingview-widget-container__widget"

    const copyrightDiv = document.createElement("div")
    copyrightDiv.className = "tradingview-widget-copyright"
    copyrightDiv.innerHTML =
      '<a href="#" rel="noopener nofollow" target="_blank"></a>'

    widgetContainer.appendChild(widgetDiv)
    widgetContainer.appendChild(copyrightDiv)
    container.appendChild(widgetContainer)

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.async = true

    const scriptSources = {
      "ticker-tape": "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
      "advanced-chart": "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
      "mini-chart": "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js",
      "market-overview": "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
    }

    script.src = scriptSources[widgetType] || scriptSources["advanced-chart"]
    script.innerHTML = JSON.stringify(config)

    widgetContainer.appendChild(script)
    scriptRef.current = script

    return () => {
      if (container && widgetContainer) {
        container.innerHTML = ""
      }
    }
  }, [widgetType, config])

  return <div ref={containerRef} className={className} style={{ height }} />
}

// Trading data
const portfolioData = [
  { day: "Mon", balance: 15200, pnl: 245 },
  { day: "Tue", balance: 15445, pnl: 380 },
  { day: "Wed", balance: 15325, pnl: -120 },
  { day: "Thu", balance: 15845, pnl: 520 },
  { day: "Fri", balance: 16135, pnl: 290 },
  { day: "Sat", balance: 16220, pnl: 85 },
  { day: "Sun", balance: 16330, pnl: 110 },
]

const assetAllocation = [
  { name: "Forex", value: 65, color: "#3B82F6" },
  { name: "Crypto", value: 20, color: "#F59E0B" },
  { name: "Commodities", value: 10, color: "#10B981" },
  { name: "Indices", value: 5, color: "#8B5CF6" },
]

const openPositions = [
  { pair: "EUR/USD", type: "Buy", size: "1.5", entry: "1.0850", current: "1.0875", pnl: "+$375", status: "profit" },
  { pair: "GBP/JPY", type: "Sell", size: "0.8", entry: "185.20", current: "184.95", pnl: "+$200", status: "profit" },
  { pair: "USD/CAD", type: "Buy", size: "2.0", entry: "1.3520", current: "1.3505", pnl: "-$300", status: "loss" },
  { pair: "BTC/USD", type: "Buy", size: "0.1", entry: "43250", current: "44100", pnl: "+$85", status: "profit" },
]

const recentTrades = [
  {
    pair: "EUR/USD",
    type: "Buy",
    size: "2.0",
    entry: "1.0820",
    exit: "1.0865",
    pnl: "+$900",
    time: "2h ago",
    status: "closed",
  },
  {
    pair: "GBP/USD",
    type: "Sell",
    size: "1.5",
    entry: "1.2650",
    exit: "1.2620",
    pnl: "+$450",
    time: "4h ago",
    status: "closed",
  },
  {
    pair: "USD/JPY",
    type: "Buy",
    size: "1.0",
    entry: "149.80",
    exit: "149.45",
    pnl: "-$350",
    time: "6h ago",
    status: "closed",
  },
  {
    pair: "BTC/USD",
    type: "Sell",
    size: "0.05",
    entry: "44200",
    exit: "43800",
    pnl: "+$20",
    time: "1d ago",
    status: "closed",
  },
]

const recentTransactions = [
  { type: "deposit", method: "Credit Card", amount: "+$5,000", status: "completed", time: "2h ago" },
  { type: "withdrawal", method: "Bank Transfer", amount: "-$2,500", status: "pending", time: "1d ago" },
  { type: "deposit", method: "Crypto", amount: "+$1,200", status: "completed", time: "2d ago" },
  { type: "withdrawal", method: "PayPal", amount: "-$800", status: "completed", time: "3d ago" },
]

const cryptoPrices = [
  { symbol: "BTC", name: "Bitcoin", price: "$44,125", change: "+2.4%", trend: "up" },
  { symbol: "ETH", name: "Ethereum", price: "$2,650", change: "-1.2%", trend: "down" },
  { symbol: "ADA", name: "Cardano", price: "$0.485", change: "+5.8%", trend: "up" },
  { symbol: "SOL", name: "Solana", price: "$98.50", change: "+3.1%", trend: "up" },
]

const marketNews = [
  { title: "Fed Signals Potential Rate Cut", time: "15m ago", impact: "high" },
  { title: "EUR/USD Breaks Key Resistance", time: "1h ago", impact: "medium" },
  { title: "Bitcoin Surges Past $44K", time: "2h ago", impact: "high" },
  { title: "Oil Prices Rally on Supply Concerns", time: "3h ago", impact: "medium" },
]

const notifications = [
  { id: 1, type: "success", message: "EUR/USD position closed with +$375 profit", time: "2m ago" },
  { id: 2, type: "warning", message: "Margin level at 150% - consider reducing exposure", time: "15m ago" },
  { id: 3, type: "info", message: "Market opens in 30 minutes", time: "1h ago" },
  { id: 4, type: "success", message: "Deposit of $5,000 processed successfully", time: "2h ago" },
]

const ForexTradingDashboard = () => {
  const [isDark, setIsDark] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [dropdowns, setDropdowns] = useState({
    notifications: false,
    profile: false,
    trading: false,
    account: false,
  })

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const liveTradingChartConfig = useMemo(
    () => ({
      width: "100%",
      height: "400",
      symbol: "FX_IDC:EURUSD",
      interval: "D",
      timezone: "Etc/UTC",
      theme: isDark ? "dark" : "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "tradingview_chart",
    }),
    [isDark],
  ) // Dependency array: only re-create config if isDark changes

  const tickerTapeConfig = useMemo(
    () => ({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      colorTheme: isDark ? "dark" : "light",
      locale: "en",
      isTransparent: false,
      showSymbolLogo: true,
      displayMode: "adaptive",
    }),
    [isDark],
  ) // Dependency array: only re-create config if isDark changes

  const mainChartConfig = useMemo(
    () => ({
      width: "100%",
      height: "400",
      symbol: "FX_IDC:EURUSD", // Default symbol, can be changed
      interval: "D",
      timezone: "Etc/UTC",
      theme: isDark ? "dark" : "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "tradingview_main_chart",
    }),
    [isDark],
  ) // Dependency array: only re-create config if isDark changes

  const kpiCards = [
    {
      title: "Account Balance",
      value: balanceVisible ? "$16,330" : "••••••",
      change: "+18.2%",
      trend: "up",
      icon: Wallet,
      subtitle: "Available: $13,200",
    },
    {
      title: "Today's P&L",
      value: "+$1,245",
      change: "+7.6%",
      trend: "up",
      icon: TrendingUp,
      subtitle: "Unrealized: +$385",
    },
    {
      title: "Open Positions",
      value: "4",
      change: "Active",
      trend: "neutral",
      icon: Activity,
      subtitle: "Exposure: $45K",
    },
    {
      title: "Win Rate",
      value: "73.5%",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      subtitle: "Last 30 days",
    },
  ]

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard", hasDropdown: false },
    {
      icon: TrendingUp,
      label: "Trading",
      key: "trading",
      hasDropdown: true,
      dropdownItems: [
        { label: "Live Trading", key: "trading-live" },
        { label: "Open Positions", key: "trading-positions" },
        { label: "Order History", key: "trading-history" },
        { label: "Market Analysis", key: "trading-analysis" },
      ],
    },
    {
      icon: Bitcoin,
      label: "Crypto",
      key: "crypto",
      hasDropdown: true,
      dropdownItems: [
        { label: "Buy Crypto", key: "crypto-buy" },
        { label: "Crypto Portfolio", key: "crypto-portfolio" },
        { label: "Staking", key: "crypto-staking" },
      ],
    },
    {
      icon: Wallet,
      label: "Account",
      key: "account",
      hasDropdown: true,
      dropdownItems: [
        { label: "Deposit Funds", key: "account-deposit" },
        { label: "Withdraw Funds", key: "account-withdraw" },
        { label: "Transaction History", key: "account-history" },
      ],
    },
    { icon: BarChart3, label: "Analytics", key: "analytics", hasDropdown: false },
    { icon: BookOpen, label: "Education", key: "education", hasDropdown: false },
    { icon: Settings, label: "Settings", key: "settings", hasDropdown: false },
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
      trading: false,
      account: false,
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  useEffect(() => {
    if (windowWidth < 768) {
      setSidebarOpen(false)
    }
  }, [windowWidth])

  const renderPage = () => {
    switch (currentPage) {
      case "crypto":
      case "crypto-buy":
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Buy Cryptocurrency</h2>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm">
                <Bitcoin size={16} />
                <span>Portfolio</span>
              </button>
            </div>

            {/* Crypto Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cryptoPrices.map((crypto, index) => (
                <div
                  key={crypto.symbol}
                  className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{crypto.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{crypto.symbol}</p>
                        <p className="text-xs text-gray-500">{crypto.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{crypto.price}</span>
                    <span
                      className={`text-xs font-medium ${crypto.trend === "up" ? "text-green-500" : "text-red-500"}`}
                    >
                      {crypto.change}
                    </span>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-medium transition-colors">
                    Buy {crypto.symbol}
                  </button>
                </div>
              ))}
            </div>

            {/* Buy Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border`}
              >
                <h3 className="font-semibold mb-4 text-sm">Quick Buy</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Cryptocurrency</label>
                    <select
                      className={`w-full px-3 py-2 rounded border text-sm ${
                        isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Cardano (ADA)</option>
                      <option>Solana (SOL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Amount (USD)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className={`w-full px-3 py-2 rounded border text-sm ${
                        isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm font-medium transition-colors">
                    Buy Crypto
                  </button>
                </div>
              </div>

              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border`}
              >
                <h3 className="font-semibold mb-4 text-sm">Market Trends</h3>
                <div className="space-y-3">
                  {cryptoPrices.slice(0, 3).map((crypto, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{crypto.symbol[0]}</span>
                        </div>
                        <span className="text-sm font-medium">{crypto.symbol}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{crypto.price}</p>
                        <p className={`text-xs ${crypto.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {crypto.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "trading":
      case "trading-live":
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Live Trading</h2>
              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1 transition-colors">
                  <Plus size={14} />
                  <span>New Order</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1 transition-colors">
                  <StopCircle size={14} />
                  <span>Close All</span>
                </button>
              </div>
            </div>

            <TradingViewWidget widgetType="advanced-chart" height="400px" config={liveTradingChartConfig} />

            <div
              className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border overflow-hidden`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-sm">Open Positions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Pair</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Size</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Entry</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Current</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">P&L</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {openPositions.map((position, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-sm">{position.pair}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              position.type === "Buy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {position.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{position.size}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{position.entry}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{position.current}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`font-medium text-sm ${
                              position.status === "profit" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {position.pnl}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="text-red-600 hover:text-red-800 text-xs font-medium mr-2">Close</button>
                          <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            {/* Ticker Tape */}
            <div
              className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border px-2`}
            >
              <TradingViewWidget widgetType="ticker-tape" height="50px" config={tickerTapeConfig} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors">
                <ArrowUpRight size={20} />
                <span className="text-xs font-medium">Deposit</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors">
                <ArrowDownLeft size={20} />
                <span className="text-xs font-medium">Withdraw</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors">
                <Bitcoin size={20} />
                <span className="text-xs font-medium">Buy Crypto</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors">
                <TrendingUp size={20} />
                <span className="text-xs font-medium">Trade</span>
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {kpiCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  } p-4 rounded-lg border hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded bg-gradient-to-r ${
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
                    {index === 0 && (
                      <button
                        onClick={() => setBalanceVisible(!balanceVisible)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    )}
                    {card.trend !== "neutral" && index !== 0 && (
                      <div
                        className={`flex items-center space-x-1 text-xs font-medium ${
                          card.trend === "up" ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {card.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        <span>{card.change}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>
                      {card.title}
                    </h3>
                    <p className="text-lg font-bold mb-1">{card.value}</p>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`lg:col-span-3 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-3`}
              >
                <TradingViewWidget widgetType="advanced-chart" height="400px" config={mainChartConfig} />
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Recent Trades */}
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Recent Trades</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">View all</button>
                </div>
                <div className="space-y-3">
                  {recentTrades.slice(0, 4).map((trade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center ${
                            trade.type === "Buy" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                          }`}
                        >
                          {trade.type === "Buy" ? (
                            <TrendingUp size={12} className="text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendDown size={12} className="text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-xs">{trade.pair}</p>
                          <p className="text-xs text-gray-500">{trade.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium text-xs ${
                            trade.pnl.startsWith("+") ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {trade.pnl}
                        </p>
                        <p className="text-xs text-gray-500">{trade.size} lots</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Recent Transactions</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">View all</button>
                </div>
                <div className="space-y-3">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center ${
                            transaction.type === "deposit"
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-blue-100 dark:bg-blue-900"
                          }`}
                        >
                          {transaction.type === "deposit" ? (
                            <ArrowUpRight size={12} className="text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowDownLeft size={12} className="text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-xs capitalize">{transaction.type}</p>
                          <p className="text-xs text-gray-500">{transaction.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-xs">{transaction.amount}</p>
                        <p
                          className={`text-xs ${
                            transaction.status === "completed"
                              ? "text-green-600"
                              : transaction.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market News */}
              <div
                className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg border`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Market News</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">View all</button>
                </div>
                <div className="space-y-3">
                  {marketNews.map((news, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          news.impact === "high"
                            ? "bg-red-500"
                            : news.impact === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium leading-tight">{news.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{news.time}</p>
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
      }`}
    >
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className={`fixed left-0 top-0 h-full w-64 z-50 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border-r transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-blue-600 rounded flex items-center justify-center">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold">ForexPro</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-1 rounded ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors md:hidden`}
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
                        closeAllDropdowns()
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded transition-all duration-150 text-sm ${
                      currentPage === item.key || currentPage.startsWith(item.key + "-")
                        ? `${isDark ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-600"}`
                        : `${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"} hover:text-current`
                    }`}
                  >
                    <div className="flex items-center space-x-2">
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
                    <div className="mt-1 ml-5 space-y-1">
                      {item.dropdownItems.map((subItem) => (
                        <button
                          key={subItem.key}
                          onClick={() => {
                            setCurrentPage(subItem.key)
                            closeAllDropdowns()
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded transition-colors text-xs ${
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
              <div className={`p-3 rounded ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={14} className="text-green-500" />
                  <span className="text-xs font-medium">Account Verified</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">Pro Plan • Level 3</div>
                <div className="w-full bg-gray-600 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-200 ${sidebarOpen ? "ml-0 md:ml-64" : "ml-0"}`}>
        {/* Top Bar */}
        <header
          className={`${
            isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
          } border-b backdrop-blur-xl sticky top-0 z-40`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-lg font-bold capitalize">
                  {currentPage.replace("-", " ").replace("crypto", "cryptocurrency")}
                </h1>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {currentPage === "dashboard"
                    ? "Your trading overview"
                    : currentPage.includes("crypto")
                      ? "Buy and manage cryptocurrency"
                      : "Manage your account"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative hidden sm:block">
                <Search
                  size={14}
                  className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-8 pr-3 py-1.5 rounded w-48 text-xs ${
                    isDark
                      ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                      : "bg-gray-100 border-gray-200 placeholder-gray-500"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("notifications")}
                  className={`p-2 rounded ${
                    isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors relative`}
                >
                  <Bell size={16} />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                </button>

                {dropdowns.notifications && (
                  <div
                    className={`absolute right-0 mt-2 w-72 ${
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
                          <div className="flex items-start space-x-2">
                            <div
                              className={`p-1 rounded ${
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
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("profile")}
                  className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">J</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-medium">John Trader</p>
                    <p className="text-xs text-gray-500">Pro Account</p>
                  </div>
                  <ChevronDown size={14} className={`transition-transform ${dropdowns.profile ? "rotate-180" : ""}`} />
                </button>

                {dropdowns.profile && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${
                      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border rounded-lg shadow-lg z-50`}
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">J</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">John Trader</p>
                          <p className="text-xs text-gray-500">john@forexpro.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <User size={14} />
                        <span className="text-xs">Profile</span>
                      </button>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Shield size={14} />
                        <span className="text-xs">Security</span>
                      </button>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600">
                        <LogOut size={14} />
                        <span className="text-xs">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4">{renderPage()}</main>
      </div>
    </div>
  )
}

export default ForexTradingDashboard
