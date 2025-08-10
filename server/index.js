import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js'

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
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});