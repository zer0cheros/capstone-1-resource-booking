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

export default function FilterResource() {
    const [filterByName, setFilterByName] = useState<boolean>(false);
    const [filterByPrice, setFilterByPrice] = useState<boolean>(false);

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
                    className="w-56 rounded-2xl p-2 shadow-2xl border-white/20 bg-white/90 backdrop-blur-md"
                    align="end"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-3 py-2 text-slate-500 uppercase text-[10px] tracking-widset font-bold">
                            Sort & Filter
                        </DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                            checked={filterByName}
                            onCheckedChange={setFilterByName}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Name
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={filterByPrice}
                            onCheckedChange={setFilterByPrice}
                            className="rounded-lg py-3 text-base focus:bg-[#1980D5]/10 focus:text-[#1980D5] cursor-pointer transition-colors"
                        >
                            Price
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
