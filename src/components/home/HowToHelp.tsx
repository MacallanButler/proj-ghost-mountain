"use client";

import { Compass, Home, Calendar, Globe, Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const helpOptions = [
    {
        title: "Citizen Science Expeditions",
        description: "Join hands-on field research. Organizations like Biosphere Expeditions run volunteer-backed scientific expeditions in Kyrgyzstan's Tien Shan mountains, working with local universities and the Snow Leopard Trust to monitor populations.",
        linkText: "Learn about expeditions",
        linkUrl: "https://www.biosphere-expeditions.org",
        icon: Compass,
        color: "text-blue-400",
        border: "hover:border-blue-500/45",
        glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
    {
        title: "Wildlife-Friendly Tourism",
        description: "Directly support communities sharing habitat with predators. The Snow Leopard Conservancy India Trust's Himalayan Homestay Program invites travelers to stay with local families, turning tourism income into conservation incentives.",
        linkText: "Explore Himalayan Homestays",
        linkUrl: "https://snowleopardindia.org",
        icon: Home,
        color: "text-emerald-400",
        border: "hover:border-emerald-500/45",
        glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    },
    {
        title: "International Day Awareness",
        description: "Participate in or spread awareness of October 23, officially proclaimed by the UN General Assembly in 2024 as the International Day of the Snow Leopard. Celebrate conservation efforts and educate others annually.",
        linkText: "Read the UN Proclamation",
        linkUrl: "https://globalsnowleopard.org",
        icon: Calendar,
        color: "text-amber-400",
        border: "hover:border-amber-500/45",
        glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    },
    {
        title: "Support Partner Organizations",
        description: "Support established groups directly. Organizations like the Snow Leopard Trust (boasting a 4-star Charity Navigator rating), Snow Leopard Conservancy, Panthera, and GSLEP lead scientific research and policy on the ground.",
        linkText: "Visit Snow Leopard Trust",
        linkUrl: "https://www.snowleopard.org/take-action/",
        icon: Globe,
        color: "text-teal-400",
        border: "hover:border-teal-500/45",
        glow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    },
    {
        title: "Community & School Organizing",
        description: "Spread awareness locally. Use Snow Leopard Trust's free 'Take Action' resources to host presentations, start school environmental clubs, or coordinate educational events in your local community.",
        linkText: "Access action resources",
        linkUrl: "https://www.snowleopard.org",
        icon: Users,
        color: "text-cyan-400",
        border: "hover:border-cyan-500/45",
        glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    },
];

export function HowToHelp() {
    return (
        <section id="how-to-help" className="py-24 px-6 bg-[#0e1116] border-t border-stone-900/60">
            <div className="max-w-[1100px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Take Action</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white tracking-tight">
                        How to Help Beyond Donating
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-lg text-muted-foreground">
                        While direct donating is helpful, conservation is a collective effort. Here are tangible, real-world ways you can actively participate in protecting the ghosts of the mountains.
                    </p>
                </div>

                {/* 3-Column / 2-Column Responsive Card Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helpOptions.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${item.border} ${item.glow}`}
                        >
                            <div className="space-y-6">
                                <div className={`p-4 rounded-xl bg-white/5 w-fit ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href={item.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                                >
                                    <span>{item.linkText}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
