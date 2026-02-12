type ThreatItemProps = {
    title: string;
    description: string;
};

function ThreatItem({ title, description }: ThreatItemProps) {
    return (
        <li className="relative flex gap-6 pb-10 last:pb-0">
            <span className="absolute left-[-21px] top-[0.3rem] w-3.5 h-3.5 bg-background border-2 border-primary rounded-full z-10" />
            <div className="flex-1 bg-secondary border border-white/5 rounded-md p-5">
                <h3 className="text-lg font-semibold mb-1 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </li>
    );
}

export function ThreatTimeline() {
    return (
        <section id="threats" className="py-16 px-6">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold mb-12 text-foreground">
                    Why Snow Leopards Are Endangered
                </h2>

                <ul className="relative ml-8 border-l-2 border-white/10">
                    <ThreatItem
                        title="Poaching"
                        description="Illegal hunting for fur and body parts."
                    />
                    <ThreatItem
                        title="Climate Change"
                        description="Melting glaciers and shrinking habitat."
                    />
                    <ThreatItem
                        title="Human Conflict"
                        description="Retaliation due to livestock loss."
                    />
                </ul>
            </div>
        </section>
    );
}
