import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, CandlestickChart, 
  ArrowUp, ArrowDown, 
  Wallet, Clock, TrendingUp, TrendingDown,
  ChevronDown, Settings, Bell, User, Search,
  Plus, Minus, RefreshCw, History, Bookmark
} from 'lucide-react';

// Mock data generators
const generateRandomPrice = (base, volatility) => 
  (base * (1 + (Math.random() - 0.5) * volatility)).toFixed(2);

const generateCandlestickData = () => {
  const data = [];
  let basePrice = 100;
  for (let i = 0; i < 30; i++) {
    const open = basePrice;
    const close = generateRandomPrice(basePrice, 0.03);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    data.push({ time: i, open, high, low, close });
    basePrice = close;
  }
  return data;
};

const generateAssets = () => [
  { symbol: 'BTC/USD', price: generateRandomPrice(50000, 0.02), change: (Math.random() - 0.5) * 5 },
  { symbol: 'ETH/USD', price: generateRandomPrice(3000, 0.02), change: (Math.random() - 0.5) * 4 },
  { symbol: 'AAPL', price: generateRandomPrice(180, 0.01), change: (Math.random() - 0.5) * 2 },
  { symbol: 'TSLA', price: generateRandomPrice(250, 0.015), change: (Math.random() - 0.5) * 3 },
  { symbol: 'EUR/USD', price: generateRandomPrice(1.08, 0.005), change: (Math.random() - 0.5) * 1 },
  { symbol: 'GOLD', price: generateRandomPrice(1950, 0.008), change: (Math.random() - 0.5) * 1.5 },
];

const generatePositions = () => [
  { symbol: 'BTC/USD', type: 'Long', entry: 49250.32, price: 50120.45, size: 0.5, pnl: 435.65 },
  { symbol: 'TSLA', type: 'Short', entry: 253.12, price: 248.76, size: 10, pnl: 43.60 },
];

const TradingDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState(generateAssets());
  const [positions, setPositions] = useState(generatePositions());
  const [chartData, setChartData] = useState(generateCandlestickData());
  const [chartType, setChartType] = useState('candlestick');
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD');
  const [orderSize, setOrderSize] = useState(0.1);
  const [orderType, setOrderType] = useState('market');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Order filled: BUY 0.5 BTC @ $49,250.32', time: '2 min ago', read: false },
    { id: 2, message: 'Stop loss triggered: TSLA @ $248.76', time: '15 min ago', read: false },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(generateAssets());
      setChartData(generateCandlestickData());
      
      // Update positions with new prices
      setPositions(prev => prev.map(pos => {
        const newPrice = generateRandomPrice(
          pos.type === 'Long' ? pos.price * 1.001 : pos.price * 0.999,
          0.002
        );
        const pnl = pos.type === 'Long' 
          ? (newPrice - pos.entry) * pos.size 
          : (pos.entry - newPrice) * pos.size;
        return { ...pos, price: newPrice, pnl };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Add a new notification
      const newNotification = {
        id: Date.now(),
        message: `Order filled: ${orderType === 'market' ? 'MARKET' : 'LIMIT'} ${orderSize} ${selectedAsset}`,
        time: 'just now',
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }, 1500);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-blue-400">TRADE<span className="text-white">PRO</span></h1>
          <nav className="flex space-x-4">
            {['dashboard', 'markets', 'portfolio', 'history', 'alerts'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700">
            <RefreshCw className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-700 relative">
              <Bell className="w-5 h-5 text-gray-300" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <AnimatePresence>
              {false && ( // Normally this would be toggled by state
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700"
                >
                  <div className="p-2 border-b border-gray-700 font-medium">Notifications</div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-gray-700 text-sm cursor-pointer ${!notification.read ? 'bg-gray-750' : ''}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="font-medium">{notification.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">
            <User className="w-5 h-5" />
            <span>Account</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Watchlist */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="font-medium">Watchlist</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {assets.map((asset) => (
              <motion.div 
                key={asset.symbol}
                whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                className={`p-3 border-b border-gray-700 cursor-pointer flex justify-between items-center ${
                  selectedAsset === asset.symbol ? 'bg-gray-750' : ''
                }`}
                onClick={() => setSelectedAsset(asset.symbol)}
              >
                <div>
                  <div className="font-medium">{asset.symbol}</div>
                  <div className="text-sm text-gray-400">Vol: {(Math.random() * 1000).toFixed(0)}M</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">${parseFloat(asset.price).toLocaleString()}</div>
                  <div className={`text-xs flex items-center justify-end ${
                    asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {asset.change >= 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(asset.change).toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chart Section */}
          <div className="h-2/5 bg-gray-850 border-b border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-medium">{selectedAsset}</h2>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-mono font-bold">
                    ${assets.find(a => a.symbol === selectedAsset)?.price || '0.00'}
                  </span>
                  <span className={`text-sm flex items-center ${
                    (assets.find(a => a.symbol === selectedAsset)?.change || 0) >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {(assets.find(a => a.symbol === selectedAsset)?.change || 0) >= 0 ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {Math.abs(assets.find(a => a.symbol === selectedAsset)?.change || 0).toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                  onClick={() => setChartType('line')}
                >
                  Line
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    chartType === 'candlestick' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                  onClick={() => setChartType('candlestick')}
                >
                  Candlestick
                </button>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <select className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-xs">
                    {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map(interval => (
                      <option key={interval}>{interval}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4">
              {/* This would be replaced with an actual chart library like Lightweight Charts or TradingView */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800 rounded-md border border-gray-700 h-full flex items-center justify-center"
              >
                {chartType === 'candlestick' ? (
                  <CandlestickChart className="w-16 h-16 text-gray-600" />
                ) : (
                  <LineChart className="w-16 h-16 text-gray-600" />
                )}
                <span className="ml-2 text-gray-500">Chart Visualization</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="flex flex-1 overflow-hidden">
            {/* Positions & Order Book */}
            <div className="w-1/3 border-r border-gray-700 flex flex-col">
              {/* Open Positions */}
              <div className="h-1/2 border-b border-gray-700 flex flex-col">
                <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="font-medium flex items-center">
                    <Wallet className="w-4 h-4 mr-2" />
                    Open Positions
                  </h2>
                  <span className="text-xs text-gray-400">{positions.length} active</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {positions.length > 0 ? (
                    positions.map((position) => (
                      <motion.div 
                        key={position.symbol}
                        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                        className="p-3 border-b border-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{position.symbol}</div>
                            <div className="text-xs text-gray-400">
                              {position.type} · Size: {position.size}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-sm">
                              ${parseFloat(position.price).toLocaleString()}
                            </div>
                            <div className={`text-xs flex items-center justify-end ${
                              position.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {position.pnl >= 0 ? (
                                <TrendingUp className="w-3 h-3 mr-1" />
                              ) : (
                                <TrendingDown className="w-3 h-3 mr-1" />
                              )}
                              ${Math.abs(position.pnl).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-400">
                          <span>Entry: ${position.entry.toFixed(2)}</span>
                          <span>Liq: ${(position.price * 0.95).toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No open positions
                    </div>
                  )}
                </div>
              </div>

              {/* Order Book */}
              <div className="h-1/2 flex flex-col">
                <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="font-medium">Order Book</h2>
                  <span className="text-xs text-gray-400">Depth: 10</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="text-xs text-gray-400 px-3 py-1 flex justify-between">
                    <span>Price (USD)</span>
                    <span>Size</span>
                    <span>Total</span>
                  </div>
                  {/* Bids */}
                  {[...Array(5)].map((_, i) => {
                    const price = generateRandomPrice(50000 * 0.999, 0.001);
                    const size = (Math.random() * 2).toFixed(4);
                    return (
                      <div key={`bid-${i}`} className="px-3 py-1 text-xs flex justify-between">
                        <span className="text-green-400">{parseFloat(price).toLocaleString()}</span>
                        <span>{size}</span>
                        <span>{(price * size).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  {/* Spread */}
                  <div className="px-3 py-2 text-center text-xs text-gray-400 border-y border-gray-700">
                    Spread: {(Math.random() * 10).toFixed(2)} (0.02%)
                  </div>
                  {/* Asks */}
                  {[...Array(5)].map((_, i) => {
                    const price = generateRandomPrice(50000 * 1.001, 0.001);
                    const size = (Math.random() * 2).toFixed(4);
                    return (
                      <div key={`ask-${i}`} className="px-3 py-1 text-xs flex justify-between">
                        <span className="text-red-400">{parseFloat(price).toLocaleString()}</span>
                        <span>{size}</span>
                        <span>{(price * size).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Trade Execution Panel */}
            <div className="w-1/3 border-r border-gray-700 p-4 flex flex-col">
              <h2 className="font-medium mb-4">New Order</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Asset</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 appearance-none"
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                    >
                      {assets.map(asset => (
                        <option key={asset.symbol} value={asset.symbol}>{asset.symbol}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Order Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`py-2 rounded-md text-sm ${
                        orderType === 'market' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
                      }`}
                      onClick={() => setOrderType('market')}
                    >
                      Market
                    </button>
                    <button
                      className={`py-2 rounded-md text-sm ${
                        orderType === 'limit' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
                      }`}
                      onClick={() => setOrderType('limit')}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {orderType === 'limit' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Limit Price</label>
                    <input
                      type="number"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                      placeholder="Enter price"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Size</label>
                  <div className="flex items-center space-x-2 mb-2">
                    <button 
                      className="p-1 bg-gray-800 rounded-md hover:bg-gray-700"
                      onClick={() => setOrderSize(prev => Math.max(0.01, prev - 0.01))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-center"
                      value={orderSize}
                      onChange={(e) => setOrderSize(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0.01"
                    />
                    <button 
                      className="p-1 bg-gray-800 rounded-md hover:bg-gray-700"
                      onClick={() => setOrderSize(prev => prev + 0.01)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Available: 2.5 BTC</span>
                    <span>~ ${(orderSize * (assets.find(a => a.symbol === selectedAsset)?.price || 0)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm text-gray-400 mb-1">Slippage Tolerance</label>
                  <input
                    type="range"
                    className="w-full accent-blue-500"
                    min="0.1"
                    max="2"
                    step="0.1"
                    defaultValue="0.5"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.1%</span>
                    <span>2%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="py-3 bg-red-600 hover:bg-red-700 rounded-md font-medium flex items-center justify-center"
                  >
                    <ArrowDown className="w-4 h-4 mr-2" />
                    Sell
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="py-3 bg-green-600 hover:bg-green-700 rounded-md font-medium flex items-center justify-center"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ArrowUp className="w-4 h-4 mr-2" />
                    )}
                    Buy
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Market Data & News */}
            <div className="w-1/3 flex flex-col">
              {/* Market Stats */}
              <div className="h-1/2 border-b border-gray-700 p-4 overflow-y-auto">
                <h2 className="font-medium mb-4">Market Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">S&P 500</div>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-mono">4,567.23</div>
                      <div className="text-green-400 text-sm flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +0.45%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">NASDAQ</div>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-mono">14,256.78</div>
                      <div className="text-red-400 text-sm flex items-center">
                        <ArrowDown className="w-3 h-3 mr-1" />
                        -0.32%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">DXY</div>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-mono">103.45</div>
                      <div className="text-green-400 text-sm flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +0.12%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">VIX</div>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-mono">16.23</div>
                      <div className="text-red-400 text-sm flex items-center">
                        <ArrowDown className="w-3 h-3 mr-1" />
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
                      .map(asset => (
                        <div key={`mover-${asset.symbol}`} className="flex justify-between items-center p-2 bg-gray-800 rounded-md">
                          <div className="font-medium">{asset.symbol}</div>
                          <div className={`text-sm ${
                            asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* News Feed */}
              <div className="h-1/2 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">News</h2>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">See All</button>
                </div>
                <div className="space-y-4">
                  {[
                    "Fed signals potential rate cuts in Q3 amid cooling inflation",
                    "Bitcoin ETFs see record inflows as institutional interest grows",
                    "Tech earnings season kicks off with mixed results",
                    "Oil prices surge after Middle East tensions escalate",
                    "Retail sales data comes in stronger than expected"
                  ].map((headline, i) => (
                    <div key={`news-${i}`} className="p-3 bg-gray-800 rounded-md border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors">
                      <div className="font-medium">{headline}</div>
                      <div className="text-xs text-gray-400 mt-1">{Math.floor(Math.random() * 60)} minutes ago · Bloomberg</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 text-xs text-gray-400 flex justify-between">
        <div className="flex items-center space-x-4">
          <span>Connection: <span className="text-green-400">Live</span></span>
          <span>Last update: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Latency: <span className="text-green-400">{Math.floor(Math.random() * 20)}ms</span></span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;