type HabitatItemProps = {
    title: string;
    description: string;
};

function HabitatItem({ title, description }: HabitatItemProps) {
    return (
        <article className="bg-secondary/50 border border-white/5 rounded-md p-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </article>
    );
}

export function Habitat() {
    return (
        <section id="habitat" className="py-16 px-6 bg-gradient-to-b from-white/5 to-transparent">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold mb-4 text-foreground">
                    Habitat & Range
                </h2>
                <p className="max-w-[70ch] text-muted-foreground mb-10">
                    Snow leopards live in some of the most extreme environments on Earth,
                    thriving at high altitudes across Central and South Asia.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
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
        </section>
    );
}
