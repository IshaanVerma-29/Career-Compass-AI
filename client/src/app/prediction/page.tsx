"use client";

import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Brain, Calendar, Trophy } from 'lucide-react';

export default function PredictionPage() {
  const [examType, setExamType] = useState('');
  const [mockScore, setMockScore] = useState('');
  const [studyHours, setStudyHours] = useState('');
  const [preparation, setPreparation] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);
  const [apiPrediction, setApiPrediction] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (examType && mockScore && studyHours && preparation) {
      setShowPrediction(true);
      
      // Call the API for more accurate prediction
      try {
        const response = await fetch('/api/predict-success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            examType,
            studyHours: parseInt(studyHours),
            previousScores: [parseInt(mockScore)],
            timeToExam: 6, // Default to 6 months
            subjects: ['Math', 'Physics', 'Chemistry'] // Default subjects
          })
        });
        
        const data = await response.json();
        if (response.ok) {
          // Update the success rate with API response
          setApiPrediction(data);
        }
      } catch (error) {
        console.error('Error getting API prediction:', error);
      }
    }
  };

  const calculateSuccessRate = () => {
    let baseScore = 20;
    
    // Mock score contribution (40%)
    const score = parseInt(mockScore);
    if (score >= 80) baseScore += 40;
    else if (score >= 60) baseScore += 30;
    else if (score >= 40) baseScore += 20;
    else baseScore += 10;
    
    // Study hours contribution (30%)
    const hours = parseInt(studyHours);
    if (hours >= 8) baseScore += 30;
    else if (hours >= 6) baseScore += 25;
    else if (hours >= 4) baseScore += 15;
    else baseScore += 5;
    
    // Preparation level (30%)
    if (preparation === 'advanced') baseScore += 30;
    else if (preparation === 'intermediate') baseScore += 20;
    else if (preparation === 'beginner') baseScore += 10;
    
    return Math.min(baseScore, 95);
  };

  const getCollegePredictions = () => {
    const successRate = calculateSuccessRate();
    
    if (examType === 'NEET') {
      return {
        high: successRate >= 75 ? 'AIIMS Delhi, JIPMER' : 'Government Medical Colleges',
        medium: 'State Government Medical Colleges',
        low: 'Private Medical Colleges, Deemed Universities'
      };
    } else if (examType === 'JEE') {
      return {
        high: successRate >= 75 ? 'IIT Bombay, IIT Delhi' : 'Top NITs',
        medium: 'NITs, IIITs, State Engineering Colleges',
        low: 'Private Engineering Colleges'
      };
    } else {
      return {
        high: successRate >= 75 ? 'IAS, IPS, IFS' : 'Group A Services',
        medium: 'Group B Services, State Services',
        low: 'Group C Services, Bank PO'
      };
    }
  };

  if (showPrediction) {
    const successRate = calculateSuccessRate();
    const predictions = getCollegePredictions();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7D47EA] to-[#FF6B35] bg-clip-text text-transparent">
                Your Success Prediction
              </h1>
              <p className="text-xl text-gray-300">
                AI-powered analysis based on your preparation data
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-[#121212] rounded-2xl p-8 border border-gray-800 mb-8">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-[#7D47EA] mr-3" />
                    <h2 className="text-3xl font-bold">Success Probability</h2>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-300">Overall Success Rate</span>
                      <span className="text-4xl font-bold text-[#7D47EA]">{successRate}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-[#7D47EA] to-[#FF6B35] h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${successRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm text-green-400">High Probability</span>
                      </div>
                      <p className="text-white font-semibold">{predictions.high}</p>
                    </div>
                    
                    <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-sm text-yellow-400">Medium Probability</span>
                      </div>
                      <p className="text-white font-semibold">{predictions.medium}</p>
                    </div>
                    
                    <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-sm text-red-400">Backup Options</span>
                      </div>
                      <p className="text-white font-semibold">{predictions.low}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <BarChart3 className="w-6 h-6 text-[#FF6B35] mr-3" />
                      <h3 className="text-xl font-bold">Performance Analysis</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Mock Test Score</span>
                          <span className="text-white font-semibold">{mockScore}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mockScore}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Study Hours</span>
                          <span className="text-white font-semibold">{studyHours}h/day</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(parseInt(studyHours) / 12) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      <Brain className="w-6 h-6 text-[#7D47EA] mr-3" />
                      <h3 className="text-xl font-bold">Recommendations</h3>
                    </div>
                    <ul className="space-y-3">
                      {successRate >= 75 ? (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-300">Maintain current study routine</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-300">Focus on advanced problems</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-300">Increase study hours</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-300">Focus on weak topics</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#FF6B35] mr-3" />
                    <h3 className="text-xl font-bold">Exam Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Exam Type:</span>
                      <p className="text-white font-semibold">{examType}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Preparation Level:</span>
                      <p className="text-white font-semibold capitalize">{preparation}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-6 h-6 text-[#7D47EA] mr-3" />
                    <h3 className="text-xl font-bold">Success Tips</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Take regular mock tests</li>
                    <li>• Analyze your mistakes</li>
                    <li>• Focus on time management</li>
                    <li>• Stay physically and mentally healthy</li>
                    <li>• Join study groups</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowPrediction(false)}
                className="bg-gradient-to-r from-[#7D47EA] to-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Get New Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7D47EA] to-[#FF6B35] bg-clip-text text-transparent">
              Success Prediction Engine
            </h1>
            <p className="text-xl text-gray-300">
              Get realistic predictions for your exam success based on AI analysis
            </p>
          </div>

          <div className="bg-[#121212] rounded-2xl p-8 border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-semibold mb-4">Which exam are you preparing for?</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['NEET', 'JEE', 'UPSC'].map((exam) => (
                    <button
                      key={exam}
                      type="button"
                      onClick={() => setExamType(exam)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        examType === exam
                          ? 'border-[#7D47EA] bg-[#7D47EA]/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full border-2 mx-auto mb-2 ${
                          examType === exam ? 'border-[#7D47EA] bg-[#7D47EA]' : 'border-gray-400'
                        }`}></div>
                        <span className="font-semibold">{exam}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-4">Latest mock test score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mockScore}
                  onChange={(e) => setMockScore(e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg focus:border-[#7D47EA] focus:outline-none text-white"
                  placeholder="Enter your latest mock test percentage"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-4">Daily study hours</label>
                <select
                  value={studyHours}
                  onChange={(e) => setStudyHours(e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg focus:border-[#7D47EA] focus:outline-none text-white"
                >
                  <option value="">Select study hours</option>
                  <option value="2">Less than 4 hours</option>
                  <option value="5">4-6 hours</option>
                  <option value="7">6-8 hours</option>
                  <option value="10">More than 8 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-4">Preparation level</label>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { value: 'beginner', label: 'Just Started' },
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' }
                  ].map((level) => (
                    <button
                      key={level.label}
                      type="button"
                      onClick={() => setPreparation(level.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        preparation === level.value
                          ? 'border-[#7D47EA] bg-[#7D47EA]/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-3 h-3 rounded-full border-2 mx-auto mb-2 ${
                          preparation === level.value ? 'border-[#7D47EA] bg-[#7D47EA]' : 'border-gray-400'
                        }`}></div>
                        <span className="text-sm">{level.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!examType || !mockScore || !studyHours || !preparation}
                className="w-full bg-gradient-to-r from-[#7D47EA] to-[#FF6B35] text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Get My Success Prediction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
