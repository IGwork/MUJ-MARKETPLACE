import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Plus,
  ShoppingBag,
  LogOut,
  Search,
  Settings,
} from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import ProfilePopup from './ProfilePopup';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout, isAdmin } = useMarketplace();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary-500">MUJ</div>
              <div className="text-sm font-semibold text-secondary-900">
                Marketplace
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            {isAuthenticated && (
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
                <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 pr-4"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                </div>
              </form>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className="text-secondary-700 hover:text-primary-500 transition-colors font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/sell"
                    className="text-secondary-700 hover:text-primary-500 transition-colors font-medium"
                  >
                    Sell Item
                  </Link>
                  <Link
                    to="/listings"
                    className="text-secondary-700 hover:text-primary-500 transition-colors font-medium"
                  >
                    My Listings
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-secondary-700 hover:text-primary-500 transition-colors font-medium flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full"
                    >
                      <Settings size={16} />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => setShowProfilePopup(true)}
                    className="flex items-center gap-3 border-l pl-6 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <img
                      src={currentUser?.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-secondary-700">
                      {currentUser?.name}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-secondary-700 hover:text-primary-500 transition-colors font-medium flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-secondary-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="md:hidden border-t bg-white">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="p-4 border-b">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 pr-4"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            </form>

            {/* Mobile Links */}
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block text-secondary-700 hover:text-primary-500 transition-colors font-medium py-2"
              >
                <Home size={18} className="inline mr-2" />
                Home
              </Link>
              <Link
                to="/sell"
                className="block text-secondary-700 hover:text-primary-500 transition-colors font-medium py-2"
              >
                <Plus size={18} className="inline mr-2" />
                Sell Item
              </Link>
              <Link
                to="/listings"
                className="block text-secondary-700 hover:text-primary-500 transition-colors font-medium py-2"
              >
                <ShoppingBag size={18} className="inline mr-2" />
                My Listings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block text-amber-600 hover:text-amber-700 transition-colors font-medium py-2 bg-amber-100 rounded-lg pl-3"
                >
                  <Settings size={18} className="inline mr-2" />
                  Admin Dashboard
                </Link>
              )}

              <div className="border-t pt-4 mt-4">
                <button
                  onClick={() => {
                    setShowProfilePopup(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={currentUser?.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-secondary-700">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-secondary-600">
                      {currentUser?.email}
                    </p>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-secondary-700 hover:text-primary-500 transition-colors font-medium py-2 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Profile Popup */}
      <ProfilePopup isOpen={showProfilePopup} onClose={() => setShowProfilePopup(false)} />
    </>
  );
};

export default Navbar;
