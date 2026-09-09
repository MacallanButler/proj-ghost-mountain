import type { Metadata } from "next";
import StoryClient from "./StoryClient";

export const metadata: Metadata = {
    title: "Survive as a Snow Leopard — Interactive Choose-Your-Path Story",
    description: "Step into the paws of a snow leopard. Navigate the peaks, hunt for prey, and survive the threats in this interactive educational simulation.",
    alternates: {
        canonical: "/story",
    },
};

export default function StoryPage() {
    const creativeWorkJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Survive as a Snow Leopard",
        "description": "An interactive choose-your-path educational narrative where you experience the challenges of survival as a snow leopard in the high Himalayas.",
        "genre": "Interactive Fiction / Educational Game",
        "author": {
            "@type": "Organization",
            "name": "Ghost of the Mountains Project"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ghost of the Mountains Project"
        },
        "url": "https://ghostofthemountains.org/story"
    };

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
                "name": "Survive as a Snow Leopard",
                "item": "https://ghostofthemountains.org/story"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <StoryClient />
        </>
    );
}
