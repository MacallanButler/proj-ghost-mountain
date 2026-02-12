"use client";

import { ArrowDown } from "lucide-react";

export function Hero() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(127,180,255,0.12),transparent_60%),linear-gradient(to_bottom,rgba(14,17,22,0.9),rgba(14,17,22,1))]">
            {/* Atmospheric grain / overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3px_3px] opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full">
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold mb-4 tracking-tight text-foreground">
                    The Ghost of the Mountains
                </h2>
                <p className="max-w-[65ch] text-lg text-muted-foreground mb-8">
                    An interactive guide to one of the world’s most elusive big cats.
                </p>
                <button
                    onClick={scrollToAbout}
                    className="group inline-flex items-center gap-2 bg-transparent border border-primary text-primary px-5 py-3 rounded text-base transition-colors hover:bg-primary/10"
                >
                    Learn More
                    <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </button>
            </div>
        </header>
    );
}
