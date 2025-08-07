import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  Edit, 
  X, 
  CheckCircle, 
  XCircle,
  Clock,
  DollarSign,
  Shield,
  Activity,
  FileText,
  Settings
} from 'lucide-react';

const BankingAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample data
  const users = [
    { id: 1, name: 'John Martinez', email: 'john.martinez@email.com', status: 'active', balance: 45230.50, lastLogin: '2025-08-07 14:23', accountType: 'Premium', riskLevel: 'Low' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', status: 'suspended', balance: 12450.75, lastLogin: '2025-08-06 09:15', accountType: 'Standard', riskLevel: 'Medium' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@email.com', status: 'pending', balance: 8930.20, lastLogin: '2025-08-07 11:45', accountType: 'Standard', riskLevel: 'Low' },
    { id: 4, name: 'Emma Wilson', email: 'emma.wilson@email.com', status: 'active', balance: 67890.00, lastLogin: '2025-08-07 16:30', accountType: 'VIP', riskLevel: 'Low' },
    { id: 5, name: 'David Rodriguez', email: 'david.rodriguez@email.com', status: 'active', balance: 23450.80, lastLogin: '2025-08-07 13:20', accountType: 'Premium', riskLevel: 'High' }
  ];

  const transactions = [
    { id: 'TXN001', user: 'John Martinez', amount: -2500.00, type: 'transfer', status: 'completed', timestamp: '2025-08-07 14:20', description: 'Transfer to Sarah Johnson', flagged: false },
    { id: 'TXN002', user: 'Emma Wilson', amount: -15000.00, type: 'withdrawal', status: 'pending', timestamp: '2025-08-07 16:25', description: 'ATM Withdrawal - Downtown Branch', flagged: true },
    { id: 'TXN003', user: 'David Rodriguez', amount: 5000.00, type: 'deposit', status: 'completed', timestamp: '2025-08-07 12:15', description: 'Direct Deposit - Salary', flagged: false },
    { id: 'TXN004', user: 'Sarah Johnson', amount: -890.50, type: 'payment', status: 'failed', timestamp: '2025-08-07 10:30', description: 'Online Purchase - Electronics Store', flagged: false },
    { id: 'TXN005', user: 'Michael Chen', amount: -3200.00, type: 'transfer', status: 'review', timestamp: '2025-08-07 11:50', description: 'International Wire Transfer', flagged: true }
  ];

  const complaints = [
    { id: 'CMP001', user: 'Sarah Johnson', subject: 'Unauthorized transaction', priority: 'high', status: 'open', created: '2025-08-07 09:00' },
    { id: 'CMP002', user: 'John Martinez', subject: 'Account access issues', priority: 'medium', status: 'in-progress', created: '2025-08-06 15:30' },
    { id: 'CMP003', user: 'Emma Wilson', subject: 'Fee dispute', priority: 'low', status: 'resolved', created: '2025-08-05 11:20' }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      review: 'bg-orange-100 text-orange-800',
      open: 'bg-red-100 text-red-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const RiskBadge = ({ level }) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
        {level}
      </span>
    );
  };

  const UserModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" defaultValue={user.name} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" defaultValue={user.email} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
            <select defaultValue={user.status} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <select defaultValue={user.accountType} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
            <input type="text" defaultValue={`$${user.balance.toLocaleString()}`} className="w-full p-2 border border-gray-300 rounded-md" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
            <select defaultValue={user.riskLevel} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const TransactionModal = ({ transaction, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
              <p className="font-mono text-sm">{transaction.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User</label>
              <p>{transaction.user}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <StatusBadge status={transaction.status} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="text-gray-900">{transaction.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Timestamp</label>
            <p>{transaction.timestamp}</p>
          </div>
          
          {transaction.flagged && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Flagged for Review</span>
              </div>
              <p className="text-red-700 text-sm mt-1">This transaction has been automatically flagged for manual review due to unusual patterns.</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          {transaction.status === 'pending' || transaction.status === 'review' ? (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Reject
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Approve
              </button>
            </>
          ) : (
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">SecureBank Admin</h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Activity size={16} className="text-green-500" />
              <span>System Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </button>
            <div className="text-sm text-gray-600">Admin User</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp size={16} />
                  <span>Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users size={16} />
                  <span>Users</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'transactions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard size={16} />
                  <span>Transactions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'complaints' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={16} />
                  <span>Complaints</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('fraud')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'fraud' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield size={16} />
                  <span>Fraud Alerts</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Users size={24} className="text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-semibold text-gray-900">12,847</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <DollarSign size={24} className="text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Balance</p>
                      <p className="text-2xl font-semibold text-gray-900">$2.4M</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <AlertTriangle size={24} className="text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                      <p className="text-2xl font-semibold text-gray-900">23</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Clock size={24} className="text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                      <p className="text-2xl font-semibold text-gray-900">1,847</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm">Transaction TXN001 approved</span>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle size={16} className="text-red-600" />
                        <span className="text-sm">Fraud alert triggered for user Emma Wilson</span>
                      </div>
                      <span className="text-xs text-gray-500">5 min ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Users size={16} className="text-blue-600" />
                        <span className="text-sm">New user registration: Michael Chen</span>
                      </div>
                      <span className="text-xs text-gray-500">12 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">User Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add New User
                </button>
              </div>

              {/* Search and Filter */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <select
                      className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${user.balance.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <RiskBadge level={user.riskLevel} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowUserModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye size={16} />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit size={16} />
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

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Monitor</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className={`hover:bg-gray-50 ${transaction.flagged ? 'bg-red-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-mono text-gray-900">{transaction.id}</span>
                              {transaction.flagged && <AlertTriangle size={16} className="ml-2 text-red-500" />}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {transaction.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={transaction.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowTransactionModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Complaints</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complaints.map((complaint) => (
                        <tr key={complaint.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                            {complaint.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {complaint.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {complaint.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                              complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={complaint.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.created}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye size={16} />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit size={16} />
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

          {activeTab === 'fraud' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fraud Detection & Alerts</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                      <p className="text-3xl font-bold text-red-600">7</p>
                    </div>
                    <AlertTriangle size={32} className="text-red-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                      <p className="text-3xl font-bold text-green-600">12</p>
                    </div>
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Risk Score Avg</p>
                      <p className="text-3xl font-bold text-orange-600">2.3</p>
                    </div>
                    <Shield size={32} className="text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Fraud Alerts</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle size={20} className="text-red-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">High-value withdrawal attempt</h4>
                          <p className="text-sm text-gray-600 mt-1">User Emma Wilson attempted to withdraw $15,000 from an ATM in an unusual location</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Risk Score: 8.7/10</span>
                            <span>2025-08-07 16:25</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200">
                          Block
                        </button>
                        <button className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200">
                          Allow
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle size={20} className="text-orange-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Suspicious login pattern</h4>
                          <p className="text-sm text-gray-600 mt-1">Multiple failed login attempts from David Rodriguez account from different countries</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Risk Score: 6.2/10</span>
                            <span>2025-08-07 11:30</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200">
                          Investigate
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <CheckCircle size={20} className="text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Resolved: Unusual spending pattern</h4>
                          <p className="text-sm text-gray-600 mt-1">Large purchase alert for John Martinez was verified as legitimate</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Resolved by: Admin User</span>
                            <span>2025-08-07 09:45</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md">
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showUserModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setShowUserModal(false)} />
      )}
      
      {showTransactionModal && selectedTransaction && (
        <TransactionModal transaction={selectedTransaction} onClose={() => setShowTransactionModal(false)} />
      )}
    </div>
  );
};

export default BankingAdminDashboard;