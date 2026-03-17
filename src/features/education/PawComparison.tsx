"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hand, Ruler } from 'lucide-react';

// Snow leopard paw: approximately 11–13 cm wide, 10–12 cm long
const LEOPARD_PAW_CM = { width: 12, length: 11 };
// Scale: 200px = 20cm → 10px per cm
const PX_PER_CM = 10;

export default function PawComparison() {
    const [handWidth, setHandWidth] = useState("");
    const [handLength, setHandLength] = useState("");
    const [unit, setUnit] = useState<"cm" | "in">("cm");
    const [compared, setCompared] = useState(false);

    const toCm = (val: string) => {
        const n = parseFloat(val);
        return unit === "in" ? n * 2.54 : n;
    };

    const humanWidthCm = toCm(handWidth);
    const humanLengthCm = toCm(handLength);

    const leopardW = LEOPARD_PAW_CM.width * PX_PER_CM;
    const leopardH = LEOPARD_PAW_CM.length * PX_PER_CM;
    const humanW = !isNaN(humanWidthCm) ? humanWidthCm * PX_PER_CM : 0;
    const humanH = !isNaN(humanLengthCm) ? humanLengthCm * PX_PER_CM : 0;

    const canCompare = handWidth !== "" && handLength !== "" && !isNaN(humanWidthCm) && !isNaN(humanLengthCm);

    return (
        <Card className="w-full bg-white/5 backdrop-blur-md border-white/10 text-slate-100">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hand className="w-6 h-6 text-primary" />
                    Paw Size Comparison
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Enter your hand dimensions to see how you measure up against a snow leopard's massive paw.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                {/* Unit toggle */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Units:</span>
                    <button
                        onClick={() => setUnit("cm")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${unit === "cm" ? "bg-primary text-white border-primary" : "border-slate-600 text-slate-400 hover:border-slate-400"}`}
                    >cm</button>
                    <button
                        onClick={() => setUnit("in")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${unit === "in" ? "bg-primary text-white border-primary" : "border-slate-600 text-slate-400 hover:border-slate-400"}`}
                    >inches</button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-slate-400 flex items-center gap-1">
                            <Ruler className="w-3 h-3" /> Hand width ({unit})
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder={unit === "cm" ? "e.g. 9" : "e.g. 3.5"}
                            value={handWidth}
                            onChange={e => { setHandWidth(e.target.value); setCompared(false); }}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-400 flex items-center gap-1">
                            <Ruler className="w-3 h-3" /> Hand length ({unit})
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder={unit === "cm" ? "e.g. 18" : "e.g. 7"}
                            value={handLength}
                            onChange={e => { setHandLength(e.target.value); setCompared(false); }}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>
                <p className="text-xs text-slate-500">Tip: measure your hand from the base of the palm to the tip of your middle finger for length, widest point for width.</p>

                <button
                    onClick={() => setCompared(true)}
                    disabled={!canCompare}
                    className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    Compare My Hand
                </button>

                {/* Visual comparison */}
                <AnimatePresence>
                    {compared && canCompare && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            <div className="relative h-64 bg-slate-900/60 rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center gap-8">
                                {/* Snow leopard paw */}
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="bg-slate-300/80 rounded-[40%] flex items-center justify-center text-slate-900 text-xs font-bold shadow-lg"
                                        style={{ width: `${leopardW}px`, height: `${leopardH}px` }}
                                    >🐾</div>
                                    <span className="text-xs text-slate-400">Snow Leopard<br/><span className="text-slate-300 font-mono">{LEOPARD_PAW_CM.width}×{LEOPARD_PAW_CM.length}cm</span></span>
                                </div>
                                {/* Human hand */}
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="bg-primary/30 border-2 border-primary/60 rounded-[35%] flex items-center justify-center text-white text-xs font-bold"
                                        style={{ width: `${Math.min(humanW, 150)}px`, height: `${Math.min(humanH, 200)}px` }}
                                    >✋</div>
                                    <span className="text-xs text-slate-400">Your Hand<br/><span className="text-slate-300 font-mono">{humanWidthCm.toFixed(1)}×{humanLengthCm.toFixed(1)}cm</span></span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 text-center">
                                {humanWidthCm < LEOPARD_PAW_CM.width
                                    ? `A snow leopard's paw is ${(LEOPARD_PAW_CM.width - humanWidthCm).toFixed(1)} cm wider than your hand — that's why they walk on deep snow so effortlessly.`
                                    : `Your hand is actually wider than a snow leopard's paw — but theirs weighs far less and has retractable claws!`}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <p className="text-xs text-slate-500 leading-relaxed">
                    Snow leopards have massive, fur-padded paws that act as natural snowshoes — spreading their weight over deep snow drifts and giving them silent, agile footing on rocky ledges.
                </p>
            </CardContent>
        </Card>
    );
}
