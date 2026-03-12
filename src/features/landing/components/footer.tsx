import { Github, Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand & Description */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/logo.png"
                                alt="logo"
                                width={32}
                                height={32}
                            />
                            <span className="text-white font-bold text-xl tracking-tight">
                                <span className="text-[#1980D5]">
                                    Order
                                </span>
                                <span className="text-[#63BE57]">
                                    Ease
                                </span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            A secure peer-to-peer marketplace for sharing tools,
                            vehicles, and spaces within your local community.
                        </p>
                    </div>

                    {/* Column 2: Team Members */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">
                            Development Team
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>Jimi (Project Manager)</li>
                            <li>Dan (Fronend Developer)</li>
                            <li>Christian (Backend Developer)</li>
                            <li>Roshani (UI/UX Designer)</li>
                            <li>Sushil (Testing & Documenation)</li>
                        </ul>
                    </div>

                    {/* Column 3: Tech Stack */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">
                            Built With
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-[#1980D5] transition-colors">
                                Next.js 15 & Tailwind
                            </li>
                            <li className="hover:text-[#1980D5] transition-colors">
                                Better Auth & Drizzle
                            </li>
                            <li className="hover:text-[#1980D5] transition-colors">
                                PostgreSQL & Docker
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Project Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">
                            Resources
                        </h4>
                        <div className="flex flex-col gap-4">
                            <Link
                                href="https://github.com/jahlgren/capstone-1-resource-booking"
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <Github className="size-5" />
                                <span>GitHub Repository</span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <Globe className="size-5" />
                                <span>Capstone Project 2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2026 OrderEase. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with{" "}
                        <Heart className="size-3 text-red-500 fill-red-500" />
                        {" "}
                        in Finland
                    </p>
                </div>
            </div>
        </footer>
    );
}
