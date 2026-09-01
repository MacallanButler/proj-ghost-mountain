import type { Metadata } from "next";
import FactsheetClient from "./FactsheetClient";

export const metadata: Metadata = {
    title: "Printable Educational Fact Sheet (Panthera uncia) — Ghost of the Mountains",
    description: "Download and print the official snow leopard educational fact sheet featuring scientific classification, physical vitals, conservation downlisting status, and primary threats.",
    alternates: {
        canonical: "/factsheet",
    },
};

export default function FactsheetPage() {
    return <FactsheetClient />;
}
