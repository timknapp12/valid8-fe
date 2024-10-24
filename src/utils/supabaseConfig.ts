import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL Statments for adding to supabase
// CREATE TABLE repositories (
//     id SERIAL PRIMARY KEY,
//     full_name TEXT NOT NULL,
//     repo_name TEXT NOT NULL,
//     username TEXT NOT NULL,
//     repo_url TEXT NOT NULL,
//     valid8_content JSONB NOT NULL,
//     num_of_clicks INTEGER DEFAULT 0
// );

// ALTER TABLE repositories
// ADD CONSTRAINT repositories_full_name_key UNIQUE (full_name);
