import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const apiKey = process.env.MISTRAL_API_KEY;
  const apiUrl = 'https://api.mistral.ai/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: 'user', content: message }]
    })
  });

  return new NextResponse(response.body, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}