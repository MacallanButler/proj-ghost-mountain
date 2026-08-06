"use client";

import { useState } from "react";
import Image from "next/image";
import factsBg from "@/assets/peter-robbins-JT5EZgqLNIQ-unsplash.jpg";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How far can a snow leopard jump?",
        answer: "Snow leopards can leap over 50 feet (15 meters) in a single jump — that's 6 times their body length! Their powerful hind legs are built for jumping across deep chasms and steep rocky terrain. This explosive jumping ability is crucial for their ambush hunting style, allowing them to pounce on prey from high rocky ledges.",
        source: "Snow Leopard Trust"
    },
    {
        question: "Why are they called the 'ghosts of the mountains'?",
        answer: "They are known as the 'ghosts of the mountains' because they are highly solitary, extremely elusive, and their grey-and-white coats patterned with dark rosettes blend in near-perfectly with rock and snow, making them almost impossible to spot.",
        source: "Panthera"
    },
    {
        question: "Can snow leopards roar like other big cats?",
        answer: "No, snow leopards cannot roar. Unlike lions, tigers, jaguars, and leopards, their hyoid bone (a structure in the throat) is not fully ossified (rigid), which is anatomically required for roaring. Instead, they communicate through vocalizations like chuffs (or 'prusten' — a soft, non-threatening greeting sound made by blowing air through the nose), hisses, growls, and meows.",
        source: "Snow Leopard Trust / Panthera"
    },
    {
        question: "How do snow leopards survive in extreme sub-zero temperatures?",
        answer: "They have a range of specialized adaptations: large nasal cavities that warm freezing air before it reaches their lungs, wide paws that act as natural snowshoes, and long, thick tails that they wrap around their face and body like a blanket for warmth.",
        source: "Snow Leopard Trust"
    },
    {
        question: "What is their hunting style and primary prey?",
        answer: "Snow leopards are ambush predators. They stalk mountain ungulates (hoofed animals) from above, using the steep, rocky terrain for cover before pursuing them in a short, explosive chase. Their primary prey consists of blue sheep (bharal), Himalayan tahr, and ibex, supplemented by smaller mammals like marmots when larger prey is scarce.",
        source: "Panthera / GSLEP"
    }
];

const otherFacts = [
    { text: "They engage in 'crepuscular' activity, meaning they are most active during the low-light hours of dawn and dusk.", source: "Panthera" },
    { text: "Their large paws act like natural snowshoes, distributing weight to prevent sinking into deep snow.", source: "Snow Leopard Trust" }
];

export function Facts() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="interactive" className="py-24 px-6 relative overflow-hidden">
            {/* FAQPage JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={factsBg}
                    alt="High altitude snowy Himalayan mountain peaks under heavy cloud cover"
                    fill
                    className="object-cover"
                    quality={80} // Dropped quality from 100 to 80 as requested in brief
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/75" />
            </div>

            <div className="relative z-10 max-w-[1000px] mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Did You Know?</span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white drop-shadow-md">
                        Snow Leopard Facts & FAQ
                    </h2>
                    <p className="text-stone-400 max-w-xl mx-auto text-sm">
                        Discover the unique adaptations and mysteries of the ghost of the mountains.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-8 items-start">
                    {/* FAQ Accordion Column */}
                    <div className="md:col-span-3 space-y-4">
                        <h3 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h3>
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:text-primary transition-colors focus:outline-none"
                                    >
                                        <span className="font-semibold text-base pr-4">{faq.question}</span>
                                        <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-5 text-sm text-stone-300 leading-relaxed border-t border-white/5 pt-3 space-y-2">
                                                    <p>{faq.answer}</p>
                                                    {faq.source && (
                                                        <span className="text-[10px] text-stone-500 block font-mono select-none">Source: {faq.source}</span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Decorative Fact Cards Column */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold text-white mb-2">More Quick Facts</h3>
                        <div className="space-y-4">
                            {otherFacts.map((fact, idx) => (
                                <div 
                                    key={idx} 
                                    className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 shadow-lg flex flex-col justify-between"
                                >
                                    <p className="text-sm text-stone-300 leading-relaxed font-medium">
                                        💡 {fact.text}
                                    </p>
                                    <span className="text-[9px] text-stone-500 font-mono mt-3 select-none">Source: {fact.source}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
