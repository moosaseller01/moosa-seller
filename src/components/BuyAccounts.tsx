import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Heart, Play, MapPin, Tag, Star, Eye } from 'lucide-react';
import { TikTokAccount } from '../types';

interface BuyAccountsProps {
  setCurrentView: (view: string) => void;
}

const BuyAccounts: React.FC<BuyAccountsProps> = ({ setCurrentView }) => {
  const [accounts, setAccounts] = useState<TikTokAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<TikTokAccount[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedAccount, setSelectedAccount] = useState<TikTokAccount | null>(null);

  const regions = ['all', 'US', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil'];
  const categories = ['all', 'Entertainment', 'Comedy', 'Dance', 'Music', 'Fashion', 'Food', 'Travel', 'Tech', 'Gaming'];

  // Auto-refresh accounts every 5 seconds to show new submissions
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  useEffect(() => {
    // Load accounts from localStorage and combine with sample accounts
    const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const sampleAccounts: TikTokAccount[] = [
      {
        id: '1',
        sellerId: 'seller1',
        username: '@dancevibes_official',
        followers: 250000,
        following: 1200,
        likes: 5600000,
        videos: 340,
        region: 'US',
        contentCategory: 'Dance',
        price: 2500,
        description: 'Popular dance account with high engagement rate. Perfect for brands targeting Gen Z audience.',
        verificationStatus: 'verified',
        accountAge: '2 years',
        engagementRate: 8.5,
        images: ['https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg'],
        status: 'available',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        sellerId: 'seller2',
        username: '@comedy_central_hub',
        followers: 180000,
        following: 890,
        likes: 3200000,
        videos: 280,
        region: 'UK',
        contentCategory: 'Comedy',
        price: 1800,
        description: 'Comedy account with consistent viral content. Great for entertainment brands.',
        verificationStatus: 'unverified',
        accountAge: '1.5 years',
        engagementRate: 7.2,
        images: ['https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg'],
        status: 'available',
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        sellerId: 'seller3',
        username: '@fashion_forward_2024',
        followers: 320000,
        following: 1500,
        likes: 7800000,
        videos: 420,
        region: 'Canada',
        contentCategory: 'Fashion',
        price: 3200,
        description: 'High-end fashion account with luxury brand collaborations. Premium audience.',
        verificationStatus: 'verified',
        accountAge: '3 years',
        engagementRate: 9.1,
        images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'],
        status: 'available',
        createdAt: '2024-01-08'
      },
      {
        id: '4',
        sellerId: 'seller4',
        username: '@tech_reviews_pro',
        followers: 150000,
        following: 650,
        likes: 2100000,
        videos: 190,
        region: 'US',
        contentCategory: 'Tech',
        price: 1500,
        description: 'Tech review account with engaged audience interested in latest gadgets.',
        verificationStatus: 'unverified',
        accountAge: '1 year',
        engagementRate: 6.8,
        images: ['https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'],
        status: 'available',
        createdAt: '2024-01-05'
      }
    ];

    // Combine sample accounts with user-submitted accounts
    const allAccounts = [...sampleAccounts, ...savedAccounts];
    setAccounts(allAccounts);
    setFilteredAccounts(allAccounts);

  useEffect(() => {
    let filtered = accounts.filter(account => {
      const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           account.contentCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || account.region === selectedRegion;
      const matchesCategory = selectedCategory === 'all' || account.contentCategory === selectedCategory;
      const matchesPrice = account.price >= priceRange.min && account.price <= priceRange.max;
      
      return matchesSearch && matchesRegion && matchesCategory && matchesPrice;
    });

    setFilteredAccounts(filtered);
  }, [accounts, searchTerm, selectedRegion, selectedCategory, priceRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Buy TikTok Accounts</h1>
          <p className="text-white/70 text-lg">Find the perfect TikTok account for your brand</p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {regions.map(region => (
                <option key={region} value={region} className="bg-gray-800">
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <span className="text-white/70 text-sm">Price:</span>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                className="flex-1"
              />
              <span className="text-white text-sm">${priceRange.max}</span>
            </div>
          </div>
        </div>

        {/* Account Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map(account => (
            <div key={account.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {account.username.charAt(1).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{account.username}</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-white/50" />
                      <span className="text-white/70 text-sm">{account.region}</span>
                      {account.verificationStatus === 'verified' && (
                        <Star className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">${account.price}</div>
                  <div className="text-white/70 text-sm">USD</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-white/70 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Followers</span>
                  </div>
                  <div className="text-white font-semibold">{formatNumber(account.followers)}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-white/70 mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Likes</span>
                  </div>
                  <div className="text-white font-semibold">{formatNumber(account.likes)}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-white/70 mb-1">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Videos</span>
                  </div>
                  <div className="text-white font-semibold">{account.videos}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-white/70 mb-1">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">Engagement</span>
                  </div>
                  <div className="text-white font-semibold">{account.engagementRate}%</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">{account.contentCategory}</span>
                </div>
                <p className="text-white/70 text-sm line-clamp-2">{account.description}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedAccount(account)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/50 text-lg mb-4">No accounts found matching your criteria</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('all');
                setSelectedCategory('all');
                setPriceRange({ min: 0, max: 10000 });
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

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
                    <span>•</span>
                    <span>{selectedAccount.accountAge}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">{formatNumber(selectedAccount.followers)}</div>
                  <div className="text-white/70 text-sm">Followers</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">{formatNumber(selectedAccount.likes)}</div>
                  <div className="text-white/70 text-sm">Likes</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">{selectedAccount.videos}</div>
                  <div className="text-white/70 text-sm">Videos</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">{selectedAccount.engagementRate}%</div>
                  <div className="text-white/70 text-sm">Engagement</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-white/70">{selectedAccount.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-white">${selectedAccount.price}</div>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all">
                  Purchase Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyAccounts;