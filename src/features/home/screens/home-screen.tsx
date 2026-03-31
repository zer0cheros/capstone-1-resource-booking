"use client";

import HomeHero from "../components/home-hero";
import ActivityBanner from "../components/activity-banner";
import { ActivitySnippet, HomeProps } from "../types/home";
import useManageBookingsQuery from "@/features/manage-bookings/hooks/use-manage-bookings-query";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";
import { Booking } from "@/features/booking/types/booking";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";
import { ArrowRight, Building2, Car, Monitor, Wrench } from "lucide-react";
import CategoryCard from "../components/category-card";
import Link from "next/link";
import ListingCard from "@/features/my-listings/components/listing-card";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import { Resource } from "@/features/resource/types/resource";
import ListResource from "@/features/resource/components/list-resource";

export default function HomeScreen({ user }: HomeProps) {
    const { data: incomingRequests } = useManageBookingsQuery();
    const { data: myBookings } = useBookingQuery();

    const { data: allResources, isLoading } = useResourcesQuery();

    const recentListings = allResources
        ?.sort((a: Resource, b: Resource) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4) || [];

    const balance = incomingRequests?.filter((req) =>
        req.status === "confirmed"
    )
        .reduce((acc, req) => {
            const { subtotal } = calculateBookingTotal(
                new Date(req.startTime),
                new Date(req.endTime),
                { price: req.price, priceUnit: req.priceUnit } as any,
            );
            return acc + subtotal;
        }, 0);

    const formattedBalance = balance
        ? `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        : "$0.00";

    const snippets: ActivitySnippet[] = [
        {
            id: "1",
            label: "Incoming Requests",
            count: incomingRequests?.filter((r) => r.status === "pending")
                .length || 0,
            href: "/manage-bookings",
            icon: "inbox",
            color: "bg-amber-50 text-amber-600",
        },
        {
            id: "2",
            label: "My Bookings",
            count: myBookings?.filter((b: Booking) => b.status === "confirmed")
                .length ||
                0,
            href: "/bookings",
            icon: "calendar",
            color: "bg-gb-blue/10 text-gb-blue",
        },
        {
            id: "3",
            label: "Earnings",
            count: formattedBalance as any,
            href: "/profile",
            icon: "wallet",
            color: "bg-emerald-50 text-emerald-600",
        },
    ];

    const categories = [
        {
            label: "Vehicles & Transport",
            slug: "vehicles",
            icon: Car,
            image:
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
        },
        {
            label: "Apartments & Spaces",
            slug: "spaces",
            icon: Building2,
            image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        },
        {
            label: "Tools & Equipment",
            slug: "tools",
            icon: Wrench,
            image:
                "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800",
        },
        {
            label: "Office & Tech",
            slug: "tech",
            icon: Monitor,
            image:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        },
    ];

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                <HomeHero userName={user.name} />

                <div className="space-y-6">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
                        Your Activity
                    </h2>
                    <ActivityBanner snippets={snippets} />
                </div>

                {/* Categories Section */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-1 px-2">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                            Browse by{" "}
                            <span className="text-gb-blue">Category</span>
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Quickly find what you need by browsing our curated
                            collections.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.label} category={cat} />
                        ))}
                    </div>
                </div>

                {/* Grid of Listings */}
                <div className="space-y-8 pt-10 border-t border-slate-200">
                    <div className="flex items-end justify-between px-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                                New{" "}
                                <span className="text-gb-green">
                                    Arrivals
                                </span>
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Check out the latest resources added to
                                OrderEase.
                            </p>
                        </div>
                        <Link
                            href="/resources"
                            className="hidden sm:flex items-center gap-2 text-sm font-bold text-gb-blue hover:underline"
                        >
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {isLoading
                        ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-80 bg-slate-200 animate-pulse rounded-3xl"
                                    />
                                ))}
                            </div>
                        )
                        : (
                            <ListResource
                                resources={recentListings}
                                userFavorites={[]}
                            />
                        )}
                </div>

                {/* Mobile View All button */}
                <div className="sm:hidden px-2">
                    <Link
                        href="/resources"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600"
                    >
                        View All Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
