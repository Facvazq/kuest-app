// Simple test to check JSONBin API connectivity
const API_KEY = '$2a$10$zyt.lIQF37gXeursDYbjGOxh132O0K7GJOn4JMVUnfpRMXAiGrcPK';
const BASE_URL = 'https://api.jsonbin.io/v3/b';

console.log('🔑 Testing API Key:', API_KEY);
console.log('🌐 Base URL:', BASE_URL);

// Test 1: Basic connectivity
async function testBasicAPI() {
  try {
    console.log('\n📡 Test 1: Testing basic API connectivity...');
    
    // Generate a test bin ID
    const testBinId = Math.random().toString(36).substr(2, 9);
    console.log('📦 Test Bin ID:', testBinId);
    
    // Try to create a test bin
    const createResponse = await fetch(`${BASE_URL}/${testBinId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({
        test: 'Connection test',
        timestamp: new Date().toISOString()
      })
    });

    console.log('📊 Response Status:', createResponse.status);
    console.log('📊 Response Headers:', Object.fromEntries(createResponse.headers.entries()));

    const responseText = await createResponse.text();
    console.log('📄 Raw Response:', responseText.substring(0, 200));
    
    if (createResponse.ok) {
      const result = JSON.parse(responseText);
      console.log('✅ Success! Bin created:', result);
      return true;
    } else {
      console.log('❌ Failed:', createResponse.status, responseText);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 2: Check if we can read a known bin
async function testReadBin() {
  try {
    console.log('\n📖 Test 2: Testing bin read...');
    
    // Try to read a bin (this will likely fail, but gives us info)
    const response = await fetch(`${BASE_URL}/test/1`, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY
      }
    });

    console.log('📊 Read Status:', response.status);
    
    if (response.status === 404) {
      console.log('✅ API responding correctly (404 for non-existent bin)');
      return true;
    } else if (response.status === 401) {
      console.log('🔑 API key issue detected (401 Unauthorized)');
      return false;
    } else {
      const responseText = await response.text();
      console.log('📄 Response:', responseText.substring(0, 200));
      return response.ok;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting JSONBin API Tests...\n');
  
  const test1 = await testBasicAPI();
  const test2 = await testReadBin();
  
  console.log('\n📋 Test Results:');
  console.log('✅ Basic API:', test1 ? 'PASS' : 'FAIL');
  console.log('✅ Read Bin:', test2 ? 'PASS' : 'FAIL');
  
  if (!test1 && !test2) {
    console.log('\n🔧 Recommendations:');
    console.log('1. Verify API key is correct');
    console.log('2. Check JSONBin account status');
    console.log('3. Ensure API key has necessary permissions');
    console.log('4. Try generating a new API key');
  }
}

runTests();
