"use client";

import { useState, useEffect } from "react";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface Question {
    id: string;
    question: string;
    options: string[];
    correct: number;
    fact: string;
}

const questions: Question[] = [
    {
        id: "q1",
        question: "How many snow leopards are estimated to remain in the wild?",
        options: ["Over 20,000", "Around 4,000", "About 500", "Under 100"],
        correct: 1,
        fact: "Estimates range from 3,920–6,390 individuals, with the most commonly cited figure being around 4,000.",
    },
    {
        id: "q2",
        question: "How many countries does the snow leopard's range span?",
        options: ["4 countries", "6 countries", "12 countries", "20 countries"],
        correct: 2,
        fact: "Snow leopards are found across 12 countries, from Russia in the north to India in the south.",
    },
    {
        id: "q3",
        question: "What is the snow leopard's IUCN Red List status?",
        options: ["Extinct in the Wild", "Critically Endangered", "Vulnerable", "Near Threatened"],
        correct: 2,
        fact: "In 2017 the IUCN downlisted the snow leopard from Endangered to Vulnerable — but threats remain severe.",
    },
    {
        id: "q4",
        question: "What is the primary prey of snow leopards?",
        options: ["Yaks", "Bharal (blue sheep) and ibex", "Brown bears", "Red pandas"],
        correct: 1,
        fact: "Bharal and ibex make up the majority of the snow leopard's diet, supplemented by smaller animals.",
    },
    {
        id: "q5",
        question: "What is the leading threat to snow leopards?",
        options: ["Disease", "Habitat loss and poaching", "Climate change only", "Natural predators"],
        correct: 1,
        fact: "Poaching for fur, bones, and livestock retribution killings are the biggest direct threats, exacerbated by habitat fragmentation.",
    },
];

const LS_KEY = "slt-quiz-high-score";

export function KnowledgeQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const q = questions[currentQ];

    const handleSelect = (idx: number) => {
        if (confirmed) return;
        setSelected(idx);
    };

    const handleConfirm = () => {
        if (selected === null) return;
        setConfirmed(true);
        if (selected === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (currentQ + 1 < questions.length) {
            setCurrentQ(p => p + 1);
            setSelected(null);
            setConfirmed(false);
        } else {
            // Finished!
            setFinished(true);
            const finalScore = score + (selected === q.correct ? 1 : 0);
            if (finalScore > highScore) {
                setHighScore(finalScore);
                localStorage.setItem(LS_KEY, String(finalScore));
            }
        }
    };

    const reset = () => {
        setCurrentQ(0);
        setSelected(null);
        setConfirmed(false);
        setScore(0);
        setFinished(false);
    };

    const pct = Math.round(((score) / questions.length) * 100);

    return (
        <section id="quiz" className="py-20 bg-stone-950">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Test Your Knowledge</span>
                    <h2 className="text-4xl font-bold text-white mb-3">How Much Do You Know?</h2>
                    <p className="text-stone-400 text-sm">
                        High score: <span className="text-white font-bold">{highScore}/{questions.length}</span>
                    </p>
                </div>

                {!finished ? (
                    <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-7">
                        {/* Progress */}
                        <div className="flex justify-between text-xs text-stone-500 mb-2">
                            <span>Question {currentQ + 1} of {questions.length}</span>
                            <span>{score} correct</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mb-7">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-6">{q.question}</h3>

                        <div className="space-y-3">
                            {q.options.map((option, idx) => {
                                let className = "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ";
                                if (!confirmed) {
                                    className += selected === idx
                                        ? "border-blue-500 bg-blue-900/30 text-white"
                                        : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-600 hover:bg-stone-800";
                                } else {
                                    if (idx === q.correct) className += "border-green-500 bg-green-900/20 text-green-300";
                                    else if (idx === selected) className += "border-red-500 bg-red-900/20 text-red-300";
                                    else className += "border-stone-700/50 text-stone-600";
                                }
                                return (
                                    <button key={idx} className={className} onClick={() => handleSelect(idx)}>
                                        <div className="flex items-center gap-3">
                                            {confirmed && idx === q.correct && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                                            {confirmed && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                                            {option}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {confirmed && (
                            <div className="mt-5 p-3 rounded-xl bg-stone-800/50 border border-stone-700/30 text-sm text-stone-300">
                                💡 {q.fact}
                            </div>
                        )}

                        <div className="mt-6 flex gap-3">
                            {!confirmed ? (
                                <button
                                    disabled={selected === null}
                                    onClick={handleConfirm}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl transition-colors"
                                >
                                    Confirm Answer
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                                >
                                    {currentQ + 1 < questions.length ? "Next Question →" : "See Results"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-8 text-center">
                        <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-2">
                            {score}/{questions.length}
                        </h3>
                        <p className="text-stone-400 mb-2">
                            {pct >= 80 ? "Snow Leopard Expert! 🏆" : pct >= 60 ? "Good effort! 🐆" : "Keep learning — every fact matters."}
                        </p>
                        {score === highScore && score > 0 && (
                            <p className="text-amber-400 text-sm font-bold mb-4">🌟 New High Score!</p>
                        )}
                        <button onClick={reset} className="mt-4 flex items-center gap-2 mx-auto px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition-colors">
                            <RotateCcw className="w-4 h-4" /> Try Again
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
