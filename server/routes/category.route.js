import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryByName } from '../controllers/category.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { admin } from '../middlewares/admin.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, upload.single('image'), createCategory);

router.route('/:name').get(getCategoryByName);

router.route('/:id')
  .delete(protect, admin, deleteCategory);

export default router;