"use client";
import { Card } from "@/shared/components/ui/card";
import { Resource } from "../../types/resource";
import BookingDatePicker from "./booking-date-picker";
import BookingPriceSummary from "./booking-price-summary";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";
import { Booking } from "@/features/booking/types/booking";
import useCreateBookingMutation from "@/features/booking/hooks/use-booking-create-query";
import BookingSubmitButton from "./booking-submit-button";
import { cn } from "@/shared/lib/utils";

export default function ResourceBookingCard(
    { resource, expanded }: { resource: Resource; expanded: boolean },
) {
    const { data: bookings } = useBookingQuery();
    const { mutate, isPending } = useCreateBookingMutation();
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const calculatedDays = (date?.from && date?.to)
        ? differenceInDays(date.to, date.from) + 1
        : 0;

    const datesSelected = !!(date?.from && date?.to);

    const bookedRanges = bookings
        ?.filter((b: Booking) => b.resourceId === resource.id)
        .map((b: Booking) => ({
            from: new Date(b.startTime),
            to: new Date(b.endTime),
        })) || [];

    const isRangeInvalid = date?.from && date?.to &&
        bookedRanges.some((range: DateRange) => {
            const selectedFrom = date.from!;
            const selectedTo = date.to!;

            const startOverlap = range.from && range.from >= selectedFrom &&
                range.from <= selectedTo;

            const endOverlap = range.to && range.to >= selectedFrom &&
                range.to <= selectedTo;

            return startOverlap || endOverlap;
        });

    const onBook = () => {
        if (!date?.from || !date?.to) return;

        mutate({
            resourceId: resource.id,
            startTime: date.from.toISOString(),
            endTime: date.to.toISOString(),
        }, {
            onSuccess: () => {
                setDate(undefined);
            },
        });
    };

    return (
        <Card
            className={cn(
                "p-8 transition-all duration-500 rounded-[2.5rem] border-none shadow-2xl bg-white",
                expanded
                    ? "ring-2 ring-gb-blue shadow-gb-blue/10"
                    : "shadow-slate-200",
            )}
        >
            <div className="mb-8">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Booking Rate
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                        ${resource.price}
                    </span>
                    <span className="text-slate-500 font-medium">
                        / {resource.priceUnit}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                <BookingDatePicker
                    date={date}
                    onSelect={setDate}
                    bookedRanges={bookedRanges}
                />

                {datesSelected && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <BookingPriceSummary
                            price={resource.price}
                            days={calculatedDays}
                        />
                    </div>
                )}

                <BookingSubmitButton
                    onClick={onBook}
                    isLoading={isPending}
                    disabled={!datesSelected}
                    isRangeInvalid={false}
                />
            </div>
        </Card>
    );
}
