// Simple test to check Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dmnzsckdnzapycpektjn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbnpzY2tkbnphcHljcGVrdGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjE2NDUsImV4cCI6MjA3NDkzNzY0NX0.hz5MOMc1UON9JyeAO2zgU5mTqamfn8UU48Ja_4BbCRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('forms')
      .select('count', { count: 'exact' });
    
    if (error) {
      console.error('❌ Connection failed:', error);
      return;
    }
    
    console.log('✅ Connected to Supabase successfully!');
    console.log('📊 Forms table exists with', data.length, 'records');
    
    // Test 2: Try to insert a simple form
    const testForm = {
      id: 'test-form-123',
      title: 'Test Form',
      description: 'A simple test form',
      questions: [],
      is_public: true
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('forms')
      .insert([testForm])
      .select();
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError);
      return;
    }
    
    console.log('✅ Test form created successfully!');
    console.log('🔗 Test form URL: https://facsystems.dev/form/test-form-123');
    
    // Clean up - delete the test form
    await supabase
      .from('forms')
      .delete()
      .eq('id', 'test-form-123');
    
    console.log('🧹 Test form cleaned up');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testConnection();
