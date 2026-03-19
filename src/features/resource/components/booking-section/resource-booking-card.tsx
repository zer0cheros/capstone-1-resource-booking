"use client";
import { Card } from "@/shared/components/ui/card";
import { Resource } from "../../types/resource";
import BookingPriceSummary from "./booking-price-summary";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
} from "date-fns";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";
import { Booking } from "@/features/booking/types/booking";
import useCreateBookingMutation from "@/features/booking/hooks/use-booking-create-query";
import BookingSubmitButton from "./booking-submit-button";
import { cn } from "@/shared/lib/utils";
import BookingPickerManager from "./booking-picker-manager";
import { useRouter } from "next/navigation";

export default function ResourceBookingCard(
    { resource, expanded }: { resource: Resource; expanded: boolean },
) {
    const router = useRouter();
    const { data: bookings } = useBookingQuery();
    const { mutate, isPending } = useCreateBookingMutation();
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const bookingDuration = (() => {
        if (!date?.from || !date?.to) return 0;

        if (resource.priceUnit === "hour") {
            return differenceInHours(date.to, date.from);
        }

        if (resource.priceUnit === "month") {
            return differenceInMonths(date.to, date.from);
        }

        return differenceInDays(date.to, date.from) + 1;
    })();

    const datesSelected = !!(date?.from && date?.to);

    const bookedRanges = bookings
        ?.filter((b: Booking) => b.resourceId === resource.id)
        .map((b: Booking) => ({
            from: new Date(b.startTime),
            to: new Date(b.endTime),
        })) || [];

    const isRangeInvalid = date?.from && date?.to &&
        bookedRanges.some((range: DateRange) => {
            const selectedFrom = date.from!.getTime();
            const selectedTo = date.to!.getTime();
            const rangeFrom = range.from!.getTime();
            const rangeTo = range.to!.getTime();

            return selectedFrom < rangeTo && selectedTo > rangeFrom;
        });

    const isTimeOrderInvalid = resource.priceUnit === "hour" &&
        date?.from && date?.to && date.from >= date.to;

    const onBook = () => {
        if (!date?.from || !date?.to || isRangeInvalid || isTimeOrderInvalid) {
            return;
        }

        mutate({
            resourceId: resource.id,
            startTime: date.from.toISOString(),
            endTime: date.to.toISOString(),
        }, {
            onSuccess: () => {
                setDate(undefined);
                router.push("/resources");
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
                <BookingPickerManager
                    unit={resource.priceUnit}
                    date={date}
                    onSelect={setDate}
                    bookedRanges={bookedRanges}
                />

                {datesSelected && !isRangeInvalid && !isTimeOrderInvalid &&
                    bookingDuration > 0 && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <BookingPriceSummary
                            price={resource.price}
                            duration={bookingDuration}
                            priceUnit={resource.priceUnit}
                        />
                    </div>
                )}

                <BookingSubmitButton
                    onClick={onBook}
                    isLoading={isPending}
                    disabled={!datesSelected || bookingDuration <= 0 ||
                        isTimeOrderInvalid}
                    isRangeInvalid={!!isRangeInvalid || !!isTimeOrderInvalid}
                />
            </div>
        </Card>
    );
}
