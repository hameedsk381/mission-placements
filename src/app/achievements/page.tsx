
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    TrendingUp,
    Award,
    Trophy,
    Medal,
    Star,
    Zap,
    Flame,
    Target,
    Code,
    Globe,
    ChevronRight,
    Sparkles,
    Crown,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AchievementWall() {
    const topPerformers = [
        { name: "Rahul S.", rank: 2, score: 9840, avatar: "/avatars/rahul.jpg", color: "text-zinc-400", bg: "bg-zinc-100", label: "Silver" },
        { name: "Ananya M.", rank: 1, score: 10250, avatar: "/avatars/ananya.jpg", color: "text-amber-400", bg: "bg-amber-400/20", label: "Gold", crown: true },
        { name: "Kiran K.", rank: 3, score: 9620, avatar: "/avatars/kiran.jpg", color: "text-orange-500", bg: "bg-orange-500/10", label: "Bronze" },
    ];

    const categories = [
        { title: "Aptitude Titans", icon: <Target className="w-5 h-5" />, color: "border-blue-500/30", text: "Highest accuracy in quantitative reasoning." },
        { title: "Code Warriors", icon: <Code className="w-5 h-5" />, color: "border-emerald-500/30", text: "Excellence in DSA and complex problem solving." },
        { title: "Tech Visionaries", icon: <Globe className="w-5 h-5" />, color: "border-pink-500/30", text: "Core CS knowledge and OS/DB mastery." },
    ];

    const leaderboard = [
        { rank: 1, name: "Ananya M.", streak: 54, accuracy: "98%", score: 10250, badge: "Grandmaster" },
        { rank: 2, name: "Rahul S.", streak: 42, accuracy: "95%", score: 9840, badge: "Expert" },
        { rank: 3, name: "Kiran K.", streak: 38, accuracy: "92%", score: 9620, badge: "Expert" },
        { rank: 4, name: "Sneha P.", streak: 45, accuracy: "91%", score: 8900, badge: "Consistent" },
        { rank: 5, name: "Vijay R.", streak: 30, accuracy: "89%", score: 8550, badge: "Rising Star" },
        { rank: 6, name: "Divya L.", streak: 28, accuracy: "88%", score: 8200, badge: "Rising Star" },
        { rank: 7, name: "Arjun T.", streak: 20, accuracy: "94%", score: 7900, badge: "Sharp Shooter" },
    ];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Header */}
            <header className="pt-8 px-6 pb-20">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20">
                                <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                            </div>
                            <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements</span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link>
                            <Link href="/portal/test" className="hover:text-primary transition-colors">Mock Tests</Link>
                            <Link href="/achievements" className="text-foreground dark:text-white transition-colors underline decoration-primary underline-offset-8">Wall of Fame</Link>
                            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
                        </nav>
                        <div className="flex items-center gap-2 md:gap-4">
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
                                            <Link href="/" className="text-lg font-display uppercase tracking-widest">Home</Link>
                                            <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest">Roadmap</Link>
                                            <Link href="/portal/test" className="text-lg font-display uppercase tracking-widest">Mock Tests</Link>
                                            <Link href="/achievements" className="text-lg font-display uppercase tracking-widest text-primary">Wall of Fame</Link>
                                            <Link href="/resources" className="text-lg font-display uppercase tracking-widest">Resources</Link>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="sticker sticker-mint mb-6 text-[10px]">Academic Excellence • 2025-26</div>
                            <h1 className="text-7xl sm:text-8xl md:text-[9vw] font-display uppercase leading-[0.8] tracking-tighter">
                                Hall of <br />
                                <span className="text-primary italic font-serif normal-case">Fame</span>
                            </h1>
                        </div>
                        <div className="md:mb-4">
                            <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg max-w-sm mt-6 md:mt-0">
                                "Celebrating the top 1% of preppers who lead the charge in consistency and technical mastery."
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pb-40">

                {/* Podium - Top 3 */}
                <section className="mb-40 pt-20">
                    <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 h-full md:h-[600px]">
                        {topPerformers.map((performer, i) => (performer.rank === 2 || performer.rank === 3) && (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex-1 w-full max-w-xs group"
                            >
                                <div className="text-center mb-6">
                                    <Avatar className="w-20 h-20 md:w-24 md:h-24 mx-auto border-4 border-border dark:border-white/5 group-hover:border-primary/50 transition-all mb-4">
                                        <AvatarFallback className="bg-accent dark:bg-white/5 text-2xl font-display">{performer.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-display uppercase text-xl md:text-2xl tracking-tighter">{performer.name}</h3>
                                    <p className="text-primary text-[10px] uppercase font-bold tracking-widest">{performer.label} Tier</p>
                                </div>
                                <div className={`h-[${performer.rank === 2 ? '250px md:300px' : '200px md:220px'}] bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-t-[2rem] md:rounded-t-[3rem] p-6 md:p-8 flex flex-col justify-between items-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none" />
                                    <div className="text-center relative z-10">
                                        <div className={`text-4xl md:text-6xl font-display uppercase italic ${performer.color}`}>#{performer.rank}</div>
                                    </div>
                                    <div className="text-center relative z-10 w-full pt-4 md:pt-0">
                                        <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/30 dark:text-white/20 mb-1">Total Score</div>
                                        <div className="text-3xl md:text-4xl font-display tracking-tighter">{performer.score}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Gold Center Piece */}
                        {topPerformers.find(p => p.rank === 1) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                className="flex-1 w-full max-w-xs group relative z-20"
                            >
                                <div className="text-center mb-10">
                                    <div className="relative inline-block">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 4 }}
                                            className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2"
                                        >
                                            <Crown className="w-8 h-8 md:w-10 md:h-10 text-amber-400 fill-amber-400/20" />
                                        </motion.div>
                                        <Avatar className="w-28 h-28 md:w-32 md:h-32 mx-auto border-4 border-amber-400 group-hover:scale-105 transition-all mb-4 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                                            <AvatarFallback className="bg-amber-400/10 text-3xl font-display text-amber-400">A</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tighter text-amber-400">Ananya M.</h3>
                                    <p className="text-amber-400/60 text-[9px] md:text-[10px] uppercase font-black tracking-widest">Grandmaster ✦ Rank 01</p>
                                </div>
                                <div className="h-[300px] md:h-[400px] bg-amber-400/5 border-2 border-amber-400/20 rounded-t-[2rem] md:rounded-t-[3rem] p-6 md:p-10 flex flex-col justify-between items-center relative overflow-hidden shadow-[0_-20px_100px_rgba(251,191,36,0.05)]">
                                    <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
                                    <div className="text-center relative z-10">
                                        <div className="text-6xl md:text-8xl font-display uppercase italic text-amber-400">#1</div>
                                        <div className="sticker sticker-amber text-[9px] mt-2">Plat Elite</div>
                                    </div>
                                    <div className="text-center relative z-10 w-full pt-4 md:pt-0">
                                        <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-amber-400/40 mb-1">Total Score</div>
                                        <div className="text-4xl md:text-5xl font-display tracking-tighter text-amber-400">10250</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Categories Section */}
                <section className="mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <Card key={i} className={`bg-card dark:bg-white/5 border ${cat.color} rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 group hover:bg-accent dark:hover:bg-white/[0.08] transition-all`}>
                                <div className="h-12 w-12 rounded-2xl bg-accent dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <h4 className="font-display uppercase text-xl md:text-2xl tracking-tighter mb-4">{cat.title}</h4>
                                <p className="text-foreground/60 dark:text-foreground/60 font-serif italic text-base md:text-lg leading-relaxed mb-8">"{cat.text}"</p>
                                <Button variant="ghost" className="p-0 text-[10px] uppercase font-black tracking-widest text-primary hover:bg-transparent items-center gap-2">
                                    VIEW CATEGORY RANKINGS <ChevronRight className="w-4 h-4" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Global Leaderboard */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="font-display uppercase text-4xl md:text-5xl tracking-tighter">Global Rankings</h2>
                            <p className="text-foreground/60 dark:text-white/20 uppercase text-[9px] md:text-[10px] font-black tracking-widest mt-2">Real-time ecosystem leaderboard</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="outline" className="border-border dark:border-white/10 text-[9px] uppercase tracking-widest px-6 h-12 hover:bg-accent dark:hover:bg-white/5">Export v1.0</Button>
                            <Button className="bg-primary text-primary-foreground text-[9px] uppercase tracking-widest px-8 h-12 font-black">Join Rankings</Button>
                        </div>
                    </div>

                    <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden overflow-x-auto">
                        <Table className="min-w-[700px]">
                            <TableHeader className="bg-accent/50 dark:bg-white/5 border-b border-border dark:border-white/10">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-16 md:w-20 text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16 text-center">Rank</TableHead>
                                    <TableHead className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16">Student</TableHead>
                                    <TableHead className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16">Streak</TableHead>
                                    <TableHead className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16">Accuracy</TableHead>
                                    <TableHead className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16">Status</TableHead>
                                    <TableHead className="text-right text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-foreground/60 h-16 pr-6 md:pr-10">Total Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaderboard.map((student) => (
                                    <TableRow key={student.rank} className="border-b border-border dark:border-white/5 hover:bg-accent dark:hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="font-display italic text-xl md:text-2xl text-center py-6 md:py-8 opacity-40 md:opacity-20 group-hover:opacity-100 transition-opacity">
                                            {String(student.rank).padStart(2, '0')}
                                        </TableCell>
                                        <TableCell className="py-6 md:py-8">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <Avatar className="w-8 h-8 md:w-10 md:h-10 border border-border dark:border-white/10 shrink-0">
                                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="truncate">
                                                    <div className="font-display uppercase tracking-widest text-sm truncate">{student.name}</div>
                                                    <div className="text-[9px] uppercase font-bold text-foreground/60 dark:text-white/20 whitespace-nowrap">CSE-DS • Year 03</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 md:py-8">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                                                <span className="text-sm font-bold">{student.streak} Days</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 md:py-8">
                                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 text-[9px] md:text-[10px] uppercase tracking-widest font-black whitespace-nowrap">
                                                {student.accuracy} Acc
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-6 md:py-8">
                                            <div className="text-[9px] uppercase font-black tracking-[0.1em] md:tracking-[0.2em] text-foreground/60 dark:text-foreground/60 group-hover:text-primary transition-colors whitespace-nowrap">
                                                {student.badge}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-display text-xl md:text-2xl tracking-tighter py-6 md:py-8 pr-6 md:pr-10">
                                            {student.score.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </section>

                {/* Global Pulse Marquee */}
                <section className="mt-20 md:mt-40 overflow-hidden py-10 border-y border-border dark:border-white/5 bg-accent/30 dark:bg-white/[0.01]">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        className="flex whitespace-nowrap gap-20 items-center"
                    >
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 md:gap-8">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                    <span className="font-display uppercase text-lg md:text-2xl tracking-tighter">Recent Milestone: ARJUN T. earned "Sharp Shooter" Badge</span>
                                </div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground/20 dark:bg-white/10" />
                                <div className="flex items-center gap-3 md:gap-4">
                                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                                    <span className="font-display uppercase text-lg md:text-2xl tracking-tighter">Leaderboard update: ANANYA M. crossed 10k points</span>
                                </div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground/20 dark:bg-white/10" />
                            </div>
                        ))}
                    </motion.div>
                </section>

            </main>

            {/* Footer Industrial Disclaimer */}
            <footer className="py-12 md:py-20 border-t border-border dark:border-white/5 text-center px-6">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.5em] text-foreground/60 dark:text-white/20">
                    POWERED BY CONSISTENT PREPARATION • STUDENT LEADERBOARD v1.0 • MISSION PLACEMENTS
                </p>
            </footer>
        </div>
    );
}
