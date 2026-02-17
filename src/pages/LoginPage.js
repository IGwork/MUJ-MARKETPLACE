import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useMarketplace();

  const validateEmail = (emailValue) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@muj\.manipal\.edu$/;
    return pattern.test(emailValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please use your official MUJ email (@muj.manipal.edu)');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      login(email);
      // Redirect to admin dashboard if admin, otherwise home
      const isAdminAccount = email === 'admin@muj.manipal.edu';
      navigate(isAdminAccount ? '/admin' : '/');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-5xl font-bold text-primary-500">MUJ</div>
            <div className="text-2xl font-bold text-secondary-900">📚</div>
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary-600">
            Login to access MUJ Marketplace
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  placeholder="your.name@muj.manipal.edu"
                  className="input-field pl-12"
                />
              </div>
              <p className="text-xs text-secondary-600 mt-1">
                Use your official MUJ email (ending with @muj.manipal.edu)
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-secondary-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-12"
                />
              </div>
              <p className="text-xs text-secondary-600 mt-1">
                Minimum 6 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary font-semibold text-lg py-3 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Logging in...' : 'Login to Marketplace'}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
            <span className="text-xl">🎓</span> Demo Accounts
          </h3>
          
          <div className="space-y-4">
            {/* Student Demo */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">👤</span> Student Account
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-600 ml-2 font-mono">student@muj.manipal.edu</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Password:</span>
                <span className="text-gray-600 ml-2 font-mono">demo123</span>
              </p>
            </div>
            
            {/* Admin Demo */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">👨‍💼</span> Admin Account
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-600 ml-2 font-mono">admin@muj.manipal.edu</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Password:</span>
                <span className="text-gray-600 ml-2 font-mono">admin123</span>
              </p>
            </div>
          </div>
          
          <p className="text-xs text-blue-700 mt-4 pt-4 border-t border-blue-200">
            ℹ️ Both accounts are demo credentials for testing. Student logs in to the marketplace. Admin accesses the dashboard.
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl mb-2">🛒</div>
            <p className="text-xs text-secondary-600">Browse Items</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📤</div>
            <p className="text-xs text-secondary-600">Sell Items</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💬</div>
            <p className="text-xs text-secondary-600">Connect Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
