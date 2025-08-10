import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { admin } from '../middlewares/admin.middleware.js';
import upload from '../middlewares/upload.middleware.js';
const router = express.Router();

// Route for getting all products
router.route('/').get(getProducts);

// Route for getting a single product by its ID
router.route('/:id').get(getProductById);

// Admin routes for creating, updating, and deleting products

router.route('/').post(protect, admin, upload.single('image'), createProduct);


// Update and Delete a product
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;