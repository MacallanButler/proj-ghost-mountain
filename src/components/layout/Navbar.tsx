import Link from "next/link";

export function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full px-6 py-5 z-50 flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-xl md:text-2xl tracking-tight hover:opacity-80 transition-opacity">
                The Ghost of the Mountains
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
                <Link href="/#range-map" className="hover:text-white transition-colors">Range Map</Link>
                <Link href="/#data" className="hover:text-white transition-colors">Data</Link>
                <Link href="/#quiz" className="hover:text-white transition-colors">Quiz</Link>
                <Link href="/conservation" className="hover:text-white transition-colors">Conservation</Link>
                <Link href="/donate" className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 hover:bg-white/20 transition-all">
                    Donate
                </Link>
            </div>
        </nav>
    );
}
