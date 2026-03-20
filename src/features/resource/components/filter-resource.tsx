"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { IconFilter } from "@tabler/icons-react";
import useResourceFilter from "../hooks/use-resource-filter";

export default function FilterResource() {
    const {
        setFilter,
        clearFilters,
        currentSort,
    } = useResourceFilter(undefined);

    return (
        <div className="w-full md:w-48">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "h-14 text-xl px-8 w-full md:w-48",
                            "rounded-xl border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm",
                            "hover:bg-slate-50 transition-all duration-300",
                        )}
                    >
                        <IconFilter className="mr-2 size-5 text-slate-500" />
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-2xl p-2 shadow-2xl border-white/20 bg-white/70 backdrop-blur-md"
                    align="end"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-3 py-2 text-slate-500 uppercase text-[10px] tracking-widset font-bold">
                            Sort By
                        </DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                            checked={currentSort === "price_asc"}
                            onCheckedChange={() =>
                                setFilter("sort", "price_asc")}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Price: Low to High
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={currentSort === "price_desc"}
                            onCheckedChange={() =>
                                setFilter("sort", "price_desc")}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Price: High to Low
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={currentSort === "name_asc"}
                            onCheckedChange={() =>
                                setFilter("sort", "name_asc")}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Name: A-Z
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={currentSort === "date_desc"}
                            onCheckedChange={() =>
                                setFilter("sort", "date_desc")}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Newest First
                        </DropdownMenuCheckboxItem>

                        <div className="h-px bg-slate-300 my-2" />

                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="w-full justify-start px-3 text-xs text-red-500 hover:text-red-600"
                        >
                            Reset all filters
                        </Button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
