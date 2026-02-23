import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Habitat } from "@/components/home/Habitat";
import { ThreatTimeline } from "@/components/home/ThreatTimeline";
import { Solutions } from "@/components/home/Solutions";
import { Facts } from "@/components/home/Facts";
import { CTA } from "@/components/home/CTA";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <About />
            <Habitat />
            <ThreatTimeline />
            <Solutions />
            <Facts />
            <CTA />
        </div>
    );
}
