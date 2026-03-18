"use client";
import { Resource } from "../types/resource";
import { Info, ShieldCheck, Tag } from "lucide-react";

export default function ResourceDetails({ resource }: { resource: Resource }) {
    return (
        <div className="space-y-8 py-4">
            {/* Title Section */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gb-blue/10 text-gb-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                        Available Now
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">
                        Ref: {resource.id.slice(0, 8)}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    {resource.name}
                </h1>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="bg-slate-50 p-2 rounded-xl text-gb-blue">
                        <Tag className="size-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Category
                        </p>
                        <p className="font-semibold text-slate-800">
                            {resource.category}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="bg-slate-50 p-2 rounded-xl text-gb-blue">
                        <ShieldCheck className="size-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Verification
                        </p>
                        <p className="font-semibold text-slate-800">
                            Instant Enabled
                        </p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                    <Info className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                        About this resource
                    </p>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {resource.description}
                </p>
            </div>
        </div>
    );
}
