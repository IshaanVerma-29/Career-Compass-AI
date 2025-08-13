"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Star, 
  Users, 
  Target,
  Award,
  ChevronRight,
  Check
} from 'lucide-react';

interface AcademicData {
  // Common for all classes
  subjects: { [key: string]: string }; // subject: grade
  overallPercentage: number;
  
  // Class-specific data
  class9?: {
    academicAwards: string[];
    interestRatings: { [key: string]: number };
    extracurriculars: string[];
  };
  
  class10?: {
    boardName: string;
    competitiveExams: string[];
    coachingDetails: string;
    streamConsidered: string[];
  };
  
  class11?: {
    currentStream: string;
    coachingCourse: string;
    technicalActivities: string[];
    confidenceLevel: number;
  };
  
  class12?: {
    streamPursued: string;
    subjectsCount: number;
    entranceExams: string[];
    confidenceRating: number;
  };
}

interface Props {
  userClass: string;
  onComplete: (data: AcademicData) => void;
  onSkip: () => void;
}

export default function AcademicOnboarding({ userClass, onComplete, onSkip }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [academicData, setAcademicData] = useState<AcademicData>({
    subjects: {},
    overallPercentage: 0
  });

  const subjectsByClass = {
    '9th Class': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
    '10th Class': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
    '11th Class': {
      'PCM': ['Physics', 'Chemistry', 'Mathematics', 'English'],
      'PCB': ['Physics', 'Chemistry', 'Biology', 'English'],
      'Commerce': ['Accountancy', 'Business Studies', 'Economics', 'English'],
      'Arts': ['History', 'Geography', 'Political Science', 'English']
    },
    '12th Class': {
      'PCM': ['Physics', 'Chemistry', 'Mathematics', 'English'],
      'PCB': ['Physics', 'Chemistry', 'Biology', 'English'],
      'Commerce': ['Accountancy', 'Business Studies', 'Economics', 'English'],
      'Arts': ['History', 'Geography', 'Political Science', 'English']
    }
  };

  const interestAreas = [
    'Science & Technology', 'Mathematics', 'Arts & Creativity', 'Sports', 
    'Social Service', 'Business', 'Literature', 'Music', 'Drama', 'Research'
  ];

  const competitiveExams = [
    'NTSE', 'KVPY', 'Olympiads (IMO, NSO, etc.)', 'State Level Competitions',
    'JEE Main', 'JEE Advanced', 'NEET', 'CUET', 'CLAT', 'IPMAT', 'NDA'
  ];

  const streams = ['PCM', 'PCB', 'Commerce', 'Vocational', 'Arts', 'Others'];

  const updateData = (field: string, value: any) => {
    setAcademicData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateClassSpecificData = (classKey: string, field: string, value: any) => {
    setAcademicData(prev => ({
      ...prev,
      [classKey]: {
        ...prev[classKey as keyof AcademicData],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/academic/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userClass,
          academicData
        })
      });

      if (response.ok) {
        onComplete(academicData);
      }
    } catch (error) {
      console.error('Error saving academic data:', error);
    }
  };

  const renderSubjectGrades = () => {
    const subjects = Array.isArray(subjectsByClass[userClass as keyof typeof subjectsByClass]) 
      ? subjectsByClass[userClass as keyof typeof subjectsByClass] as string[]
      : [];

    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Subject-wise Grades</h2>
          <p className="text-gray-300">Enter your grades for each subject</p>
        </div>

        <div className="grid gap-4">
          {subjects.map(subject => (
            <div key={subject} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
              <span className="font-medium">{subject}</span>
              <select
                value={academicData.subjects[subject] || ''}
                onChange={(e) => updateData('subjects', {
                  ...academicData.subjects,
                  [subject]: e.target.value
                })}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-purple-500"
              >
                <option value="">Select Grade</option>
                <option value="A+">A+ (90-100%)</option>
                <option value="A">A (80-89%)</option>
                <option value="B+">B+ (70-79%)</option>
                <option value="B">B (60-69%)</option>
                <option value="C">C (50-59%)</option>
                <option value="D">D (Below 50%)</option>
              </select>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Overall Percentage</label>
          <input
            type="number"
            min="0"
            max="100"
            value={academicData.overallPercentage}
            onChange={(e) => updateData('overallPercentage', parseInt(e.target.value))}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
            placeholder="Enter overall percentage"
          />
        </div>
      </motion.div>
    );
  };

  const render9thClassSpecific = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Academic Achievements & Interests</h2>
      </div>

      {/* Academic Awards */}
      <div>
        <label className="block text-sm font-medium mb-2">Academic Awards/Ranks/Badges</label>
        <textarea
          value={academicData.class9?.academicAwards?.join('\n') || ''}
          onChange={(e) => updateClassSpecificData('class9', 'academicAwards', e.target.value.split('\n').filter(Boolean))}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="List your awards, ranks, badges (one per line)"
          rows={3}
        />
      </div>

      {/* Interest Ratings */}
      <div>
        <label className="block text-sm font-medium mb-4">Rate Your Areas of Interest (1-5 scale)</label>
        <div className="grid gap-4">
          {interestAreas.map(area => (
            <div key={area} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
              <span>{area}</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => updateClassSpecificData('class9', 'interestRatings', {
                      ...academicData.class9?.interestRatings,
                      [area]: rating
                    })}
                    className={`w-8 h-8 rounded-full ${
                      (academicData.class9?.interestRatings?.[area] || 0) >= rating
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extracurriculars */}
      <div>
        <label className="block text-sm font-medium mb-2">Olympiads, Competitions, Extracurriculars</label>
        <textarea
          value={academicData.class9?.extracurriculars?.join('\n') || ''}
          onChange={(e) => updateClassSpecificData('class9', 'extracurriculars', e.target.value.split('\n').filter(Boolean))}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="List your participation in olympiads, competitions, etc. (one per line)"
          rows={3}
        />
      </div>
    </motion.div>
  );

  const render10thClassSpecific = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">10th Class Details</h2>
      </div>

      {/* Board Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Board Name/Type</label>
        <select
          value={academicData.class10?.boardName || ''}
          onChange={(e) => updateClassSpecificData('class10', 'boardName', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="State Board">State Board</option>
          <option value="NIOS">NIOS</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Competitive Exams */}
      <div>
        <label className="block text-sm font-medium mb-2">Competitive Exams Attempted</label>
        <div className="grid grid-cols-2 gap-3">
          {competitiveExams.slice(0, 4).map(exam => (
            <label key={exam} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
              <input
                type="checkbox"
                checked={academicData.class10?.competitiveExams?.includes(exam) || false}
                onChange={(e) => {
                  const current = academicData.class10?.competitiveExams || [];
                  const updated = e.target.checked
                    ? [...current, exam]
                    : current.filter(item => item !== exam);
                  updateClassSpecificData('class10', 'competitiveExams', updated);
                }}
                className="text-purple-500"
              />
              <span className="text-sm">{exam}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Coaching Details */}
      <div>
        <label className="block text-sm font-medium mb-2">Coaching/Course/Self-Study Details</label>
        <textarea
          value={academicData.class10?.coachingDetails || ''}
          onChange={(e) => updateClassSpecificData('class10', 'coachingDetails', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="Describe your preparation method for 10th and entrance prep"
          rows={3}
        />
      </div>

      {/* Stream Considered */}
      <div>
        <label className="block text-sm font-medium mb-2">Stream Initially Considered After 10th</label>
        <div className="grid grid-cols-2 gap-3">
          {streams.map(stream => (
            <label key={stream} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
              <input
                type="checkbox"
                checked={academicData.class10?.streamConsidered?.includes(stream) || false}
                onChange={(e) => {
                  const current = academicData.class10?.streamConsidered || [];
                  const updated = e.target.checked
                    ? [...current, stream]
                    : current.filter(item => item !== stream);
                  updateClassSpecificData('class10', 'streamConsidered', updated);
                }}
                className="text-purple-500"
              />
              <span className="text-sm">{stream}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const render11thClassSpecific = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">11th Class Progress</h2>
      </div>

      {/* Current Stream */}
      <div>
        <label className="block text-sm font-medium mb-2">Current Stream</label>
        <select
          value={academicData.class11?.currentStream || ''}
          onChange={(e) => updateClassSpecificData('class11', 'currentStream', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
        >
          <option value="">Select Stream</option>
          {streams.map(stream => (
            <option key={stream} value={stream}>{stream}</option>
          ))}
        </select>
      </div>

      {/* Coaching Course */}
      <div>
        <label className="block text-sm font-medium mb-2">Coaching or Course Details</label>
        <textarea
          value={academicData.class11?.coachingCourse || ''}
          onChange={(e) => updateClassSpecificData('class11', 'coachingCourse', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="Describe any coaching or courses you're taking"
          rows={3}
        />
      </div>

      {/* Technical Activities */}
      <div>
        <label className="block text-sm font-medium mb-2">Technical Clubs, Projects, Extracurriculars</label>
        <textarea
          value={academicData.class11?.technicalActivities?.join('\n') || ''}
          onChange={(e) => updateClassSpecificData('class11', 'technicalActivities', e.target.value.split('\n').filter(Boolean))}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="List your technical activities, clubs, projects (one per line)"
          rows={3}
        />
      </div>

      {/* Confidence Level */}
      <div>
        <label className="block text-sm font-medium mb-4">Self-Assessment: Confidence Level (1-5 scale)</label>
        <div className="flex items-center justify-center space-x-4 bg-gray-800/50 p-6 rounded-lg">
          {[1, 2, 3, 4, 5].map(level => (
            <button
              key={level}
              type="button"
              onClick={() => updateClassSpecificData('class11', 'confidenceLevel', level)}
              className={`w-12 h-12 rounded-full text-lg font-bold ${
                academicData.class11?.confidenceLevel === level
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Low Confidence</span>
          <span>High Confidence</span>
        </div>
      </div>
    </motion.div>
  );

  const render12thClassSpecific = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">12th Class & Future Plans</h2>
      </div>

      {/* Stream Pursued */}
      <div>
        <label className="block text-sm font-medium mb-2">Stream Pursued</label>
        <select
          value={academicData.class12?.streamPursued || ''}
          onChange={(e) => updateClassSpecificData('class12', 'streamPursued', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
        >
          <option value="">Select Stream</option>
          {streams.map(stream => (
            <option key={stream} value={stream}>{stream}</option>
          ))}
        </select>
      </div>

      {/* Number of Subjects */}
      <div>
        <label className="block text-sm font-medium mb-2">Number of Subjects</label>
        <input
          type="number"
          min="1"
          max="10"
          value={academicData.class12?.subjectsCount || ''}
          onChange={(e) => updateClassSpecificData('class12', 'subjectsCount', parseInt(e.target.value))}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500"
          placeholder="Enter number of subjects"
        />
      </div>

      {/* Entrance Exams */}
      <div>
        <label className="block text-sm font-medium mb-2">National Level Entrance Exams</label>
        <div className="grid grid-cols-2 gap-3">
          {competitiveExams.slice(4).map(exam => (
            <label key={exam} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
              <input
                type="checkbox"
                checked={academicData.class12?.entranceExams?.includes(exam) || false}
                onChange={(e) => {
                  const current = academicData.class12?.entranceExams || [];
                  const updated = e.target.checked
                    ? [...current, exam]
                    : current.filter(item => item !== exam);
                  updateClassSpecificData('class12', 'entranceExams', updated);
                }}
                className="text-purple-500"
              />
              <span className="text-sm">{exam}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confidence Rating */}
      <div>
        <label className="block text-sm font-medium mb-4">Confidence Rating for Interest-Aptitude Match (1-5 scale)</label>
        <div className="flex items-center justify-center space-x-4 bg-gray-800/50 p-6 rounded-lg">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => updateClassSpecificData('class12', 'confidenceRating', rating)}
              className={`w-12 h-12 rounded-full text-lg font-bold ${
                academicData.class12?.confidenceRating === rating
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Poor Match</span>
          <span>Perfect Match</span>
        </div>
      </div>
    </motion.div>
  );

  const totalSteps = userClass === '9th Class' ? 3 : userClass === '10th Class' ? 3 : userClass === '11th Class' ? 3 : 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Academic Profile Setup
            </h1>
            <p className="text-gray-300">Help us understand your academic journey better</p>
            <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {index + 1 <= currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-12 h-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderSubjectGrades()}
              {currentStep === 2 && (
                <>
                  {userClass === '9th Class' && render9thClassSpecific()}
                  {userClass === '10th Class' && render10thClassSpecific()}
                  {userClass === '11th Class' && render11thClassSpecific()}
                  {userClass === '12th Class' && render12thClassSpecific()}
                </>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={onSkip}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Skip for now
              </button>

              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Previous
                  </button>
                )}

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center"
                  >
                    Complete Setup <Check className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
