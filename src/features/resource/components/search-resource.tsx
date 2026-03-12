"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchResource() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [value, setValue] = useState(searchParams.get("query") ?? "");

    useEffect(() => {
        setValue(searchParams.get("query") ?? "");
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slae-400 z-10 size-6" />
            <Input
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSearch(e.target.value);
                }}
                value={value}
                placeholder="Search shared resources..."
                className={cn(
                    "h-14 pl-12 text-xl md:text-xl",
                    "bg-white brder-slate-200 shadow-sm",
                    "focus:border-[#1980D5] focus:ring-4 focus:ring-[#1980D5]/10",
                    "transition-all duration-300 placeholder:text-slate-400",
                )}
            />
        </div>
    );
}
