import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middlewares.js';
import dotenv from 'dotenv';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js'

dotenv.config();
const app = express(); // Create an instance of express

// Logging middleware
app.use(morgan('dev'));

// CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party

    const corsOptions ={
        origin:'https://ignitelearning.netlify.app', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(cookieParser());

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
