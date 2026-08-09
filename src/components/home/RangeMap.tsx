"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

interface Country {
    id: string;
    name: string;
    population: number;
    status: "stronghold" | "fragmented" | "critical";
    area: string;
    coordinates: [number, number]; // [longitude, latitude]
    conservation: string;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countries: Country[] = [
    { id: "russia",       name: "Russia",       population: 90,   status: "critical",   area: "Sayan-Altai, Lake Baikal region",     coordinates: [92, 52], conservation: "National conservation strategy in place; among the least-studied range countries due to remote, sparsely surveyed habitat." },
    { id: "mongolia",     name: "Mongolia",     population: 953,  status: "stronghold", area: "Altai, Gobi-Altai, Khangai ranges",   coordinates: [95, 46], conservation: "Long-running Snow Leopard Trust research project; one of the most data-rich snow leopard research programs globally, including radio-collaring studies." },
    { id: "china",        name: "China",        population: 2000, status: "stronghold", area: "Tibetan Plateau, Xinjiang, Qinghai",  coordinates: [90, 36], conservation: "Home to an estimated ~60% of the world's snow leopard habitat, the largest range share of any country; population data remains comparatively limited despite this scale." },
    { id: "kazakhstan",   name: "Kazakhstan",   population: 180,  status: "critical",   area: "Tian Shan (northern)",                coordinates: [77, 43], conservation: "Party to a regional memorandum (with Kyrgyzstan, Tajikistan, Uzbekistan) on conservation across the Western Tien Shan and Pamir-Alai." },
    { id: "kyrgyzstan",   name: "Kyrgyzstan",   population: 300,  status: "fragmented", area: "Tian Shan, Pamir-Alai",              coordinates: [74, 41], conservation: "Hosts the GSLEP Secretariat in Bishkek; site of the original 2013 Bishkek Declaration that founded GSLEP." },
    { id: "tajikistan",   name: "Tajikistan",   population: 300,  status: "fragmented", area: "Pamir Plateau",                       coordinates: [72, 38], conservation: "Party to GSLEP and the regional Western Tien Shan/Pamir-Alai memorandum; in process of formally joining CITES." },
    { id: "uzbekistan",   name: "Uzbekistan",   population: 20,   status: "critical",   area: "Gissar-Alai (western fringe)",       coordinates: [67, 40], conservation: "Smallest range share among the 12, but an active GSLEP member and party to regional cross-border conservation agreements." },
    { id: "afghanistan",  name: "Afghanistan",  population: 200,  status: "critical",   area: "Wakhan Corridor, Hindu Kush",         coordinates: [69, 36], conservation: "Part of GSLEP since its founding; conservation work continues in the Wakhan Corridor despite significant operational challenges." },
    { id: "pakistan",     name: "Pakistan",     population: 200,  status: "fragmented", area: "Karakoram, Gilgit-Baltistan",         coordinates: [73, 35], conservation: "Runs its own Snow Leopard and Ecosystem Protection Programme, focused on community-based conservation in northern mountain regions." },
    { id: "india",        name: "India",        population: 450,  status: "fragmented", area: "Ladakh, Himachal Pradesh, Uttarakhand",coordinates: [78, 33], conservation: "Runs Project Snow Leopard and the SECURE Himalaya project; completed its first-ever nationwide scientific snow leopard census (2019–2023) via the Wildlife Institute of India." },
    { id: "nepal",        name: "Nepal",        population: 397,  status: "stronghold", area: "Dolpo, Mustang, Kangchenjunga",       coordinates: [84, 29], conservation: "Snow Leopard and Ecosystem Management Plan (2017–2026); the Snow Leopard Conservancy trains local citizen scientists to run camera-trap monitoring." },
    { id: "bhutan",       name: "Bhutan",       population: 100,  status: "fragmented", area: "Eastern Himalayas, Jigme Dorji NP",  coordinates: [90, 28], conservation: "Adopted a national Snow Leopard Conservation Action Plan (2024–2034); strong government-level commitment to protected-area management." },
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
                        from the Altai in the north to the Himalayas in the south. Click any marker or country to explore.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Geographic map with hotspots */}
                    <div className="lg:col-span-2 space-y-3">
                        <div className="relative rounded-2xl overflow-hidden border border-stone-700/50 shadow-2xl bg-stone-900" style={{ aspectRatio: "2/1" }}>
                            <ComposableMap
                                projection="geoAzimuthalEqualArea"
                                projectionConfig={{
                                    rotate: [-80, -42, 0], // Center roughly around Central Asia (lon 80E, lat 42N)
                                    scale: 900,
                                }}
                                width={800}
                                height={400}
                                className="w-full h-full outline-none"
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const countryName = geo.properties.name;
                                            const cData = countries.find(c => c.name === countryName);
                                            const isTarget = !!cData;
                                            const isSelected = selected?.id === cData?.id;

