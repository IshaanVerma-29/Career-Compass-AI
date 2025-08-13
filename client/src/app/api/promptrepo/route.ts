import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { resumeDetails } = await req.json();

  const apiKey = process.env.PROMPTREPO_API_KEY;
  const apiUrl = 'https://api.promptrepo.com/api/private/promptrepo-careerai-sheet1?suggest=10';
  console.log(resumeDetails);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'x-api-key': `${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
        Resume: resumeDetails
    }])
  });

  return new NextResponse(response.body, {
    headers: { 'Content-Type': 'text' },
  });
}