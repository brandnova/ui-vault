"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  CandlestickChart,
  ArrowUp,
  ArrowDown,
  Wallet,
  Clock,
  ChevronDown,
  Settings,
  Bell,
  User,
  Plus,
  Minus,
  RefreshCw,
  Zap,
} from "lucide-react"

// Mock data generators
const generateRandomPrice = (base, volatility) => (base * (1 + (Math.random() - 0.5) * volatility)).toFixed(2)

const generateCandlestickData = () => {
  const data = []
  let basePrice = 100
  for (let i = 0; i < 30; i++) {
    const open = basePrice
    const close = generateRandomPrice(basePrice, 0.03)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    data.push({ time: i, open, high, low, close })
    basePrice = close
  }
  return data
}

const generateAssets = () => [
  {
    symbol: "BTC/USD",
    price: generateRandomPrice(50000, 0.02),
    change: (Math.random() - 0.5) * 5,
    volume: (Math.random() * 1000).toFixed(0) + "M",
  },
  {
    symbol: "ETH/USD",
    price: generateRandomPrice(3000, 0.02),
    change: (Math.random() - 0.5) * 4,
    volume: (Math.random() * 500).toFixed(0) + "M",
  },
  {
    symbol: "AAPL",
    price: generateRandomPrice(180, 0.01),
    change: (Math.random() - 0.5) * 2,
    volume: (Math.random() * 200).toFixed(0) + "M",
  },
  {
    symbol: "TSLA",
    price: generateRandomPrice(250, 0.015),
    change: (Math.random() - 0.5) * 3,
    volume: (Math.random() * 150).toFixed(0) + "M",
  },
  {
    symbol: "EUR/USD",
    price: generateRandomPrice(1.08, 0.005),
    change: (Math.random() - 0.5) * 1,
    volume: (Math.random() * 800).toFixed(0) + "M",
  },
  {
    symbol: "GOLD",
    price: generateRandomPrice(1950, 0.008),
    change: (Math.random() - 0.5) * 1.5,
    volume: (Math.random() * 100).toFixed(0) + "M",
  },
  {
    symbol: "GOOG",
    price: generateRandomPrice(150, 0.01),
    change: (Math.random() - 0.5) * 1.8,
    volume: (Math.random() * 120).toFixed(0) + "M",
  },
  {
    symbol: "AMZN",
    price: generateRandomPrice(170, 0.012),
    change: (Math.random() - 0.5) * 2.5,
    volume: (Math.random() * 180).toFixed(0) + "M",
  },
]

const generatePositions = () => [
  { symbol: "BTC/USD", type: "Long", entry: 49250.32, price: 50120.45, size: 0.5, pnl: 435.65 },
  { symbol: "TSLA", type: "Short", entry: 253.12, price: 248.76, size: 10, pnl: 43.6 },
  { symbol: "ETH/USD", type: "Long", entry: 2980.0, price: 3050.1, size: 2.0, pnl: 140.2 },
]

const TradingDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [assets, setAssets] = useState(generateAssets())
  const [positions, setPositions] = useState(generatePositions())
  const [chartData, setChartData] = useState(generateCandlestickData())
  const [chartType, setChartType] = useState("candlestick")
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD")
  const [orderSize, setOrderSize] = useState(0.1)
  const [orderType, setOrderType] = useState("market")
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Order filled: BUY 0.5 BTC @ $49,250.32", time: "2 min ago", read: false },
    { id: 2, message: "Stop loss triggered: TSLA @ $248.76", time: "15 min ago", read: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // Initialize as false, update in useEffect

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(generateAssets())
      setChartData(generateCandlestickData())

      // Update positions with new prices
      setPositions((prev) =>
        prev.map((pos) => {
          const currentAssetPrice = Number.parseFloat(assets.find((a) => a.symbol === pos.symbol)?.price || pos.price)
          const newPrice = generateRandomPrice(currentAssetPrice, 0.002)
          const pnl = pos.type === "Long" ? (newPrice - pos.entry) * pos.size : (pos.entry - newPrice) * pos.size
          return { ...pos, price: newPrice, pnl }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [assets]) // Depend on assets to get updated prices for position PnL calculation

  const handlePlaceOrder = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Add a new notification
      const newNotification = {
        id: Date.now(),
        message: `Order filled: ${orderType === "market" ? "MARKET" : "LIMIT"} ${orderSize} ${selectedAsset}`,
        time: "just now",
        read: false,
      }
      setNotifications([newNotification, ...notifications])
    }, 1500)
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getPriceChangeColor = (change) => {
    return change >= 0 ? "text-green-400" : "text-red-400"
  }

  const getPriceChangeIcon = (change) => {
    return change >= 0 ? <ArrowUp className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 shadow-lg z-20">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl md:text-2xl font-extrabold text-white">
              TRADE<span className="text-purple-400">FLOW</span>
            </h1>
          </div>
          {!isMobile && (
            <nav className="flex space-x-2 md:space-x-4 bg-gray-800 rounded-full p-1">
              {["dashboard", "markets", "portfolio", "history", "alerts"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center space-x-3 md:space-x-5">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
          {!isMobile && (
            <>
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-800 relative transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-72 bg-gray-800 rounded-lg shadow-xl z-30 border border-gray-700 animate-fade-in-down">
                    <div className="p-3 border-b border-gray-700 font-semibold text-sm text-white">Notifications</div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-700 text-sm cursor-pointer transition-colors ${!notification.read ? "bg-gray-700/30 hover:bg-gray-700/50" : "hover:bg-gray-800"}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="font-medium text-white">{notification.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            <User className="w-4 h-4" />
            {!isMobile && <span>Account</span>}
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Left Sidebar - Watchlist - Hidden on mobile by default */}
        {!isMobile && (
          <div className="w-full md:w-72 bg-gray-900 border-r border-gray-800 flex flex-col shadow-inner">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-white">Watchlist</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">Edit</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`p-4 border-b border-gray-800 cursor-pointer flex justify-between items-center transition-colors duration-200 ${
                    selectedAsset === asset.symbol ? "bg-gray-800 border-l-4 border-purple-500" : "hover:bg-gray-850"
                  }`}
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <div>
                    <div className="font-medium text-base text-white">{asset.symbol}</div>
                    <div className="text-xs text-gray-400">Vol: {asset.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-base text-white">
                      ${Number.parseFloat(asset.price).toLocaleString()}
                    </div>
                    <div className={`text-xs flex items-center justify-end ${getPriceChangeColor(asset.change)}`}>
                      {getPriceChangeIcon(asset.change)}
                      {Math.abs(asset.change).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chart Section */}
          <div className="h-72 md:h-2/5 bg-gray-900 border-b border-gray-800 flex flex-col shadow-inner">
            <div className="p-3 md:p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-semibold text-lg text-white">{selectedAsset}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-2xl font-mono font-bold text-white">
                    $
                    {Number.parseFloat(
                      assets.find((a) => a.symbol === selectedAsset)?.price || "0.00",
                    ).toLocaleString()}
                  </span>
                  <span
                    className={`text-sm flex items-center ${getPriceChangeColor(assets.find((a) => a.symbol === selectedAsset)?.change || 0)}`}
                  >
                    {getPriceChangeIcon(assets.find((a) => a.symbol === selectedAsset)?.change || 0)}
                    {Math.abs(assets.find((a) => a.symbol === selectedAsset)?.change || 0).toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    chartType === "line" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setChartType("line")}
                >
                  Line
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    chartType === "candlestick"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setChartType("candlestick")}
                >
                  Candle
                </button>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <select className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm focus:ring-purple-500 focus:border-purple-500">
                    {["1m", "5m", "15m", "1h", "4h", "1d", "1w"].map((interval) => (
                      <option key={interval}>{interval}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4">
              {/* Placeholder for TradingView chart widget */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 h-full flex items-center justify-center text-gray-600 text-lg">
                {chartType === "candlestick" ? (
                  <CandlestickChart className="w-16 h-16 text-gray-700" />
                ) : (
                  <LineChart className="w-16 h-16 text-gray-700" />
                )}
                <span className="ml-4">Chart Visualization</span>
              </div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
            {/* Positions & Order Book - Stack vertically on mobile */}
            <div className="w-full md:w-1/3 border-b md:border-r border-gray-800 flex flex-col shadow-inner">
              {/* Open Positions */}
              <div className="h-1/2 border-b border-gray-800 flex flex-col">
                <div className="p-3 md:p-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="font-semibold text-base md:text-lg flex items-center text-white">
                    <Wallet className="w-4 h-4 mr-2 text-purple-400" />
                    Open Positions
                  </h2>
                  <span className="text-sm text-gray-400">{positions.length} active</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {positions.length > 0 ? (
                    positions.map((position) => (
                      <div
                        key={position.symbol + position.type}
                        className="p-3 md:p-4 border-b border-gray-800 hover:bg-gray-850 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-base text-white">{position.symbol}</div>
                            <div className="text-xs text-gray-400">
                              {position.type} · Size: {position.size}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-sm text-white">
                              ${Number.parseFloat(position.price).toLocaleString()}
                            </div>
                            <div
                              className={`text-xs flex items-center justify-end ${getPriceChangeColor(position.pnl)}`}
                            >
                              {getPriceChangeIcon(position.pnl)}${Math.abs(position.pnl).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>Entry: ${position.entry.toFixed(2)}</span>
                          <span>Liq: ${(position.price * (position.type === "Long" ? 0.95 : 1.05)).toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No open positions</div>
                  )}
                </div>
              </div>

              {/* Order Book */}
              <div className="h-1/2 flex flex-col">
                <div className="p-3 md:p-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="font-semibold text-base md:text-lg text-white">Order Book</h2>
                  <span className="text-sm text-gray-400">Depth: 10</span>
                </div>
                <div className="flex-1 overflow-y-auto text-sm custom-scrollbar">
                  <div className="text-gray-400 px-4 py-2 flex justify-between font-medium border-b border-gray-800">
                    <span>Price</span>
                    <span>Size</span>
                    <span>Total</span>
                  </div>
                  {/* Bids */}
                  {[...Array(5)].map((_, i) => {
                    const price = Number.parseFloat(
                      generateRandomPrice(
                        Number.parseFloat(assets.find((a) => a.symbol === selectedAsset)?.price || "50000") * 0.999,
                        0.001,
                      ),
                    )
                    const size = (Math.random() * 2).toFixed(4)
                    return (
                      <div
                        key={`bid-${i}`}
                        className="px-4 py-2 flex justify-between hover:bg-gray-850 transition-colors"
                      >
                        <span className="text-green-400 font-mono">{price.toLocaleString()}</span>
                        <span className="font-mono">{size}</span>
                        <span className="font-mono">{(price * Number.parseFloat(size)).toFixed(2)}</span>
                      </div>
                    )
                  })}
                  {/* Spread */}
                  <div className="px-4 py-2 text-center text-gray-500 border-y border-gray-800 bg-gray-850">
                    Spread: {(Math.random() * 10).toFixed(2)} (0.02%)
                  </div>
                  {/* Asks */}
                  {[...Array(5)].map((_, i) => {
                    const price = Number.parseFloat(
                      generateRandomPrice(
                        Number.parseFloat(assets.find((a) => a.symbol === selectedAsset)?.price || "50000") * 1.001,
                        0.001,
                      ),
                    )
                    const size = (Math.random() * 2).toFixed(4)
                    return (
                      <div
                        key={`ask-${i}`}
                        className="px-4 py-2 flex justify-between hover:bg-gray-850 transition-colors"
                      >
                        <span className="text-red-400 font-mono">{price.toLocaleString()}</span>
                        <span className="font-mono">{size}</span>
                        <span className="font-mono">{(price * Number.parseFloat(size)).toFixed(2)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Trade Execution Panel */}
            <div className="w-full md:w-1/3 border-b md:border-r border-gray-800 p-4 flex flex-col shadow-inner">
              <h2 className="font-semibold text-lg text-white mb-4">New Order</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Asset</label>
                  <div className="relative">
                    <select
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-base text-white appearance-none focus:ring-purple-500 focus:border-purple-500"
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                    >
                      {assets.map((asset) => (
                        <option key={asset.symbol} value={asset.symbol}>
                          {asset.symbol}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Order Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`py-2 text-base rounded-lg font-medium transition-colors ${
                        orderType === "market"
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => setOrderType("market")}
                    >
                      Market
                    </button>
                    <button
                      className={`py-2 text-base rounded-lg font-medium transition-colors ${
                        orderType === "limit"
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => setOrderType("limit")}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {orderType === "limit" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Limit Price</label>
                    <input
                      type="number"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-base text-white focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter price"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Size</label>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      onClick={() => setOrderSize((prev) => Math.max(0.01, prev - 0.01))}
                    >
                      <Minus className="w-5 h-5 text-gray-300" />
                    </button>
                    <input
                      type="number"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-center text-base text-white focus:ring-purple-500 focus:border-purple-500"
                      value={orderSize}
                      onChange={(e) => setOrderSize(Number.parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0.01"
                    />
                    <button
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      onClick={() => setOrderSize((prev) => prev + 0.01)}
                    >
                      <Plus className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Available: 2.5 BTC</span>
                    <span>
                      ~ $
                      {(
                        orderSize *
                        (Number.parseFloat(assets.find((a) => a.symbol === selectedAsset)?.price || "0") || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm text-gray-400 mb-2">Slippage Tolerance</label>
                  <input
                    type="range"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    min="0.1"
                    max="2"
                    step="0.1"
                    defaultValue="0.5"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.1%</span>
                    <span>2%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button className="py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-base flex items-center justify-center transition-colors shadow-md">
                    <ArrowDown className="w-5 h-5 mr-2" />
                    Sell
                  </button>
                  <button
                    className="py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-base flex items-center justify-center transition-colors shadow-md"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <ArrowUp className="w-5 h-5 mr-2" />
                    )}
                    Buy
                  </button>
                </div>
              </div>
            </div>

            {/* Market Data & News */}
            <div className="w-full md:w-1/3 flex flex-col">
              {/* Market Stats */}
              <div className="h-1/2 border-b border-gray-800 p-4 overflow-y-auto custom-scrollbar shadow-inner">
                <h2 className="font-semibold text-lg text-white mb-4">Market Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-sm text-gray-400 mb-1">S&P 500</div>
                    <div className="flex items-end justify-between">
                      <div className="text-lg font-mono text-white">4,567.23</div>
                      <div className="text-green-400 text-sm flex items-center">
                        <ArrowUp className="w-4 h-4 mr-1" />
                        +0.45%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-sm text-gray-400 mb-1">NASDAQ</div>
                    <div className="flex items-end justify-between">
                      <div className="text-lg font-mono text-white">14,256.78</div>
                      <div className="text-red-400 text-sm flex items-center">
                        <ArrowDown className="w-4 h-4 mr-1" />
                        -0.32%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-sm text-gray-400 mb-1">DXY</div>
                    <div className="flex items-end justify-between">
                      <div className="text-lg font-mono text-white">103.45</div>
                      <div className="text-green-400 text-sm flex items-center">
                        <ArrowUp className="w-4 h-4 mr-1" />
                        +0.12%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-sm text-gray-400 mb-1">VIX</div>
                    <div className="flex items-end justify-between">
                      <div className="text-lg font-mono text-white">16.23</div>
                      <div className="text-red-400 text-sm flex items-center">
                        <ArrowDown className="w-4 h-4 mr-1" />
                        -2.1%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Top Movers</div>
                  <div className="space-y-2">
                    {assets
                      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
                      .slice(0, 3)
                      .map((asset) => (
                        <div
                          key={`mover-${asset.symbol}`}
                          className="flex justify-between items-center p-3 bg-gray-900 rounded-lg border border-gray-800 text-sm shadow-sm"
                        >
                          <div className="font-medium text-white">{asset.symbol}</div>
                          <div className={`${getPriceChangeColor(asset.change)}`}>
                            {asset.change >= 0 ? "+" : ""}
                            {asset.change.toFixed(2)}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* News Feed */}
              <div className="h-1/2 p-4 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-white">News Feed</h2>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">See All</button>
                </div>
                <div className="space-y-3">
                  {[
                    "Fed signals potential rate cuts in Q3 amid cooling inflation",
                    "Bitcoin ETFs see record inflows as institutional interest grows",
                    "Tech earnings season kicks off with mixed results",
                    "Oil prices surge after Middle East tensions escalate",
                    "Retail sales data comes in stronger than expected",
                    "Global markets react to new geopolitical developments",
                    "AI sector continues rapid expansion, new startups emerge",
                    "Central banks consider digital currencies for future transactions",
                  ].map((headline, i) => (
                    <div
                      key={`news-${i}`}
                      className="p-3 bg-gray-900 rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-850 transition-colors shadow-sm"
                    >
                      <div className="font-medium text-sm text-white">{headline}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.floor(Math.random() * 60)} min ago · Bloomberg
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <footer className="bg-gray-900 border-t border-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between items-center shadow-lg z-20">
        <div className="flex items-center space-x-4">
          <span>
            Connection: <span className="text-green-400 font-medium">Live</span>
          </span>
          <span>Last update: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>
            Latency: <span className="text-green-400 font-medium">{Math.floor(Math.random() * 20)}ms</span>
          </span>
          <span>v2.5.0</span>
        </div>
      </footer>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* gray-800 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563; /* gray-600 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280; /* gray-500 */
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default TradingDashboard
