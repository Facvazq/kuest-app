// Script to create a sample form for testing
const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here';

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleForm = {
  id: 'lds3zn8sk', // The ID from the URL
  title: 'Sample Questionnaire',
  description: 'This is a sample form to test the Supabase integration. It includes various question types and demonstrates the questionnaire mode with auto-scoring.',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      title: 'What is the capital of France?',
      emoji: '🏛️',
      required: true,
      helpText: 'Choose the correct answer',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      points: 10
    },
    {
      id: 'q2',
      type: 'checkbox',
      title: 'Which of the following are programming languages?',
      emoji: '💻',
      required: true,
      helpText: 'Select all that apply',
      options: ['JavaScript', 'HTML', 'Python', 'CSS', 'Java'],
      correctAnswer: ['JavaScript', 'Python', 'Java'],
      points: 15
    },
    {
      id: 'q3',
      type: 'text',
      title: 'What is your name?',
      emoji: '👤',
      required: true,
      helpText: 'Enter your full name'
    },
    {
      id: 'q4',
      type: 'paragraph',
      title: 'Tell us about yourself',
      emoji: '📝',
      required: false,
      helpText: 'Write a brief description about yourself'
    },
    {
      id: 'q5',
      type: 'rating',
      title: 'How would you rate this form?',
      emoji: '⭐',
      required: true,
      helpText: 'Rate from 1 to 5',
      ratingScale: 5
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  theme: 'default',
  accentColor: '#22c55e',
  backgroundStyle: 'gradient',
  backgroundColor: '#000000',
  mode: 'questionnaire',
  passingMark: 70,
  is_public: true
};

async function createSampleForm() {
  try {
    console.log('Creating sample form...');
    
    const { data, error } = await supabase
      .from('forms')
      .upsert([sampleForm], { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Error creating form:', error);
      return;
    }

    console.log('✅ Sample form created successfully!');
    console.log('Form ID:', sampleForm.id);
    console.log('Form URL:', `https://www.facsystems.dev/form/${sampleForm.id}`);
    console.log('Form data:', data);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Check if Supabase is configured
if (supabaseUrl === 'https://your-project-ref.supabase.co' || supabaseKey === 'your-anon-key-here') {
  console.log('❌ Supabase not configured. Please set up your environment variables first.');
  console.log('Create a .env.local file with:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here');
} else {
  createSampleForm();
}
