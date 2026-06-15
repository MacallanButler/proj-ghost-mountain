import Image from "next/image";
import aboutImg from "@/assets/swapnil-vithaldas-ZJHfSQeJnRE-unsplash.jpg";
import { Eye, ShieldAlert, ThermometerSnowflake } from "lucide-react";

export function About() {
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
                        <div className="border-t border-white/10 pt-8 flex gap-8">
                            <div>
                                <div className="text-3xl font-bold text-primary">3,000m+</div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Habitat Elevation</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">-40°C</div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Cold Tolerance</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">&lt; 4,000</div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Left in the Wild</p>
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
