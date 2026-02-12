"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

// Images
import poachingImg from "@/assets/poaching1.jpg";
import habitatLossImg from "@/assets/matt-palmer-kbTp7dBzHyY-unsplash.jpg";
import climateImg from "@/assets/climate1.jpg";
import preyLossImg from "@/assets/conflict2.jpg";
import conflictImg from "@/assets/conflict1.jpg";

type Threat = {
    title: string;
    description: string;
    image: StaticImageData;
};

const threats: Threat[] = [
    {
        title: "Poaching",
        description: "Illegal hunting for their beautiful fur and bones.",
        image: poachingImg,
    },
    {
        title: "Habitat Loss",
        description: "Expansion of farms and roads fragments their home.",
        image: habitatLossImg,
    },
    {
        title: "Climate Change",
        description: "Warming temperatures shrink their alpine habitat.",
        image: climateImg,
    },
    {
        title: "Prey Loss",
        description: "Decline in wild prey forces them to target livestock.",
        image: preyLossImg,
    },
    {
        title: "Human Conflict",
        description: "Retaliatory killings by herders protecting their herds.",
        image: conflictImg,
    },
];

export function ThreatTimeline() {
    const [activeIndex, setActiveIndex] = useState(2); // Start centered

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % threats.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + threats.length) % threats.length);
    };

    return (
        <section id="threats" className="py-24 px-6 overflow-hidden bg-black/5">
            <div className="max-w-[1000px] mx-auto text-center mb-16">
                <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-6 text-foreground">
                    Conservation Threats
                </h2>
                <p className="max-w-[70ch] mx-auto text-lg text-muted-foreground">
                    The ghost of the mountains faces perils that could make it a myth forever.
                </p>
            </div>

            <div className="relative h-[500px] flex items-center justify-center perspective-[1000px]">
                <AnimatePresence mode="popLayout">
                    {threats.map((threat, index) => {
                        // Calculate offset from active index
                        let offset = index - activeIndex;

                        // Handle wrap-around logic for visual positioning
                        if (offset < -2) offset += threats.length;
                        if (offset > 2) offset -= threats.length;

                        const isActive = offset === 0;
                        const isVisible = Math.abs(offset) <= 1; // Only show center and immediate neighbors

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={threat.title}
                                className={`absolute w-[300px] md:w-[380px] h-[420px] rounded-2xl flex flex-col overflow-hidden backdrop-blur-md transition-all duration-500
                                    ${isActive
                                        ? "z-20 border-2 border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.5)] bg-black/80"
                                        : "z-10 border border-white/10 bg-black/40 grayscale brightness-50"
                                    }`}
                                initial={{ opacity: 0, scale: 0.8, x: offset * 300 }}
                                animate={{
                                    opacity: 1,
                                    scale: isActive ? 1 : 0.85,
                                    x: offset * (typeof window !== "undefined" && window.innerWidth < 768 ? 150 : 420), // Responsive spacing
                                    rotateY: offset * -15,
                                    zIndex: isActive ? 20 : 10,
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Image Half */}
                                <div className="relative h-[60%] w-full">
                                    <Image
                                        src={threat.image}
                                        alt={threat.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 300px, 380px"
                                    />
                                    {isActive && <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />}
                                </div>

                                {/* Text Half */}
                                <div className="h-[40%] p-6 flex flex-col justify-center items-center text-center relative">
                                    {/* Red glow divider */}
                                    {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-red-500/50 shadow-[0_0_10px_rgba(220,38,38,1)]" />}

                                    <h3 className={`text-2xl font-bold mb-3 ${isActive ? "text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" : "text-white/70"}`}>
                                        {threat.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-300">
                                        {threat.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Navigation Buttons (Outside) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 md:left-12 z-30 p-4 rounded-full bg-black/50 hover:bg-red-900/50 backdrop-blur-md border border-white/10 hover:border-red-500/50 text-white transition-all hover:scale-110"
                    aria-label="Previous threat"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 md:right-12 z-30 p-4 rounded-full bg-black/50 hover:bg-red-900/50 backdrop-blur-md border border-white/10 hover:border-red-500/50 text-white transition-all hover:scale-110"
                    aria-label="Next threat"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute -bottom-12 flex gap-3">
                    {threats.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? "bg-red-500 w-8 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                                    : "bg-white/20 hover:bg-white/50"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
