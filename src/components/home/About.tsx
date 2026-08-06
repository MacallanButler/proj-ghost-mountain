"use client";

import { useState } from "react";
import Image from "next/image";
import aboutImg from "@/assets/snow-leopard-about.png";
import { Eye, ShieldAlert, ThermometerSnowflake, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function About() {
    const [showPopExplanation, setShowPopExplanation] = useState(false);

    return (
        <section id="about" className="py-24 px-6 bg-gradient-to-b from-background via-[#11161d] to-[#0e1116] overflow-hidden">
            <div className="max-w-[1100px] mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left: Text Content & Stats */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Meet the Panthera uncia</span>
                            <h2 className="text-[clamp(2.25rem,5vw,3rem)] font-bold text-foreground leading-tight tracking-tight">
                                What Is a Snow Leopard?
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Snow leopards are solitary big cats native to the rugged, high-altitude mountain ranges of Central and South Asia. Known as the "ghosts of the mountains," they are perfectly adapted to survive in some of the harshest environments on Earth.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-foreground">Elusive Camouflage</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Their thick, grey-and-white coats patterned with dark rosettes blend seamlessly into rocky slopes.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary">
                                    <ThermometerSnowflake className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-foreground">Extreme Adaptability</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Large nasal cavities warm freezing air, and wide paws act as natural snowshoes.
                                </p>
                            </div>
                        </div>

                        {/* Key Stats */}
                        <div className="border-t border-white/10 pt-8">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-primary">3,000m+</div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Habitat Elevation</p>
                                    <span className="text-[9px] text-stone-500 block mt-1 font-mono">Source: GSLEP</span>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">-40°C</div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Cold Tolerance</p>
                                    <span className="text-[9px] text-stone-500 block mt-1 font-mono">Source: Snow Leopard Trust</span>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary flex items-center gap-1.5">
                                        <span>~2,700–3,400</span>
                                        <button 
                                            onClick={() => setShowPopExplanation(!showPopExplanation)}
                                            className="text-stone-500 hover:text-primary transition-colors cursor-pointer p-0.5 rounded hover:bg-white/5"
                                            title="Click to see why this population estimate is used"
                                            aria-label="Population estimate details"
                                        >
                                            <Info className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Mature Population</p>
                                    <span className="text-[9px] text-stone-500 block mt-1 font-mono">Source: IUCN Red List</span>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">Vulnerable</div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">IUCN Status</p>
                                    <span className="text-[9px] text-stone-500 block mt-1 font-mono">Source: IUCN Red List</span>
                                </div>
                            </div>

                            {/* Population Explanation Panel */}
                            <AnimatePresence>
                                {showPopExplanation && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-stone-300 space-y-2 mt-6">
                                            <p className="text-sm font-semibold text-white">Why this number?</p>
                                            <p>
                                                <strong>Total population estimate:</strong> 7,446–7,996 individuals (most recent IUCN assessment).
                                            </p>
                                            <p>
                                                <strong>Mature/breeding individuals:</strong> 2,710–3,386. This is the figure that matters most for extinction-risk assessment, since it excludes juveniles and non-breeding adults.
                                            </p>
                                            <p className="text-stone-400">
                                                Earlier widely-cited estimates (~4,000, still commonly seen on other sites) predate more recent survey methodology. The current IUCN figure is higher in raw total, but the <em>mature breeding</em> count is the more conservation-relevant metric, and it is lower than the old headline figure suggested.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Downlisting Controversy Callout */}
                            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 relative overflow-hidden mt-6">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                                    <ShieldAlert className="w-4 h-4" />
                                    <span>2017 IUCN Downlisting Controversy</span>
                                </div>
                                <p className="text-xs text-stone-300 leading-relaxed">
                                    In 2017, the IUCN downlisted the snow leopard from Endangered to Vulnerable. This decision was contested by major conservation organizations, including the **Snow Leopard Trust** and **Panthera**, who argued the science did not support removing Endangered status. They cautioned that a public perception of improvement could undercut critical conservation funding and political urgency, emphasizing that "Vulnerable" status still signifies a high risk of extinction in the wild.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Beautiful Image */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-500 opacity-30" />
                        <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={aboutImg}
                                alt="Snow leopard in high alpine terrain looking out"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                                sizes="(max-w-768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-medium text-lg drop-shadow-md">Panthera uncia</p>
                                <p className="text-white/70 text-sm">Perfected by evolution for life on the vertical cliffs.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
