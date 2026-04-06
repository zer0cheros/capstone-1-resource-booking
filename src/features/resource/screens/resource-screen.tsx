"use client";
import React, { useMemo } from "react";
import CreateResourceDialog from "../components/create-resource-dialog";
import { Button } from "@/shared/components/ui/button";
import ListResource from "../components/list-resource";
import { IconPlus } from "@tabler/icons-react";
import SearchResource from "../components/search-resource";
import FilterResource from "../components/filter-resource";
import SkeletonCard from "../components/skeleton-card";
import { cn } from "@/shared/lib/utils";
import CategoryFilter from "../components/category-filter";
import useResourceFilter from "../hooks/use-resource-filter";
import useFavoritesQuery from "@/features/favorites/hooks/use-favorite-query";
import { Session } from "@/features/auth/types/session";
import useInfiniteResourcesQuery from "../hooks/use-infinite-resource-query";
import LoadMoreButton from "../components/load-more-button";

export default function ResourceScreen(
  { user }: { user: NonNullable<Session["user"]> },
) {
  const {
    data: resources,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteResourcesQuery(12);
  const { data: favorites, isLoading: isFavoritesLoading } =
    useFavoritesQuery();

  const allResources = useMemo(() => {
    return resources?.pages.flatMap((page) => page.data) ?? [];
  }, [resources]);

  const { filteredResources } = useResourceFilter(allResources);

  return (
    <div className="flex-1 py-6 mx-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-[#1980D5]">Shared</span> Resources
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              Browse available Shared Resources
            </p>
          </div>

          <div className="w-auto">
            <CreateResourceDialog user={user}>
              <Button
                className={cn(
                  "h-14 px-8 rounded-xl",
                  "transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
                  "w-full md:w-auto text-lg font-bold",
                )}
              >
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                  <IconPlus size={20} />
                  <span className="text-sm md:text-xl font-semibold">
                    Add Resource
                  </span>
                </div>
              </Button>
            </CreateResourceDialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
          <div className="w-full md:flex-1 ">
            <SearchResource />
          </div>
          <div className="w-full md:w-auto">
            <FilterResource />
          </div>
        </div>

        <CategoryFilter />

        <div className="">
          {isPending || isFavoritesLoading ? <SkeletonCard /> : (
            <>
              <ListResource
                resources={filteredResources || []}
                userFavorites={favorites || []}
              />
              <LoadMoreButton
                hasNextPage={!!hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                totalItems={allResources.length}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}