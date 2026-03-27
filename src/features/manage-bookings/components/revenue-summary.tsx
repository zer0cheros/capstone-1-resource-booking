"use client";

import { Calendar, TrendingUp, Wallet } from "lucide-react";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";

export default function RevenueSummary(
    { historyRequests }: { historyRequests: any[] },
) {
    const totalEarnings = historyRequests
        .filter((req) => req.status === "confirmed")
        .reduce((acc, req) => {
            const { subtotal } = calculateBookingTotal(
                new Date(req.startTime),
                new Date(req.endTime),
                req,
            );
            return acc + subtotal;
        }, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                <div className="size-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Wallet size={28} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Lifetime Earnings
                    </p>
                    <h3 className="text-3xl font-black text-slate-900 leading-none">
                        ${totalEarnings.toFixed(2)}
                    </h3>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5 opacity-60">
                <div className="size-14 bg-gb-blue/10 rounded-2xl flex items-center justify-center text-gb-blue">
                    <TrendingUp size={28} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Confirmed Bookings
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">
                        {historyRequests.filter((r) => r.status === "confirmed")
                            .length}
                    </h3>
                </div>
            </div>

            <div className="bg-gb-blue p-6 rounded-[2.5rem] shadow-lg shadow-gb-blue/20 flex items-center gap-5 text-white">
                <div className="size-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Calendar size={28} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                        Status
                    </p>
                    <h3 className="text-xl font-black leading-none">
                        Top Provider
                    </h3>
                </div>
            </div>
        </div>
    );
}
