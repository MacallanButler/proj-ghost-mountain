"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Scale, Users, TrendingUp } from "lucide-react";
import { trackTimelineMilestoneClick } from "@/lib/analytics";

interface Milestone {
    year: string;
    title: string;
    description: string;
    category: "policy" | "organization" | "status";
    categoryLabel: string;
    icon: React.ComponentType<{ className?: string }>;
}

const milestones: Milestone[] = [
    {
        year: "1975",
        title: "CITES Appendix I Listing",
        description: "The snow leopard is officially listed on Appendix I of the Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES). This grants the species the highest level of protection against international trade, banning all commercial trade of snow leopard skins, bones, and parts.",
        category: "policy",
        categoryLabel: "International Policy",
        icon: Scale
    },
    {
        year: "1981",
        title: "Snow Leopard Trust Founded",
        description: "The Snow Leopard Trust is founded by Helen Freeman in Seattle, Washington. This marks the creation of the world's first and largest organization dedicated solely to protecting the snow leopard and securing its mountain habitat through community-based conservation.",
        category: "organization",
        categoryLabel: "Conservation Organization",
        icon: Users
    },
    {
        year: "1985",
        title: "CMS Appendix I Listing",
        description: "Listed on Appendix I of the Convention on the Conservation of Migratory Species of Wild Animals (CMS) during the first Conference of the Parties (COP1) in Geneva. This listing enters into force in 1986, binding range nations to protect the species and its migration corridors.",
        category: "policy",
        categoryLabel: "International Policy",
        icon: Scale
    },
    {
        year: "2008",
        title: "Snow Leopard Network Established",
        description: "The landmark Beijing conference establishes the Snow Leopard Network (SLN), a global alliance of researchers, conservationists, and government agencies. This network coordinates international research, shares data, and standardizes monitoring methods.",
        category: "organization",
        categoryLabel: "Conservation Network",
        icon: Users
    },
    {
        year: "2013",
        title: "Bishkek Declaration & GSLEP Founding",
        description: "Governments of all 12 snow leopard range countries sign the Bishkek Declaration in Kyrgyzstan, launching the Global Snow Leopard and Ecosystem Protection Program (GSLEP). This is the first joint governmental commitment to secure habitats across national boundaries.",
        category: "policy",
        categoryLabel: "Governmental Accord",
        icon: Scale
    },
    {
        year: "2017",
        title: "IUCN Status Downlisting",
        description: "The IUCN Red List officially downlists the snow leopard from 'Endangered' to 'Vulnerable'. The decision sparks significant debate, with the Snow Leopard Trust and Panthera opposing it, warning that downlisting could undermine funding and political urgency.",
        category: "status",
        categoryLabel: "Species Status Change",
        icon: TrendingUp
    },
    {
        year: "2017",
        title: "Second Bishkek Declaration",
        description: "Range countries gather again to sign the declaration 'Caring for Snow Leopards and Mountains: Our Ecological Future'. This reinforces the 2013 treaty and establishes concrete targets to address climate change and infrastructure fragmentation.",
        category: "policy",
        categoryLabel: "Governmental Accord",
        icon: Scale
    },
    {
        year: "2020",
        title: "GSLEP Landscape Targets Extended",
        description: "GSLEP evaluates its original 'Secure 20 by 2020' landscape target (identifying and securing 20 key habitats). Having met initial goals, the program formally extends the target to 24 biologically critical mountain landscapes.",
        category: "status",
        categoryLabel: "Conservation Target",
        icon: TrendingUp
    },
    {
        year: "2024",
        title: "UN Proclaims International Day",
        description: "The United Nations General Assembly formally adopts a resolution proclaiming October 23 as the International Day of the Snow Leopard. This establishes an annual UN-recognized day to raise awareness about the species and its alpine ecosystems.",
        category: "policy",
        categoryLabel: "UN Proclamation",
        icon: Scale
    },
    {
        year: "2024",
        title: "Samarkand Resolution Adopted",
        description: "The 8th Steering Committee Meeting of GSLEP in Samarkand, Uzbekistan, adopts the Samarkand Resolution. This landmark document emphasizes regional transboundary agreements, wildlife corridors, and addressing escalating climate impacts.",
        category: "policy",
        categoryLabel: "Governmental Accord",
        icon: Scale
    }
];

const categoryConfig = {
    policy: {
        color: "#3b82f6", // blue-500
        textClass: "text-blue-400",
        bgClass: "bg-blue-500",
        borderClass: "border-blue-500",
        bgLight: "bg-blue-500/10",
        borderLight: "border-blue-500/20"
    },
    organization: {
        color: "#10b981", // emerald-500
        textClass: "text-emerald-400",
        bgClass: "bg-emerald-500",
        borderClass: "border-emerald-500",
        bgLight: "bg-emerald-500/10",
        borderLight: "border-emerald-500/20"
    },
    status: {
        color: "#f59e0b", // amber-500
        textClass: "text-amber-400",
        bgClass: "bg-amber-500",
        borderClass: "border-amber-500",
        bgLight: "bg-amber-500/10",
        borderLight: "border-amber-500/20"
    }
};

