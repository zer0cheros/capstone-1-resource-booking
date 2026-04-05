"use client";
import { Card } from "@/shared/components/ui/card";
import { ResourceBookingCardProps } from "../../types/resource";
import BookingPriceSummary from "./booking-price-summary";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
    differenceInWeeks,
} from "date-fns";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";
import { Booking } from "@/features/booking/types/booking";
import useCreateBookingMutation from "@/features/booking/hooks/use-booking-create-query";
import BookingSubmitButton from "./booking-submit-button";
import BookingCheckoutOverlay from "./booking-checkout-overlay";
import { cn } from "@/shared/lib/utils";
import BookingPickerManager from "./booking-picker-manager";
import { useRouter } from "next/navigation";
import useBookingUpdateQuery from "@/features/booking/hooks/use-booking-update-query";
import toast from "react-hot-toast";

export default function ResourceBookingCard(
    { resource, expanded, initialDate, mode = "create", bookingId }:
        ResourceBookingCardProps,
) {
    const router = useRouter();
    const { data: bookings } = useBookingQuery();
    const { mutate: createMutate, isPending } = useCreateBookingMutation();
    const { mutate: updateMutate } = useBookingUpdateQuery();
    const [date, setDate] = useState<DateRange | undefined>(initialDate);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const bookingDuration = (() => {
        if (!date?.from || !date?.to) return 0;

        if (resource.priceUnit === "hour") {
            return differenceInHours(date.to, date.from);
        }

        if (resource.priceUnit === "month") {
            return differenceInMonths(date.to, date.from);
        }

        if (resource.priceUnit === "week") {
            const totalDays = differenceInWeeks(date.to, date.from) + 1;
            return Math.max(1, Math.round(totalDays / 7));
        }

        return differenceInDays(date.to, date.from) + 1;
    })();

    const datesSelected = !!(date?.from && date?.to);

    const activeBookings =
        bookings?.filter((b: Booking) =>
            b.resourceId === resource.id &&
            b.status !== "cancelled" &&
            b.id !== bookingId
        ) || [];

    const disabledCalendarDays = resource.priceUnit === "hour"
        ? []
        : activeBookings.map((b: Booking) => ({
            from: new Date(b.startTime),
            to: new Date(b.endTime),
        }));

    const internalBookedRanges = activeBookings.map((b: Booking) => ({
        from: new Date(b.startTime),
        to: new Date(b.endTime),
    }));

    const isRangeInvalid = date?.from && date?.to &&
        internalBookedRanges.some((range: DateRange) => {
            const selectedFrom = date.from!.getTime();
            const selectedTo = date.to!.getTime();
            const rangeFrom = range.from!.getTime();
            const rangeTo = range.to!.getTime();

            return selectedFrom < rangeTo && selectedTo > rangeFrom;
        });

    const isTimeOrderInvalid = resource.priceUnit === "hour" &&
        date?.from && date?.to && date.from >= date.to;

    const subtotal = datesSelected && bookingDuration > 0
        ? resource.price * bookingDuration
        : 0;
    const checkoutTotal = subtotal + subtotal * 0.05;

    const submitBooking = () => {
        if (!date?.from || !date?.to || isRangeInvalid || isTimeOrderInvalid) {
            return;
        }

        setCheckoutOpen(false);

        const payload = {
            startTime: date.from.toISOString(),
            endTime: date.to.toISOString(),
        };

        if (mode === "edit" && bookingId) {
            updateMutate(
                {
                    id: bookingId,
                    ...payload,
                },
                {
                    onSuccess: () => {
                        toast.success("Reservation updated successfully!");
                        router.push("/bookings");
                    },
                },
            );
        } else {
            createMutate(
                {
                    resourceId: resource.id,
                    ...payload,
                },
                {
                    onSuccess: () => {
                        setDate(undefined);
                        router.push("/resources");
                    },
                },
            );
        }
    };

    const handleReset = () => {
        setDate(initialDate);
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
                    bookedRanges={disabledCalendarDays}
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
                    onClick={() => setCheckoutOpen(true)}
                    isLoading={isPending}
                    mode={mode}
                    disabled={!datesSelected || bookingDuration <= 0 ||
                        isTimeOrderInvalid}
                    isRangeInvalid={!!isRangeInvalid || !!isTimeOrderInvalid}
                    handleReset={handleReset}
                />
            </div>

            <BookingCheckoutOverlay
                isOpen={checkoutOpen}
                amount={checkoutTotal}
                onCancel={() => setCheckoutOpen(false)}
                onConfirm={submitBooking}
            />
        </Card>
    );
}
