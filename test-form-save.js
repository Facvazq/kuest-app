// Test form saving with our hybrid storage
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dmnzsckdnzapycpektjn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbnpzY2tkbnphcHljcGVrdGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjE2NDUsImV4cCI6MjA3NDkzNzY0NX0.hz5MOMc1UON9JyeAO2zgU5mTqamfn8UU48Ja_4BbCRM';

const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate what our app does when saving a form
async function testFormSave() {
  try {
    console.log('🧪 Testing form save process...');
    
    // This is what our form builder creates
    const testForm = {
      id: 'test-quiz-456',
      title: 'My Test Quiz',
      description: 'Testing form save functionality',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          title: 'What is 2+2?',
          required: true,
          options: ['3', '4', '5'],
          correctAnswer: '4',
          points: 10
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme: 'default',
      accentColor: '#22c55e',
      backgroundStyle: 'gradient',
      backgroundColor: '#000000',
      mode: 'questionnaire',
      passingMark: 70
    };
    
    console.log('📝 Attempting to save form with our app structure...');
    
    // Convert to database format (like our supabase-storage.ts does)
    const dbForm = {
      id: testForm.id,
      title: testForm.title,
      description: testForm.description,
      questions: testForm.questions,
      theme: testForm.theme,
      accent_color: testForm.accentColor,
      background_style: testForm.backgroundStyle,
      background_color: testForm.backgroundColor,
      mode: testForm.mode,
      passing_mark: testForm.passingMark,
      is_public: true
    };
    
    const { data, error } = await supabase
      .from('forms')
      .insert([dbForm])
      .select();
    
    if (error) {
      console.error('❌ Save failed:', error);
      return;
    }
    
    console.log('✅ Form saved successfully!');
    console.log('📊 Saved form:', data[0]);
    
    // Test retrieval
    const { data: retrieved, error: retrieveError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', testForm.id)
      .single();
    
    if (retrieveError) {
      console.error('❌ Retrieval failed:', retrieveError);
      return;
    }
    
    console.log('✅ Form retrieved successfully!');
    console.log('🔗 Form URL: https://facsystems.dev/form/' + retrieved.id);
    
    // Clean up
    await supabase.from('forms').delete().eq('id', testForm.id);
    console.log('🧹 Test form cleaned up');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testFormSave();
