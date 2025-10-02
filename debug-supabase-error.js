// Debug the exact Supabase error
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dmnzsckdnzapycpektjn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbnpzY2tkbnphcHljcGVrdGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjE2NDUsImV4cCI6MjA3NDkzNzY0NX0.hz5MOMc1UON9JyeAO2zgU5mTqamfn8UU48Ja_4BbCRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugError() {
  try {
    console.log('🔍 Testing exact same operation that fails in browser...');
    
    // This mimics what the browser is trying to do
    const formData = {
      id: 'debug-test-789',
      title: 'Debug Test Form',
      description: 'Testing the exact same operation',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          title: 'Test question?',
          required: true,
          options: ['A', 'B', 'C'],
          correctAnswer: 'A',
          points: 10
        }
      ],
      theme: 'default',
      accent_color: '#22c55e',
      background_style: 'gradient',
      background_color: '#000000',
      mode: 'questionnaire',
      passing_mark: 70,
      is_public: true
    };
    
    console.log('📝 Attempting to insert form...');
    
    // Try the insert operation
    const { data, error } = await supabase
      .from('forms')
      .insert([formData])
      .select();
    
    if (error) {
      console.error('❌ Insert failed with error:', error);
      console.error('   Code:', error.code);
      console.error('   Message:', error.message);
      console.error('   Details:', error.details);
      console.error('   Hint:', error.hint);
      return;
    }
    
    console.log('✅ Insert successful:', data);
    
    // Try to read it back
    console.log('📖 Attempting to read form back...');
    
    const { data: readData, error: readError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', 'debug-test-789')
      .single();
    
    if (readError) {
      console.error('❌ Read failed:', readError);
      return;
    }
    
    console.log('✅ Read successful:', readData);
    
    // Clean up
    await supabase.from('forms').delete().eq('id', 'debug-test-789');
    console.log('🧹 Cleaned up test form');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugError();
