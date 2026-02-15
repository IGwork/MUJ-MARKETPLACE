import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import CategoryCard from '../components/CategoryCard';
import ItemCard from '../components/ItemCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { categories, items, currentUser } = useMarketplace();

  const getFeaturedItems = () => {
    return items.slice(0, 6);
  };

  const getItemCountByCategory = (categoryId) => {
    return items.filter((item) => item.category === categoryId).length;
  };

  const handleBrowseCategory = (categoryId) => {
    navigate(`/browse?category=${categoryId}`);
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome, {currentUser?.name}! 👋
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Buy and sell with fellow MUJ students. Find great deals on textbooks, electronics,
              furniture, and more!
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate('/sell')}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Zap size={20} />
                Start Selling
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Browse Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-title mb-2">Browse by Category</h2>
          <p className="text-description">
            Shop items from your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              itemCount={getItemCountByCategory(category.id)}
              onBrowse={() => handleBrowseCategory(category.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="bg-white py-16 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-title mb-2">Featured Items</h2>
              <p className="text-description">
                Recently posted items from the marketplace
              </p>
            </div>
            <button
              onClick={() => navigate('/browse')}
              className="btn-outline flex items-center gap-2 hidden sm:flex"
            >
              View All <ArrowRight size={18} />
            </button>
          </div>

          {getFeaturedItems().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFeaturedItems().map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemClick={() => handleItemClick(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-600 text-lg">No items available yet.</p>
              <button
                onClick={() => navigate('/sell')}
                className="btn-primary mt-4"
              >
                Be the first to sell
              </button>
            </div>
          )}

          <button
            onClick={() => navigate('/browse')}
            className="btn-primary w-full mt-8 block sm:hidden"
          >
            View All Items
          </button>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-secondary-50 py-12 px-4 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-500">{items.length}</div>
            <p className="text-secondary-600 text-sm mt-1">Active Listings</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">{categories.length}</div>
            <p className="text-secondary-600 text-sm mt-1">Categories</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">100+</div>
            <p className="text-secondary-600 text-sm mt-1">Students</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">₹50K+</div>
            <p className="text-secondary-600 text-sm mt-1">Total Sales</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have something to sell?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Create a listing in just a few minutes and reach hundreds of MUJ students!
          </p>
          <button
            onClick={() => navigate('/sell')}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Post Your Item Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
