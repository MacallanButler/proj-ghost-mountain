"use client";

import { useState } from "react";
import { Compass, Mountain, Quote, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCultureRegionExpand } from "@/lib/analytics";

interface CulturalRegion {
    region: string;
    tradition: string;
    description: string;
    extendedDetails: string;
    icon: typeof Mountain;
    color: string;
    border: string;
}

const culturalRegions: CulturalRegion[] = [
    {
        region: "Mongolia",
        tradition: "Shamanic & Tibetan Buddhist",
        description: "Regarded as a spirit animal and messenger, the snow leopard is revered as the \"Lord of the Mountains\" and connected to Tengri, the sky deity in Mongolian mythology. It frequently appears as a protective guardian figure in traditional carvings and embroidery.",
        extendedDetails: "In Mongolian pastoral culture, herders view the cat as an indicator of mountain vitality. Under Shamanic belief systems, harming the 'Lord of the Mountains' risks disturbing mountain spirits. Today, community rangeland management programs in the South Gobi successfully blend these traditional beliefs with modern livestock insurance to achieve zero-poaching commitments.",
        icon: Mountain,
        color: "text-blue-400",
        border: "hover:border-blue-500/30",
    },
    {
        region: "Tibet & the Himalayas",
        tradition: "Tibetan Buddhist",
        description: "Viewed as a guardian of the high peaks and a symbol of protection, resilience, and spiritual guidance. This deep cultural reverence translates into tolerance: Buddhist principles discouraging harm to living beings have documented influence in reducing retaliatory killings.",
        extendedDetails: "Buddhist monasteries across Ladakh, Spiti, and the Tibetan plateau serve as pivotal conservation allies. Lamas and monks routinely counsel herder communities on Ahimsa (non-violence) toward wild predators, reinforcing that all sentient beings have sacred standing in the high alpine ecosystems.",
        icon: Compass,
        color: "text-emerald-400",
        border: "hover:border-emerald-500/30",
    },
    {
        region: "Ladakh (India)",
        tradition: "Tibetan Buddhist & Folk",
        description: "Regarded as a powerful, mystical guardian of the fragile mountain ecosystem. The cat symbolizes strength, grace, and independence, reminding mountain communities of the delicate balance of life at high altitudes.",
        extendedDetails: "In Ladakh, the Snow Leopard Conservancy India Trust partnered with local women's groups to create the Himalayan Homestay initiative. Villagers host eco-tourists who come to glimpse the cat, transforming the snow leopard from a perceived livestock threat into a premier economic benefactor for rural households.",
        icon: Mountain,
        color: "text-amber-400",
        border: "hover:border-amber-500/30",
    },
    {
        region: "Central Asia & the Pamirs",
        tradition: "Pamir Folklore & Regional Legends",
        description: "Locally known as \"irbis,\" folklore among Wakhi and other communities in the Pamir Mountains includes stories of people transforming into snow leopards. It is widely associated with honor, strength, and luck in regional oral traditions.",
        extendedDetails: "In Pamir folklore, ancestral spirits often take the form of snow leopards to test human hospitality and humility. In Kyrgyzstan, the snow leopard is immortalized as the totemic emblem of epic hero Manas, representing unyielding sovereignty and mountain fortitude.",
        icon: Compass,
        color: "text-teal-400",
        border: "hover:border-teal-500/30",
    },
];

export function CulturalSignificance() {
    const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

    const toggleRegion = (regionName: string) => {
        if (expandedRegion === regionName) {
            setExpandedRegion(null);
        } else {
            setExpandedRegion(regionName);
            trackCultureRegionExpand(regionName);
        }
    };

    return (
        <section
            id="cultural-significance"
            data-section-name="cultural_significance"
            className="py-24 px-6 bg-gradient-to-b from-[#0e1116] via-[#11161d] to-[#0e1116] overflow-hidden relative"
        >
            {/* Backward-compatibility anchor for #culture */}
            <span id="culture" className="absolute -top-24 left-0 pointer-events-none" />

            <div className="max-w-[1100px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Cultural Context</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-foreground tracking-tight">
                        Guardian of the High Peaks
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-lg text-muted-foreground">
                        Across the mountain communities of Central Asia, the snow leopard is not merely a biological species, but a sacred entity woven into folklore, religion, and ecology.
                    </p>
                </div>

                {/* Regions Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">
                    {culturalRegions.map((item, index) => {
                        const isExpanded = expandedRegion === item.region;

                        return (
                            <motion.div
                                key={item.region}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={`group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 ${item.border} ${
                                    isExpanded ? "border-primary/40 bg-white/[0.08] shadow-2xl" : ""
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl bg-white/5 w-fit ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                {item.tradition}
                                            </span>
                                            <button
                                                onClick={() => toggleRegion(item.region)}
                                                className="text-stone-400 hover:text-white p-1 rounded transition-colors focus:outline-none"
                                                aria-label={isExpanded ? `Collapse ${item.region}` : `Expand ${item.region} cultural lore`}
                                            >
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-300 ${
                                                        isExpanded ? "rotate-180 text-primary" : ""
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
                                            {item.region}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Expandable Cultural Lore / Conservation Nuance */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="pt-4 border-t border-white/10 mt-3"
                                                >
                                                    <p className="text-xs text-stone-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                                                        <strong className="text-primary block mb-1">Tradition & Conservation Impact:</strong>
                                                        {item.extendedDetails}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button
                                            onClick={() => toggleRegion(item.region)}
                                            className="pt-2 text-xs font-semibold text-primary hover:text-white transition-colors inline-flex items-center gap-1"
                                        >
                                            <span>{isExpanded ? "Show Less" : "Explore Traditions & Lore"}</span>
                                            <ChevronDown
                                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                    isExpanded ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Nepal Herder Story Highlight Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-primary/5 border border-primary/20 space-y-4 relative overflow-hidden max-w-4xl mx-auto shadow-xl"
                >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                    
                    <div className="flex items-center gap-3 text-primary text-sm font-bold tracking-wider uppercase">
                        <Quote className="w-5 h-5 shrink-0" />
                        <span>Culture → Real Conservation Outcomes</span>
                    </div>

                    <div className="space-y-4 text-stone-300 leading-relaxed text-sm md:text-base">
                        <p className="italic font-medium text-white/95">
                            "This isn't just folklore trivia. Local cultural reverence has directly shaped real conservation outcomes."
                        </p>
                        <p>
                            In November 2023, a herder in Nepal's Mustang district lost dozens of goats to a group of snow leopards in a single incident. Instead of retaliating, the herder chose not to harm the predators, citing Buddhist teachings on compassion for all living beings.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Today, community-based conservation programs build upon these cultural values. By formalizing livestock compensation and insurance programs, conservationists align economic incentives with pre-existing local traditions, turning age-old reverence into a practical shield for the snow leopard.
                        </p>
                    </div>

                    <span className="text-[9px] text-stone-500 block font-mono select-none pt-2 border-t border-white/5">
                        Source: Snow Leopard Conservancy / Nepal Conservation Case Studies
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
