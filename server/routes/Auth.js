const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temporary in-memory storage for demo
let users = [];

// Register new user with complete profile
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    const {
      fullName,
      email,
      phone,
      city,
      state,
      classStatus,
      schoolBoard,
      gender,
      password,
      reportCard
    } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => 
      user.email === email || user.phone === phone
    );

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or phone' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      city,
      state,
      classStatus,
      schoolBoard,
      gender,
      password: hashedPassword,
      reportCard: reportCard || null,
      registrationDate: new Date(),
      isProfileComplete: true,
      academicProgress: {
        currentGrade: classStatus,
        subjects: [],
        strengths: [],
        weaknesses: [],
        recommendations: []
      },
      preferences: {
        learningStyle: 'visual',
        interests: [],
        careerGoals: []
      }
    };

    // Save user to in-memory storage
    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email,
        class: newUser.classStatus 
      },
      process.env.JWT_SECRET || 'unfilter_ai_secret_key',
      { expiresIn: '30d' }
    );

    console.log('User registered successfully:', newUser.email);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.fullName,
        email: newUser.email,
        class: newUser.classStatus,
        location: `${newUser.city}, ${newUser.state}`,
        board: newUser.schoolBoard
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in memory
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        class: user.classStatus 
      },
      process.env.JWT_SECRET || 'unfilter_ai_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        class: user.classStatus,
        location: `${user.city}, ${user.state}`,
        board: user.schoolBoard
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
});

// Get all users (for testing)
router.get('/users', (req, res) => {
  res.json({
    message: 'Users list',
    count: users.length,
    users: users.map(user => ({
      id: user.id,
      name: user.fullName,
      email: user.email,
      class: user.classStatus
    }))
  });
});

// Update academic data
router.post('/academic/update', (req, res) => {
  try {
    const { userClass, academicData, userId } = req.body;
    
    console.log('Academic data update request:', { userClass, academicData });

    // For now, just store in memory (in production, save to database)
    const academicRecord = {
      id: Date.now().toString(),
      userClass,
      academicData,
      createdAt: new Date(),
      llmTrainingData: {
        class: userClass,
        subjects: academicData.subjects,
        percentage: academicData.overallPercentage,
        classSpecific: academicData[`class${userClass.replace(/\D/g, '')}`] || {},
        
        // LLM training features
        academicPerformance: calculateAcademicPerformance(academicData),
        strengths: identifyStrengths(academicData),
        interests: extractInterests(academicData),
        careerReadiness: assessCareerReadiness(userClass, academicData),
        recommendations: generateRecommendations(userClass, academicData)
      }
    };

    // Store academic record (in production, save to database)
    if (!global.academicRecords) {
      global.academicRecords = [];
    }
    global.academicRecords.push(academicRecord);

    res.json({
      message: 'Academic data saved successfully',
      record: academicRecord,
      llmInsights: academicRecord.llmTrainingData
    });

  } catch (error) {
    console.error('Academic data update error:', error);
    res.status(500).json({
      message: 'Failed to update academic data',
      error: error.message
    });
  }
});

// Helper functions for LLM training data generation
function calculateAcademicPerformance(data) {
  const grades = Object.values(data.subjects);
  const gradePoints = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C': 6, 'D': 5
  };
  
  const totalPoints = grades.reduce((sum, grade) => {
    return sum + (gradePoints[grade] || 0);
  }, 0);
  
  return {
    averageGrade: totalPoints / grades.length || 0,
    totalSubjects: grades.length,
    overallPercentage: data.overallPercentage,
    performance: data.overallPercentage >= 90 ? 'Excellent' : 
                data.overallPercentage >= 75 ? 'Good' : 
                data.overallPercentage >= 60 ? 'Average' : 'Needs Improvement'
  };
}

function identifyStrengths(data) {
  const strengths = [];
  
  // Subject-wise strengths
  Object.entries(data.subjects).forEach(([subject, grade]) => {
    if (grade === 'A+' || grade === 'A') {
      strengths.push(`Strong in ${subject}`);
    }
  });
  
  // Interest-based strengths (for 9th class)
  if (data.class9?.interestRatings) {
    Object.entries(data.class9.interestRatings).forEach(([area, rating]) => {
      if (rating >= 4) {
        strengths.push(`High interest in ${area}`);
      }
    });
  }
  
  return strengths;
}

function extractInterests(data) {
  const interests = [];
  
  // From class-specific data
  if (data.class9?.interestRatings) {
    Object.entries(data.class9.interestRatings).forEach(([area, rating]) => {
      interests.push({ area, rating, source: 'self-assessment' });
    });
  }
  
  if (data.class9?.extracurriculars) {
    data.class9.extracurriculars.forEach(activity => {
      interests.push({ area: activity, rating: 5, source: 'participation' });
    });
  }
  
  return interests;
}

function assessCareerReadiness(userClass, data) {
  const classNum = parseInt(userClass.replace(/\D/g, ''));
  
  return {
    currentClass: classNum,
    academicPreparation: data.overallPercentage,
    competitiveExamReadiness: data[`class${classNum}`]?.competitiveExams?.length || 0,
    confidenceLevel: data[`class${classNum}`]?.confidenceLevel || data[`class${classNum}`]?.confidenceRating || 0,
    streamClarity: data[`class${classNum}`]?.streamConsidered?.length || 0,
    readinessScore: calculateReadinessScore(classNum, data)
  };
}

function calculateReadinessScore(classNum, data) {
  let score = 0;
  
  // Academic performance (40%)
  score += (data.overallPercentage / 100) * 40;
  
  // Competitive exam preparation (20%)
  const exams = data[`class${classNum}`]?.competitiveExams?.length || 0;
  score += Math.min(exams / 3, 1) * 20;
  
  // Confidence level (20%)
  const confidence = data[`class${classNum}`]?.confidenceLevel || data[`class${classNum}`]?.confidenceRating || 0;
  score += (confidence / 5) * 20;
  
  // Stream clarity (20%)
  const streamOptions = data[`class${classNum}`]?.streamConsidered?.length || 1;
  score += Math.min(streamOptions / 2, 1) * 20;
  
  return Math.round(score);
}

function generateRecommendations(userClass, data) {
  const recommendations = [];
  const classNum = parseInt(userClass.replace(/\D/g, ''));
  
  // Academic recommendations
  if (data.overallPercentage < 75) {
    recommendations.push({
      type: 'academic',
      priority: 'high',
      message: 'Focus on improving overall academic performance',
      actions: ['Regular study schedule', 'Subject-wise improvement plan', 'Seek additional help']
    });
  }
  
  // Subject-specific recommendations
  Object.entries(data.subjects).forEach(([subject, grade]) => {
    if (grade === 'C' || grade === 'D') {
      recommendations.push({
        type: 'subject',
        priority: 'medium',
        message: `Needs improvement in ${subject}`,
        actions: [`Focus more time on ${subject}`, 'Consider additional practice', 'Seek help from teachers']
      });
    }
  });
  
  // Class-specific recommendations
  if (classNum === 9) {
    recommendations.push({
      type: 'exploration',
      priority: 'medium',
      message: 'Explore different career fields and interests',
      actions: ['Take career assessment tests', 'Participate in various extracurriculars', 'Research different career paths']
    });
  } else if (classNum === 10) {
    recommendations.push({
      type: 'stream_selection',
      priority: 'high',
      message: 'Important to choose the right stream for 11th',
      actions: ['Research stream requirements', 'Consider future career goals', 'Consult with counselors']
    });
  }
  
  return recommendations;
}

module.exports = router;