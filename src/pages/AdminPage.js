import React, { useState, useMemo } from 'react';
import { Trash2, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import ConfirmationModal from '../components/ConfirmationModal';

const AdminPage = () => {
  const { items, deleteItem } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.sellerName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [items, searchQuery]);

  // Sort items
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    switch (sortBy) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [filteredItems, sortBy]);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      deleteItem(selectedItem.id);
      setShowConfirmation(false);
      setSelectedItem(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const categoryIconMap = {
    books: '📚',
    electronics: '💻',
    clothing: '👕',
    furniture: '🪑',
    tickets: '🎫',
    miscellaneous: '📦',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all products from the marketplace</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Products</p>
            <p className="text-3xl font-bold text-primary-500">{items.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold mb-1">Filtered Results</p>
            <p className="text-3xl font-bold text-secondary-900">{sortedItems.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Value</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, seller, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {sortedItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 text-lg">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Product</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Seller</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Price</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Posted</th>
                    <th className="text-right px-6 py-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 max-w-xs truncate">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-600">ID: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.sellerAvatar}
                            alt={item.sellerName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{item.sellerName}</p>
                            <p className="text-xs text-gray-600">{item.sellerPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {categoryIconMap[item.category] || '📦'}
                          </span>
                          <span className="capitalize font-medium text-gray-900">
                            {item.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-primary-500 text-lg">
                          ₹{item.price.toLocaleString()}
                        </p>
                        {item.negotiable && (
                          <p className="text-xs text-green-600">Negotiable</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 font-medium">{formatDate(item.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone. The product will be removed from the marketplace immediately.`}
        confirmText="Delete Product"
        isDangerous={true}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminPage;
