
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
    ArrowRight,
    TrendingUp,
    Search,
    Download,
    FileText,
    Terminal,
    PlayCircle,
    BookMarked,
    Sparkles,
    ChevronRight,
    Filter,
    Menu
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { getResources } from "@/app/actions/resources";
import { useEffect, useState } from "react";

export default function ResourcesPage() {
    const [dbResources, setDbResources] = useState<any[]>([]);

    useEffect(() => {
        async function loadResources() {
            const data = await getResources();
            setDbResources(data);
        }
        loadResources();
    }, []);

    const categories = [
        { id: "all", label: "All Resources" },
        { id: "aptitude", label: "Aptitude" },
        { id: "coding", label: "Coding" },
        { id: "interview", label: "Interview" },
        { id: "tech", label: "Tech Updates" },
        { id: "academics", label: "Academics" },
    ];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">

            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Header / Nav Section */}
            <header className="pt-8 px-6 pb-12 md:pb-20">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20">
                                <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                            </div>
                            <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements</span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/resources" className="text-foreground dark:text-white underline decoration-primary underline-offset-8">Resources</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Dashboard</Link>
                        </nav>

                        <div className="flex items-center gap-2 md:gap-4">
                            <ModeToggle />
                            <Link href="/portal/student" className="hidden sm:block">
                                <Button size="sm" className="bg-primary text-primary-foreground font-bold h-10 px-6 rounded-full text-[10px] uppercase tracking-widest ml-0 md:ml-4">
                                    Portal Login
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
                                            <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest">Roadmap</Link>
                                            <Link href="/achievements" className="text-lg font-display uppercase tracking-widest">Wall of Fame</Link>
                                            <Link href="/resources" className="text-lg font-display uppercase tracking-widest text-primary">Resources</Link>
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

                    <Breadcrumb className="mb-8">
                        <BreadcrumbList className="text-foreground/60 dark:text-foreground/60 uppercase text-[9px] font-bold tracking-widest">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-foreground dark:text-white">Student Resources</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="sticker sticker-pink mb-6 text-[10px]">Knowledge Repository</div>
                            <h1 className="text-7xl sm:text-8xl md:text-[8vw] font-display uppercase leading-[0.8] tracking-tighter">
                                Student <br />
                                <span className="text-primary italic font-serif normal-case">Resources</span>
                            </h1>
                        </div>
                        <div className="md:mb-4 pr-12 md:pr-0">
                            <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg max-w-sm">
                                "A centralized digital repository of study materials, practice questions, and peer-reviewed guides."
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Catalog Section */}
            <main className="container mx-auto px-6 pb-40">

                {/* Search & Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-12 items-center">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 dark:text-white/20" />
                        <Input
                            placeholder="SEARCH FOR TOPICS, TOOLS, OR GUIDES..."
                            className="bg-accent/50 dark:bg-white/5 border-border dark:border-white/10 h-14 md:h-16 pl-12 rounded-none font-bold placeholder:text-foreground/20 dark:placeholder:text-white/10 text-[10px] md:text-sm tracking-widest focus-visible:ring-primary focus-visible:border-primary"
                        />
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto">
                        <Button variant="outline" className="h-14 md:h-16 px-6 md:px-8 rounded-none border-border dark:border-white/10 hover:bg-accent dark:hover:bg-white/5 text-[9px] md:text-[10px] items-center gap-2 uppercase font-bold tracking-widest w-full lg:w-auto">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                        <Button className="h-14 md:h-16 px-6 md:px-8 rounded-none bg-secondary text-black hover:bg-secondary/90 text-[9px] md:text-[10px] uppercase font-bold tracking-widest w-full lg:w-auto">
                            Latest First
                        </Button>
                    </div>
                </div>

                {/* Categories Tab */}
                <Tabs defaultValue="all" className="w-full">
                    <div className="border-b border-border dark:border-white/10 mb-8 md:mb-12 overflow-x-auto no-scrollbar pb-2">
                        <TabsList className="bg-transparent h-auto p-0 gap-6 md:gap-8 justify-start inline-flex w-max min-w-full">
                            {categories.map((cat) => (
                                <TabsTrigger
                                    key={cat.id}
                                    value={cat.id}
                                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-2 md:py-4 text-[9px] md:text-[10px] uppercase font-black tracking-[0.1em] md:tracking-[0.2em] text-foreground/60 dark:text-white/30 transition-all hover:text-foreground dark:hover:text-white whitespace-nowrap flex-shrink-0"
                                >
                                    {cat.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border dark:bg-white/10 border border-border dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                            {dbResources.map((res, i) => {
                                const IconComponent = {
                                    FileText: FileText,
                                    BookMarked: BookMarked,
                                    Terminal: Terminal,
                                    TrendingUp: TrendingUp,
                                    Sparkles: Sparkles,
                                }[res.iconName as string] || FileText;

                                return (
                                    <motion.div
                                        key={res.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group bg-card dark:bg-black hover:bg-accent dark:hover:bg-white/[0.03] p-6 md:p-8 flex flex-col min-h-[250px] md:min-h-[300px] transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-6 md:mb-8">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border dark:border-white/10 flex items-center justify-center bg-accent dark:bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-[8px] uppercase tracking-widest px-2">
                                                {res.type}
                                            </Badge>
                                        </div>

                                        <div className="mb-auto">
                                            <h3 className="font-display text-xl md:text-2xl uppercase leading-tight mb-3 md:mb-4 group-hover:text-primary transition-colors">{res.title}</h3>
                                            <p className="text-foreground/60 dark:text-foreground/60 text-[13px] md:text-sm leading-relaxed mb-6 group-hover:text-foreground/80 dark:group-hover:text-white/60 transition-colors">
                                                {res.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-border dark:border-white/5 mt-4">
                                            <div className="flex gap-3 md:gap-4 text-[8px] md:text-[9px] uppercase font-black tracking-widest text-foreground/60 dark:text-white/30">
                                                <span>{res.size}</span>
                                                <span>•</span>
                                                <span>{res.date}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-0 text-primary hover:text-foreground dark:hover:text-white hover:bg-transparent transition-colors group/btn" asChild>
                                                <a href={res.link}>
                                                    <Download className="w-4 h-4 mr-2 group-hover/btn:translate-y-1 transition-transform" />
                                                    <span className="text-[8px] md:text-[9px] uppercase font-black tracking-widest">GET</span>
                                                </a>
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </TabsContent>

                    {/* Other Tabs would follow the same pattern - simplified for this implementation */}
                </Tabs>

                {/* Call to Action: Contribute */}
                <section className="mt-20 md:mt-40 bg-primary/10 border border-primary/20 rounded-2xl md:rounded-3xl p-8 md:p-20 relative overflow-hidden text-center mx-1 md:mx-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-6 md:mb-8">
                            Have resources to share?
                        </h2>
                        <p className="max-w-2xl mx-auto text-foreground/70 dark:text-white/60 text-base md:text-xl font-serif mb-8 md:mb-12 italic">
                            Mission Placements is a collaborative effort. By contributing your notes, guides, or snippets, you help the entire community grow.
                        </p>
                        <Button size="lg" className="bg-primary text-primary-foreground font-bold h-14 md:h-16 px-8 md:px-12 w-full md:w-auto rounded-none hover:bg-primary/90 text-[10px] md:text-sm tracking-widest">
                            SUBMIT TO REPOSITORY ✦
                        </Button>
                    </div>
                </section>
            </main>

            {/* Footer (Simplified) */}
            <footer className="py-12 md:py-20 px-6 border-t border-border dark:border-white/10">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <span className="font-display text-2xl uppercase tracking-tighter text-gradient-primary">Mission Placements</span>
                    </div>
                    <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] text-foreground/60 dark:text-white/20 text-center md:text-left">
                        © 2026 Mission Placements | Education for Action
                    </p>
                </div>
            </footer>
        </div>
    );
}
