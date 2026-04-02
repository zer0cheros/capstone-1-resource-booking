"use client";

import { Button } from "@/shared/components/ui/button";
import { LoadMoreButtonProps } from "../types/resource";
import { Loader2 } from "lucide-react";

export default function LoadMoreButton({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    totalItems,
}: LoadMoreButtonProps) {
    if (!hasNextPage) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-400 font-medium text-sm italic">
                    You've reached the end of the catalog.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center pt-10 pb-20">
            <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                variant="outline"
                className="h-14 px-12 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1980D5] transition-all"
            >
                {isFetchingNextPage
                    ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[#1980D5]" />
                            <span>Loading...</span>
                        </div>
                    )
                    : (
                        "Load More Resources"
                    )}
            </Button>

            <p className="mt-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                Currently showing {totalItems} results
            </p>
        </div>
    );
}
