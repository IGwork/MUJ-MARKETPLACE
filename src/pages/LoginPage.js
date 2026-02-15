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
    const pattern = /^[a-zA-Z0-9._%+-]+@jaipur\.manipal\.edu$/;
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
      setError('Please use your official MUJ email (@jaipur.manipal.edu)');
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
      navigate('/');
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
                  placeholder="your.name@jaipur.manipal.edu"
                  className="input-field pl-12"
                />
              </div>
              <p className="text-xs text-secondary-600 mt-1">
                Use your official MUJ email (ending with @jaipur.manipal.edu)
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

        {/* Demo Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Demo Account:</h3>
          <p className="text-sm text-blue-800 mb-1">
            <span className="font-medium">Email:</span> student@jaipur.manipal.edu
          </p>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Password:</span> demo123
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
