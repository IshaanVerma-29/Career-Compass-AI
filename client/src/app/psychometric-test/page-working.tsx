'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, BookOpen, Calculator, Atom, Heart, Globe, Trophy, Brain, Languages } from 'lucide-react'
import Navbar from '@/sections/Navbar'

interface Question {
  id: number
  subject: string
  question: string
  options: string[]
  correct: number
  difficulty: 'easy' | 'medium' | 'hard'
}

const questions: Question[] = [
  // Mathematics (8 questions)
  {
    id: 1,
    subject: "Mathematics",
    question: "What is 15% of 240?",
    options: ["36", "30", "42", "48"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 2,
    subject: "Mathematics", 
    question: "If x + 5 = 12, what is x?",
    options: ["7", "6", "8", "5"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 3,
    subject: "Mathematics",
    question: "What is the area of a circle with radius 7 cm? (π = 22/7)",
    options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 4,
    subject: "Mathematics",
    question: "What is the value of 2³ × 3²?",
    options: ["72", "54", "64", "81"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 5,
    subject: "Mathematics",
    question: "If a train travels 300 km in 4 hours, what is its speed?",
    options: ["75 km/h", "80 km/h", "70 km/h", "85 km/h"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 6,
    subject: "Mathematics",
    question: "What is the next number in the sequence: 2, 6, 18, 54, ?",
    options: ["162", "108", "216", "144"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 7,
    subject: "Mathematics",
    question: "What is 0.25 expressed as a fraction?",
    options: ["1/4", "1/3", "2/5", "3/8"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 8,
    subject: "Mathematics",
    question: "If the angles of a triangle are in ratio 2:3:4, what is the largest angle?",
    options: ["80°", "70°", "90°", "60°"],
    correct: 0,
    difficulty: "hard"
  },

  // Physics (6 questions)
  {
    id: 9,
    subject: "Physics",
    question: "What is the unit of force?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 10,
    subject: "Physics",
    question: "What is the speed of light in vacuum?",
    options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 11,
    subject: "Physics",
    question: "Which law states that for every action there is an equal and opposite reaction?",
    options: ["Newton's Third Law", "Newton's First Law", "Newton's Second Law", "Law of Gravitation"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 12,
    subject: "Physics",
    question: "What is the SI unit of electric current?",
    options: ["Ampere", "Volt", "Ohm", "Coulomb"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 13,
    subject: "Physics",
    question: "What happens to the frequency of a wave when its wavelength increases?",
    options: ["Decreases", "Increases", "Remains same", "Becomes zero"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 14,
    subject: "Physics",
    question: "Which type of electromagnetic radiation has the shortest wavelength?",
    options: ["Gamma rays", "X-rays", "Ultraviolet", "Visible light"],
    correct: 0,
    difficulty: "medium"
  },

  // Chemistry (6 questions)
  {
    id: 15,
    subject: "Chemistry",
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Al", "Go"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 16,
    subject: "Chemistry",
    question: "How many electrons does a carbon atom have?",
    options: ["6", "4", "8", "12"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 17,
    subject: "Chemistry",
    question: "What is the pH of pure water at 25°C?",
    options: ["7", "0", "14", "1"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 18,
    subject: "Chemistry",
    question: "Which gas is produced when metals react with acids?",
    options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 19,
    subject: "Chemistry",
    question: "What is the molecular formula of methane?",
    options: ["CH₄", "C₂H₆", "C₂H₄", "CH₃OH"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 20,
    subject: "Chemistry",
    question: "Which element has the highest electronegativity?",
    options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"],
    correct: 0,
    difficulty: "hard"
  },

  // Biology (6 questions)
  {
    id: 21,
    subject: "Biology",
    question: "What is the powerhouse of the cell?",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 22,
    subject: "Biology",
    question: "Which blood group is known as universal donor?",
    options: ["O-", "AB+", "A+", "B-"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 23,
    subject: "Biology",
    question: "What is the process by which plants make their food?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 24,
    subject: "Biology",
    question: "How many chambers does a human heart have?",
    options: ["4", "2", "3", "6"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 25,
    subject: "Biology",
    question: "Which organ produces insulin in the human body?",
    options: ["Pancreas", "Liver", "Kidney", "Stomach"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 26,
    subject: "Biology",
    question: "What is the basic unit of heredity?",
    options: ["Gene", "Chromosome", "DNA", "RNA"],
    correct: 0,
    difficulty: "medium"
  },

  // English (6 questions)
  {
    id: 27,
    subject: "English",
    question: "What is the synonym of 'Enormous'?",
    options: ["Huge", "Small", "Medium", "Tiny"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 28,
    subject: "English",
    question: "Which of the following is a metaphor?",
    options: ["Life is a journey", "He runs like a cheetah", "The wind whispered", "It's raining cats and dogs"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 29,
    subject: "English",
    question: "What is the past tense of 'go'?",
    options: ["Went", "Gone", "Going", "Goes"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 30,
    subject: "English",
    question: "Which word is an adverb in the sentence: 'She sang beautifully'?",
    options: ["Beautifully", "She", "Sang", "None"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 31,
    subject: "English",
    question: "What type of sentence is: 'What a beautiful day!'?",
    options: ["Exclamatory", "Interrogative", "Declarative", "Imperative"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 32,
    subject: "English",
    question: "Which is the correct spelling?",
    options: ["Necessary", "Neccessary", "Necesary", "Neccesary"],
    correct: 0,
    difficulty: "easy"
  },

  // Hindi (4 questions)
  {
    id: 33,
    subject: "Hindi",
    question: "'सूर्य' का पर्यायवाची शब्द है:",
    options: ["दिनकर", "चन्द्र", "तारा", "आकाश"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 34,
    subject: "Hindi",
    question: "'हाथी' शब्द में कौन सा लिंग है?",
    options: ["पुल्लिंग", "स्त्रीलिंग", "नपुंसकलिंग", "कोई नहीं"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 35,
    subject: "Hindi",
    question: "कौन सा शब्द तत्सम है?",
    options: ["अग्नि", "आग", "आगी", "अगन"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 36,
    subject: "Hindi",
    question: "'राम ने रावण को मारा' में कौन सा कारक है?",
    options: ["कर्ता कारक", "कर्म कारक", "करण कारक", "संप्रदान कारक"],
    correct: 0,
    difficulty: "hard"
  },

  // Social Studies (6 questions)
  {
    id: 37,
    subject: "Social Studies",
    question: "Who was the first Prime Minister of India?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Dr. A.P.J. Abdul Kalam"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 38,
    subject: "Social Studies",
    question: "Which river is known as the 'Ganga of the South'?",
    options: ["Godavari", "Krishna", "Kaveri", "Narmada"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 39,
    subject: "Social Studies",
    question: "In which year did India gain independence?",
    options: ["1947", "1946", "1948", "1950"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 40,
    subject: "Social Studies",
    question: "Which is the largest state in India by area?",
    options: ["Rajasthan", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 41,
    subject: "Social Studies",
    question: "Who wrote the Indian National Anthem?",
    options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Subhash Chandra Bose"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 42,
    subject: "Social Studies",
    question: "Which movement was started by Mahatma Gandhi in 1930?",
    options: ["Salt March", "Quit India", "Non-Cooperation", "Khilafat"],
    correct: 0,
    difficulty: "hard"
  },

  // General Knowledge (4 questions)
  {
    id: 43,
    subject: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 44,
    subject: "General Knowledge",
    question: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Benjamin Franklin"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 45,
    subject: "General Knowledge",
    question: "Which is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 46,
    subject: "General Knowledge",
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Yuan", "Rupiah"],
    correct: 0,
    difficulty: "medium"
  },

  // Sports (4 questions)
  {
    id: 47,
    subject: "Sports",
    question: "How many players are there in a cricket team?",
    options: ["11", "10", "12", "9"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 48,
    subject: "Sports",
    question: "In which sport is the term 'slam dunk' used?",
    options: ["Basketball", "Volleyball", "Tennis", "Badminton"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 49,
    subject: "Sports",
    question: "Who has won the most Grand Slam titles in men's tennis?",
    options: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Pete Sampras"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 50,
    subject: "Sports",
    question: "In which year were the first modern Olympic Games held?",
    options: ["1896", "1900", "1892", "1904"],
    correct: 0,
    difficulty: "medium"
  }
]

const subjectIcons: Record<string, any> = {
  "Mathematics": Calculator,
  "Physics": Atom,
  "Chemistry": Atom,
  "Biology": Heart,
  "English": BookOpen,
  "Hindi": Languages,
  "Social Studies": Globe,
  "General Knowledge": Brain,
  "Sports": Trophy
}

const subjectColors: Record<string, string> = {
  "Mathematics": "from-blue-500 to-blue-600",
  "Physics": "from-purple-500 to-purple-600", 
  "Chemistry": "from-green-500 to-green-600",
  "Biology": "from-red-500 to-red-600",
  "English": "from-yellow-500 to-yellow-600",
  "Hindi": "from-orange-500 to-orange-600",
  "Social Studies": "from-indigo-500 to-indigo-600",
  "General Knowledge": "from-pink-500 to-pink-600",
  "Sports": "from-teal-500 to-teal-600"
}

export default function PsychometricTest() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(3000) // 50 minutes
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)

  // Shuffle questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
    setAnswers(new Array(questions.length).fill(-1))
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitTest()
    }
  }, [timeLeft, isCompleted])

  // Update selected option when question changes
  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      setSelectedOption(answers[currentQuestion])
    }
  }, [currentQuestion, answers, shuffledQuestions])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(answers[currentQuestion + 1])
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1])
    }
  }

  const calculateResults = () => {
    const results: Record<string, { correct: number; total: number; percentage: number }> = {}
    let totalCorrect = 0

    shuffledQuestions.forEach((question, index) => {
      if (!results[question.subject]) {
        results[question.subject] = { correct: 0, total: 0, percentage: 0 }
      }
      results[question.subject].total++
      
      if (answers[index] === question.correct) {
        results[question.subject].correct++
        totalCorrect++
      }
    })

    Object.keys(results).forEach(subject => {
      results[subject].percentage = Math.round((results[subject].correct / results[subject].total) * 100)
    })

    return {
      subjects: results,
      overall: {
        correct: totalCorrect,
        total: shuffledQuestions.length,
        percentage: Math.round((totalCorrect / shuffledQuestions.length) * 100)
      }
    }
  }

  const handleSubmitTest = async () => {
    setIsCompleted(true)
    setShowResult(true)
    
    // Save results to backend
    const results = calculateResults()
    try {
      await fetch('/api/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results,
          answers,
          completedAt: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Error saving test results:', error)
    }
  }

  const results = showResult ? calculateResults() : null
  const question = shuffledQuestions[currentQuestion]
  const Icon = subjectIcons[question?.subject] || BookOpen

  // Don't render until questions are shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-xl">Preparing your test...</p>
          </div>
        </div>
      </div>
    )
  }

  if (showResult && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <Navbar />
        <div className="p-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white mb-2">Test Completed!</h1>
                <p className="text-white/70">Here are your results</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center"
                >
                  <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
                  <p className="text-4xl font-bold">{results.overall.percentage}%</p>
                  <p className="text-blue-100">{results.overall.correct}/{results.overall.total} correct</p>
                </motion.div>

                {Object.entries(results.subjects).map(([subject, data], index) => {
                  const SubjectIcon = subjectIcons[subject]
                  const colorClass = subjectColors[subject]
                  
                  return (
                    <motion.div
                      key={subject}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`bg-gradient-to-r ${colorClass} rounded-2xl p-6 text-white`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{subject}</h3>
                        <SubjectIcon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{data.percentage}%</p>
                        <p className="text-sm opacity-80">{data.correct}/{data.total}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Go to Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold backdrop-blur-sm border border-white/30"
                >
                  Retake Test
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <Navbar />
      <div className="p-4 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${subjectColors[question.subject]} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Psychometric Test</h1>
                  <p className="text-white/70">{question.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <div className="text-white text-right">
                  <p className="text-sm opacity-70">Question</p>
                  <p className="font-bold">{currentQuestion + 1} / {shuffledQuestions.length}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 bg-gradient-to-r ${subjectColors[question.subject]} text-white text-sm rounded-full font-medium`}>
                    {question.subject}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    question.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                    question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-white leading-relaxed">
                  {question.question}
                </h2>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                      selectedOption === index
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400 text-white'
                        : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === index ? 'border-blue-400 bg-blue-500' : 'border-white/40'
                      }`}>
                        {selectedOption === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30"
              >
                Previous
              </motion.button>

              <div className="flex gap-2">
                {shuffledQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentQuestion
                        ? 'bg-blue-400'
                        : answers[index] !== -1
                        ? 'bg-green-400'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {currentQuestion === shuffledQuestions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitTest}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  Submit Test
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  Next
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
