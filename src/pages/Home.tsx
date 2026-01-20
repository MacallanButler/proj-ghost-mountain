import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black opacity-80" />
                {/* Placeholder for Particle Effect */}
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-lg">
                    Ghost of the Mountains
                </h1>
                <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Walk the path of Khangri. Survive the Himalayan winter. Understand the price of existence.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/story">
                        <Button size="lg" className="text-lg px-8 py-6 h-auto bg-white text-slate-900 hover:bg-slate-200">
                            Begin Journey
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-white/20 text-white hover:bg-white/10 hover:text-white">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>
    );
}
