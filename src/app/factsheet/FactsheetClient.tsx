"use client";

import { Printer, ArrowLeft, ShieldAlert, Award } from "lucide-react";
import { trackFactSheetDownload } from "@/lib/analytics";

export default function FactsheetClient() {
    const handlePrint = () => {
        trackFactSheetDownload();
        window.print();
    };

    const taxonomy = [
        { rank: "Kingdom", value: "Animalia" },
        { rank: "Phylum", value: "Chordata" },
        { rank: "Class", value: "Mammalia" },
        { rank: "Order", value: "Carnivora" },
        { rank: "Family", value: "Felidae" },
        { rank: "Genus", value: "Panthera" },
        { rank: "Species", value: "Panthera uncia" },
        { rank: "Binomial Name", value: "Panthera uncia (Schreber, 1775)" },
    ];

    const stats = [
        { label: "Common Name", value: "Snow Leopard" },
        { label: "Weight", value: "22 – 55 kg (49 – 121 lbs)" },
        { label: "Body Length", value: "75 – 150 cm (30 – 60 in)" },
        { label: "Tail Length", value: "80 – 105 cm (31 – 41 in)" },
        { label: "Lifespan", value: "10 – 12 years (wild) / 20+ (captivity)" },
        { label: "Primary Diet", value: "Bharal (blue sheep), ibex, tahr, marmots" },
    ];

    return (
        <main className="min-h-screen bg-stone-900 text-stone-100 py-10 px-4 sm:px-6 print:bg-white print:text-black">
            {/* Inline CSS for print rules */}
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background-color: white !important;
                        color: black !important;
                    }
                    main {
                        padding: 0 !important;
                        background: white !important;
                    }
                }
            `}</style>

            {/* Action Bar (Hidden when printing) */}
            <div className="max-w-[800px] mx-auto mb-8 flex justify-between items-center no-print">
                <a 
                    href="/" 
                    className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-sm font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Website</span>
                </a>
                <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/80 text-white font-bold text-sm transition-all shadow-lg shadow-primary/20 hover:scale-105"
                >
                    <Printer className="w-4 h-4" />
                    <span>Print Fact Sheet / Save as PDF</span>
                </button>
            </div>

            {/* Printable Paper Page Container */}
            <article className="max-w-[800px] mx-auto bg-stone-950 border border-stone-800 rounded-3xl p-8 shadow-2xl print:bg-white print:border-none print:shadow-none print:p-0 print:text-black">
                
                {/* Header */}
                <header className="border-b border-stone-800 print:border-stone-200 pb-6 mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white print:text-black">
                            Panthera uncia
                        </h1>
                        <p className="text-sm text-primary font-semibold tracking-wider uppercase mt-1 print:text-stone-700">
                            Educational Fact Sheet — Ghost of the Mountains
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold print:bg-stone-100 print:text-stone-800 print:border-stone-300">
                            IUCN RED LIST: Vulnerable
                        </span>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    
                    {/* Left Column: Taxonomy & Physical Stats */}
                    <div className="space-y-6">
                        {/* Taxonomy Table */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-stone-800 print:border-stone-200 pb-2">
                                <Award className="w-4 h-4 text-primary print:text-stone-800" />
                                <span>Scientific Classification</span>
                            </h2>
                            <table className="w-full text-xs text-left text-stone-300 print:text-stone-800">
                                <tbody>
                                    {taxonomy.map((item, idx) => (
                                        <tr key={idx} className="border-b border-stone-900/50 print:border-stone-100 last:border-0">
                                            <td className="py-2 font-semibold text-stone-400 print:text-stone-600">{item.rank}</td>
                                            <td className={`py-2 text-right ${item.rank === "Genus" || item.rank === "Species" || item.rank === "Binomial Name" ? "italic font-semibold text-white print:text-black" : "text-white print:text-black"}`}>
                                                {item.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Physical Stats Table */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-white print:text-black flex items-center gap-2 border-b border-stone-800 print:border-stone-200 pb-2">
                                <ShieldAlert className="w-4 h-4 text-primary print:text-stone-800" />
                                <span>Physical Vitallity</span>
                            </h2>
                            <table className="w-full text-xs text-left text-stone-300 print:text-stone-800">
                                <tbody>
                                    {stats.map((item, idx) => (
                                        <tr key={idx} className="border-b border-stone-900/50 print:border-stone-100 last:border-0">
                                            <td className="py-2 font-semibold text-stone-400 print:text-stone-600">{item.label}</td>
                                            <td className="py-2 text-right text-white print:text-black font-semibold">
                                                {item.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Conservation, Threats & Behavior */}
                    <div className="space-y-6">
                        
                        {/* Conservation Status Downlisting Controversy Section */}
                        <div className="space-y-2.5">
                            <h2 className="text-lg font-bold text-white print:text-black border-b border-stone-800 print:border-stone-200 pb-2">
                                Conservation Status
                            </h2>
                            <p className="text-xs text-stone-300 print:text-stone-800 leading-relaxed">
                                In 2017, the snow leopard was downlisted from <strong>Endangered</strong> to <strong>Vulnerable</strong> on the IUCN Red List. This change was publicly contested by major organizations like the <em>Snow Leopard Trust</em> and <em>Panthera</em>, who asserted that the scientific data did not support downlisting. They warned that removing "Endangered" could compromise public urgency and funding. Under IUCN parameters, a "Vulnerable" status still indicates that the species faces a high risk of extinction in the wild.
                            </p>
                            <p className="text-xs text-stone-300 print:text-stone-800 leading-relaxed font-semibold">
                                Total Population Estimate: 7,446–7,996 total individuals.
                                <br />
                                Mature Breeding Individuals: 2,710–3,386 (the primary conservation metric).
                            </p>
                        </div>

                        {/* Behavior & Adaptation */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-white print:text-black border-b border-stone-800 print:border-stone-200 pb-2">
                                Key Adaptations & Behavior
                            </h2>
                            <ul className="text-xs text-stone-300 print:text-stone-800 space-y-2 list-disc pl-4 leading-relaxed">
                                <li>
                                    <strong>Cannot Roar:</strong> Due to their incomplete throat ossification (hyoid bone), snow leopards are unable to roar. They communicate using soft nasal sounds called "chuffs" or "prusten".
                                </li>
                                <li>
                                    <strong>Ambush Hunters:</strong> They leverage steep cliffs for camouflage cover, launching explosive chases and leaping up to 50 feet (15 meters).
                                </li>
                                <li>
                                    <strong>Tail Multi-tool:</strong> Their thick tail, equal to body length, acts as a counterweight for balance on steep slopes and acts as a heat blanket to wrap around their face.
                                </li>
                            </ul>
                        </div>

                        {/* Key Threats */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-white print:text-black border-b border-stone-800 print:border-stone-200 pb-2">
                                Principal Threats
                            </h2>
                            <p className="text-xs text-stone-300 print:text-stone-800 leading-relaxed">
                                <strong>Habitat Loss:</strong> Climate warming shifts tree lines upwards, shrinking the snow leopard's alpine territory, while road construction fragments migration corridors.
                                <br />
                                <strong>Human Conflict:</strong> Loss of wild prey forces snow leopards to target livestock, prompting retaliatory killings by herders.
                                <br />
                                <strong>Poaching:</strong> Illegal wildlife trade continues to target them for their pelt and bones.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="mt-8 pt-6 border-t border-stone-800 print:border-stone-200 text-center text-[10px] text-stone-500 print:text-stone-600">
                    <p className="mb-2">
                        References: IUCN Red List of Threatened Species, Snow Leopard Trust, Panthera, GSLEP.
                    </p>
                    <p>
                        Generated from <strong>Ghost of the Mountains</strong> Interactive Guide — ghostofthemountains.org
                    </p>
                </footer>
            </article>
        </main>
    );
}
