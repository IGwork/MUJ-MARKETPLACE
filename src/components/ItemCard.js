import React from 'react';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item, onItemClick, onDelete, onEdit, isOwner }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="card overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            size={20}
            className={isFavorited ? 'fill-primary-500 text-primary-500' : 'text-gray-400'}
          />
        </button>
        {item.negotiable && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Negotiable
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center text-primary-500 font-bold text-lg mb-2">
          ₹{item.price.toLocaleString('en-IN')}
        </div>

        <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b">
          <img
            src={item.sellerAvatar}
            alt={item.sellerName}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <p className="text-xs font-medium text-secondary-700">{item.sellerName}</p>
            <p className="text-xs text-secondary-600">{item.sellerPhone}</p>
          </div>
        </div>

        {/* Footer Actions */}
        {isOwner ? (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
              className="flex-1 text-xs btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              className="flex-1 text-xs px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={handleViewDetails}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
