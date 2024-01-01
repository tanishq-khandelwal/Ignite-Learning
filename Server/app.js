import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middlewares.js';
import dotenv from 'dotenv';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

dotenv.config();
const app = express();

// Logging middleware
app.use(morgan('dev'));
app.set("trust proxy", 1);

// CORS middleware
app.use(cors({
  origin: 'https://ignitelearning.netlify.app',
  credentials: true,
  httpOnly: false,
  optionSuccessStatus: 200,
  sameSite: 'None',
  secure: true,
  cookie: {
    secure: true,
    sameSite: 'None',
  }
}));

app.use(cookieParser());
app.use(express.json());  // Add this line to parse JSON requests

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Ping route
app.use('/ping', (req, res) => {
  res.send('pong');
});

// 404 route
app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 Page Not Found');
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
