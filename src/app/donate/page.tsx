import type { Metadata } from "next";
import { DonationForm } from "@/components/home/DonationForm";

export const metadata: Metadata = {
    title: "Support Snow Leopard Conservation — Ghost of the Mountains",
    description: "Support snow leopard conservation efforts. Note: This is a demonstration page and no payments are processed.",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "/donate",
    },
};

export default function DonatePage() {
    return (
        <main className="pt-24 min-h-screen bg-stone-900">
            <DonationForm />
        </main>
    );
}
