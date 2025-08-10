import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductReviews = ({ product, productId, currentUser }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // Placeholder for submitting a review
    console.log({ rating, comment, productId });
    // This would dispatch an action to a new review endpoint
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      {product.reviews.length === 0 && <p className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">No reviews yet. Be the first!</p>}
      
      <div className="space-y-6 mb-8">
        {product.reviews.map(review => (
          <div key={review._id} className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="text-gray-500" />
            </div>
            <div>
              <p className="font-semibold">{review.name}</p>
              <div className="flex items-center my-1">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-sm text-gray-500 mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Write a Review</h3>
        {currentUser ? (
          <form onSubmit={submitHandler} className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              {/* Star rating selection would go here */}
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="input-style w-full sm:w-1/3">
                <option value="0">Select...</option><option value="1">1 - Poor</option><option value="2">2 - Fair</option><option value="3">3 - Good</option><option value="4">4 - Very Good</option><option value="5">5 - Excellent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="input-style w-full"></textarea>
            </div>
            <button type="submit" className="btn-primary">Submit Review</button>
          </form>
        ) : (
          <p className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-md text-blue-800 dark:text-blue-200">
            Please <Link to="/login" className="font-bold underline">log in</Link> to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;