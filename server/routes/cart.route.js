import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

// All these routes are protected, requiring a user to be logged in.
router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);
  
router.route('/:productId')
  .delete(protect, removeFromCart);

export default router;