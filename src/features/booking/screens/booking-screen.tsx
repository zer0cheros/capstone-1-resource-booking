"use client";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import HeaderSection from "../components/header-section";
import useBookingQuery from "../hooks/use-booking-query";
import BookingTable from "../components/booking-table";
import { createColumns } from "../components/column";

export default function BookingScreen() {
    const { data: bookings, isPending: isBookingsLoading } = useBookingQuery();
    const { data: resources, isPending: isResourcesLoading } =
        useResourcesQuery();

    const columns = createColumns(resources || []);

    if (isBookingsLoading || isResourcesLoading) {
        return (
            <div className="p-10 text-center">Loading your dashboard...</div>
        );
    }

    if (!bookings || !resources) {
        return <div className="p-10 text-center">No data found.</div>;
    }

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
                <HeaderSection bookings={bookings} resources={resources} />

                <div className="bg-white p-3 rounded-[2.0rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <BookingTable columns={columns} data={bookings || []} />
                </div>
            </div>
        </div>
    );
}
