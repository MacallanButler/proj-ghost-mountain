"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import img1 from "@/assets/giuseppe-mondi-xyE1p1rG04U-unsplash.jpg";
import img2 from "@/assets/peter-robbins-SzCNRFtF6ZQ-unsplash.jpg";
import img3 from "@/assets/robert-sachowski-HFIvhaOcHVA-unsplash.jpg";
import img4 from "@/assets/frida-lannerstrom-6DKkWieum6E-unsplash.jpg";
import img5 from "@/assets/sukant-sharma-b6rs6V_9lH4-unsplash.jpg";
import img6 from "@/assets/anuj-yadav-vPP2JEUcATs-unsplash.jpg";
import cameraTrapImg from "@/assets/peter-robbins-NRXqgJKn3UI-unsplash.jpg";

const galleryImages = [
    {
        src: img1,
        alt: "Snow leopard perched on a rocky cliffside",
        caption: "High Altitude Vigilance",
        location: "Himalayas, Nepal",
    },
    {
        src: img2,
        alt: "Close-up profile of a snow leopard's face and eyes",
        caption: "Panthera uncia Profile",
        location: "Altai Mountains, Mongolia",
    },
    {
        src: img3,
        alt: "Snow leopard walking through snow-capped cliffs",
        caption: "Winter Majesty",
        location: "Ladakh, India",
    },
    {
        src: img4,
        alt: "Snow leopard curled up resting in rocks",
        caption: "Solitary Repose",
        location: "Tian Shan, Kyrgyzstan",
    },
    {
        src: img5,
        alt: "Snow leopard descending a steep mountain rock face",
        caption: "Climbing Adaptability",
        location: "Pamir Mountains, Tajikistan",
    },
    {
        src: img6,
        alt: "Snow leopard looking back over its shoulder in the cold",
        caption: "The Elusive Guardian",
        location: "Spiti Valley, India",
    },
];

export function Gallery() {
    return (
        <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-[#0e1116] via-[#11161d] to-[#0e1116] overflow-hidden">
            <div className="max-w-[1100px] mx-auto">
                
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Visual Chronicle</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-foreground tracking-tight">
                        The Ghosts in Focus
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-lg text-muted-foreground">
                        Documenting the elusive presence of snow leopards in their native high-alpine territories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.caption}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#151a21] shadow-xl hover:border-primary/50 transition-all duration-300"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                            
                            {/* Standard Overlay for mobile / default view */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e1116] via-[#0e1116]/60 to-transparent p-5 pt-12 flex flex-col justify-end pointer-events-none">
                                <h3 className="text-white font-bold text-lg drop-shadow-md group-hover:text-primary transition-colors duration-300">
                                    {image.caption}
                                </h3>
                                <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                                    📍 {image.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Camera Trap night vision reveal card (7th card) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 6 * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl hover:border-emerald-500/50 transition-all duration-300 cursor-crosshair"
                    >
                        {/* Night vision image filters */}
                        <div className="relative w-full h-full">
                            <Image
                                src={cameraTrapImg}
                                alt="Camera trap photo of a snow leopard"
                                fill
                                className="object-cover transition-all duration-700 pointer-events-none filter grayscale brightness-[0.7] contrast-[1.4] sepia hue-rotate-60 group-hover:filter-none group-hover:scale-105"
                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                            />
                            {/* Night vision green tint layer */}
                            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
                        </div>

                        {/* Atmospheric scanlines overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.05)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500" />

                        {/* Viewfinder crosshairs */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-all duration-500">
                            <div className="w-12 h-12 border border-emerald-500/30 rounded-sm relative">
                                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-500" />
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-500" />
                                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-500" />
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-500" />
                            </div>
                        </div>

                        {/* Top-left blinking REC */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/50 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-red-500 font-bold select-none uppercase tracking-widest group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse group-hover:bg-emerald-400" />
                            <span>REC</span>
                        </div>

                        {/* Top-right telemetry */}
                        <div className="absolute top-4 right-4 z-20 text-[8px] font-mono text-emerald-400/80 bg-black/50 border border-white/10 px-2 py-0.5 rounded text-right pointer-events-none group-hover:text-white transition-colors">
                            <div>IR CAM 07</div>
                            <div>TEMP: -18°C</div>
                        </div>

                        {/* Bottom Metadata Text Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-12 flex flex-col justify-end pointer-events-none">
                            <h3 className="text-emerald-400 font-bold text-lg font-mono tracking-wide group-hover:text-white transition-colors duration-300">
                                Camera Trap #07
                            </h3>
                            <p className="text-stone-300 text-xs mt-1 font-mono flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block group-hover:bg-primary" />
                                <span className="group-hover:hidden">SCANNING: Motion Detected...</span>
                                <span className="hidden group-hover:inline text-emerald-400">Panthera uncia DETECTED</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
