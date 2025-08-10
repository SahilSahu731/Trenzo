import React from 'react';

const ProductImageGallery = ({ image, productName }) => {
  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
      <img 
        src={image.secure_url} 
        alt={productName} 
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
      />
    </div>
  );
};

export default ProductImageGallery;