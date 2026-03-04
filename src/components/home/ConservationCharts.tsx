"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    Legend,
} from "recharts";
import { useState } from "react";

// Population estimates from WWF/SLT monitoring programs (approximated for demo)
const populationData = [
    { year: "1980", global: 9000 },
    { year: "1985", global: 8200 },
    { year: "1990", global: 7100 },
    { year: "1995", global: 6500 },
    { year: "2000", global: 5800 },
    { year: "2005", global: 5200 },
    { year: "2010", global: 4700 },
    { year: "2015", global: 4300 },
    { year: "2020", global: 4080 },
    { year: "2025", global: 4000 },
];

// Prey species population index (1980 = 100)
const preyData = [
    { year: "1980", bharal: 100, ibex: 100, argali: 100 },
    { year: "1990", bharal: 92, ibex: 85, argali: 88 },
    { year: "2000", bharal: 80, ibex: 68, argali: 70 },
    { year: "2010", bharal: 68, ibex: 52, argali: 55 },
    { year: "2020", bharal: 55, ibex: 38, argali: 42 },
    { year: "2025", bharal: 50, ibex: 32, argali: 38 },
];

type ChartTab = "population" | "prey";

export function ConservationCharts() {
    const [tab, setTab] = useState<ChartTab>("population");

    return (
        <section id="data" className="py-20 bg-stone-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Conservation Data</span>
                    <h2 className="text-4xl font-bold text-white mb-3">The Numbers</h2>
                    <p className="text-stone-400 max-w-lg mx-auto text-sm">
                        Four decades of data tell a story we cannot ignore.
                    </p>
                </div>

                {/* Tab switcher */}
                <div className="flex rounded-lg overflow-hidden border border-stone-700 w-fit mx-auto mb-8">
                    {([["population", "Population Trend"], ["prey", "Prey Decline"]] as const).map(([id, label]) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`px-6 py-2.5 text-sm font-semibold transition-colors ${tab === id ? "bg-blue-600 text-white" : "bg-stone-800 text-stone-400 hover:text-white"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6">
                    {tab === "population" ? (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Global Snow Leopard Population (est.)</h3>
                                <div className="text-xs px-2 py-1 rounded bg-red-900/30 border border-red-500/30 text-red-400">
                                    −56% since 1980
                                </div>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={populationData} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                                        <XAxis dataKey="year" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} domain={[2000, 10000]} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            contentStyle={{ background: "#1c1917", border: "1px solid #44403c", color: "#fff" }}
                                        />
                                        <ReferenceLine y={4000} stroke="#3b82f6" strokeDasharray="4 4" opacity={0.5} label={{ value: "Current", fill: "#60a5fa", fontSize: 10 }} />
                                        <Line type="monotone" dataKey="global" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Prey Species Population Index (1980 = 100)</h3>
                                <div className="text-xs px-2 py-1 rounded bg-amber-900/30 border border-amber-500/30 text-amber-400">
                                    Prey scarcity = starvation + livestock conflict
                                </div>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={preyData} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                                        <XAxis dataKey="year" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} domain={[0, 110]} />
                                        <Tooltip contentStyle={{ background: "#1c1917", border: "1px solid #44403c", color: "#fff" }} />
                                        <Legend wrapperStyle={{ fontSize: 12, color: "#a8a29e" }} />
                                        <Bar dataKey="bharal" name="Bharal (Blue Sheep)" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="ibex" name="Himalayan Ibex" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="argali" name="Argali (Marco Polo Sheep)" fill="#10b981" radius={[2, 2, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
