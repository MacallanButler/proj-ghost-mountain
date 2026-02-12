import Link from "next/link";

export function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full p-6 z-50">
            <Link href="/" className="text-base font-semibold tracking-widest uppercase text-foreground hover:opacity-80 transition-opacity">
                Snow Leopard
            </Link>
        </nav>
    );
}
