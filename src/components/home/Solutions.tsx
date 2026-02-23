"use client";

import { Shield, Sprout, Microscope } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
    {
        title: "Community Insurance",
        description: "We work with local herders to insure their livestock, reducing retaliatory killings when snow leopards attack.",
        icon: Shield,
        color: "text-green-400",
        border: "group-hover:border-green-500/50",
        glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)]",
    },
    {
        title: "Ranger Training",
        description: "Equipping anti-poaching patrols with GPS tech and winter gear to protect the high-altitude range.",
        icon: Sprout, // Using sprout as a metaphor for growth/protection or maybe 'Mountain' if available? strict lucide set.
        color: "text-emerald-400",
        border: "group-hover:border-emerald-500/50",
        glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]",
    },
    {
        title: "Scientific Research",
        description: " GPS collaring and camera traps help us understand migration patterns and health of the population.",
        icon: Microscope,
        color: "text-teal-400",
        border: "group-hover:border-teal-500/50",
        glow: "group-hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]",
    },
];

export function Solutions() {
    return (
        <section className="py-24 px-6 bg-black/10">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-6 text-foreground">
                        Conservation Solutions
                    </h2>
                    <p className="max-w-[70ch] mx-auto text-lg text-muted-foreground">
                        Hope exists. Here is how we are turning the tide for the ghost of the mountains.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${item.border} ${item.glow}`}
                        >
                            <div className={`mb-6 p-4 rounded-full bg-white/5 w-fit ${item.color}`}>
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-white transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
