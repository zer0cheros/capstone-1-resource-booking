"use client";

import React, { useMemo } from "react";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import ListingsHeader from "../components/listings-header";
import ListingCard from "../components/listing-card";
import { PackageSearch } from "lucide-react";
import { Resource } from "@/features/resource/types/resource";
import { MyListingsProps } from "../types/my-listings";
import SkeletonListings from "../components/skeleton-listings";
import CategoryFilter from "@/features/resource/components/category-filter";
import useResourceFilter from "@/features/resource/hooks/use-resource-filter";

export default function MyListingsScreen({ user }: MyListingsProps) {
    const { data: resources, isPending } = useResourcesQuery();

    const currentUserId = user.id;

    const myListings = useMemo(() => {
        return resources?.filter((res: Resource) =>
            res.userId === currentUserId
        ) || [];
    }, [resources, currentUserId]);

    const { filteredResources } = useResourceFilter(myListings);

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10">
            <div className="max-w-7xl mx-auto space-y-12">
                <ListingsHeader count={filteredResources.length} user={user} />

                <div>
                    {myListings.length > 0 && <CategoryFilter />}

                    {/* CASE 1: Still Loading */}
                    {isPending
                        ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <SkeletonListings key={i} />
                                ))}
                            </div>
                        )
                        : filteredResources.length > 0
                        ? (
                            /* CASE 2: Data loaded and has items */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredResources.map((res: Resource) => (
                                    <ListingCard key={res.id} res={res} />
                                ))}
                            </div>
                        )
                        : (
                            /* CASE 3: Data loaded but is empty */
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                <PackageSearch className="size-16 text-slate-300 mb-4" />
                                <h2 className="text-2xl font-black text-slate-900">
                                    No listings yet
                                </h2>
                                <p className="text-slate-500 font-medium">
                                    Start sharing your items to help the
                                    community.
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
