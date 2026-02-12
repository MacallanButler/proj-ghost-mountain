export function CTA() {
    return (
        <section id="cta" className="py-20 px-6 text-center bg-gradient-to-b from-transparent to-primary/10">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold mb-4 text-foreground">
                    Want to Help?
                </h2>
                <p className="max-w-lg mx-auto text-lg text-muted-foreground mb-8">
                    Learn more about conservation efforts and how you can support
                    organizations protecting snow leopards.
                </p>

                <a
                    href="https://www.snowleopard.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-md border border-primary text-primary font-medium transition hover:bg-primary/10 hover:-translate-y-0.5"
                >
                    Visit Snow Leopard Trust
                </a>
            </div>
        </section>
    );
}
