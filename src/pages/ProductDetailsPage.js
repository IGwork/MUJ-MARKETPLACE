import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Instagram, AlertCircle } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById } = useMarketplace();
  const [showContactModal, setShowContactModal] = useState(false);
  
  const product = getItemById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-12">
            <AlertCircle size={64} className="text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-6 text-center">
              Sorry, the product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">
                  {categoryIconMap[product.category] || '📦'}
                </span>
                <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                {product.title}
              </h1>

              {/* Price and Negotiable */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary-500">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.negotiable && (
                  <span className="text-lg font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                    Negotiable
                  </span>
                )}
                {!product.negotiable && (
                  <span className="text-lg font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                    Fixed Price
                  </span>
                )}
              </div>

              {/* Posted Date */}
              <p className="text-sm text-gray-600 mb-6">
                Posted on {formatDate(product.createdAt)}
              </p>

              {/* Divider */}
              <hr className="my-6" />

              {/* Description */}
              <h2 className="text-xl font-bold text-secondary-900 mb-3">Product Details</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">Seller Information</h2>

              <div className="flex items-start gap-4 mb-6">
                {/* Seller Avatar */}
                <img
                  src={product.sellerAvatar}
                  alt={product.sellerName}
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* Seller Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-secondary-900 mb-1">
                    {product.sellerName}
                  </h3>
                  {product.sellerRegistration && (
                    <p className="text-sm text-gray-600 mb-1">
                      Registration: {product.sellerRegistration}
                    </p>
                  )}
                  {product.sellerEmail && (
                    <p className="text-sm text-gray-600 mb-1">
                      Email: {product.sellerEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Contact Seller</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Phone Button */}
                  {product.sellerPhone && (
                    <a
                      href={`tel:${product.sellerPhone}`}
                      className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      <Phone size={20} />
                      Call Seller
                    </a>
                  )}

                  {/* Instagram Link */}
                  {product.sellerInstagram && (
                    <a
                      href={`https://instagram.com/${product.sellerInstagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      <Instagram size={20} />
                      {product.sellerInstagram}
                    </a>
                  )}
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-secondary-900 hover:bg-secondary-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Send Message to Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Contact {product.sellerName}
            </h2>
            <p className="text-gray-600 mb-6">
              Use the options below to get in touch with the seller:
            </p>

            <div className="space-y-3 mb-6">
              {product.sellerPhone && (
                <a
                  href={`tel:${product.sellerPhone}`}
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg text-center transition-colors"
                >
                  📞 {product.sellerPhone}
                </a>
              )}
              {product.sellerEmail && (
                <a
                  href={`mailto:${product.sellerEmail}`}
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg text-center transition-colors"
                >
                  📧 {product.sellerEmail}
                </a>
              )}
              {product.sellerInstagram && (
                <a
                  href={`https://instagram.com/${product.sellerInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-3 rounded-lg text-center transition-colors"
                >
                  📸 @{product.sellerInstagram}
                </a>
              )}
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-secondary-900 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
