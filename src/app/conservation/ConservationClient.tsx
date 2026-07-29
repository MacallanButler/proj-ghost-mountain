"use client";

import HabitatCalculator from "@/features/education/HabitatCalculator";
import { ExternalLink, Heart, Shield, Camera, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const donationPrograms = [
    {
        icon: Camera,
        title: "Camera Trap Network",
        cost: "$50",
        description: "Funds one month of a camera trap deployed in high-altitude habitat — capturing proof-of-life and breeding activity data.",
        impact: "Each camera covers ~12 km² of territory"
    },
    {
        icon: Shield,
        title: "Anti-Poaching Patrols",
        cost: "$100",
        description: "Covers one week of rangers patrolling a critical corridor, removing snares and educating local herding families.",
        impact: "Each patrol protects 30–50 km of mountain range"
    },
    {
        icon: MapPin,
        title: "GPS Collar Program",
        cost: "$250",
        description: "Contributes to fitting a GPS collar on one individual, giving researchers real-time movement data for 2+ years.",
        impact: "33 individuals currently tracked globally"
    },
    {
        icon: Heart,
        title: "Livestock Insurance",
        cost: "$75",
        description: "Insures a herding family's livestock against leopard predation — removing the financial incentive for retaliation.",
        impact: "Protects ~40 families per region"
    },
];

export default function ConservationClient() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
            <div className="container mx-auto max-w-6xl space-y-20">

                {/* Hero */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter">
                        Your Choices Matter
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        With fewer than 4,000 remaining in the wild, the snow leopard sits on the edge. 
                        Understanding the threats — and how donations create real, traceable impact — is the first step.
                    </p>
                </section>

                {/* Photo gallery */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white text-center">The Ghost in Its World</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
                            <Image
                                src="/snow-leopard-portrait.png"
                                alt="Snow leopard portrait — piercing eyes and spotted coat"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <p className="text-sm text-slate-300">A snow leopard&apos;s pale grey eyes are adapted for high-altitude light conditions — they can see in near-darkness.</p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
                            <Image
                                src="/snow-leopard-stalking.png"
                                alt="Snow leopard stalking across a mountain ridge"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <p className="text-sm text-slate-300">Snow leopards use their 90cm tail for balance on rocky terrain — and as a blanket against mountain cold.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive tools */}
                <section className="space-y-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-foreground text-center">Interactive Exhibits</h2>
                    <div className="w-full max-w-3xl">
                        <HabitatCalculator />
                    </div>
                </section>

                {/* Direct Impact / Donation breakdown */}
                <section className="space-y-8">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold text-foreground">Where Your Donation Goes</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Every dollar is allocated directly to field programs. Here&apos;s exactly what different contribution levels achieve on the ground.
                        </p>
                    </div>

                    {/* Impact stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: "33", label: "Individuals GPS Tracked" },
                            { value: "5,000", label: "Hectares Protected" },
                            { value: "120", label: "Families Supported" },
                            { value: "12", label: "Countries Monitored" },
                        ].map(stat => (
                            <div key={stat.label} className="p-5 bg-card rounded-xl border border-border text-center">
                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Program breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {donationPrograms.map((program) => {
                            const Icon = program.icon;
                            return (
                                <div key={program.title} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all space-y-3">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 bg-primary/10 rounded-xl">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-foreground">{program.title}</h3>
                                                <span className="text-primary font-bold text-sm">{program.cost}</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <p className="text-xs text-primary/80 font-medium">📍 {program.impact}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Link to donation page */}
                    <div className="text-center space-y-4 pt-4">
                        <p className="text-muted-foreground">Ready to contribute? Visit our secure donation page.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/donate"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/80 transition-all"
                            >
                                <Heart className="w-4 h-4" /> Donate Now
                            </Link>
                            <a
                                href="https://www.worldwildlife.org/species/snow-leopard"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-muted-foreground rounded-full font-semibold hover:border-foreground hover:text-foreground transition-all"
                            >
                                WWF Snow Leopard Programme <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
