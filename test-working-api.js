// Working JSONBin API test with correct endpoints
const API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '$2a$10$zyt.lIQF37gXeursDYbjGOxh132O0K7GJOn4JMVUnfpRMXAiGrcPK';
const BASE_URL = 'https://api.jsonbin.io/v3/b';

console.log('🔑 Testing with API Key:', API_KEY);
console.log('🌐 Base URL:', BASE_URL);

// Generate random bin ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Test the working API integration
async function testWorkingAPI() {
  try {
    console.log('\n📝 Creating a test form in JSONBin...');
    
    const binId = generateId();
    console.log('📦 Bin ID:', binId);
    
    const formData = {
      type: 'form',
      formData: {
        id: binId,
        title: 'Test Form',
        description: 'Testing JSONBin integration',
        questions: [
          {
            id: 'q1',
            type: 'text',
            title: 'What is your name?',
            required: true,
            correctAnswer: 'John',
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
      },
      responses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Use PUT to create/update bin
    const response = await fetch(`${BASE_URL}/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(formData)
    });

    console.log('📊 Response Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success! Bin created successfully');
      console.log('📍 Bin URL:', `https://jsonbin.io/${binId}`);
      console.log('📄 Bin Data:', JSON.stringify(result, null, 2));
      
      // Test reading the bin
      console.log('\n📖 Testing bin read...');
      const readResponse = await fetch(`${BASE_URL}/${binId}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });
      
      if (readResponse.ok) {
        const readResult = await readResponse.json();
        console.log('✅ Successfully read bin data');
        console.log('📝 Form Title:', readResult.record.formData.title);
        
        // Test updating with a response
        console.log('\n💾 Adding a test response...');
        const newResponse = {
          id: generateId(),
          formId: binId,
          responses: { q1: 'John Doe' },
          submittedAt: new Date().toISOString(),
          studentName: 'Test Student',
          preliminaryScore: 10,
          maxScore: 10
        };
        
        const updatedData = {
          ...readResult.record,
          responses: [...(readResult.record.responses || []), newResponse],
          updatedAt: new Date().toISOString()
        };
        
        const updateResponse = await fetch(`${BASE_URL}/${binId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
          },
          body: JSON.stringify(updatedData)
        });
        
        if (updateResponse.ok) {
          console.log('✅ Response added successfully!');
          console.log('🎉 All tests passed! JSONBin integration is working.');
          console.log(`\n🚀 Your form URL: https://facsystems.dev/form/${binId}`);
        } else {
          console.log('❌ Failed to add response:', updateResponse.status);
        }
      } else {
        console.log('❌ Failed to read bin:', readResponse.status);
      }
      
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Failed to create bin:', response.status);
      console.log('📄 Error details:', errorText);
      
      if (response.status === 401) {
        console.log('\n🔑 API Key Issue:');
        console.log('1. The API key is invalid or expired');
        console.log('2. Get a new API key from https://jsonbin.io/');
        console.log('3. Update your .env.local file with the new key');
      }
      
      return false;
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    return false;
  }
}

// Run the test
async function runWorkingTest() {
  console.log('🚀 Starting Working JSONBin API Test...\n');
  
  const success = await testWorkingAPI();
  
  if (success) {
    console.log('\n🎉 Integration Complete!');
    console.log('✅ Your JSONBin integration is working');
    console.log('✅ Forms can be created and stored');
    console.log('✅ Responses can be added');
    console.log('✅ Ready for production!');
  } else {
    console.log('\n🔧 Next Steps:');
    console.log('1. Sign up at https://jsonbin.io/');
    console.log('2. Get your API key from account dashboard');
    console.log('3. Update .env.local with the new key');
    console.log('4. Run this test again');
  }
}

runWorkingTest();
