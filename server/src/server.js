import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { helmet, rateLimit } from './middlewares/security/index.js';
import { corsOptions } from './config/cors.js';
import { config } from './config/app.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet);
app.use(rateLimit);

// Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection and server start
if (config.env !== 'test') {
  mongoose.connect(config.mongodb.uri)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
      });
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

export default app;