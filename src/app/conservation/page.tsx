import type { Metadata } from "next";
import ConservationClient from "./ConservationClient";

export const metadata: Metadata = {
    title: "Snow Leopard Conservation Programs & Global Impact — Ghost of the Mountains",
    description: "Discover verified snow leopard conservation initiatives: anti-poaching patrols, camera trap monitoring networks, GPS collaring, and community livestock insurance programs.",
    alternates: {
        canonical: "/conservation",
    },
    openGraph: {
        title: "Snow Leopard Conservation Programs & Global Impact",
        description: "Explore verified snow leopard conservation programs, camera trap networks, and community livestock insurance across Central Asia.",
        url: "https://ghostofthemountains.org/conservation",
        siteName: "Ghost of the Mountains",
        images: [
            {
                url: "/snow-leopard-portrait.png",
                width: 1200,
                height: 630,
                alt: "Ghost of the Mountains Conservation",
            },
        ],
        locale: "en_US",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Snow Leopard Conservation Programs & Global Impact",
        description: "Explore verified snow leopard conservation programs, camera trap networks, and community livestock insurance.",
        images: ["/snow-leopard-portrait.png"],
    },
};

export default function ConservationPage() {
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ghostofthemountains.org"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Conservation Programs",
                "item": "https://ghostofthemountains.org/conservation"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ConservationClient />
        </>
    );
}
