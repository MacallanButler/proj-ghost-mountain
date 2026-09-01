"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackSectionView } from "@/lib/analytics";

export function SectionViewTracker() {
    const pathname = usePathname();
    const viewedSections = useRef<Set<string>>(new Set());

    useEffect(() => {
        // Reset viewed sections on path change
        viewedSections.current = new Set();

        if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        const sectionName =
                            target.getAttribute("data-section-name") ||
                            target.id.replace(/-/g, "_");

                        if (sectionName && !viewedSections.current.has(sectionName)) {
                            viewedSections.current.add(sectionName);
                            trackSectionView(sectionName);
                            observer.unobserve(target);
                        }
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        // Find elements with data-section-name or major sections
        const elementsToObserve = document.querySelectorAll(
            "[data-section-name], section[id]"
        );

        elementsToObserve.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [pathname]);

    return null;
}
