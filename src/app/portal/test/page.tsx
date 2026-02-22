"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    TrendingUp,
    Clock,
    Target,
    ChevronRight,
    Play,
    CheckCircle2,
    ArrowLeft,
    Timer,
    AlertTriangle,
    Layout,
    BarChart3,
    Award,
    Lock,
    Search,
    Menu,
    X
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { getMockTests } from "@/app/actions/tests";
import { submitTest } from "@/app/actions/submit-test";

export default function MockTestPortal() {
    const [testState, setTestState] = useState<'discovery' | 'active' | 'finished'>('discovery');
    const [selectedTest, setSelectedTest] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [dbTests, setDbTests] = useState<any[]>([]);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        async function loadTests() {
            const data = await getMockTests();
            setDbTests(data);
        }
        loadTests();
    }, []);

    useEffect(() => {
        let timer: any;
        if (testState === 'active' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev: number) => prev - 1), 1000);
        } else if (timeLeft === 0 && testState === 'active') {
            handleFinish();
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft]);

    const startTest = (test: any) => {
        setSelectedTest(test);
        setTimeLeft(test.duration * 60);
        setTestState('active');
        setCurrentQuestion(0);
        setAnswers({});
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleFinish = async () => {
        if (!selectedTest) return;
        try {
            const res = await submitTest(selectedTest.id, answers);
            setResult(res);
            setTestState('finished');
        } catch (error) {
            console.error("Failed to submit test:", error);
            setTestState('finished');
        }
    };

    const currentQData = selectedTest?.questions?.[currentQuestion];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Dynamic Header */}
            <header className="pt-8 px-6 pb-12 md:pb-20 border-b border-border dark:border-white/5 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-accent dark:bg-white/10 border border-border dark:border-white/20">
                            <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                        </div>
                        <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements</span>
                    </Link>

                    {testState === 'active' ? (
                        <div className="flex items-center gap-4 md:gap-6 px-3 md:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                            <Timer className="w-4 h-4 text-red-500 animate-pulse" />
                            <span className="font-display tracking-[0.1em] md:tracking-widest text-base md:text-lg">{formatTime(timeLeft)}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 md:gap-4">
                            <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                                <Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link>
                                <Link href="/portal/student" className="hover:text-primary transition-colors underline decoration-primary underline-offset-8">Dashboard</Link>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-10 rounded-full border-border dark:border-white/10 text-[9px] px-6 hover:bg-accent dark:hover:bg-white/5 text-foreground dark:text-white"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    Logout
                                </Button>
                            </nav>

                            <ModeToggle />

                            <div className="lg:hidden">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Menu className="w-5 h-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="top" className="bg-background/95 backdrop-blur-xl border-border">
                                        <nav className="flex flex-col items-center gap-6 py-12">
                                            <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest">Roadmap</Link>
                                            <Link href="/portal/student" className="text-lg font-display uppercase tracking-widest text-primary">Dashboard</Link>
                                            <Button
                                                variant="outline"
                                                className="border-border rounded-full text-xs font-bold uppercase tracking-widest h-12 px-8 w-full max-w-[200px] mt-4"
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                            >
                                                Logout
                                            </Button>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="container mx-auto px-6 py-20 pb-40">
                <AnimatePresence mode="wait">

                    {/* 1. Discovery State */}
                    {testState === 'discovery' && (
                        <motion.div
                            key="discovery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="mb-12 md:mb-20">
                                <div className="sticker sticker-mint mb-6 md:mb-8 text-[10px]">Live Assessment Series ✦</div>
                                <h1 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tighter leading-[0.8] mb-8 md:mb-10">
                                    Mock <br />
                                    <span className="text-primary italic font-serif normal-case">Portal</span>
                                </h1>
                                <p className="text-foreground/60 dark:text-foreground/60 font-serif italic text-lg md:text-xl max-w-2xl leading-relaxed">
                                    High-fidelity simulations of MNC recruitment patterns. Performance here determines your Readiness Score.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {dbTests.map((test) => (
                                    <Card key={test.id} className="bg-card dark:bg-white/5 border-2 border-border rounded-3xl md:rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all shadow-md">
                                        <CardContent className="p-6 md:p-10 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                                <div className="p-3 bg-accent dark:bg-white/5 border border-border dark:border-white/10 rounded-xl md:rounded-2xl">
                                                    <Layout className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 dark:text-foreground/60" />
                                                </div>
                                                <Badge variant="outline" className="border-border dark:border-white/10 text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-widest px-2 md:px-3 py-1">
                                                    Intermediate
                                                </Badge>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-display uppercase text-base md:text-lg tracking-[0.1em] md:tracking-widest text-foreground/70 dark:text-foreground/60 mb-1">{test.company}</h3>
                                                <h2 className="font-display uppercase text-2xl md:text-3xl tracking-tighter mb-6 md:mb-8">{test.title}</h2>

                                                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                                                    <div className="space-y-1">
                                                        <div className="text-[7px] md:text-[8px] uppercase font-bold tracking-widest text-foreground/60 dark:text-white/20">Questions</div>
                                                        <div className="text-xs md:text-sm font-bold">{test.questions?.length || 0} Qs</div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-[7px] md:text-[8px] uppercase font-bold tracking-widest text-foreground/60 dark:text-white/20">Time Limit</div>
                                                        <div className="text-xs md:text-sm font-bold">{test.duration} MINS</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full h-12 md:h-14 bg-foreground dark:bg-white text-background dark:text-black font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none hover:bg-foreground/90 dark:hover:bg-white/90 gap-2 md:gap-3">
                                                        ACCESS TEST <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-background border-border dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 max-w-[95vw] md:max-w-2xl text-foreground dark:text-white max-h-[90vh] overflow-y-auto w-full mx-auto">
                                                    <DialogHeader className="text-left">
                                                        <DialogTitle className="font-display uppercase text-3xl md:text-4xl tracking-tighter mb-2 md:mb-4">{test.company} • {test.title}</DialogTitle>
                                                        <DialogDescription className="text-foreground/60 dark:text-foreground/60 font-serif italic text-base md:text-lg leading-relaxed">
                                                            You are about to start a high-stakes simulation. Ensure you have a stable connection and a quiet environment.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-6 md:py-10 space-y-4 md:space-y-6">
                                                        <div className="flex items-start md:items-center gap-3 md:gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-widest text-amber-600 dark:text-amber-500">
                                                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 md:mt-0" />
                                                            <span>Browser window switching will trigger an automated lock-out.</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-widest text-foreground/70 dark:text-foreground/60">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shrink-0" /> Multi-section Cognitive
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shrink-0" /> Auto-submission enabled
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={() => startTest(test)} className="w-full h-14 md:h-16 bg-primary text-primary-foreground font-black uppercase text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] rounded-none">
                                                            INITIALIZE ASSESSMENT ✦
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 2. Active Test State */}
                    {testState === 'active' && selectedTest && currentQData && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-4xl mx-auto w-full"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-16 px-4">
                                <div className="flex items-center gap-4">
                                    <div className="sticker sticker-white text-[8px] md:text-[9px] shrink-0">{selectedTest.title}</div>
                                    <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.1em] md:tracking-[0.3em] text-foreground/70 dark:text-white/20 whitespace-nowrap">Progress: {currentQuestion + 1}/{selectedTest.questions.length}</span>
                                </div>
                                <Button onClick={() => setTestState('discovery')} variant="ghost" className="text-red-600 dark:text-red-500 uppercase text-[9px] md:text-[10px] font-black tracking-[0.1em] md:tracking-widest hover:bg-red-500/10 w-fit">
                                    Terminate ✦
                                </Button>
                            </div>

                            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-primary/10 blur-[50px] md:blur-[100px] pointer-events-none" />

                                <div className="mb-8 md:mb-12">
                                    <div className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] md:tracking-[0.5em] text-primary mb-4 md:mb-6 underline decoration-wavy">Question {String(currentQuestion + 1).padStart(2, '0')}</div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tighter leading-tight text-foreground dark:text-white mb-10 md:mb-16">
                                        {currentQData.text}
                                    </h2>

                                    <RadioGroup
                                        value={answers[currentQData.id]}
                                        onValueChange={(val) => setAnswers(prev => ({ ...prev, [currentQData.id]: val }))}
                                        className="space-y-3 md:space-y-4"
                                    >
                                        {currentQData.options.map((opt: any) => (
                                            <div key={opt.id} className="flex items-center">
                                                <RadioGroupItem value={opt.text} id={opt.id} className="sr-only" />
                                                <Label
                                                    htmlFor={opt.id}
                                                    className={`w-full flex items-center justify-between p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all cursor-pointer ${answers[currentQData.id] === opt.text ? 'bg-primary/10 md:bg-primary/20 border-primary text-primary shadow-sm' : 'bg-accent dark:bg-white/5 border-border dark:border-white/10 text-foreground/60 dark:text-foreground/60 hover:border-primary/50'}`}
                                                >
                                                    <span className="text-base md:text-lg font-serif italic leading-snug pr-4">{opt.text}</span>
                                                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border flex items-center justify-center shrink-0 ${answers[currentQData.id] === opt.text ? 'border-primary bg-primary' : 'border-border dark:border-white/10'}`}>
                                                        {answers[currentQData.id] === opt.text && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-black" />}
                                                    </div>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row gap-4 md:gap-6 justify-between sm:items-center pt-8 md:pt-16 border-t border-border dark:border-white/5 mt-8 md:mt-16">
                                    <Button
                                        variant="ghost"
                                        disabled={currentQuestion === 0}
                                        onClick={() => setCurrentQuestion(prev => prev - 1)}
                                        className="uppercase text-[9px] md:text-[10px] font-black tracking-[0.1em] md:tracking-widest text-foreground/60 dark:text-white/20 hover:text-foreground dark:hover:text-white w-full sm:w-auto"
                                    >
                                        PREVIOUS
                                    </Button>
                                    <div className="flex gap-4 w-full sm:w-auto">
                                        {currentQuestion < selectedTest.questions.length - 1 ? (
                                            <Button
                                                onClick={() => setCurrentQuestion(prev => prev + 1)}
                                                className="h-12 md:h-14 px-8 md:px-12 bg-foreground dark:bg-white text-background dark:text-black font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none hover:bg-foreground/90 dark:hover:bg-white/90 w-full sm:w-auto"
                                            >
                                                NEXT QUESTION ✦
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleFinish}
                                                className="h-12 md:h-14 px-8 md:px-12 bg-emerald-500 text-black font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none hover:bg-emerald-600 w-full sm:w-auto"
                                            >
                                                SUBMIT ASSESSMENT ✦
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* 3. Finished State */}
                    {testState === 'finished' && (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <div className="mb-12 md:mb-20">
                                <div className="sticker sticker-mint mb-6 md:mb-8 text-[10px]">Assessment Finalized ✦</div>
                                <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-[0.8] mb-6 md:mb-10">
                                    Mission Placements <br />
                                    <span className="text-secondary italic font-serif normal-case">Accomplished</span>
                                </h1>
                                <p className="text-foreground/60 dark:text-foreground/60 font-serif italic text-lg md:text-xl leading-relaxed">
                                    Your results have been synced with the Mission Placements Control backend. Detailed breakdown will be available in your dashboard.
                                </p>
                            </div>

                            {result && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20 text-center">
                                    <div className="p-6 md:p-10 bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl md:rounded-3xl shadow-md">
                                        <div className="text-[7px] md:text-[8px] uppercase font-black tracking-[0.1em] md:tracking-widest text-foreground/60 dark:text-white/20 mb-2 md:mb-4">Accuracy</div>
                                        <div className="text-3xl md:text-4xl font-display text-emerald-600 dark:text-emerald-500 tracking-tighter uppercase">{result.accuracy}%</div>
                                    </div>
                                    <div className="p-6 md:p-10 bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl md:rounded-3xl shadow-md">
                                        <div className="text-[7px] md:text-[8px] uppercase font-black tracking-[0.1em] md:tracking-widest text-foreground/60 dark:text-white/20 mb-2 md:mb-4">Cognitive Speed</div>
                                        <div className="text-3xl md:text-4xl font-display text-blue-600 dark:text-blue-500 tracking-tighter uppercase">{result.speed}</div>
                                    </div>
                                    <div className="p-6 md:p-10 bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl md:rounded-3xl shadow-md font-bold">
                                        <div className="text-[7px] md:text-[8px] uppercase font-black tracking-[0.1em] md:tracking-widest text-foreground/60 dark:text-white/20 mb-2 md:mb-4">Rank Delta</div>
                                        <div className="text-3xl md:text-4xl font-display text-primary tracking-tighter uppercase">+{result.rankDelta}</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                                <Link href="/portal/student" className="w-full sm:w-auto">
                                    <Button className="w-full h-14 md:h-16 px-8 md:px-12 bg-primary text-primary-foreground font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none">
                                        BACK TO DASHBOARD ✦
                                    </Button>
                                </Link>
                                <Button onClick={() => setTestState('discovery')} variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 border-border dark:border-white/10 text-foreground dark:text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none hover:bg-accent dark:hover:bg-white/5">
                                    START ANOTHER SERIES
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            {/* Footer Industrial Disclaimer */}
            <footer className="py-12 md:py-20 border-t border-border dark:border-white/5 text-center px-4 md:px-6 opacity-40 dark:opacity-20">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.5em] text-foreground dark:text-white">
                    DATA-DRIVEN SUCCESS • CSE DATA SCIENCE SPECIALIZATION • MISSION PLACEMENTS
                </p>
            </footer>
        </div>
    );
}
