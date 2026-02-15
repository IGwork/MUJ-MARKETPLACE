import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import ItemCard from '../components/ItemCard';

const BrowseItemsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categories, items, filterItems, deleteItem } = useMarketplace();
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Apply filters
  const filteredItems = useMemo(() => {
    const filters = {
      category: selectedCategory || undefined,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      search: searchQuery,
    };
    return filterItems(filters);
  }, [selectedCategory, priceRange, searchQuery, filterItems]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 100000 });
    setSearchQuery('');
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            Browse Items
          </h1>
          <p className="text-secondary-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn-outline mb-6 w-full flex items-center justify-center gap-2"
        >
          <Filter size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block md:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-secondary-900 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                {(selectedCategory || searchQuery || priceRange.min !== 0 || priceRange.max !== 100000) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-secondary-900 mb-2 block">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-secondary-900 mb-2 block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-secondary-900 mb-3 block">
                  Price Range
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-secondary-600">Min: ₹{priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Math.min(Number(e.target.value), priceRange.max),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-secondary-600">Max: ₹{priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Math.max(Number(e.target.value), priceRange.min),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || searchQuery) && (
                <div className="pt-4 border-t">
                  <p className="text-xs font-medium text-secondary-600 mb-2">
                    Active Filters:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full flex items-center gap-2 hover:bg-primary-200 transition-colors"
                      >
                        {categories.find((c) => c.id === selectedCategory)?.name}
                        <X size={14} />
                      </button>
                    )}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full flex items-center gap-2 hover:bg-primary-200 transition-colors"
                      >
                        "{searchQuery}"
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onItemClick={() => handleItemClick(item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  No items found
                </h3>
                <p className="text-secondary-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseItemsPage;
