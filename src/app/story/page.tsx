"use client";

import { useStoryStore } from "@/features/story/store";
// Import storyNodes correctly. Since we are in Next.js, we might need to adjust import paths if they changed,
// but for now relying on aliases in tsconfig.
import { storyNodes } from "@/data/story-nodes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function StoryPage() {
    // Client-side logic remains largely the same, just need "use client" at top
    const { currentNodeId, makeChoice, stats } = useStoryStore();
    const currentNode = storyNodes[currentNodeId];

    if (!currentNode) {
        return <div className="p-10 text-center">Story node not found...</div>
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 bg-slate-950 flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto mb-8 flex justify-between text-slate-400 text-sm uppercase tracking-widest">
                <div>Health: {stats.health}%</div>
                <div>Stealth: {stats.stealth}%</div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentNode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl"
                >
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-2xl overflow-hidden">
                        {/* Image Placeholder */}
                        <div className="h-64 md:h-96 bg-slate-800 relative w-full overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                                {currentNode.background ? `Image: ${currentNode.background}` : 'Scene Visualization'}
                            </div>
                        </div>

                        <CardContent className="p-8 md:p-12">
                            <p className="text-xl md:text-2xl leading-relaxed text-slate-200 font-light">
                                {currentNode.text}
                            </p>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 p-8 md:p-12 pt-0">
                            {currentNode.choices.map((choice) => (
                                <Button
                                    key={choice.id}
                                    variant="outline"
                                    className="w-full justify-start text-left h-auto py-4 px-6 text-lg border-slate-700 hover:bg-slate-800 hover:text-white transition-all hover:border-primary/50"
                                    onClick={() => makeChoice(choice.id)}
                                    disabled={choice.requiredStat && stats[choice.requiredStat] < (choice.requiredValue || 0)}
                                >
                                    <span className="mr-auto">{choice.text}</span>
                                    {choice.requiredStat && (
                                        <span className="text-xs text-slate-500 ml-2 uppercase">
                                            Req: {choice.requiredStat} {choice.requiredValue}
                                        </span>
                                    )}
                                </Button>
                            ))}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
