import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addOrderItems } from '../controllers/order.controller.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
// You would add other routes here like '/myorders', '/:id'

export default router;