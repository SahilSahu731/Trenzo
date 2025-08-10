import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';

// --- StarRating sub-component is now updated to show review count ---
const StarRating = ({ rating, numReviews }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full_${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
        {[...Array(totalStars - fullStars)].map((_, i) => <Star key={`empty_${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />)}
      </div>
      {/* Display the number of reviews */}
      <span className="text-xs text-gray-500 dark:text-gray-400">({numReviews})</span>
    </div>
  );
};

const ProductCard = ({ product, isNew }) => {
  if (!product || !product.image) {
    // Return a fallback or null if product data is incomplete
    return null; 
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-64 w-full overflow-hidden">
        {isNew && (
          <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            NEW
          </div>
        )}
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image.secure_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {/* --- Action buttons appear on hover --- */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white shadow-lg transform transition-transform hover:scale-110" title="Quick View">
            <Eye size={20} />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white shadow-lg transform transition-transform hover:scale-110" title="Add to Cart">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        {/* --- Display the Brand Name --- */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.brand}</p>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.category?.name}</p>
        
        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
          <Link to={`/product/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
          {/* --- Pass review count to StarRating --- */}
          <StarRating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;