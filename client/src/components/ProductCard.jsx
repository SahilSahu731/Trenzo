import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

// A helper function to render star ratings
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <Star key={`full_${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
      {halfStar && <Star key="half" className="w-4 h-4 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty_${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />)}
    </div>
  );
};

const ProductCard = ({ product, isNew }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          {/* --- NEW BADGE --- */}
          {isNew && (
            <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              NEW
            </div>
          )}
          <img 
            src={product.image.secure_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white shadow-lg transform transition-transform hover:scale-110">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        {/* ... rest of the card content is the same ... */}
      </div>
    </div>
  );
};

export default ProductCard;