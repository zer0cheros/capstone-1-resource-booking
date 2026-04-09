"use client";
import { Booking } from "@/features/booking/types/booking";
import { Resource } from "@/features/resource/types/resource";
import { Card } from "@/shared/components/ui/card";
import { CalendarCheck, Package, Star } from "lucide-react";
import type { HostListingRatingStats } from "../hooks/use-host-listing-rating-stats";

export default function Stats(
    { resources, bookings, hostRating, hostRatingPending }: {
        resources: Resource[];
        bookings: Booking[];
        hostRating?: HostListingRatingStats;
        hostRatingPending?: boolean;
    },
) {
    const listingsCount = (resources?.length ?? 0).toString();
    const bookingsCount = (bookings?.length ?? 0).toString();

    const trustDisplay = (() => {
        if (hostRatingPending) return "…";
        if (
            !hostRating ||
            hostRating.totalReviews < 1 ||
            hostRating.avgRating == null
        ) {
            return "New";
        }
        return Number(hostRating.avgRating).toFixed(1);
    })();

    const stats = [
        {
            label: "My Listings",
            value: listingsCount,
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "Total Bookings",
            value: bookingsCount,
            icon: CalendarCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Trust Rating",
            value: trustDisplay,
            sublabel:
                hostRating && hostRating.totalReviews > 0
                    ? `${hostRating.totalReviews} review${
                        hostRating.totalReviews === 1 ? "" : "s"
                    } on your listings`
                    : undefined,
            icon: Star,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow"
                >
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="size-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            {stat.label}
                        </p>
                        <p className="text-4xl font-black text-slate-900">
                            {stat.value}
                        </p>
                        {"sublabel" in stat && stat.sublabel
                            ? (
                                <p className="text-xs font-medium text-slate-400 mt-1 max-w-[14rem] leading-snug">
                                    {stat.sublabel}
                                </p>
                            )
                            : null}
                    </div>
                </Card>
            ))}
        </div>
    );
}
