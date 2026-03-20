"use client";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { BookingPickerProps } from "../../types/resource";

export default function BookingDatePicker(
    { date, onSelect, bookedRanges, mode = "range" }: BookingPickerProps
) {
    // react-day-picker expects different `selected`/`onSelect` shapes depending on mode.
    // In "single" mode it works with a `Date`, while the rest of our app uses `DateRange`.
    const calendarSelected = mode === "single" ? date?.from : date;

    const handleCalendarSelect = (selected: unknown) => {
        if (mode === "single") {
            // In single mode, react-day-picker returns `Date | undefined`.
            const d = selected as Date | undefined;
            if (!d) {
                onSelect(undefined);
                return;
            }
            // Convert back into our `DateRange` shape so pickers can derive `to` themselves.
            onSelect({ from: d, to: undefined });
            return;
        }

        // In range mode, react-day-picker returns `DateRange | undefined`.
        onSelect(selected as any);
    };

    return (
        <Field className="w-full">
            <FieldLabel htmlFor="date-picker-range">
                Select dates
            </FieldLabel>
            <Popover>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        id="date-picker-range"
                        className="w-full justify-start px-2.5 font-normal"
                    >
                        <CalendarIcon />
                        {date?.from
                            ? (
                                date.to
                                    ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -
                                            {" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    )
                                    : (
                                        format(date.from, "LLL dd, y")
                                    )
                            )
                            : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 z-[100] bg-white shadow-2xl border border-slate-200 rounded-3xl overflow-hidden"
                    align="start"
                >
                    <Calendar
                        mode={mode as any}
                        defaultMonth={date?.from}
                        selected={calendarSelected}
                        onSelect={handleCalendarSelect}
                        numberOfMonths={2}
                        disabled={[
                            { before: new Date() },
                            ...bookedRanges,
                        ]}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}
