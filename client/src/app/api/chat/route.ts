import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('🔥 Chat API called');
    const { message } = await req.json();
    console.log('📝 User message:', message);

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    const apiUrl = process.env.MISTRAL_API_URL || 'https://api.mistral.ai/v1/chat/completions';

    console.log('🔑 API Key exists:', !!apiKey);
    console.log('🌐 API URL:', apiUrl);

    if (!apiKey) {
      console.log('❌ No API key found');
      return NextResponse.json({ message: 'API key setup nahi hai! 🔑' });
    }

    console.log('🚀 Making API call to Mistral...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Please respond in a mix of Hindi and English (Hinglish) in a friendly, conversational tone.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        stream: false
      })
    });

    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Mistral API Error:', errorData);
      console.error('📊 Error status:', response.status);
      
      const fallbackMessage = `Aapne pucha: "${message}"\n\nMaaf kijiye, abhi API me issue hai (Status: ${response.status}). Lekin main yahan hoon! 😊`;
      return NextResponse.json({ message: fallbackMessage });
    }

    const data = await response.json();
    console.log('📦 API Response received');
    const aiMessage = data.choices?.[0]?.message?.content || 'Sorry, response nahi aa paya!';
    console.log('🤖 AI Message:', aiMessage.substring(0, 100) + '...');

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('💥 Chat API Error:', error);
    const helpfulMessage = 'Hello! 👋 Main AI assistant hoon! Abhi technical issue hai, lekin main yahan hoon! 😊';
    return NextResponse.json({ message: helpfulMessage });
  }
}