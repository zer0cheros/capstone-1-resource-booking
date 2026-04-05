import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, Compass, Package } from "lucide-react";

export const metadata: Metadata = {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
};

export default async function NotFound() {
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div
            className={cn(
                "flex flex-col bg-brand-light",
                session?.user
                    ? "min-h-[calc(100dvh-5rem)]"
                    : "min-h-dvh",
            )}
        >
            {!session?.user && (
                <header className="border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-8">
                        <Link
                            href="/"
                            className="text-lg font-black tracking-tight transition-opacity hover:opacity-80"
                        >
                            <span className="text-gb-blue">Order</span>
                            <span className="text-gb-green">Ease</span>
                        </Link>
                    </div>
                </header>
            )}

            <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-20">
                <div className="w-full max-w-xl space-y-10 text-center">
                    <div className="relative mx-auto flex size-36 items-center justify-center rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40 md:size-40 md:rounded-[2.5rem]">
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gb-blue/5 via-transparent to-gb-green/5 md:rounded-[2.5rem]" />
                        <Compass
                            className="relative size-16 text-gb-blue md:size-[4.5rem]"
                            strokeWidth={1.25}
                            aria-hidden
                        />
                        <span className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                            404
                        </span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 md:text-4xl">
                            This page is{" "}
                            <span className="text-gb-blue">off the map</span>
                        </h1>
                        <p className="mx-auto max-w-md text-base font-medium leading-relaxed text-slate-500">
                            The link may be broken or the page may have been
                            removed. Head back home or explore shared resources.
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
                        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
                            <Button
                                asChild
                                className="h-12 rounded-2xl bg-gb-blue font-bold text-white shadow-lg shadow-gb-blue/20 hover:bg-gb-blue/90"
                            >
                                <Link href="/">
                                    <ArrowLeft className="mr-2 size-4" />
                                    Back to home
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-12 rounded-2xl border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                            >
                                <Link href="/resources">
                                    <Package className="mr-2 size-4 text-gb-blue" />
                                    Browse resources
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Resource booking · OrderEase
                    </p>
                </div>
            </div>
        </div>
    );
}
