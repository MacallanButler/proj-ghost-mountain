"use client";

import { useEffect } from "react";
import { trackExternalLinkClick } from "@/lib/analytics";

export function ExternalLinkTracker() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest("a");
            if (!target) return;

            // If the element is marked as specifically tracked elsewhere, ignore
            if (target.getAttribute("data-analytics-custom") === "true") {
                return;
            }

            const href = target.getAttribute("href");
            if (!href) return;

            // Check if it's an external link
            if (href.startsWith("http://") || href.startsWith("https://")) {
                try {
                    const url = new URL(href, window.location.href);
                    if (
                        url.hostname !== window.location.hostname &&
                        url.hostname !== "ghostofthemountains.org"
                    ) {
                        trackExternalLinkClick(href);
                    }
                } catch {
                    // Invalid URL, ignore
                }
            }
        };

        document.addEventListener("click", handleClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
        };
    }, []);

    return null;
}
