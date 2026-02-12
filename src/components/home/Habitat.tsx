"use client";

// ... types and HabitatItem ...
import Image from "next/image";
import habitatImg from "@/assets/habitat2.jpg";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HabitatItemProps = {
    title: string;
    description: string;
};

function HabitatItem({ title, description }: HabitatItemProps) {
    return (
        <article className="bg-secondary/50 border border-white/5 rounded-md p-6 transition-colors hover:bg-secondary/70 hover:border-white/10">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </article>
    );
}


export function Habitat() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section id="habitat" ref={containerRef} className="py-24 px-6 bg-gradient-to-b from-white/5 to-transparent">
            {/* ... existing header code ... */}
            <div className="max-w-[1100px] mx-auto">
                {/* ... header div ... */}
                <div className="mb-16">
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-6 text-foreground">
                        Habitat & Range
                    </h2>
                    <p className="max-w-[70ch] text-lg text-muted-foreground leading-relaxed">
                        Snow leopards live in some of the most extreme environments on Earth,
                        thriving at high altitudes across Central and South Asia.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <button className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 group">
                        <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                            <Image
                                src={habitatImg}
                                alt="Snowy mountain peaks, the natural habitat of the snow leopard"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 60vw"
                                quality={100}
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </button>
                    {/* ... grid of items ... */}

                    <div className="grid gap-6 sm:grid-cols-2">
                        <HabitatItem
                            title="Altitude"
                            description="Typically found between 9,800 and 17,000 feet above sea level."
                        />
                        <HabitatItem
                            title="Terrain"
                            description="Rocky mountains, cliffs, and steep slopes ideal for ambush hunting."
                        />
                        <HabitatItem
                            title="Climate"
                            description="Cold, dry regions with long winters and minimal vegetation."
                        />
                        <HabitatItem
                            title="Geographic Range"
                            description="Spans 12 countries including Nepal, China, Mongolia, and India."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
