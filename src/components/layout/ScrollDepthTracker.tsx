"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
    const pathname = usePathname();
    const firedThresholds = useRef<Set<number>>(new Set());

    useEffect(() => {
        // Reset fired thresholds on route transition
        firedThresholds.current = new Set();

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            for (const threshold of THRESHOLDS) {
                if (scrollPercent >= threshold && !firedThresholds.current.has(threshold)) {
                    firedThresholds.current.add(threshold);
                    trackScrollDepth(threshold);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial check in case page loads partway down
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    return null;
}