export function TimelineScrubber() {
    const [activeIndex, setActiveIndex] = useState(4); // Default to 2013 Bishkek Declaration
    const containerRef = useRef<HTMLDivElement | null>(null);
    const active = milestones[activeIndex];
    const activeCfg = categoryConfig[active.category];

    // Scroll active item into view on mobile
    useEffect(() => {
        if (containerRef.current) {
            const buttons = containerRef.current.querySelectorAll("button");
            const activeButton = buttons[activeIndex];
            if (activeButton) {
                const containerWidth = containerRef.current.offsetWidth;
                const buttonLeft = (activeButton as HTMLElement).offsetLeft;
                const buttonWidth = (activeButton as HTMLElement).offsetWidth;
                containerRef.current.scrollTo({
                    left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
                    behavior: "smooth"
                });
            }
        }
    }, [activeIndex]);

    const handlePrev = () => {
        const newIdx = activeIndex > 0 ? activeIndex - 1 : milestones.length - 1;
        setActiveIndex(newIdx);
        trackTimelineMilestoneClick(milestones[newIdx].year, milestones[newIdx].title);
    };

    const handleNext = () => {
        const newIdx = activeIndex < milestones.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(newIdx);
        trackTimelineMilestoneClick(milestones[newIdx].year, milestones[newIdx].title);
    };

    return (
        <section
            id="timeline"
            data-section-name="timeline"
            className="py-24 px-6 bg-stone-900/40 border-y border-stone-900/60"
        >
            <div className="max-w-[1100px] mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Conservation Milestones</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white tracking-tight">
                        Timeline of Protection
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-lg text-muted-foreground">
                        Tracing the history of global efforts, legal agreements, and scientific networks that stand between the snow leopard and extinction.
                    </p>
                </div>

                {/* Timeline Interaction Area */}
                <div className="bg-stone-900 border border-stone-800/80 rounded-3xl p-6 md:p-10 shadow-xl space-y-10">
                    
                    {/* Horizontal Scrubber / Track */}
                    <div className="relative">
                        {/* Drag and Scroll Container */}
                        <div 
                            ref={containerRef}
                            className="flex overflow-x-auto gap-4 md:gap-8 pb-6 pt-4 px-4 scrollbar-none items-center justify-between relative border-b border-stone-800"
                        >
                            {/* Track connecting line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-800 -translate-y-2.5 z-0" />

                            {milestones.map((m, idx) => {
                                const isSelected = idx === activeIndex;
                                const cfg = categoryConfig[m.category];
                                
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setActiveIndex(idx);
                                            trackTimelineMilestoneClick(m.year, m.title);
                                        }}
                                        className="flex flex-col items-center min-w-[70px] z-10 focus:outline-none group"
                                    >
                                        {/* Year text */}
                                        <span className={`text-xs font-bold font-mono mb-2 transition-all ${
                                            isSelected 
                                                ? cfg.textClass + " scale-110" 
                                                : "text-stone-500 group-hover:text-stone-300"
                                        }`}>
                                            {m.year}
                                        </span>

                                        {/* The timeline node */}
                                        <div 
                                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                                isSelected 
                                                    ? `${cfg.borderClass} bg-stone-950 scale-125 shadow-[0_0_15px_rgba(255,255,255,0.15)]`
                                                    : `border-stone-700 bg-stone-900 group-hover:border-stone-500`
                                            }`}
                                        >
                                            {isSelected && (
                                                <motion.div 
                                                    layoutId="timeline-active-dot"
                                                    className={`w-2.5 h-2.5 rounded-full ${cfg.bgClass}`}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </div>

                                        {/* Mini Indicator of Category on Hover */}
                                        <span className="text-[8px] font-semibold uppercase tracking-wider text-stone-600 mt-2 h-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {m.category}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation buttons and detailed card */}
                    <div className="grid md:grid-cols-12 gap-8 items-center pt-2">
                        {/* Navigation controls */}
                        <div className="md:col-span-3 flex md:flex-col gap-4 justify-between md:justify-center items-center h-full">
                            <button
                                onClick={handlePrev}
                                className="flex items-center justify-center p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700 transition-all w-1/2 md:w-full max-w-[150px]"
                                aria-label="Previous milestone"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" /> Prev
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex items-center justify-center p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700 transition-all w-1/2 md:w-full max-w-[150px]"
                                aria-label="Next milestone"
                            >
                                Next <ChevronRight className="w-5 h-5 ml-1" />
                            </button>
                        </div>

                        {/* Milestone details card */}
                        <div className="md:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-stone-950 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden"
                                >
                                    {/* Subtle category indicator border */}
                                    <div 
                                        className="absolute top-0 left-0 bottom-0 w-1.5" 
                                        style={{ backgroundColor: activeCfg.color }}
                                    />

                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                        <div className="space-y-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${activeCfg.textClass} ${activeCfg.bgLight} ${activeCfg.borderLight}`}>
                                                {active.categoryLabel}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white pt-2">{active.title}</h3>
                                        </div>
                                        <div className="text-4xl font-extrabold text-stone-800 font-mono select-none">
                                            {active.year}
                                        </div>
                                    </div>

                                    <p className="text-stone-300 leading-relaxed text-sm md:text-base">
                                        {active.description}
                                    </p>

                                    {/* Category helper footer */}
                                    <div className="flex gap-4 pt-4 border-t border-stone-900/60 items-center justify-between text-xs text-stone-500">
                                        <span className="flex items-center gap-1.5">
                                            <active.icon className="w-4 h-4 text-stone-400" />
                                            Active Area: {active.categoryLabel}
                                        </span>
                                        <span className="font-mono">Milestone {activeIndex + 1} of {milestones.length}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Timeline legend / category explanation */}
                    <div className="flex flex-wrap gap-6 pt-4 border-t border-stone-800/80 justify-center">
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                            <span className="w-3 h-3 rounded-full bg-blue-500" />
                            <span>International Policy & Accords</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                            <span className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span>Conservation Networks & Organizations</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                            <span className="w-3 h-3 rounded-full bg-amber-500" />
                            <span>Species Status & Targets</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
