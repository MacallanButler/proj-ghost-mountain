"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/raimond-klavins-L6jxljMeUoo-unsplash.jpg";
import heroMobileBg from "@/assets/hero1.jpg";

export function Hero() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="relative min-h-screen min-h-dvh w-full flex flex-col justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Mobile Portrait Viewport */}
                <div className="block md:hidden absolute inset-0 w-full h-full">
                    <Image
                        src={heroMobileBg}
                        alt="Mountain landscape at sunset"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={100}
                        sizes="100vw"
                    />
                </div>
                {/* Desktop Landscape Viewport */}
                <div className="hidden md:block absolute inset-0 w-full h-full">
                    <Image
                        src={heroBg}
                        alt="Mountain landscape at sunset"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={100}
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
                <div className="absolute inset-0 bg-background/20" />
            </div>

            {/* Atmospheric grain / overlay */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3px_3px] opacity-20 pointer-events-none" />

            <div className="relative z-10 px-6 pt-36 md:pt-44 max-w-[1100px] mx-auto w-full text-center md:text-left">
                <p className="max-w-[65ch] text-xl md:text-2xl text-white mb-10 font-medium"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.6)' }}>
                    An interactive guide to one of the world’s most elusive big cats.
                </p>
                <button
                    onClick={scrollToAbout}
                    className="relative group overflow-hidden rounded-full p-[1.5px] transition-all hover:scale-105 duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] inline-flex"
                >
                    {/* Aurora Gradient Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 animate-aurora pointer-events-none" />
                    {/* Dark Button Content */}
                    <span className="relative flex items-center gap-2 px-8 py-4 rounded-full bg-black/60 group-hover:bg-black/30 text-white text-lg font-medium transition-colors duration-300">
                        <span>Learn More</span>
                        <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                    </span>
                </button>
            </div>
        </header>
    );
}
