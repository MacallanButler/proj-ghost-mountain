import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Habitat } from "@/components/home/Habitat";
import { ThreatTimeline } from "@/components/home/ThreatTimeline";
import { Solutions } from "@/components/home/Solutions";
import { Facts } from "@/components/home/Facts";
import { CTA } from "@/components/home/CTA";
import { SnowLeopardRangeMap } from "@/components/home/RangeMap";
import { ConservationCharts } from "@/components/home/ConservationCharts";
import { KnowledgeQuiz } from "@/components/home/KnowledgeQuiz";
import { DonationForm } from "@/components/home/DonationForm";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <About />
            <SnowLeopardRangeMap />
            <Habitat />
            <ConservationCharts />
            <ThreatTimeline />
            <KnowledgeQuiz />
            <Solutions />
            <DonationForm />
            <Facts />
            <CTA />
        </div>
    );
}
