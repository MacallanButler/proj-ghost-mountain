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
    title: "Ghost of the Mountains — Interactive Snow Leopard Conservation Experience",
    description: "Explore facts, physical stats, taxonomy, and an interactive choose-your-own-path story dedicated to snow leopard conservation across Central Asia.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ghost of the Mountains",
        "url": "https://ghostofthemountains.org"
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
