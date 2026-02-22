"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Target,
  Code,
  Cpu,
  MessageSquare,
  Briefcase,
  Rocket,
  Search,
  BookOpen,
  Zap,
  Globe,
  Sparkles,
  BrainCircuit,
  GraduationCap,
  Menu,
  X
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const initiatives = [
    {
      title: "Placement Series",
      id: "01",
      desc: "Daily aptitude & logical reasoning shared via polls, followed by expert analysis of MNC patterns.",
      icon: <Target className="w-6 h-6" />,
      manager: "Mr. Y. Adithya",
      color: "text-emerald-400"
    },
    {
      title: "Coding Initiative",
      id: "02",
      desc: "Regular coding challenges and programming snippets focused on technical interview proficiency.",
      icon: <Code className="w-6 h-6" />,
      manager: "Ms. V. Hema",
      color: "text-blue-400"
    },
    {
      title: "Tech Updates",
      id: "03",
      desc: "Daily visual updates on emerging technologies, AI trends, and major industry developments.",
      icon: <Cpu className="w-6 h-6" />,
      manager: "Mr. V. Santhosh",
      color: "text-amber-400"
    },
    {
      title: "Soft Skills",
      id: "04",
      desc: "Enhancing English communication, professional etiquette, and confidence for HR rounds.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-pink-400"
    },
    {
      title: "Interview Prep",
      id: "05",
      desc: "Structured guidance on resume building, placement strategies, and career planning.",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Learning Resources",
      id: "06",
      desc: "Access to free certification courses, webinars, and curated career-oriented resources.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-orange-400"
    },
    {
      title: "Academic Support",
      id: "07",
      desc: "Exclusive peer groups for resource sharing and exam preparedness (CSE-DS focus).",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-red-400"
    },
    {
      title: "Practical Exposure",
      id: "08",
      desc: "Hackathons, innovation challenges, and team-based projects for hands-on experience.",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 overflow-x-hidden relative text-foreground">

      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />

      {/* Dynamic Glows */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 dark:bg-primary/10 blur-[100px] md:blur-[120px] -z-10 opacity-50 dark:opacity-100" />
      <div className="fixed bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/5 dark:bg-secondary/10 blur-[100px] md:blur-[120px] -z-10 opacity-50 dark:opacity-100" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-2 md:py-3 bg-background/60 dark:bg-black/40 backdrop-blur-2xl border border-border dark:border-white/10 rounded-full flex items-center justify-between md:gap-8 shadow-2xl w-[90%] max-w-5xl">
        <div className="flex items-center gap-3 pr-4 border-r border-border dark:border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20 shrink-0">
            <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
          </div>
          <span className="font-display uppercase tracking-tighter text-lg leading-none hidden sm:block text-gradient-primary">Mission Placements</span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
          <a href="#initiatives" className="hover:text-primary transition-colors">Initiatives</a>
          <Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link>
          <Link href="/portal/test" className="hover:text-primary transition-colors">Mock Tests</Link>
          <Link href="/achievements" className="hover:text-primary transition-colors">Wall of Fame</Link>
          <Link href="/success-stories" className="hover:text-primary transition-colors">Stories</Link>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />

          <Link href="/portal/student" className="hidden sm:block">
            <Button size="sm" className="bg-primary text-primary-foreground font-bold h-8 px-4 rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
              Portal
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
                  <a href="#initiatives" className="text-lg font-display uppercase tracking-widest">Initiatives</a>
                  <Link href="/roadmap" className="text-lg font-display uppercase tracking-widest">Roadmap</Link>
                  <Link href="/portal/test" className="text-lg font-display uppercase tracking-widest">Mock Tests</Link>
                  <Link href="/achievements" className="text-lg font-display uppercase tracking-widest">Wall of Fame</Link>
                  <Link href="/success-stories" className="text-lg font-display uppercase tracking-widest">Success Stories</Link>
                  <Link href="/resources" className="text-lg font-display uppercase tracking-widest">Resources</Link>
                  <Link href="/portal/student">
                    <Button className="bg-primary text-primary-foreground font-bold h-12 px-8 rounded-full text-xs uppercase tracking-widest">
                      Student Portal
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticker sticker-yellow mb-10 text-[10px]"
            >
              A Structured Student Initiative
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl sm:text-8xl md:text-[10vw] lg:text-[11vw] font-display uppercase leading-[0.85] tracking-tighter mb-10"
            >
              Learn <br />
              <span className="text-gradient-primary">Consistency</span>
              <span className="inline-block animate-float ml-2 md:ml-4 text-[6vw] md:text-[4vw] align-top text-primary">✦</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl text-lg md:text-2xl text-foreground/70 dark:text-white/70 font-serif leading-relaxed mb-12 italic"
            >
              "Where Learning is Shared and Growth is Collective." <br />
              Bridging the gap between academic learning and industry expectations.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
              <Button size="lg" className="bg-foreground text-background dark:bg-white dark:text-black font-bold h-14 md:h-16 px-6 md:px-10 rounded-none hover:opacity-90 text-sm md:text-lg tracking-tight w-full sm:w-auto">
                JOIN THE COMMUNITY
              </Button>
              <Button size="lg" variant="outline" className="border-border dark:border-white/20 text-foreground dark:text-white font-bold h-14 md:h-16 px-6 md:px-10 rounded-none hover:bg-foreground/5 dark:hover:bg-white/5 text-sm md:text-lg tracking-tight w-full sm:w-auto">
                VIEW ACTION PLAN
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee - Impact Data */}
      <div className="py-12 md:py-24 border-y border-border dark:border-white/10 overflow-hidden relative marquee-container bg-card dark:bg-black/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((group) => (group &&
            <div key={group} className="flex shrink-0">
              {[
                "2800+ Active Students",
                "20k+ Monthly Impressions",
                "100% Peer Driven",
                "Achieved in just 1 Month",
                "MNC Mock Patterns",
                "Value-First Approach",
                "Organic Growth Only",
              ].map((text, i) => (
                <div key={i} className="ticker-item px-8 md:px-16 text-2xl md:text-6xl font-display uppercase text-foreground/10 dark:text-white/10 hover:text-secondary transition-colors cursor-default">
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Core Objectives (TinkerHub Section Style) */}
      <section className="py-40 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div>
              <div className="sticker sticker-pink mb-8 text-[10px]">Primary Objectives</div>
              <h2 className="text-6xl md:text-8xl font-display uppercase leading-[0.9] tracking-tighter mb-12">
                Mapping <br />
                <span className="text-gradient-primary italic font-serif normal-case">Placement</span> <br />
                Success.
              </h2>
              <div className="space-y-6">
                {[
                  "Encourage consistent & disciplined preparation.",
                  "Align with real-world recruitment processes.",
                  "Enhance logical reasoning & analytical thinking.",
                  "Strengthen coding & programming fundamentals.",
                  "Foster a collaborative peer-driven environment."
                ].map((obj, i) => (
                  <div key={i} className="flex gap-4 items-center group">
                    <span className="text-primary font-display text-2xl group-hover:scale-125 transition-transform">0{i + 1}</span>
                    <p className="text-foreground/60 text-lg group-hover:text-foreground transition-colors">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-dark border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8">
                <BrainCircuit className="w-24 md:w-32 h-24 md:h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
              </div>
              <h3 className="font-serif italic text-2xl md:text-3xl mb-8 text-primary">From the Faculty Advisor</h3>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
                "Mission Placements stands as a meaningful, student-driven initiative aimed at strengthening placement preparedness and professional readiness among students."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">BR</span>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-widest text-xs text-white">Mr. B. Raja Shekar Reddy</div>
                  <div className="text-white/60 text-[10px] uppercase tracking-widest">Dept of CSE Data Science</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section id="initiatives" className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-32">
            <div className="sticker sticker-mint mb-8 text-[10px]">Our Ecosystem</div>
            <h2 className="text-7xl md:text-9xl font-display uppercase tracking-tighter">Initiatives</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px md:bg-white/10 border-0 md:border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {initiatives.map((init, i) => (
              <div key={i} className="group relative bg-background/50 backdrop-blur-sm p-8 md:p-12 hover:bg-primary/[0.05] transition-all flex flex-col min-h-[350px] md:min-h-[400px] rounded-3xl md:rounded-none">
                <div className="mb-auto">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-accent dark:bg-white/5 border border-border dark:border-white/10 text-foreground dark:text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-8`}>
                    {init.icon}
                  </div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-foreground/30 dark:text-white/30 mb-2">Initiative {init.id}</span>
                  <h4 className="font-display text-2xl uppercase leading-tight mb-4 group-hover:text-primary transition-colors">{init.title}</h4>
                  <p className="text-foreground/60 dark:text-foreground/60 text-sm leading-relaxed group-hover:text-foreground/60 dark:group-hover:text-white/60 transition-colors">
                    {init.desc}
                  </p>
                </div>
                {init.manager && (
                  <div className="mt-8 pt-6 border-t border-border dark:border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-foreground/60 dark:text-foreground/60">Managed by {init.manager}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes (Horizontal Ticker Style) */}
      <section id="outcomes" className="py-12 md:py-20 bg-primary text-primary-foreground overflow-hidden relative shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
        <div className="marquee-container whitespace-nowrap">
          <div className="flex animate-marquee">
            {[1, 2].map((g) => (
              <div key={g} className="flex">
                {[
                  "Faster Problem Solving",
                  "Stronger Coding Syntax",
                  "English Confidence",
                  "Resume Perfection",
                  "Industry Awareness",
                  "Disciplined Habit",
                  "Peer Mentorship",
                ].map((text, i) => (
                  <div key={i} className="flex items-center text-xl md:text-4xl font-display uppercase px-10 md:px-20">
                    <Zap className="mr-4 md:mr-8 w-6 md:w-8 h-6 md:h-8 fill-black" />
                    {text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Presence (Growth Section) */}
      <section id="community" className="py-20 md:py-40 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
              <div className="bg-card border border-border dark:border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <h5 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-secondary">Reach Overview</h5>
                  <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-primary animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                  <div>
                    <div className="text-4xl md:text-5xl font-display text-foreground dark:text-white">300+</div>
                    <div className="text-[10px] uppercase tracking-widest text-foreground/60 dark:text-foreground/60 mt-2">LinkedIn Page</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display text-foreground dark:text-white">180+</div>
                    <div className="text-[10px] uppercase tracking-widest text-foreground/60 dark:text-foreground/60 mt-2">WhatsApp Community</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-foreground/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-foreground/60 dark:text-foreground/60">
                    <span>Organic Growth</span>
                    <span>100% Student Trust</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-4xl md:text-7xl font-display uppercase leading-tight mb-8 md:mb-10">
                A Digital <br />
                <span className="text-primary italic font-serif normal-case">Learning Ecosystem</span> <br />
                Built by Students.
              </h3>
              <p className="text-foreground/60 dark:text-white/60 text-base md:text-lg mb-8 md:mb-12 leading-relaxed italic">
                "Within a span of 1 month, Mission Placements has achieved strong, organic engagement without official college promotion."
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["WhatsApp", "LinkedIn", "Instagram", "Google Forms"].map((label) => (
                  <span key={label} className="px-3 md:px-4 py-1.5 md:py-2 border border-border dark:border-white/10 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-foreground/60 dark:text-white/60 bg-accent/50 dark:bg-transparent">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-24 px-6 border-t border-border dark:border-white/10 relative bg-card/50 dark:bg-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-24">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <TrendingUp className="w-8 md:w-10 h-8 md:h-10 text-primary" />
                <span className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-gradient-primary">Mission Placements</span>
              </div>
              <p className="text-foreground/60 dark:text-foreground/60 text-base md:text-lg max-w-sm mb-10 md:mb-12 leading-relaxed">
                Empowering students to transition from academia to industry through consistent practice and collective growth.
              </p>
              <div className="flex gap-4 md:gap-6">
                <Button size="icon" variant="outline" className="w-10 md:w-12 h-10 md:h-12 rounded-full border-border dark:border-white/10 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="w-10 md:w-12 h-10 md:h-12 rounded-full border-border dark:border-white/10 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Zap className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div>
              <h5 className="font-display text-sm uppercase tracking-[0.2em] mb-8 md:mb-10 text-primary opacity-60">Initiative Leads</h5>
              <ul className="space-y-4 md:space-y-5 font-bold uppercase text-[9px] tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                <li><span className="text-foreground dark:text-white">Mr. Y. Adithya</span> - Aptitude</li>
                <li><span className="text-foreground dark:text-white">Ms. V. Hema</span> - Coding</li>
                <li><span className="text-foreground dark:text-white">Mr. V. Santhosh</span> - Tech Updates</li>
                <li><span className="text-foreground dark:text-white">Mr. B.R.S. Reddy</span> - Advisor</li>
              </ul>
            </div>
            <div>
              <h5 className="font-display text-sm uppercase tracking-[0.2em] mb-8 md:mb-10 text-primary opacity-60">Resources</h5>
              <ul className="space-y-4 md:space-y-5 font-bold uppercase text-[9px] tracking-[0.2em] text-foreground/70 dark:text-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Daily Channel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Study Material</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mock Tests</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Certification</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 md:pt-12 border-t border-border dark:border-white/10 flex flex-col md:flex-row justify-between gap-6 md:gap-8 text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-foreground/20 dark:text-white/20 font-bold">
            <span>© 2026 Mission Placements Foundation | Student-Led</span>
            <div className="flex gap-8 md:gap-12">
              <a href="#" className="hover:text-foreground dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
