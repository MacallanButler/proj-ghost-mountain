"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Globe, Mail } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-20" />

            <div className="max-w-[1100px] mx-auto text-center mb-16">
                <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold mb-6 text-foreground tracking-tight">
                    Join the Pride
                </h2>
                <p className="text-xl text-muted-foreground max-w-[60ch] mx-auto">
                    Your action today secures a future for the snow leopard tomorrow.
                </p>
            </div>

            <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
                {/* Card 1: Adopt */}
                <motion.a
                    href="#"
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-red-500/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Heart className="w-10 h-10 text-red-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Symbolic Adoption</h3>
                    <p className="text-muted-foreground mb-6">
                        Receive a plushie and certificate. Directly funds localized conservation.
                    </p>
                    <span className="flex items-center text-red-400 font-semibold group-hover:gap-2 transition-all">
                        Adopt Now <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </motion.a>

                {/* Card 2: Donate */}
                <motion.a
                    href="#"
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Globe className="w-10 h-10 text-blue-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Donate Monthly</h3>
                    <p className="text-muted-foreground mb-6">
                        Fuel ensuring research, camera traps, and ranger equipment year-round.
                    </p>
                    <span className="flex items-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                        Give Today <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </motion.a>

                {/* Card 3: Newsletter */}
                <motion.a
                    href="#"
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-green-500/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Mail className="w-10 h-10 text-green-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Stay Updated</h3>
                    <p className="text-muted-foreground mb-6">
                        Get field reports and sighting news directly from the Himalayas.
                    </p>
                    <span className="flex items-center text-green-400 font-semibold group-hover:gap-2 transition-all">
                        Subscribe <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </motion.a>
            </div>
        </section>
    );
}
