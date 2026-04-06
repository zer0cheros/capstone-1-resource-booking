"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, PackageSearch } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import useBookingQuery from "../hooks/use-booking-query";
import HeaderSection from "../components/header-section";
import BookingTable from "../components/booking-table";
import { createColumns } from "../components/column";

export default function BookingScreen() {
    const router = useRouter();
    const { data: bookings, isPending: isBookingsLoading } = useBookingQuery();
    const { data: resources, isPending: isResourcesLoading } =
        useResourcesQuery();

    const columns = createColumns(resources || []);

    if (isBookingsLoading || isResourcesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
                <div className="animate-pulse font-bold text-slate-400">
                    Loading your dashboard...
                </div>
            </div>
        );
    }

    // 1. Handle the true Empty State
    const hasNoBookings = !bookings || bookings.length === 0;

    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
                <HeaderSection
                    bookings={bookings || []}
                    resources={resources || []}
                />

                {hasNoBookings
                    ? (
                        // 2. The Welcome / Empty State Layout
                        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center space-y-6">
                            <div className="size-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300">
                                <PackageSearch className="size-12" />
                            </div>

                            <div className="space-y-2 max-w-sm">
                                <h2 className="text-2xl font-black text-slate-900">
                                    No bookings yet
                                </h2>
                                <p className="text-slate-500 font-medium">
                                    It looks like you haven&apos;t reserved anything.
                                    Explore our resources to get started!
                                </p>
                            </div>

                            <Button
                                onClick={() => router.push("/resources")}
                                className="h-14 px-8 rounded-full bg-gb-blue hover:bg-gb-blue/90 text-white font-bold text-lg shadow-lg shadow-gb-blue/20 group transition-all"
                            >
                                Browse Resources
                                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    )
                    : (
                        // 3. The Standard Table Layout
                        <div className="bg-white p-3 rounded-[2.0rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                            <BookingTable columns={columns} data={bookings} />
                        </div>
                    )}
            </div>
        </div>
    );
}
