
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    Map,
    Target,
    Code,
    Terminal,
    Briefcase,
    CheckCircle2,
    ChevronRight,
    Sparkles,
    Zap,
    Globe,
    Stars,
    Search,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function RoadmapPage() {
    const roadmapSteps = [
        {
            phase: "Phase 01",
            title: "Foundational Logic",
            duration: "Week 1-2",
            description: "Mastering Quantitative Aptitude and Logical Reasoning basics. The core filter for most MNCs.",
            items: ["Number Systems & HCF/LCM", "Ratios & Proportions", "Syllogisms & Direction Sense", "Data Interpretation"],
            icon: <Target className="w-6 h-6" />,
            color: "border-emerald-500/30",
            accent: "bg-emerald-500"
        },
        {
            phase: "Phase 02",
            title: "Algorithmic Thinking",
            duration: "Week 3-5",
            description: "Shifting focus to Data Structures and core programming logic. Essential for Technical Rounds.",
            items: ["Array & String Operations", "Linked Lists & Stacks", "Searching & Sorting", "Time Complexity Analysis"],
            icon: <Code className="w-6 h-6" />,
            color: "border-blue-500/30",
            accent: "bg-blue-500"
        },
        {
            phase: "Phase 03",
            title: "Technical Specialization",
            duration: "Week 6-8",
            description: "Deep dive into DBMS, OS, and OOPS concepts. Typical interview questions for service-based MNCs.",
            items: ["SQL Queries & Joins", "Threads & Process Mgmt", "OOPS Pillars in Java/C++", "Computer Networks"],
            icon: <Terminal className="w-6 h-6" />,
            color: "border-purple-500/30",
            accent: "bg-purple-500"
        },
        {
            phase: "Phase 04",
            title: "The Polish Round",
            duration: "Week 9-10",
            description: "Soft skills, HR Mock interviews, and Resume building. Bridging the gap to the offer letter.",
            items: ["Self Introduction Script", "Situation Analysis (STAR)", "Resume Optimization", "Mock HR Interviews"],
            icon: <Briefcase className="w-6 h-6" />,
            color: "border-pink-500/30",
            accent: "bg-pink-500"
        },
        {
            phase: "Final",
            title: "Direct Placement Connect",
            duration: "On-Going",
            description: "Real-world test series mimicking TCS, Infosys, and Wipro patterns with collective reviews.",
            items: ["Live MNC Mock Tests", "Peer Review Sessions", "Company Specific Prep", "Direct Portal Access"],
            icon: <Sparkles className="w-6 h-6" />,
            color: "border-primary/30",
            accent: "bg-primary"
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">

            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Header */}
            <header className="pt-8 px-6 pb-12 md:pb-20 sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b border-border dark:border-white/5">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-accent dark:bg-white/10 border border-border dark:border-white/20">
                                <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                            </div>
                            <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements</span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
                            <Link href="/roadmap" className="text-primary flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                Roadmap
                            </Link>
                        </nav>

                        <div className="flex items-center gap-2 md:gap-4">
                            <ModeToggle />
                            <Link href="/portal/student" className="hidden sm:block">
                                <Button size="sm" className="bg-primary text-primary-foreground font-bold h-10 px-6 rounded-full text-[10px] uppercase tracking-widest ml-0 md:ml-4">
                                    Student Portal
                                </Button>
                            </Link>

                            <div className="lg:hidden">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Menu className="w-5 h-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="top" className="bg-background/95 backdrop-blur-xl border-border">
                                        <nav className="flex flex-col items-center gap-6 py-12">
                                            <Link href="/" className="text-lg font-display uppercase tracking-widest">Home</Link>
                                            <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest text-primary">Roadmap</Link>
                                            <Link href="/achievements" className="text-lg font-display uppercase tracking-widest">Wall of Fame</Link>
                                            <Link href="/success-stories" className="text-lg font-display uppercase tracking-widest">Stories</Link>
                                            <Link href="/resources" className="text-lg font-display uppercase tracking-widest">Resources</Link>
                                            <Link href="/portal/student">
                                                <Button className="bg-primary text-primary-foreground font-bold h-12 px-8 rounded-full text-xs uppercase tracking-widest mt-4">
                                                    Portal Login
                                                </Button>
                                            </Link>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20 pb-40">

                {/* Hero Section */}
                <section className="mb-20 md:mb-40">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="sticker sticker-yellow mb-8 text-[10px]"
                        >
                            The Strategic Blueprint
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-7xl sm:text-8xl md:text-[9vw] font-display uppercase leading-[0.8] tracking-tighter mb-8 md:mb-12"
                        >
                            MNC Prep <br />
                            <span className="text-gradient-primary italic font-serif normal-case">Roadmap</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-2xl text-lg md:text-xl text-foreground/60 dark:text-foreground/60 font-serif leading-relaxed italic"
                        >
                            "Preparing for placements isn't about working hard; it's about working consistently relative to industry expectations."
                        </motion.p>
                    </div>
                </section>

                {/* Visual Timeline Section */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden lg:block" />

                    <div className="space-y-20 md:space-y-32 relative">
                        {roadmapSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 md:gap-16`}
                            >
                                {/* Visual Icon/Phase Side */}
                                <div className="flex-1 flex justify-center lg:justify-end">
                                    <div className={`relative ${i % 2 !== 0 ? 'lg:order-last' : ''}`}>
                                        <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[2rem] md:rounded-[3rem] border ${step.color} bg-card dark:bg-black/40 flex items-center justify-center relative group shadow-lg`}>
                                            <div className={`absolute inset-4 rounded-xl md:rounded-[2rem] ${step.accent} opacity-10 md:opacity-5 group-hover:opacity-20 transition-opacity`} />
                                            {step.icon}

                                            {/* Connection Point */}
                                            <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-8 h-px bg-border dark:bg-white/10 hidden lg:block" />
                                        </div>
                                        <div className="mt-4 md:mt-6 text-center lg:text-right">
                                            <span className="font-display uppercase text-3xl md:text-4xl tracking-tighter text-foreground/30 dark:text-white/20 whitespace-nowrap">{step.phase}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 px-4 lg:pl-16 lg:pr-16 text-center lg:text-left">
                                    <div className="inline-block py-1 px-4 glass border-white/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary mb-4 md:mb-6">
                                        {step.duration}
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-foreground dark:text-white mb-4 md:mb-6 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-foreground/60 dark:text-foreground/60 font-serif italic mb-6 md:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        {step.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-foreground/70 dark:text-white/60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                <span className="text-left">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <section className="mt-40 md:mt-60 relative px-4 md:px-0">
                    <div className="glass-dark border border-white/10 rounded-3xl md:rounded-[3rem] p-8 md:p-32 text-center overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-primary/10 md:bg-primary/5 blur-2xl md:blur-3xl rounded-full translate-y-1/2 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase tracking-tighter mb-6 md:mb-10">
                                Ready to begin <br className="hidden sm:block" />
                                your <span className="text-primary italic font-serif normal-case">Journey?</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 dark:text-foreground/60 font-serif italic mb-10 md:mb-16 leading-relaxed">
                                Start from Phase 01 today. Consistency is the only metric that matters in the Mission Placements ecosystem.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                                <Button className="h-14 md:h-16 px-8 md:px-12 bg-primary text-primary-foreground font-black uppercase text-[10px] sm:text-xs tracking-widest rounded-none hover:bg-primary/90 w-full sm:w-auto">
                                    START PHASE 01 ✦
                                </Button>
                                <Button variant="outline" className="h-14 md:h-16 px-8 md:px-12 border-border dark:border-white/10 text-foreground dark:text-white font-black uppercase text-[10px] sm:text-xs tracking-widest rounded-none hover:bg-accent dark:hover:bg-white/5 w-full sm:w-auto">
                                    VIEW STUDY TRACKER
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="py-12 md:py-20 px-6 border-t border-border dark:border-white/5 opacity-80 md:opacity-40 hover:opacity-100 transition-opacity">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <span className="font-display text-2xl uppercase tracking-tighter text-gradient-primary">Mission Placements</span>
                    </div>
                    <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] flex gap-6 md:gap-8 justify-center">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Help</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
