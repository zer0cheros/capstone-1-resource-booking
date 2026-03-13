"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Resource } from "../types/resource";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { DollarSign, Info, MapPin, Tag } from "lucide-react";

export default function ResourceDetails({ resource }: { resource: Resource }) {
    return (
        <div className="">
            <Card className="bg-white/70 backdrop-blur-2xl border-white/40 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="bg-gb-blue/10 text-gb-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            Available Now
                        </span>
                        <span className="text-slate-400 text-xs font-medium italic">
                            ID: {resource.id.slice(0, 8)}
                        </span>
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {resource.name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                        <Tag className="size-5 text-gb-blue mt-1" />
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                                Category
                            </p>
                            <p className="text-lg font-semibold text-slate-800">
                                General Resource
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 px-2">
                        <Info className="size-5 text-gb-blue mt-1" />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter mb-1">
                                About this resource
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {resource.description}
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-4 p-6 rounded-3xl bg-gb-blue text-white shadow-xl shadow-gb-blue/20 hover:bg-gb-blue/90">
                        <div className="bg-white/20 p-3 rounded-2xl">
                            <DollarSign className="size-8 group-hover:scale-115 transition-all duration-300" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                                Rate per day
                            </p>
                            <p className="text-3xl font-black tracking-tight">
                                $123.00
                            </p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 p-8 bg-slate-50/30 border-t border-white/40">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <div className="size-2 bg-gb-green rounded-full animate-pulse" />
                        Instant booking enabled
                    </div>
                    <Button
                        className={cn(
                            "h-14 w-full rounded-2xl text-lg font-black transition-all duration-300",
                            "bg-gb-blue hover:bg-gb-blue/90 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gb-blue/30",
                        )}
                    >
                        Book This Resource
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
