require('dotenv').config();
const axios = require('axios');

async function listAvailableModels() {
  console.log('Fetching available models for your Gemini API key...');
  
  if (!process.env.Gemini_API_KEY) {
    console.error('ERROR: Gemini_API_KEY not found in .env file');
    return false;
  }

  try {
    console.log('Sending request to list models...');
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.Gemini_API_KEY}`
    );

    if (response.data && response.data.models) {
      console.log('\n✅ SUCCESS! Available models:');
      response.data.models.forEach(model => {
        console.log(`- ${model.name} (displayName: ${model.displayName})`);
        console.log(`  Supported methods: ${model.supportedGenerationMethods ? model.supportedGenerationMethods.join(', ') : 'None'}`);
        console.log('');
      });
      return true;
    } else {
      console.error('❌ ERROR: Unexpected response format');
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.error('❌ ERROR: Failed to fetch models');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error message:', error.message);
    }
    return false;
  }
}

// Run the test
listAvailableModels().then(success => {
  if (success) {
    console.log('\n🎉 Model list completed successfully!');
    process.exit(0);
  } else {
    console.log('\n💥 Failed to list models. Please check your API key.');
    process.exit(1);
  }
});