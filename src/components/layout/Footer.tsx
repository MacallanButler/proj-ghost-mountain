
import React from "react";
import Link from "next/link";
import { McbAttribution } from "./McbAttribution";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0d12] text-slate-400">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-white tracking-tight">
              The Ghost of the Mountains
            </h3>
            <p className="text-sm max-w-sm leading-relaxed text-slate-400">
              An interactive conservation experience and educational telemetry guide dedicated to protecting the elusive snow leopard across 12 Central and South Asian mountain ranges.
            </p>
            <div className="pt-2 text-xs">
              <span className="inline-block px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 font-medium text-cyan-400">
                IUCN Status: Vulnerable
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#range-map" className="hover:text-white transition-colors">
                  Range Map
                </Link>
              </li>
              <li>
                <Link href="/#data" className="hover:text-white transition-colors">
                  Population Data
                </Link>
              </li>
              <li>
                <Link href="/#quiz" className="hover:text-white transition-colors">
                  Interactive Quiz
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-white transition-colors">
                  The Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Conservation & Action */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Conservation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/conservation" className="hover:text-white transition-colors">
                  Conservation Programs
                </Link>
              </li>
              <li>
                <Link href="/factsheet" className="hover:text-white transition-colors">
                  Species Fact Sheet
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-cyan-400 text-cyan-400/90 font-medium transition-colors">
                  Support & Donate
                </Link>
              </li>
              <li>
                <a
                  href="https://snowleopard.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Snow Leopard Trust ↗
                </a>
              </li>
              <li>
                <a
                  href="https://gslep.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GSLEP Initiative ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Ghost of the Mountains. All rights reserved.</p>

          {/* Plug-and-Play MCB Systems Studio Attribution */}
          <McbAttribution
            theme="accent"
            clientSlug="ghost-of-the-mountains"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
