import React, { createContext, useState, useCallback } from 'react';
import { DUMMY_ITEMS, CATEGORIES } from '../data/dummyData';

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState(DUMMY_ITEMS);
  const [userListings, setUserListings] = useState([]);

  const login = useCallback((email) => {
    setIsAuthenticated(true);
    setCurrentUser({
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email: email,
      name: email.split('@')[0],
      phone: '+91 98765 43210',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    });
    setUserListings([]);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserListings([]);
  }, []);

  const addItem = useCallback((itemData) => {
    const newItem = {
      id: 'item_' + Math.random().toString(36).substr(2, 9),
      ...itemData,
      sellerId: currentUser?.id,
      sellerName: currentUser?.name,
      sellerPhone: currentUser?.phone,
      sellerAvatar: currentUser?.avatar,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    setUserListings((prev) => [newItem, ...prev]);
    return newItem;
  }, [currentUser]);

  const deleteItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setUserListings((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateItem = useCallback((itemId, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
    setUserListings((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
  }, []);

  const getItemsByCategory = useCallback((category) => {
    return items.filter((item) => item.category === category);
  }, [items]);

  const searchItems = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  }, [items]);

  const filterItems = useCallback((filters) => {
    return items.filter((item) => {
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      if (filters.minPrice && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && item.price > filters.maxPrice) {
        return false;
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        if (
          !item.title.toLowerCase().includes(query) &&
          !item.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [items]);

  const value = {
    isAuthenticated,
    currentUser,
    items,
    userListings,
    categories: CATEGORIES,
    login,
    logout,
    addItem,
    deleteItem,
    updateItem,
    getItemsByCategory,
    searchItems,
    filterItems,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};
