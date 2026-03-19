"use client";

import { BookingPriceSummaryProps } from "../../types/resource";

export default function BookingPriceSummary(
    { price, duration, priceUnit }: BookingPriceSummaryProps,
) {
    const subtotal = price * duration;
    const fee = subtotal * 0.05;
    const total = subtotal + fee;

    const unitLabel = duration === 1 ? priceUnit : `${priceUnit}s`

    return (
        <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
            <div className="flex justify-between text-sm text-slate-600">
                <span>${price.toFixed(2)} x {duration} {unitLabel}</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
                <span>Service Fee (5%)</span>
                <span>${fee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    );
}
