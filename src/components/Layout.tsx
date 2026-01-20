import { Outlet, Link } from "react-router-dom";
import { Mountain, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                        <Mountain className="h-6 w-6 text-primary" />
                        <span>Ghost Mountain</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/story" className="text-sm font-medium hover:text-primary transition-colors">
                            The Journey
                        </Link>
                        <Link to="/conservation" className="text-sm font-medium hover:text-primary transition-colors">
                            Conservation
                        </Link>
                        <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                            About
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" title="Impact Tracker">
                            <PawPrint className="h-5 w-5" />
                        </Button>
                        <Button variant="default" size="sm">
                            Donate
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-16">
                <Outlet />
            </main>

            <footer className="border-t border-white/10 bg-slate-950 py-12 text-center text-sm text-slate-400">
                <div className="container mx-auto px-4">
                    <p>© 2024 Ghost Mountain Project. In partnership with Snow Leopard Trust.</p>
                </div>
            </footer>
        </div>
    );
}
