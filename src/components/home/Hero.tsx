"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/raimond-klavins-L6jxljMeUoo-unsplash.jpg";

export function Hero() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="Mountain landscape at sunset"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
                <div className="absolute inset-0 bg-background/20" />
            </div>

            {/* Atmospheric grain / overlay */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3px_3px] opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full text-center md:text-left">
                <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold mb-6 tracking-tight text-white drop-shadow-md">
                    The Ghost of the Mountains
                </h2>
                <p className="max-w-[65ch] text-xl text-gray-200 mb-10 drop-shadow md:mx-0 mx-auto">
                    An interactive guide to one of the world’s most elusive big cats.
                </p>
                <button
                    onClick={scrollToAbout}
                    className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-white/20 hover:scale-105"
                >
                    Learn More
                    <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                </button>
            </div>
        </header>
    );
}
