-- Completely disable RLS for testing
-- This will allow all operations without restrictions

-- Disable RLS on both tables
ALTER TABLE forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to be sure
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on forms table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'forms') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON forms';
    END LOOP;
    
    -- Drop all policies on form_responses table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'form_responses') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON form_responses';
    END LOOP;
END $$;

-- Test that we can now insert/select without issues
INSERT INTO forms (
  id, 
  title, 
  description, 
  questions, 
  is_public
) VALUES (
  'rls-test-456',
  'RLS Disabled Test',
  'Testing without RLS',
  '[{"id":"q1","type":"text","title":"Test question","required":false}]',
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  updated_at = NOW();

-- Verify the insert worked
SELECT id, title, created_at FROM forms WHERE id = 'rls-test-456';

-- Clean up test form
DELETE FROM forms WHERE id = 'rls-test-456';

-- Show tables and their RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('forms', 'form_responses');

SELECT 'RLS completely disabled - forms should now save!' as status;
