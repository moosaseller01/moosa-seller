import React from 'react';
import { Shield, Eye, Lock, Database, Phone, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  setCurrentView: (view: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 mr-3" />
            Privacy Policy
          </h1>
          <p className="text-white/70 text-lg">Your privacy is important to us</p>
          <p className="text-white/50 text-sm mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Introduction
            </h2>
            <p className="text-white/80 leading-relaxed">
              Welcome to MOOSA SELLER. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our social media account marketplace platform. Please read this privacy 
              policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Phone number (for authentication and account verification)</li>
                  <li>Username (chosen during registration)</li>
                  <li>Profile information you provide</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Account Listing Information</h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Social media account details (followers, engagement, etc.)</li>
                  <li>Account screenshots and verification materials</li>
                  <li>Pricing and description information</li>
                  <li>Contact information for transactions</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Usage Information</h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Chat messages and communications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Service Provision</h3>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Account authentication and verification</li>
                  <li>Facilitating account transactions</li>
                  <li>Providing customer support</li>
                  <li>Processing payments and transactions</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Platform Improvement</h3>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Analyzing usage patterns</li>
                  <li>Improving user experience</li>
                  <li>Developing new features</li>
                  <li>Preventing fraud and abuse</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2" />
              Information Sharing and Disclosure
            </h2>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="text-white/80 space-y-2 list-disc list-inside">
                <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-500/30">
              <p className="text-white/80 mb-3">
                We implement appropriate security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Encryption of sensitive data</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security audits</li>
                </ul>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Access controls and authentication</li>
                  <li>Monitoring for suspicious activity</li>
                  <li>Regular software updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Privacy Rights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Access & Control</h3>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Access your personal data</li>
                  <li>Update or correct information</li>
                  <li>Delete your account</li>
                  <li>Export your data</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Communication</h3>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Opt-out of marketing emails</li>
                  <li>Control notification settings</li>
                  <li>Manage privacy preferences</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80 mb-3">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="text-white/80 space-y-2 list-disc list-inside">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Mail className="w-6 h-6 mr-2" />
              Contact Us
            </h2>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-500/30">
              <p className="text-white/80 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium mb-2">MOOSA SELLER Support</p>
                  <p className="text-white/70 text-sm">WhatsApp: +92 343 225 2006</p>
                  <p className="text-white/70 text-sm">Email: info.moosaseller@gmail.com</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Business Hours</p>
                  <p className="text-white/70 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-white/70 text-sm">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center pt-6">
            <button
              onClick={() => setCurrentView('home')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;