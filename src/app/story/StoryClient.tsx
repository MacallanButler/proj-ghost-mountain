"use client";

import { useStoryStore } from "@/features/story/store";
import { storyNodes } from "@/data/story-nodes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Heart, Wind, ShieldAlert, RotateCcw, Home } from "lucide-react";

import heroBg from "@/assets/raimond-klavins-L6jxljMeUoo-unsplash.jpg";
import himalayasBg from "@/assets/katyayan-gauniyal-bqT4SFaOsNc-unsplash.jpg";
import valleyBg from "@/assets/conflict2.jpg";
import conflictBg from "@/assets/conflict1.jpg";
import riverBg from "@/assets/matt-palmer-kbTp7dBzHyY-unsplash.jpg";
import huntBg from "@/assets/giuseppe-mondi-xyE1p1rG04U-unsplash.jpg";
import profileBg from "@/assets/peter-robbins-SzCNRFtF6ZQ-unsplash.jpg";

const imageMap: Record<string, StaticImageData> = {
    'start': heroBg,
    'ridge_path': himalayasBg,
    'valley_floor': valleyBg,
    'livestock_conflict': conflictBg,
    'river_crossing': riverBg,
    'hunt_success': huntBg,
    'rest_cave': profileBg,
};

export default function StoryClient() {
    const { currentNodeId, makeChoice, stats, resetGame } = useStoryStore();
    const currentNode = storyNodes[currentNodeId];

    const isDead = stats.health <= 0;

    if (!currentNode) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-foreground p-10">
                <div className="text-center space-y-4">
                    <p className="text-lg text-muted-foreground">Story node not found...</p>
                    <Button onClick={resetGame} variant="outline">Reset Game</Button>
                </div>
            </div>
        );
    }

    const bgImage = imageMap[currentNode.id] || heroBg;

    return (
        <div className="min-h-screen pt-28 pb-16 px-4 bg-background flex flex-col items-center justify-center">
            
            {/* Stats Dashboard */}
            <div className="w-full max-w-3xl mx-auto mb-6 grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart className={`w-5 h-5 ${isDead ? "text-red-500 animate-pulse" : "text-red-400"}`} />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Health</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{stats.health}%</span>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wind className="w-5 h-5 text-blue-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stealth</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{stats.stealth}%</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={isDead ? "dead" : currentNode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="bg-card border-border shadow-2xl overflow-hidden rounded-3xl">
                        
                        {/* Dynamic Scene Image */}
                        <div className="h-64 md:h-96 relative w-full overflow-hidden border-b border-border">
                            <Image
                                src={isDead ? conflictBg : bgImage}
                                alt={isDead ? "Severe conditions" : currentNode.text}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1116] via-transparent to-transparent" />
                            {isDead && (
                                <div className="absolute inset-0 bg-red-950/40 backdrop-blur-sm flex items-center justify-center" />
                            )}
                        </div>

                        <CardContent className="p-8 md:p-10 space-y-6">
                            {isDead ? (
                                <div className="space-y-4 text-center">
                                    <div className="p-3 bg-red-500/10 rounded-full w-fit mx-auto text-red-500">
                                        <ShieldAlert className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-red-500">The Mountain Reclaims Its Ghost</h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
                                        Your energy has been entirely depleted. Without food and shelter, you succumb to the sub-zero freezing winds of the high Himalayas.
                                    </p>
                                </div>
                            ) : (
                                <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">
                                    {currentNode.text}
                                </p>
                            )}

                            {/* Fact Unlock Notification */}
                            {!isDead && currentNode.factId && (
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex gap-3 items-start">
                                    <span className="text-lg">💡</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-primary">Fact Unlocked</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {currentNode.factId === 'human_wildlife_conflict' 
                                                ? "Leopards descend to valleys when prey is scarce, leading to high livestock predation and dangerous retaliatory poaching."
                                                : "Snow leopards roam massive territories spanning across 12 countries. Coexistence and wide corridors are critical to their survival."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 p-8 md:p-10 pt-0">
                            {isDead ? (
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <Button
                                        onClick={resetGame}
                                        className="flex-1 justify-center gap-2 h-12 text-md font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/85 transition-all"
                                    >
                                        <RotateCcw className="w-5 h-5" /> Try Again
                                    </Button>
                                    <Link href="/" className="flex-1">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-center gap-2 h-12 text-md font-semibold border-border hover:bg-white/5 transition-all text-muted-foreground hover:text-foreground rounded-xl"
                                        >
                                            <Home className="w-5 h-5" /> Back to Home
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 w-full">
                                    {currentNode.choices.map((choice) => {
                                        const isLocked = choice.requiredStat && stats[choice.requiredStat] < (choice.requiredValue || 0);
                                        return (
                                            <Button
                                                key={choice.id}
                                                variant="outline"
                                                className={`w-full justify-between text-left h-auto py-4 px-6 text-md md:text-lg border-border hover:bg-white/5 hover:text-foreground transition-all hover:border-primary/50 rounded-2xl ${
                                                    isLocked ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:border-border" : ""
                                                }`}
                                                onClick={() => !isLocked && makeChoice(choice.id)}
                                                disabled={isLocked}
                                            >
                                                <span className="mr-auto">{choice.text}</span>
                                                {choice.requiredStat && (
                                                    <span className="text-xs text-muted-foreground ml-2 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                                                        Req: {choice.requiredStat} {choice.requiredValue}% {isLocked ? "🔒" : "🔓"}
                                                    </span>
                                                )}
                                            </Button>
                                        );
                                    })}
                                    
                                    <div className="flex gap-4 w-full mt-4 border-t border-border pt-4">
                                        <Button
                                            variant="ghost"
                                            onClick={resetGame}
                                            className="flex-1 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl py-2"
                                        >
                                            Restart Simulation
                                        </Button>
                                        <Link href="/" className="flex-1">
                                            <Button
                                                variant="ghost"
                                                className="w-full text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl py-2"
                                            >
                                                Exit to Home
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
