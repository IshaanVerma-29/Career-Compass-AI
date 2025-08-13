"use client"

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from 'framer-motion';
import { RippleComponent } from "@/components/RippleComponent";

export function Userflow() {

    const steps = [
        // AI Career Advisor
        [
            {
                step: "Step 1",
                title: "Share Your Exam Goals",
                description: "Tell us about your NEET/JEE/UPSC preparation status and career aspirations.",
            },
            {
                step: "Step 2",
                title: "AI Success Analysis",
                description: "Our AI evaluates your preparation level and calculates realistic success probabilities.",
            },
            {
                step: "Step 3",
                title: "Get Honest Insights",
                description: "Receive unfiltered predictions and explore backup career options that match your profile.",
            },
            {
                step: "Step 4",
                title: "Make Informed Decisions",
                description: "Use data-driven insights to plan your exam strategy and backup career paths.",
            },
        ],

        // Success Prediction Engine
        [
            {
                step: "Step 1",
                title: "Input Preparation Data",
                description: "Share your mock test scores, study hours, and current preparation level.",
            },
            {
                step: "Step 2",
                title: "AI Probability Calculation",
                description: "Our AI analyzes your data against historical success patterns and current competition.",
            },
            {
                step: "Step 3",
                title: "Realistic Predictions",
                description: "Get honest success probabilities for different rank ranges and colleges.",
            },
            {
                step: "Step 4",
                title: "Strategic Planning",
                description: "Plan your preparation strategy and backup options based on realistic predictions.",
            },
        ],

        // Life Path Simulator
        [
            {
                step: "Step 1",
                title: "Choose Your Path",
                description: "Select different career scenarios to simulate various life outcomes.",
            },
            {
                step: "Step 2",
                title: "AI Simulation",
                description: "Our AI models different career trajectories based on your current choices.",
            },
            {
                step: "Step 3",
                title: "Compare Outcomes",
                description: "See potential salary, job satisfaction, and career growth for each path.",
            },
            {
                step: "Step 4",
                title: "Make Better Choices",
                description: "Use insights to make informed decisions about your career direction.",
            },
        ],

        // AI Interview Prep Bot
        [
            {
                step: "Step 1",
                title: "Select Your Role",
                description: "Choose the job role you’re preparing for to tailor the interview experience.",
            },
            {
                step: "Step 2",
                title: "Practice Realistic Questions",
                description: "Our AI asks industry-specific questions to simulate a real interview.",
            },
            {
                step: "Step 3",
                title: "Get Instant Feedback",
                description: "Receive AI-driven insights on your answers, highlighting strengths and areas for improvement.",
            },
            {
                step: "Step 4",
                title: "Refine & Improve",
                description: "Practice multiple rounds and gain confidence for your actual interview.",
            },
        ],
    ];

    const data = [
        {
            title: "AI Career Advisor",
            content: (
                <div>
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-8">
                    Get personalized career recommendations and insights to choose the best path for your future.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
                                {steps[0].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="hidden md:block text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-md md:text-lg font-medium md:font-bold text-white">{step.title}</h4>
                                        <p className="hidden md:block mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
        {
            title: "Success Prediction Engine",
            content: (
                <div>
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-8">
                    Get honest success probabilities for NEET/JEE/UPSC and plan your preparation strategy accordingly.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
                                {steps[1].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="hidden md:block text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-md md:text-lg font-medium md:font-bold text-white">{step.title}</h4>
                                        <p className="hidden md:block mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
        {
            title: "Life Path Simulator",
            content: (
                <div>
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-4">
                    Simulate different career paths and see potential outcomes to make better life decisions.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
                                {steps[2].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="hidden md:block text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-md md:text-lg font-medium md:font-bold text-white">{step.title}</h4>
                                        <p className="hidden md:block mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
        {
            title: "AI Interview Prep Bot",
            content: (
                <div>
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-4">
                    Practice real interview questions and receive AI-driven feedback to boost your confidence.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
                                {steps[3].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="hidden md:block text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-md md:text-lg font-medium md:font-bold text-white">{step.title}</h4>
                                        <p className="hidden md:block mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },

    ];
    return (
        <div className="w-full">
            <RippleComponent />
            <div className="-mt-10">
                <Timeline data={data} />
            </div>
        </div>
    );
}
