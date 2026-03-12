"use client";
import React, { use } from "react";
import CreateResourceDialog from "../components/create-resource-dialog";
import { Button } from "@/shared/components/ui/button";
import useResourcesQuery from "../hooks/use-resource-query";
import ListResource from "../components/list-resource";
import { IconPlus } from "@tabler/icons-react";
import SearchResource from "../components/search-resource";
import FilterResource from "../components/filter-resource";
import SkeletonCard from "../components/skeleton-card";
import { cn } from "@/shared/lib/utils";
import { useSearchParams } from "next/navigation";
import { Resource } from "../types/resource";

export default function resourceScreen() {
  const { data: resources, isPending } = useResourcesQuery();

  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toString() ?? "";
  const filteredResources =
    resources?.filter((resource: Resource) =>
      resource.name.toLocaleLowerCase().includes(query) ||
      (resource.description?.toLocaleLowerCase().includes(query) ?? false)
    ) ?? [];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-[#1980D5]">Shared</span> Resources
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              Browse available Shared Resources
            </p>
          </div>

          <div className="w-32 sm:w-auto">
            <CreateResourceDialog>
              <Button
                className={cn(
                  "h-12 md:h-14 text-xl px-6 py-3 hover:bg-[#1181c4] rounded-xl",
                  "w-full sm:w-32 md:w-40 lg:w-48",
                  "transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95",
                  "w-full sm:w-auto",
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
          <div className="flex-1 max-w-xl">
            <SearchResource />
          </div>
          <div className="w-full md:w-auto">
            <FilterResource />
          </div>
        </div>

        <div className="">
          {isPending
            ? <SkeletonCard />
            : <ListResource resources={filteredResources} />}
        </div>
      </div>
    </div>
  );
}
