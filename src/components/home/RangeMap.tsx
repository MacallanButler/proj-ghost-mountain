"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Country {
    id: string;
    name: string;
    d: string; // SVG path
    population: number;
    status: "stronghold" | "fragmented" | "critical";
    area: string; // km²
}

const countries: Country[] = [
    { id: "china", name: "China", population: 2000, status: "stronghold", area: "Tibetan Plateau, Western China", d: "M 520 90 L 620 80 L 680 110 L 660 150 L 600 160 L 540 140 Z" },
    { id: "india", name: "India", population: 450, status: "fragmented", area: "Himachal Pradesh, Ladakh", d: "M 450 165 L 490 155 L 510 180 L 490 210 L 460 205 Z" },
    { id: "nepal", name: "Nepal", population: 397, status: "stronghold", area: "Himalayan range", d: "M 490 170 L 530 165 L 540 180 L 520 190 L 495 185 Z" },
    { id: "bhutan", name: "Bhutan", population: 100, status: "fragmented", area: "Eastern Himalayas", d: "M 540 175 L 560 170 L 565 182 L 550 188 L 538 183 Z" },
    { id: "pakistan", name: "Pakistan", population: 200, status: "fragmented", area: "Karakoram, Hindu Kush", d: "M 395 145 L 440 130 L 455 155 L 430 170 L 400 165 Z" },
    { id: "afghanistan", name: "Afghanistan", population: 200, status: "critical", area: "Wakhan Corridor", d: "M 355 125 L 400 110 L 415 135 L 395 150 L 360 145 Z" },
    { id: "mongolia", name: "Mongolia", population: 953, status: "stronghold", area: "Altai, Gobi regions", d: "M 560 55 L 660 45 L 700 70 L 680 90 L 620 85 L 580 75 Z" },
    { id: "russia", name: "Russia", population: 90, status: "critical", area: "Sayan-Altai, Baikal", d: "M 540 25 L 620 20 L 640 45 L 580 55 L 545 48 Z" },
    { id: "kazakhstan", name: "Kazakhstan", population: 180, status: "critical", area: "Northern Tian Shan", d: "M 370 70 L 440 60 L 460 85 L 430 98 L 375 90 Z" },
    { id: "kyrgyzstan", name: "Kyrgyzstan", population: 300, status: "fragmented", area: "Tian Shan", d: "M 430 100 L 470 92 L 480 110 L 455 118 L 432 113 Z" },
    { id: "tajikistan", name: "Tajikistan", population: 300, status: "fragmented", area: "Pamir", d: "M 400 115 L 440 105 L 452 125 L 430 135 L 403 128 Z" },
    { id: "uzbekistan", name: "Uzbekistan", population: 20, status: "critical", area: "Gissar-Alai", d: "M 370 105 L 410 98 L 415 115 L 395 122 L 372 118 Z" },
];

const statusColors = {
    stronghold: { fill: "#3b82f6", hover: "#2563eb", label: "Stronghold", text: "text-blue-400" },
    fragmented: { fill: "#f59e0b", hover: "#d97706", label: "Fragmented", text: "text-amber-400" },
    critical: { fill: "#ef4444", hover: "#dc2626", label: "Critical", text: "text-red-400" },
};

export function SnowLeopardRangeMap() {
    const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const displayed = selectedCountry || hoveredCountry;

    return (
        <section id="range-map" className="py-20 bg-stone-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Habitat Range</span>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        The <span className="text-blue-400">12-Country</span> Range
                    </h2>
                    <p className="text-stone-400 max-w-xl mx-auto">
                        Snow leopards are found across 12 countries spanning Central Asia. Click a region to see population data.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* SVG Map */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-stone-900 rounded-2xl border border-stone-700/50 overflow-hidden p-4">
                            <svg
                                viewBox="300 15 460 220"
                                className="w-full"
                                style={{ background: "radial-gradient(ellipse at center, #1c1917 0%, #0c0a09 100%)" }}
                            >
                                {/* Grid lines */}
                                {[0.25, 0.5, 0.75].map((f, i) => (
                                    <line key={i} x1="300" y1={15 + f * 220} x2="760" y2={15 + f * 220}
                                        stroke="#292524" strokeWidth="0.5" strokeDasharray="3 3" />
                                ))}

                                {countries.map(country => {
                                    const colors = statusColors[country.status];
                                    const isSelected = selectedCountry?.id === country.id;
                                    const isHovered = hoveredCountry?.id === country.id;
                                    return (
                                        <motion.path
                                            key={country.id}
                                            d={country.d}
                                            fill={isSelected || isHovered ? colors.hover : colors.fill}
                                            stroke="#0c0a09"
                                            strokeWidth={isSelected ? 2 : 0.8}
                                            opacity={isSelected ? 1 : 0.75}
                                            whileHover={{ opacity: 1 }}
                                            style={{ cursor: "pointer" }}
                                            onMouseEnter={() => setHoveredCountry(country)}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                            onClick={() => setSelectedCountry(prev => prev?.id === country.id ? null : country)}
                                            className="drop-shadow-sm"
                                        />
                                    );
                                })}

                                {/* Decorative mountain dots */}
                                {[{ x: 490, y: 160 }, { x: 550, y: 90 }, { x: 420, y: 135 }].map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r={2} fill="#e7e5e4" opacity={0.2} />
                                ))}
                            </svg>

                            {/* Legend */}
                            <div className="flex items-center gap-4 mt-3 px-2">
                                {Object.entries(statusColors).map(([key, c]) => (
                                    <div key={key} className="flex items-center gap-1.5 text-xs text-stone-400">
                                        <span className="w-3 h-3 rounded-sm" style={{ background: c.fill }} />
                                        {c.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Detail panel */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {displayed ? (
                                <motion.div
                                    key={displayed.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6"
                                >
                                    <span className={`text-xs font-bold uppercase tracking-widest mb-1 block ${statusColors[displayed.status].text}`}>
                                        {statusColors[displayed.status].label}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-4">{displayed.name}</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-400">Est. Population</span>
                                            <span className="text-white font-bold">{displayed.population.toLocaleString()}+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-400">Key Regions</span>
                                            <span className="text-white text-right max-w-[60%]">{displayed.area}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-400">Range Status</span>
                                            <span className={`font-semibold ${statusColors[displayed.status].text}`}>{statusColors[displayed.status].label}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6 text-center"
                                >
                                    <div className="text-4xl mb-3">🐆</div>
                                    <p className="text-stone-400 text-sm">Hover or click a region on the map to see population data.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Population summary */}
                        <div className="bg-stone-900 border border-stone-700/50 rounded-xl p-4">
                            <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Total Estimated Range</p>
                            <div className="text-3xl font-bold text-white mb-1">
                                {countries.reduce((a, c) => a + c.population, 0).toLocaleString()}+
                            </div>
                            <p className="text-stone-400 text-xs">individuals across {countries.length} countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
