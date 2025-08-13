"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    ...props
}: React.PropsWithChildren<
    {
        as?: React.ElementType;
        containerClassName?: string;
        className?: string;
        duration?: number;
        clockwise?: boolean;
    } & React.HTMLAttributes<HTMLElement>
>) {
    const [hovered, setHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>("TOP");

    const rotateDirection = (currentDirection: Direction): Direction => {
        const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
    };

    const movingMap: Record<Direction, string> = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, #7D47EA 0%, rgba(255, 255, 255, 0) 100%)", // orange-500
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #7D47EA 0%, rgba(255, 255, 255, 0) 100%)", // orange-500
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #7D47EA 0%, rgba(255, 255, 255, 0) 100%)", // orange-500
        RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, #7D47EA 0%, rgba(255, 255, 255, 0) 100%)", // orange-500
    };

    const highlight =
        "radial-gradient(75% 181% at 50% 50%, #7D47EA 0%, rgba(255, 255, 255, 0) 100%)"; // orange-500

    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [hovered, duration, rotateDirection]);

    return (
        <Tag
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex rounded-full bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-[#854CFF]/50 items-center justify-center overflow-visible p-px w-fit",
                containerClassName
            )}
            {...props}
        >
            <div
                className={cn(
                    "w-auto text-white z-10 bg-[#171717] px-4 py-2 rounded-[inherit]",
                    className
                )}
            >
                {children}
            </div>
            <motion.div
                className="absolute inset-0 rounded-[inherit]"
                style={{
                    filter: "blur(3px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ background: movingMap[direction] }}
                animate={{
                    background: hovered
                        ? [movingMap[direction], highlight]
                        : movingMap[direction],
                }}
                transition={{ ease: "linear", duration }}
            />
        </Tag>
    );
}
