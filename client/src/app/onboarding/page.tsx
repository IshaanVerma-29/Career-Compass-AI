"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AcademicOnboarding from '@/components/AcademicOnboarding';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
      return;
    }

    // Check if academic onboarding is already complete
    if (user?.academicOnboardingComplete) {
      router.push('/dashboard');
      return;
    }

    setShowOnboarding(true);
  }, [isAuthenticated, user, router]);

  const handleOnboardingComplete = async (academicData: any) => {
    try {
      // Update user's onboarding status
      const response = await fetch('/api/user/update-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
      });

      if (response.ok) {
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  const handleSkip = () => {
    // Allow user to skip but mark as incomplete
    router.push('/dashboard');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!showOnboarding) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome, {user.name}! 👋
              </h1>
              <p className="text-gray-300">
                Let's set up your academic profile to provide personalized career guidance
              </p>
            </div>
            <div className="flex items-center text-purple-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">Step 2 of 2</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Info Card */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Your Profile Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Class</p>
              <p className="text-white font-medium">{user.class}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Board</p>
              <p className="text-white font-medium">{user.board || 'N/A'}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white font-medium">{user.location}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium text-xs">{user.email}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Academic Onboarding Component */}
      <AcademicOnboarding
        userClass={user.class}
        onComplete={handleOnboardingComplete}
        onSkip={handleSkip}
      />

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Why Complete Your Academic Profile?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Personalized Recommendations</h3>
              <p className="text-gray-300 text-sm">
                Get career suggestions tailored to your academic performance and interests
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-gray-300 text-sm">
                Our AI analyzes your data to provide intelligent career guidance
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Track Progress</h3>
              <p className="text-gray-300 text-sm">
                Monitor your academic journey and receive improvement suggestions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
