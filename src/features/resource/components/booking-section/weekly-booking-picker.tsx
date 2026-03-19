"use client";
import { addDays } from "date-fns";
import { BookingPickerProps } from "../../types/resource";
import BookingDatePicker from "./booking-date-picker";

export default function WeeklyBookingPicker({
    date,
    onSelect,
    bookedRanges,
}: BookingPickerProps) {
    const handleWeeklySelect = (range: any) => {
        if (range?.from && !range?.to) {
            const autoTo = addDays(range.from, 6);
            onSelect({ from: range.from, to: autoTo });
        } else {
            onSelect(range);
        }
    };

    return (
        <BookingDatePicker
            mode="single"
            date={date}
            onSelect={handleWeeklySelect}
            bookedRanges={bookedRanges}
        />
    );
}
