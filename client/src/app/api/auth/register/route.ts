import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration API called');
    
    const formData = await request.formData();
    console.log('Form data received');
    
    const userData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      classStatus: formData.get('classStatus') as string,
      schoolBoard: formData.get('schoolBoard') as string,
      gender: formData.get('gender') as string,
      password: formData.get('password') as string,
    };

    console.log('User data extracted:', userData);

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'city', 'state', 'classStatus', 'schoolBoard', 'gender', 'password'];
    for (const field of requiredFields) {
      if (!userData[field as keyof typeof userData]) {
        console.log(`Missing field: ${field}`);
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(userData.phone)) {
      return NextResponse.json(
        { message: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    console.log('Sending to backend server...');

    // Send data to backend server
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.text();
      console.log('Backend error:', errorData);
      return NextResponse.json(
        { message: 'Registration failed on backend' },
        { status: backendResponse.status }
      );
    }

    const result = await backendResponse.json();
    console.log('Registration successful:', result);

    return NextResponse.json({
      message: 'Registration successful',
      user: result.user,
      token: result.token,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Registration endpoint - POST method required' },
    { status: 405 }
  );
}
