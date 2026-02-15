import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import ItemCard from '../components/ItemCard';

const MyListingsPage = () => {
  const navigate = useNavigate();
  const { userListings, deleteItem } = useMarketplace();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteItem(itemId);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData(null);
    setIsEditing(false);
  };

  const handleEditSave = (itemId) => {
    if (window.confirm('Update this listing?')) {
      // In a real app, this would call updateItem
      handleEditCancel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">
              My Listings
            </h1>
            <p className="text-secondary-600">
              Manage and track your listings on MUJ Marketplace
            </p>
          </div>
          <button
            onClick={() => navigate('/sell')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            New Listing
          </button>
        </div>

        {/* Stats */}
        {userListings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-secondary-600 text-sm font-medium">Total Listings</p>
              <p className="text-3xl font-bold text-primary-500 mt-2">
                {userListings.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-secondary-600 text-sm font-medium">Total Value</p>
              <p className="text-3xl font-bold text-primary-500 mt-2">
                ₹{userListings.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-secondary-600 text-sm font-medium">Active Items</p>
              <p className="text-3xl font-bold text-primary-500 mt-2">
                {userListings.filter((item) => !item.sold).length}
              </p>
            </div>
          </div>
        )}

        {/* Listings */}
        {userListings.length > 0 ? (
          <div className="space-y-6">
            {userListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Image */}
                  <div className="flex-shrink-0 w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          Posted on {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-500">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        {item.negotiable && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                            Negotiable
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-secondary-700 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y mb-4">
                      <div>
                        <p className="text-xs text-secondary-600">Category</p>
                        <p className="font-semibold text-secondary-900 capitalize">
                          {item.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-600">Status</p>
                        <p className="font-semibold text-green-600">Active</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-600">Views</p>
                        <p className="font-semibold text-secondary-900">
                          {Math.floor(Math.random() * 100) + 5}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              No listings yet
            </h2>
            <p className="text-secondary-600 mb-6">
              You haven't created any listings. Start selling to reach other students!
            </p>
            <button
              onClick={() => navigate('/sell')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create Your First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;
