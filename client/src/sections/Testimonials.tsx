'use client';

import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar5 from "@/assets/avatars/avatar-5.png";
import avatar6 from "@/assets/avatars/avatar-6.png";
import avatar7 from "@/assets/avatars/avatar-7.png";
import avatar8 from "@/assets/avatars/avatar-8.png";
import avatar9 from "@/assets/avatars/avatar-9.png";

import { cn } from "@/lib/utils";

const testimonials = [
    {
        text: "UNFILTER.AI helped me discover my strengths in Class 10 and choose the right stream for my future goals.",
        imageSrc: avatar1.src,
        name: "Priya Sharma",
        username: "@priya_futurepath",
    },
    {
        text: "As a Class 9 student, UNFILTER.AI's career compass showed me paths I never knew existed beyond traditional careers.",
        imageSrc: avatar2.src,
        name: "Arjun Patel",
        username: "@arjun_explores",
    },
    {
        text: "The AI helped me understand my aptitude early and make smarter subject choices in Class 11.",
        imageSrc: avatar3.src,
        name: "Ananya Singh",
        username: "@ananya_smartchoices",
    },
    {
        text: "UNFILTER.AI's career guidance helped me explore future paths beyond what my parents suggested.",
        imageSrc: avatar4.src,
        name: "Rohan Kumar",
        username: "@rohan_pathfinder",
    },
    {
        text: "The platform helped me discover my hidden talents in Class 12 and choose the perfect college course.",
        imageSrc: avatar5.src,
        name: "Kavya Reddy",
        username: "@kavya_discovers",
    },
    {
        text: "Starting early with UNFILTER.AI in Class 9 gave me a clear direction for my academic journey.",
        imageSrc: avatar6.src,
        name: "Aditya Gupta",
        username: "@aditya_earlystart",
    },
    {
        text: "The AI compass helped me make informed decisions about my stream selection and future career goals.",
        imageSrc: avatar7.src,
        name: "Sneha Joshi",
        username: "@sneha_informed",
    },
    {
        text: "UNFILTER.AI showed me how to leverage my strengths early and build skills for my dream career.",
        imageSrc: avatar8.src,
        name: "Vikram Mehta",
        username: "@vikram_builds",
    },
    {
        text: "The personalized insights helped me understand my potential and make confident choices about my future.",
        imageSrc: avatar9.src,
        name: "Ishita Das",
        username: "@ishita_confident",
    },
];

const first = testimonials.slice(0, 3);
const second = testimonials.slice(3, 6);
const third = testimonials.slice(6, 9);

export const TestimonialColumn = ({
    testimonials,
    className,
    testiSpeed = 20,
    duration = 40,
}: {
    testimonials: typeof first;
    className?: string;
    testiSpeed?: number;
    duration?: number;
}) => (
    <div className={cn("space-y-6 py-4", className)}>
        {testimonials.map((testimonial, idx) => (
            <div
                key={idx}
                className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-gray-950"
                style={{
                    background:
                        "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                }}
            >
                <div className="relative z-20">
                    <div className="flex flex-row items-center">
                        <img
                            src={testimonial.imageSrc}
                            alt={testimonial.name}
                            className="rounded-full w-10 h-10"
                        />
                        <div className="ml-4">
                            <div className="font-bold text-white text-sm">
                                {testimonial.name}
                            </div>
                            <div className="font-normal text-white/40 text-sm">
                                {testimonial.username}
                            </div>
                        </div>
                    </div>
                    <div className="text-white leading-[1.6] text-sm font-normal pt-4">
                        {testimonial.text}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export function Testimonials() {
    return (
        <section className="w-full py-20 bg-gray-950">
            <div className="mx-auto text-center md:text-center">
                <div className="text-sm inline-flex border border-[#7D47EA] bg-[#7D47EA]/10 rounded-lg px-3 py-1">
                    <span className="bg-gradient-to-r from-[#7D47EA] to-[#F8A3EC] text-transparent bg-clip-text font-medium">
                        Testimonials
                    </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/70 text-transparent bg-clip-text mt-6">
                    What our students say
                </h2>
                <div className="text-xl text-white/70 tracking-tight mt-5 max-w-2xl mx-auto">
                    See how UNFILTER.AI's career compass has helped Class 9–12 students discover their strengths, explore future paths, and make smarter academic choices early in their journey.
                </div>
            </div>
            <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden mt-10">
                <TestimonialColumn testimonials={first} duration={15} />
                <TestimonialColumn
                    testimonials={second}
                    className="hidden md:block"
                    duration={19}
                />
                <TestimonialColumn
                    testimonials={third}
                    className="hidden lg:block"
                    duration={17}
                />
            </div>
        </section>
    );
}