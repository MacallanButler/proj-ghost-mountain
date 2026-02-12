import Image from "next/image";
import factsBg from "@/assets/peter-robbins-JT5EZgqLNIQ-unsplash.jpg";

export function Facts() {
    return (
        <section id="interactive" className="py-24 px-6 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={factsBg}
                    alt="Mountain landscape"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 max-w-[1000px] mx-auto text-center">
                <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-12 text-white drop-shadow-md">
                    Did You Know?
                </h2>

                <div className="flex flex-col items-center gap-6">
                    {/* Tier 1 (Top) */}
                    <div className="w-full max-w-md">
                        <FactCard text="Snow leopards can leap over 50 feet in a single jump — that's 6 times their body length!" />
                    </div>

                    {/* Tier 2 (Middle) */}
                    <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                        <FactCard text="They are known as the 'ghosts of the mountains' because they are rarely seen." />
                        <FactCard text="Their long, thick tails help them balance on rocky cliffs and wrap around their bodies for warmth." />
                    </div>

                    {/* Tier 3 (Bottom) */}
                    <div className="grid md:grid-cols-3 gap-6 w-full">
                        <FactCard text="Snow leopards cannot roar like other big cats; they chuff, hiss, and meow." />
                        <FactCard text="They engage in 'crepuscular' activity, meaning they are most active at dawn and dusk." />
                        <FactCard text="Their large paws act like natural snowshoes, distributing weight to prevent sinking into snow." />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FactCard({ text }: { text: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 shadow-lg h-full flex items-center justify-center">
            <p className="text-lg text-white hover:text-white transition-colors drop-shadow-sm font-medium">
                {text}
            </p>
        </div>
    );
}
