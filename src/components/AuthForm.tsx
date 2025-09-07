import React, { useState } from 'react';
import { Phone, User, Shield, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'username'>('phone');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const { sendOTP, verifyOTP, isLoading } = useAuth();

  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' }
  ];

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const fullPhoneNumber = countryCode + phoneNumber;
    const existingUser = users.find((u: any) => u.phoneNumber === fullPhoneNumber);
    
    setIsExistingUser(!!existingUser);

    const success = await sendOTP(countryCode, phoneNumber);
    if (success) {
      setStep('otp');
    } else {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    if (!isExistingUser && !username.trim()) {
      setError('Username is required for new users');
      return;
    }

    const success = await verifyOTP(countryCode, phoneNumber, otp, isExistingUser ? undefined : username);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid or expired OTP. Please try again.');
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    const success = await verifyOTP(countryCode, phoneNumber, otp, username);
    if (success) {
      onSuccess();
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 'phone' ? 'Welcome to MOOSA SELLER' : 
               step === 'otp' ? 'Verify Your Number' : 'Create Username'}
            </h2>
            <p className="text-white/70">
              {step === 'phone' ? 'Enter your phone number to continue' :
               step === 'otp' ? 'Enter the 6-digit code sent to your phone' :
               'Choose a unique username for your account'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm mb-6">
              {error}
            </div>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Country Code
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code} className="bg-gray-800">
                      {country.flag} {country.code} {country.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <p className="text-white/60 text-xs mt-2">
                  We'll send you a verification code via SMS
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={isExistingUser ? handleVerifyOTP : handleUsernameSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white/70 text-sm">
                  Code sent to {countryCode} {phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              {!isExistingUser && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required={!isExistingUser}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Verifying...' : (isExistingUser ? 'Verify & Login' : 'Create Account')}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full py-2 text-white/70 hover:text-white transition-colors"
              >
                Change phone number
              </button>
            </form>
          )}

          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            {/* reCAPTCHA container - invisible */}
            <div id="recaptcha-container"></div>
            <p className="text-blue-200 text-sm text-center">
              <strong>MOOSA SELLER</strong><br />
              Trusted Marketplace for Social Media Accounts<br />
              <span className="text-xs">Secure • Fast • Reliable</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;