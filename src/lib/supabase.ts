import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseForm {
  id: string;
  title: string;
  description: string;
  questions: any; // JSON field
  created_at: string;
  updated_at: string;
  theme: string;
  accent_color: string;
  background_style: string;
  background_color: string;
  mode: string;
  passing_mark: number;
  user_id?: string; // For authenticated users
  is_public: boolean; // Whether the form can be accessed without authentication
}

export interface DatabaseFormResponse {
  id: string;
  form_id: string;
  responses: any; // JSON field
  submitted_at: string;
  student_name?: string;
  preliminary_score?: number;
  final_score?: number;
  max_score?: number;
  user_id?: string; // For authenticated users
}
