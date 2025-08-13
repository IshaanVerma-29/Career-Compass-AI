import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
      method: 'GET',
    });
    
    return NextResponse.json({
      message: 'Backend connection test',
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      status: response.status
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Backend connection failed',
      error: String(error),
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ message: 'Test endpoint working' });
}
