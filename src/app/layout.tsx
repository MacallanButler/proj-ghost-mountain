import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://ghostofthemountains.org"),
    title: "Ghost of the Mountains",
    description: "Ghost of the Mountains — an interactive conservation experience dedicated to protecting the snow leopard across 12 countries.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Ghost of the Mountains",
        description: "Ghost of the Mountains — an interactive conservation experience dedicated to protecting the snow leopard across 12 countries.",
        url: "https://ghostofthemountains.org",
        siteName: "Ghost of the Mountains",
        images: [
            {
                url: "/snow-leopard-portrait.png",
                width: 1200,
                height: 630,
                alt: "Ghost of the Mountains - Snow Leopard Portrait",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ghost of the Mountains",
        description: "Ghost of the Mountains — an interactive conservation experience dedicated to protecting the snow leopard across 12 countries.",
        images: ["/snow-leopard-portrait.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GoogleAnalytics />
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
