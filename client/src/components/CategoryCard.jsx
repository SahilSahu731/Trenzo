import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={category.linkTo} 
      className="group relative block w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg"
    >
      {/* Background Image with Hover Effect */}
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{category.name}</h3>
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
          <span className="text-sm font-semibold">Shop Now</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;