"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparkles";
import FooterMain from "./FooterMain";

export function Footer() {
    return (
        <div>
            <div className="h-[40vh] md:h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">

                <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20 font-chillax mb-2">
                    CAREER PILOT
                </h1>

                <div className="w-[20rem] md:w-[40rem] h-20 md:h-40 relative">
                    <div className="absolute inset-x-8 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-8 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-16 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-16 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-[80%] mx-auto md:w-full h-full"
                        particleColor="#FFFFFF"
                    />
                    <div className="absolute inset-0 w-[80%] mx-auto md:w-full h-full bg-[#0A0A0A] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
            <FooterMain />
        </div>
    );
}
