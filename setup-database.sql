-- Create forms table with correct column names for our app
CREATE TABLE IF NOT EXISTS forms (
  id TEXT PRIMARY KEY,  -- Using TEXT instead of UUID to match our app
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  theme TEXT DEFAULT 'default',
  accent_color TEXT DEFAULT '#22c55e',  -- This matches our app's accentColor
  background_style TEXT DEFAULT 'gradient',
  background_color TEXT DEFAULT '#000000',
  mode TEXT DEFAULT 'standard',
  passing_mark INTEGER DEFAULT 70,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true
);

-- Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id TEXT PRIMARY KEY,  -- Using TEXT to match our app
  form_id TEXT REFERENCES forms(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_name TEXT,
  preliminary_score INTEGER,
  final_score INTEGER,
  max_score INTEGER,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_forms_user_id ON forms(user_id);
CREATE INDEX IF NOT EXISTS idx_forms_public ON forms(is_public);
CREATE INDEX IF NOT EXISTS idx_form_responses_form_id ON form_responses(form_id);
CREATE INDEX IF NOT EXISTS idx_form_responses_user_id ON form_responses(user_id);

-- Enable Row Level Security
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forms
-- Allow anyone to read public forms
DROP POLICY IF EXISTS "Anyone can read public forms" ON forms;
CREATE POLICY "Anyone can read public forms" ON forms
  FOR SELECT USING (is_public = true);

-- Allow anyone to insert public forms (for now, to test)
DROP POLICY IF EXISTS "Anyone can insert public forms" ON forms;
CREATE POLICY "Anyone can insert public forms" ON forms
  FOR INSERT WITH CHECK (is_public = true);

-- Allow anyone to update public forms (for now, to test)
DROP POLICY IF EXISTS "Anyone can update public forms" ON forms;
CREATE POLICY "Anyone can update public forms" ON forms
  FOR UPDATE USING (is_public = true);

-- RLS Policies for form_responses
-- Allow anyone to insert responses to public forms
DROP POLICY IF EXISTS "Anyone can insert responses to public forms" ON form_responses;
CREATE POLICY "Anyone can insert responses to public forms" ON form_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.is_public = true
    )
  );

-- Allow anyone to read responses to public forms (for testing)
DROP POLICY IF EXISTS "Anyone can read responses to public forms" ON form_responses;
CREATE POLICY "Anyone can read responses to public forms" ON form_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.is_public = true
    )
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
DROP TRIGGER IF EXISTS update_forms_updated_at ON forms;
CREATE TRIGGER update_forms_updated_at 
  BEFORE UPDATE ON forms 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
