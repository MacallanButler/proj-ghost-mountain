// ... imports
import Image from "next/image";
import ctaImg from "@/assets/frida-lannerstrom-6DKkWieum6E-unsplash.jpg";

export function CTA() {
    return (
        <section id="cta" className="py-24 px-6 md:px-12 bg-secondary/20 relative overflow-hidden">

            <div className="max-w-[1100px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left order-2 lg:order-1">
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-6 text-foreground">
                        Want to Help?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                        The "Ghost of the Mountains" needs our protection. Learn more about conservation efforts
                        and how you can support organizations working tirelessly to save snow leopards in the wild.
                    </p>

                    <a
                        href="https://www.snowleopard.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        Visit Snow Leopard Trust
                    </a>
                </div>

                <div className="order-1 lg:order-2 relative aspect-[4/5] md:aspect-[3/2] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <Image
                        src={ctaImg}
                        alt="Close up of a snow leopard's face"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
