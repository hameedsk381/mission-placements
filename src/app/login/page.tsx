"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TrendingUp, Lock, Mail, Loader2, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/portal/student");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 flex items-center justify-center relative overflow-hidden text-foreground p-6">
            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 bg-grid-white -z-10 pointer-events-none opacity-40" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-background via-background to-primary/5 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[450px]"
            >
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-white/20">
                            <img src="/logo.jpeg" alt="Mission Placements" className="w-full h-full object-cover scale-150" />
                        </div>
                        <span className="font-display uppercase tracking-tighter text-3xl text-gradient-primary">Mission Placements</span>
                    </Link>
                </div>

                <Card className="bg-card/50 dark:bg-black/50 backdrop-blur-xl border-border rounded-[2rem] overflow-hidden shadow-2xl">
                    <CardHeader className="space-y-2 p-8 md:p-10 pb-2">
                        <CardTitle className="text-3xl font-display uppercase tracking-tight">Welcome Back</CardTitle>
                        <CardDescription className="text-foreground/60 font-serif italic">
                            Continue your journey to the dream placement.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-destructive/10 border border-destructive/20 text-destructive text-xs py-3 px-4 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest text-foreground/40 px-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="student@missionplacements.com"
                                        className="bg-accent/50 border-border rounded-2xl h-14 pl-12 focus:ring-primary focus:ring-offset-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[10px] uppercase font-black tracking-widest text-foreground/40 px-1">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-accent/50 border-border rounded-2xl h-14 pl-12 focus:ring-primary focus:ring-offset-0"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-4 group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        ENTER PORTAL
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="p-8 md:p-10 pt-0 flex flex-col items-center">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/30 mb-8 border-t border-border w-full pt-8 text-center">
                            Account issues? Contact Administration
                        </p>
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-primary opacity-50" />
                            <span className="font-display text-xl uppercase tracking-tighter opacity-50">Mission Placements</span>
                        </div>
                    </CardFooter>
                </Card>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-[10px] uppercase font-black tracking-widest text-foreground/40 hover:text-primary transition-colors">
                        ← BACK TO HOME
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
