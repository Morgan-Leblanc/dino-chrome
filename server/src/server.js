import express from 'express';
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

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;