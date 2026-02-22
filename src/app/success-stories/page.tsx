"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Quote,
    Building2,
    ChevronRight,
    Sparkles,
    Award,
    Calendar,
    Users,
    Menu
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSuccessStories, type SuccessStory } from "@/app/actions/stories";

export default function SuccessStoriesPage() {
    const [filter, setFilter] = useState("All");
    const [dbStories, setDbStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStories() {
            try {
                const data = await getSuccessStories();
                setDbStories(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadStories();
    }, []);

    const filteredStories = filter === "All" ? dbStories : dbStories.filter(s => s.company === filter);

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
                            <Link href="/portal/student" className="hover:text-primary transition-colors">Dashboard</Link>
                            <Link href="/success-stories" className="text-foreground dark:text-white transition-colors underline decoration-primary underline-offset-8">Stories</Link>
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
                                            <Link href="/portal/student" className="text-lg font-display uppercase tracking-widest">Dashboard</Link>
                                            <Link href="/success-stories" className="text-lg font-display uppercase tracking-widest text-primary">Success Stories</Link>
                                            <Link href="/resources" className="text-lg font-display uppercase tracking-widest">Resources</Link>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="sticker sticker-pink mb-6 text-[10px]">The Success Archive v2025</div>
                            <h1 className="text-7xl sm:text-8xl md:text-[8vw] font-display uppercase leading-[0.8] tracking-tighter">
                                Placement <br />
                                <span className="text-secondary italic font-serif normal-case">Chronicles</span>
                            </h1>
                        </div>
                        <div className="md:mb-4 mt-6 md:mt-0">
                            <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg max-w-sm">
                                "Real stories of perseverance and strategy. Learn from those who have successfully navigated the prep journey."
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pb-40">

                {/* Filtering & Stats */}
                <section className="mb-12 md:mb-20">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {["All", "TCS", "Infosys", "Cognizant", "Wipro"].map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => setFilter(btn)}
                                    className={`px-4 md:px-6 h-8 md:h-10 rounded-full text-[9px] uppercase font-black tracking-widest border transition-all ${filter === btn ? 'bg-primary border-primary text-primary-foreground' : 'border-border dark:border-white/10 text-foreground/60 dark:text-foreground/60 hover:border-foreground/30 dark:hover:border-white/30'}`}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-6 md:gap-8 text-foreground/60 dark:text-white/20">
                            <div className="flex items-center gap-2 border-r border-border dark:border-white/10 pr-6">
                                <Users className="w-4 h-4" />
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">250+ Placed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">15+ MNCs</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stories Grid */}
                {loading ? (
                    <div className="py-40 text-center uppercase font-black tracking-widest opacity-20 text-xs">Loading Chronicles...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredStories.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className={`bg-card dark:bg-white/5 border-2 border-border rounded-[2rem] md:rounded-[3rem] overflow-hidden group hover:bg-accent dark:hover:bg-white/[0.08] transition-all h-full shadow-lg`}>
                                    <CardContent className="p-8 md:p-14 flex flex-col md:flex-row gap-8 items-start">
                                        <div className="shrink-0 relative">
                                            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-border dark:border-white/5">
                                                <AvatarFallback className="text-xl font-display">{story.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 md:p-2 rounded-lg md:rounded-xl">
                                                <Award className="w-3 h-3 md:w-4 md:h-4" />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tighter">{story.name}</h3>
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-primary mt-1">{story.role} @ {story.company}</p>
                                                </div>
                                                <div className="sm:text-right">
                                                    <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-foreground/60 dark:text-white/20">Package</div>
                                                    <div className="text-xl font-display text-foreground dark:text-white">{story.ctc}</div>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <Quote className="w-6 h-6 md:w-8 md:h-8 text-foreground/5 dark:text-white/5 absolute -top-3 md:-top-4 -left-3 md:-left-4" />
                                                <p className="text-foreground/70 dark:text-white/60 font-serif italic text-lg md:text-xl leading-relaxed relative z-10 w-full md:pr-4">
                                                    "{story.quote}"
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-4">
                                                {story.tags.map((tag: string, j: number) => (
                                                    <Badge key={j} variant="outline" className="bg-accent dark:bg-white/5 border-border dark:border-white/10 text-[8px] uppercase tracking-widest px-3 py-1 text-foreground/70 dark:text-foreground/60">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                <Badge variant="outline" className="bg-accent dark:bg-white/5 border-border dark:border-white/10 text-[8px] uppercase tracking-widest px-3 py-1 text-foreground/70 dark:text-foreground/60 flex items-center gap-1">
                                                    <Calendar className="w-2 h-2" /> Class of {story.batch}
                                                </Badge>
                                            </div>

                                            <Button variant="ghost" className="p-0 text-[10px] uppercase font-black tracking-[0.2em] md:tracking-[0.3em] text-foreground/60 dark:text-white/20 hover:text-foreground dark:hover:text-white items-center gap-2 group-hover:gap-4 transition-all pt-4">
                                                READ FULL CASE STUDY <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Community Callout */}
                <section className="mt-20 md:mt-40">
                    <div className="bg-primary/5 dark:bg-primary/5 border border-primary/20 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[300px] bg-primary/5 dark:bg-primary/10 blur-[100px] md:blur-[120px] pointer-events-none rounded-full" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-6 md:mb-10 opacity-60" />
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9] mb-6 md:mb-10">
                                Your Path is Being <br className="hidden md:block" /> <span className="text-primary italic font-serif normal-case">Forged</span>.
                            </h2>
                            <p className="text-foreground/70 dark:text-white/60 font-serif italic text-lg md:text-xl mb-10 md:mb-12 px-4 md:px-0">
                                The preparation metrics you see today are the success stories of tomorrow. Follow the roadmap, trust the process, and your Chronicle will be next.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4 md:px-0">
                                <Link href="/roadmap" className="w-full md:w-auto">
                                    <Button className="w-full h-14 md:h-16 px-8 md:px-12 bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-widest rounded-none hover:bg-primary/90">
                                        VIEW THE ROADMAP ✦
                                    </Button>
                                </Link>
                                <Link href="/resources" className="w-full md:w-auto">
                                    <Button variant="outline" className="w-full h-14 md:h-16 px-8 md:px-12 border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest rounded-none hover:bg-primary/5 bg-background/50 dark:bg-transparent backdrop-blur-sm">
                                        ACCESS STUDY RESOURCES
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="py-12 md:py-20 border-t border-border dark:border-white/5 text-center px-6 grayscale">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.5em] text-foreground/60 dark:text-white/20">
                    DOCUMENTING EXCELLENCE • CSE DATA SCIENCE ECOSYSTEM • MISSION PLACEMENTS
                </p>
            </footer>
        </div>
    );
}
