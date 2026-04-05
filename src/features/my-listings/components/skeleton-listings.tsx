"use client";

import {
    Card,
    CardFooter,
    CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SkeletonListings() {
    return (
        <Card className="relative overflow-hidden pt-0 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <Skeleton className="aspect-video w-full rounded-none" />

            {/* Content Placeholder */}
            <CardHeader className="space-y-2 border-b border-slate-300">
                <Skeleton className="h-7 w-3/4 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                </div>
            </CardHeader>

            {/* Footer Placeholder */}
            <CardFooter className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-12 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="size-10 rounded-2xl" />
                    <Skeleton className="size-10 rounded-2xl" />
                    <Skeleton className="size-10 rounded-2xl" />
                </div>
            </CardFooter>
        </Card>
    );
}
