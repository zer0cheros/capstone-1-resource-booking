"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Calendar, Check, DollarSign, Wallet, X } from "lucide-react";
import { format } from "date-fns";
import useManageBookingsMutation from "../hooks/use-manage-bookings-update-query";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";

export default function RequestCard({ request }: { request: any }) {
    const { mutate: updateStatus, isPending: isUpdating } =
        useManageBookingsMutation();

    const statusStyles: Record<string, string> = {
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
        cancelled: "bg-red-50 text-red-600 border-red-100",
    };

    const { subtotal } = calculateBookingTotal(
        new Date(request.startTime),
        new Date(request.endTime),
        request
    );

    return (
        <div className="group bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <Avatar className="size-16 border-4 border-slate-50 shadow-sm">
                    <AvatarImage src={request.renterImage ?? ""} />
                    <AvatarFallback className="bg-gb-blue text-white font-black">
                        {request.renterName?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-bold text-slate-900 leading-tight">
                        {request.renterName}{" "}
                        <span className="font-medium text-slate-400">
                            requests
                        </span>
                    </h4>
                    <p className="text-gb-blue font-black text-xl">
                        {request.resourceName}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-10 w-full lg:w-auto justify-between lg:justify-start bg-slate-50/50 px-6 py-4 rounded-3xl border border-slate-100/50">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} className="text-gb-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            Period
                        </span>
                    </div>
                    <p className="text-sm font-black text-slate-700">
                        {format(new Date(request.startTime), "MMM d")} -{" "}
                        {format(new Date(request.endTime), "MMM d, yyyy")}
                    </p>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                        <DollarSign size={14} className="text-gb-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            Daily Rate
                        </span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        ${request.price}
                    </p>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Wallet size={14} className="text-gb-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            Net Earnings
                        </span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        ${subtotal}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                {request.status === "pending"
                    ? (
                        <>
                            <Button
                                variant="secondary"
                                disabled={isUpdating}
                                onClick={() =>
                                    updateStatus({
                                        id: request.id,
                                        status: "cancelled",
                                    })}
                                className="rounded-2xl bg-slate-100 hover:bg-red-500 hover:text-white font-bold px-6 h-12 transition-all"
                            >
                                <X className="mr-2 size-4" /> Reject
                            </Button>
                            <Button
                                disabled={isUpdating}
                                onClick={() =>
                                    updateStatus({
                                        id: request.id,
                                        status: "confirmed",
                                    })}
                                className="rounded-2xl bg-slate-900 hover:bg-gb-blue text-white font-bold px-8 h-12 shadow-lg transition-all"
                            >
                                <Check className="mr-2 size-4" /> Approve
                            </Button>
                        </>
                    )
                    : (
                        <Badge
                            className={`px-5 py-2 rounded-full border-2 font-black uppercase text-[10px] tracking-widest shadow-sm ${
                                statusStyles[request.status]
                            }`}
                        >
                            {request.status}
                        </Badge>
                    )}
            </div>
        </div>
    );
}
