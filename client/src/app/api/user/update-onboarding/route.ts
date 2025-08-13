import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// In-memory storage for users
let users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { completed } = await request.json();
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const userId = decoded.userId;

    // Find and update user
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update onboarding status
    users[userIndex].academicOnboardingComplete = completed;

    // Return updated user data (without password)
    const { password, ...userWithoutPassword } = users[userIndex];

    return NextResponse.json({
      message: 'Onboarding status updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Error updating onboarding status:', error);
    return NextResponse.json(
      { error: 'Failed to update onboarding status' },
      { status: 500 }
    );
  }
}
