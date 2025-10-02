-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS form_responses CASCADE;
DROP TABLE IF EXISTS forms CASCADE;

-- Create forms table that matches our app exactly
CREATE TABLE forms (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  theme TEXT DEFAULT 'default',
  accent_color TEXT DEFAULT '#22c55e',
  background_style TEXT DEFAULT 'gradient',
  background_color TEXT DEFAULT '#000000',
  mode TEXT DEFAULT 'standard',
  passing_mark INTEGER DEFAULT 70,
  is_public BOOLEAN DEFAULT true
);

-- Create form_responses table
CREATE TABLE form_responses (
  id TEXT PRIMARY KEY,
  form_id TEXT REFERENCES forms(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_name TEXT,
  preliminary_score INTEGER,
  final_score INTEGER,
  max_score INTEGER
);

-- Create indexes for better performance
CREATE INDEX idx_forms_public ON forms(is_public);
CREATE INDEX idx_form_responses_form_id ON form_responses(form_id);

-- Enable Row Level Security
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Simple RLS policies - allow all operations on public forms
CREATE POLICY "Public forms are accessible" ON forms FOR ALL USING (is_public = true);
CREATE POLICY "Public form responses are accessible" ON form_responses FOR ALL USING (
  EXISTS (SELECT 1 FROM forms WHERE forms.id = form_responses.form_id AND forms.is_public = true)
);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on forms
CREATE TRIGGER update_forms_updated_at 
  BEFORE UPDATE ON forms 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
