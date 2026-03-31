"use client";

import HeaderSection from "../components/header-section";
import Stats from "../components/stats";
import DetailsForm from "../components/details-form";
import { ProfileProps } from "../types/profile";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";
import FinanceSection from "../components/finance-section";
import SupportCard from "../components/support-card";
import useManageBookingsQuery from "@/features/manage-bookings/hooks/use-manage-bookings-query";

export default function ProfileScreen({ user }: ProfileProps) {
    const { data: resources } = useResourcesQuery();
    const { data: bookings } = useBookingQuery();

    const { data: requests, isPending } = useManageBookingsQuery();

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10">
            <div className="max-w-5xl mx-auto flex flex-col gap-2">
                <HeaderSection user={user} />

                <div className="flex flex-col gap-10">
                    <div className="space-y-6">
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
                            Overview
                        </h2>
                        <Stats resources={resources} bookings={bookings} />
                    </div>

                    <FinanceSection historyRequests={requests} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2">
                            <DetailsForm />
                        </div>
                        <div className="sticky top-24 lg:col-span-1">
                            <SupportCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
