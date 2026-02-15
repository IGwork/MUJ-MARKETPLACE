import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import SellItemPage from './pages/SellItemPage';
import MyListingsPage from './pages/MyListingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <MarketplaceProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <HomePage />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BrowseItemsPage />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <SellItemPage />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <MyListingsPage />
                </>
              </ProtectedRoute>
            }
          />

          {/* Fallback - Redirect to home or login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MarketplaceProvider>
  );
}

export default App;
