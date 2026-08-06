"use client";

import { useState } from "react";
import { Scale, Ruler, Heart, Award } from "lucide-react";

type CompareTarget = "cat" | "leopard" | "human" | "all";

export function VitalsAndSize() {
    const [compareMode, setCompareMode] = useState<CompareTarget>("all");

    const taxonomyData = [
        { rank: "Kingdom", value: "Animalia" },
        { rank: "Phylum", value: "Chordata" },
        { rank: "Class", value: "Mammalia" },
        { rank: "Order", value: "Carnivora" },
        { rank: "Family", value: "Felidae" },
        { rank: "Genus", value: "Panthera" },
        { rank: "Species", value: "P. uncia" },
        { rank: "Binomial name", value: "Panthera uncia (Schreber, 1775)" },
    ];

    return (
        <section id="vitals" className="py-24 px-6 bg-gradient-to-b from-[#0e1116] to-stone-950 overflow-hidden">
            <div className="max-w-[1100px] mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Vitals & Classification</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-foreground tracking-tight">
                        Physical Stats & Taxonomy
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-lg text-muted-foreground">
                        Get to know the biological blueprint of the mountains' most specialized predator.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Column 1: Vitals & Taxonomy (7 cols on large screens) */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        {/* Physical Stats Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs text-stone-400 uppercase tracking-wider">Weight Range</h4>
                                    <p className="text-xl font-bold text-white mt-1">22 – 55 kg</p>
                                    <p className="text-xs text-stone-500">(49 – 121 lbs)</p>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                                    <Ruler className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs text-stone-400 uppercase tracking-wider">Body Length</h4>
                                    <p className="text-xl font-bold text-white mt-1">75 – 150 cm</p>
                                    <p className="text-xs text-stone-500">Plus 80–105% tail length</p>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                                <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl w-fit">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs text-stone-400 uppercase tracking-wider">Lifespan</h4>
                                    <p className="text-xl font-bold text-white mt-1">10 – 12 yrs</p>
                                    <p className="text-xs text-stone-500">Up to 20+ in captivity</p>
                                </div>
                            </div>
                        </div>

                        {/* Taxonomy Table Card */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                                <Award className="w-4 h-4" />
                                <span>Scientific Classification</span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-stone-300">
                                    <tbody>
                                        {taxonomyData.map((item, idx) => (
                                            <tr key={idx} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                                                <td className="py-2.5 font-semibold text-stone-400 pr-4">{item.rank}</td>
                                                <td className={`py-2.5 text-right ${item.rank === "Species" || item.rank === "Genus" || item.rank === "Binomial name" ? "italic text-white" : "text-white"}`}>
                                                    {item.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Evolutionary genetics note */}
                            <div className="pt-4 border-t border-white/5 text-xs text-stone-400 leading-relaxed italic">
                                <strong>Historical taxonomic debate:</strong> Genetic analysis shifted snow leopards from their own unique genus, <em>Uncia</em>, to the genus <em>Panthera</em>, proving they share a closer evolutionary ancestry with tigers than leopards.
                            </div>
                        </div>

                        <span className="text-[10px] text-stone-600 block font-mono">
                            Sources: IUCN Red List, Panthera Corporation, Snow Leopard Trust
                        </span>
                    </div>

                    {/* Column 2: Size Comparison (5 cols on large screens) */}
                    <div className="lg:col-span-5 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white text-base">Interactive Size Scale</h3>
                                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">Visual Grid</span>
                            </div>
                            <p className="text-xs text-stone-400 leading-relaxed mb-6">
                                Toggle to see how a snow leopard compares to a domestic cat and a human. The leopard's long tail equals its entire body length.
                            </p>
                        </div>

                        {/* SVG Canvas Box */}
                        <div className="relative aspect-[4/3] bg-stone-900 border border-stone-800 rounded-xl overflow-hidden mb-6">
                            
                            {/* Gridlines backdrop */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_top,#1c1917_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

                            {/* Silhouette SVG drawing */}
                            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full z-10 select-none">
                                {/* Ruler Scale Labels (Aligned perfectly inside SVG) */}
                                <g style={{ pointerEvents: 'none', userSelect: 'none' }}>
                                    <text x="10" y="53" fill="#78716c" fontSize="9" fontFamily="monospace" textAnchor="start">1.5m</text>
                                    <text x="10" y="123" fill="#78716c" fontSize="9" fontFamily="monospace" textAnchor="start">1.0m</text>
                                    <text x="10" y="193" fill="#78716c" fontSize="9" fontFamily="monospace" textAnchor="start">0.5m</text>
                                    <text x="10" y="263" fill="#78716c" fontSize="9" fontFamily="monospace" textAnchor="start">0.0m</text>
                                </g>

                                {/* Grid reference markers */}
                                <line x1="35" y1="260" x2="380" y2="260" stroke="#44403c" strokeWidth="1" />
                                <line x1="40" y1="190" x2="380" y2="190" stroke="#44403c" strokeWidth="0.5" strokeDasharray="3 3" />
                                <line x1="40" y1="120" x2="380" y2="120" stroke="#44403c" strokeWidth="0.5" strokeDasharray="3 3" />
                                <line x1="40" y1="50" x2="380" y2="50" stroke="#44403c" strokeWidth="0.5" strokeDasharray="3 3" />

                                {/* House Cat (0.25m tall, 0.5m length) */}
                                <g 
                                    className="transition-all duration-500" 
                                    style={{ 
                                        opacity: compareMode === "cat" || compareMode === "all" ? 1 : 0.15,
                                        transform: compareMode === "cat" ? "scale(1.1) translate(-10px, -5px)" : "scale(1)"
                                    }}
                                >
                                    {/* Stylized Cat silhouette (Facing left) */}
                                    <path 
                                        d="M60,260 C58,260 57,258 56,256 L55,248 C55,246 54,244 52,244 C50,244 48,246 48,249 C48,252 50,254 52,254 C54,254 56,256 57,258 Z" 
                                        fill="#fb923c" 
                                    />
                                    <path 
                                        d="M52,260 L54,248 C54,242 58,240 64,240 L84,240 C90,240 94,245 96,250 L102,238 C104,236 106,238 105,242 L98,255 L96,260 L92,260 L94,251 L84,251 L82,260 L78,260 L80,249 L70,249 L68,260 Z" 
                                        fill="#f97316" 
                                    />
                                    {/* Tail */}
                                    <path 
                                        d="M96,242 C104,232 110,230 112,235 C113,238 108,245 96,250 Z" 
                                        fill="#ea580c" 
                                    />
                                    {compareMode === "cat" && (
                                        <g>
                                            <line x1="72" y1="240" x2="72" y2="210" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
                                            <text x="72" y="202" fill="#fb923c" fontSize="9" textAnchor="middle" fontWeight="bold">0.25m Height</text>
                                            <line x1="52" y1="265" x2="96" y2="265" stroke="#f97316" strokeWidth="1" />
                                            <text x="74" y="277" fill="#fb923c" fontSize="9" textAnchor="middle">0.5m Body</text>
                                        </g>
                                    )}
                                </g>

                                {/* Snow Leopard (0.6m tall at shoulder, 1.2m body, 1m tail) */}
                                <g 
                                    className="transition-all duration-500" 
                                    style={{ 
                                        opacity: compareMode === "leopard" || compareMode === "all" ? 1 : 0.15,
                                        transform: compareMode === "leopard" ? "scale(1.05) translate(-10px, -5px)" : "scale(1)"
                                    }}
                                >
                                    {/* Stylized geometric leopard silhouette (Facing left) */}
                                    {/* Body */}
                                    <path 
                                        d="M130,260 L140,210 C140,195 155,190 175,190 L245,190 C265,190 275,200 280,215 L285,260 L275,260 L272,218 L248,218 L244,260 L234,260 L238,212 L198,212 L194,260 L184,260 L188,215 L160,215 L152,260 Z" 
                                        fill="#22d3ee" 
                                    />
                                    {/* Head & Neck */}
                                    <path 
                                        d="M130,212 C120,212 112,204 112,194 C112,184 122,176 135,182 L150,196 Z" 
                                        fill="#06b6d4" 
                                    />
                                    {/* Tail (Long and curved) */}
                                    <path 
                                        d="M280,200 C310,200 335,170 345,180 C350,188 335,215 285,215 Z" 
                                        fill="#0891b2" 
                                    />
                                                               {(compareMode === "leopard" || compareMode === "all") && (
                                        <g>
                                            <line x1="140" y1="190" x2="140" y2="155" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />
                                            <text x="140" y="148" fill="#22d3ee" fontSize="9" textAnchor="middle" fontWeight="bold">0.6m Shoulder</text>
                                            
                                            <line x1="120" y1="268" x2="280" y2="268" stroke="#22d3ee" strokeWidth="1" />
                                            <text x="200" y="279" fill="#22d3ee" fontSize="9" textAnchor="middle">1.2m Body Length</text>
                                            
                                            <path d="M280,205 C310,205 325,190 335,185" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />
                                            <text x="330" y="172" fill="#22d3ee" fontSize="9" textAnchor="middle">1.0m Heavy Tail</text>
                                        </g>
                                    )}
                                </g>
 
                                {/* Human (1.8m tall standing) */}
                                <g 
                                    className="transition-all duration-500" 
                                    style={{ 
                                        opacity: compareMode === "human" || compareMode === "all" ? 1 : 0.15,
                                        transform: compareMode === "human" ? "scale(1.02) translate(-5px, -2px)" : "scale(1)"
                                    }}
                                >
                                    {/* Stylized human silhouette */}
                                    <circle cx="210" cy="80" r="14" fill="#a78bfa" />
                                    <path 
                                        d="M192,105 C192,98 198,95 210,95 C222,95 228,98 228,105 L228,155 L222,155 L220,260 L200,260 L198,155 L192,155 Z" 
                                        fill="#8b5cf6" 
                                    />
                                    {compareMode === "human" && (
                                        <g>
                                            <line x1="210" y1="66" x2="250" y2="66" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
                                            <text x="256" y="70" fill="#a78bfa" fontSize="9" fontWeight="bold">1.8m Height</text>
                                        </g>
                                    )}
                                </g>
                            </svg>

                            {/* Scale Details overlay */}
                            <div className="absolute top-2 right-2 bg-stone-950/80 backdrop-blur-sm border border-stone-800 rounded-lg p-2.5 text-[10px] text-stone-300 font-mono space-y-1 z-20 pointer-events-none">
                                <p className="font-bold text-white border-b border-stone-800 pb-1">Dimensions</p>
                                <p className="flex justify-between gap-4"><span>Leopard H:</span> <span className="text-cyan-400">~60 cm</span></p>
                                <p className="flex justify-between gap-4"><span>Leopard L:</span> <span className="text-cyan-400">~120 cm</span></p>
                                <p className="flex justify-between gap-4"><span>Tail L:</span> <span className="text-cyan-400">~100 cm</span></p>
                            </div>
                        </div>

                        {/* Interactive Mode Toggles */}
                        <div className="grid grid-cols-4 gap-1">
                            {([
                                ["all", "Show All"],
                                ["cat", "House Cat"],
                                ["leopard", "Snow Leopard"],
                                ["human", "Human"]
                            ] as const).map(([id, name]) => (
                                <button
                                    key={id}
                                    onClick={() => setCompareMode(id)}
                                    className={`py-2 px-1 text-[11px] font-semibold rounded-lg border text-center transition-all duration-300 ${
                                        compareMode === id
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700"
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
