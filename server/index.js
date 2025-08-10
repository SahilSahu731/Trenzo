import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js';
import categoryRoutes from './routes/category.route.js';
import cartRouter from './routes/cart.route.js'

dotenv.config();

const app = express();

// Database connection
connectDB();

// middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
// Cookie parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});