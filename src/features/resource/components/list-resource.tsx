"use client";

import React from "react";
import { Resource } from "../types/resource";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { IconSearchOff } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import useCreateFavoriteMutation from "@/features/favorites/hooks/use-favorite-create";
import { cn } from "@/shared/lib/utils";
import { Favorites } from "@/features/favorites/types/favorites";

export default function ListResource(
  { resources, userFavorites = [] }: {
    resources: Resource[];
    userFavorites: Favorites[];
  },
) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate } = useCreateFavoriteMutation();

  const handleResetFilters = () => {
    router.replace(pathname);
  };

  const onToggleFavorites = (resourceId: string) => {
    mutate({
      resourceId: resourceId,
    });
  };

  return (
    <div>
      {resources && resources.length > 0
        ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
            {resources.map((res: Resource) => {
              const isFavorited = userFavorites.some((fav) =>
                fav.resourceId === res.id
              );

              return (
                <Card
                  key={res.id}
                  className="relative pt-0 overflow-hidden"
                >
                  <div className="absolute inset-0 aspect-video" />
                  <img
                    src={res.image || "/assets/placeholder.svg"}
                    alt={res.name}
                    className="relative z-20 aspect-video w-full object-cover brightness-100 dark:brightness-60"
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardDescription className="text-[10px] text-gb-blue font-bold tracking-widest uppercase">
                          {res.category}
                        </CardDescription>
                        <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
                          {res.name}
                        </CardTitle>
                        <div
                          className="mt-1.5 flex items-center gap-1.5"
                          aria-label={
                            res.avgRating
                              ? `Rated ${Number(res.avgRating).toFixed(1)} out of 5, ${res.totalReviews} reviews`
                              : "No reviews yet"
                          }
                        >
                          <Star
                            className={cn(
                              "size-3.5 shrink-0",
                              res.avgRating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200/80 text-slate-300",
                            )}
                            strokeWidth={res.avgRating ? 0 : 1.5}
                          />
                          {res.avgRating ? (
                            <>
                              <span className="text-sm font-bold tabular-nums text-slate-900">
                                {Number(res.avgRating).toFixed(1)}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                ({res.totalReviews})
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleFavorites(res.id)}
                        className="hover:bg-transparent group active:scale-90 transition-transform"
                      >
                        <Bookmark
                          className={cn(
                            "size-6 transition-all duration-300",
                            isFavorited
                              ? "fill-gb-blue text-gb-blue"
                              : "text-slate-400 group-hover:text-gb-blue",
                          )}
                        />
                      </Button>
                    </div>
                    <CardDescription className="text-sm line-clamp-2 min-h-[40px]">
                      {res.description}
                    </CardDescription>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline">
                        <span className="font-bold text-sm text-slate-900 mr-0.5">
                          $
                        </span>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          {res.price}
                        </span>
                        <span className="ml-1.5 text-sm font-medium text-slate-500 lowercase italic">
                          per {res.priceUnit}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                        <div className="size-1.5 bg-green-500 rounded-full" />
                        <span className="text-[10px] font-bold text-green-600 uppercase">
                          Ready
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href={`/resources/${res.id}`}
                      className="w-full sm:flex-1"
                    >
                      <Button className="w-full rounded-xl hover:-translate-y-1 transition-all duration-300">
                        View Details
                      </Button>
                    </Link>
                    <Link
                      href={`/resources/${res.id}?action=book`}
                      className="w-full sm:flex-1"
                    >
                      <Button className="w-full bg-gb-blue hover:bg-gb-blue/90 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gb-blue/20">
                        Book Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
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
              We couldn&apos;t find any resources matching your current filters or
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
    </div>
  );
}
