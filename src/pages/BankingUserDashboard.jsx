import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Settings, 
  User, 
  Bell, 
  Search,
  ChevronDown,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Menu,
  X,
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  Plus,
  Download,
  Upload,
  CreditCard as Card,
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';

const BankingUserDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  // Sample data
  const accounts = [
    { name: 'Checking Account', number: '****1234', balance: 5420.50, type: 'checking' },
    { name: 'Savings Account', number: '****5678', balance: 12850.75, type: 'savings' },
    { name: 'Credit Card', number: '****9012', balance: -1205.30, type: 'credit', limit: 5000 }
  ];

  const recentTransactions = [
    { id: 1, description: 'Direct Deposit - Payroll', amount: 3500.00, date: '2024-08-06', type: 'credit', category: 'Income' },
    { id: 2, description: 'Amazon Purchase', amount: -89.99, date: '2024-08-05', type: 'debit', category: 'Shopping' },
    { id: 3, description: 'Electric Bill Payment', amount: -125.50, date: '2024-08-04', type: 'debit', category: 'Utilities' },
    { id: 4, description: 'ATM Withdrawal', amount: -100.00, date: '2024-08-03', type: 'debit', category: 'Cash' },
    { id: 5, description: 'Restaurant', amount: -45.25, date: '2024-08-02', type: 'debit', category: 'Dining' },
    { id: 6, description: 'Refund - Online Store', amount: 35.00, date: '2024-08-01', type: 'credit', category: 'Refund' }
  ];

  const notifications = [
    { id: 1, title: 'Payment received', message: 'Your deposit of $3500.00 has been processed', time: '2 hours ago', read: false },
    { id: 2, title: 'Account alert', message: 'Your credit card payment is due in 3 days', time: '1 day ago', read: false },
    { id: 3, title: 'Security notice', message: 'New login detected from Chrome on Windows', time: '2 days ago', read: true }
  ];

  const chartData = [
    { name: 'Jan', balance: 4200 },
    { name: 'Feb', balance: 4800 },
    { name: 'Mar', balance: 4100 },
    { name: 'Apr', balance: 5200 },
    { name: 'May', balance: 4900 },
    { name: 'Jun', balance: 5400 },
    { name: 'Jul', balance: 5100 },
    { name: 'Aug', balance: 5420 }
  ];

  const spendingData = [
    { category: 'Dining', amount: 320, color: '#3b82f6' },
    { category: 'Shopping', amount: 580, color: '#10b981' },
    { category: 'Utilities', amount: 245, color: '#f59e0b' },
    { category: 'Gas', amount: 180, color: '#6366f1' },
    { category: 'Entertainment', amount: 150, color: '#ec4899' }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: CreditCard, label: 'Accounts', id: 'accounts' },
    { icon: ArrowUpRight, label: 'Transactions', id: 'transactions' },
    { icon: Card, label: 'Cards', id: 'cards' },
    { icon: DollarSign, label: 'Loans', id: 'loans' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  const filteredTransactions = recentTransactions.filter(transaction => {
    if (transactionFilter === 'all') return true;
    return transaction.type === transactionFilter;
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const themeClasses = darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">SecureBank</h2>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400' : ''
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Shield size={20} className="mr-3" />
            <span>Security Center</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <HelpCircle size={20} className="mr-3" />
            <span>Help & Support</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 sm:px-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold">{sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden md:block">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-56`}
                />
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Notifications dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>
                {notificationsOpen && (
                  <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-md shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} z-50`}>
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-sm text-blue-600 dark:text-blue-400">Mark all as read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-200 dark:border-gray-700 ${!notification.read ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-sm text-blue-600 dark:text-blue-400">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <span className="hidden md:inline text-sm">John Doe</span>
                  <ChevronDown size={16} />
                </button>
                {profileOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} z-50`}>
                    <div className="py-1">
                      <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Profile Settings</a>
                      <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Security</a>
                      <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Help Center</a>
                      <div className="border-t border-gray-200 dark:border-gray-700"></div>
                      <a href="#" className={`block px-4 py-2 text-sm flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6">
          {/* Quick actions bar */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button 
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}
            >
              <Plus size={16} className="mr-2" />
              <span>Quick Actions</span>
              <ChevronDown size={16} className={`ml-2 transition-transform ${quickActionsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {quickActionsOpen && (
              <div className="w-full flex flex-wrap gap-2">
                <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                  <Download size={16} className="mr-2" />
                  <span>Transfer</span>
                </button>
                <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                  <Upload size={16} className="mr-2" />
                  <span>Pay Bills</span>
                </button>
                <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                  <DollarSign size={16} className="mr-2" />
                  <span>Deposit</span>
                </button>
              </div>
            )}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Account cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {accounts.map((account, index) => (
                  <div key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-600 dark:text-gray-300">{account.name}</h3>
                      <CreditCard size={20} className={account.type === 'credit' ? 'text-red-500' : 'text-blue-500'} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xl sm:text-2xl font-bold ${account.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {balanceVisible ? formatCurrency(account.balance) : '••••••'}
                      </span>
                      <button 
                        onClick={() => setBalanceVisible(!balanceVisible)}
                        className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        {balanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">{account.number}</p>
                    {account.type === 'credit' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Available Credit</span>
                          <span>${(account.limit + account.balance).toFixed(2)}</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mt-1`}>
                          <div 
                            className={`h-2 rounded-full ${Math.abs(account.balance) / account.limit > 0.75 ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{width: `${((Math.abs(account.balance) / account.limit) * 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Charts section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-semibold">Account Balance Trend</h3>
                    <div className="flex space-x-1 sm:space-x-2">
                      <button className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${dateRange === '30days' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`} onClick={() => setDateRange('30days')}>30D</button>
                      <button className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${dateRange === '90days' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`} onClick={() => setDateRange('90days')}>90D</button>
                      <button className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${dateRange === '1year' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`} onClick={() => setDateRange('1year')}>1Y</button>
                    </div>
                  </div>
                  <div className="h-48 sm:h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip 
                          contentStyle={darkMode ? { backgroundColor: '#1f2937', borderColor: '#374151' } : { backgroundColor: '#fff', borderColor: '#e5e7eb' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          activeDot={{ r: 5, strokeWidth: 0 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6`}>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">Spending by Category</h3>
                  <div className="h-48 sm:h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spendingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="category" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip 
                          contentStyle={darkMode ? { backgroundColor: '#1f2937', borderColor: '#374151' } : { backgroundColor: '#fff', borderColor: '#e5e7eb' }}
                        />
                        <Bar dataKey="amount">
                          {spendingData.map((entry, index) => (
                            <Bar key={`bar-${index}`} dataKey="amount" fill={entry.color} radius={[4, 4, 0, 0]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent transactions */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Recent Transactions</h3>
                  <div className="flex space-x-2">
                    <select 
                      value={transactionFilter} 
                      onChange={(e) => setTransactionFilter(e.target.value)}
                      className={`px-2 sm:px-3 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} text-xs sm:text-sm`}
                    >
                      <option value="all">All</option>
                      <option value="credit">Credits</option>
                      <option value="debit">Debits</option>
                    </select>
                    <button className="flex items-center space-x-1 px-2 sm:px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Filter size={12} className="sm:mr-1" />
                      <span className="hidden sm:inline">Filter</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                          {transaction.type === 'credit' ? 
                            <ArrowDownLeft size={14} className="text-green-600 dark:text-green-400" /> : 
                            <ArrowUpRight size={14} className="text-red-600 dark:text-red-400" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{transaction.description}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {transaction.category} • {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm sm:text-base ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base">
                  View All Transactions
                </button>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">My Accounts</h2>
                <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base">
                  <Plus size={16} className="mr-1" />
                  Open New Account
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {accounts.map((account, index) => (
                  <div key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base sm:text-lg font-semibold">{account.name}</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs sm:text-sm">
                          Details
                        </button>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs sm:text-sm">
                          Transfer
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Account Number: {account.number}</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Account Type: {account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                      <p className={`text-lg sm:text-xl font-bold ${account.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {formatCurrency(account.balance)}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className={`px-3 py-1 rounded text-xs sm:text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        Statements
                      </button>
                      <button className={`px-3 py-1 rounded text-xs sm:text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        History
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">Transaction History</h2>
                <div className="flex flex-wrap gap-2">
                  <select className={`px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-sm`}>
                    <option>All Accounts</option>
                    <option>Checking Account</option>
                    <option>Savings Account</option>
                    <option>Credit Card</option>
                  </select>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      className={`pl-10 pr-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-sm`} 
                    />
                  </div>
                  <select className={`px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-sm`}>
                    <option>All Categories</option>
                    <option>Income</option>
                    <option>Shopping</option>
                    <option>Utilities</option>
                    <option>Dining</option>
                  </select>
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-xs sm:text-sm`}>
                      <tr>
                        <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Account</th>
                        <th className="px-4 py-3 text-right font-medium uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 whitespace-nowrap">{formatDate(transaction.date)}</td>
                          <td className="px-4 py-3">{transaction.description}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {accounts.find(a => a.type !== 'credit')?.name || 'Credit Card'}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-right font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing 1 to 6 of 6 entries
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-sm`}>
                      Previous
                    </button>
                    <button className={`px-3 py-1 rounded bg-blue-500 text-white text-sm`}>
                      1
                    </button>
                    <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-sm`}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">My Cards</h2>
                <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base">
                  <Plus size={16} className="mr-1" />
                  Request New Card
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Debit Card */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 sm:p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs opacity-80">Debit Card</p>
                        <p className="text-lg font-semibold">SecureBank</p>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-xl font-mono tracking-wider">•••• •••• •••• 1234</p>
                      <div className="text-right">
                        <p className="text-xs opacity-80">Valid Thru</p>
                        <p className="text-sm">12/26</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">JOHN DOE</p>
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 -mr-2 z-10"></div>
                        <div className="w-6 h-6 rounded-full bg-red-400"></div>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <button className="text-xs sm:text-sm hover:text-blue-500">View Details</button>
                    <button className="text-xs sm:text-sm hover:text-blue-500">Manage Card</button>
                  </div>
                </div>

                {/* Credit Card */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-5 sm:p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs opacity-80">Credit Card</p>
                        <p className="text-lg font-semibold">SecureBank Rewards</p>
                      </div>
                      <div className="text-xs bg-yellow-500 text-yellow-900 px-2 py-1 rounded">
                        GOLD
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-xl font-mono tracking-wider">•••• •••• •••• 9012</p>
                      <div className="text-right">
                        <p className="text-xs opacity-80">Valid Thru</p>
                        <p className="text-sm">08/27</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">JOHN DOE</p>
                      <div className="text-xs">
                        <span className="opacity-80 mr-1">Limit:</span>
                        <span>$5,000</span>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <button className="text-xs sm:text-sm hover:text-blue-500">View Details</button>
                    <button className="text-xs sm:text-sm hover:text-blue-500">Pay Bill</button>
                  </div>
                </div>
              </div>

              {/* Card Controls */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 sm:p-6`}>
                <h3 className="text-lg font-semibold mb-4">Card Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Debit Card (••••1234)</h4>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span>Online Payments</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span>International Use</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Contactless Payments</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Credit Card (••••9012)</h4>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span>Online Payments</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span>International Use</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Cash Advance</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {['loans', 'settings'].includes(activeTab) && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
              <p className="text-gray-500 dark:text-gray-400">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BankingUserDashboard;