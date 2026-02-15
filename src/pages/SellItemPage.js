import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';

const SellItemPage = () => {
  const navigate = useNavigate();
  const { categories, addItem } = useMarketplace();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'books',
    negotiable: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const defaultImages = {
    books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    electronics: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    clothing: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=300&fit=crop',
    furniture: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop',
    tickets: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    miscellaneous: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFormData({
      ...formData,
      category: newCategory,
      image: defaultImages[newCategory] || defaultImages.miscellaneous,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      alert('Please enter item title');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter item description');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert('Please enter valid price');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newItem = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        negotiable: formData.negotiable,
        image: formData.image,
      };

      addItem(newItem);
      setIsSubmitting(false);
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <CheckCircle size={64} className="text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">
            Item Listed!
          </h2>
          <p className="text-secondary-600 mb-6">
            Your item has been successfully added to the marketplace.
          </p>
          <p className="text-secondary-600 text-sm">
            Redirecting to your listings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            Sell Your Item
          </h1>
          <p className="text-secondary-600">
            Fill in the details below to list your item on MUJ Marketplace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 12 Pro Max"
                  maxLength="100"
                  className="input-field"
                />
                <p className="text-xs text-secondary-600 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="1"
                  className="input-field"
                />
              </div>

              {/* Negotiable */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="negotiable"
                  name="negotiable"
                  checked={formData.negotiable}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded"
                />
                <label htmlFor="negotiable" className="text-sm font-medium text-secondary-900">
                  Price is negotiable
                </label>
              </div>

              {/* Contact Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Note:</span> Your contact
                  information will be shared with potential buyers.
                </p>
              </div>
            </div>

            {/* Right Column - Image Preview */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-3">
                  Item Image (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageInput"
                  />
                  <label
                    htmlFor="imageInput"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload image
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {(imagePreview || formData.image) && (
                <div>
                  <p className="text-sm font-semibold text-secondary-900 mb-2">
                    Preview
                  </p>
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail (condition, features, etc.)"
              rows="6"
              maxLength="500"
              className="input-field"
            />
            <p className="text-xs text-secondary-600 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/listings')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-75 disabled:cursor-not-allowed font-semibold"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Item'}
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h3 className="text-lg font-bold text-secondary-900 mb-4">
            💡 Tips for a Great Listing
          </h3>
          <ul className="space-y-3 text-secondary-700">
            <li className="flex gap-3">
              <span className="text-primary-500 font-bold">•</span>
              <span>Be specific about the condition and any defects</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 font-bold">•</span>
              <span>Include relevant details like brand, model, or size</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 font-bold">•</span>
              <span>Use a clear, well-lit photo of your item</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 font-bold">•</span>
              <span>Set a reasonable price by checking similar items</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 font-bold">•</span>
              <span>Mark as negotiable if you're open to offers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellItemPage;
