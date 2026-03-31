import { Github, Heart } from "lucide-react";
import Link from "next/link";

export default function AppFooter() {
    return (
        <footer className="w-full py-8 md:py-6 px-6 border-t border-slate-200 bg-white/90 !backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                
                {/* 1. Brand & Copyright Section */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-1 font-black text-slate-900 text-sm md:text-base">
                        <span className="text-gb-blue">Order</span>
                        <span className="text-gb-green">Ease</span>
                    </div>
                    <span className="hidden sm:block text-slate-300">|</span>
                    <div className="flex items-center gap-2">
                        <span>© 2026</span>
                        <span className="text-slate-300">|</span>
                        <p className="flex items-center gap-1">
                            Made in <span className="text-slate-900">Finland</span>
                            <Heart className="size-2 text-red-500 fill-red-500 ml-0.5" />
                        </p>
                    </div>
                </div>

                {/* 2. Responsive Links Grid */}
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
                    {/* If you don't have these pages, you can link to # or a project info page */}
                    <Link 
                        href="/about" 
                        className="hover:text-gb-blue transition-colors whitespace-nowrap"
                    >
                        Support
                    </Link>
                    <Link 
                        href="/about" 
                        className="hover:text-gb-blue transition-colors whitespace-nowrap"
                    >
                        Terms
                    </Link>
                    <Link 
                        href="/about" 
                        className="hover:text-gb-blue transition-colors whitespace-nowrap"
                    >
                        Privacy
                    </Link>
                    <Link 
                        href="https://github.com/jahlgren/capstone-1-resource-booking" 
                        target="_blank"
                        className="flex items-center gap-1.5 hover:text-slate-900 transition-colors bg-slate-100 px-3 py-1.5 rounded-full md:bg-transparent md:p-0"
                    >
                        <Github className="size-3" />
                        <span>Source</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}