                                            let countryFill = "#1c1917"; // Default off-range dark color
                                            let strokeColor = "#292524";

                                            if (isTarget) {
                                                const hitCfg = statusConfig[cData.status];
                                                countryFill = hitCfg.color + "44"; // 25% opacity
                                                strokeColor = "#57534e"; // Lighter border
                                                if (isSelected) {
                                                    countryFill = hitCfg.color + "88"; // More visible if selected
                                                    strokeColor = "#fff";
                                                }
                                            }

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={countryFill}
                                                    stroke={strokeColor}
                                                    strokeWidth={isTarget ? 0.75 : 0.5}
                                                    style={{
                                                        default: { outline: "none", transition: "all 0.3s" },
                                                        hover: { outline: "none", fill: isTarget ? statusConfig[cData.status].color + "66" : "#292524", cursor: isTarget ? "pointer" : "default" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                    onClick={() => {
                                                        if (isTarget) {
                                                            setSelected(prev => prev?.id === cData.id ? null : cData);
                                                        }
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>

                                {/* Country marker pins */}
                                {countries.map(country => {
                                    const cfg = statusConfig[country.status];
                                    const isSelected = selected?.id === country.id;
                                    return (
                                        <Marker 
                                            key={`marker-\${country.id}`} 
                                            coordinates={country.coordinates}
                                            onClick={() => setSelected(prev => prev?.id === country.id ? null : country)}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { outline: "none", cursor: "pointer" },
                                                pressed: { outline: "none" },
                                            }}
                                        >
                                            <g className="transition-transform hover:scale-125">
                                                {isSelected && (
                                                    <circle r={12} fill="none" stroke={cfg.ring} strokeWidth={2} className="animate-ping shadow-xl" />
                                                )}
                                                <circle 
                                                    r={isSelected ? 6 : 4} 
                                                    fill={cfg.color} 
                                                    stroke="#fff" 
                                                    strokeWidth={1.5} 
                                                />
                                            </g>
                                        </Marker>
                                    );
                                })}
                            </ComposableMap>

                            {/* Legend bottom-left */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-stone-900/90 backdrop-blur-sm border border-stone-700/60 rounded-xl px-3 py-2 pointer-events-none">
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
                                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all text-left ${selected?.id === c.id
                                                ? "border-white/50 text-white bg-stone-800"
                                                : "border-stone-800 text-stone-400 hover:border-stone-600 hover:text-white"
                                            }`}
                                    >
                                        <span className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0 inline-block align-middle" style={{ background: cfg.color }} />
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
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Conservation Program</p>
                                            <p className="text-sm text-stone-300 leading-relaxed">{selected.conservation}</p>
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
                                        <p className="text-xs text-stone-500">{selected.population} estimated individuals in this country</p>
                                        <span className="text-[9px] text-stone-600 block mt-1 font-mono">Source: IUCN Red List / GSLEP / Snow Leopard Trust & Conservancy / National Conservation Plans</span>
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
                                    <p className="text-stone-400 text-sm">Click a marker or country border to see population data and habitat regions.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Total summary */}
                        <div className="bg-stone-900 border border-stone-700/50 rounded-xl p-4 space-y-3">
                            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Total Global Population</p>
                            <div className="text-2xl font-bold text-white">
                                7,446–7,996<span className="text-stone-500 text-sm block mt-0.5 font-normal">estimated individuals (total)</span>
                            </div>
                            <p className="text-[10px] text-stone-400 leading-normal">
                                The mature breeding population is estimated at 2,710–3,386 individuals.
                            </p>
                            <span className="text-[9px] text-stone-500 block font-mono">Source: IUCN Red List / GSLEP</span>
                            <div className="space-y-1.5 pt-2 border-t border-stone-800">
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
