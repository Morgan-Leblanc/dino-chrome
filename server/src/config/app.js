import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5001,
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  env: process.env.NODE_ENV
};