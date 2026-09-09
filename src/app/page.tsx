import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { VitalsAndSize } from "@/components/home/VitalsAndSize";
import { Habitat } from "@/components/home/Habitat";
import { ThreatTimeline } from "@/components/home/ThreatTimeline";
import { Solutions } from "@/components/home/Solutions";
import { Facts } from "@/components/home/Facts";
import { CTA } from "@/components/home/CTA";
import { SnowLeopardRangeMap } from "@/components/home/RangeMap";
import { ConservationCharts } from "@/components/home/ConservationCharts";
import { KnowledgeQuiz } from "@/components/home/KnowledgeQuiz";
import { Gallery } from "@/components/home/Gallery";

// Feature Expansion Components
import { CulturalSignificance } from "@/components/home/CulturalSignificance";
import { TimelineScrubber } from "@/components/home/TimelineScrubber";
import { SpotTheSnowLeopard } from "@/components/home/SpotTheSnowLeopard";
import { HowToHelp } from "@/components/home/HowToHelp";

export const metadata: Metadata = {
    title: "Ghost of the Mountains — Snow Leopard Facts, Range Map & Conservation Guide",
    description: "Interactive snow leopard conservation guide. Explore population data across 12 range countries, high-altitude camouflage challenges, physical adaptations, and actionable conservation solutions.",
    keywords: [
        "snow leopard",
        "snow leopard facts",
        "snow leopard range map",
        "Panthera uncia",
        "snow leopard conservation",
        "ghost of the mountains",
        "central asia wildlife",
        "spot the snow leopard game",
        "snow leopard factsheet"
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Ghost of the Mountains — Snow Leopard Facts, Range Map & Conservation Guide",
        description: "Interactive snow leopard conservation guide. Explore population data across 12 range countries, high-altitude camouflage challenges, physical adaptations, and conservation solutions.",
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
        title: "Ghost of the Mountains — Snow Leopard Facts, Range Map & Conservation",
        description: "Interactive snow leopard conservation guide. Explore population data across 12 range countries, high-altitude camouflage challenges, and conservation solutions.",
        images: ["/snow-leopard-portrait.png"],
    },
};

export default function Home() {
    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ghost of the Mountains",
        "url": "https://ghostofthemountains.org"
    };

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ghost of the Mountains Project",
        "url": "https://ghostofthemountains.org",
        "logo": "https://ghostofthemountains.org/icon.svg",
        "description": "Educational conservation platform dedicated to protecting Panthera uncia and raising global awareness for high-altitude mountain ecosystems across Central and South Asia.",
        "sameAs": [
            "https://globalsnowleopard.org",
            "https://www.snowleopard.org"
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <Hero />
            <About />
            <VitalsAndSize />
            <SnowLeopardRangeMap />
            <Habitat />
            <CulturalSignificance />
            <Gallery />
            <ConservationCharts />
            <TimelineScrubber />
            <ThreatTimeline />
            <Facts />
            <SpotTheSnowLeopard />
            <KnowledgeQuiz />
            <Solutions />
            <HowToHelp />
            <CTA />
        </div>
    );
}
