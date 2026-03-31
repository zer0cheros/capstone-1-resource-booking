import { Session } from "@/features/auth/types/session";
import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutHeader(
    { user }: { user?: Session["user"] },
) {
    return (
        <div className="relative py-20 px-8 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gb-blue/20 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 size-96 bg-gb-blue/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gb-blue text-xs font-black uppercase tracking-widest mb-6">
                    <Sparkles size={14} />
                    Project Information
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                    Platform <span className="text-gb-blue">Details.</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-6">
                    OrderEase is a peer-to-peer resource booking system
                    developed as a university capstone project. Below you will
                    find our project scope, terms of use, and support
                    information.
                </p>

                {!user && (
                    <Link href="/">
                        <Button
                            variant="link"
                            className="text-white p-0"
                        >
                            Back to Landing Page
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
