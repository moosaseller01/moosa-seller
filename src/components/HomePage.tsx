import React from 'react';
import { TrendingUp, Shield, Users, Star, ArrowRight } from 'lucide-react';

interface HomePageProps {
  setCurrentView: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "All transactions are protected with advanced security measures"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Verified Accounts",
      description: "Every account is thoroughly verified before listing"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth Analytics",
      description: "Detailed analytics and growth metrics for each account"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Support",
      description: "24/7 customer support for all your needs"
    }
  ];

  const stats = [
    { number: "10K+", label: "Accounts Sold" },
    { number: "5K+", label: "Happy Customers" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Buy & Sell
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}TikTok Accounts
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            MOOSA SELLER - The most trusted marketplace for TikTok accounts. Find the perfect account for your brand or sell your existing account safely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('buy')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Browse Accounts
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView('sell')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all transform hover:scale-105"
            >
              Sell Your Account
            </button>
          </div>
        </div>

        {/* 3D Model Placeholder */}
        <div className="mt-16 flex justify-center">
          <div className="w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
            <div className="text-white/50 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-16 h-16 text-white" />
              </div>
              <p className="text-sm">Moosa seller</p>
              <p className="text-xs mt-1">The Name of Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose MOOSA SELLER?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We provide the most secure and reliable platform for TikTok account transactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-purple-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of satisfied customers who trust MOOSA SELLER
            </p>
            <button
              onClick={() => window.open('https://wa.me/923432252006', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;