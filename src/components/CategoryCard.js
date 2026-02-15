import React from 'react';

const CategoryCard = ({ category, itemCount, onBrowse }) => {
  return (
    <div
      onClick={onBrowse}
      className={`bg-gradient-to-br ${category.color} rounded-lg p-6 text-white cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
      <p className="text-sm opacity-90 mb-4">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{itemCount} items</span>
        <button className="text-xs font-semibold px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all">
          Browse →
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
