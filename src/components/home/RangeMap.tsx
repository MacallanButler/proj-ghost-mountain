"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Country {
    id: string;
    name: string;
    population: number;
    status: "stronghold" | "fragmented" | "critical";
    area: string;
    // Geographic centre of the snow leopard habitat in that country
    // Projected into % coords on our map image (bounds: ~50°E–120°E, 25°N–60°N)
    cx: number; // percent from left
    cy: number; // percent from top
}

// Map image bounds (lon/lat):  left=50°E  right=120°E  top=60°N  bottom=25°N
const MAP_LON_MIN = 50, MAP_LON_MAX = 120;
const MAP_LAT_MIN = 25, MAP_LAT_MAX = 60;

/** Convert geographic coords → % position on the map image */
function geo(lon: number, lat: number) {
    const cx = ((lon - MAP_LON_MIN) / (MAP_LON_MAX - MAP_LON_MIN)) * 100;
    const cy = ((MAP_LAT_MAX - lat) / (MAP_LAT_MAX - MAP_LAT_MIN)) * 100;
    return { cx, cy };
}

const countries: Country[] = [
    { id: "russia",       name: "Russia",       population: 90,   status: "critical",   area: "Sayan-Altai, Lake Baikal region",     ...geo(92, 52) },
    { id: "mongolia",     name: "Mongolia",     population: 953,  status: "stronghold", area: "Altai, Gobi-Altai, Khangai ranges",   ...geo(95, 46) },
    { id: "china",        name: "China",        population: 2000, status: "stronghold", area: "Tibetan Plateau, Xinjiang, Qinghai",  ...geo(90, 36) },
    { id: "kazakhstan",   name: "Kazakhstan",   population: 180,  status: "critical",   area: "Tian Shan (northern)",                ...geo(77, 43) },
    { id: "kyrgyzstan",   name: "Kyrgyzstan",   population: 300,  status: "fragmented", area: "Tian Shan, Pamir-Alai",              ...geo(74, 41) },
    { id: "tajikistan",   name: "Tajikistan",   population: 300,  status: "fragmented", area: "Pamir Plateau",                       ...geo(72, 38) },
    { id: "uzbekistan",   name: "Uzbekistan",   population: 20,   status: "critical",   area: "Gissar-Alai (western fringe)",       ...geo(67, 40) },
    { id: "afghanistan",  name: "Afghanistan",  population: 200,  status: "critical",   area: "Wakhan Corridor, Hindu Kush",         ...geo(69, 36) },
    { id: "pakistan",     name: "Pakistan",     population: 200,  status: "fragmented", area: "Karakoram, Gilgit-Baltistan",         ...geo(73, 35) },
    { id: "india",        name: "India",        population: 450,  status: "fragmented", area: "Ladakh, Himachal Pradesh, Uttarakhand",...geo(78, 33) },
    { id: "nepal",        name: "Nepal",        population: 397,  status: "stronghold", area: "Dolpo, Mustang, Kangchenjunga",       ...geo(84, 29) },
    { id: "bhutan",       name: "Bhutan",       population: 100,  status: "fragmented", area: "Eastern Himalayas, Jigme Dorji NP",  ...geo(90, 28) },
];

const statusConfig = {
    stronghold: { color: "#3b82f6", ring: "#93c5fd", label: "Stronghold",  text: "text-blue-400",  bg: "bg-blue-500" },
    fragmented: { color: "#f59e0b", ring: "#fcd34d", label: "Fragmented",  text: "text-amber-400", bg: "bg-amber-500" },
    critical:   { color: "#ef4444", ring: "#fca5a5", label: "Critical",    text: "text-red-400",   bg: "bg-red-500" },
};

