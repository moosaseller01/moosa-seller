import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Users, DollarSign } from 'lucide-react';

interface TermsOfServiceProps {
  setCurrentView: (view: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Scale className="w-10 h-10 mr-3" />
            Terms of Service
          </h1>
          <p className="text-white/70 text-lg">Please read these terms carefully before using our service</p>
          <p className="text-white/50 text-sm mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-8">
          
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Agreement to Terms
            </h2>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-white/80 leading-relaxed">
                By accessing and using MOOSA SELLER, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service. 
                These terms constitute a legally binding agreement between you and MOOSA SELLER.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Service Description
            </h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                MOOSA SELLER is a marketplace platform that facilitates the buying and selling of social media accounts. 
                We provide a secure environment for users to list, browse, and transact social media accounts.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">For Sellers</h3>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>List social media accounts for sale</li>
                    <li>Set pricing and descriptions</li>
                    <li>Communicate with potential buyers</li>
                    <li>Manage account listings</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">For Buyers</h3>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>Browse verified account listings</li>
                    <li>Filter by platform and metrics</li>
                    <li>Contact sellers directly</li>
                    <li>Secure transaction processing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Account Security
                </h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Use strong passwords and enable two-factor authentication</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-3">Listing Requirements</h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Provide accurate and truthful information about accounts</li>
                  <li>Own or have legal right to sell the listed accounts</li>
                  <li>Include genuine screenshots and verification materials</li>
                  <li>Respond promptly to buyer inquiries</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-3">Communication Standards</h3>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Maintain professional and respectful communication</li>
                  <li>No harassment, spam, or inappropriate content</li>
                  <li>Honor agreements made through our platform</li>
                  <li>Report suspicious or fraudulent activity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Prohibited Activities
            </h2>
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg p-4 border border-red-500/30">
              <p className="text-white/80 mb-4">The following activities are strictly prohibited:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white/80 space-y-2 list-disc list-inside text-sm">
                  <li>Listing fake or non-existent accounts</li>
                  <li>Misrepresenting account metrics or engagement</li>
                  <li>Selling accounts you don't own</li>
                  <li>Using bots or automated systems</li>
                  <li>Circumventing our verification processes</li>
                </ul>
                <ul className="text-white/80 space-y-2 list-disc list-inside text-sm">
                  <li>Money laundering or illegal transactions</li>
                  <li>Harassment or abusive behavior</li>
                  <li>Spam or unsolicited communications</li>
                  <li>Violating platform terms of service</li>
                  <li>Attempting to hack or compromise security</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Payment and Fees
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Transaction Fees</h3>
                <p className="text-white/80 text-sm mb-2">
                  MOOSA SELLER charges a service fee for successful transactions:
                </p>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Seller fee: 5% of transaction value</li>
                  <li>Payment processing fees may apply</li>
                  <li>Fees are deducted from seller proceeds</li>
                  <li>No fees for listing accounts</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Payment Processing</h3>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Payments processed through secure third-party providers</li>
                  <li>Funds held in escrow until transaction completion</li>
                  <li>Refunds processed according to our refund policy</li>
                  <li>All prices displayed in USD unless otherwise specified</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80 mb-3">
                The MOOSA SELLER platform, including its design, functionality, and content, is protected by intellectual property laws:
              </p>
              <ul className="text-white/80 space-y-2 list-disc list-inside">
                <li>Platform design and code are proprietary to MOOSA SELLER</li>
                <li>Users retain rights to their own content and listings</li>
                <li>Users grant us license to display their content on our platform</li>
                <li>Respect third-party intellectual property rights</li>
              </ul>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Disclaimers and Limitations</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-lg p-4 border border-yellow-500/30">
                <h3 className="text-lg font-medium text-white mb-2">Service Availability</h3>
                <p className="text-white/80 text-sm">
                  We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                  Maintenance, updates, or technical issues may temporarily affect availability.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Transaction Responsibility</h3>
                <p className="text-white/80 text-sm mb-2">
                  MOOSA SELLER facilitates transactions but is not responsible for:
                </p>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Account authenticity or performance after transfer</li>
                  <li>Disputes between buyers and sellers</li>
                  <li>Platform policy changes by social media companies</li>
                  <li>Account suspensions or bans post-transaction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Account Termination</h2>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80 mb-3">
                We reserve the right to terminate or suspend accounts for violations of these terms:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Immediate Termination</h4>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>Fraudulent activity</li>
                    <li>Repeated policy violations</li>
                    <li>Illegal activities</li>
                    <li>Security breaches</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Warning System</h4>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>First violation: Warning</li>
                    <li>Second violation: Temporary suspension</li>
                    <li>Third violation: Permanent ban</li>
                    <li>Appeal process available</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
              <p className="text-white/80 mb-3">
                We may update these Terms of Service from time to time:
              </p>
              <ul className="text-white/80 space-y-2 list-disc list-inside">
                <li>Users will be notified of significant changes via email or platform notification</li>
                <li>Continued use of the platform constitutes acceptance of updated terms</li>
                <li>Users may terminate their account if they disagree with changes</li>
                <li>Previous versions available upon request</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 border border-green-500/30">
              <p className="text-white/80 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium mb-2">Legal Department</p>
                  <p className="text-white/70 text-sm">WhatsApp: +92 343 225 2006</p>
                  <p className="text-white/70 text-sm">Email: info.moosaseller@gmail.com</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Response Time</p>
                  <p className="text-white/70 text-sm">Legal inquiries: 3-5 business days</p>
                  <p className="text-white/70 text-sm">General support: 24-48 hours</p>
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

export default TermsOfService;