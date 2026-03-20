"use client";
import { useSearchParams } from "next/navigation";
import ResourceBreadcrumb from "../components/resource-breadcrumb";
import ResourceDetails from "../components/resource-details";
import ResourceImage from "../components/resource-image";
import { Resource } from "../types/resource";
import ResourceBookingCard from "../components/booking-section/resource-booking-card";
import { cn } from "@/shared/lib/utils";
import { useEffect, useRef } from "react";

export default function ResourceDetailsScreen(
    { resource }: { resource: Resource },
) {
    const searchParams = useSearchParams();
    const bookingRef = useRef<HTMLDivElement>(null);
    const isBookingAction = searchParams.get("action") === "book";

    useEffect(() => {
        if (isBookingAction) {
            bookingRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isBookingAction]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto p-4 md:p-10">
                <div className="mb-10">
                    <ResourceBreadcrumb resource={resource} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
                    {/* LEFT SIDE: Content */}
                    <div
                        className={cn(
                            "transition-all duration-700 ease-in-out flex flex-col gap-8",
                            isBookingAction
                                ? "lg:col-span-5 opacity-60 grayscale-[0.5]"
                                : "lg:col-span-7",
                        )}
                    >
                        <ResourceDetails resource={resource} />

                        <div
                            className={cn(
                                "transition-all duration-700 ease-in-out relative",
                                isBookingAction
                                    ? "h-[300px] md:h-[400px]"
                                    : "h-[500px] md:h-[600px]",
                            )}
                        >
                            <ResourceImage
                                src={resource.image}
                                alt={resource.name}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Action Zone */}
                    <div
                        ref={bookingRef}
                        className={cn(
                            "transition-all duration-700 ease-in-out sticky top-28",
                            isBookingAction ? "lg:col-span-7" : "lg:col-span-5",
                        )}
                    >
                        <ResourceBookingCard
                            resource={resource}
                            expanded={isBookingAction}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
