import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hand } from 'lucide-react';

export default function PawComparison() {
    const [showHumanHand, setShowHumanHand] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border-white/10 text-slate-100">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hand className="w-6 h-6 text-primary" />
                    Paw Size Comparison
                </CardTitle>
                <CardDescription className="text-slate-400">
                    How do you measure up to a Ghost of the Mountains?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative h-64 bg-slate-900/50 rounded-lg overflow-hidden flex items-center justify-center border border-slate-700">
                    {/* Snow Leopard Paw Representation */}
                    <div className="absolute w-32 h-32 bg-slate-200 rounded-full opacity-80 blur-sm animate-pulse"
                        title="Snow Leopard PAW (approx 12cm wide)"
                    >
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-10 bg-slate-300 rounded-full" />
                        <div className="absolute top-4 left-2 w-8 h-10 bg-slate-300 rounded-full -rotate-12" />
                        <div className="absolute top-4 right-2 w-8 h-10 bg-slate-300 rounded-full rotate-12" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-14 bg-slate-300 rounded-[2rem]" />
                    </div>
                    <p className="absolute bottom-2 text-xs text-slate-500 font-mono">Snow Leopard (11-13cm)</p>

                    {/* Human Hand Transition */}
                    {showHumanHand && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute z-10 w-24 h-36 border-2 border-dashed border-primary/50 rounded-xl flex items-center justify-center bg-primary/10"
                        >
                            <span className="text-xs text-primary font-bold">Your Hand</span>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-2">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Snow leopards have massive paws that act as natural snowshoes, distributing their weight perfectly over deep snow drifts.
                    </p>
                    <Button
                        onClick={() => setShowHumanHand(!showHumanHand)}
                        className="w-full"
                        variant="secondary"
                    >
                        {showHumanHand ? "Hide Hand" : "Compare My Hand"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
