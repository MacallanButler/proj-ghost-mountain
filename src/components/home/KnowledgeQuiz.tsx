"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { trackQuizStart, trackQuizQuestionAnswered, trackQuizCompleted } from "@/lib/analytics";

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
        question: "According to the latest IUCN Red List assessment, what is the estimated range of mature breeding snow leopards?",
        options: ["Around 10,000", "2,710–3,386", "7,446–7,996", "Under 500"],
        correct: 1,
        fact: "While the raw total population estimate is 7,446–7,996 individuals, the mature breeding population (which excludes juveniles and non-breeding adults) is estimated at 2,710–3,386.",
    },
    {
        id: "q2",
        question: "How many countries does the snow leopard's range span?",
        options: ["4 countries", "6 countries", "12 countries", "20 countries"],
        correct: 2,
        fact: "Snow leopards are found across 12 countries, from Russia in the north to India in the south, traversing Central and South Asia.",
    },
    {
        id: "q3",
        question: "What is the snow leopard's IUCN Red List status?",
        options: ["Extinct in the Wild", "Critically Endangered", "Vulnerable", "Near Threatened"],
        correct: 2,
        fact: "In 2017, the IUCN downlisted the snow leopard from Endangered to Vulnerable. However, 'Vulnerable' still means they face a high risk of extinction in the wild.",
    },
    {
        id: "q4",
        question: "What is the primary prey of snow leopards?",
        options: ["Yaks", "Bharal (blue sheep) and ibex", "Brown bears", "Red pandas"],
        correct: 1,
        fact: "Bharal and ibex make up the majority of the snow leopard's diet, supplemented by smaller animals like marmots.",
    },
    {
        id: "q5",
        question: "What is the leading threat to snow leopards?",
        options: ["Disease", "Habitat loss, poaching, and retribution killings", "Climate change only", "Natural predators"],
        correct: 1,
        fact: "Poaching for fur/bones and retaliatory killings by herders protecting their livestock are the biggest direct threats, compounded by habitat fragmentation.",
    },
    {
        id: "q6",
        question: "Why are snow leopards unable to roar like other big cats?",
        options: ["Their vocal cords are too thin", "Their hyoid bone is not fully ossified", "Their nasal cavities warm the air too much", "They lack strong throat muscles"],
        correct: 1,
        fact: "Unlike lions, tigers, and leopards, the snow leopard's hyoid bone in the throat is not fully ossified (rigid). Instead of roaring, they communicate with sounds like chuffs, growls, and meows.",
    },
    {
        id: "q7",
        question: "How long is a snow leopard's tail compared to its body?",
        options: ["10–20%", "40–50%", "80–105%", "150–200%"],
        correct: 2,
        fact: "A snow leopard's tail is 80–105% of its body length. It is used for balance on steep mountain cliffs and wrapped around the body for warmth during rest.",
    },
    {
        id: "q8",
        question: "Which organizations publicly opposed the IUCN downlisting in 2017?",
        options: ["WWF and Greenpeace", "The Snow Leopard Trust and Panthera", "GSLEP and the UN", "National Geographic Society"],
        correct: 1,
        fact: "The Snow Leopard Trust and Panthera publicly opposed the downlisting, arguing that removing Endangered status was scientifically unsupported and could hurt conservation funding.",
    },
    {
        id: "q9",
        question: "What is the correct genus of the snow leopard under modern classification?",
        options: ["Uncia", "Panthera", "Felis", "Acinonyx"],
        correct: 1,
        fact: "Snow leopards were historically classified in their own genus (Uncia), but modern genetic studies placed them in the genus Panthera, proving a close link to tigers.",
    },
    {
        id: "q10",
        question: "What term describes the snow leopard's activity pattern of being most active at dawn and dusk?",
        options: ["Nocturnal", "Diurnal", "Crepuscular", "Matutinal"],
        correct: 2,
        fact: "Snow leopards are crepuscular, meaning they are most active during the low-light hours of dawn and dusk.",
    },
];

const LS_KEY = "slt-quiz-high-score";

export function KnowledgeQuiz() {
    const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [mounted, setMounted] = useState(false);
    const hasStartedQuiz = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved) setHighScore(parseInt(saved));
        
        // Shuffle and select 5 random questions
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setActiveQuestions(shuffled.slice(0, 5));
        setMounted(true);
    }, []);

    if (!mounted || activeQuestions.length === 0) {
        return (
            <section id="quiz" data-section-name="knowledge_quiz" className="py-20 bg-stone-950">
                <div className="container mx-auto px-6 max-w-2xl text-center text-stone-400">
                    <p>Loading quiz questions...</p>
                </div>
            </section>
        );
    }

    const q = activeQuestions[currentQ];

    const handleSelect = (idx: number) => {
        if (confirmed) return;
        if (!hasStartedQuiz.current) {
            hasStartedQuiz.current = true;
            trackQuizStart();
        }
        setSelected(idx);
    };

    const handleConfirm = () => {
        if (selected === null) return;
        const isCorrect = selected === q.correct;
        setConfirmed(true);
        if (isCorrect) setScore(s => s + 1);

        trackQuizQuestionAnswered(currentQ + 1, isCorrect);
    };

    const handleNext = () => {
        if (currentQ + 1 < activeQuestions.length) {
            setCurrentQ(p => p + 1);
            setSelected(null);
            setConfirmed(false);
        } else {
            // Finished!
            setFinished(true);
            const finalScore = score;
            trackQuizCompleted(finalScore, activeQuestions.length);
            if (finalScore > highScore) {
                setHighScore(finalScore);
                localStorage.setItem(LS_KEY, String(finalScore));
            }
        }
    };

    const reset = () => {
        hasStartedQuiz.current = false;
        setCurrentQ(0);
        setSelected(null);
        setConfirmed(false);
        setScore(0);
        setFinished(false);
        // Reshuffle for next attempt
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setActiveQuestions(shuffled.slice(0, 5));
    };

    const pct = Math.round(((score) / activeQuestions.length) * 100);

    return (
        <section id="quiz" data-section-name="knowledge_quiz" className="py-20 bg-stone-950">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Test Your Knowledge</span>
                    <h2 className="text-4xl font-bold text-white mb-3">How Much Do You Know?</h2>
                    <p className="text-stone-400 text-sm">
                        High score: <span className="text-white font-bold">{highScore}/{activeQuestions.length}</span>
                    </p>
                </div>

                {!finished ? (
                    <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-7">
                        {/* Progress */}
                        <div className="flex justify-between text-xs text-stone-500 mb-2">
                            <span>Question {currentQ + 1} of {activeQuestions.length}</span>
                            <span>{score} correct</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mb-7">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${((currentQ) / activeQuestions.length) * 100}%` }} />
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
                                    {currentQ + 1 < activeQuestions.length ? "Next Question →" : "See Results"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-8 text-center">
                        <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-2">
                            {score}/{activeQuestions.length}
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
