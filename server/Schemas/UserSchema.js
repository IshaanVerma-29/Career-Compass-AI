const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    
    // Location Info
    city: { type: String, required: true },
    state: { type: String, required: true },
    
    // Academic Info
    classStatus: { type: String, required: true }, // 8th, 9th, 10th, 11th, 12th
    schoolBoard: { type: String, required: true }, // CBSE, ICSE, State Board, etc.
    
    // Personal Info
    gender: { type: String, required: true },
    
    // Documents
    reportCard: { type: String }, // Base64 encoded file
    
    // Profile Status
    isProfileComplete: { type: Boolean, default: false },
    registrationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    
    // Academic Progress Tracking
    academicProgress: {
      currentGrade: String,
      subjects: [{
        name: String,
        marks: Number,
        grade: String,
        performance: String // excellent, good, average, poor
      }],
      strengths: [String], // Subject areas where student excels
      weaknesses: [String], // Areas needing improvement
      recommendations: [String] // AI generated recommendations
    },
    
    // AI Analysis Data
    aiAnalysis: {
      personalityType: String, // MBTI or custom type
      learningStyle: String, // visual, auditory, kinesthetic
      strengthAreas: [String],
      improvementAreas: [String],
      recommendedStreams: [String], // Science, Commerce, Arts
      careerSuggestions: [String],
      lastAnalyzed: { type: Date, default: Date.now }
    },
    
    // User Preferences
    preferences: {
      learningStyle: { type: String, default: 'visual' },
      interests: [String], // coding, arts, sports, music, etc.
      careerGoals: [String],
      studyHours: Number,
      preferredLanguage: { type: String, default: 'english' }
    },
    
    // Engagement Metrics
    engagement: {
      totalLogins: { type: Number, default: 0 },
      testsCompleted: { type: Number, default: 0 },
      studyStreak: { type: Number, default: 0 },
      lastActivity: { type: Date, default: Date.now },
      favoriteFeatures: [String]
    },
    
    // Legacy fields for backward compatibility
    FirstName: String,
    LastName: String,
    UserId: Number,
    name: String,
    picture: String,
    portfolios: Array,
    profile: Object
  },
  {
    timestamps: true
  }
)

// Create indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ classStatus: 1 });
userSchema.index({ city: 1, state: 1 });

const Users = mongoose.model("Users", userSchema);

module.exports = Users