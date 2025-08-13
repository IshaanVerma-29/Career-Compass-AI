"use client";

import React from "react";
import { Cover } from "@/components/ui/cover";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import linear from "@/assets/linear.webp"
import { RoboAnimation } from "@/components/robo-animation";
import { FloatingPaper } from "@/components/floating-paper";
import { SparklesCore } from "@/components/sparkles2";


export default function HeroMain() {

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 relative z-20 overflow-hidden">
            <div className="mt-[12vh]"></div>
            <div className="h-full w-full absolute inset-0 z-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <div className="absolute inset-0 overflow-hidden -z-30">
                <FloatingPaper count={3} />
            </div>
            <div className="relative z-20 mx-auto my-6 text-center text-3xl font-semibold tracking-tight text-neutral-300 md:text-6xl">
                <p>Smart Career Guidance</p>
                <div className="mt-2 md:mt-8"><Cover className="py-2">for Class 9-12 Students</Cover></div>
            </div>
            <p className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base font-medium text-gray-300 md:text-lg lg:text-lg">
                AI-powered career guidance platform for Class 9-12 students. Get honest insights about your potential, explore realistic career paths, and make informed academic decisions early in your journey.
            </p>

            <div className="absolute top-80 right-0 w-96 h-96">
                <RoboAnimation />
            </div>
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll>
                    <Image
                        src={linear}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-contain w-full h-full"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </div>
    );
}
