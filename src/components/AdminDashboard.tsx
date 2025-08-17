import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Eye, Check, X, Edit, Trash2 } from 'lucide-react';
import { TikTokAccount, User } from '../types';

const AdminDashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<TikTokAccount[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [pendingAccounts, setPendingAccounts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const savedPendingAccounts = JSON.parse(localStorage.getItem('sellerAccounts') || '[]');
    
    setAccounts(savedAccounts);
    setUsers(savedUsers);
    setPendingAccounts(savedPendingAccounts);
  }, []);

  const approveAccount = (accountId: string) => {
    const account = pendingAccounts.find(acc => acc.id === accountId);
    if (account) {
      // Move to approved accounts
      const approvedAccount = {
        ...account,
        status: 'available',
        sellerId: 'seller_' + account.id
      };
      
      const updatedAccounts = [...accounts, approvedAccount];
      const updatedPending = pendingAccounts.filter(acc => acc.id !== accountId);
      
      setAccounts(updatedAccounts);
      setPendingAccounts(updatedPending);
      
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      localStorage.setItem('sellerAccounts', JSON.stringify(updatedPending));
    }
  };

  const rejectAccount = (accountId: string) => {
    const updatedPending = pendingAccounts.filter(acc => acc.id !== accountId);
    setPendingAccounts(updatedPending);
    localStorage.setItem('sellerAccounts', JSON.stringify(updatedPending));
  };

  const deleteAccount = (accountId: string) => {
    const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  const stats = {
    totalUsers: users.length,
    totalAccounts: accounts.length,
    pendingReviews: pendingAccounts.length,
    totalRevenue: accounts.reduce((sum, acc) => sum + acc.price, 0)
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-white/70 text-lg">Manage your MOOSA SELLER marketplace</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Listed Accounts</p>
                <p className="text-3xl font-bold text-white">{stats.totalAccounts}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Pending Reviews</p>
                <p className="text-3xl font-bold text-white">{stats.pendingReviews}</p>
              </div>
              <Eye className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-white">${formatNumber(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'pending' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Pending Reviews ({pendingAccounts.length})
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'accounts' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              All Accounts
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'users' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Users
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Platform Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Recent Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">New user registrations</span>
                        <span className="text-white">{users.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Accounts awaiting review</span>
                        <span className="text-white">{pendingAccounts.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Active listings</span>
                        <span className="text-white">{accounts.filter(acc => acc.status === 'available').length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveTab('pending')}
                        className="w-full text-left px-3 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-200 rounded transition-colors"
                      >
                        Review pending accounts ({pendingAccounts.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('users')}
                        className="w-full text-left px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 rounded transition-colors"
                      >
                        Manage users ({users.length})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pending' && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Pending Account Reviews</h2>
                
                {pendingAccounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/70">No accounts pending review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingAccounts.map(account => (
                      <div key={account.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{account.username}</h3>
                            <p className="text-white/70">{account.contentCategory} • {account.region}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-white">${account.price}</p>
                            <p className="text-white/70 text-sm">Asking price</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-white font-semibold">{formatNumber(parseInt(account.followers))}</p>
                            <p className="text-white/70 text-sm">Followers</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">{formatNumber(parseInt(account.likes))}</p>
                            <p className="text-white/70 text-sm">Likes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">{account.videos}</p>
                            <p className="text-white/70 text-sm">Videos</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">{account.engagementRate}%</p>
                            <p className="text-white/70 text-sm">Engagement</p>
                          </div>
                        </div>

                        <p className="text-white/70 mb-4">{account.description}</p>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedAccount(account)}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
                          >
                            <Eye className="w-4 h-4 inline mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => approveAccount(account.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <Check className="w-4 h-4 inline mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectAccount(account.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 inline mr-2" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'accounts' && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">All Listed Accounts</h2>
                
                {accounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/70">No accounts listed yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accounts.map(account => (
                      <div key={account.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-white font-semibold">{account.username}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            account.status === 'available' ? 'bg-green-600/20 text-green-200' :
                            account.status === 'sold' ? 'bg-gray-600/20 text-gray-200' :
                            'bg-yellow-600/20 text-yellow-200'
                          }`}>
                            {account.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div>
                            <span className="text-white/70">Followers:</span>
                            <span className="text-white ml-1">{formatNumber(account.followers)}</span>
                          </div>
                          <div>
                            <span className="text-white/70">Price:</span>
                            <span className="text-white ml-1">${account.price}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedAccount(account)}
                            className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm transition-all"
                          >
                            <Eye className="w-4 h-4 inline mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => deleteAccount(account.id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Registered Users</h2>
                
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/70">No users registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map(user => (
                      <div key={user.id} className="bg-white/5 rounded-lg p-4 border border-white/10 flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-semibold">{user.username}</h3>
                          <p className="text-white/70 text-sm">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded text-xs ${
                            user.role === 'admin' ? 'bg-purple-600/20 text-purple-200' : 'bg-blue-600/20 text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                          <p className="text-white/70 text-xs mt-1">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Account Detail Modal */}
        {selectedAccount && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedAccount.username}</h2>
                  <div className="flex items-center space-x-4 text-white/70">
                    <span>{selectedAccount.region}</span>
                    <span>•</span>
                    <span>{selectedAccount.contentCategory}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{formatNumber(parseInt(selectedAccount.followers || selectedAccount.followers))}</div>
                    <div className="text-white/70 text-sm">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{formatNumber(parseInt(selectedAccount.likes || selectedAccount.likes))}</div>
                    <div className="text-white/70 text-sm">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{selectedAccount.videos}</div>
                    <div className="text-white/70 text-sm">Videos</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">${selectedAccount.price}</div>
                    <div className="text-white/70 text-sm">Price</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-white/70">{selectedAccount.description}</p>
                </div>

                {selectedAccount.email && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
                    <p className="text-white/70">Email: {selectedAccount.email}</p>
                    {selectedAccount.phone && (
                      <p className="text-white/70">Phone: {selectedAccount.phone}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;