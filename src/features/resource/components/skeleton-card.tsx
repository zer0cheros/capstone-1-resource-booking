import {
    Card,
    CardFooter,
    CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SkeletonCard() {
    const skeletonCards: number[] = Array.from({ length: 8 });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletonCards.map((_, index) => (
                <Card
                    key={index}
                    className="relative w-full max-w-sm pt-0 overflow-hidden"
                >
                    <Skeleton className="aspect-video w-full rounded-none" />
                    <CardHeader>
                        <Skeleton className="h-3 w-3/4 mb-2 rounded-md" />
                        <Skeleton className="h-5 w-3/4 mb-2 rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <div className="flex items-center justify-between gap-6 mt-8">
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-evenly gap-3">
                        <Skeleton className="h-10 flex-1 rounded-xl" />
                        <Skeleton className="h-10 flex-1 rounded-xl" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
