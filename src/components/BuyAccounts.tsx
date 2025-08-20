import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Users, Calendar, DollarSign } from 'lucide-react';

interface Account {
  id: string;
  platform: string;
  followers: number;
  engagement: number;
  price: number;
  category: string;
  verified: boolean;
  age: number;
  description: string;
  sellerId: string;
}

interface BuyAccountsProps {
  setCurrentView: (view: string) => void;
}

const BuyAccounts: React.FC<BuyAccountsProps> = ({ setCurrentView }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Auto-refresh accounts every 5 seconds
  useEffect(() => {
    const loadAccounts = () => {
      const savedAccounts = localStorage.getItem('availableAccounts');
      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        setAccounts(parsedAccounts);
        setFilteredAccounts(parsedAccounts);
      }
    };

    loadAccounts();
    const interval = setInterval(loadAccounts, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter accounts based on search and filters
  useEffect(() => {
    let filtered = accounts.filter(account => {
      const matchesSearch = account.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           account.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           account.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPlatform = selectedPlatform === 'all' || account.platform.toLowerCase() === selectedPlatform.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || account.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesPrice = account.price >= priceRange.min && account.price <= priceRange.max;

      return matchesSearch && matchesPlatform && matchesCategory && matchesPrice;
    });

    setFilteredAccounts(filtered);
  }, [accounts, searchTerm, selectedPlatform, selectedCategory, priceRange]);

  const handleContactSeller = (account: Account) => {
    const message = `Hi! I'm interested in buying your ${account.platform} account with ${account.followers.toLocaleString()} followers for $${account.price}. Can we discuss the details?`;
    const whatsappUrl = `https://wa.me/923432252006?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Buy Premium Accounts
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover verified social media accounts with real followers and high engagement rates
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Platform Filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Platforms</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="entertainment">Entertainment</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="gaming">Gaming</option>
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <DollarSign className="text-white/50 w-5 h-5" />
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                className="flex-1"
              />
              <span className="text-sm text-white/70">${priceRange.max}</span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70">
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </p>
        </div>

        {/* Accounts Grid */}
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
              <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Accounts Found</h3>
              <p className="text-white/70 mb-6">
                {accounts.length === 0 
                  ? "No accounts are currently available. Check back soon!"
                  : "Try adjusting your search filters to find more accounts."
                }
              </p>
              <button
                onClick={() => setCurrentView('sell')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                List Your Account
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Account Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {account.platform.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{account.platform}</h3>
                      <p className="text-white/70 text-sm">{account.category}</p>
                    </div>
                  </div>
                  {account.verified && (
                    <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-xs font-medium">
                      Verified
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-2xl font-bold">{formatNumber(account.followers)}</span>
                    </div>
                    <p className="text-white/70 text-sm">Followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-2xl font-bold">{account.engagement}%</span>
                    </div>
                    <p className="text-white/70 text-sm">Engagement</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {account.description}
                </p>

                {/* Account Age */}
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-4 h-4 text-white/50" />
                  <span className="text-white/70 text-sm">{account.age} months old</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-green-400">${account.price}</span>
                  </div>
                  <button
                    onClick={() => handleContactSeller(account)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyAccounts;