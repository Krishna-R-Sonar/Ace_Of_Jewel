import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/errorHandler.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import cartRoutes from './routes/blogRoutes.js';
import customizationRoutes from './routes/customizationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import giftRoutes from './routes/giftRoutes.js';
import loyaltyRoutes from './routes/loyaltyRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// security headers
app.use(helmet());

// cors config
const corsOptions = {
    origin: ['http://localhost:5173', 'https://www.example.com'],
    credentials: true, // allow cookies across origins
};

app.use(cors(corsOptions));

// logging
app.use(morgan('combined')); // Use 'dev' for less detailed logs

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// rate limiter to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// serve static files (for images/uploads)
app.use('/public', express.static('public'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/customization', customizationRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/gift', giftRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsletterRoutes);

// error handling middleware
app.use(errorHandler);

// catch 404 errors
app.use((req, res, next) => {
    res.status(404).json({message: 'Not Found'});
});

export default app;