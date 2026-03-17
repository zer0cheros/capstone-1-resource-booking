"use client";
import { CircularCardProps } from "../types/landing";

export const CircularCard = (
    { icon: Icon, feature, description }: CircularCardProps,
) => (
    <div className="group flex flex-col items-center justify-center
                    h-80 w-80 lg:h-96 lg:w-96 aspect-square flex-shrink-0
                    rounded-full bg-white/70 backdrop-blur-sm p-10 gap-4
                    border border-white shadow-xl shadow-slate-200/50
                    transition-all duration-500 hover:-translate-y-2">
        <div className="rounded-full bg-white p-5 ring-1 ring-white/20 shadow-sm">
            <Icon className="size-8 text-[#63BE57] group-hover:text-[#1980D5] group-hover:scale-115 transition-all duraion-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{feature}</h2>
        <p className="text-center text-sm lg:text-base text-slate-600 leading-relaxed max-w-[220px] lg:max-w-[280px]">
            {description}
        </p>
    </div>
);
