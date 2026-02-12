"use client";

import HabitatCalculator from "@/features/education/HabitatCalculator";
import PawComparison from "@/features/education/PawComparison";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function ConservationPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-950 text-slate-200">
            <div className="container mx-auto max-w-6xl space-y-16">

                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Your Choices Matter
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                        The story of Khangri is the story of every snow leopard. Learn the facts, understand the threats, and join the fight to protect the Ghost of the Mountains.
                    </p>
                </section>

                {/* Interactive Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PawComparison />
                    <HabitatCalculator />
                </div>

                {/* Impact / Donation Section */}
                <section className="bg-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-800 text-center space-y-8">
                    <h2 className="text-3xl font-bold text-white">Direct Impact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-950 rounded-lg border border-slate-800">
                            <div className="text-4xl font-bold text-primary mb-2">3</div>
                            <p className="text-sm text-slate-400">Snow Leopards Collared</p>
                        </div>
                        <div className="p-6 bg-slate-950 rounded-lg border border-slate-800">
                            <div className="text-4xl font-bold text-primary mb-2">5,000</div>
                            <p className="text-sm text-slate-400">Hectares Protected</p>
                        </div>
                        <div className="p-6 bg-slate-950 rounded-lg border border-slate-800">
                            <div className="text-4xl font-bold text-primary mb-2">120</div>
                            <p className="text-sm text-slate-400">Families Supported</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Button size="lg" className="text-lg px-8">
                            Adopt a Snow Leopard
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2">
                            Visit Snow Leopard Trust <ExternalLink className="w-4 h-4" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
