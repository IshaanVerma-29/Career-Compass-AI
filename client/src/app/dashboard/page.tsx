"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Brain, 
  Send, 
  User, 
  Bot,
  BookOpen,
  Trophy,
  Target,
  Clock,
  Play,
  CheckCircle,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Award,
  PieChart,
  Activity,
  Users,
  Globe,
  Bookmark,
  Settings,
  Bell,
  Search,
  Calculator,
  Atom,
  Heart,
  Languages
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch test results
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await fetch('/api/test-results');
      const data = await response.json();
      if (data.success) {
        setTestResults(data.data);
      }
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] text-white pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-[#7D47EA] via-[#9D5CFF] to-[#FF6B35] bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-xl text-gray-300">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#FF6B35]">{formatTime(currentTime)}</div>
              <div className="text-gray-400">{formatDate(currentTime)}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="bg-gradient-to-r from-[#7D47EA] to-[#9D5CFF] px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform">
              <Search className="w-4 h-4 inline mr-2" />
              Search Topics
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
              <Bell className="w-4 h-4 inline mr-2" />
              Notifications
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
              <Settings className="w-4 h-4 inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-10 h-10 text-blue-400" />
              <div className="bg-blue-500/20 rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-1">24</h3>
            <p className="text-gray-300 text-sm mb-2">Tests Completed</p>
            <div className="flex items-center text-green-400 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last week
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10 text-green-400" />
              <div className="bg-green-500/20 rounded-full p-2">
                <Award className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-1">85%</h3>
            <p className="text-gray-300 text-sm mb-2">Average Score</p>
            <div className="flex items-center text-green-400 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% improvement
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-purple-400" />
              <div className="bg-purple-500/20 rounded-full p-2">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-1">127h</h3>
            <p className="text-gray-300 text-sm mb-2">Study Time</p>
            <div className="flex items-center text-purple-400 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              This month
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-xl p-6 border border-orange-500/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-10 h-10 text-orange-400" />
              <div className="bg-orange-500/20 rounded-full p-2">
                <Star className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-orange-400 mb-1">12</h3>
            <p className="text-gray-300 text-sm mb-2">Achievements</p>
            <div className="flex items-center text-orange-400 text-xs">
              <Star className="w-3 h-3 mr-1" />
              3 new this week
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Features */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Access Features */}
            <div className="bg-[#121212] rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                Quick Access
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <a href="/ai-chat" className="group">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 border border-gray-700 hover:border-[#7D47EA] transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#7D47EA]/20 rounded-lg p-3 mr-4">
                        <MessageSquare className="w-8 h-8 text-[#7D47EA]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-[#7D47EA] transition-colors">Career Compass AI</h3>
                        <p className="text-gray-400 text-sm">Ask anything about careers</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">Get personalized career guidance, explore different professions, understand salary trends, and make informed decisions about your future.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#7D47EA] font-semibold">Explore Careers</span>
                      <ChevronRight className="w-5 h-5 text-[#7D47EA] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>

                <a href="/psychometric-test" className="group">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 border border-gray-700 hover:border-[#FF6B35] transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FF6B35]/20 rounded-lg p-3 mr-4">
                        <Brain className="w-8 h-8 text-[#FF6B35]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-[#FF6B35] transition-colors">Psychometric Test</h3>
                        <p className="text-gray-400 text-sm">Multi-subject assessment</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">Take comprehensive tests covering Physics, Chemistry, Biology, Math, English & more with randomized questions.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#FF6B35] font-semibold">Take Test</span>
                      <ChevronRight className="w-5 h-5 text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#121212] rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="w-6 h-6 text-green-400 mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {testResults && testResults.lastTestDate && (
                  <div className="flex items-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                    <div className="bg-purple-500/20 rounded-full p-2 mr-4">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Psychometric Test Completed</p>
                      <p className="text-gray-400 text-sm">Overall Score: {testResults.overallScore}% • {new Date(testResults.lastTestDate).toLocaleDateString()}</p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
                
                <div className="flex items-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                  <div className="bg-green-500/20 rounded-full p-2 mr-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Mathematics Test Completed</p>
                    <p className="text-gray-400 text-sm">Score: 92% • 2 hours ago</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                
                <div className="flex items-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                  <div className="bg-blue-500/20 rounded-full p-2 mr-4">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Career Guidance Session</p>
                    <p className="text-gray-400 text-sm">Explored tech careers • 1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                  <div className="bg-purple-500/20 rounded-full p-2 mr-4">
                    <Trophy className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Achievement Unlocked</p>
                    <p className="text-gray-400 text-sm">"Study Streak" badge earned • 2 days ago</p>
                  </div>
                  <Award className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            
            {/* Performance Chart */}
            <div className="bg-[#121212] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <PieChart className="w-5 h-5 text-blue-400 mr-2" />
                Psychometric Test Results
              </h3>
              
              {testResults && testResults.subjectScores ? (
                <div className="space-y-4">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Overall Score</span>
                      <span className="text-2xl font-bold text-blue-400">{testResults.overallScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000" 
                        style={{width: `${testResults.overallScore}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Subject Breakdown */}
                  <div className="space-y-3">
                    {Object.entries(testResults.subjectScores).map(([subject, score]: [string, any]) => {
                      const getSubjectIcon = (subjectName: string) => {
                        switch(subjectName) {
                          case 'Mathematics': return Calculator;
                          case 'Physics': return Atom;
                          case 'Chemistry': return Atom;
                          case 'Biology': return Heart;
                          case 'English': return BookOpen;
                          case 'Hindi': return Languages;
                          case 'Social Studies': return Globe;
                          case 'General Knowledge': return Brain;
                          case 'Sports': return Trophy;
                          default: return BookOpen;
                        }
                      };

                      const getScoreColor = (score: number) => {
                        if (score >= 90) return 'text-green-400 bg-green-400';
                        if (score >= 80) return 'text-blue-400 bg-blue-400';
                        if (score >= 70) return 'text-yellow-400 bg-yellow-400';
                        if (score >= 60) return 'text-orange-400 bg-orange-400';
                        return 'text-red-400 bg-red-400';
                      };

                      const SubjectIcon = getSubjectIcon(subject);
                      const colorClass = getScoreColor(score);

                      return (
                        <div key={subject} className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <SubjectIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium">{subject}</span>
                            </div>
                            <span className={`text-sm font-bold ${colorClass.split(' ')[0]}`}>{score}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${colorClass.split(' ')[1]}`}
                              style={{width: `${score}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Last Test Date */}
                  {testResults.lastTestDate && (
                    <div className="text-center mt-4 pt-4 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        Last test taken: {new Date(testResults.lastTestDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No test results available</p>
                  <a 
                    href="/psychometric-test"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <Brain className="w-4 h-4" />
                    Take Test Now
                  </a>
                </div>
              )}
            </div>

            {/* Study Goals */}
            <div className="bg-[#121212] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 text-orange-400 mr-2" />
                Today's Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm line-through text-gray-500">Complete Math practice</span>
                </div>
                <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full mr-3"></div>
                  <span className="text-sm">Physics chapter review</span>
                </div>
                <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full mr-3"></div>
                  <span className="text-sm">Take English quiz</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#121212] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
                  <div>
                    <p className="font-semibold text-sm">Perfect Score!</p>
                    <p className="text-xs text-gray-400">100% in Math test</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <Star className="w-6 h-6 text-purple-400 mr-3" />
                  <div>
                    <p className="font-semibold text-sm">Study Streak</p>
                    <p className="text-xs text-gray-400">7 days in a row</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
                  <Bookmark className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <p className="font-semibold text-sm">Chapter Master</p>
                    <p className="text-xs text-gray-400">Completed Physics Ch.1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-8 bg-gradient-to-r from-[#7D47EA]/10 to-[#FF6B35]/10 rounded-xl p-6 border border-[#7D47EA]/20">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            💡 Study Tip of the Day
          </h3>
          <p className="text-gray-300">
            <strong>Active Recall:</strong> Instead of just re-reading notes, try to recall information from memory first. 
            This strengthens neural pathways and improves long-term retention. Use our AI Study Buddy to test your understanding!
          </p>
        </div>
      </div>
    </div>
  );
}
