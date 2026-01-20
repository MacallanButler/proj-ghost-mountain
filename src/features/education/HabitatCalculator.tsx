import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

// Simplified Slider component if not strictly using shadcn's full primitive yet
// But since we are using shadcn style, let's just make a simple HTML slider styled with Tailwind for speed
// unless requested otherwise. I'll use a standard input range with custom styling.

export default function HabitatCalculator() {
    const [year, setYear] = useState(1990);

    // Hypothetical data points (estimates for educational purpose)
    // Range index 100% at 1990, declining to ~60-70% by 2030 projected
    const calculateRange = (yr: number) => {
        const start = 1990;
        const declinePerYear = 0.8; // arbitrary unit for demo
        const yearsPassed = yr - start;
        return Math.max(0, 100 - (yearsPassed * declinePerYear));
    };

    const remainingRange = calculateRange(year);

    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border-white/10 text-slate-100">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-500">
                    <AlertTriangle className="w-6 h-6" />
                    Habitat Loss Calculator
                </CardTitle>
                <CardDescription className="text-slate-400">
                    See how climate change shrinks the snow line.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-white tracking-tighter">
                        {remainingRange.toFixed(1)}%
                    </div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest">Habitat Remaining vs 1990</p>
                </div>

                <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-300"
                        style={{ width: `${remainingRange}%` }}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                        <span>1990</span>
                        <span className="text-white font-bold text-lg">{year}</span>
                        <span>2040</span>
                    </div>
                    <input
                        type="range"
                        min="1990"
                        max="2040"
                        step="1"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-sm text-slate-300 italic">
                        {year > 2024 ? "Projected: " : ""}
                        As temperatures rise, the snow line moves higher, squeezing snow leopards into smaller, fragmented islands of mountains.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
