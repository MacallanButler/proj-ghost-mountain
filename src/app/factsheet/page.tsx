import type { Metadata } from "next";
import FactsheetClient from "./FactsheetClient";

export const metadata: Metadata = {
    title: "Printable Educational Snow Leopard Fact Sheet (PDF) — Panthera uncia",
    description: "Download and print the official snow leopard educational fact sheet: scientific taxonomy, physical vitals, IUCN downlisting controversy, and primary alpine threats.",
    keywords: [
        "snow leopard factsheet",
        "printable snow leopard pdf",
        "Panthera uncia factsheet",
        "snow leopard education",
        "snow leopard taxonomy"
    ],
    alternates: {
        canonical: "/factsheet",
    },
    openGraph: {
        title: "Printable Educational Snow Leopard Fact Sheet (PDF)",
        description: "Official snow leopard educational fact sheet featuring scientific taxonomy, physical vitals, and IUCN conservation status.",
        url: "https://ghostofthemountains.org/factsheet",
        siteName: "Ghost of the Mountains",
        images: [
            {
                url: "/snow-leopard-portrait.png",
                width: 1200,
                height: 630,
                alt: "Snow Leopard Fact Sheet",
            },
        ],
        locale: "en_US",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Printable Educational Snow Leopard Fact Sheet (PDF)",
        description: "Official snow leopard educational fact sheet with taxonomy, vitals, and conservation data.",
        images: ["/snow-leopard-portrait.png"],
    },
};

export default function FactsheetPage() {
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
                "name": "Educational Fact Sheet",
                "item": "https://ghostofthemountains.org/factsheet"
            }
        ]
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Snow Leopard (Panthera uncia) Educational Fact Sheet",
        "description": "Scientific classification, physical vitals, population estimates, and primary conservation threats for Panthera uncia.",
        "author": {
            "@type": "Organization",
            "name": "Ghost of the Mountains Project"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ghost of the Mountains Project",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ghostofthemountains.org/icon.svg"
            }
        },
        "mainEntityOfPage": "https://ghostofthemountains.org/factsheet"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <FactsheetClient />
        </>
    );
}
