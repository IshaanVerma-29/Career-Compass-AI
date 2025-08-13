const TestResult = require('../Schemas/TestResultSchema');

// Save test results
const saveTestResult = async (req, res) => {
  try {
    const { results, answers, completedAt } = req.body;

    // Create new test result
    const testResult = new TestResult({
      userId: req.user?.id || null, // If user is authenticated
      userEmail: req.user?.email || null,
      results,
      answers,
      completedAt: new Date(completedAt),
      createdAt: new Date()
    });

    const savedResult = await testResult.save();

    res.status(201).json({
      success: true,
      message: 'Test results saved successfully',
      data: savedResult
    });
  } catch (error) {
    console.error('Error saving test results:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save test results',
      error: error.message
    });
  }
};

// Get user's test results
const getUserTestResults = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    let query = {};
    if (userId) {
      query.userId = userId;
    } else if (userEmail) {
      query.userEmail = userEmail;
    } else {
      // For demo purposes, return mock data if no user
      return res.json({
        success: true,
        data: {
          lastTestDate: new Date().toISOString(),
          overallScore: 85,
          subjectScores: {
            'Mathematics': 80,
            'Physics': 75,
            'Chemistry': 90,
            'Biology': 85,
            'English': 95,
            'Hindi': 70,
            'Social Studies': 88,
            'General Knowledge': 92,
            'Sports': 60
          }
        }
      });
    }

    const testResults = await TestResult.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    if (testResults.length === 0) {
      return res.json({
        success: true,
        data: null
      });
    }

    // Get latest test result
    const latestResult = testResults[0];
    
    // Format response
    const response = {
      lastTestDate: latestResult.completedAt,
      overallScore: latestResult.results.overall.percentage,
      subjectScores: {}
    };

    // Convert Map to object for subjects
    if (latestResult.results.subjects) {
      for (const [subject, data] of latestResult.results.subjects) {
        response.subjectScores[subject] = data.percentage;
      }
    }

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test results',
      error: error.message
    });
  }
};

// Get all test results for analytics
const getAllTestResults = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const testResults = await TestResult.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testResults
    });
  } catch (error) {
    console.error('Error fetching all test results:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test results',
      error: error.message
    });
  }
};

module.exports = {
  saveTestResult,
  getUserTestResults,
  getAllTestResults
};
