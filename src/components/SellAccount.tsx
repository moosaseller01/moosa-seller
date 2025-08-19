import React, { useState } from 'react';
import { Upload, DollarSign, Users, Heart, Play, MapPin, Tag, Camera } from 'lucide-react';

interface SellAccountProps {
  setCurrentView: (view: string) => void;
}

const SellAccount: React.FC<SellAccountProps> = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({
    username: '',
    followers: '',
    following: '',
    likes: '',
    videos: '',
    region: '',
    contentCategory: '',
    price: '',
    description: '',
    verificationStatus: 'unverified',
    accountAge: '',
    engagementRate: '',
    email: '',
    phone: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regions = ['US', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'Other'];
  const categories = ['Entertainment', 'Comedy', 'Dance', 'Music', 'Fashion', 'Food', 'Travel', 'Tech', 'Gaming', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      // For demo purposes, we'll just create object URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Auto-approve and add to available accounts immediately
    const availableAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const pendingAccounts = JSON.parse(localStorage.getItem('sellerAccounts') || '[]');
    
    const newAccount = {
      id: Date.now().toString(),
      sellerId: 'seller_' + Date.now(),
      ...formData,
      followers: parseInt(formData.followers) || 0,
      following: parseInt(formData.following) || 0,
      likes: parseInt(formData.likes) || 0,
      videos: parseInt(formData.videos) || 0,
      price: parseInt(formData.price) || 0,
      engagementRate: parseFloat(formData.engagementRate) || 0,
      images,
      status: 'available',
      createdAt: new Date().toISOString()
    };
    
    // Add to available accounts (auto-approved)
    availableAccounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(availableAccounts));
    
    // Also keep a copy in seller accounts for admin tracking
    pendingAccounts.push({...newAccount, status: 'approved'});
    localStorage.setItem('sellerAccounts', JSON.stringify(pendingAccounts));

    setIsSubmitting(false);
    alert('Account added successfully! Your account is now live and visible to all users.');
    
    // Reset form
    setFormData({
      username: '',
      followers: '',
      following: '',
      likes: '',
      videos: '',
      region: '',
      contentCategory: '',
      price: '',
      description: '',
      verificationStatus: 'unverified',
      accountAge: '',
      engagementRate: '',
      email: '',
      phone: ''
    });
    setImages([]);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Sell Your TikTok Account</h1>
          <p className="text-white/70 text-lg">List your account on our marketplace and reach thousands of potential buyers</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {/* Account Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Tag className="w-6 h-6 mr-2" />
              Account Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  TikTok Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="@yourusername"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Verification Status
                </label>
                <select
                  name="verificationStatus"
                  value={formData.verificationStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="unverified" className="bg-gray-800">Unverified</option>
                  <option value="verified" className="bg-gray-800">Verified</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Followers *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="number"
                    name="followers"
                    value={formData.followers}
                    onChange={handleInputChange}
                    placeholder="250000"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Following
                </label>
                <input
                  type="number"
                  name="following"
                  value={formData.following}
                  onChange={handleInputChange}
                  placeholder="1200"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Total Likes *
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="number"
                    name="likes"
                    value={formData.likes}
                    onChange={handleInputChange}
                    placeholder="5600000"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Total Videos
                </label>
                <div className="relative">
                  <Play className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="number"
                    name="videos"
                    value={formData.videos}
                    onChange={handleInputChange}
                    placeholder="340"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Region *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region} className="bg-gray-800">{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Content Category *
                </label>
                <select
                  name="contentCategory"
                  value={formData.contentCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="" className="bg-gray-800">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Account Age
                </label>
                <input
                  type="text"
                  name="accountAge"
                  value={formData.accountAge}
                  onChange={handleInputChange}
                  placeholder="2 years"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Engagement Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="engagementRate"
                  value={formData.engagementRate}
                  onChange={handleInputChange}
                  placeholder="8.5"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Asking Price (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="2500"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your account, audience, content style, and any notable achievements..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2" />
              Account Screenshots
            </h2>
            
            <div className="mb-4">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Upload Screenshots (Max 5 images)
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 mb-2">Click to upload screenshots</p>
                  <p className="text-white/50 text-sm">PNG, JPG up to 10MB each</p>
                </label>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Account for Review'}
            </button>
            <p className="text-white/60 text-sm mt-4">
              Your account will be reviewed within 24 hours. You'll receive an email confirmation once approved.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellAccount;