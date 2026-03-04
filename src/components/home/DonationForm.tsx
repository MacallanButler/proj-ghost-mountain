"use client";

import { useState } from "react";
import { Shield, Lock, CheckCircle2, CreditCard, Heart } from "lucide-react";

const PRESETS = [25, 50, 100, 250];

const programs = [
    { id: "patrol", label: "Anti-Poaching Patrols", icon: "🛡️" },
    { id: "community", label: "Community Coexistence Program", icon: "🏘️" },
    { id: "research", label: "Field Research & Tracking", icon: "🔬" },
    { id: "general", label: "Where Most Needed", icon: "🐆" },
];

type Step = "amount" | "details" | "success";

function maskCard(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function DonationForm() {
    const [step, setStep] = useState<Step>("amount");
    const [amount, setAmount] = useState<number>(50);
    const [customAmount, setCustomAmount] = useState("");
    const [program, setProgram] = useState("general");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [card, setCard] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [processing, setProcessing] = useState(false);

    const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount;

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setStep("success");
        }, 2000);
    };

    if (step === "success") {
        return (
            <section id="donate" className="py-20 bg-stone-900">
                <div className="container mx-auto px-6 max-w-lg">
                    <div className="bg-stone-900 border border-green-500/20 rounded-2xl p-10 text-center">
                        <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
                        <p className="text-stone-400 mb-4">
                            Your <strong className="text-white">${finalAmount}</strong> donation to the{" "}
                            <strong className="text-blue-400">{programs.find(p => p.id === program)?.label}</strong> program will protect snow leopards for years to come.
                        </p>
                        <p className="text-xs text-stone-600">A receipt has been sent to {email || "your email"}.</p>
                        <button
                            onClick={() => { setStep("amount"); setCard(""); setCvc(""); setExpiry(""); }}
                            className="mt-6 text-sm text-stone-400 hover:text-white underline-offset-2 underline transition-colors"
                        >
                            Make another donation
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="donate" className="py-20 bg-stone-900">
            <div className="container mx-auto px-6 max-w-lg">
                <div className="text-center mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">Support the Cause</span>
                    <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                        <Heart className="w-8 h-8 text-red-400" /> Donate
                    </h2>
                    <p className="text-stone-400 text-sm">100% of donations go directly to conservation programs.</p>
                </div>

                <div className="bg-stone-950 border border-stone-700/50 rounded-2xl p-6 space-y-6">
                    {/* Step 1: Amount */}
                    {step === "amount" && (
                        <>
                            {/* Program selector */}
                            <div>
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">Designate your gift</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {programs.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => setProgram(p.id)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${program === p.id ? "border-blue-500 bg-blue-900/20 text-white" : "border-stone-700 bg-stone-900 text-stone-400 hover:border-stone-600"}`}
                                        >
                                            <span>{p.icon}</span> {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">Choose amount</label>
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {PRESETS.map(a => (
                                        <button
                                            key={a}
                                            onClick={() => { setAmount(a); setCustomAmount(""); }}
                                            className={`py-2.5 rounded-lg border text-sm font-bold transition-all ${!customAmount && amount === a ? "border-blue-500 bg-blue-900/20 text-white" : "border-stone-700 text-stone-400 hover:border-stone-500"}`}
                                        >
                                            ${a}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={e => setCustomAmount(e.target.value)}
                                        placeholder="Other amount"
                                        className="w-full bg-stone-900 border border-stone-700 text-white text-sm pl-7 pr-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={finalAmount < 1}
                                onClick={() => setStep("details")}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl transition-colors"
                            >
                                Continue — ${finalAmount || "?"} →
                            </button>
                        </>
                    )}

                    {/* Step 2: Payment details */}
                    {step === "details" && (
                        <>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setStep("amount")} className="text-sm text-stone-400 hover:text-white">← Back</button>
                                <div className="text-sm font-bold text-white">${finalAmount} — {programs.find(p => p.id === program)?.label}</div>
                            </div>

                            <div className="space-y-3">
                                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                                    className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500" />
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                                    className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500" />

                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={card}
                                        onChange={e => setCard(maskCard(e.target.value))}
                                        placeholder="Card number"
                                        className="w-full bg-stone-900 border border-stone-700 text-white text-sm pl-10 pr-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500 font-mono"
                                        maxLength={19}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" value={expiry} onChange={e => {
                                        const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                        setExpiry(v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v);
                                    }} placeholder="MM/YY"
                                        className="bg-stone-900 border border-stone-700 text-white text-sm px-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500 font-mono" maxLength={5} />
                                    <input type="text" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="CVC"
                                        className="bg-stone-900 border border-stone-700 text-white text-sm px-4 py-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-blue-500 font-mono" maxLength={4} />
                                </div>
                            </div>

                            <button
                                disabled={!name || !card || !expiry || !cvc || processing}
                                onClick={handlePay}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                {processing
                                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                                    : <><Shield className="w-4 h-4" /> Donate ${finalAmount} Securely</>
                                }
                            </button>

                            <div className="flex items-center justify-center gap-2 text-xs text-stone-600">
                                <Lock className="w-3 h-3" /> Demo mode — no real charges are made
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