export function SnowLeopardRangeMap() {
    const [selected, setSelected] = useState<Country | null>(null);

    return (
        <section id="range-map" className="py-20 bg-stone-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Habitat Range</span>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        The <span className="text-blue-400">12-Country</span> Range
                    </h2>
                    <p className="text-stone-400 max-w-xl mx-auto text-sm">
                        Snow leopards inhabit the high-altitude mountains of Central and South Asia, 
                        from the Altai in the north to the Himalayas in the south. Click any marker to explore.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Geographic map with hotspots */}
                    <div className="lg:col-span-2 space-y-3">
                        <div className="relative rounded-2xl overflow-hidden border border-stone-700/50 shadow-2xl" style={{ aspectRatio: "2/1" }}>
                            {/* Satellite terrain base — Central Asia */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/export?bbox=50,25,120,60&bboxSR=4326&size=800,400&imageSR=4326&format=png&transparent=false&f=image"
                                alt="Topographic map of Central and South Asia"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to a styled dark background if the tile server is unreachable
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                            {/* Dark tinted overlay to keep our markers readable */}
                            <div className="absolute inset-0 bg-stone-950/55" />

                            {/* Country marker pins */}
                            {countries.map(country => {
                                const cfg = statusConfig[country.status];
                                const isSelected = selected?.id === country.id;
                                return (
                                    <button
                                        key={country.id}
                                        onClick={() => setSelected(prev => prev?.id === country.id ? null : country)}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                                        style={{ left: `${country.cx}%`, top: `${country.cy}%` }}
                                        title={country.name}
                                    >
                                        {/* Pulse ring on selected */}
                                        {isSelected && (
                                            <span
                                                className="absolute inset-0 rounded-full animate-ping"
                                                style={{ background: cfg.ring, opacity: 0.4 }}
                                            />
                                        )}
                                        {/* Pin dot */}
                                        <span
                                            className="relative block rounded-full border-2 border-white/60 shadow-lg transition-all duration-200 group-hover:scale-125"
                                            style={{
                                                width: isSelected ? 18 : 13,
                                                height: isSelected ? 18 : 13,
                                                background: cfg.color,
                                                boxShadow: `0 0 ${isSelected ? 10 : 6}px ${cfg.color}`,
                                            }}
                                        />
                                        {/* Tooltip label on hover */}
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 bg-stone-900/95 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-stone-700">
                                            {country.name}
                                        </span>
                                    </button>
                                );
                            })}

                            {/* Legend bottom-left */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-stone-900/90 backdrop-blur-sm border border-stone-700/60 rounded-xl px-3 py-2">
                                {Object.entries(statusConfig).map(([key, c]) => (
                                    <div key={key} className="flex items-center gap-1.5 text-xs text-stone-300">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                                        {c.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Country grid quick ref */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                            {countries.map(c => {
                                const cfg = statusConfig[c.status];
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelected(prev => prev?.id === c.id ? null : c)}
                                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all text-left ${
                                            selected?.id === c.id
                                                ? "border-white/50 text-white bg-stone-800"
                                                : "border-stone-800 text-stone-400 hover:border-stone-600 hover:text-white"
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full inline-block mr-1.5 flex-shrink-0" style={{ background: cfg.color }} />
                                        {c.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail panel */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {selected ? (
                                <motion.div
                                    key={selected.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6"
                                >
                                    <span className={`text-xs font-bold uppercase tracking-widest mb-1 block ${statusConfig[selected.status].text}`}>
                                        {statusConfig[selected.status].label}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-5">{selected.name}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Estimated Population</p>
                                            <p className="text-3xl font-bold text-white">{selected.population.toLocaleString()}<span className="text-stone-500 text-lg">+</span></p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Key Habitat Regions</p>
                                            <p className="text-sm text-stone-300">{selected.area}</p>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min((selected.population / 2000) * 100, 100)}%`,
                                                    background: statusConfig[selected.status].color
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-stone-500">{selected.population} of ~4,000 total global population</p>
                                    </div>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="mt-4 text-xs text-stone-500 hover:text-stone-300 transition-colors"
                                    >
                                        ✕ Deselect
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6 text-center space-y-2"
                                >
                                    <div className="text-3xl">🐆</div>
                                    <p className="text-stone-400 text-sm">Click a marker or country name to see population data and habitat regions.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Total summary */}
                        <div className="bg-stone-900 border border-stone-700/50 rounded-xl p-4 space-y-3">
                            <p className="text-xs text-stone-500 uppercase tracking-wider">Total Global Range</p>
                            <div className="text-3xl font-bold text-white">
                                ~4,000<span className="text-stone-500 text-lg"> individuals</span>
                            </div>
                            <div className="space-y-1.5">
                                {Object.entries(statusConfig).map(([key, c]) => {
                                    const count = countries.filter(co => co.status === key).length;
                                    return (
                                        <div key={key} className="flex items-center justify-between text-xs">
                                            <span className="flex items-center gap-1.5 text-stone-400">
                                                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                                                {c.label}
                                            </span>
                                            <span className="text-stone-300">{count} countr{count === 1 ? "y" : "ies"}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
