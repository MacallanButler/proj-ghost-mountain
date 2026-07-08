"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import img1 from "@/assets/giuseppe-mondi-xyE1p1rG04U-unsplash.jpg";
import img2 from "@/assets/peter-robbins-SzCNRFtF6ZQ-unsplash.jpg";
import img3 from "@/assets/robert-sachowski-HFIvhaOcHVA-unsplash.jpg";
import img4 from "@/assets/frida-lannerstrom-6DKkWieum6E-unsplash.jpg";
import img5 from "@/assets/sukant-sharma-b6rs6V_9lH4-unsplash.jpg";
import img6 from "@/assets/anuj-yadav-vPP2JEUcATs-unsplash.jpg";

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
                </div>

            </div>
        </section>
    );
}
