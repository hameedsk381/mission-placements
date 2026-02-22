
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    Video,
    Calendar as CalendarIcon,
    Clock,
    User,
    CheckCircle2,
    ChevronRight,
    MessageSquare,
    ExternalLink,
    ShieldCheck,
    Zap,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function BookingPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isBooked, setIsBooked] = useState(false);

    const slots = [
        "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
    ];

    const mentors = [
        { name: "Mr. B. Raja Shekar Reddy", role: "Faculty Advisor", expertise: "General Readiness" },
        { name: "Mr. Y. Adithya", role: "Initiative Manager", expertise: "Aptitude & Logical" },
        { name: "Ms. V. Hema", role: "Initiative Manager", expertise: "Coding & DS" },
    ];

    const handleBooking = () => {
        if (selectedSlot && date) {
            setIsBooked(true);
            setTimeout(() => setIsBooked(false), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

            {/* Header */}
            <header className="pt-8 px-6 pb-12 md:pb-20">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-10 md:mb-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20">
                                <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                            </div>
                            <span className="font-display uppercase tracking-tighter text-2xl text-gradient-primary">Mission Placements</span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link>
                            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
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
                                            <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest">Roadmap</Link>
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

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="sticker sticker-pink mb-6 text-[10px]">Interview Ready v1.0</div>
                            <h1 className="text-7xl sm:text-8xl md:text-[8vw] font-display uppercase leading-[0.8] tracking-tighter">
                                Mock <br />
                                <span className="text-secondary italic font-serif normal-case">Interview</span>
                            </h1>
                        </div>
                        <div className="md:mb-4 pr-8 md:pr-0">
                            <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg max-w-sm">
                                "Face your fears in a controlled environment. Expert feedback to bridge the gap to your dream offer."
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Step 1: Selection Dashboard */}
                    <div className="lg:col-span-8 space-y-6 md:space-y-8">
                        <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl">
                            <div className="p-6 md:p-12 border-b border-border dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-display uppercase text-2xl tracking-tighter">1. Schedule your Slot</h3>
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-widest font-bold text-foreground/60 dark:text-white/20 mt-1 pb-1">Available slots for the next 7 days</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-accent dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shrink-0">
                                    <CalendarIcon className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            <CardContent className="p-6 md:p-12">
                                <div className="flex flex-col xl:flex-row gap-8 md:gap-12">
                                    <div className="bg-accent/50 dark:bg-white/[0.03] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-border dark:border-white/5 w-full xl:w-auto flex justify-center">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            className="rounded-md bg-transparent text-foreground dark:text-white"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <Label className="uppercase text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-widest text-foreground/60 dark:text-foreground/60">Select Time (IST)</Label>
                                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`h-12 md:h-14 rounded-xl md:rounded-2xl border text-[10px] md:text-[11px] font-bold tracking-[0.1em] md:tracking-widest transition-all ${selectedSlot === slot ? 'bg-primary border-primary text-primary-foreground' : 'bg-card dark:bg-white/5 border-border dark:border-white/10 text-foreground dark:text-white hover:border-primary/50'}`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="pt-4 md:pt-6 font-serif italic text-foreground/70 dark:text-white/30 text-xs flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-secondary" />
                                            * All interviews via Google Meet / Zoom.
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {mentors.map((mentor, i) => (
                                <Card key={i} className="bg-card dark:bg-black/40 border border-border dark:border-white/10 rounded-2xl md:rounded-3xl hover:border-primary/50 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-accent dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <User className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <h4 className="font-display uppercase text-lg tracking-tight mb-1">{mentor.name}</h4>
                                        <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] text-primary mb-3 md:mb-4">{mentor.role}</p>
                                        <p className="text-[9px] md:text-[10px] text-foreground/70 dark:text-foreground/60 uppercase tracking-widest">{mentor.expertise}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Confirmation Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 md:top-32 space-y-6">
                            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl">
                                <CardHeader className="p-6 md:p-10 border-b border-border dark:border-white/5 bg-accent/30 dark:bg-white/[0.02]">
                                    <CardTitle className="font-display uppercase text-xl md:text-2xl tracking-tighter">Booking Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 md:p-10 space-y-6 md:space-y-8">
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase font-bold tracking-widest">
                                            <span className="text-foreground/60 dark:text-white/20">Date</span>
                                            <span className="text-foreground dark:text-white">{date?.toDateString() || "TBD"}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase font-bold tracking-widest">
                                            <span className="text-foreground/60 dark:text-white/20">Time Slot</span>
                                            <span className="text-primary">{selectedSlot || "SELECT A SLOT"}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase font-bold tracking-widest">
                                            <span className="text-foreground/60 dark:text-white/20">Platform</span>
                                            <span className="text-foreground dark:text-white">Google Meet</span>
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-[9px] md:text-[10px] text-emerald-600 dark:text-emerald-400/80 leading-relaxed font-medium uppercase tracking-[0.1em] md:tracking-wider">
                                            Session includes detailed feedback report and personalized Roadmap updates.
                                        </p>
                                    </div>

                                    <Button
                                        disabled={!selectedSlot || isBooked}
                                        onClick={handleBooking}
                                        className="w-full h-14 md:h-16 bg-primary text-primary-foreground font-black uppercase text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] rounded-none hover:bg-primary/90 gap-2 md:gap-3"
                                    >
                                        {isBooked ? (
                                            <>CONFIRMED <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /></>
                                        ) : (
                                            <>REQUEST INTERVIEW ✦</>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>

                            {isBooked && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-primary/10 md:bg-primary/20 border border-primary/30 md:border-primary/40 rounded-2xl md:rounded-3xl"
                                >
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest">Booking Received</span>
                                    </div>
                                    <p className="text-[11px] md:text-xs text-foreground/70 dark:text-white/60 font-serif italic mb-4">
                                        Check your student portal or registered email for the meeting link. Be ready with your resume.
                                    </p>
                                    <Button variant="ghost" size="sm" className="p-0 text-foreground dark:text-white underline underline-offset-4 text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-widest font-black hover:bg-transparent hover:text-primary transition-colors">
                                        OPEN STUDENT PORTAL
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Instructions Section */}
                <section className="mt-20 md:mt-40 pt-20 md:pt-40 border-t border-border dark:border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                        <div>
                            <h3 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl tracking-tighter mb-8 italic text-foreground/30 dark:text-white/20">Guidelines</h3>
                            <div className="space-y-8 md:space-y-12">
                                {[
                                    { title: "Dress Code", desc: "Business casual or professional attire is required to simulate a real interview experience." },
                                    { title: "Technical Setup", desc: "Ensure a stable internet connection and functioning camera/mic at least 10 minutes prior." },
                                    { title: "Rescheduling", desc: "Cancellations must be made 24 hours in advance to respect the mentor's time." }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2 md:space-y-3">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <span className="font-display text-primary text-xl">0{idx + 1}</span>
                                            <h4 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.2em] md:tracking-[0.3em]">{item.title}</h4>
                                        </div>
                                        <p className="font-serif italic text-foreground/60 dark:text-foreground/60 text-base md:text-lg leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-20 relative overflow-hidden h-full flex flex-col justify-center shadow-2xl">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 md:bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                                <MessageSquare className="w-16 h-16 md:w-20 md:h-20 text-primary mb-8 md:mb-10 opacity-30 md:opacity-40 shrink-0" />
                                <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
                                    Collective Growth <br /> Through Collective <br /> Reviews.
                                </h3>
                                <p className="text-foreground/60 dark:text-foreground/60 font-serif italic text-lg md:text-xl mb-8 md:mb-12">
                                    Submit your interview feedback to help the community prepare for specific MNC patterns. Let's succeed together.
                                </p>
                                <Button variant="outline" className="w-fit h-14 px-6 md:px-8 border-border dark:border-white/10 text-foreground dark:text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-none hover:bg-accent dark:hover:bg-white/5 items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap">
                                    <span className="truncate">COMMUNITY PORTAL</span> <ExternalLink className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Industrial Disclaimer */}
            <footer className="py-12 md:py-20 border-t border-border dark:border-white/5 text-center px-4 md:px-6">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.5em] text-foreground/30 dark:text-white/20">
                    FORGING CAREERS • STUDENT-LED EXCELLENCE • MISSION PLACEMENTS
                </p>
            </footer>
        </div>
    );
}
