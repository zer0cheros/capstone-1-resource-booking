"use client";
import Image from "next/image";
import { ResourceImageProps } from "../types/resource";

export default function ResourceImage({ src, alt }: ResourceImageProps) {
    const imageSource = src || "/assets/placeholder-resource.svg";

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl border border-white/20">
            <Image
                src={imageSource}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
