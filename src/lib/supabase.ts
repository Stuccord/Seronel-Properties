import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client.
// Note: In a real application, you must replace these placeholders or set the environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
