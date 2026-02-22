"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Users,
    BookOpen,
    Trophy,
    Plus,
    ArrowLeft,
    LayoutDashboard,
    FileText,
    MessageSquare,
    Loader2,
    CheckCircle2,
    Target,
    BarChart3,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createSuccessStory, createResource } from "@/app/actions/manage";

export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleStorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            company: formData.get("company") as string,
            ctc: formData.get("ctc") as string,
            quote: formData.get("quote") as string,
            tags: formData.get("tags") as string,
        };

        try {
            await createSuccessStory(data);
            setSuccess("Story published successfully!");
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResourceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            type: formData.get("type") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            description: formData.get("description") as string,
        };

        try {
            await createResource(data);
            setSuccess("Resource deployed successfully!");
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Header */}
            <header className="pt-8 px-6 pb-12 md:pb-20 border-b border-border dark:border-white/5 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-accent dark:bg-white/10 border border-border dark:border-white/20">
                            <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                        </div>
                        <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements <span className="text-primary italic font-serif">Faculty</span></span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70">
                            <Link href="/portal/student" className="hover:text-primary transition-colors">Student View</Link>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-10 rounded-full border-border text-[9px] px-6"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Logout
                            </Button>
                        </nav>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 md:py-20 pb-40">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 md:mb-20">
                    <div>
                        <div className="sticker sticker-mint mb-4 text-[10px]">Faculty Control Center ✦</div>
                        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.8]">
                            Mission Placements <br />
                            <span className="text-primary italic font-serif normal-case">Control</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Button className="bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-none h-14 px-8">
                            Quick Broadcast <Plus className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {success && (
                    <div className="mb-12 p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-3xl flex items-center gap-4 font-bold uppercase text-xs tracking-widest">
                        <CheckCircle2 className="w-6 h-6" />
                        {success}
                    </div>
                )}

                <Tabs defaultValue="overview" className="space-y-12">
                    <TabsList className="bg-accent dark:bg-white/5 p-1 rounded-2xl md:rounded-[2rem] border border-border dark:border-white/10 h-16 md:h-20 w-fit">
                        <TabsTrigger value="overview" className="rounded-xl md:rounded-[1.5rem] px-6 md:px-10 h-full data-[state=active]:bg-background font-display uppercase tracking-widest text-[9px] md:text-[11px]">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="stories" className="rounded-xl md:rounded-[1.5rem] px-6 md:px-10 h-full data-[state=active]:bg-background font-display uppercase tracking-widest text-[9px] md:text-[11px]">
                            Success Stories
                        </TabsTrigger>
                        <TabsTrigger value="resources" className="rounded-xl md:rounded-[1.5rem] px-6 md:px-10 h-full data-[state=active]:bg-background font-display uppercase tracking-widest text-[9px] md:text-[11px]">
                            Resource Bank
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <Card className="bg-card dark:bg-white/5 border-border rounded-[2rem] p-8">
                                <Users className="w-8 h-8 text-primary mb-6" />
                                <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-2">Total Candidates</div>
                                <div className="text-5xl font-display tracking-tighter">450+</div>
                                <p className="text-xs font-serif italic text-foreground/60 mt-4">Active in Phase 03 Roadmap</p>
                            </Card>
                            <Card className="bg-card dark:bg-white/5 border-border rounded-[2rem] p-8">
                                <Target className="w-8 h-8 text-blue-500 mb-6" />
                                <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-2">Placements 2024</div>
                                <div className="text-5xl font-display tracking-tighter">124</div>
                                <p className="text-xs font-serif italic text-foreground/60 mt-4">Avg Package: 6.5 LPA</p>
                            </Card>
                            <Card className="bg-card dark:bg-white/5 border-border rounded-[2rem] p-8">
                                <BarChart3 className="w-8 h-8 text-emerald-500 mb-6" />
                                <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-2">Total Assessments</div>
                                <div className="text-5xl font-display tracking-tighter">1,200+</div>
                                <p className="text-xs font-serif italic text-foreground/60 mt-4">Across 12 mock series</p>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="stories">
                        <Card className="bg-card dark:bg-white/5 border-border rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />
                            <div className="max-w-2xl">
                                <h3 className="text-3xl font-display uppercase tracking-tighter mb-6">Publish Success Story</h3>
                                <p className="text-foreground/60 font-serif italic mb-10 leading-relaxed">
                                    Celebrate student achievements by adding them to the Wall of Fame. This motivates the entire collective.
                                </p>
                                <form onSubmit={handleStorySubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Student Name</Label>
                                            <Input name="name" required placeholder="e.g. Adwaith S." className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Company</Label>
                                            <Input name="company" required placeholder="e.g. TCS" className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Role / Designation</Label>
                                            <Input name="role" required placeholder="e.g. System Engineer" className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">CTC (Package)</Label>
                                            <Input name="ctc" required placeholder="e.g. 7.0 LPA" className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Quote</Label>
                                        <Textarea name="quote" required placeholder="Share their wisdom..." className="min-h-[120px] rounded-2xl bg-accent/50 p-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Tags (Comma separated)</Label>
                                        <Input name="tags" required placeholder="Aptitude, Coding, OOPS" className="h-14 rounded-2xl bg-accent/50" />
                                    </div>
                                    <Button disabled={loading} type="submit" className="h-16 px-12 bg-foreground dark:bg-white text-background dark:text-black font-black uppercase tracking-widest rounded-none mt-8">
                                        {loading ? <Loader2 className="animate-spin mr-2" /> : "PUBLISH TO WALL OF FAME ✦"}
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="resources">
                        <Card className="bg-card dark:bg-white/5 border-border rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] -z-10" />
                            <div className="max-w-2xl">
                                <h3 className="text-3xl font-display uppercase tracking-tighter mb-6">Add Learning Resource</h3>
                                <p className="text-foreground/60 font-serif italic mb-10 leading-relaxed">
                                    Upload latest question banks, PDF sheets, or video links to the repository.
                                </p>
                                <form onSubmit={handleResourceSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Resource Title</Label>
                                        <Input name="title" required placeholder="e.g. DBMS Cheat Sheet" className="h-14 rounded-2xl bg-accent/50" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Type</Label>
                                            <Input name="type" required placeholder="PDF, VIDEO, SHEET" className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Category</Label>
                                            <Input name="category" required placeholder="aptitude, technical, interview" className="h-14 rounded-2xl bg-accent/50" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Link (URL)</Label>
                                        <Input name="link" required placeholder="https://..." className="h-14 rounded-2xl bg-accent/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[9px] font-bold tracking-widest ml-1">Short Description</Label>
                                        <Textarea name="description" required placeholder="What is this about?" className="min-h-[80px] rounded-2xl bg-accent/50 p-6" />
                                    </div>
                                    <Button disabled={loading} type="submit" className="h-16 px-12 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-none mt-8">
                                        {loading ? <Loader2 className="animate-spin mr-2" /> : "DEPLOY RESOURCE ✦"}
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="py-12 border-t border-border dark:border-white/5 text-center opacity-40">
                <p className="text-[8px] uppercase font-bold tracking-[0.5em]">MISSION CONTROL • FACULTY INTERFACE • MISSION PLACEMENTS</p>
            </footer>
        </div>
    );
}
