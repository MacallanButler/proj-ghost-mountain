import type { Metadata } from "next";
import ConservationClient from "./ConservationClient";

export const metadata: Metadata = {
    title: "How to Help Snow Leopards — Conservation Programs & Impact",
    description: "Discover snow leopard conservation programs, anti-poaching patrols, camera trap networks, and community livestock insurance programs making an impact.",
    alternates: {
        canonical: "/conservation",
    },
};

export default function ConservationPage() {
    return <ConservationClient />;
}
