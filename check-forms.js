// Check what forms exist in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dmnzsckdnzapycpektjn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbnpzY2tkbnphcHljcGVrdGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjE2NDUsImV4cCI6MjA3NDkzNzY0NX0.hz5MOMc1UON9JyeAO2zgU5mTqamfn8UU48Ja_4BbCRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkForms() {
  try {
    console.log('📋 Checking forms in Supabase...');
    
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching forms:', error);
      return;
    }
    
    console.log(`📊 Found ${data.length} forms in database:`);
    
    data.forEach((form, index) => {
      console.log(`\n${index + 1}. ${form.title}`);
      console.log(`   ID: ${form.id}`);
      console.log(`   Mode: ${form.mode}`);
      console.log(`   Questions: ${form.questions.length}`);
      console.log(`   Created: ${new Date(form.created_at).toLocaleString()}`);
      console.log(`   URL: https://facsystems.dev/form/${form.id}`);
    });
    
    if (data.length === 0) {
      console.log('🔍 No forms found. This explains why the dashboard is empty.');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkForms();
