"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Play, RotateCcw, Award, AlertCircle, Timer, Sparkles, HelpCircle } from "lucide-react";

// Images
import sceneHimalaya from "@/assets/giuseppe-mondi-xyE1p1rG04U-unsplash.jpg";
import sceneRidge from "@/assets/robert-sachowski-HFIvhaOcHVA-unsplash.jpg";
import sceneSteppe from "@/assets/raimond-klavins-L6jxljMeUoo-unsplash.jpg";

type Difficulty = "easy" | "medium" | "hard";

interface Scene {
    id: string;
    title: string;
    description: string;
    image: StaticImageData;
    // Coordinates in percentage
    leopardX: number; // left%
    leopardY: number; // top%
    leopardWidth: number; // width%
    leopardHeight: number; // height%
    fact: string;
}

const scenes: Scene[] = [
    {
        id: "himalayas",
        title: "Rocky Himalayan Cliffside",
        description: "A steep, rugged rock face in the Himalayas of Nepal. Can you spot the ghost among the stone?",
        image: sceneHimalaya,
        leopardX: 47,
        leopardY: 42,
        leopardWidth: 7,
        leopardHeight: 6,
        fact: "Snow leopard rosettes (the ring-like markings on their fur) are unique to each individual, acting like a fingerprint. Their coat is so perfectly evolved for rock and snow that a snow leopard can remain completely invisible even in plain sight on a bare cliffside."
    },
    {
        id: "ridge",
        title: "Snow-covered Ridge",
        description: "A wind-swept, snow-dappled ridge in Ladakh, India. The snow leopard blends with patches of snow and shadow.",
        image: sceneRidge,
        leopardX: 32,
        leopardY: 53,
        leopardWidth: 8,
        leopardHeight: 7,
        fact: "A snow leopard's tail is nearly as long as its body (80-105% of body length), which it wraps around its face and body like a thick, insulating blanket to survive freezing high-altitude blizzards."
    },
    {
        id: "steppe",
        title: "Mongolian Steppe-Mountain",
        description: "The transition zone between the Gobi desert and Altai mountains in Mongolia. Look closely in the scree slope.",
        image: sceneSteppe,
        leopardX: 66,
        leopardY: 34,
        leopardWidth: 9,
        leopardHeight: 8,
        fact: "Snow leopards have wide, fur-covered paws that function as natural snowshoes, distributing their weight evenly so they do not sink into deep drifts while stalking prey."
    }
];

const difficultySettings = {
    easy: {
        timer: 45,
        opacity: 0.75,
        outline: "stroke-blue-400 stroke-[3px] animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]",
        hitboxScale: 1.5,
        cursor: "cursor-pointer"
    },
    medium: {
        timer: 30,
        opacity: 0.35,
        outline: "stroke-white/40 stroke-[1.5px] hover:stroke-white/80 transition-colors",
        hitboxScale: 1.2,
        cursor: "cursor-default"
    },
    hard: {
        timer: 15,
        opacity: 0.12,
        outline: "stroke-transparent stroke-0",
        hitboxScale: 1.0,
        cursor: "cursor-default"
    }
};

export function SpotTheSnowLeopard() {
    const [gameState, setGameState] = useState<"menu" | "playing" | "won" | "lost">("menu");
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0); // Tracks completed scenes in a run

    const activeScene = scenes[currentSceneIndex];
    const activeSettings = difficultySettings[difficulty];
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Gameplay Timer
    useEffect(() => {
        if (gameState === "playing" && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === "playing") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setGameState("lost");
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, gameState]);

    const startGame = () => {
        setTimeLeft(difficultySettings[difficulty].timer);
        setGameState("playing");
    };

    const handleFoundLeopard = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setScore(s => s + 1);
        setGameState("won");
    };

    const handleNextScene = () => {
        const nextIdx = (currentSceneIndex + 1) % scenes.length;
        setCurrentSceneIndex(nextIdx);
        setTimeLeft(difficultySettings[difficulty].timer);
        setGameState("playing");
    };

    const handleRestartGame = () => {
        setScore(0);
        setTimeLeft(difficultySettings[difficulty].timer);
        setGameState("playing");
    };

    const handleExitToMenu = () => {
        setScore(0);
        setGameState("menu");
    };

    return (
        <section id="spot-game" className="py-24 px-6 bg-stone-950">
            <div className="max-w-[1100px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 space-y-4">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        Interactive Challenge
                    </span>
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white tracking-tight">
                        Spot the Snow Leopard
                    </h2>
                    <p className="max-w-[65ch] mx-auto text-sm text-stone-400">
                        Snow leopards are master camouflagers. Test your eyes against real high-altitude terrain, adjust difficulty levels, and uncover conservation facts.
                    </p>
                </div>

                {/* Main Game Container */}
                <div className="bg-stone-900 border border-stone-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
                    
                    {/* MENU STATE */}
                    {gameState === "menu" && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-12 text-center space-y-8 my-auto"
                        >
                            <div className="max-w-md space-y-3">
                                <h3 className="text-2xl font-bold text-white">Ghost Camouflage Simulator</h3>
                                <p className="text-stone-400 text-sm">
                                    Choose your difficulty level and try to find the hidden snow leopard silhouette in the rocky cliffs before the time runs out.
                                </p>
                            </div>

                            {/* Difficulty Selector */}
                            <div className="flex gap-3 bg-stone-950 p-1.5 rounded-2xl border border-stone-800">
                                {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDifficulty(d)}
                                        className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                            difficulty === d
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                : "text-stone-400 hover:text-white"
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>

                            {/* Description of Difficulty */}
                            <div className="text-xs text-stone-500 flex items-center gap-2 bg-stone-950/50 px-4 py-2.5 rounded-xl border border-stone-800/40">
                                <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
                                <span>
                                    {difficulty === "easy" && "Timer: 45s • High visibility silhouette • Pointer cursor feedback"}
                                    {difficulty === "medium" && "Timer: 30s • Medium blend silhouette • Default cursor (no hovering cheat)"}
                                    {difficulty === "hard" && "Timer: 15s • Realistic camouflage opacity • Default cursor • Exact hitbox"}
                                </span>
                            </div>

                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-blue-500/30 scale-105 hover:scale-110 active:scale-95"
                            >
                                <Play className="w-5 h-5 fill-current" /> Start Game
                            </button>
                        </motion.div>
                    )}

                    {/* PLAYING STATE */}
                    {gameState === "playing" && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* HUD Top Bar */}
                            <div className="flex flex-wrap gap-4 items-center justify-between border-b border-stone-800 pb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">Active Scene ({currentSceneIndex + 1}/{scenes.length}) • Leopards Found: {score}</span>
                                    <h4 className="text-lg font-bold text-white">{activeScene.title}</h4>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-stone-300 bg-stone-950 px-3.5 py-2 rounded-xl border border-stone-800 font-mono text-sm">
                                        <Timer className={`w-4 h-4 ${timeLeft < 10 ? "text-red-500 animate-pulse" : "text-stone-400"}`} />
                                        <span className={timeLeft < 10 ? "text-red-400 font-bold" : ""}>{timeLeft}s</span>
                                    </div>
                                    <div className="text-xs bg-blue-600/10 border border-blue-500/20 text-blue-400 px-3 py-2 rounded-xl font-bold uppercase tracking-wider">
                                        Diff: {difficulty}
                                    </div>
                                    <button 
                                        onClick={handleExitToMenu}
                                        className="text-xs text-stone-400 hover:text-white transition-colors"
                                    >
                                        Quit to Menu
                                    </button>
                                </div>
                            </div>

                            {/* Game Viewport */}
                            <div 
                                className="relative w-full overflow-hidden rounded-2xl border border-stone-700/50 shadow-2xl bg-black aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8.5]"
                                style={{ contentVisibility: "auto" }}
                            >
                                <Image
                                    src={activeScene.image}
                                    alt={activeScene.description}
                                    fill
                                    className="object-cover pointer-events-none select-none select-none filter brightness-95"
                                    priority
                                    sizes="100vw"
                                />

                                {/* Subtle camouflage shading overlay */}
                                <div className="absolute inset-0 bg-black/10 pointer-events-none select-none" />

                                {/* The leopard clickable hitbox */}
                                <button
                                    onClick={handleFoundLeopard}
                                    className={`absolute rounded-full border border-transparent ${activeSettings.cursor} flex items-center justify-center`}
                                    style={{
                                        left: `${activeScene.leopardX}%`,
                                        top: `${activeScene.leopardY}%`,
                                        width: `${activeScene.leopardWidth}%`,
                                        height: `${activeScene.leopardHeight}%`,
                                        transform: "translate(-50%, -50%)",
                                        // Expand hitbox on easier difficulties
                                        padding: `${(activeSettings.hitboxScale - 1) * 20}px`
                                    }}
                                    aria-label="Click here if you spot the leopard"
                                >
                                    {/* Styled SVG silhouette */}
                                    <svg
                                        viewBox="0 0 200 120"
                                        className="w-full h-full object-contain pointer-events-none select-none"
                                        style={{
                                            opacity: activeSettings.opacity,
                                            color: "rgba(100, 110, 120, 0.95)"
                                        }}
                                    >
                                        {/* Crouching Leopard Silhouette path */}
                                        <path
                                            d="M10 80 C20 75, 25 60, 30 50 C32 46, 38 48, 42 45 C46 42, 44 32, 48 25 C50 20, 56 10, 62 12 C66 13, 64 22, 68 26 C72 30, 80 32, 85 35 C90 38, 98 42, 105 38 C112 34, 118 36, 120 42 C122 48, 118 54, 125 58 C132 62, 140 60, 148 65 C156 70, 158 85, 170 90 C182 95, 195 90, 200 100 C195 108, 180 105, 172 100 C164 95, 160 85, 150 80 C140 75, 132 72, 124 78 C116 84, 110 92, 100 95 C90 98, 80 92, 72 85 C64 78, 55 82, 45 85 C35 88, 25 90, 10 80 Z"
                                            fill="currentColor"
                                            className={activeSettings.outline}
                                        />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-center text-xs text-stone-500 italic">
                                Hint: Look carefully at rocky crevices, ledges, and shadow boundaries. The silhouette blends into the stone.
                            </p>
                        </motion.div>
                    )}

                    {/* SUCCESS STATE */}
                    {gameState === "won" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto py-8 text-center space-y-8 flex flex-col justify-center my-auto"
                        >
                            <div className="space-y-3">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full w-fit mx-auto animate-bounce">
                                    <Award className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Leopard Spotted!</h3>
                                <p className="text-stone-400 text-sm">
                                    Outstanding eye. You found the snow leopard camouflaged in the {activeScene.title}.
                                </p>
                            </div>

                            {/* Glassmorphic Educational Reward Fact Card (matching Facts.tsx detail cards) */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                                <p className="text-sm text-stone-300 leading-relaxed font-medium">
                                    💡 <strong>Conservation Fact:</strong> {activeScene.fact}
                                </p>
                                <span className="text-[9px] text-stone-500 font-mono mt-3 select-none">Source: Snow Leopard Trust</span>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleNextScene}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                                >
                                    Next Habitat Scene
                                </button>
                                <button
                                    onClick={handleExitToMenu}
                                    className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl transition-colors"
                                >
                                    Main Menu
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* FAILED STATE */}
                    {gameState === "lost" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-md mx-auto py-8 text-center space-y-6 flex flex-col justify-center my-auto"
                        >
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full w-fit mx-auto">
                                <AlertCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">The Leopard Slipped Away</h3>
                            <p className="text-stone-400 text-sm">
                                Time ran out! Snow leopards are perfectly adapted to vanish into their rocky landscape, remaining unseen by prey and predators alike.
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleRestartGame}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" /> Retry Scene
                                </button>
                                <button
                                    onClick={handleExitToMenu}
                                    className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl transition-colors"
                                >
                                    Main Menu
                                </button>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}
