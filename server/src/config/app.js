import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5001,
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  env: process.env.NODE_ENV
};