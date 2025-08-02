import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Send, Download, Eye, EyeOff, Zap, Star, Activity, ChevronDown, Settings, Bell, Search, Filter, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Tooltip } from 'recharts';

const CryptoWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredNFT, setHoveredNFT] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [timeframe, setTimeframe] = useState('24H');
  const [sortBy, setSortBy] = useState('value');
  const [showDropdown, setShowDropdown] = useState(false);

  // Chart data
  const portfolioData = [
    { time: '00:00', value: 8500 }, { time: '04:00', value: 8750 }, { time: '08:00', value: 8900 },
    { time: '12:00', value: 9100 }, { time: '16:00', value: 8950 }, { time: '20:00', value: 9200 },
    { time: '24:00', value: 9005 }
  ];

  const pieData = [
    { name: 'ETH', value: 54.3, color: '#00D4FF' },
    { name: 'BTC', value: 32.1, color: '#7C3AED' },
    { name: 'SOL', value: 13.7, color: '#10B981' },
    { name: 'Others', value: -0.1, color: '#F59E0B' }
  ];

  const performanceData = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 }, { name: 'May', value: 6000 }, { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 }, { name: 'Aug', value: 9005 }
  ];

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊', popular: true },
    { name: 'WalletConnect', icon: '🔗', popular: true },
    { name: 'Coinbase Wallet', icon: '💙', popular: false },
    { name: 'Phantom', icon: '👻', popular: false },
  ];

  const connectionSteps = [
    'Initializing connection...',
    'Detecting wallet...',
    'Requesting permission...',
    'Establishing secure connection...',
    'Syncing portfolio data...',
    'Connection successful!'
  ];

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.456', value: '$4,892.34', change: '+5.2%', positive: true, price: '$1,992.45' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.123', value: '$2,891.45', change: '+2.1%', positive: true, price: '$23,514.67' },
    { symbol: 'SOL', name: 'Solana', balance: '45.67', value: '$1,234.56', change: '-1.3%', positive: false, price: '$27.04' },
    { symbol: 'MATIC', name: 'Polygon', balance: '1,234', value: '$987.65', change: '+8.7%', positive: true, price: '$0.80' }
  ];

  const transactions = [
    { type: 'Received', token: 'ETH', amount: '+0.5', value: '$995.50', time: '2 min ago', positive: true, hash: '0x1a2b3c...' },
    { type: 'Sent', token: 'BTC', amount: '-0.02', value: '$472.18', time: '1 hour ago', positive: false, hash: '0x4d5e6f...' },
    { type: 'Swap', token: 'MATIC→ETH', amount: '100→0.1', value: '$199.40', time: '3 hours ago', positive: true, hash: '0x7g8h9i...' },
    { type: 'Received', token: 'SOL', amount: '+5', value: '$135.25', time: '1 day ago', positive: true, hash: '0xj1k2l3...' }
  ];

  const nfts = [
    { id: 1, name: 'Cyber Punk #4521', collection: 'CyberPunks', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop', value: '2.5 ETH', floor: '2.1 ETH' },
    { id: 2, name: 'Neon Cat #892', collection: 'Digital Cats', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop', value: '1.8 ETH', floor: '1.5 ETH' },
    { id: 3, name: 'Space Warrior #1337', collection: 'Galactic Heroes', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=300&fit=crop', value: '3.2 ETH', floor: '2.9 ETH' },
    { id: 4, name: 'Crystal Dragon #666', collection: 'Mystic Beasts', image: 'https://images.unsplash.com/photo-1578662996546-bee48611ec7a?w=300&h=300&fit=crop', value: '4.1 ETH', floor: '3.8 ETH' }
  ];

  const connectWallet = async (walletName) => {
    setSelectedWallet(walletName);
    setIsConnecting(true);
    setConnectionStep(0);

    for (let i = 0; i < connectionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConnectionStep(i);
    }

    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 500);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-cyan-400 font-medium">{`${label}: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  if (!isConnected && !isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-500/10 to-transparent animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-500/10 to-transparent animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-cyan-500/25">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  NeoWallet
                </h1>
                <p className="text-gray-400">Connect your wallet to get started</p>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {walletOptions.map((wallet, index) => (
                  <button
                    key={index}
                    onClick={() => connectWallet(wallet.name)}
                    className="w-full flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="text-left">
                        <p className="font-medium">{wallet.name}</p>
                        {wallet.popular && (
                          <p className="text-xs text-cyan-400">Popular</p>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  By connecting a wallet, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Connecting to {selectedWallet}</h2>
          <div className="mb-6">
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-800"
                style={{ width: `${((connectionStep + 1) / connectionSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-400 animate-pulse">{connectionSteps[connectionStep]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-500/5 to-transparent animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-500/5 to-transparent animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    NeoWallet
                  </h1>
                </div>
                
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 min-w-[200px]">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search tokens, NFTs..."
                    className="bg-transparent outline-none text-sm flex-1 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-green-500/20 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Balance Overview - Compact */}
          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold">
                      {showBalance ? '$9,005.00' : '••••••'}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+12.5% ($1,002.34)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Timeframe Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                    >
                      {timeframe}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg py-1 min-w-[80px] z-50">
                        {['1H', '24H', '7D', '30D', '1Y'].map((period) => (
                          <button
                            key={period}
                            onClick={() => {
                              setTimeframe(period);
                              setShowDropdown(false);
                            }}
                            className="w-full px-3 py-1 text-sm hover:bg-white/10 transition-colors text-left"
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Mini Chart */}
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="url(#gradient)" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:col-span-2">
              <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-xl transition-all duration-300 border border-green-500/20 group">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-green-400">Receive</p>
                  <p className="text-xs text-gray-400">Get crypto</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-xl transition-all duration-300 border border-blue-500/20 group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-blue-400">Send</p>
                  <p className="text-xs text-gray-400">Transfer crypto</p>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 mb-6 bg-white/5 backdrop-blur-lg rounded-xl p-1 border border-white/10">
            {['overview', 'nfts', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Portfolio */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      Portfolio
                    </h3>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/10 rounded-lg px-2 py-1 text-xs border border-white/20 outline-none"
                      >
                        <option value="value">Sort by Value</option>
                        <option value="change">Sort by Change</option>
                        <option value="name">Sort by Name</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {tokens.map((token, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                            {token.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{token.name}</p>
                            <p className="text-gray-400 text-xs">{token.balance} {token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{token.value}</p>
                          <div className="flex items-center gap-1">
                            <p className={`text-xs ${token.positive ? 'text-green-400' : 'text-red-400'}`}>
                              {token.change}
                            </p>
                            <p className="text-gray-500 text-xs">{token.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <h3 className="font-bold mb-4">Performance</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D4FF" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Asset Allocation */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <h3 className="font-bold mb-4">Asset Allocation</h3>
                  <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={50}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Recent Activity</h3>
                    <button className="text-cyan-400 text-sm hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((tx, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            tx.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {tx.positive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{tx.type}</p>
                            <p className="text-gray-400 text-xs">{tx.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium text-sm ${tx.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.amount} {tx.token}
                          </p>
                          <p className="text-gray-400 text-xs">{tx.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nfts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold">My NFTs</h2>
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-lg text-sm">{nfts.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                  <select className="bg-white/10 rounded-lg px-3 py-2 text-sm border border-white/20 outline-none">
                    <option>Recently Added</option>
                    <option>Price: High to Low</option>
                    <option>Price: Low to High</option>
                  </select>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nfts.map((nft) => (
                  <div
                    key={nft.id}
                    className="group bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105"
                    onMouseEnter={() => setHoveredNFT(nft.id)}
                    onMouseLeave={() => setHoveredNFT(null)}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className={`w-full h-40 object-cover transition-transform duration-700 ${
                          hoveredNFT === nft.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                        hoveredNFT === nft.id ? 'opacity-100' : 'opacity-0'
                      }`} />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button className={`p-1 bg-black/50 rounded-full transition-all duration-300 ${
                          hoveredNFT === nft.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}>
                          <ExternalLink className="w-3 h-3 text-white" />
                        </button>
                        <button className={`p-1 bg-black/50 rounded-full transition-all duration-300 ${
                          hoveredNFT === nft.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}>
                          <Star className="w-3 h-3 text-yellow-400" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{nft.name}</h4>
                      <p className="text-gray-400 text-xs mb-2">{nft.collection}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-cyan-400 font-medium text-sm">{nft.value}</p>
                          <p className="text-gray-500 text-xs">Floor: {nft.floor}</p>
                        </div>
                        <button className="text-xs text-cyan-400 hover:underline">View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <div className="flex items-center gap-2">
                  <select className="bg-white/10 rounded-lg px-3 py-2 text-sm border border-white/20 outline-none">
                    <option>All Transactions</option>
                    <option>Sent</option>
                    <option>Received</option>
                    <option>Swapped</option>
                  </select>
                  <button className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr className="text-left">
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Type</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Asset</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Amount</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Value</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Time</th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-400">Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {[...transactions, ...transactions.map(tx => ({...tx, time: '2 days ago'}))].map((tx, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {tx.positive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                              </div>
                              <span className="font-medium text-sm">{tx.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                                {tx.token.slice(0, 2)}
                              </div>
                              <span className="text-sm">{tx.token}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-medium text-sm ${tx.positive ? 'text-green-400' : 'text-red-400'}`}>
                              {tx.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm">{tx.value}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-400 text-sm">{tx.time}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm font-mono">{tx.hash}</span>
                              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <Copy className="w-3 h-3 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <ExternalLink className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoWallet;