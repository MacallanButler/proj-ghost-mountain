"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 ${
                scrolled 
                    ? "bg-[#0e1116]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" 
                    : "bg-transparent py-6"
            }`}>
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <Link 
                        href="/" 
                        onClick={closeMenu}
                        className="text-white font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tighter hover:text-primary transition-colors duration-300"
                    >
                        The Ghost of the Mountains
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10 text-base lg:text-lg font-semibold text-white/90">
                        <Link href="/#range-map" className="hover:text-white hover:scale-105 transition-all duration-200">Range Map</Link>
                        <Link href="/#data" className="hover:text-white hover:scale-105 transition-all duration-200">Data</Link>
                        <Link href="/#quiz" className="hover:text-white hover:scale-105 transition-all duration-200">Quiz</Link>
                        <Link href="/story" className="hover:text-white hover:scale-105 transition-all duration-200">Story</Link>
                        <Link href="/conservation" className="hover:text-white hover:scale-105 transition-all duration-200">Conservation</Link>
                        <Link href="/donate" className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-2 hover:bg-white/25 hover:scale-105 transition-all">
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-primary transition-colors p-2 z-50"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`fixed inset-0 z-40 bg-[#0e1116]/95 backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col justify-center px-8 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            }`}>
                <div className="flex flex-col gap-6 text-xl text-center text-white/90">
                    <Link href="/#range-map" onClick={closeMenu} className="hover:text-white transition-colors py-2 border-b border-white/5">Range Map</Link>
                    <Link href="/#data" onClick={closeMenu} className="hover:text-white transition-colors py-2 border-b border-white/5">Data</Link>
                    <Link href="/#quiz" onClick={closeMenu} className="hover:text-white transition-colors py-2 border-b border-white/5">Quiz</Link>
                    <Link href="/story" onClick={closeMenu} className="hover:text-white transition-colors py-2 border-b border-white/5">Story</Link>
                    <Link href="/conservation" onClick={closeMenu} className="hover:text-white transition-colors py-2 border-b border-white/5">Conservation</Link>
                    <Link href="/donate" onClick={closeMenu} className="bg-primary text-primary-foreground rounded-full px-6 py-3 mt-4 hover:bg-primary/80 transition-all font-semibold inline-block">
                        Donate
                    </Link>
                </div>
            </div>
        </>
    );
}
