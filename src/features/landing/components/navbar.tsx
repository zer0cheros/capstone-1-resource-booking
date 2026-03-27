"use client";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import useScroll from "../hooks/use-scroll";

export default function Navbar() {
    const { isScrolled } = useScroll();

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "flex items-center justify-between px-10 h-20",
                isScrolled
                    ? "bg-white/10 hover:bg-white/15 transition-colors duration-500 backdrop-blur-md border-b border-white/20 shadow-lg"
                    : "bg-transparent border-transparent shadow-none",
            )}
        >
            <div className="flex items-center gap-1">
                <div className="relative w-10 h-10 sm:w-16 sm:h-16">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                <div className="flex">
                    <h1 className="text-[#1980D5] font-bold text-lg md:text-2xl">
                        Order
                    </h1>
                    <h1 className="text-[#63BE57] font-bold text-lg md:text-2xl">
                        Ease
                    </h1>
                </div>
            </div>

            {/* Sign In Button */}
            <div>
                <Button
                    asChild
                    className={cn(
                        "h-10 text-md md:text-lg px-6",
                        "w-full sm:w-fit min-w-[100px]",
                        "hover:bg-[#1181c4]",
                        "transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
                        "cursor-pointer",
                    )}
                >
                    <Link href="/login">Sign In</Link>
                </Button>
            </div>
        </div>
    );
}
