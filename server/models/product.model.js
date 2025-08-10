import mongoose from 'mongoose';

// A sub-schema for reviews
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // A rating from 1 to 5
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the admin/user who created it
    },
    name: {
      type: String,
      required: true,
    },
     image: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    brand: {
      type: String,
      required: true,
    },
     category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category', // This creates the relationship
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // An array of review objects
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;