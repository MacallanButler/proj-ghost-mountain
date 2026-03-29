import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ghost of the Mountains",
    description: "Ghost of the Mountains — an interactive conservation experience dedicated to protecting the snow leopard across 12 countries.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ScrollProgress />
                <div className="min-h-screen bg-background text-foreground font-sans">
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
