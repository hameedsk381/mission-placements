"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Target,
    Code,
    Cpu,
    Award,
    Flame,
    ChevronRight,
    CheckCircle2,
    Trophy,
    History,
    Layout,
    Zap,
    Menu,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { getStudentData } from "@/app/actions/student";

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getStudentData();
                setStudentData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    const metrics = studentData?.metrics || {
        globalRank: 0,
        successRate: 0,
        problemsSolved: 0,
        studyHours: 0
    };

    const stats = [
        { label: "Prep Streak", value: "12 Days", icon: <Flame className="w-5 h-5 text-orange-500" />, sub: "Consistent focus" },
        { label: "Problems Solved", value: metrics.problemsSolved, icon: <Target className="w-5 h-5 text-emerald-500" />, sub: "Across all topics" },
        { label: "Success Rate", value: `${metrics.successRate}%`, icon: <Code className="w-5 h-5 text-blue-500" />, sub: "v1.2 proficiency" },
        { label: "Global Rank", value: `#${metrics.globalRank}`, icon: <Trophy className="w-5 h-5 text-amber-500" />, sub: "Peer placement" },
    ];

    const initiatives = [
        { name: "Aptitude & Reasoning", progress: Math.min(100, (metrics.problemsSolved / 500) * 100), color: "bg-emerald-500", icon: <Target className="w-4 h-4" /> },
        { name: "Technical Logic", progress: Math.min(100, metrics.successRate), color: "bg-blue-500", icon: <Code className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground pb-12 md:pb-20">
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Dashboard Header */}
            <header className="pt-8 px-4 md:px-6 border-b border-border dark:border-white/10 pb-6 md:pb-8 bg-background/80 dark:bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/" className="flex items-center gap-2 md:gap-3 pr-4 md:pr-6 border-r border-border dark:border-white/10 group">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-accent dark:bg-white/10 border border-border dark:border-white/20">
                                <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                            </div>
                            <span className="font-display uppercase tracking-tighter text-lg md:text-xl text-gradient-primary">Mission Placements</span>
                        </Link>
                        <div className="flex items-center gap-3 md:gap-4">
                            <Avatar className="h-6 w-6 md:h-8 md:w-8 border border-border dark:border-white/10">
                                <AvatarFallback className="bg-primary/20 text-primary text-[8px] md:text-[10px] font-bold">
                                    {studentData?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                                <div className="text-foreground dark:text-white">{studentData?.name}</div>
                                <div className="text-foreground/70 dark:text-foreground/60">{studentData?.role}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <nav className="hidden lg:flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
                            <Link href="/portal/student" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 underline underline-offset-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Dashboard
                            </Link>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-full border-border dark:border-white/10 text-[9px] px-5 hover:bg-accent dark:hover:bg-white/5 text-foreground dark:text-white"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Logout
                            </Button>
                        </nav>

                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-8 md:py-16 max-w-7xl">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
                    <div className="max-w-2xl">
                        <div className="sticker sticker-mint mb-4 md:mb-6 text-[9px] md:text-[10px]">Academic Pulse v2.1</div>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display uppercase tracking-tighter leading-[0.8] mb-4 md:mb-6">
                            Leveling <br />
                            <span className="text-gradient-primary italic font-serif normal-case">Collectively</span>
                        </h1>
                        <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg">
                            "Success is not a destination, but a consistent habit of exploration."
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <Link href="/portal/test" className="w-full sm:w-auto">
                            <Button className="w-full bg-primary text-primary-foreground font-black uppercase text-[9px] md:text-[10px] tracking-widest h-12 md:h-14 px-6 md:px-8 rounded-none flex items-center justify-center gap-2 md:gap-3 group">
                                DAILY MOCK TEST <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="glass-dark border-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden hover:bg-primary/[0.05] transition-all group shadow-2xl">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex items-center justify-between mb-4 text-foreground/70 dark:text-foreground/60">
                                        <div className="p-2 bg-accent dark:bg-white/5 border border-border dark:border-white/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            {stat.icon}
                                        </div>
                                        <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-display uppercase tracking-tighter mb-1 text-foreground dark:text-white group-hover:text-primary transition-colors">
                                        {stat.value}
                                    </div>
                                    <div className="text-[8px] md:text-[10px] text-foreground/60 dark:text-white/20 font-bold uppercase tracking-widest">
                                        {stat.sub}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Progress Chart */}
                    <div className="lg:col-span-2">
                        <Card className="glass border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] relative p-6 md:p-10 h-full">
                            <div className="flex items-start justify-between mb-8 md:mb-12">
                                <div>
                                    <h3 className="font-display uppercase text-xl md:text-2xl tracking-tighter text-foreground dark:text-white mb-1">Initiative Progress</h3>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/60 dark:text-white/20 italic">Monthly Readiness breakdown</p>
                                </div>
                                <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-xl md:rounded-full bg-accent dark:bg-white/5 border border-border dark:border-white/10 shrink-0">
                                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-10">
                                {initiatives.map((init, i) => (
                                    <div key={i} className="space-y-3 md:space-y-4">
                                        <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-widest">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className={`p-1.5 rounded-md ${init.color}/20 text-foreground/60 dark:text-white/60`}>{init.icon}</div>
                                                <span className="text-foreground dark:text-white truncate max-w-[150px] sm:max-w-none">{init.name}</span>
                                            </div>
                                            <span className="text-foreground/70 dark:text-foreground/60">{Math.round(init.progress)}%</span>
                                        </div>
                                        <div className="h-1.5 md:h-2 w-full bg-accent dark:bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${init.progress}%` }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                className={`h-full ${init.color} relative shadow-[0_0_20px_rgba(16,185,129,0.3)]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-border dark:border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center text-[9px] uppercase font-bold tracking-[0.2em]">
                                <div>
                                    <div className="text-foreground dark:text-white mb-2">Total Practice</div>
                                    <div className="text-foreground/70 dark:text-foreground/60">{metrics.studyHours} Hours</div>
                                </div>
                                <div className="sm:border-x border-border dark:border-white/5 pt-6 sm:pt-0 border-t sm:border-t-0">
                                    <div className="text-foreground dark:text-white mb-2">Solved</div>
                                    <div className="text-foreground/70 dark:text-foreground/60">{metrics.problemsSolved} Qs</div>
                                </div>
                                <div className="pt-6 sm:pt-0 border-t border-border dark:border-white/5 sm:border-t-0">
                                    <div className="text-foreground dark:text-white mb-2">Rank</div>
                                    <div className="text-primary">#{metrics.globalRank}</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-1">
                        <Card className="bg-card dark:bg-black/40 border border-border dark:border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-lg">
                            <CardHeader className="p-6 md:p-10 border-b border-border dark:border-white/5">
                                <div className="flex items-center gap-2 md:gap-3 text-primary mb-1 md:mb-2">
                                    <History className="w-3 h-3 md:w-4 md:h-4" />
                                    <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest underline decoration-wavy">Activity Log</span>
                                </div>
                                <CardTitle className="font-display uppercase text-xl md:text-2xl">Recent Prep</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-1">
                                <div className="divide-y divide-border dark:divide-white/5">
                                    {studentData?.submissions?.length > 0 ? (
                                        studentData.submissions.map((sub: any, i: number) => (
                                            <div key={sub.id} className="p-6 md:p-8 hover:bg-accent dark:hover:bg-white/[0.02] transition-colors group">
                                                <div className="flex gap-4 md:gap-6 items-start">
                                                    <div className="mt-0.5 md:mt-1 h-8 w-8 rounded-xl bg-accent dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-widest text-foreground dark:text-white group-hover:text-primary transition-colors mb-1">
                                                            Attempted {sub.test.title}
                                                        </div>
                                                        <div className="text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-foreground/60 dark:text-white/30 mb-1 md:mb-2 font-medium">
                                                            Score: {sub.score.toFixed(1)}%
                                                        </div>
                                                        <div className="text-[7px] md:text-[8px] uppercase tracking-widest text-foreground/30 dark:text-white/10 italic">
                                                            {new Date(sub.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center opacity-20 uppercase font-black tracking-widest text-[10px]">No recent activity</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <footer className="container mx-auto px-4 md:px-6 mt-12 md:mt-20 text-center opacity-40 dark:opacity-20">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.5em] pb-8 md:pb-10 text-foreground dark:text-white">
                    BUILDING A SMARTER CAMPUS • DEPT OF CSE DATA SCIENCE • MISSION PLACEMENTS
                </p>
            </footer>
        </div>
    );
}
