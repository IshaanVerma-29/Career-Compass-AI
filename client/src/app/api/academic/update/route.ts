import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userClass, academicData } = await request.json();
    
    console.log('Academic data received:', { userClass, academicData });

    // Validate required fields
    if (!userClass || !academicData) {
      return NextResponse.json(
        { message: 'User class and academic data are required' },
        { status: 400 }
      );
    }

    // Send to backend for storage
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/academic/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userClass,
        academicData,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      console.error('Backend error:', response.status);
      return NextResponse.json(
        { message: 'Failed to save academic data' },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      message: 'Academic data saved successfully',
      data: result
    });

  } catch (error) {
    console.error('Academic data save error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Academic update endpoint - POST method required' },
    { status: 405 }
  );
}
