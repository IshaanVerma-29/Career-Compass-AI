"use client";
import Image from "next/image";
import React from "react";
import tool1 from "@/assets/Tool1.png"
import tool2 from "@/assets/Tool2.png"
import tool3 from "@/assets/Tool3.png"
import tool4 from "@/assets/Tool4.png"
import { Target, MessageSquare, BarChart3, FileText, Users, Brain } from "lucide-react";

export function ToolsBox() {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:auto-rows-[20rem] max-w-7xl mx-auto -mt-48 z-100">
            {/* Dashboard */}
            <div className="rounded-2xl bg-[#16a34a] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between md:col-span-3">
                <div className="grid grid-cols-2 p-8">
                    <div>
                        <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#FFFFFF]/40 border-white/40 border mb-4">
                            <BarChart3 width={"36px"} height={"36px"} />
                        </div>
                        <h1 className="text-3xl font-semibold mb-8">Study Dashboard</h1>
                        <p>Track your 9th class study progress, subject-wise performance, and get personalized recommendations for improvement.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src={tool1} alt="Dashboard" />
                    </div>
                </div>
            </div>

            {/* AI Advisor */}
            <div className="rounded-2xl bg-[#854CFF] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between md:col-span-2">
                <div className="p-8">
                    <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#FFFFFF]/40 border-white/40 border mb-4">
                        <MessageSquare width={"36px"} height={"36px"} />
                    </div>
                    <h1 className="text-3xl font-semibold mb-4">AI Study Buddy</h1>
                    <p>Get instant help with homework, subject doubts, and study tips from our smart AI assistant designed for 9th class students.</p>
                </div>
            </div>

            {/* Study Planner */}
            <div className="rounded-2xl bg-[#dc2626] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between md:col-span-2">
                <div className="p-8">
                    <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#FFFFFF]/40 border-white/40 border mb-4">
                        <FileText width={"36px"} height={"36px"} />
                    </div>
                    <h1 className="text-3xl font-semibold mb-4">Smart Study Planner</h1>
                    <p>Create personalized study schedules, set goals, and track your daily progress with our intelligent planning tool.</p>
                </div>
            </div>

            {/* Career Explorer */}
            <div className="rounded-2xl bg-[#504CFF] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between md:col-span-3">
                <div className="grid grid-cols-2 p-8">
                    <div>
                        <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#FFFFFF]/40 border-white/40 border mb-4">
                            <Target width={"36px"} height={"36px"} />
                        </div>
                        <h1 className="text-3xl font-semibold mb-8">Career Explorer</h1>
                        <p>Discover exciting career paths, understand what subjects lead to which careers, and plan your future from 9th class onwards.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src={tool2} alt="Career Explorer" />
                    </div>
                </div>
            </div>

            {/* Interview Bot */}
            <div className="rounded-2xl bg-[#0ea5e9] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between md:col-span-5">
                <div className="grid grid-cols-2 p-8">
                    <div>
                        <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#FFFFFF]/40 border-white/40 border mb-4">
                            <Brain width={"36px"} height={"36px"} />
                        </div>
                        <h1 className="text-3xl font-semibold mb-8">Mock Interview Practice</h1>
                        <p>Practice interviews for school presentations, competitions, and future college admissions with our AI-powered interview bot.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src={tool4} alt="Interview Bot" />
                    </div>
                </div>
            </div>
        </div>
    );
}
