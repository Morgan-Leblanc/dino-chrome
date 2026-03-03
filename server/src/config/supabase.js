import { createClient } from '@supabase/supabase-js';
import { config } from './app.js';

export const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);
