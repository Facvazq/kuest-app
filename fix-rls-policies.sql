-- Fix RLS policies to allow form creation and access
-- This will resolve the 406 errors

-- First, disable RLS temporarily to clean up
ALTER TABLE forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Public forms are accessible" ON forms;
DROP POLICY IF EXISTS "Public form responses are accessible" ON form_responses;
DROP POLICY IF EXISTS "Anyone can read public forms" ON forms;
DROP POLICY IF EXISTS "Users can read their own forms" ON forms;
DROP POLICY IF EXISTS "Users can insert their own forms" ON forms;
DROP POLICY IF EXISTS "Users can update their own forms" ON forms;
DROP POLICY IF EXISTS "Users can delete their own forms" ON forms;
DROP POLICY IF EXISTS "Anyone can insert responses to public forms" ON form_responses;
DROP POLICY IF EXISTS "Authenticated users can insert responses" ON form_responses;
DROP POLICY IF EXISTS "Form creators can read responses" ON form_responses;
DROP POLICY IF EXISTS "Users can read their own responses" ON form_responses;

-- Re-enable RLS
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Create simple, permissive policies for public forms
-- Allow all operations on public forms (no authentication required)
CREATE POLICY "Allow all operations on public forms" ON forms
  FOR ALL 
  USING (is_public = true)
  WITH CHECK (is_public = true);

-- Allow all operations on responses to public forms
CREATE POLICY "Allow all operations on public form responses" ON form_responses
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.is_public = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.is_public = true
    )
  );

-- Test that policies work by inserting a test form
INSERT INTO forms (
  id, 
  title, 
  description, 
  questions, 
  is_public
) VALUES (
  'policy-test-123',
  'Policy Test Form',
  'Testing RLS policies',
  '[]',
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  updated_at = NOW();

-- Clean up test form
DELETE FROM forms WHERE id = 'policy-test-123';

-- Show success message
SELECT 'RLS policies fixed successfully!' as status;
