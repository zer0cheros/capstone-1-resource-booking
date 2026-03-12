"use client";

import React from "react";
import { Resource } from "../types/resource";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { IconSearchOff } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export default function ListResource({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleResetFilters = () => {
    router.replace(pathname);
  };

  return (
    <>
      {resources && resources.length > 0
        ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-between">
            {resources.map((res: Resource) => (
              <Card
                key={res.id}
                className="relative w-full max-w-sm pt-0 overflow-hidden"
              >
                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                {res.image
                  ? (
                    <img
                      src={res.image}
                      alt={res.name}
                      className="relative z-20 aspect-video w-full object-cover brightness-100 dark:brightness-60"
                    />
                  )
                  : (
                    <div className="relative z-20 flex aspect-video w-full items-center justify-center bg-muted text-muted-foreground">
                      <span className="text-sm">No image found</span>
                    </div>
                  )}
                <CardHeader>
                  <CardAction>
                  </CardAction>
                  <CardTitle>{res.name}</CardTitle>
                  <CardDescription>
                    {res.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-evenly gap-3">
                  <Button className="flex-1 rounded-xl">View Details</Button>
                  <Button className="flex-1 rounded-xl">Book</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
        : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-300 rounded-3xl bg-white/50">
            <div className="bg-slate-100 p-6 rounded-full mb-6">
              <IconSearchOff size={48} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">
              No resources found
            </h3>
            <p className="text-slate-500 max-w-sm mb-8 text-lg">
              We couldn't find any resources matching your current filters or
              search criteria.
            </p>
            <Button
              variant="outline"
              onClick={handleResetFilters} // Or a function to reset filters
              className="h-12 px-6"
            >
              Clear all filters
            </Button>
          </div>
        )}
    </>
  );
}
