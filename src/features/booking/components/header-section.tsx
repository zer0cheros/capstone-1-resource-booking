"use client";
import { HeaderSectionProps } from "../types/booking";
import StatCard from "./stat-card";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";

export default function HeaderSection(
    { bookings, resources }: HeaderSectionProps,
) {
    const totalSpent = bookings.reduce((acc, booking) => {
        const resource = resources.find((resource) =>
            resource.id === booking.resourceId
        );

        if (!resource) return acc;

        const bookingTotal = calculateBookingTotal(
            booking.startTime,
            booking.endTime,
            resource,
        );

        return acc + bookingTotal.total;
    }, 0);

    const upcomingBookings = bookings.filter((b) =>
        new Date(b.startTime) > new Date() && b.status !== "cancelled"
    );

    return (
        <div className="w-full flex flex-col gap-10">
            {/* Page Title Section */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    My Bookings
                </h1>
                <p className="text-slate-500 font-medium">
                    Manage your reservations and track your rental history
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <StatCard
                    label="Total Bookings"
                    value={bookings.length}
                    description="All-time activity"
                />
                <StatCard
                    label="Upcoming"
                    value={upcomingBookings.length}
                    description="Reserved slots"
                    highlight
                />
                <StatCard
                    label="Total Spent"
                    value={`$${totalSpent.toFixed(2)}`}
                    description="Including fees"
                />
            </div>
        </div>
    );
}
