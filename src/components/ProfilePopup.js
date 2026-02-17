import React, { useState, useRef, useEffect } from 'react';
import { X, Edit2, Save, Instagram, Mail, Phone, User } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';

const ProfilePopup = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile } = useMarketplace();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    instagram: currentUser?.instagram || '',
  });
  const popupRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      instagram: currentUser?.instagram || '',
    });
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      instagram: currentUser?.instagram || '',
    });
    setIsEditing(false);
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4 z-50 pt-20">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in slide-in-from-right-5 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary-200"
            />
          </div>

          {/* Profile Information */}
          <div className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{currentUser.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <p className="text-gray-800 font-medium break-all">{currentUser.email}</p>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID
              </label>
              <p className="text-gray-800 font-medium">{currentUser.registrationNumber}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              ) : (
                <p className="text-gray-800 font-medium">{currentUser.phone}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Instagram size={16} className="inline mr-2" />
                Instagram Handle (Optional)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="your_username"
                />
              ) : (
                <p className="text-gray-800 font-medium">
                  {currentUser.instagram ? (
                    <a
                      href={`https://instagram.com/${currentUser.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 no-underline"
                    >
                      @{currentUser.instagram}
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">Not added yet</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Buttons */}
          <div className="space-y-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-secondary-900 font-semibold px-4 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-secondary-900 font-semibold px-4 py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>

          {/* Info Note */}
          <p className="text-xs text-gray-600 mt-4 text-center">
            {isEditing
              ? 'Changes will be applied to new listings'
              : 'This information will be shown to buyers on your listings'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
