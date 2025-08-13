import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Forward to backend server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/test-results/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Error saving test results:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save test results' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Forward to backend server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/test-results/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const result = await response.json()
    
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch test results' },
      { status: 500 }
    )
  }
}
