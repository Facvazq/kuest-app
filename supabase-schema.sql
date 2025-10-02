-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true
);

-- Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
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

-- Enable Row Level Security (after tables are created)
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forms
-- Allow anyone to read public forms
CREATE POLICY "Anyone can read public forms" ON forms
  FOR SELECT USING (is_public = true);

-- Allow authenticated users to read their own forms
CREATE POLICY "Users can read their own forms" ON forms
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own forms
CREATE POLICY "Users can insert their own forms" ON forms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own forms
CREATE POLICY "Users can update their own forms" ON forms
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to delete their own forms
CREATE POLICY "Users can delete their own forms" ON forms
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for form_responses
-- Allow anyone to insert responses to public forms
CREATE POLICY "Anyone can insert responses to public forms" ON form_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.is_public = true
    )
  );

-- Allow authenticated users to insert responses to any form
CREATE POLICY "Authenticated users can insert responses" ON form_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow form creators to read responses to their forms
CREATE POLICY "Form creators can read responses" ON form_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.user_id = auth.uid()
    )
  );

-- Allow users to read their own responses
CREATE POLICY "Users can read their own responses" ON form_responses
  FOR SELECT USING (auth.uid() = user_id);

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
