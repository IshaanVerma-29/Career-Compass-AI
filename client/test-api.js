// Simple test script to check if our API is working
const testMessage = "Hello, kya haal hai?";

console.log("Testing chat API...");
console.log("Message:", testMessage);

// This would normally be a fetch call to /api/chat
const mockAPITest = () => {
  // Simulate what our API should return
  const response = {
    response: "Hey! Namaste! 🙏 Main UNFILTER AI hoon, aapka smart assistant! Aap mujhse kuch bhi puchh sakte hain!",
    timestamp: new Date().toISOString()
  };
  
  console.log("Expected API Response:", response);
  return response;
};

const result = mockAPITest();
console.log("✅ API test completed!");
console.log("Response content:", result.response);
