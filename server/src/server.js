import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { helmet, rateLimit } from './middlewares/security/index.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import scoreRoutes from './routes/scores.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://dino-chrome.vercel.app',
  'https://dino-chrome-1j5s0ljc9-morganleblancs-projects.vercel.app',
  'http://localhost:3000' // Pour le développement local
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(helmet);
app.use(rateLimit);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

export default app;
