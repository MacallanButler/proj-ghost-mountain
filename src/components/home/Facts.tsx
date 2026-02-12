export function Facts() {
    return (
        <section id="interactive" className="py-16 px-6">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold mb-8 text-foreground">
                    Did You Know?
                </h2>

                <div className="grid gap-4 mt-8">
                    <div className="bg-secondary border border-white/10 hover:border-primary p-6 rounded-md text-left text-muted-foreground cursor-pointer transition-all hover:-translate-y-0.5 hover:text-foreground">
                        <p>Snow leopards can leap over 50 feet in a single jump.</p>
                    </div>
                    <div className="bg-secondary border border-white/10 hover:border-primary p-6 rounded-md text-left text-muted-foreground cursor-pointer transition-all hover:-translate-y-0.5 hover:text-foreground">
                        <p>Their long tails help them balance and stay warm.</p>
                    </div>
                    <div className="bg-secondary border border-white/10 hover:border-primary p-6 rounded-md text-left text-muted-foreground cursor-pointer transition-all hover:-translate-y-0.5 hover:text-foreground">
                        <p>Fewer than 7,000 are estimated to remain in the wild.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
