"use client";

import { Button } from "@/shared/components/ui/button";
import useResourceFilter from "../hooks/use-resource-filter";
import { cn } from "@/shared/lib/utils";

const CATEGORIES = [
    "Apartments & Spaces",
    "Vehicles & Transport",
    "Tools & Equipment",
    "Office & Tech",
];

export default function CategoryFilter() {
    const { currentCategory, setFilter } = useResourceFilter(undefined);

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            <Button
                variant={!currentCategory ? "default" : "outline"}
                onClick={() => setFilter("category", null)}
                className={cn(
                    "rounded-full px-6 h-10 font-semibold transition-all",
                    !currentCategory &&
                        "bg-gb-blue hover:bg-gb-blue/90 shadow-md",
                )}
            >
                All
            </Button>

            {CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat;
                return (
                    <Button
                        key={cat}
                        variant={isActive ? "default" : "outline"}
                        onClick={() => setFilter("category", cat)}
                        className={cn(
                            "rounded-full px-6 h-10 font-semibold whitespace-nowrap transition-all",
                            isActive &&
                                "bg-gb-blue hover:bg-gb-blue/90 shadow-md",
                        )}
                    >
                        {cat}
                    </Button>
                );
            })}
        </div>
    );
}
