import React from "react";

export interface McbAttributionProps {
  /** Visual variant matching the site's footer palette */
  theme?: "dark" | "light" | "gold" | "minimal" | "accent";
  /** Site identifier for referral analytics (e.g., 'dr-whitted', 'cafe-du-monde', 'cdot416') */
  clientSlug?: string;
  /** Custom wrapper styling */
  className?: string;
  /** Text prefix displayed before the link badge */
  prefix?: string;
  /** Brand anchor name */
  anchorText?: string;
  /** Target agency URL */
  href?: string;
  /** Whether to show the glowing green status indicator beacon */
  showBeacon?: boolean;
}

/**
 * Standardized MCB Systems Footer Attribution Badge
 * 
 * Server-rendered Next.js component engineered for:
 * 1. SEO backlink equity pass-through directly in initial static HTML
 * 2. WCAG-compliant color contrast across light, dark, and custom themes
 * 3. Structured UTM referral attribution analytics
 */
export function McbAttribution({
  theme = "dark",
  clientSlug = "client",
  className = "",
  prefix = "Engineered by",
  anchorText = "MCB Systems",
  href = "https://macallanbutler.com",
  showBeacon = true,
}: McbAttributionProps) {
  const themeClasses: Record<string, string> = {
    dark: "text-slate-400 hover:text-white border-slate-800 hover:border-slate-600 bg-slate-900/60 shadow-sm",
    light: "text-stone-600 hover:text-stone-900 border-stone-200 hover:border-stone-400 bg-white/90 shadow-sm",
    gold: "text-amber-200/80 hover:text-amber-100 border-amber-500/20 hover:border-amber-400/50 bg-stone-900/50 shadow-sm",
    accent: "text-indigo-200/90 hover:text-white border-indigo-500/30 hover:border-indigo-400/60 bg-indigo-950/40 shadow-sm",
    minimal: "text-inherit opacity-75 hover:opacity-100 border-transparent hover:border-current bg-transparent",
  };

  const badgeClass = themeClasses[theme] || themeClasses.dark;

  // Build clean UTM tracking URL
  const destinationUrl = new URL(href);
  destinationUrl.searchParams.set("utm_source", clientSlug);
  destinationUrl.searchParams.set("utm_medium", "footer_colophon");
  destinationUrl.searchParams.set("utm_campaign", "client_attribution");

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-wide ${className}`}>
      {prefix && <span className="opacity-75">{prefix}</span>}
      <a
        href={destinationUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${prefix} ${anchorText} LLC - Modern Web Applications & Software Engineering Studio`}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 group ${badgeClass}`}
      >
        {showBeacon && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-emerald-400 transition-colors"
            aria-hidden="true"
          />
        )}
        <span className="font-semibold tracking-wider uppercase text-[11px]">{anchorText}</span>
      </a>
    </div>
  );
}

export default McbAttribution;
